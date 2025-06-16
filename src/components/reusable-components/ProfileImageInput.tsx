// components/reusable-components/ProfileImageUploadInput.tsx
import React, { useEffect, useState } from "react"
import { Camera, Upload } from "lucide-react"
import { Controller, Control } from "react-hook-form"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface ProfileImageUploadInputProps {
  control: Control<any> // Accept generic form control
  name: string
  imageUrl?: string // Optional default image
  className?: string
}

const ProfileImageUploadInput: React.FC<ProfileImageUploadInputProps> = ({
  control,
  name,
  imageUrl,
  className = "w-16 h-16",
}) => {
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(imageUrl)

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => {
        useEffect(() => {
          if (value?.file instanceof File) {
            const url = URL.createObjectURL(value.file)
            setPreviewUrl(url)
            return () => URL.revokeObjectURL(url)
          } else if (!value?.file && imageUrl) {
            setPreviewUrl(imageUrl)
          }
        }, [value, imageUrl])

        const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          const file = e.target.files?.[0] || null
          if (file) {
            const newPreviewUrl = URL.createObjectURL(file)
            setPreviewUrl(newPreviewUrl)
            onChange({ file, previewUrl: newPreviewUrl })
          } else {
            setPreviewUrl(undefined)
            onChange(null)
          }
        }

        return (
          <div className="relative">
            <Avatar className={`${className} border-2 border-red-600`}>
              <AvatarImage src={previewUrl || ""} />
              <AvatarFallback className="bg-accent text-accent-foreground text-lg">
                {!previewUrl && <Camera className="h-8 w-8 text-muted-foreground" />}
              </AvatarFallback>
            </Avatar>

            <label
              htmlFor={`profile-image-${name}`}
              className="absolute bottom-0 bg-red-600 text-white p-1 rounded-full cursor-pointer"
            >
              <Upload size={14} />
              <span className="sr-only">Upload profile image</span>
            </label>

            <input
              id={`profile-image-${name}`}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>
        )
      }}
    />
  )
}

export default ProfileImageUploadInput
