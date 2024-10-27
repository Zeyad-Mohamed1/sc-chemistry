"use server";

import { cookies } from "next/headers";

export const getAllLessons = async (id: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/lessons/${id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: (await cookies()).toString(),
      },
    }
  );

  if (!res.ok) {
    return JSON.parse(await res.text());
  }

  const lessons = await res.json();

  return lessons;
};

export const getSingleLesson = async (id: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/lessons/lesson/${id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: (await cookies()).toString(),
      },
    }
  );

  if (!res.ok) {
    return JSON.parse(await res.text());
  }

  const lesson = await res.json();

  return lesson;
};
