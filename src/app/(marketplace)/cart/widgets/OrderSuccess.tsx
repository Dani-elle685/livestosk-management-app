import React from 'react';
import { CheckCircle, Package } from 'lucide-react';

interface OrderSuccessProps {
  orderNumber: string;
  onStartOver: () => void;
}

export const OrderSuccess: React.FC<OrderSuccessProps> = ({ orderNumber, onStartOver }) => {
  return (
    <div className="text-center space-y-6">
      <div className="flex justify-center">
        <CheckCircle className="w-24 h-24 text-green-500" />
      </div>
      
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Order Confirmed!</h2>
        <p className="text-lg text-gray-600">
          Thank you for your purchase. Your order has been successfully processed.
        </p>
      </div>
      
      <div className="bg-green-50 border border-green-200 rounded-lg p-6">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <Package className="w-6 h-6 text-green-600" />
          <span className="text-lg font-semibold text-green-900">Order Number</span>
        </div>
        <p className="text-2xl font-bold text-green-800">{orderNumber}</p>
      </div>
      
      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">What's Next?</h3>
        <div className="space-y-2 text-left">
          <p className="flex items-start space-x-2">
            <span className="text-blue-600 font-bold">1.</span>
            <span className="text-gray-700">You'll receive an email confirmation shortly</span>
          </p>
          <p className="flex items-start space-x-2">
            <span className="text-blue-600 font-bold">2.</span>
            <span className="text-gray-700">Your order will be processed within 1-2 business days</span>
          </p>
          <p className="flex items-start space-x-2">
            <span className="text-blue-600 font-bold">3.</span>
            <span className="text-gray-700">You'll receive a tracking number once shipped</span>
          </p>
        </div>
      </div>
      
      <button
        onClick={onStartOver}
        className="bg-blue-600 text-white py-3 px-8 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
      >
        Continue Shopping
      </button>
    </div>
  );
};