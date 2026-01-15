import { ActivityRepository } from "@infra/db/repositories/activities.repository";

export function getActivityUseCase(id: string) {
  return ActivityRepository.getById(id);
}
