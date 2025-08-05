import React from "react";
import { CreditCardForm } from "./widgets/CardInformationForm";
import MpesaInformation from "./widgets/MpesaInformation";

const PaymentSettings = () => {
  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-900 mb-8">
        Payment Settings
      </h2>
      <div className="max-w-4xl space-y-8">
        <CreditCardForm />

        <MpesaInformation />
      </div>
    </div>
  );
};

export default PaymentSettings;
