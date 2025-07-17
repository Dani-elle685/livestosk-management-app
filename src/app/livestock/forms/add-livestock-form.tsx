"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import SubmitButton from "@/components/reusable-components/submit.button";
import MulabCustomAutocomplete from "@/components/reusable-components/mulab.custom.autocomplete";
import MulabInput from "@/components/reusable-components/mulab.custom.input";
import {
  LivestockModel,
  LivestockSchema,
} from "@/infrastructure/livestosks/validators/livestock-validators";
import { addLivestockService } from "@/infrastructure/livestosks/services/add.livestocks.service";
import { toast } from "sonner";
import MulabTextArea from "@/components/reusable-components/mulab.text.area";
import { Livestock } from "@/infrastructure/livestosks/dto/livestock-dto";
import { updateLivestockService } from "@/infrastructure/livestosks/services/update.livestock.service";
import { Button } from "@/components/ui/button";
import { UseAddLivestockFormOptions } from "@/infrastructure/livestosks/hooks/use.add.livestock.form.options";

interface AddLivestockFormProps {
  onSuccess: () => void;
  livestockInfo?: Livestock;
}

const AddLivestockForm: React.FC<AddLivestockFormProps> = ({
  onSuccess,
  livestockInfo,
}) => {
  const {typeOptions,breedOptions,genderOptions,statusOptions,healthStatusOptions}= UseAddLivestockFormOptions();
  const form = useForm<LivestockModel>({
    resolver: zodResolver(LivestockSchema),
    defaultValues: {
      tagNumber: livestockInfo?.tagNumber ?? "",
      breed: livestockInfo?.breed ?? "",
      color: livestockInfo?.color ?? "",
      dateOfBirth: livestockInfo?.dateOfBirth ?? "",
      gender: livestockInfo?.gender ?? "",
      healthStatus: livestockInfo?.healthStatus ?? "",
      imageUrl: livestockInfo?.imageUrl ?? "",
      name: livestockInfo?.name ?? "",
      notes: livestockInfo?.notes ?? "",
      purchaseDate: livestockInfo?.purchaseDate ?? "",
      purchasePrice: livestockInfo?.purchasePrice!.toString() ?? "",
      // sellingDate:"",
      // sellingPrice:"",
      status: livestockInfo?.status ?? "",
      type: livestockInfo?.type ?? "",
      weight: livestockInfo?.weight ?? 0,
    },
    mode: "onChange",
  });

  const { isValid, isSubmitting } = form.formState;
  const selectedType = form.watch("type");

  const handleSubmit = async (data: LivestockModel) => {
    try {
      livestockInfo
        ? await updateLivestockService(data)
        : await addLivestockService(data);
      toast.success(
        livestockInfo
          ? "Udated Livestock Successfully"
          : "Added Livestock Successfully"
      );
      form.reset();
      onSuccess();
    } catch (error: any) {
      toast.error("Operation Failed.", error.message);
    }
  };

  return (
    <Card className="w-full rounded-sm border-none shadow-none bg-white p-0 m-0">
      <CardHeader>
        <CardTitle className="font-bold text-xl text-center">
          {livestockInfo ? "Update" : "Add"} New Livestock
        </CardTitle>
        <CardDescription className="text-center">
          Fill in the livestock details below.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            <MulabInput
              control={form.control}
              name="tagNumber"
              placeholder="Tag Number (optional)"
              label="Tag Number"
              type="text"
            />
            <MulabInput
              control={form.control}
              name="name"
              placeholder="Enter name"
              label="Name"
              type="text"
            />
            <MulabCustomAutocomplete
              control={form.control}
              name="type"
              label="Type"
              placeholder="Select Animal Type"
              items={typeOptions}
            />
            <MulabCustomAutocomplete
              control={form.control}
              name="breed"
              label="Breed"
              placeholder={selectedType ? "Select Breed" : "Select Type First"}
              items={selectedType ? breedOptions[selectedType] || [] : []}
              disabled={!selectedType}
            />
            <MulabInput
              control={form.control}
              name="dateOfBirth"
              placeholder="Select Date of Birth"
              label="Date of Birth"
              type="date"
            />
            <MulabCustomAutocomplete
              control={form.control}
              name="gender"
              label="Gender"
              placeholder="Select Gender"
              items={genderOptions}
            />
            <MulabInput
              control={form.control}
              name="weight"
              placeholder="Enter weight (kg)"
              label="Weight"
              type="number"
            />
            <MulabInput
              control={form.control}
              name="color"
              placeholder="Enter color"
              label="Color"
              type="text"
            />
            <MulabInput
              control={form.control}
              name="imageUrl"
              placeholder="Paste image URL"
              label="Image URL"
              type="text"
            />
            <MulabCustomAutocomplete
              control={form.control}
              name="status"
              label="Status"
              placeholder="Select Status"
              items={statusOptions}
            />
            <MulabCustomAutocomplete
              control={form.control}
              name="healthStatus"
              label="Health Status"
              placeholder="Select Health Status"
              items={healthStatusOptions}
            />
            <MulabInput
              control={form.control}
              name="purchasePrice"
              placeholder="Enter purchase price"
              label="Purchase Price"
              type="text"
            />
            {/* <MulabInput
              control={form.control}
              name="sellingPrice"
              placeholder="Enter selling price"
              label="Selling Price"
              type="text"
            /> */}

            <MulabInput
              control={form.control}
              name="purchaseDate"
              placeholder="Select purchase date"
              label="Purchase Date"
              type="date"
            />

            {/* <MulabInput
              control={form.control}
              name="sellingDate"
              placeholder="Select selling date"
              label="Selling Date"
              type="date"
            /> */}

            <div className="md:col-span-2">
              <MulabTextArea
                control={form.control}
                name="notes"
                label="Notes"
                placeholder="Additional notes"
                type="text"
              />
            </div>

            <div className="md:col-span-2 flex items-center gap-3 justify-center pt-2">
              <Button
                type="button"
                variant={"outline"}
                className="border-red-600 cursor-pointer"
                onClick={onSuccess}
              >
                CANCEL
              </Button>
              <SubmitButton
                isSubmitting={isSubmitting}
                isValid={isValid}
                title={`${
                  livestockInfo ? "UPDATE LIVESTOCK" : "ADD LIVESTOCK"
                }`}
                classname="bg-red-600 hover:bg-red-700 w-fit cursor-pointer"
              />
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default AddLivestockForm;
