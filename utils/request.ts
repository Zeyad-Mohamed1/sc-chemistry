import { cookies, type UnsafeUnwrappedCookies } from "next/headers";
import axios from "axios";
export const createServerAxiosInstance = async () => {
  return axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
      Cookie: (
        (await cookies()) as unknown as UnsafeUnwrappedCookies
      ).toString(),
    },
  });
};
