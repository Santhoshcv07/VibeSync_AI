"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function loginAction(formData: FormData) {
  const email = formData.get("email");
  const password = formData.get("password");

  if (!email || !password) {
    return { error: "Email and password are required" };
  }

  try {
    const res = await fetch("http://localhost:8000/api/v1/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        username: email.toString(),
        password: password.toString(),
      }),
    });

    if (!res.ok) {
      const data = await res.json();
      return { error: data.detail || "Invalid credentials" };
    }

    const data = await res.json();
    cookies().set("token", data.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 30 * 24 * 60 * 60, // 30 days
      path: "/",
    });

    return { success: true };
  } catch (error) {
    console.error("Login error:", error);
    return { error: "Failed to connect to the server" };
  }
}

export async function signupAction(formData: FormData) {
  const email = formData.get("email");
  const password = formData.get("password");
  const name = formData.get("name");

  if (!email || !password) {
    return { error: "Email and password are required" };
  }

  try {
    const res = await fetch("http://localhost:8000/api/v1/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email.toString(),
        password: password.toString(),
        name: name ? name.toString() : null,
      }),
    });

    if (!res.ok) {
      const data = await res.json();
      return { error: data.detail || "Failed to create account" };
    }

    // Immediately log them in
    return loginAction(formData);
  } catch (error) {
    console.error("Signup error:", error);
    return { error: "Failed to connect to the server" };
  }
}

export async function logoutAction() {
  cookies().delete("token");
  redirect("/login");
}

export async function fetchUserAction() {
  const { getCurrentUser } = await import("@/lib/auth");
  return await getCurrentUser();
}
