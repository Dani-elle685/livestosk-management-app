"use client";
import React from 'react';
import { CreditCard, Smartphone } from 'lucide-react';
import { PaymentMethod } from '../type';
import { Button } from '@/components/ui/button';

interface PaymentMethodSelectionProps {
  selectedMethod: PaymentMethod | null; // Receive the selected method from props
  onSelectPaymentMethod: (method: PaymentMethod) => void;
  onContinue: () => void; // A new prop for handling the continue button click
  onBack: () => void;
}

export const PaymentMethodSelection: React.FC<PaymentMethodSelectionProps> = ({
  selectedMethod,
  onSelectPaymentMethod,
  onContinue,
  onBack
}) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Select Payment Method</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div
          className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
            selectedMethod === 'mpesa'
              ? 'border-red-500 bg-red-50'
              : 'border-gray-200 hover:border-gray-300'
          }`}
          onClick={() => onSelectPaymentMethod('mpesa')} // Call parent handler to update state
        >
          <div className="flex items-center space-x-4">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center aspect-square ${
              selectedMethod === 'mpesa' ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-600'
            }`}>
              <Smartphone className="w-6 h-6" />
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900">M-Pesa</h3>
              <p className="text-gray-600">Pay using your M-Pesa mobile money account</p>
            </div>

            <div className="ml-auto">
              <div className={`w-5 h-5 rounded-full border-2 ${
                selectedMethod === 'mpesa'
                  ? 'border-red-500 bg-red-500'
                  : 'border-gray-300'
              }`}>
                {selectedMethod === 'mpesa' && (
                  <div className="w-full h-full rounded-full bg-white scale-50"></div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div
          className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
            selectedMethod === 'credit_card'
              ? 'border-red-500 bg-red-50'
              : 'border-gray-200 hover:border-gray-300'
          }`}
          onClick={() => onSelectPaymentMethod('credit_card')} // Call parent handler to update state
        >
          <div className="flex items-center space-x-4">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center aspect-square ${
              selectedMethod === 'credit_card' ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-600'
            }`}>
              <CreditCard className="w-6 h-6" />
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900">Credit Card</h3>
              <p className="text-gray-600">Pay securely with your credit or debit card</p>
            </div>

            <div className="ml-auto">
              <div className={`w-5 h-5 rounded-full border-2 ${
                selectedMethod === 'credit_card'
                  ? 'border-red-500 bg-red-500'
                  : 'border-gray-300'
              }`}>
                {selectedMethod === 'credit_card' && (
                  <div className="w-full h-full rounded-full bg-white scale-50"></div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex space-x-4">
        <Button
        variant={"outline"}
          onClick={onBack}
          className="flex-1 cursor-pointer bg-gray-200 text-gray-800 py-3 px-6 rounded-md font-semibold hover:bg-gray-300 transition-colors"
        >
          Back to Cart
        </Button>

        <Button
                variant={"outline"}

          onClick={onContinue} // Use the new onContinue prop
          disabled={!selectedMethod}
          className={`flex-1 py-3 px-6 rounded-md font-semibold transition-colors ${
            selectedMethod
              ? 'bg-red-600 text-white hover:text-white hover:bg-red-600 cursor-pointer'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          Continue
        </Button>
      </div>
    </div>
  );
};