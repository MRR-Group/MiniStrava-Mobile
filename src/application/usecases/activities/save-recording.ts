import { ActivityRepository, ActivityType } from "@infra/db/repositories/activities.repository";
import { GpsPointsRepository } from "@infra/db/repositories/gps-points-repo.repository";
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

  await ActivityRepository.create({
    id: state.recordingId,
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

  await GpsPointsRepository.insertMany(
    state.recordingId,
    state.points.map((p) => ({
      lat: p.lat,
      lng: p.lng,
      altM: p.altM,
      accuracyM: p.accuracyM,
      timestamp: p.timestamp,
    }))
  );

  state.discard();
}
