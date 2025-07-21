import { ConfirmTable } from "@/components/reusable-components/deleteTableComponent";
import { Button } from "@/components/ui/button";
import { Livestock } from "@/infrastructure/livestosks/dto/livestock-dto";
import { deleteLivestockService } from "@/infrastructure/livestosks/services/delete.livestock.service";
import { Label } from "@radix-ui/react-label";
import React, { useTransition } from "react";
import { toast } from "sonner";

interface Props {
  livestock: Livestock;
  onSuccess?: () => void;
}

const DeleteLivestock: React.FC<Props> = ({ livestock, onSuccess }) => {
  const [isSubmitting, setTransitions] = useTransition();

  const handleLivestockDelete = () => {
    setTransitions(async () => {
      try {
        await deleteLivestockService(livestock?.recordId!);
        toast.success("Livestock Deletetion Success");
        onSuccess?.();
      } catch (error: any) {
        toast.error("Deletion Failed", error.message);
      }
    });
  };

  return (
    <div className="flex flex-col items-center gap-2 text-center border rounded-md p-4 mb-3">
      <Label className="font-medium text-xl">Delete Animal Record</Label>
      <p className="text-base font-normal text-muted-foreground">
        Are you sure you want to permanently delete{" "}
        <strong>{livestock?.name}</strong> record? This action cannot be undone,
        and all related data such as health records and vaccination history will
        be removed.
      </p>
      <div className="flex flex-wrap gap-3 items-center mt-2">
        <Button
          type="button"
          variant={"outline"}
          className="border border-red-500 cursor-pointer"
          onClick={onSuccess}
        >
          CANCEL
        </Button>
        <Button
          variant={"destructive"}
          disabled={isSubmitting}
          onClick={handleLivestockDelete}
          className="cursor-pointer"
        >
          {isSubmitting ? "Deleting..." : "CONFIRM"}
        </Button>
      </div>
    </div>
  );
};

export default DeleteLivestock;
