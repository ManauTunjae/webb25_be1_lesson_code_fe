import { apiFetch } from "./client";

export async function login(loginData) {
  return apiFetch(
    "/auth/login",
    {
      method: "POST",
    },
    loginData,
  );
}
