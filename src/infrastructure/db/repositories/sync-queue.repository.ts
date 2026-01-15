import { db } from "@/infrastructure/db/client";
import { syncQueue } from "@/infrastructure/db/schema/sync-queue";
import { eq } from "drizzle-orm";

export type SyncJob = {
  id: string;
  kind: string;
  payloadJson: string;
  createdAt: number;
};

export const SyncQueueRepo = {
  async add(job: SyncJob) {
    await db.insert(syncQueue).values(job);
  },

  async list(limit = 50): Promise<SyncJob[]> {
    return await db.select().from(syncQueue).limit(limit);
  },

  async remove(id: string) {
    await db.delete(syncQueue).where(eq(syncQueue.id, id));
  },
};
