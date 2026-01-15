import * as Location from "expo-location";
import * as TaskManager from "expo-task-manager";

import { appendGpsPointUseCase } from "@/application/usecases/activities/append-gps-point";
import { useRecordingStore } from "@/state/recording.store";

const TASK_NAME = "MINISTRAVA_LOCATION_TASK";

let isTaskDefined = false;

export function ensureLocationTaskDefined() {
  if (isTaskDefined) {
    return;
  }
  
  isTaskDefined = true;

  TaskManager.defineTask(TASK_NAME, async ({ data, error }) => {
    if (error) {
      return;
    }

    const store = useRecordingStore.getState();
    const recordingId = store.recordingId;

    if (!recordingId || !store.isRecording) {
      return;
    }

    const locations = (data as any)?.locations as Location.LocationObject[] | undefined;
    
    if (!locations?.length) {
      return;
    }
    
    for (const loc of locations) {
      const c = loc.coords;

      await appendGpsPointUseCase({
        recordingId,
        lat: c.latitude,
        lng: c.longitude,
        altM: c.altitude ?? null,
        accuracyM: c.accuracy ?? null,
        timestamp: loc.timestamp ?? Date.now(),
      });
    }
  });
}

export async function requestLocationPermissions() {
  const fg = await Location.requestForegroundPermissionsAsync();

  if (fg.status !== "granted") {
    throw new Error("foreground_location_denied");
  }

  const bg = await Location.requestBackgroundPermissionsAsync();

  if (bg.status !== "granted") {
    throw new Error("background_location_denied");
  }
}

export async function startBackgroundTracking(notificationText: string) {
  ensureLocationTaskDefined();

  const started = await Location.hasStartedLocationUpdatesAsync(TASK_NAME);
  if (started) return;

  await Location.startLocationUpdatesAsync(TASK_NAME, {
    accuracy: Location.Accuracy.High,
    timeInterval: 5000,
    distanceInterval: 5,
    deferredUpdatesInterval: 5000,
    deferredUpdatesDistance: 5,

    foregroundService: {
      notificationTitle: "MiniStrava",
      notificationBody: notificationText,
      notificationColor: "7c5cff",
    },

    pausesUpdatesAutomatically: false,
    showsBackgroundLocationIndicator: true,

    activityType: Location.ActivityType.Fitness,
  });
}

export async function stopBackgroundTracking() {
  const started = await Location.hasStartedLocationUpdatesAsync(TASK_NAME);
  if (!started) return;

  await Location.stopLocationUpdatesAsync(TASK_NAME);
}
