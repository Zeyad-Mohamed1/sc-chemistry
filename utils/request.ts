import { cookies } from "next/headers";
import axios from "axios";
export const createServerAxiosInstance = () => {
  return axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
      Cookie: cookies().toString(),
    },
  });
};