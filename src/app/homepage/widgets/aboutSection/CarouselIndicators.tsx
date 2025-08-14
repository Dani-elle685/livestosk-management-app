"use client";
import React from 'react';

interface CarouselIndicatorsProps {
  imagesCount: number;
  currentImageIndex: number;
  goToSlide: (index: number) => void;
}

export const CarouselIndicators: React.FC<CarouselIndicatorsProps> = ({
  imagesCount,
  currentImageIndex,
  goToSlide
}) => {
  return (
    <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-20 flex space-x-3">
      {Array.from({ length: imagesCount }).map((_, index) => (
        <button
          key={index}
          onClick={() => goToSlide(index)}
          className={`w-3 h-3 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/50 ${
            index === currentImageIndex 
              ? 'bg-white scale-125 shadow-lg' 
              : 'bg-white/50 hover:bg-white/75 hover:scale-110'
          }`}
          aria-label={`Go to slide ${index + 1}`}
        />
      ))}
    </div>
  );
};