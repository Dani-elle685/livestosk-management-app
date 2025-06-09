import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import React, { useRef, useState, KeyboardEvent } from "react";
import { Control, FieldPath, FieldValues } from "react-hook-form";

type TagInputProps<T extends FieldValues> = {
  label: string;
  description?: string;
  name: FieldPath<T>;
  control: Control<T>;
  placeholder: string;
  disabled?: boolean;
  className?: string;
};

const MulabCustomMultipleInput = <T extends FieldValues>({
  label,
  description,
  name,
  control,
  placeholder,
  disabled = false,
  className,
}: TagInputProps<T>) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState("");

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        const tags: string[] = field.value || [];

        const addTag = (value: string) => {
          if (value.trim() && !tags.includes(value.trim())) {
            field.onChange([...tags, value.trim()]);
          }
          setInputValue("");
        };

        const removeTag = (index: number) => {
          const updated = tags.filter((_, i) => i !== index);
          field.onChange(updated);
        };

        const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
          if ((e.key === "Enter" || e.key === ",") && inputValue.trim()) {
            e.preventDefault();
            addTag(inputValue);
          }

          if (e.key === "Backspace" && inputValue === "" && tags.length > 0) {
            removeTag(tags.length - 1);
          }
        };

        return (
          <FormItem>
            <FormLabel>{label}</FormLabel>
            {description && <FormDescription>{description}</FormDescription>}

            <FormControl>
              <div
                className={cn(
                  "flex flex-wrap items-center border rounded-md px-2 py-1 min-h-[42px] focus-within:ring-1 focus-within:ring-ring",
                  className
                )}
                onClick={() => inputRef.current?.focus()}
              >
                {tags.map((tag, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="flex items-center gap-1 mr-1 mb-1"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(index)}
                      className="ml-1 hover:text-red-500"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
                <input
                  ref={inputRef}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-grow outline-none bg-transparent text-sm py-1 min-w-[100px]"
                  placeholder={placeholder}
                  disabled={disabled}
                />
              </div>
            </FormControl>

            <FormMessage className="text-red-600 mt-1" />
          </FormItem>
        );
      }}
    />
  );
};

export default MulabCustomMultipleInput;
