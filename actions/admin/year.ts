"use server";

import { Year } from "@/utils/types";
// import { createServerAxiosInstance } from "@/utils/request";
import { cookies } from "next/headers";

export const createYear = async (year: Year) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/years`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: (await cookies()).toString(),
      },
      body: JSON.stringify({ name: year.name, image: year.image }),
    }
  );

  if (!res.ok) {
    return JSON.parse(await res.text());
  }

  const createdYear = await res.json();
  return createdYear;
};

export const getYears = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/years`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: (await cookies()).toString(),
      },
      next: { tags: ["years"] },
    }
  );

  if (!res.ok) {
    return null;
  }

  const years = await res.json();
  return years;
};

export const getSingleYear = async (id: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/years/${id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: (await cookies()).toString(),
      },
    }
  );

  if (!res.ok) {
    return null;
  }

  const year = await res.json();

  return year;
};

export const updateYear = async (id: string, year: Year) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/years/${id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Cookie: (await cookies()).toString(),
      },
      body: JSON.stringify({ name: year.name, image: year.image }),
    }
  );

  if (!res.ok) {
    return null;
  }

  const resp = await res.json();

  return resp;
};

export const updateActivationForYear = async (id: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/years/${id}/active`,
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

export const deleteYear = async (id: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/years/${id}`,
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

  const data = await res.json();

  return data;
};
