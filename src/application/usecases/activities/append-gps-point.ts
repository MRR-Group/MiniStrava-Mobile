import { useRecordingStore } from "@/state/recording.store";
import { haversineMeters } from "../services/haversine-meters";

export type AppendGpsPointInput = {
  recordingId: string;

  lat: number;
  lng: number;

  altM?: number | null;
  accuracyM?: number | null;

  timestamp: number; 
};

export async function appendGpsPointUseCase(input: AppendGpsPointInput) {
  const store = useRecordingStore.getState();

  if (!store.isRecording) return;
  if (store.recordingId !== input.recordingId) return;

  if (input.accuracyM != null && input.accuracyM > 50) {
    return;
  }

  const last = store.points[store.points.length - 1];

  const nextPoint = {
    lat: input.lat,
    lng: input.lng,
    altM: input.altM ?? null,
    accuracyM: input.accuracyM ?? null,
    timestamp: input.timestamp,
  };

  if (!last) {
    store.appendPoint(nextPoint, 0);
    return;
  }

  const delta = haversineMeters(
    { lat: last.lat, lng: last.lng },
    { lat: input.lat, lng: input.lng }
  );

  const dtSec = Math.max(0, (input.timestamp - last.timestamp) / 1000);
  const speedMps = dtSec > 0 ? delta / dtSec : 0;

  if (delta < 0.2) return;
  if (delta > 120) return;
  if (speedMps > 15) return; 

  const acc = input.accuracyM ?? last.accuracyM ?? 0;
  if (acc > 0 && delta < acc * 0.2) {
    return;
  }

  store.appendPoint(nextPoint, delta);
}
