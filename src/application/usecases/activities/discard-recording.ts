import { stopBackgroundTracking } from "@infra/device/location-tracker";
import { useRecordingStore } from "@state/recording.store";

export async function discardRecordingUseCase() {
  await stopBackgroundTracking();
  useRecordingStore.getState().discard();
}
