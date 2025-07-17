"use client";
import MulabCustomAutocomplete from "@/components/reusable-components/mulab.custom.autocomplete";
import MulabInput from "@/components/reusable-components/mulab.custom.input";
import MulabTextArea from "@/components/reusable-components/mulab.text.area";
import SubmitButton from "@/components/reusable-components/submit.button";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { LivestockVaccine } from "@/infrastructure/vaccine/dto/vaccine.dto";
import { UseAddVaccineFormOptions } from "@/infrastructure/vaccine/hooks/use.add.vaccine.form.options";
import { AddVaccineService } from "@/infrastructure/vaccine/services/add.vaccine.service";
import { UpdateVaccineService } from "@/infrastructure/vaccine/services/update.vaccine.service";
import {
  VaccineModel,
  VaccineScchema,
} from "@/infrastructure/vaccine/validators/vaccine-validators";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface Props {
  vaccine?: LivestockVaccine;
  onSuccess?: () => void;
}

const CreateVaccineForm: React.FC<Props> = ({ vaccine, onSuccess }) => {
  const { vaccineOptions, vaccineStatus } = UseAddVaccineFormOptions();
  const form = useForm<VaccineModel>({
    resolver: zodResolver(VaccineScchema),
    defaultValues: {
      vaccineName: vaccine?.vaccineName ?? "",
      status: vaccine?.status! ?? "",
      administeredDate: vaccine?.administeredDate ?? "",
      administeredBy: vaccine?.administeredBy ?? "",
      vaccineNotes: vaccine?.vaccineNotes ?? "",
    },
    mode: "onChange",
  });
  const { isValid, isSubmitting } = form.formState;
  const handleSubmit = async (data: VaccineModel) => {
    try {
      vaccine
        ? await UpdateVaccineService(data, vaccine?.recordId!)
        : await AddVaccineService(data);
      toast.success(
        vaccine
          ? "Udated Livestock Successfully"
          : "Added Livestock Successfully"
      );
      form.reset();
      onSuccess?.();
    } catch (error: any) {
      toast.error("Operation Failed.", error.message);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex flex-col gap-2 p-2"
      >
        <MulabCustomAutocomplete
          control={form.control}
          name="vaccineName"
          label="Select Vaccine Name"
          placeholder="Select Vaccine Name"
          items={vaccineOptions}
        />

        <MulabCustomAutocomplete
          control={form.control}
          name="status"
          label="Vaccine Status"
          placeholder="Select Status"
          items={vaccineStatus}
        />
        <MulabInput
          control={form.control}
          name="administeredBy"
          placeholder="Add Administer Doctor"
          label="To Be Administered By"
          type="text"
        />
        <MulabInput
          control={form.control}
          name="administeredDate"
          placeholder="Select Administration Date"
          label="Administration Date"
          type="date"
        />
        <MulabTextArea
          control={form.control}
          name="vaccineNotes"
          label="Notes"
          placeholder="Additional notes..."
          type="text"
        />
        <div className="flex flex-wrap gap-3 items-center justify-center mt-3">
          <Button
            variant={"outline"}
            className="border-red-500 cursor-pointer"
            type="button"
            onClick={onSuccess}
          >
            CANCEL
          </Button>
          <SubmitButton
            isSubmitting={isSubmitting}
            isValid={isValid}
            title={`${vaccine ? "UPDATE VACCINE" : "ADD VACCINE"}`}
            classname="bg-red-600 hover:bg-red-700 w-fit cursor-pointer"
          />
        </div>
      </form>
    </Form>
  );
};

export default CreateVaccineForm;
