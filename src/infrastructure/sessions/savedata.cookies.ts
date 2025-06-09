"use server";
import { cookies } from "next/headers";
interface LoginResponseType {
  token: string;
  tokenType?: string;
  userId?: string;
  name?: string;
  email?: string;
  role?: string;
  profileType?: string;
}

export const saveLoginDataToCookies = async (data: LoginResponseType) => {
  const cookieStore = await cookies();
  cookieStore.set("userData", JSON.stringify(data), {
    maxAge: 60 * 60, // 1 hour
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  });
};

export const getLoginDataFromCookies = async () => {
  const cookieStore = await cookies();
  const userData = cookieStore.get("userData")?.value;

  if (!userData) {
    return null;
  }

  return {
    user: JSON.parse(userData),
  };
};

export const clearLoginDataFromCookies = async () => {
  const cookieStore = await cookies();
  cookieStore.delete("userData");
};
