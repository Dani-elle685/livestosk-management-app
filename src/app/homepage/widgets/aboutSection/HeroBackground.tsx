"use client";
import React, { useState, useEffect } from 'react';

const natureImages = [
  'https://images.unsplash.com/photo-1596733430284-f7437764b1a9?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1554755209-85e44182e019?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1560819400-434c188f63ef?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1743850849923-7d6ac84b6710?q=80&w=1133&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://plus.unsplash.com/premium_photo-1661811804102-0da6840d7327?q=80&w=1172&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
];

interface HeroBackgroundProps {
  currentImageIndex: number;
  isPaused: boolean;
  setCurrentImageIndex: React.Dispatch<React.SetStateAction<number>>;
}

export const HeroBackground: React.FC<HeroBackgroundProps> = ({
  currentImageIndex,
  isPaused,
  setCurrentImageIndex
}) => {
  useEffect(() => {
    if (isPaused) return;
    
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex: number) => 
        (prevIndex + 1) % natureImages.length
      );
    }, 60000); // Change every minute

    return () => clearInterval(interval);
  }, [isPaused, setCurrentImageIndex]);

  return (
    <>
      {natureImages.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 w-full h-full transition-opacity duration-2000 ${
            index === currentImageIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center center',
              backgroundRepeat: 'no-repeat'
            }}
          />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
      ))}
    </>
  );
};