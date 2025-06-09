"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import MulabInput from "@/components/reusable-components/mulab.custom.input";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormField, FormItem } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
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
  SignUpFormModel,
  SignUpFormSchema,
} from "@/infrastructure/auth/validators/sign.up.validators";
import { signUpService } from "@/infrastructure/auth/services/sign.up.service";
import { useRouter } from "next/navigation";

const SignUpHome = () => {
  const router = useRouter();
  const form = useForm<SignUpFormModel>({
    resolver: zodResolver(SignUpFormSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
      agreeConditions: false,
    },
    mode: "onChange",
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (data: SignUpFormModel) => {
    try {
      await signUpService(data);
      form.reset();
      router.push("/auth/sign-in");
      toast.success("Account created successfully!");
    } catch (error: any) {
      toast.error(
        `Failed to create account. ${error.message || "Please try again."}`
      );
    }
  };

  return (
    <Card className="w-full max-w-md m-auto md:p-6 rounded-sm">
      <CardHeader>
        <CardTitle className="font-bold text-xl text-center">SIGN UP</CardTitle>
        <CardDescription className="text-center">
          Enter your details to create your account.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-2"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <MulabInput
                control={form.control}
                name="firstName"
                placeholder="John"
                label="First Name"
                type="text"
                autoFocus={true}
              />

              <MulabInput
                control={form.control}
                name="lastName"
                placeholder="Doe"
                label="Last Name"
                type="text"
              />
            </div>

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
                name="phoneNumber"
                placeholder="+2547909090909"
                label="Phone Number"
                type="tel"
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
              <MulabInput
                control={form.control}
                name="confirmPassword"
                placeholder="********"
                label="Confirm Password"
                type="password"
              />
            </div>

            <div>
              <FormField
                control={form.control}
                name="agreeConditions"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center gap-3">
                      <Checkbox
                        id="terms"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                      <Label htmlFor="terms">Accept terms and conditions</Label>
                    </div>
                  </FormItem>
                )}
              />
            </div>

            <div>
              <SubmitButton
                isSubmitting={isSubmitting}
                isValid={isValid}
                title="SIGN UP"
                classname="bg-red-500 hover:bg-red-500 cursor-pointer"
              />
            </div>
          </form>
        </Form>
      </CardContent>
      <CardFooter>
        <div className="mt-4 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link href="/auth/sign-in" className="text-blue-600 hover:underline">
            Sign In
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
};

export default SignUpHome;
