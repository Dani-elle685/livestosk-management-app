"use client";
import React, { useState, useEffect } from 'react';
import { TestimonialSlider } from './widgets/testimonialSection/TestimonialSlider';

const testimonials = [
  {
    id: 1,
    name: 'John Mwangi',
    role: 'Dairy Farmer, Nyeri',
    content:
      'I bought two high-yield dairy cows through this platform and the process was seamless. The animals were healthy, and the delivery was on time.',
    rating: 5,
    image:
      'https://images.pexels.com/photos/735968/pexels-photo-735968.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop&crop=face',
  },
  {
    id: 2,
    name: 'Mary Wanjiru',
    role: 'Goat Farmer, Nakuru',
    content:
      'The goats I purchased were exactly as described. They have adapted well to my farm and are producing great milk for my small dairy business.',
    rating: 5,
    image:
      'https://images.pexels.com/photos/1482101/pexels-photo-1482101.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop&crop=face',
  },
  {
    id: 3,
    name: 'Peter Kamau',
    role: 'Beef Cattle Farmer, Eldoret',
    content:
      'I appreciate the transparency and quality assurance. My steers were in excellent condition and fetched good prices after fattening.',
    rating: 5,
    image:
      'https://images.pexels.com/photos/735423/pexels-photo-735423.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop&crop=face',
  },
  {
    id: 4,
    name: 'Grace Achieng',
    role: 'Sheep Farmer, Kisumu',
    content:
      'The Merino sheep I bought are healthy and already producing high-quality wool. The sellers were very professional.',
    rating: 5,
    image:
      'https://images.pexels.com/photos/158730/sheep-sheep-farm-animal-wool-158730.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop&crop=face',
  },
  {
    id: 5,
    name: 'Samuel Otieno',
    role: 'Mixed Farmer, Kitale',
    content:
      'I’ve bought poultry and dairy goats from this platform. Every transaction was smooth, and I always received healthy livestock.',
    rating: 5,
    image:
      'https://images.pexels.com/photos/4911702/pexels-photo-4911702.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop&crop=face',
  },
  {
    id: 6,
    name: 'Lucy Wairimu',
    role: 'Rabbit Farmer, Thika',
    content:
      'I started my rabbit farming business with rabbits bought here. They were healthy and came with proper care instructions.',
    rating: 5,
    image:
      'https://images.pexels.com/photos/5255212/pexels-photo-5255212.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop&crop=face',
  },
];

export default function TestimonialSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleTestimonials, setVisibleTestimonials] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setVisibleTestimonials(1);
      } else if (window.innerWidth < 1024) {
        setVisibleTestimonials(2);
      } else {
        setVisibleTestimonials(3);
      }
      setCurrentIndex(0);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
     <section id="testimonials" className="py-6 bg-[#faf7f7]">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            What Our Clients Say
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Discover the experiences that our clients have experienced.
          </p>
        </div>

        <TestimonialSlider
          testimonials={testimonials}
          visibleTestimonials={visibleTestimonials}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
        />
      </div>
    </section>
  );
}