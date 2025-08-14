"use client";
import React from 'react';
import { ChevronDown } from 'lucide-react';

interface ScrollIndicatorProps {
  scrollToTestimonials: () => void;
}

export const ScrollIndicator: React.FC<ScrollIndicatorProps> = ({
  scrollToTestimonials
}) => {
  return (
    <button 
      onClick={scrollToTestimonials}
      className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white animate-bounce hover:text-emerald-300 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-opacity-50 rounded-full p-2 z-20"
      aria-label="Scroll to testimonials"
    >
      <ChevronDown className="w-8 h-8" />
    </button>
  );
};