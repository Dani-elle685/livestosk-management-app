"use client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { LivestockVaccine } from "@/infrastructure/vaccine/dto/vaccine.dto";
import { deleteVaccineService } from "@/infrastructure/vaccine/services/delete.vaccine.service";
import React, { useTransition } from "react";
import { toast } from "sonner";

interface Props {
  vaccine: LivestockVaccine;
  onClose?: () => void;
}

const DeleteVaccine: React.FC<Props> = ({ vaccine, onClose }) => {
  const [isSubmitting, setTransitions] = useTransition();

  const handleVaccineDelete = () => {
    setTransitions(async () => {
      try {
        await deleteVaccineService(vaccine?.recordId!);
        toast.success("Vaccine Deletetion Success");
        onClose?.();
      } catch (error: any) {
        toast.error("Deletion Failed", error.message);
      }
    });
  };
  return (
    <div className="flex flex-col items-center gap-2 text-center border rounded-md p-4 mb-3">
      <Label className="font-medium text-xl">Delete Vaccine Record</Label>
      <p className="text-base font-normal text-muted-foreground">
        Are you sure you want to permanently delete{" "}
        <strong>{vaccine?.vaccineName!}</strong> vaccine record? This action
        cannot be undone, and all related data will be removed.
      </p>
      <div className="flex flex-wrap gap-3 items-center mt-2">
        <Button
          type="button"
          variant={"outline"}
          onClick={onClose}
          className="cursor-pointer border-red-500"
        >
          CANCEL
        </Button>
        <Button
          variant={"destructive"}
          disabled={isSubmitting}
          onClick={handleVaccineDelete}
          className="cursor-pointer"
        >
          {isSubmitting ? "Deleting..." : "CONFIRM"}
        </Button>
      </div>
    </div>
  );
};

export default DeleteVaccine;
