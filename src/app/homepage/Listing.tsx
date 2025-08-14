"use client";

import { useEffect, useState } from "react";
import { ListingSlider } from "./widgets/available.listing/AvailableLstings";
import { LivestockList } from "@/infrastructure/marketplace/dto/listed.livestock";

interface Props{
    livestock: LivestockList[]
}

export default function ListedLivestocks({livestock}:Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [listedLivestock, setlistedLivestock] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setlistedLivestock(1);
      } else if (window.innerWidth < 1024) {
        setlistedLivestock(2);
      } else {
        setlistedLivestock(3);
      }
      setCurrentIndex(0);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
     <section id="testimonials" className="py-10 bg-[#faf7f7]">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Listed Animals
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Discover the list of listed animals for sale.
          </p>
        </div>

        <ListingSlider
          livestock={livestock}
          visiblelivestock={listedLivestock}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
        />
      </div>
    </section>
  );
}