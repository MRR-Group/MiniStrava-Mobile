import api from "./api";

export type User = {
  id: number;
  name: string;
  email: string;
};

export type AuthResponse = {
  token: string;
  user: User;
};
const API_URL = (process as any)?.env?.API_URL;

export async function login(email: string, password: string) {
  try {
    const res = await fetch(`${API_URL}/login`);

    console.log("Chuj", res);
  }
  catch(e) {
    console.log("ERROR", e);
  }

  // const { data } = await api.post<AuthResponse>("/login", { email, password });
  
  // return data;
}

export async function register(payload: { name: string; email: string; password: string; password_confirmation: string }) {
  const { data } = await api.post<AuthResponse>("/register", payload);

  return data;
}

export async function logout() {
  await api.post("/logout");
}

export async function me() {
  const { data } = await api.get<User>("/user");
  
  return data;
}