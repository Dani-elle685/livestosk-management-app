"use client";

import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { CreditCard, type CreditCardValue } from "@/components/ui/credit-card";
import { Card } from "@/components/ui/card";
import {
  CreditCardFormData,
  CreditCardFormSchema,
} from "@/infrastructure/settings/validators/card.information.validator";
import { addCreditCardService } from "@/infrastructure/settings/services/add.credit.card.service";

// Enhanced validation schema

export function CreditCardForm() {
  const [creditCard, setCreditCard] = useState<CreditCardValue>({
    cardholderName: "",
    cardNumber: "",
    expiryMonth: "",
    expiryYear: "",
    cvv: "",
  });

  const [isCardValid, setIsCardValid] = useState(false);

  const form = useForm<CreditCardFormData>({
    resolver: zodResolver(CreditCardFormSchema),
    defaultValues: {
      cardholderName: "",
      cardNumber: "",
      expiryMonth: "",
      expiryYear: "",
      cvv: "",
    },
    mode: "onChange",
  });

  const handleCreditCardChange = (value: CreditCardValue) => {
    setCreditCard(value);

    // Update form values
    form.setValue("cardholderName", value.cardholderName, {
      shouldValidate: true,
    });
    form.setValue("cardNumber", value.cardNumber, { shouldValidate: true });
    form.setValue("expiryMonth", value.expiryMonth, { shouldValidate: true });
    form.setValue("expiryYear", value.expiryYear, { shouldValidate: true });
    form.setValue("cvv", value.cvv, { shouldValidate: true });
  };

  const handleValidationChange = (isValid: boolean, errors: any) => {
    setIsCardValid(isValid);
  };

  const onSubmit = async (data: CreditCardFormData) => {
    try {
      await addCreditCardService(data);
      toast.success("Card Information Added Successfully");
      form.reset();
    } catch (error: any) {
      toast.error(error.message ?? "Operation Failed.");
    }
  };

  return (
    <Card className="p-2 md:p-6 ">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="cardholderName"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Credit Card Information</FormLabel>
                <FormControl>
                  <CreditCard
                    value={creditCard}
                    onChange={handleCreditCardChange}
                    onValidationChange={handleValidationChange}
                    cvvLabel="CVC"
                    cardStyle="shiny-silver"
                    showVendor={true}
                    className="w-full"
                  />
                </FormControl>
                <FormDescription>
                  All fields are required. Your information is secure and
                  encrypted.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Hidden fields to capture validation errors */}
          <div className="hidden">
            <FormField
              control={form.control}
              name="cardNumber"
              render={() => <FormMessage />}
            />
            <FormField
              control={form.control}
              name="expiryMonth"
              render={() => <FormMessage />}
            />
            <FormField
              control={form.control}
              name="expiryYear"
              render={() => <FormMessage />}
            />
            <FormField
              control={form.control}
              name="cvv"
              render={() => <FormMessage />}
            />
          </div>

          <div className="space-y-4">
            <Button
              type="submit"
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
              disabled={!form.formState.isValid || !isCardValid}
            >
              {form.formState.isSubmitting
                ? "Saving..."
                : "Save Card Information"}
            </Button>
          </div>
        </form>
      </Form>
    </Card>
  );
}
