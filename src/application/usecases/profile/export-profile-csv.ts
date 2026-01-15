import * as FileSystem from "expo-file-system";
import { ProfileApi } from "@/infrastructure/api/profile.api";

export async function exportProfileCsvUseCase(): Promise<string> {
  const csv = await ProfileApi.exportCsv();
  const path = `${FileSystem.cacheDirectory ?? FileSystem.documentDirectory ?? ""}profile-export.csv`;
  await FileSystem.writeAsStringAsync(path, csv, { encoding: FileSystem.EncodingType.UTF8 });
  return path;
}
