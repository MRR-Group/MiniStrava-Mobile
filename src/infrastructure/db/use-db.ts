import { useMemo } from "react";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import { db } from "./client";
import migrations from "../../../drizzle/migrations"

export type DbState =
  | { ready: false; error: null }
  | { ready: false; error: Error }
  | { ready: true; error: null };

export function useDb(): DbState {
  const result = useMigrations(db, migrations);

  return useMemo(() => {
    if (result.error) {
      return { ready: false, error: result.error };
    }

    if (!result.success) {
      return { ready: false, error: null };
    }

    return { ready: true, error: null };
  }, [result.error, result.success]);
}
