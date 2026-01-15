import { ActivityRepository, ActivityType } from "@infra/db/repositories/activities.repository";
import { GpsPointsRepository } from "@infra/db/repositories/gps-points-repo.repository";
import { SyncQueueRepo } from "@infra/db/repositories/sync-queue.repository";
import { stopBackgroundTracking } from "@infra/device/location-tracker";
import { useRecordingStore } from "@state/recording.store";

export type SaveRecordingInput = {
  type: ActivityType;
  title: string;
  notes: string | null;
  photoUri: string | null;
};

export async function saveRecordingUseCase(input: SaveRecordingInput) {
  const state = useRecordingStore.getState();

  if (!state.recordingId || !state.startAtMs) {
    return;
  }

  const now = Date.now();
  const elapsedMs = state.elapsedMs + (state.isRecording && state.startedAtMs ? now - state.startedAtMs : 0);
  const durationS = Math.max(0, Math.round(elapsedMs / 1000));
  const distanceM = Math.max(0, Math.round(state.distanceM));
  const endAt = state.points[state.points.length - 1]?.timestamp ?? now;

  const avgSpeedMps = durationS > 0 ? distanceM / durationS : null;
  const avgPaceSecPerKm = distanceM > 0 ? Math.round(durationS / (distanceM / 1000)) : null;

  await stopBackgroundTracking();

  const activityId = state.recordingId;

  await ActivityRepository.create({
    id: activityId,
    type: input.type,
    status: "finished",
    title: input.title,
    notes: input.notes,
    startAt: state.startAtMs,
    endAt,
    distanceM,
    durationS,
    avgSpeedMps,
    avgPaceSecPerKm,
    photoUri: input.photoUri,
    updatedAt: now,
  });

  await SyncQueueRepo.add({
    id: `sync_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
    kind: "activity.create",
    payloadJson: JSON.stringify({ localActivityId: activityId }),
    createdAt: Date.now(),
  });

  await GpsPointsRepository.insertMany(
    activityId,
    state.points.map((p) => ({
      lat: p.lat,
      lng: p.lng,
      altM: p.altM,
      accuracyM: p.accuracyM,
      timestamp: p.timestamp,
    }))
  );

  state.discard();

  return activityId;
}
