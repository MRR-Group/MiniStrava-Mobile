import { api } from "@/infrastructure/api/client";

export type CreateActivityResponse = {
  id: number;
};

export type UpdateActivityResponse = {
  id: number;
};

export type LeaderboardRow = {
  place: number;
  score: number;
  user: {
    id: number;
    name: string;
    avatar?: string | null;
  };
};

export type LeaderboardResponse = {
  data: LeaderboardRow[];
};

export const ActivitiesApi = {
  async create(formData: FormData): Promise<CreateActivityResponse> {
    const { data } = await api.post<CreateActivityResponse>("/activities", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return data;
  },

  async update(id: number, formData: FormData): Promise<UpdateActivityResponse> {
    const { data } = await api.put<UpdateActivityResponse>(`/activities/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return data;
  },

  async summary(id: number): Promise<string> {
    const { data } = await api.get<{ summary: string }>(`/activities/${id}/summary`);
    return data.summary;
  },

  async leaderboard(
    type: "distance" | "duration" = "distance",
    params?: { from?: string; to?: string; limit?: number }
  ): Promise<LeaderboardResponse> {
    const { data } = await api.get<LeaderboardResponse>(`/leaderboard/${type}`, {
      params,
    });

    return data;
  },
};
