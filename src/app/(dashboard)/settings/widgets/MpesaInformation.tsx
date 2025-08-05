import MulabCustomAutocomplete from "@/components/reusable-components/mulab.custom.autocomplete";
import MulabInput from "@/components/reusable-components/mulab.custom.input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { addMpesaInformationService } from "@/infrastructure/settings/services/add.mpesa.iformation";
import {
  MpesaFormSchema,
  MpesaFormValues,
} from "@/infrastructure/settings/validators/mpesa.information.validator";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const MpesaInformation = () => {
  const form = useForm<MpesaFormValues>({
    resolver: zodResolver(MpesaFormSchema),
    defaultValues: {
      mpesaNumber: "",
      countryCode: "",
    },
    mode: "onChange",
  });
  const onSubmit = async (data: MpesaFormValues) => {
    try {
      await addMpesaInformationService(data);
      toast.success("M-PESA Information added successfully!");
      form.reset();
    } catch (error: any) {
      toast.error(error.message ?? "Operation Failed.");
    }
  };
  const { isSubmitting, isValid } = form.formState;
  const countryCodeOptions = [  
    { label: "+254", value: "254" },
    { label: "+256", value: "256" },
    { label: "+255", value: "255" },
  ];

  return (
    <Card className="max-w-4xl p-2 md:p-6">
      <CardHeader className="px-2">
        <CardTitle className="text-base font-semibold">
          M-PESA Information
        </CardTitle>
        <CardDescription>Enter your M-PESA number details</CardDescription>
      </CardHeader>
      <CardContent className="px-2">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="flex items-start gap-2">
              <MulabCustomAutocomplete
                control={form.control}
                label={""}
                name={"countryCode"}
                placeholder={""}
                defaultValue="254"
                items={countryCodeOptions}
              />

              <MulabInput
                control={form.control}
                label={""}
                name={"mpesaNumber"}
                placeholder={" Phone Number"}
                type={"number"}
              />
            </div>

            <Button
              type="submit"
              className=" bg-red-600 text-white hover:bg-red-700 transition-colors"
              disabled={isSubmitting || !isValid}
            >
              {isSubmitting ? "Saving..." : "Save M-PESA Information"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default MpesaInformation;
