import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core";

export const activities = sqliteTable("activities_local", {
  id: text("id").primaryKey(),

  type: text("type").notNull(), // "run" | "ride" | "walk" | "other"
  status: text("status").notNull(),

  title: text("title"),
  notes: text("notes"),

  startAt: integer("start_at").notNull(),
  endAt: integer("end_at"),

  distanceM: integer("distance_m").notNull().default(0),
  durationS: integer("duration_s").notNull().default(0),

  avgSpeedMps: real("avg_speed_mps"),
  avgPaceSecPerKm: real("avg_pace_s_per_km"),

  photoUri: text("photo_uri"),
  serverId: integer("server_id"),

  updatedAt: integer("updated_at").notNull(),
});
