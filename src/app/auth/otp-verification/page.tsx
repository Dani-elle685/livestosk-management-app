
import React from "react";
import OtpVerificationHome from "./OtpVerificationHome";
import { redirect } from "next/navigation";

interface Props {
  searchParams: { email?: string };
}

const OtpVerificationPage = async ({ searchParams }: Props) => {
  const {email} = await searchParams;

  if (!email) {
    redirect("/auth/sign-in");
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <OtpVerificationHome email={email} />
    </div>
  );
};

export default OtpVerificationPage;
