"use server";

import { cookies } from "next/headers";

export const createLesson = async ({
  id,
  name,
  description,
  image,
}: {
  id: string;
  name: string;
  description: string;
  image: string;
}) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/lessons/${id}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: (await cookies()).toString(),
      },
      body: JSON.stringify({
        name,
        description,
        image,
      }),
    }
  );

  if (!res.ok) {
    return JSON.parse(await res.text());
  }

  const createdLesson = await res.json();
  return createdLesson;
};

export const updateLesson = async ({
  id,
  name,
  description,
  image,
}: {
  id: string;
  name: string;
  description: string;
  image: string;
}) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/lesson/${id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Cookie: (await cookies()).toString(),
      },
      body: JSON.stringify({
        name,
        description,
        image,
      }),
    }
  );

  if (!res.ok) {
    return JSON.parse(await res.text());
  }

  const resp = await res.json();

  return resp;
};

export const updatePublishForLesson = async (id: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/lesson/publish/${id}`,
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

export const deleteLesson = async (id: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/lesson/${id}`,
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

export const getPdfs = async (id: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/lesson/pdf/${id}`,
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

  const Pdf = await res.json();
  return Pdf;
};

export const addPdf = async ({
  id,
  name,
  url,
}: {
  id: string;
  name: string;
  url: string;
}) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/lesson/pdf/${id}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: (await cookies()).toString(),
      },
      body: JSON.stringify({
        name,
        url,
      }),
    }
  );

  if (!res.ok) {
    return JSON.parse(await res.text());
  }

  const createdPdf = await res.json();
  return createdPdf;
};

export const deletePdf = async (id: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/lesson/pdf/${id}`,
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

export const addVideo = async ({
  id,
  name,
  url,
  description,
}: {
  id: string;
  name: string;
  url: string;
  description: string;
}) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/${id}/videos`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: (await cookies()).toString(),
      },
      body: JSON.stringify({
        name,
        url,
        description,
      }),
    }
  );

  if (!res.ok) {
    return JSON.parse(await res.text());
  }

  const createdVideo = await res.json();
  return createdVideo;
};

export const getVideos = async (id: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/${id}/videos`,
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

  const videos = await res.json();
  return videos;
};

export const deleteVideo = async (id: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/videos/${id}`,
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
