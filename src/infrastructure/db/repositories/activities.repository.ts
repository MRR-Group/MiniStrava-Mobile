import { db } from "@infra/db/client";
import { activities } from "@infra/db/schema/activities";
import { eq, inArray, sql, ne } from "drizzle-orm";

export type ActivityType = "run" | "walk" | "ride" | "other";

export const ActivityRepository = {
  async create(input: {
    id: string;
    type: ActivityType;
    status: "finished" | "recording" | "synced";
    title: string;
    notes: string | null;
    startAt: number;
    endAt: number;
    distanceM: number;
    durationS: number;
    avgSpeedMps: number | null;
    avgPaceSecPerKm: number | null;
    photoUri: string | null;
    updatedAt: number;
  }) {
    await db.insert(activities).values({
      id: input.id,
      type: input.type,
      status: input.status,
      title: input.title,
      notes: input.notes,
      startAt: input.startAt,
      endAt: input.endAt,
      distanceM: input.distanceM,
      durationS: input.durationS,
      avgSpeedMps: input.avgSpeedMps,
      avgPaceSecPerKm: input.avgPaceSecPerKm,
      photoUri: input.photoUri,
      updatedAt: input.updatedAt,
    });
  },

  async finish(input: {
    id: string;
    title: string;
    notes: string | null;
    photoUri: string | null;
    updatedAt: number;
  }) {
    await db
      .update(activities)
      .set({
        title: input.title,
        notes: input.notes,
        photoUri: input.photoUri,
        status: "finished",
        updatedAt: input.updatedAt,
      })
      .where(eq(activities.id, input.id));
  },

  async update(input: {
    id: string;
    type: ActivityType;
    status?: "finished" | "recording" | "synced";
    title: string;
    notes: string | null;
    startAt: number;
    endAt: number;
    distanceM: number;
    durationS: number;
    avgSpeedMps: number | null;
    avgPaceSecPerKm: number | null;
    photoUri: string | null;
    updatedAt: number;
  }) {
    await db
      .update(activities)
      .set({
        type: input.type,
        status: input.status ?? "finished",
        title: input.title,
        notes: input.notes,
        startAt: input.startAt,
        endAt: input.endAt,
        distanceM: input.distanceM,
        durationS: input.durationS,
        avgSpeedMps: input.avgSpeedMps,
        avgPaceSecPerKm: input.avgPaceSecPerKm,
        photoUri: input.photoUri,
        updatedAt: input.updatedAt,
      })
      .where(eq(activities.id, input.id));
  },

  async getById(id: string) {
    const rows = await db.select().from(activities).where(eq(activities.id, id)).limit(1);

    return rows[0] ?? null;
  },

  async listAll(limit = 200): Promise<typeof activities.$inferSelect[]> {
    return db
      .select()
      .from(activities)
      .orderBy(sql`${activities.startAt} DESC`)
      .limit(limit);
  },

  async listNotSynced(limit = 200): Promise<typeof activities.$inferSelect[]> {
    return db
      .select()
      .from(activities)
      .where(ne(activities.status, "synced"))
      .orderBy(sql`${activities.startAt} DESC`)
      .limit(limit);
  },

  async getSummary() {
    const [row] = await db
      .select({
        total: sql<number>`count(*)`,
        distanceM: sql<number>`ifnull(sum(${activities.distanceM}), 0)`,
        durationS: sql<number>`ifnull(sum(${activities.durationS}), 0)`,
        lastAt: sql<number | null>`max(${activities.startAt})`,
      })
      .from(activities)
      .where(inArray(activities.status, ["finished", "synced"]));

    return {
      totalActivities: row?.total ?? 0,
      totalDistanceM: row?.distanceM ?? 0,
      totalDurationS: row?.durationS ?? 0,
      lastActivityAtMs: row?.lastAt ?? null,
    };
  },

  async updateDistance(id: string, distanceM: number) {
    await db
      .update(activities)
      .set({ distanceM, updatedAt: Date.now() })
      .where(eq(activities.id, id));
  },

  async markSynced(localId: string, serverId: number) {
    await db
      .update(activities)
      .set({ status: "synced", serverId, updatedAt: Date.now() })
      .where(eq(activities.id, localId));
  },

  async delete(id: string) {
    await db.delete(activities).where(eq(activities.id, id));
  },
};
