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
import { ResetPasswordFormModel, ResetPasswordFormSchema } from "@/infrastructure/auth/validators/reset.password.validators";
import { ResetPasswordService } from "@/infrastructure/auth/services/reset.password.service";
import { useRouter } from "next/navigation";
const ForgotPasswordHome = () => {
    const router = useRouter();
  const form = useForm<ResetPasswordFormModel>({
    resolver: zodResolver(ResetPasswordFormSchema),
    defaultValues: {
      confirmPassword: "",
      password: "",
    },
    mode: "onChange",
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (data: ResetPasswordFormModel) => {
    try {
      await ResetPasswordService(data);
      form.reset();
      router.push("/auth/sign-in");
      toast.success("Password reset successfully! You can now log in with your new password.");
    } catch (error:any) {
      toast.error(`Failed to create account. ${error.message || "Please try again."}`);

    }
  };

  return (
    <Card className="w-full max-w-sm m-auto md:p-6 rounded-sm">
      <CardHeader>
        <CardTitle className="font-bold text-xl text-center">RESET PASSWORD</CardTitle>
        <CardDescription className="text-center">
          Reset your account password.
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
                name="password"
                placeholder="********"
                label="Password"
                type="password"
              />
            </div>
              
            <div>
              <MulabInput
                control={form.control}
                name="confirmPassword"
                placeholder="********"
                label="Confirm Password"
                type="password"
              />
            </div>

            <div>
              <SubmitButton
                isSubmitting={isSubmitting}
                isValid={isValid}
                title="Create New Password"
                classname="bg-red-500 hover:bg-red-500 cursor-pointer"
              />
            </div>
          </form>
        </Form>
      </CardContent>
      <CardFooter>
        <div className="text-center text-sm text-gray-500 mt-4">
          Don't have an account?{" "}
          <Link href="/auth/sign-in" className="text-blue-500 hover:underline">
            Sign In
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ForgotPasswordHome;
