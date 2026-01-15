import { GpsPointsRepository } from "@infra/db/repositories/gps-points-repo.repository";

export async function getActivityPointsUseCase(activityId: string) {
  return GpsPointsRepository.listForActivity(activityId, 20000);
}
