import { db } from "@infra/db/client";
import { desc, eq } from "drizzle-orm";
import { gpsPoints } from "../schema";

export type LocalGpsPoint = {
  id: number;
  activityId: string;
  lat: number;
  lng: number;
  altM: number | null;
  accuracyM: number | null;
  timestamp: number;
};

export const GpsPointsRepository = {
  async getLast(activityId: string): Promise<LocalGpsPoint | null> {
    const rows = await db
      .select()
      .from(gpsPoints)
      .where(eq(gpsPoints.activityId, activityId))
      .orderBy(desc(gpsPoints.id))
      .limit(1);

    return (rows[0] as any) ?? null;
  },

  async insertMany(activityId: string, points: Array<Omit<LocalGpsPoint, "activityId" | "id">>) {
    if (!points.length) return;

    await db.insert(gpsPoints).values(
      points.map((p) => ({
        activityId,
        lat: p.lat,
        lng: p.lng,
        altM: p.altM,
        accuracyM: p.accuracyM,
        timestamp: p.timestamp,
      }))
    );
  },

  async listForActivity(activityId: string, limit = 20000): Promise<LocalGpsPoint[]> {
    return (await db
      .select()
      .from(gpsPoints)
      .where(eq(gpsPoints.activityId, activityId))
      .orderBy(gpsPoints.id)
      .limit(limit)) as any;
  },
};