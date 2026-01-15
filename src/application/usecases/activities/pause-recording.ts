import { stopBackgroundTracking } from "@infra/device/location-tracker";
import { useRecordingStore } from "@state/recording.store";

export async function pauseRecordingUseCase() {
  await stopBackgroundTracking();
  useRecordingStore.getState().pause();
}
