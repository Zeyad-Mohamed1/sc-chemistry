"use server";
import { createServerAxiosInstance } from "@/utils/request";
import { LoginUserDto, RegisterUserDto } from "@/utils/types";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export const registerUser = async (user: RegisterUserDto) => {
  try {
    const res = await createServerAxiosInstance().post("/auth/register", user);

    return res.data;
  } catch (error) {
    return error;
  }
};

export const loginUser = async (user: LoginUserDto) => {
  try {
    const res = await createServerAxiosInstance().post("/auth/login", user, {
      withCredentials: true,
    });

    const cookie = cookies().get("token");

    if (cookie) {
      cookies().delete("token");
    }

    cookies().set({
      name: "token",
      value: res.data.token,
    });

    revalidateTag("user");

    return res.data;
  } catch (error) {
    // @ts-expect-error aaa
    return error?.response.data;
  }
};
