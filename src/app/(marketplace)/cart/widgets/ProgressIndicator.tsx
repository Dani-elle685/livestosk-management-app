"use client";
import React from 'react';
import { CheckCircle } from 'lucide-react';

interface ProgressIndicatorProps {
  currentStep: string;
}

const steps = [
  { id: 'cart', label: 'Cart', order: 1, relatedSteps: ['cart'] },
  { id: 'payment', label: 'Payment', order: 2, relatedSteps: ['payment', 'mpesa_confirm', 'processing'] },
  { id: 'success', label: 'Complete', order: 3, relatedSteps: ['success'] },
];

export const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({ currentStep }) => {
  const findCurrentOrder = () => {
    const step = steps.find(s => s.relatedSteps.includes(currentStep));
    return step?.order || 1;
  };

  const currentOrder = findCurrentOrder();

  return (
    <div className="w-full mb-8">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const isCompleted = step.order < currentOrder;
          const isCurrent = step.relatedSteps.includes(currentStep);
          const isLast = index === steps.length - 1;

          return (
            <div key={step.id} className="flex items-center">
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                    isCompleted
                      ? 'bg-green-500 text-white'
                      : isCurrent
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {isCompleted ? <CheckCircle className="w-5 h-5" /> : step.order}
                </div>
                <span
                  className={`mt-2 text-xs font-medium ${
                    isCompleted || isCurrent ? 'text-gray-900' : 'text-gray-500'
                  }`}
                >
                  {step.label}
                </span>
              </div>
              {!isLast && (
                <div
                  className={`flex-1 h-0.5 mx-4 transition-all duration-300 ${
                    isCompleted ? 'bg-green-500' : 'bg-gray-200'
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};