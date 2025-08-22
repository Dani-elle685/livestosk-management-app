"use client";
import React, { useState, useEffect } from 'react';
import { Smartphone, Loader2, CheckCircle } from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';

interface MpesaPaymentProps {
  phoneNumber?: string;
  onSuccess: () => void;
  onBack: () => void;
}

export const MpesaPayment: React.FC<MpesaPaymentProps> = ({
  phoneNumber,
  onSuccess,
  onBack
}) => {
  const [step, setStep] = useState<'phone' | 'waiting' | 'pin' | 'processing'>('phone');
  const [mpesaPhone, setMpesaPhone] = useState(phoneNumber);
  const [pin, setPin] = useState('');
  const [countdown, setCountdown] = useState(120); // 2 minutes

  const cartItems = useSelector((state: RootState) => state.cart.items);
     const subTotalPrice = cartItems.reduce(
    (sum, item) => sum + item.purchasePrice * item.quantity,
    0
  );

   const [coupon, setCoupon] = useState("");
    const [discount, setDiscount] = useState(0);
  
    const couponCodes: Record<string, number> = {
      SAVE10: 0.1,
      SAVE20: 0.2,
      FARM5: 0.05,
    };


   const applyCoupon = () => {
    const code = coupon.trim().toUpperCase();
    if (couponCodes[code]) {
      const discountRate = couponCodes[code];
      const discountAmount = subTotalPrice * discountRate;
      setDiscount(discountAmount);
      toast.success(`Coupon applied! You saved $${discountAmount.toFixed(2)}.`);
    } else {
      setDiscount(0);
      toast.error("Invalid coupon code.");
    }
  };

  const totalPrice = subTotalPrice - discount;

  useEffect(() => {
    if (step === 'waiting' && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [step, countdown]);

  const handleSendRequest = () => {
    setStep('waiting');
    // Simulate API call to trigger M-Pesa prompt
    setTimeout(() => {
      setStep('pin');
    }, 3000);
  };

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin.length === 4) {
      setStep('processing');
      // Simulate payment processing
      setTimeout(() => {
        onSuccess();
      }, 2000);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (step === 'phone') {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900">M-Pesa Payment</h2>
        
        <div className="bg-red-50  border-red-200 rounded-lg p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Smartphone className="w-8 h-8 text-red-600" />
            <div>
              <h3 className="text-lg font-semibold ">Pay with M-Pesa</h3>
              <p className="text-muted-foreground">Enter your M-Pesa phone number to continue</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                M-Pesa Phone Number
              </label>
              <input
                type="tel"
                value={mpesaPhone}
                onChange={(e) => setMpesaPhone(e.target.value)}
                placeholder="+254700000000"
                minLength={10}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-red-500 focus:border-transparent"
              />
            </div>
                {/* coupon */}
             <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">
                Coupon code
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter Code"
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-700 outline-none focus:ring-1 focus:ring-red-500"
                />
                <Button
                variant={"outline"}
                  className="bg-red-500 text-white hover:text-white px-4 py-2 rounded-md hover:bg-red-500 text-sm disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500"
                   disabled={cartItems.length === 0 || coupon.length < 5}
                  onClick={applyCoupon}
                >
                  Apply
                </Button>
              </div>
            </div>

            {/* Prices */}
            <div className="border-t pt-4 space-y-2 text-sm sm:text-base">
              <div className="flex justify-between text-gray-700">
                <span>Subtotal</span>
                <span>${subTotalPrice.toFixed(2)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Coupon Discount</span>
                  <span>- ${discount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between font-semibold text-gray-800">
                <span>Total</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
            </div>
            
            <div className="bg-white rounded-lg p-4 border">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Amount to pay:</span>
                <span className="text-2xl font-bold text-red-600">KES {totalPrice.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        
        
        <div className="flex space-x-4">
          <Button
          variant={"outline"}
            onClick={onBack}
            className="flex-1 cursor-pointer bg-gray-200 text-gray-800 py-3 px-6 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
          >
            Back
          </Button>
          
          <Button
          variant={"outline"}
            onClick={handleSendRequest}
            disabled={!mpesaPhone}
            className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-colors disabled:cursor-not-allowed ${
              mpesaPhone
                ? 'bg-red-600 text-white hover:text-white hover:bg-red-600 cursor-pointer'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Send Payment Request
          </Button>
        </div>
      </div>
    );
  }

  if (step === 'waiting') {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900">Payment Request Sent</h2>
        
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-8 text-center">
          <div className="flex justify-center mb-4">
            <div className="animate-pulse">
              <Smartphone className="w-16 h-16 text-blue-600" />
            </div>
          </div>
          
          <h3 className="text-xl font-semibold text-blue-900 mb-2">Check your phone</h3>
          <p className="text-blue-700 mb-6">
            A payment request has been sent to <strong>{mpesaPhone}</strong>
            <br />
            Please check your phone and follow the M-Pesa prompts
          </p>
          
          <div className="bg-white rounded-lg p-4 mb-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Amount:</span>
              <span className="font-bold text-blue-600">KES {totalPrice.toFixed(2)}</span>
            </div>
          </div>
          
          <div className="text-sm text-blue-600">
            Request expires in: <strong>{formatTime(countdown)}</strong>
          </div>
        </div>
        
        <button
          onClick={() => setStep('pin')}
          className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          I've received the prompt
        </button>
      </div>
    );
  }

  if (step === 'pin') {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900">Enter M-Pesa PIN</h2>
        
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <div className="flex items-center space-x-3 mb-4">
            <CheckCircle className="w-8 h-8 text-red-600" />
            <div>
              <h3 className="text-lg font-semibold text-red-900">Payment Request Received</h3>
              <p className="text-red-700">Enter your M-Pesa PIN to complete the payment</p>
            </div>
          </div>
          
          <form onSubmit={handlePinSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                M-Pesa PIN
              </label>
              <input
                type="password"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                maxLength={4}
                placeholder="Enter 4-digit PIN"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-center text-2xl tracking-widest"
              />
            </div>
            
            <button
              type="submit"
              disabled={pin.length !== 4}
              className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors ${
                pin.length === 4
                  ? 'bg-red-600 text-white hover:bg-red-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Confirm Payment
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Processing Payment</h2>
      
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-8 text-center">
        <div className="flex justify-center mb-4">
          <Loader2 className="w-16 h-16 text-blue-600 animate-spin" />
        </div>
        
        <h3 className="text-xl font-semibold text-blue-900 mb-2">Processing your payment</h3>
        <p className="text-blue-700">Please wait while we confirm your M-Pesa payment...</p>
      </div>
    </div>
  );
};