import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Weight, MapPin } from "lucide-react";
import { LivestockList } from "../../../../infrastructure/marketplace/dto/listed.livestock";
import { usePathname, useRouter } from "next/navigation";
import { FavouriteButton } from "./FavouriteButton";
import { AddToCartButton } from "./AddToCartButton";
import Image from "next/image";

interface LivestockCardProps {
  livestock: LivestockList;
}

export const LivestockCard: React.FC<LivestockCardProps> = ({ livestock }) => {
  const router = useRouter();
  const path =  usePathname();
  console.log("the path name is===>", path)

  const handleClick = () => {
    router.push(`/viewlisting/${livestock.recordId}`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Available":
        return "bg-green-600 hover:bg-green-700";
      case "Sold":
        return "bg-red-600 hover:bg-red-700";
      case "Reserved":
        return "bg-yellow-600 hover:bg-yellow-700";
      default:
        return "bg-gray-600 hover:bg-gray-700";
    }
  };
  const age =
    new Date().getFullYear() - new Date(livestock.dateOfBirth).getFullYear();

  return (
    <Card className=" rounded pt-0 cursor-pointer" onClick={handleClick}>
      <div className="relative">
        <div className="group aspect-[4/3] overflow-hidden  cursor-pointer hover:shadow-lg transition-all duration-300">
          <Image
            src={livestock.imageUrl[0]}
            width={100}
            height={100}
            alt={livestock.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Status badge */}
        <div
          className={`absolute top-0 left-0 px-3 py-1 text-white text-sm font-medium ${getStatusColor(
            livestock.status
          )}`}
        >
          {livestock.status.toUpperCase()}
        </div>

        {/* Heart icon */}
        <FavouriteButton
          livestock={livestock}
          className="absolute top-1 right-2"
        />

        {/* Member access badge
        <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-green-600/90 text-white px-3 py-1 rounded-full text-sm">
          <div className="w-2 h-2 bg-white rounded-full"></div>
          <span>Members Access</span>
        </div> */}
      </div>

      <CardContent className="p-2 py-0">
        <div className="space-y-3">
          <div>
            <h3 className="text-lg font-semibold text-foreground">
              {livestock.name} - {livestock.breed}
            </h3>
          </div>

          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>{age} yo</span>
            </div>
            <div className="flex items-center gap-1">
              <Weight className="w-4 h-4" />
              <span>{livestock.weight}kg</span>
            </div>
          </div>

          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <MapPin className="w-4 h-4" />
            <span>Somerset</span>
          </div>
          {path !== "/" && 
          <div className="flex items-center justify-between pt-2">
            <AddToCartButton livestock={livestock} />
            <p className="text-lg font-semibold text-green-600">
              ${livestock.purchasePrice}
            </p>
          </div>
          }
        </div>
      </CardContent>
    </Card>
  );
};
