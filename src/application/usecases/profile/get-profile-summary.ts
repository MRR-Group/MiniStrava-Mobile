import { ActivityRepository } from "@infra/db/repositories/activities.repository";

export function getProfileSummary() {
  return ActivityRepository.getSummary();
}
