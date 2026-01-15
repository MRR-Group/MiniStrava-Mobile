import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core";

export const gpsPoints = sqliteTable("gps_points", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  activityId: text("activity_id").notNull(),

  lat: real("lat").notNull(),
  lng: real("lng").notNull(),

  altM: real("alt_m"),
  accuracyM: real("accuracy_m"),

  timestamp: integer("timestamp").notNull(),
});
