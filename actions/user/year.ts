/* eslint-disable @typescript-eslint/no-unused-vars */
"use server";

export const getYearsForUser = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/years`);
    const data = await res.json();
    return data;
  } catch (error) {
    return null;
  }
};
