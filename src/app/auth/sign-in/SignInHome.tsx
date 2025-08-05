"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import MulabInput from "@/components/reusable-components/mulab.custom.input";
import { Form } from "@/components/ui/form";
import SubmitButton from "@/components/reusable-components/submit.button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";
import Link from "next/link";
import {
  SignInFormModel,
  SignInFormSchema,
} from "@/infrastructure/auth/validators/sign.in.validators";
import { signInService } from "@/infrastructure/auth/services/sign.in.service";
import { useRouter } from "next/navigation";
import { generateOtp } from "@/infrastructure/auth/services/verify.otp.service";
import HCaptcha from "@hcaptcha/react-hcaptcha";
const SignInHome = () => {
    const router = useRouter();
  const form = useForm<SignInFormModel>({
    resolver: zodResolver(SignInFormSchema),
    defaultValues: {
      email: "",
      password: "",
      captchaToken:""
    },
    mode: "onChange",
  });

  const { isSubmitting, isValid } = form.formState;
  const handleVerificationSuccess =(token:string, ekey:string)=>{
    form.setValue("captchaToken", token, { shouldValidate: true });
  }

  const onSubmit = async (data: SignInFormModel) => {
    try {
      await signInService(data);
      await generateOtp(data.email); 
      form.reset();
      router.push(`/auth/otp-verification?email=${data.email}`);
      toast.success("Signed in successfully!");
    } catch (error:any) {
      toast.error(`Failed to sign in. ${error.message || "Please try again."}`);
    }
  };

  return (
    <Card className="w-full max-w-sm m-auto md:p-6 rounded-sm">
      <CardHeader>
        <CardTitle className="font-bold text-xl text-center">SIGN IN</CardTitle>
        <CardDescription className="text-center">
          Welcome Back! Sign in to access livestock marketplace platform.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-2"
          >
            <div>
              <MulabInput
                control={form.control}
                name="email"
                placeholder="johndoe@gmail.com"
                label="Email Address"
                type="email"
              />
            </div>
            <div>
              <MulabInput
                control={form.control}
                name="password"
                placeholder="********"
                label="Password"
                type="password"
              />
            </div>
             <div>
              <HCaptcha
                sitekey={process.env.NEXT_PUBLIC_HCAPTURE_KEY!}
                onVerify={(token,ekey) => handleVerificationSuccess(token, ekey)}
              />
            </div>

            <div>
              <SubmitButton
                isSubmitting={isSubmitting}
                isValid={isValid}
                title="SIGN IN"
                classname="bg-red-500 hover:bg-red-500 cursor-pointer"
              />
            </div>
          </form>
        </Form>
      </CardContent>
      <CardFooter>
        <div className="text-center text-sm text-gray-500 mt-4">
          Forgot your password?{" "}
          <Link
            href="/auth/forgot-password"
            className="text-blue-500 hover:underline"
          >
            Reset Password
          </Link>
        </div>
        <div className="text-center text-sm text-gray-500 mt-4">
          Don't have an account?{" "}
          <Link href="/auth/sign-up" className="text-blue-500 hover:underline">
            Sign Up
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
};

export default SignInHome;
