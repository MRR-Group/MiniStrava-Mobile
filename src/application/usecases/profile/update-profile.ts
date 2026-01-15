import { ProfileApi, type UpdateProfilePayload } from "@/infrastructure/api/profile.api";
import { useSessionStore } from "@/state/session.store";

export async function updateProfileUseCase(payload: UpdateProfilePayload) {
  const user = await ProfileApi.update(payload);
  await useSessionStore.getState().setUser(user);
  return user;
}
