import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export interface User {
  id: number;
  email: string;
  is_active: bool;
}

export async function getCurrentUser(): Promise<User | null> {
  const token = cookies().get("token")?.value;
  if (!token) return null;

  try {
    const res = await fetch("http://localhost:8000/api/v1/auth/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      next: { revalidate: 60 } // cache for 1 minute
    });

    if (!res.ok) {
      if (res.status === 401 || res.status === 403) {
        return null;
      }
      throw new Error("Failed to fetch user");
    }

    return await res.json();
  } catch (error) {
    console.error("Failed to fetch user:", error);
    return null;
  }
}

export async function requireAuth() {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login");
  }
  return user;
}
