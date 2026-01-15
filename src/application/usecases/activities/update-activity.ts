import { ActivityRepository, ActivityType } from "@infra/db/repositories/activities.repository";
import { SyncQueueRepo } from "@infra/db/repositories/sync-queue.repository";

export type UpdateActivityInput = {
  id: string;
  type: ActivityType;
  title: string;
  notes: string | null;
  photoUri: string | null;
  distanceM: number;
  durationS: number;
  startAtMs: number;
};

export async function updateActivityUseCase(input: UpdateActivityInput) {
  const current = await ActivityRepository.getById(input.id);

  if (!current) {
    return false;
  }

  const avgSpeedMps = input.durationS > 0 ? input.distanceM / input.durationS : null;
  const avgPaceSecPerKm = input.distanceM > 0 ? Math.round(input.durationS / (input.distanceM / 1000)) : null;

  const endAt = input.startAtMs + input.durationS * 1000;

  await ActivityRepository.update({
    id: input.id,
    type: input.type,
    status: current.status,
    title: input.title,
    notes: input.notes,
    startAt: input.startAtMs,
    endAt,
    distanceM: input.distanceM,
    durationS: input.durationS,
    avgSpeedMps,
    avgPaceSecPerKm,
    photoUri: input.photoUri,
    updatedAt: Date.now(),
  });

  const jobs = await SyncQueueRepo.list(200);

  for (const job of jobs) {
    if (job.kind !== "activity.create" && job.kind !== "activity.update") continue;
    try {
      const payload = JSON.parse(job.payloadJson) as { localActivityId?: string };
      if (payload.localActivityId === input.id) {
        await SyncQueueRepo.remove(job.id);
      }
    } catch {
    }
  }

  if (current.serverId) {
    await SyncQueueRepo.add({
      id: `sync_update_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
      kind: "activity.update",
      payloadJson: JSON.stringify({ localActivityId: input.id, serverId: current.serverId }),
      createdAt: Date.now(),
    });
  } else {
    await SyncQueueRepo.add({
      id: `sync_create_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
      kind: "activity.create",
      payloadJson: JSON.stringify({ localActivityId: input.id }),
      createdAt: Date.now(),
    });
  }

  return true;
}
