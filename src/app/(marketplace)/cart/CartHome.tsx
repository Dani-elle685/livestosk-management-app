"use client";

import React, { useState } from 'react';
import { ProgressIndicator } from './widgets/ProgressIndicator';
import { PaymentMethodSelection } from './widgets/PaymentMethodSelection';
import { MpesaPayment } from './widgets/MpesaPayment';
import { OrderSuccess } from './widgets/OrderSuccess';
import { CheckoutStep, PaymentMethod } from './type';
import CartHomePage from './widgets/CartHomePage';
import { CreditCardForm } from './widgets/CreditcardForm';

const CartHome = () => {
  const [currentStep, setCurrentStep] = useState<CheckoutStep>('cart');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | null>(null); 
  const [orderNumber] = useState(() => `ORD${Date.now()}`);

  const handleProceedToCheckout = () => {
    setCurrentStep('payment');
  };

  const handlePaymentMethodSelect = (method: PaymentMethod) => {
    setPaymentMethod(method); 
  }; // <-- Remove the extra '}' here

  const handlePaymentContinue = () => {
    if (paymentMethod === 'mpesa') {
      setCurrentStep('mpesa_confirm');
    } else if (paymentMethod === 'credit_card') {
      setCurrentStep('processing');
    }
  };

  const handlePaymentSuccess = () => {
    setCurrentStep('success');
  };

  const handleStartOver = () => {
    setCurrentStep('cart');
    setPaymentMethod(null);
    // Optionally reset cart items
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'cart':
        return (
          <CartHomePage onProceedToCheckout={handleProceedToCheckout} />
        );

      case 'payment':
        return (
          <PaymentMethodSelection
            selectedMethod={paymentMethod}
            onSelectPaymentMethod={handlePaymentMethodSelect}
            onContinue={handlePaymentContinue}
            onBack={() => setCurrentStep('cart')}
          />
        );

      case 'mpesa_confirm':
        return (
          <MpesaPayment
            onSuccess={handlePaymentSuccess}
            onBack={() => setCurrentStep('payment')}
          />
        );

      case 'processing':
        return (
          <CreditCardForm
            onSubmit={handlePaymentSuccess}
            onBack={() => setCurrentStep('payment')}
          />
        );

      case 'success':
        return (
          <OrderSuccess
            orderNumber={orderNumber}
            onStartOver={handleStartOver}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen w-full">
      <div className="container mx-auto px-4 py-8 ">
        {currentStep !== 'success' && <ProgressIndicator currentStep={currentStep} />}

        <div className="bg-white rounded-lg shadow-sm border p-8">
          {renderCurrentStep()}
        </div>
      </div>
    </div>
  );
}

export default CartHome;