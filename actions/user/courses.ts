/* eslint-disable @typescript-eslint/no-unused-vars */

"use server";

import { cookies } from "next/headers";

export const getCourses = async (name: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/courses/${name}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: (await cookies()).toString(),
      },
      next: { tags: ["courses"] },
    }
  );
  if (!res.ok) {
    return JSON.parse(await res.text());
  }
  const courses = await res.json();
  return courses;
};

export const getSingleCourse = async (id: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/courses/course/${id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: (await cookies()).toString(),
      },
      next: { tags: ["courses"] },
    }
  );
  if (!res.ok) {
    return JSON.parse(await res.text());
  }
  const course = await res.json();
  return course;
};
