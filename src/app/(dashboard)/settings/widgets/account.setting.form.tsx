"use client";
import MulabCustomAutocomplete from '@/components/reusable-components/mulab.custom.autocomplete';
import MulabInput from '@/components/reusable-components/mulab.custom.input';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { updateAccountSettingsService } from '@/infrastructure/settings/services/update.settings.service';
import { UpdateAccountSettingData, UpdateAccountSettingSchema } from '@/infrastructure/settings/validators/update.account.setting.validator';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

const AccountSettingForm = () => {
  const countryCodeOptions = [
    { label: "+254", value: "254" },
    { label: "+256", value: "256" },
    { label: "+255", value: "255" },
  ];

  const languageOptions = [
    { label: "English", value: "en" },
    { label: "Swahili", value: "sw" },
    { label: "French", value: "fr" },
    { label: "Spanish", value: "es" },
    { label: "Arabic", value: "ar" },
  ];

  const timezoneOptions = [
    { label: "GMT+3", value: "GMT+3" },
    { label: "GMT+2", value: "GMT+2" },
    { label: "GMT+1", value: "GMT+1" },
    { label: "GMT", value: "GMT" },
    { label: "GMT-1", value: "GMT-1" },
    { label: "GMT-2", value: "GMT-2" },
    { label: "GMT-3", value: "GMT-3" },
  ];

  const countryOptions = [
    { label: "Kenya", value: "Kenya" },
    { label: "Uganda", value: "Uganda" },
    { label: "Tanzania", value: "Tanzania" },
    { label: "Rwanda", value: "Rwanda" },
    { label: "Burundi", value: "Burundi" },
  ];

  const form = useForm<UpdateAccountSettingData>({
    resolver: zodResolver(UpdateAccountSettingSchema),
    defaultValues: {
      email: "",
      countryCode: "",
      phoneNumber: "",
      language: "",
      timezone: "",
      country: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (data: UpdateAccountSettingData) => {
    try {
      await updateAccountSettingsService(data);
      toast.success("Account settings updated successfully!");
      form.reset();
    } catch (error: any) {
      toast.error(error.message ?? "Operation Failed.");
    }
  };

  const { isSubmitting, isValid } = form.formState;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Email */}
        <MulabInput
          control={form.control}
          label="Email"
          name="email"
          placeholder="Email Address"
          type="email"
        />

        {/* Phone Number with Country Code */}
        <div className="flex items-start gap-2">
          <MulabCustomAutocomplete
            control={form.control}
            label="Code"
            name="countryCode"
            placeholder="Select"
            items={countryCodeOptions}
          />
          <MulabInput
            control={form.control}
            label="Phone"
            name="phoneNumber"
            placeholder="Phone Number"
            type="number"
          />
        </div>

        {/* Language */}
        <MulabCustomAutocomplete
          control={form.control}
          label="Language"
          name="language"
          placeholder="Select Language"
          items={languageOptions}
        />

        {/* Country */}
        <MulabCustomAutocomplete
          control={form.control}
          label="Country"
          name="country"
          placeholder="Select Country"
          items={countryOptions}
        />

        {/* Timezone */}
        <MulabCustomAutocomplete
          control={form.control}
          label="Timezone"
          name="timezone"
          placeholder="Select Timezone"
          items={timezoneOptions}
        />

        {/* Submit Button */}
        <div>
          <Button
            type="submit"
            className="bg-red-600 text-white hover:bg-red-700 transition-colors"
            disabled={isSubmitting || !isValid}
          >
            {isSubmitting ? "Saving..." : "Update Account Settings"}
          </Button>
        </div>
      </form>
    </Form>
  );
};


export default AccountSettingForm;
