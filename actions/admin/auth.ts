"use server";
import { createServerAxiosInstance } from "@/utils/request";
import { LoginUserDto, RegisterUserDto } from "@/utils/types";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export const registerUser = async (user: RegisterUserDto) => {
  try {
    const res = await (
      await createServerAxiosInstance()
    ).post("/auth/register", user);

    return res?.data;
  } catch (error) {
    return error;
  }
};

export const loginUser = async (user: LoginUserDto) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          studentNumber: user.studentNumber,
          password: user.password,
        }),
        next: { tags: ["user"] },
      }
    );

    if (!res.ok) {
      return JSON.parse(await res.text());
    }

    const data = await res.json();

    const cookie = (await cookies()).get("token");

    if (cookie) {
      (await cookies()).delete("token");
    }

    (await cookies()).set({
      name: "token",
      value: data?.token,
    });

    revalidateTag("user");

    return data;
  } catch (error) {
    // @ts-expect-error aaa
    return error?.response?.data;
  }
};

export const logoutUser = async () => {
  try {
    (await cookies()).delete("token");
    revalidateTag("user");

    return true;
  } catch (error) {
    return error;
  }
};
