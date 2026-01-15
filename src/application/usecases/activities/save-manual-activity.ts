import { ActivityRepository, ActivityType } from "@infra/db/repositories/activities.repository";
import { SyncQueueRepo } from "@infra/db/repositories/sync-queue.repository";

function generateActivityId() {
  return `manual_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;
}

export type SaveManualActivityInput = {
  type: ActivityType;
  title: string;
  notes: string | null;
  photoUri: string | null;
  distanceM: number;
  durationS: number;
  startAtMs: number;
};

export async function saveManualActivityUseCase(input: SaveManualActivityInput) {
  const id = generateActivityId();

  const avgSpeedMps = input.durationS > 0 ? input.distanceM / input.durationS : null;
  const avgPaceSecPerKm = input.distanceM > 0 ? Math.round(input.durationS / (input.distanceM / 1000)) : null;

  const startAt = input.startAtMs;
  const endAt = startAt + input.durationS * 1000;

  const updatedAt = Date.now();

  await ActivityRepository.create({
    id,
    type: input.type,
    status: "finished",
    title: input.title,
    notes: input.notes,
    startAt,
    endAt,
    distanceM: input.distanceM,
    durationS: input.durationS,
    avgSpeedMps,
    avgPaceSecPerKm,
    photoUri: input.photoUri,
    updatedAt,
  });

  await SyncQueueRepo.add({
    id: `sync_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
    kind: "activity.create",
    payloadJson: JSON.stringify({ localActivityId: id }),
    createdAt: Date.now(),
  });
}
