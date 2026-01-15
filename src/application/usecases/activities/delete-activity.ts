import { ActivityRepository } from "@infra/db/repositories/activities.repository";
import { GpsPointsRepository } from "@infra/db/repositories/gps-points-repo.repository";
import { SyncQueueRepo } from "@infra/db/repositories/sync-queue.repository";

export async function deleteActivityUseCase(id: string) {
  const jobs = await SyncQueueRepo.list(100);

  for (const job of jobs) {
    if (job.kind !== "activity.create") {
      continue;
    }

    try {
      const payload = JSON.parse(job.payloadJson) as { localActivityId?: string };
      if (payload.localActivityId === id) {
        await SyncQueueRepo.remove(job.id);
      }
    } catch {
    }
  }

  await GpsPointsRepository.deleteForActivity(id);
  await ActivityRepository.delete(id);
}
