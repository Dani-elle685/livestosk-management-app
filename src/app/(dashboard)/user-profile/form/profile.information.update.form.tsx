"use client";
import MulabInput from "@/components/reusable-components/mulab.custom.input";
import MulabTextArea from "@/components/reusable-components/mulab.text.area";
import SubmitButton from "@/components/reusable-components/submit.button";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { FarmData } from "@/infrastructure/settings/dto/user.profile.dto";
import { updateProfileInfoService } from "@/infrastructure/settings/services/update.profile.information";
import {
  PersonalInformationUpdateModel,
  PersonalInformationUpdateSchema,
} from "@/infrastructure/settings/validators/personal.information.update.validator";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface Props {
  onSuccess?: () => void;
  personalInformation: FarmData;
}

const ProfileInformationUpdateForm: React.FC<Props> = ({
  personalInformation,
  onSuccess,
}) => {
  const form = useForm<PersonalInformationUpdateModel>({
    resolver: zodResolver(PersonalInformationUpdateSchema),
    defaultValues: personalInformation,
    mode: "onChange",
  });
  const { isValid, isSubmitting } = form.formState;
  const handleSubmit = async (data: PersonalInformationUpdateModel) => {
    try {
      await updateProfileInfoService(data);
      toast.success("Udated Profile Successfully");
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
        className="flex flex-col gap-2"
      >
        <MulabInput
          control={form.control}
          name="firstName"
          placeholder="Enter First Name"
          label="First Name"
          type="text"
        />
        <MulabInput
          control={form.control}
          name="lastName"
          placeholder="Enter Last Name"
          label="Last Name"
          type="text"
        />
        <MulabInput
          control={form.control}
          name="emailAddress"
          placeholder="Enter Email Address"
          label="Email Address"
          type="email"
        />
        <MulabInput
          control={form.control}
          name="phoneNumber"
          placeholder="Enter Phone Number"
          label="Phone Number"
          type="text"
        />
        <MulabTextArea
          control={form.control}
          name="bioInformation"
          label="User Bio"
          placeholder="Enter Bio Information"
          type="text"
        />
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
            title={`Update Profile`}
            classname="bg-red-600 hover:bg-red-700 w-fit cursor-pointer"
          />
        </div>
      </form>
    </Form>
  );
};

export default ProfileInformationUpdateForm;
