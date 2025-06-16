import React from "react";
import { Upload } from "lucide-react";
import { cn } from "@/lib/utils";
import { useController, Control } from "react-hook-form";

interface ImageUploadInputProps {
  name: string;
  label?: string;
  className?: string;
  required?: boolean;
  control: Control<any>; // Accepts any form shape
}

const ImageUploadInput: React.FC<ImageUploadInputProps> = ({
  name,
  label,
  control,
  className,
  required = false,
}) => {
  const {
    field: { onChange, value, ref },
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      // Save the file (for submission) and a preview URL (for display)
      onChange({ file, previewUrl });
    } else {
      onChange(null);
    }
  };

  return (
    <div className="space-y-2">
      {label && (
        <label htmlFor={name} className="text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <div
        className={cn(
          "relative border-2 border-dashed rounded-md cursor-pointer overflow-hidden group",
          className
        )}
      >
        <input
          id={name}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleChange}
          ref={ref}
        />
        <label htmlFor={name} className="block w-full h-full">
          {value?.previewUrl ? (
            <img
              src={value.previewUrl}
              alt={label}
              className="w-full h-full object-cover transition-opacity group-hover:opacity-80"
            />
          ) : (
            <div className="flex flex-col items-center justify-center w-full h-full text-sm text-muted-foreground py-6">
              <Upload className="h-6 w-6 mb-2" />
              {label || "Upload image"}
            </div>
          )}
        </label>
      </div>
      {error && <p className="text-sm text-red-500">{error.message}</p>}
    </div>
  );
};

export default ImageUploadInput;
