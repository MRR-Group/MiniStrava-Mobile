import { create } from "zustand";

export type RecordingPoint = {
  id: number;
  lat: number;
  lng: number;
  altM: number | null;
  accuracyM: number | null;
  timestamp: number;
};

type RecordingState = {
  recordingId: string | null;

  isRecording: boolean;
  isPaused: boolean;

  startAtMs: number | null; // initial start timestamp
  startedAtMs: number | null; // timestamp of the current active segment
  elapsedMs: number; // accumulated duration excluding the active segment

  distanceM: number;
  points: RecordingPoint[];

  start: (id: string, startedAtMs: number) => void;
  appendPoint: (point: Omit<RecordingPoint, "id">, deltaDistanceM: number) => void;
  pause: () => void;
  discard: () => void;
  resume: () => void;
};

export const useRecordingStore = create<RecordingState>((set, get) => ({
  recordingId: null,
  isRecording: false,
  isPaused: false,

  startAtMs: null,
  startedAtMs: null,
  elapsedMs: 0,

  distanceM: 0,
  points: [],

  start: (id, startedAtMs) =>
    set({
      recordingId: id,
      isRecording: true,
      isPaused: false,
      startAtMs: startedAtMs,
      startedAtMs,
      elapsedMs: 0,
      distanceM: 0,
      points: [],
    }),

  appendPoint: (point, deltaDistanceM) =>
    set((state) => {
      const increment = Math.max(0, Math.round(deltaDistanceM));
      const id = state.points.length + 1;

      return {
        points: [...state.points, { ...point, id }],
        distanceM: state.distanceM + increment,
      };
    }),

  pause: () => {
    const s = get();

    if (!s.isRecording || !s.startedAtMs) {
      return;
    }

    const now = Date.now();

    set({
      isRecording: false,
      isPaused: true,
      elapsedMs: s.elapsedMs + (now - s.startedAtMs),
      startedAtMs: null,
    });
  },

  resume: () => {
    const s = get();

    if (!s.isPaused) {
      return;
    }

    set({
      isRecording: true,
      isPaused: false,
      startedAtMs: Date.now(),
    });
  },

  discard: () =>
    set({
      recordingId: null,
      isRecording: false,
      isPaused: false,
      startAtMs: null,
      startedAtMs: null,
      elapsedMs: 0,
      distanceM: 0,
      points: [],
    }),
}));
