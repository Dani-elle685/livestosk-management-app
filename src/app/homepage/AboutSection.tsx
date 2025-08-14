"use client";
import React, { useState, useEffect } from 'react';
import { HeroBackground } from './widgets/aboutSection/HeroBackground';
import { HeroContent } from './widgets/aboutSection/HeroContent';
import { CarouselIndicators } from './widgets/aboutSection/CarouselIndicators';
import { ScrollIndicator } from './widgets/aboutSection/ScrollIndicator';


export default function HomeSection() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const scrollToTestimonials = () => {
    document.getElementById('testimonials')?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };

  const goToSlide = (index: number) => {
    setCurrentImageIndex(index);
  };

  return (
    <section 
      className="relative h-screen w-full overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <HeroBackground 
        currentImageIndex={currentImageIndex}
        isPaused={isPaused}
        setCurrentImageIndex={setCurrentImageIndex}
      />
      
      <HeroContent 
        isLoaded={isLoaded}
        scrollToTestimonials={scrollToTestimonials}
      />
      
      <CarouselIndicators 
        imagesCount={5}
        currentImageIndex={currentImageIndex}
        goToSlide={goToSlide}
      />

      <ScrollIndicator scrollToTestimonials={scrollToTestimonials} />
    </section>
  );
}