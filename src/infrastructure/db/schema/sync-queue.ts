import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const syncQueue = sqliteTable("sync_queue", {
  id: text("id").primaryKey(),
  kind: text("kind").notNull(),
  payloadJson: text("payload_json").notNull(),
  createdAt: integer("created_at").notNull(),
});
