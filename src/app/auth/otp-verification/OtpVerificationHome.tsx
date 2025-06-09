"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  OtpVerificationModel,
  OtpVerificationSchema,
} from "@/infrastructure/auth/validators/otp.verifiication.schema";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";
import { generateOtp, OtpVerificationService } from "@/infrastructure/auth/services/verify.otp.service";

interface OtpVerificationHomeProps {
  title?: string;
  description?: string;
  email: string;
}

const OtpVerificationHome: React.FC<OtpVerificationHomeProps> = ({
  title,
  description,
  email,
}) => {
  const router = useRouter();
  const [resendCooldown, setResendCooldown] = useState(60);
  const [status, setStatus] = useState<"success" | "error" | null>(null);

  const form = useForm<OtpVerificationModel>({
    resolver: zodResolver(OtpVerificationSchema),
    defaultValues: {
      otp: "",
    },
    mode: "onChange",
  });

  const { isSubmitting, isValid } = form.formState;

  const handleOtpVerification = async (data: OtpVerificationModel) => {
    try {
     await OtpVerificationService(email,data);
      setStatus("success");
      toast.success("OTP verified successfully! Redirecting to dashboard...");
      setTimeout(() => router.push("/dashboard"), 1000);
    } catch {
      setStatus("error");
      toast.error("Failed to verify OTP. Please try again.");
    }
  };

  const handleResendOtp = async () => {
    try {
      await generateOtp(email);
      setResendCooldown(180);
      setStatus(null); 
      form.setValue("otp", "");
      toast.success("OTP resent successfully! Please check your email.");
    } catch {
      toast.error("Failed to resend OTP. Please try again.");
    }
  };

  const getSlotClass = () => {
    if (status === "success") return "border-green-500";
    if (status === "error") return "border-red-500";
    return "";
  };

  return (
    <div className="w-full flex items-center md:justify-center">
      <Card className="w-full md:max-w-md m-auto py-6 rounded-sm flex">
        <CardHeader>
          <CardTitle className="text-base text-center" aria-live="polite">
            Verify the OTP sent to your email: {email}
          </CardTitle>
          <CardDescription className="text-center">Enter the OTP in the input fields below</CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleOtpVerification)} className="space-y-6">
              <FormField
                control={form.control}
                name="otp"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="flex justify-center my-4">
                        <InputOTP
                          maxLength={6}
                          {...field}
                          aria-label="Enter your 6-digit OTP"
                        >
                          <InputOTPGroup>
                            {Array.from({ length: 6 }).map((_, index) => (
                              <InputOTPSlot
                                key={index}
                                index={index}
                                className={`transition-colors duration-200 ${getSlotClass()}`}
                              />
                            ))}
                          </InputOTPGroup>
                        </InputOTP>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex items-center justify-center gap-4">
                <CountdownCircleTimer
  isPlaying={resendCooldown > 0}
  duration={180} // 3 minutes in seconds
  key={resendCooldown}
  colors="#ef4444"
  size={42}
  strokeWidth={4}
  onComplete={() => {
    setResendCooldown(0);
    return { shouldRepeat: false };
  }}
>
  {({ remainingTime }) => {
    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;
    const paddedSeconds = seconds.toString().padStart(2, "0");

    return (
      <div className="text-xs text-red-500 font-medium">
        {minutes}:{paddedSeconds}
      </div>
    );
  }}
</CountdownCircleTimer>

                <Button
                  type="button"
                  variant="link"
                  onClick={handleResendOtp}
                  disabled={resendCooldown > 0}
                  className="text-red-500 text-sm disabled:opacity-50"
                >
                  Resend OTP
                </Button>
              </div>

              <Button
                type="submit"
                className="w-full bg-red-500 hover:bg-red-600 text-white"
                disabled={!isValid || isSubmitting}
              >
                {isSubmitting ? "Verifying..." : "VERIFY OTP"}
              </Button>
            </form>
          </Form>
        </CardContent>

        <CardFooter>
          <Button
            type="button"
            variant="link"
            className="text-sm mb-4 p-0"
            onClick={() => router.back()}
          >
            ← Back
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default OtpVerificationHome;
