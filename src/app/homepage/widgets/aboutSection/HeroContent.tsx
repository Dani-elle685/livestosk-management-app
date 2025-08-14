"use client";
import React from 'react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

interface HeroContentProps {
  isLoaded: boolean;
  scrollToTestimonials: () => void;
}

export const HeroContent: React.FC<HeroContentProps> = ({
  isLoaded,
  scrollToTestimonials
}) => {
  const router = useRouter();

  return (
    <div className="relative z-10 flex h-full items-center justify-center">
      <div className="text-center text-white px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <h1 className={`text-5xl md:text-7xl font-bold mb-6 transition-all duration-1000 ${
          isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          Flowstatic Animal MarketPlace
        </h1>
        <p className={`text-xl md:text-2xl mb-8 text-gray-100 max-w-2xl mx-auto leading-relaxed transition-all duration-1000 delay-300 ${
          isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          Discover the extraordinary in the ordinary. Experience the world's animal marketplace.
        </p>
        <div className={`flex flex-col sm:flex-row gap-4 justify-center items-center transition-all duration-1000 delay-500 ${
          isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <Button 
            variant="outline" 
            size="lg" 
            onClick={scrollToTestimonials}
            className="border-white cursor-pointer text-white bg-white/10 hover:bg-white/10 hover:text-white px-8 py-3 text-lg font-semibold transition-all duration-300 hover:scale-105 backdrop-blur-sm"
          >
            Get Started
          </Button>
          <Button 
            size="lg" 
            onClick={() => router.push("/viewlisting")} 
            className="bg-red-600 hover:bg-red-700 cursor-pointer text-white px-8 py-3 text-lg font-semibold shadow-lg transition-all duration-300 hover:scale-105"
          >
            View Animals
          </Button>
        </div>
      </div>
    </div>
  );
};