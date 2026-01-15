import { ActivitiesApi } from "@/infrastructure/api/activities";

export async function getActivitySummaryUseCase(id: number | string): Promise<string> {
  const activityId = Number(id);
  if (Number.isNaN(activityId)) {
    throw new Error("Invalid activity id");
  }

  return ActivitiesApi.summary(activityId);
}
