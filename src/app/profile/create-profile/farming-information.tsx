"use client";
import React from "react";
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
  FarmInformationModel,
  FarmInformationSchema,
} from "@/infrastructure/profile-creation/validators/profile.information.validators";
import { Button } from "@/components/ui/button";
import MulabCustomAutocomplete from "@/components/reusable-components/mulab.custom.autocomplete";
import MulabTextArea from "@/components/reusable-components/mulab.text.area";

interface FarmInformationStepProps {
  initialData: FarmInformationModel;
  onSubmit: (data: FarmInformationModel) => void;
  onNext: () => void;
  onBack: () => void;

}

const FarmInformation:React.FC<FarmInformationStepProps> = ({initialData, onBack,onNext,onSubmit}) => {
  const form = useForm<FarmInformationModel>({
    resolver: zodResolver(FarmInformationSchema),
    defaultValues: {
      businessName:initialData?.businessName ?? "",
      businessType: initialData?.businessType ?? "",
      farmSize: initialData?.farmSize ?? "",
      farmDescription:initialData?.farmDescription ?? "",
    },
    mode: "onChange",
  });

  const { isSubmitting, isValid } = form.formState;

  const handleSubmit = async (data: FarmInformationModel) => {
    onSubmit(data);
    onNext();
  };
  const idTypeOptions = [
    { label: "DairyFarm", value: "Dairy Farm" },
    { label: "PoultryFarm", value: "Poultry Farm" },
    { label: "SheepFarm", value: "Sheep Farm" },
  ];

  return (
    <Card className="w-full max-w-lg m-auto md:p-6 rounded-sm">
      <CardHeader>
        <CardTitle className="font-bold text-xl text-center">
          Farming Information
        </CardTitle>
        <CardDescription className="text-center">
          Tell us about your farm
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="flex flex-col gap-3 w-full"
          >
            <div className="">
              <MulabInput
                control={form.control}
                name="businessName"
                placeholder="ABC Business"
                label="Farm/Business Name "
                type="text"
                autoFocus={true}
              />
            </div>
            <div className="w-full">
              <MulabCustomAutocomplete
                control={form.control}
                name="businessType"
                label="Farm/Business Type "
                placeholder="Select Type"
                items={idTypeOptions}
              />
            </div>
            <div>
              <MulabInput
                control={form.control}
                name="farmSize"
                placeholder="Farm Size (acres)"
                label="Farm Size (acres)"
                type="number"
              />
            </div>

            <div>
              <MulabTextArea
                control={form.control}
                name="farmDescription"
                label="Farm/Business Description"
                placeholder="Farm Description"
                type="text"
              />
            </div>

            <div className="flex items-center justify-between">
              <Button variant={"outline"} type="button" onClick={()=>onBack()}>
                Back
              </Button>
              <SubmitButton
                isSubmitting={isSubmitting}
                isValid={isValid}
                title="Next"
                classname="bg-red-500 hover:bg-red-500 cursor-pointer w-fit"
              />
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default FarmInformation;
