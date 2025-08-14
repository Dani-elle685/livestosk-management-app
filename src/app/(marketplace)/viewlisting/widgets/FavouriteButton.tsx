"use client";

import React from "react";
import { Heart } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { addToWishList, removeFromWishList } from "@/lib/wishlistSlice";
import { toast } from "sonner";
import { LivestockList } from "@/infrastructure/marketplace/dto/listed.livestock";

interface FavouriteButtonProps {
  livestock: LivestockList;
  className?: string;
  stopPropagation?: boolean;
}

export const FavouriteButton: React.FC<FavouriteButtonProps> = ({
  livestock,
  className = "",
  stopPropagation = true,
}) => {
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state: RootState) => state.wishlist.items);
  const isInWishList = wishlistItems.some(
    (item) => item.recordId === livestock.recordId
  );

  const handleToggleWishlist = (e: React.MouseEvent) => {
    if (stopPropagation) e.stopPropagation();

    if (isInWishList) {
      dispatch(removeFromWishList(livestock.recordId));
      toast.error("Removed from Wishlist.");
    } else {
      dispatch(addToWishList({ ...livestock }));
      toast.success("Added to Wishlist Successfully.");
    }
  };

  return (
    <button
      className={`p-2 bg-white/80 rounded-full hover:bg-white transition-colors ${className}`}
      onClick={handleToggleWishlist}
    >
      <Heart
        className={`w-4 h-4 text-gray-600 hover:text-red-500 cursor-pointer ${
          isInWishList ? "text-red-500 hover:text-red-500" : ""
        }`}
      />
    </button>
  );
};
