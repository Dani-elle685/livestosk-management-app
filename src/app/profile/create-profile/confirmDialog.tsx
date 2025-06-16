"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useFormContext } from "../context/form-step-context";
import { profileCreationService } from "@/infrastructure/profile-creation/services/profile.creation.service";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface ConfirmProfileCreationProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onConfirm: () => void;
  onCancel?: () => void;
  role?: string;
}

export const ConfirmProfileCreation = ({
  open,
  setOpen,
  onConfirm,
  onCancel,
}: ConfirmProfileCreationProps) => {
  const router = useRouter();
  const { formData } = useFormContext();
  const confirmCreation = async () => {
    const sanitizedFormData = {
      ...formData,
      personalInfo: {
        ...formData.personalInfo,
        profileImage: formData.personalInfo.profileImage?.previewUrl ?? "",
        idFrontPage: formData.personalInfo.idFrontPage?.previewUrl ?? "",
        idBackPage: formData.personalInfo.idBackPage?.previewUrl ?? "",
      },
    };

    try {
      await profileCreationService(sanitizedFormData);
      onConfirm();
      setOpen(false);
      router.push(`/auth/sign-in`);
      toast.success("Created Profile Successsfully");
    } catch (error: any) {
      toast.error(
        `Error creating Profile. ${error.message || "Please try again."}`
      );
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="md:max-w-sm">
        <DialogHeader>
          <DialogTitle className="text-center text-base">
            Confirm Submission
          </DialogTitle>
          <DialogDescription className="text-center">
            Are you sure you want to submit this information?
          </DialogDescription>
        </DialogHeader>
        <div className="text-xl text-center font-bold">
          Confirm that you want submit the profile details.
        </div>
        <div className="flex items-center justify-center gap-4 py-4">
          <Button
            variant="outline"
            className="cursor-pointer"
            onClick={() => {
              onCancel?.();
              setOpen(false);
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={confirmCreation}
            className="bg-red-500 hover:bg-red-500 cursor-pointer"
          >
            Confirm
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
