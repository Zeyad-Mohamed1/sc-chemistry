"use server";

import { Course } from "@/utils/types";
import { cookies } from "next/headers";

export const createCourse = async ({
  id,
  name,
  description,
  price,
  image,
}: {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
}) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/courses/${id}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: (await cookies()).toString(),
      },
      body: JSON.stringify({
        name,
        description,
        price,
        image,
      }),
    }
  );

  if (!res.ok) {
    return JSON.parse(await res.text());
  }

  const createdCourse = await res.json();
  return createdCourse;
};

export const getCourses = async (id: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/courses/${id}`,
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
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/course/${id}`,
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

  const course = await res.json();

  return course;
};

export const updateCourse = async (id: string, course: Course) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/course/${id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Cookie: (await cookies()).toString(),
      },
      body: JSON.stringify({
        name: course.name,
        description: course.description,
        price: course.price,
        image: course.image,
      }),
    }
  );

  if (!res.ok) {
    return JSON.parse(await res.text());
  }

  const resp = await res.json();

  return resp;
};

export const updateActivationForCourse = async (id: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/course/changeIsActive/${id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Cookie: (await cookies()).toString(),
      },
    }
  );

  if (!res.ok) {
    return null;
  }

  const resp = await res.json();

  return resp;
};

export const deleteCourse = async (id: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/course/${id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Cookie: (await cookies()).toString(),
      },
    }
  );

  if (!res.ok) {
    return JSON.parse(await res.text());
  }

  const data = await res.json();

  return data;
};
