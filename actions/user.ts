"use server";

import { createServerAxiosInstance } from "@/utils/request";

export const getUser = async () => {
  try {
    const res = await createServerAxiosInstance().get("/users/me");

    return res.data;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    // @ts-expect-error aaa
    return error.response.data;
  }
};
