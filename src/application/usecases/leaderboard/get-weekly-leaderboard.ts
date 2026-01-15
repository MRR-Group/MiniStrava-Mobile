import { ActivitiesApi } from "@infra/api/activities";

export type LeaderboardEntry = {
  userId: number;
  name: string;
  distanceM: number;
  avatar?: string | null;
  place: number;
};

export async function getWeeklyLeaderboard(): Promise<LeaderboardEntry[]> {
  const res = await ActivitiesApi.leaderboard("distance", { limit: 50 });

  return res.data.map((row) => ({
    userId: row.user.id,
    name: row.user.name,
    avatar: row.user.avatar ?? null,
    distanceM: row.score,
    place: row.place,
  }));
}