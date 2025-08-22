"use client"
import React, { useState } from 'react';
import { CreditCard } from 'lucide-react';
import { CreditCardData } from '../type';
import { Button } from '@/components/ui/button';

interface CreditCardFormProps {
  onSubmit: (cardData: CreditCardData) => void;
  onBack: () => void;
}

export const CreditCardForm: React.FC<CreditCardFormProps> = ({ onSubmit, onBack }) => {
  const [cardData, setCardData] = useState<CreditCardData>({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: ''
  });

  // Check if all fields have a value
  const isFormValid =
    cardData.cardholderName.trim() !== '' &&
    cardData.cardNumber.replace(/\s/g, '').length === 16 &&
    cardData.expiryDate.replace(/\D/g, '').length === 4 &&
    cardData.cvv.length === 3;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid) {
      onSubmit(cardData);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === 'cardNumber') {
      formattedValue = value.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim();
    } else if (name === 'expiryDate') {
      formattedValue = value.replace(/\D/g, '').replace(/(\d{2})(\d{2})/, '$1/$2');
    } else if (name === 'cvv') {
      formattedValue = value.replace(/\D/g, '');
    }

    setCardData(prev => ({
      ...prev,
      [name]: formattedValue
    }));
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Credit Card Information</h2>

      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <div className="flex items-center space-x-3 mb-4">
          <CreditCard className="w-8 h-8 text-red-600" />
          <div>
            <h3 className="text-lg font-semibold ">Secure Payment</h3>
            <p className="text-muted-foreground">Your payment information is encrypted and secure</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Cardholder Name *
            </label>
            <input
              type="text"
              name="cardholderName"
              value={cardData.cardholderName}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Card Number *
            </label>
            <input
              type="text"
              name="cardNumber"
              value={cardData.cardNumber}
              onChange={handleChange}
              placeholder="1234 5678 9012 3456"
              maxLength={19}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Expiry Date *
              </label>
              <input
                type="text"
                name="expiryDate"
                value={cardData.expiryDate}
                onChange={handleChange}
                placeholder="MM/YY"
                maxLength={5}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                CVV *
              </label>
              <input
                type="text"
                name="cvv"
                value={cardData.cvv}
                onChange={handleChange}
                placeholder="123"
                maxLength={3}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
          </div>
        </form>
      </div>

      <div className="flex space-x-4">
        <Button
          variant={"outline"}
          onClick={onBack}
          className="flex-1 bg-gray-200 text-gray-800 py-2 px-6 rounded-md font-semibold hover:bg-gray-300 transition-colors"
        >
          Back
        </Button>

        <Button
        variant={"outline"}
          onClick={handleSubmit}
          disabled={!isFormValid}
          className={`flex-1 py-3 px-6 rounded-md font-semibold transition-colors ${
            isFormValid
              ? 'bg-red-600 text-white hover:text-white hover:bg-red-700'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          Complete Payment
        </Button>
      </div>
    </div>
  );
};