"use client";

import { RootState } from "@/lib/store";
import { removeFromWishList } from "@/lib/wishlistSlice";
import { Trash2Icon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/lib/cartSlice";
import { toast } from "sonner";
import { LivestockList } from "@/infrastructure/marketplace/dto/listed.livestock";

const WishlistHomePage = () => {
  // Remove item from wishlist
  const dispatch = useDispatch();
  const wishlist = useSelector((state: RootState) => state.wishlist.items);
  const cartItems = useSelector((state: RootState) => state.cart.items);

  // Remove item from wishlist
  const removeItem = (id: string) => {
    dispatch(removeFromWishList(id));
  };

  // Add item from wishlist to cart with check
  const addToCartHandler = (item: LivestockList) => {
    const alreadyInCart = cartItems.some(
      (cartItem) => cartItem.recordId === item.recordId
    );

    if (alreadyInCart) {
      toast.error("Item already exists in cart.");
      return;
    }

    const cartItem = { ...item, quantity: 1 };
    dispatch(addToCart(cartItem));
    toast.success("Added to cart successfully.");
  };

  return (
    <div className="w-full max-w-7xl mx-auto my-12 px-4 ">
      <h1 className="text-3xl md:text-2xl font-bold text-gray-800 mb-2">
        Wishlist
      </h1>
      <p className="text-gray-600 mb-6">
        {wishlist.length} Animal(s) in your wishlist
      </p>

      <div className="w-full">
        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
          {wishlist.length === 0 ? (
            <div className="text-center py-6">
              <p className="text-gray-700">Your Wishlist is empty</p>
              <Link
                href="/viewlisting"
                className="mt-4 inline-block bg-red-500 text-white px-4 py-2 font-semibold rounded-md hover:bg-red-600"
              >
                Shop Now
              </Link>
            </div>
          ) : (
            <>
              {/* Wishlist table headers */}
              <div className="hidden sm:grid grid-cols-[2fr_1fr_1fr_1fr_auto] gap-4 text-gray-700 font-semibold">
                <div>Product</div>
                <div>Price</div>
                <div>Stock</div>
                <div>Actions</div>
              </div>

              {/* Wishlist items */}
              {wishlist.map((item, index) => (
                <div
                  key={item.recordId}
                  className={`flex flex-col sm:grid sm:grid-cols-[2fr_1fr_1fr_1fr_auto] gap-4 items-start sm:items-center py-4 ${
                    index < wishlist.length - 1
                      ? "border-b border-gray-400"
                      : ""
                  }`}
                >
                  {/* Product image and name */}
                  <div className="flex items-center gap-4 w-full">
                    <div className="relative w-12 h-12 sm:w-16 sm:h-16 flex-shrink-0">
                      <Image
                        src={item.imageUrl[0]}
                        alt=""
                        fill
                        style={{ objectFit: "cover" }}
                        className="rounded"
                      />
                    </div>

                    <div className="flex-1 sm:flex-none">
                      <div className="flex justify-between items-center">
                        <p className="text-gray-800 font-medium text-sm sm:text-base">
                          {item.breed}
                        </p>
                        <Trash2Icon
                          onClick={() => removeItem(item.recordId)}
                          className="text-gray-500 hover:text-red-500 cursor-pointer text-xs sm:text-sm sm:hidden"
                        />
                      </div>
                      <span className="text-muted-foreground">{item.type}</span>
                    </div>
                  </div>

                  {/* Product price */}
                  <div className="text-gray-700 text-sm sm:text-base flex justify-between w-full sm:block">
                    <span className="sm:hidden font-semibold">Price:</span>$
                    {item.purchasePrice.toFixed(2)}
                  </div>

                  {/* Stock status */}
                  <div className="text-sm sm:text-base flex flex-col w-full sm:block">
                    <span className="sm:hidden text-xs font-medium text-gray-600">
                      Stock:
                    </span>
                    <span
                      className={`text-xs sm:text-sm font-semibold ${
                        item.status.toLowerCase() === "available"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {item.status.toLowerCase() === "available"
                        ? "In Stock"
                        : "Out of Stock"}
                    </span>
                  </div>

                  {/* Action buttons */}
                  <div className="flex flex-col gap-2 w-full sm:flex-row sm:items-center sm:gap-4">
                    <span className="sm:hidden text-xs font-medium text-gray-600">
                      Actions:
                    </span>
                    <div className="flex items-center gap-4">
                      <button
                        disabled={item.status.toLowerCase() === "sold"}
                        className="bg-red-500 cursor-pointer font-semibold text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-md 
                                   hover:bg-red-500
                                   disabled:bg-gray-300 disabled:cursor-not-allowed 
                                   text-sm sm:text-base w-full sm:w-auto"
                        onClick={() => addToCartHandler(item)}
                      >
                        Add to cart
                      </button>
                    </div>
                  </div>

                  {/* Remove icon for desktop */}
                  <Trash2Icon
                    onClick={() => removeItem(item.recordId)}
                    className="text-gray-500 hover:text-red-500 cursor-pointer text-xs sm:text-sm hidden sm:block"
                  />
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default WishlistHomePage;
