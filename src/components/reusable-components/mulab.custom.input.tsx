"use client";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { Control, FieldPath, FieldValues } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";

type InputProps<T extends FieldValues> = {
  label: string;
  description?: string;
  name: FieldPath<T>;
  control: Control<T>;
  placeholder: string;
  type: string;
  disabled?: boolean;
  autoFocus?: boolean;
  className?: string;
};

const MulabInput = <T extends FieldValues>({
  control,
  name,
  placeholder,
  label,
  description,
  type,
  disabled = false,
  autoFocus = false,
  className,
}: InputProps<T>) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPasswordField = type === "password";

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        const inputType = isPasswordField && showPassword ? "text" : type;

        return (
          <FormItem className="flex flex-col">
            <FormLabel className="form-label">{label}</FormLabel>
            <FormDescription>{description}</FormDescription>
            {/* Only this div wraps input and toggle, relative and fixed height */}
            <div className="relative w-full h-8">
              <FormControl>
                <Input
                  className={cn(
                    "input-class h-8 pr-10 placeholder:text-xs placeholder:font-light",
                    className
                  )}
                  placeholder={placeholder}
                  {...field}
                  type={inputType}
                  disabled={disabled}
                  autoFocus={autoFocus}
                  ref={field.ref}
                />
              </FormControl>
              {isPasswordField && (
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-black focus:outline-none z-10"
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              )}
            </div>
            {/* Place the error message here, outside the relative wrapper */}
            <FormMessage className="form-message mt-2 text-red-600" />
          </FormItem>
        );
      }}
    />
  );
};

export default MulabInput;
