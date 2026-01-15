import { startBackgroundTracking } from "@infra/device/location-tracker";
import { useRecordingStore } from "@state/recording.store";

export async function resumeRecordingUseCase(notificationText: string) {
  const store = useRecordingStore.getState();

  if (!store.recordingId || !store.isPaused) {
    return;
  }

  store.resume();
  await startBackgroundTracking(notificationText);
}