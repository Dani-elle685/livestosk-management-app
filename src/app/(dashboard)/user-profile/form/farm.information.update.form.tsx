"use client";
import MulabInput from "@/components/reusable-components/mulab.custom.input";
import SubmitButton from "@/components/reusable-components/submit.button";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { updateFarmInfoService } from "@/infrastructure/settings/services/update.farm.information";
import {
  FarmInformationUpdateModel,
  FarmInformationUpdateSchema,
} from "@/infrastructure/settings/validators/farm.information.update.validator";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  businessTypeOptions,
  getCountiesByRegion,
  getCountryOptions,
  getRegionsByCountry,
  getSubCountiesByCounty,
  getWardsBySubCounty,
} from "@/infrastructure/profile-creation/hooks.ts/address.selection.options";

import { toast } from "sonner";
import MulabCustomAutocomplete from "@/components/reusable-components/mulab.custom.autocomplete";
import MulabTextArea from "@/components/reusable-components/mulab.text.area";
import { FarmData } from "@/infrastructure/settings/dto/user.profile.dto";

interface Props {
  onSuccess?: () => void;
  profileInformation: FarmData;
}

const FarmInformationUpdateForm: React.FC<Props> = ({
  onSuccess,
  profileInformation,
}) => {
  const form = useForm<FarmInformationUpdateModel>({
    resolver: zodResolver(FarmInformationUpdateSchema),
    defaultValues: {
      ...profileInformation,
      FarmType: profileInformation.farmType ?? "",
    },
    mode: "onChange",
  });
  const { isValid, isSubmitting } = form.formState;
  const selectedCountry = form.watch("country");
  const selectedRegion = form.watch("region");
  const selectedCounty = form.watch("county");
  const selectedSubCounty = form.watch("subCounty");
  const selectedWard = form.watch("ward");

  useEffect(() => {
    if (selectedCountry) {
      form.resetField("region");
      form.resetField("county");
      form.resetField("subCounty");
      form.resetField("ward");
      form.resetField("farmLocation");
      form.resetField("farmCoordinates");
    }
  }, [selectedCountry, form]);

  useEffect(() => {
    if (selectedRegion) {
      form.resetField("county");
      form.resetField("subCounty");
      form.resetField("ward");
      form.resetField("farmLocation");
      form.resetField("farmCoordinates");
    }
  }, [selectedRegion, form]);

  useEffect(() => {
    if (selectedCounty) {
      form.resetField("subCounty");
      form.resetField("ward");
      form.resetField("farmLocation");
      form.resetField("farmCoordinates");
    }
  }, [selectedCounty, form]);

  useEffect(() => {
    if (selectedSubCounty) {
      form.resetField("ward");
      form.resetField("farmLocation");
      form.resetField("farmCoordinates");
    }
  }, [selectedSubCounty, form]);

  useEffect(() => {
    if (selectedWard) {
      form.resetField("farmLocation");
      form.resetField("farmCoordinates");
    }
  }, [selectedWard, form]);

  const handleSubmit = async (data: FarmInformationUpdateModel) => {
    try {
      await updateFarmInfoService(data);
      toast.success("Udated Farm Information Successfully");
      form.reset();
      onSuccess?.();
    } catch (error: any) {
      toast.error(error.message ?? "Operation Failed.");
    }
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex flex-col gap-3 w-full"
      >
        <div className="w-full flex flex-col gap-2">
          <MulabInput
            control={form.control}
            name="farmName"
            placeholder="Enter Farm Name"
            label="Farm Name"
            type="text"
          />
          <MulabCustomAutocomplete
            control={form.control}
            name="FarmType"
            label="Farm Type"
            placeholder="Select Farm Type"
            items={businessTypeOptions}
          />
          <MulabInput
            control={form.control}
            name="farmSize"
            placeholder="Enter Farm Size"
            label="Farm Size"
            type="number"
          />
          <MulabCustomAutocomplete
            control={form.control}
            name="country"
            label="Country"
            placeholder="Select Country"
            items={getCountryOptions()}
          />
        </div>

        {selectedCountry && (
          <div>
            <MulabCustomAutocomplete
              control={form.control}
              name="region"
              label="Region"
              placeholder="Select Region"
              items={getRegionsByCountry(selectedCountry)}
            />
          </div>
        )}

        {selectedRegion && (
          <div>
            <MulabCustomAutocomplete
              control={form.control}
              name="county"
              label="County"
              placeholder="Select County"
              items={getCountiesByRegion(selectedRegion)}
            />
          </div>
        )}

        {selectedCounty && (
          <div>
            <MulabCustomAutocomplete
              control={form.control}
              name="subCounty"
              label="Sub-County"
              placeholder="Select Sub-County"
              items={getSubCountiesByCounty(selectedCounty)}
            />
          </div>
        )}

        {selectedSubCounty && (
          <div>
            <MulabCustomAutocomplete
              control={form.control}
              name="ward"
              label="Ward"
              placeholder="Select Ward"
              items={getWardsBySubCounty(selectedSubCounty)}
            />
          </div>
        )}

        {selectedWard && (
          <>
            <div className="">
              <MulabInput
                control={form.control}
                name="farmLocation"
                placeholder="Enter Location"
                label="Farm/Business Location"
                type="text"
              />
            </div>

            <div>
              <MulabInput
                control={form.control}
                name="farmCoordinates"
                placeholder="Co-ordinates"
                label="Co-ordinates"
                type="text"
              />
            </div>
          </>
        )}
        <MulabTextArea
          control={form.control}
          name="farmDescription"
          label="Farm Description"
          placeholder="Enter Farm Description"
          type="text"
        />

        <div className="flex items-center justify-between">
          <Button variant={"outline"} type="button" onClick={onSuccess}>
            Back
          </Button>
          <SubmitButton
            isSubmitting={isSubmitting}
            isValid={isValid}
            title="Submit"
            classname="bg-red-500 hover:bg-red-500 cursor-pointer w-fit"
          />
        </div>
      </form>
    </Form>
  );
};

export default FarmInformationUpdateForm;
