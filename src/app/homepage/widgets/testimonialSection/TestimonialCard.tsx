"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  rating: number;
  image: string;
}

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial }) => {
//   const renderStars = (rating: number) => {
//     return Array.from({ length: 5 }, (_, index) => (
//       <Star
//         key={index}
//         className={`w-4 h-4 ${
//           index < rating ? "text-yellow-400 fill-current" : "text-gray-300"
//         }`}
//       />
//     );
//   };

  return (
    <Card className="flex-1 min-w-0 bg-white transition-all duration-300 border-0">
      <CardContent className="p-8">
        <div className="flex items-center mb-6">
          <img
            src={testimonial.image}
            alt={testimonial.name}
            className="w-16 h-16 rounded-full object-cover mr-4 ring-4 ring-emerald-100"
          />
          <div className="flex-1">
            <h3 className="font-semibold text-lg text-gray-900">{testimonial.name}</h3>
            <p className="text-emerald-600 font-medium">{testimonial.role}</p>
          </div>
        </div>
        {/* <div className="flex mb-4">{renderStars(testimonial.rating)}</div> */}
        <p className="text-gray-700 leading-relaxed italic">"{testimonial.content}"</p>
      </CardContent>
    </Card>
  );
};