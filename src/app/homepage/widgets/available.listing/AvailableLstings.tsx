"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { LivestockCard } from "@/app/(marketplace)/viewlisting/widgets/LivestockCard";
import { LivestockList } from "@/infrastructure/marketplace/dto/listed.livestock";
import Link from "next/link";

interface ListingSliderProps {
  livestock: LivestockList[];
  visiblelivestock: number;
  currentIndex: number;
  setCurrentIndex: (index: number) => void;
}

export const ListingSlider: React.FC<ListingSliderProps> = ({
  livestock,
  visiblelivestock,
  currentIndex,
  setCurrentIndex,
}) => {
  const totalSlides = Math.ceil(livestock.length / visiblelivestock);

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
              className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
              style={{ width: `${100 / totalSlides}%` }}
            >
              {livestock
                .slice(
                  slideIndex * visiblelivestock,
                  (slideIndex + 1) * visiblelivestock
                )
                .map((data) => (
                  <LivestockCard key={data.recordId} livestock={data} />
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
      <div className="flex justify-center pt-4">
        <Link
          href={"/viewlisting"}
          className="bg-red-500 text-white rounded-md p-2"
        >
          View All Listings
        </Link>
      </div>
    </>
  );
};
