"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import MulabInput from "@/components/reusable-components/mulab.custom.input";
import { Form } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import SubmitButton from "@/components/reusable-components/submit.button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  PersonalInformationModel,
  PersonalInformationSchema,
} from "@/infrastructure/profile-creation/validators/profile.information.validators";
import { Button } from "@/components/ui/button";
import MulabCustomAutocomplete from "@/components/reusable-components/mulab.custom.autocomplete";
import ProfileImageUploadInput from "@/components/reusable-components/ProfileImageInput";
import ImageUploadInput from "@/components/reusable-components/ImageUploadInput";
import { ConfirmProfileCreation } from "./confirmDialog";

interface PersonalInformationStepProps {
  initialData: PersonalInformationModel;
  onSubmit: (data: PersonalInformationModel) => void;
  onNext?: () => void;
  role:string;
  onBack?: () => void;

}

const PersonalInformation:React.FC<PersonalInformationStepProps> = ({initialData,onNext,onSubmit, role, onBack}) => {
    const [showDialog, setShowDialog] = useState(false);
  
  const form = useForm<PersonalInformationModel>({
    resolver: zodResolver(PersonalInformationSchema),
    // defaultValues: {
    //   idNumber: "",
    //   idBackPage: "",
    //   idFrontPage: "",
    //   dateOfBirth: "",
    //   profileImage: "",
    //   idType: "",
    // },
    defaultValues: initialData,
    mode: "onChange",
  });

  const { isSubmitting, isValid } = form.formState;

  const handleSubmit  = async (data: PersonalInformationModel) => {
    if(role === "buyer"){
       onSubmit(data);
           setShowDialog(true);

          // Handle buyer submission
          console.log("Buyer data submitted:", data);
    }else{
    onSubmit(data);
    onNext?.();
    }
  };
  const idTypeOptions = [
    { label: "Passport", value: "Passport" },
    { label: "DrivingLicence", value: "Driving Licence" },
    { label: "IDCard", value: "ID Card" },
  ];
  const handleDialogClose = () => {
    setShowDialog(false); // This will close the dialog
  };

  return (
    <>
    <Card className="w-full max-w-lg m-auto md:p-6 rounded-sm">
      <CardHeader>
        <CardTitle className="font-bold text-xl text-center">
          Personal Information===Role:{role}
        </CardTitle>
        <CardDescription className="text-center">
          Tell us about yourself
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit )}
            className="flex flex-col gap-3 w-full"
          >
            <div className="">
              <MulabInput
                control={form.control}
                name="dateOfBirth"
                placeholder="12-22-2023"
                label="Date Of Birth"
                type="date"
                autoFocus={true}
              />
            </div>
            <div>
              <MulabInput
                control={form.control}
                name="idNumber"
                placeholder="123456"
                label="ID Number"
                type="number"
              />
            </div>
            <div className="w-full">
              <MulabCustomAutocomplete
                control={form.control}
                name="idType"
                label="Select ID Type"
                placeholder="Select Type"
                items={idTypeOptions}
              />
            </div>
            <div className="flex flex-col gap-2 space-y-2">
              <div className="flex md:flex-row md:justify-between flex-col md:space-x-4 md:space-y-0 space-y-4">
                <ImageUploadInput
                  name="idFrontPage"
                  label="Upload ID Front page"
                  required
                  control={form.control}
                  className="w-[200px] h-[120px]"
                />

                <ImageUploadInput
                  name="idBackPage"
                  label="Upload ID Back page"
                  required
                  control={form.control}
                  className="w-[200px] h-[120px]"
                />
              </div>
            </div>

            <div className="space-y-2 flex flex-col">
              <Label>Upload Profile Image</Label>
              <ProfileImageUploadInput
                control={form.control}
                name="profileImage"
                imageUrl="/default-avatar.png"
                // className="w-24 h-24"
              />
            </div>

            <div className="flex items-center justify-between">
              <Button variant={"outline"} type="button" onClick={onBack}>
                Back
              </Button>
              <SubmitButton
                isSubmitting={isSubmitting}
                isValid={isValid}
                title={role === "buyer" ? "Submit" :"Next"}
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
          />
  </>
  );
};

export default PersonalInformation;
