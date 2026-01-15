import * as FileSystem from "expo-file-system/legacy";
import { Platform } from "react-native";
import Constants from "expo-constants";
import { ProfileApi } from "@/infrastructure/api/profile.api";

function resolveWritableDir(): string {
  const dir = FileSystem.documentDirectory ?? FileSystem.cacheDirectory;
  if (dir) return dir.endsWith("/") ? dir : `${dir}/`;

  // Fallback paths if expo directories are undefined (some bare builds)
  if (Platform.OS === "android") {
    const appId = Constants.expoConfig?.android?.package ?? Constants.expoConfig?.slug ?? "app";
    return `/data/data/${appId}/cache/`;
  }

  // iOS and other: tmp
  return "/tmp/";
}

export async function exportProfileCsvUseCase(): Promise<string> {
  const csv = await ProfileApi.exportCsv();

  // Android: try Storage Access Framework so the user can pick a public folder (e.g. Downloads)
  if (Platform.OS === "android" && FileSystem.StorageAccessFramework) {
    try {
      const perm = await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
      if (perm.granted && perm.directoryUri) {
        const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
        const fileUri = await FileSystem.StorageAccessFramework.createFileAsync(
          perm.directoryUri,
          `profile-export-${timestamp}.csv`,
          "text/csv"
        );
        await FileSystem.writeAsStringAsync(fileUri, csv);
        return fileUri;
      }
    } catch (e) {
      // fall back to app sandbox
      console.warn("[Profile] SAF export failed, falling back to app directory", e);
    }
  }

  const dir = resolveWritableDir();

  // Ensure directory exists when using fallback manual paths
  try {
    await FileSystem.makeDirectoryAsync(dir, { intermediates: true });
  } catch (e: any) {
    // ignore EEXIST / permission issues; write will surface meaningful error
  }

  const path = `${dir}profile-export.csv`;

  // writeAsStringAsync from legacy export; default encoding is UTF-8
  await FileSystem.writeAsStringAsync(path, csv);

  return path;
}
