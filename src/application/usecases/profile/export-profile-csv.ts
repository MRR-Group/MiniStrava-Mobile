import * as FileSystem from "expo-file-system/legacy";
import { Platform } from "react-native";
import Constants from "expo-constants";
import { ProfileApi } from "@/infrastructure/api/profile.api";

function resolveWritableDir(): string {
  const dir = FileSystem.documentDirectory ?? FileSystem.cacheDirectory;
  if (dir) return dir.endsWith("/") ? dir : `${dir}/`;

  if (Platform.OS === "android") {
    const appId = Constants.expoConfig?.android?.package ?? Constants.expoConfig?.slug ?? "app";
    return `/data/data/${appId}/cache/`;
  }

  return "/tmp/";
}

export async function exportProfileCsvUseCase(): Promise<string> {
  const csv = await ProfileApi.exportCsv();

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
      console.warn("[Profile] SAF export failed, falling back to app directory", e);
    }
  }

  const dir = resolveWritableDir();

  try {
    await FileSystem.makeDirectoryAsync(dir, { intermediates: true });
  } catch (e: any) {
  }

  const path = `${dir}profile-export.csv`;

  await FileSystem.writeAsStringAsync(path, csv);
  return path;
}
