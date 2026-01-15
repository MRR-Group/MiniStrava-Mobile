import { ActivitiesApi } from "@infra/api/activities";
import { toFormData } from "@infra/api/to-form-data";
import { ActivityRepository } from "@infra/db/repositories/activities.repository";
import { GpsPointsRepository } from "@infra/db/repositories/gps-points-repo.repository";
import { SyncQueueRepo } from "@infra/db/repositories/sync-queue.repository";
import { manipulateAsync, SaveFormat } from "expo-image-manipulator";

export async function syncPendingOnce() {
  let jobs = await SyncQueueRepo.list(20);

  if (jobs.length === 0) {
    const unsynced = await ActivityRepository.listNotSynced(20);
    if (unsynced.length > 0) {
      console.log("[sync] backfill queue with unsynced activities", unsynced.length);
      for (const a of unsynced) {
        await SyncQueueRepo.add({
          id: `rehydrate_${a.id}`,
          kind: "activity.create",
          payloadJson: JSON.stringify({ localActivityId: a.id }),
          createdAt: Date.now(),
        });
      }
      jobs = await SyncQueueRepo.list(20);
    }
  }

  console.log("[sync] queued jobs", jobs.length);

  for (const job of jobs) {
    try {
      if (job.kind === "activity.create") {
        const payload = JSON.parse(job.payloadJson) as { localActivityId: string };
        const a = await ActivityRepository.getById(payload.localActivityId);

        if (!a) {
          console.warn("[sync] missing activity, removing job", job.id);
          await SyncQueueRepo.remove(job.id);
          continue;
        }

        if (a.status === "synced" && a.serverId) {
          console.log("[sync] already synced", a.id, a.serverId);
          await SyncQueueRepo.remove(job.id);
          continue;
        }

        const gpsPoints = await GpsPointsRepository.listForActivity(a.id, 20000);
        const apiPoints = gpsPoints.map((p) => ({ ...p, timestamp: Math.floor(p.timestamp / 1000) }));

        console.log("[sync] sending activity", a.id, "status", a.status, "points", gpsPoints.length);

        let photoUri = a.photoUri ?? null;

        if (photoUri && !photoUri.toLowerCase().endsWith(".png")) {
          try {
            const res = await manipulateAsync(photoUri, [], { compress: 1, format: SaveFormat.PNG });
            photoUri = res.uri;
          } catch {
            photoUri = null;
          }
        }

        const distanceM = Math.max(1, a.distanceM ?? 0);
        const durationS = Math.max(1, a.durationS ?? 0);

        const fd = toFormData(
          {
            title: a.title ?? "Workout",
            notes: a.notes ?? null,
            duration_s: durationS,
            distance_m: distanceM,
            started_at: new Date(a.startAt).toISOString(),
            activity_type: a.type,

            gps_points: apiPoints,
          },
          {
            field: "photo",
            file: photoUri ? { uri: photoUri, type: "image/png" } : null,
          }
        );

        console.log("[sync] payload", {
          id: a.id,
          title: a.title,
          distance_m: distanceM,
          duration_s: durationS,
          started_at: new Date(a.startAt).toISOString(),
          activity_type: a.type,
          points: apiPoints.length,
          photo: !!photoUri,
        });

        const res = await ActivitiesApi.create(fd);

        console.log("[sync] server id", res.id, "for", a.id);
        await ActivityRepository.markSynced(a.id, res.id);
        await SyncQueueRepo.remove(job.id);
        continue;
      }

      if (job.kind === "activity.update") {
        const payload = JSON.parse(job.payloadJson) as { localActivityId: string; serverId?: number };
        const a = await ActivityRepository.getById(payload.localActivityId);

        if (!a) {
          console.warn("[sync] missing activity for update, removing job", job.id);
          await SyncQueueRepo.remove(job.id);
          continue;
        }

        if (!payload.serverId) {
          console.warn("[sync] missing serverId for update, removing job", job.id);
          await SyncQueueRepo.remove(job.id);
          continue;
        }

        let photoUri = a.photoUri ?? null;

        if (photoUri && !photoUri.toLowerCase().endsWith(".png")) {
          try {
            const res = await manipulateAsync(photoUri, [], { compress: 1, format: SaveFormat.PNG });
            photoUri = res.uri;
          } catch {
            photoUri = null;
          }
        }

        const distanceM = Math.max(1, a.distanceM ?? 0);
        const durationS = Math.max(1, a.durationS ?? 0);

        const fd = toFormData(
          {
            title: a.title ?? "Workout",
            notes: a.notes ?? null,
            duration_s: durationS,
            distance_m: distanceM,
            started_at: new Date(a.startAt).toISOString(),
            activity_type: a.type,
          },
          {
            field: "photo",
            file: photoUri ? { uri: photoUri, type: "image/png" } : null,
          }
        );

        console.log("[sync] updating activity", a.id, "server", payload.serverId);

        await ActivitiesApi.update(payload.serverId, fd);
        await ActivityRepository.markSynced(a.id, payload.serverId);
        await SyncQueueRepo.remove(job.id);
        continue;
      }

      console.log("[sync] skip job kind", job.kind);
    } catch (err) {
      const maybeAxios = err as any;
      const status = maybeAxios?.response?.status;
      const data = maybeAxios?.response?.data;
      console.warn("[sync] failed job", job.id, "status", status ?? "n/a", "data", data ?? err);
      continue;
    }
  }
}
