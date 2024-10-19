"use server";

// import { createServerAxiosInstance } from "@/utils/request";
import { cookies } from "next/headers";

export const getUser = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Cookie: cookies().toString(),
    },
    next: { tags: ["user"] },
  });

  if (!res.ok) {
    return null;
  }

  const user = await res.json();
  return user;
};
