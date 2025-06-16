"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import MulabInput from "@/components/reusable-components/mulab.custom.input";
import { Form } from "@/components/ui/form";
import SubmitButton from "@/components/reusable-components/submit.button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AddressInformationModel,
  AddressInformationSchema,
} from "@/infrastructure/profile-creation/validators/profile.information.validators";
import { Button } from "@/components/ui/button";
import MulabCustomAutocomplete from "@/components/reusable-components/mulab.custom.autocomplete";
import { getCountiesByRegion, getCountryOptions, getRegionsByCountry, getSubCountiesByCounty, getWardsBySubCounty } from "@/infrastructure/profile-creation/hooks.ts/address.selection.options";
import { useFormContext } from "../context/form-step-context";
import { ConfirmProfileCreation } from "./confirmDialog";

interface AddressInformationStepProps {
  initialData: AddressInformationModel;
  onSubmit: (data: AddressInformationModel) => void;
  onBack: () => void;
}

const AddressInformation:React.FC<AddressInformationStepProps> = ({initialData,onBack,onSubmit}) => {
  const [showDialog, setShowDialog] = useState(false);

  const form = useForm<AddressInformationModel>({
    resolver: zodResolver(AddressInformationSchema),
    // defaultValues: {
    //   nationality: "",
    //   regions: "",
    //   county: "",
    //   subCounty: "",
    //   ward: "",
    //   farmLocation: "",
    //   coordinates: "",
    // },
    defaultValues: initialData,

    mode: "onChange",
  });

  const { isSubmitting, isValid } = form.formState;
  const selectedCountry = form.watch("nationality");
  const selectedRegion = form.watch("regions");
  const selectedCounty = form.watch("county");
  const selectedSubCounty = form.watch("subCounty");
  const selectedWard = form.watch("ward");

  const handleSubmit = async (data: AddressInformationModel) => {
    onSubmit(data);
    setShowDialog(true);
  };

  useEffect(() => {
    if (selectedCountry) {
      form.resetField("regions");
      form.resetField("county");
      form.resetField("subCounty");
      form.resetField("ward");
      form.resetField("farmLocation");
      form.resetField("coordinates");
    }
  }, [selectedCountry, form]);

  useEffect(() => {
    if (selectedRegion) {
      form.resetField("county");
      form.resetField("subCounty");
      form.resetField("ward");
      form.resetField("farmLocation");
      form.resetField("coordinates");
    }
  }, [selectedRegion, form]);

  useEffect(() => {
    if (selectedCounty) {
      form.resetField("subCounty");
      form.resetField("ward");
      form.resetField("farmLocation");
      form.resetField("coordinates");
    }
  }, [selectedCounty, form]);

  useEffect(() => {
    if (selectedSubCounty) {
      form.resetField("ward");
      form.resetField("farmLocation");
      form.resetField("coordinates");
    }
  }, [selectedSubCounty, form]);

  useEffect(() => {
    if (selectedWard) {
      form.resetField("farmLocation");
      form.resetField("coordinates");
    }
  }, [selectedWard, form]);

  const handleDialogClose = () => {
    setShowDialog(false); // This will close the dialog
  };

  return (
    <>
    <Card className="w-full max-w-lg m-auto md:p-6 rounded-sm">
      <CardHeader>
        <CardTitle className="font-bold text-xl text-center">
          Address Information
        </CardTitle>
        <CardDescription className="text-center">
          Register Address details
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="flex flex-col gap-3 w-full"
          >
            <div className="w-full">
              <MulabCustomAutocomplete
                control={form.control}
                name="nationality"
                label="Country"
                placeholder="Select Country"
                items={getCountryOptions()}
              />
            </div>

            {selectedCountry && (
              <div>
                <MulabCustomAutocomplete
                  control={form.control}
                  name="regions"
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
                    name="coordinates"
                    placeholder="Co-ordinates"
                    label="Co-ordinates"
                    type="text"
                  />
                </div>
              </>
            )}

            <div className="flex items-center justify-between">
              <Button variant={"outline"} type="button" onClick={()=>onBack()}>
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
      </CardContent>
    </Card>
      <ConfirmProfileCreation 
        open={showDialog} 
        setOpen={setShowDialog} // Pass the state setter directly
        onConfirm={() => {
          // Handle confirmation logic here
          handleDialogClose();
        }}
        onCancel={handleDialogClose}
      />    </>
  );
};

export default AddressInformation;