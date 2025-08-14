"use client";
import React, { useState, useEffect } from "react";
import { TestimonialCard } from "./TestimonialCard";
import { Button } from "@/components/ui/button";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  rating: number;
  image: string;
}

interface TestimonialSliderProps {
  testimonials: Testimonial[];
  visibleTestimonials: number;
  currentIndex: number;
  setCurrentIndex: (index: number) => void;
}

export const TestimonialSlider: React.FC<TestimonialSliderProps> = ({
  testimonials,
  visibleTestimonials,
  currentIndex,
  setCurrentIndex,
}) => {
  const totalSlides = Math.ceil(testimonials.length / visibleTestimonials);

  const handleDotClick = (slideIndex: number) => {
    setCurrentIndex(slideIndex);
  };

  return (
    <>
      <div className="relative overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * (100 / totalSlides)}%)`,
            width: `${totalSlides * 100}%`,
          }}
        >
          {Array.from({ length: totalSlides }, (_, slideIndex) => (
            <div
              key={slideIndex}
              className="flex gap-6 lg:gap-8 px-2"
              style={{ width: `${100 / totalSlides}%` }}
            >
              {testimonials
                .slice(
                  slideIndex * visibleTestimonials,
                  (slideIndex + 1) * visibleTestimonials
                )
                .map((testimonial) => (
                  <TestimonialCard key={testimonial.id} testimonial={testimonial} />
                ))}
            </div>
          ))}
        </div>
      </div>

      {/* Dots Navigation */}
      <div className="flex justify-center mt-12 space-x-3">
        {Array.from({ length: totalSlides }, (_, index) => (
          <Button
            key={index}
            variant="ghost"
            size="sm"
            className={`w-3 h-3 rounded-full p-0 transition-all duration-300 ${
              index === currentIndex
                ? "bg-emerald-600 scale-125"
                : "bg-gray-300 hover:bg-gray-400"
            }`}
            onClick={() => handleDotClick(index)}
          />
        ))}
      </div>
    </>
  );
};