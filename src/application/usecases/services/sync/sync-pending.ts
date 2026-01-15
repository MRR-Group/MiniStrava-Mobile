import { ActivitiesApi } from "@infra/api/activities";
import { toFormData } from "@infra/api/to-form-data";
import { ActivityRepository } from "@infra/db/repositories/activities.repository";
import { GpsPointsRepository } from "@infra/db/repositories/gps-points-repo.repository";
import { SyncQueueRepo } from "@infra/db/repositories/sync-queue.repository";
import { manipulateAsync, SaveFormat } from "expo-image-manipulator";

export async function syncPendingOnce() {
  const jobs = await SyncQueueRepo.list(20);

  for (const job of jobs) {
    try {
      if (job.kind !== "activity.create") {
        continue;
      }

      const payload = JSON.parse(job.payloadJson) as { localActivityId: string };
      const a = await ActivityRepository.getById(payload.localActivityId);

      if (!a) {
        await SyncQueueRepo.remove(job.id);
        continue;
      }

      if (a.status === "synced" && a.serverId) {
        await SyncQueueRepo.remove(job.id);
        continue;
      }

      const gpsPoints = await GpsPointsRepository.listForActivity(a.id, 20000);

      let photoUri = a.photoUri ?? null;

      if (photoUri && !photoUri.toLowerCase().endsWith(".png")) {
        try {
          const res = await manipulateAsync(photoUri, [], { compress: 1, format: SaveFormat.PNG });
          photoUri = res.uri;
        } catch {
          photoUri = null;
        }
      }

      const fd = toFormData(
        {
          title: a.title ?? "Workout",
          notes: a.notes ?? null,
          duration_s: a.durationS,
          distance_m: a.distanceM,
          started_at: new Date(a.startAt).toISOString(),
          activity_type: a.type,

          gps_points: gpsPoints,
        },
        {
          field: "photo",
          file: photoUri ? { uri: photoUri, type: "image/png" } : null,
        }
      );

      const res = await ActivitiesApi.create(fd);

      await ActivityRepository.markSynced(a.id, res.id);
      await SyncQueueRepo.remove(job.id);
    } catch (_) {
      continue;
    }
  }
}
