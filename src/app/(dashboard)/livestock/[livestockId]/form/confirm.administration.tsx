"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { LivestockVaccine } from "@/infrastructure/vaccine/dto/vaccine.dto";
import { vaccineAdministartionVaccineService } from "@/infrastructure/vaccine/services/confirm.vaccine.administration.service";
import React, { useTransition } from "react";
import { toast } from "sonner";

interface Props {
  vaccine: LivestockVaccine;
  onClose?: () => void;
}

const ConfirmVaccineAdministration: React.FC<Props> = ({ vaccine, onClose }) => {
  const [isSubmitting, setTransitions] = useTransition();

  const handleVaccineAdministration = () => {
    setTransitions(async () => {
      try {
        await vaccineAdministartionVaccineService(vaccine?.recordId!);
        toast.success("Vaccine Administartion Confirmed.");
        onClose?.();
      } catch (error: any) {
        toast.error( error.message ?? "Record Update failed.");
      }
    });
  };
  
  return (
    <Card className="flex flex-col items-center gap-2 text-center rounded-md p-4 mb-3">
      <Label className="font-medium text-xl">Confirm Vaccine Administration</Label>
      <p className="text-base font-normal text-muted-foreground">
        Are you sure you want to confirm administartion of {" "}
        <strong>{vaccine?.vaccineName!}</strong> vaccine by <strong>{vaccine?.administeredBy}.</strong>
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
          onClick={handleVaccineAdministration}
          className="cursor-pointer"
        >
          {isSubmitting ? "Submitting..." : "CONFIRM"}
        </Button>
      </div>
    </Card>
  );
};

export default ConfirmVaccineAdministration;
