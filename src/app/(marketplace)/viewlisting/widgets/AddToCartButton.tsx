"use client";

import React from "react";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { addToCart, removeFromCart } from "@/lib/cartSlice";
import { toast } from "sonner";
import { LivestockList } from "@/infrastructure/marketplace/dto/listed.livestock";

interface AddToCartButtonProps {
  livestock: LivestockList;
  className?: string;
  stopPropagation?: boolean;
}

export const AddToCartButton: React.FC<AddToCartButtonProps> = ({
  livestock,
  className = "",
  stopPropagation = true,
}) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const isInCart = cartItems.some(
    (item) => item.recordId === livestock.recordId
  );

  const handleToggleCart = (e: React.MouseEvent) => {
    if (stopPropagation) e.stopPropagation();

    if (isInCart) {
      dispatch(removeFromCart(livestock.recordId));
      toast.error("Removed from Cart.");
    } else {
      dispatch(addToCart({ ...livestock }));
      toast.success("Added to Cart Successfully.");
    }
  };

  return (
    <Button
      variant={"outline"}
      className={`cursor-pointer ${
        isInCart ? "bg-red-600 hover:bg-red-600 text-white hover:text-white" : "hover:bg-red-600 hover:text-white disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-white"
      } ${className}`}
      onClick={handleToggleCart}
      disabled={livestock.status.toLocaleLowerCase() === "sold"}
    >
      <ShoppingCart /> {isInCart ? "Remove from Cart" : "Add to Cart"}
    </Button>
  );
};
