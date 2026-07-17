"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export async function fetchVibeHistoryAction(limit: number = 50) {
  const token = cookies().get("token")?.value;
  if (!token) return [];

  try {
    const res = await fetch(`http://localhost:8000/api/v1/vibes/history?limit=${limit}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      next: { revalidate: 0 }
    });

    if (!res.ok) {
      return [];
    }

    const data = await res.json();
    return data.data || [];
  } catch (error) {
    console.error("Failed to fetch vibe history:", error);
    return [];
  }
}

export async function fetchVibeByIdAction(vibeId: string) {
  const token = cookies().get("token")?.value;
  if (!token) return null;

  try {
    const res = await fetch(`http://localhost:8000/api/v1/vibes/${vibeId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      next: { revalidate: 0 }
    });

    if (!res.ok) {
      return null;
    }

    const data = await res.json();
    return data.data || null;
  } catch (error) {
    console.error("Failed to fetch vibe by id:", error);
    return null;
  }
}

export async function deleteVibeAction(vibeId: string) {
  const token = cookies().get("token")?.value;
  if (!token) return false;

  try {
    const res = await fetch(`http://localhost:8000/api/v1/vibes/${vibeId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });

    if (res.ok) {
      revalidatePath("/history");
      revalidatePath("/dashboard");
      return true;
    }
    return false;
  } catch (error) {
    console.error("Failed to delete vibe:", error);
    return false;
  }
}
