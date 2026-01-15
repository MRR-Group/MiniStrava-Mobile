import { requestLocationPermissions, startBackgroundTracking } from "@infra/device/location-tracker";
import { useRecordingStore } from "@state/recording.store";

function generateRecordingId() {
  return `rec_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

export async function startRecordingUseCase(notificationText: string) {
  const state = useRecordingStore.getState();

  if (state.isRecording || state.isPaused) {
    return { id: state.recordingId };
  }

  const recordingId = generateRecordingId();
  const startedAt = Date.now();

  await requestLocationPermissions();
  state.start(recordingId, startedAt);

  await startBackgroundTracking(notificationText);

  return { id: recordingId };
}
