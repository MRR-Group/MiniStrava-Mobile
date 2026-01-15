import { ActivityRepository } from "@infra/db/repositories/activities.repository";

export function listActivities(limit = 200) {
  return ActivityRepository.listAll(limit);
}
