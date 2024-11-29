"use server";

import { revalidateTag } from "next/cache";
// import { createServerAxiosInstance } from "@/utils/request";
import { cookies } from "next/headers";

export const getStats = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/statistics`,
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

  const stats = await res.json();

  return stats;
};

export const getCoursesForUser = async (id: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/usercourses/${id}`,
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

  const courses = await res.json();

  return courses;
};

export const addCourseForUser = async ({
  userId,
  courseId,
}: {
  userId: string;
  courseId: string;
}) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/addcourse/${userId}/${courseId}`,
    {
      method: "POST",
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

export const removeCourseForUser = async ({ id }: { id: string }) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/removecourse/${id}`,
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

export const getUser = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user/me`, {
    method: "GET",
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      Cookie: (await cookies()).toString(),
    },
    next: { tags: ["user"] },
  });

  if (!res.ok) {
    return null;
  }
  const user = await res.json();
  return user;
};

export const getUserCourses = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/courses`,
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

  const courses = await res.json();

  return courses;
};

export const deleteUser = async (id: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/user/${id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Cookie: (await cookies()).toString(),
      },
    }
  );

  if (!res.ok) {
    return null;
  }

  revalidateTag("users");

  const user = await res.json();

  return user;
};

export const getAllUsers = async ({
  page,
  query,
  year,
}: {
  page: string;
  query?: string;
  year?: string;
}) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/users?page=${page}&query=${query}&year=${year}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: (await cookies()).toString(),
      },
      next: { tags: ["users"] },
    }
  );

  if (!res.ok) {
    return null;
  }

  const user = await res.json();

  return user;
};

export const changePassword = async ({
  id,
  password,
}: {
  id: string;
  password: string;
}) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/user/${id}/password`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Cookie: (await cookies()).toString(),
      },
      body: JSON.stringify({ password }),
    }
  );

  if (!res.ok) {
    return JSON.parse(await res.text());
  }

  const data = await res.json();

  return data;
};
