"use client";
import { Button } from "@/components/ui/button";
import { removeFromCart, updateQuantity } from "@/lib/cartSlice";
import { RootState } from "@/lib/store";
import { Trash2Icon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "sonner";

const CartHomePage = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);

  const couponCodes: Record<string, number> = {
    SAVE10: 0.1,
    SAVE20: 0.2,
    FARM5: 0.05,
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    const item = cartItems.find((item) => item.recordId === id);
    if (item) {
      const newQuantity = Math.max(1, item.quantity + delta);
      dispatch(updateQuantity({ recordId: id, quantity: newQuantity }));
    }
  };

  const removeItem = (itemId: string) => {
    dispatch(removeFromCart(itemId));
  };

  const subTotalPrice = cartItems.reduce(
    (sum, item) => sum + item.purchasePrice * item.quantity,
    0
  );

  const applyCoupon = () => {
    const code = coupon.trim().toUpperCase();
    if (couponCodes[code]) {
      const discountRate = couponCodes[code];
      const discountAmount = subTotalPrice * discountRate;
      setDiscount(discountAmount);
      toast.success(`Coupon applied! You saved $${discountAmount.toFixed(2)}.`);
    } else {
      setDiscount(0);
      toast.error("Invalid coupon code.");
    }
  };

  const totalPrice = subTotalPrice - discount;
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const cartItemsCount = cartItems.length;

  return (
    <div className="w-full container mx-auto my-12 px-4">
      <h1 className="text-3xl md:text-2xl font-bold text-gray-800 mb-2">Shopping Cart</h1>
      <p>{cartItemsCount} Animal(s) in the Cart</p>

      <div className="flex flex-col lg:flex-row gap-6 pt-4">
        {/* Left Side */}
        <div className="w-full lg:w-2/3 sm:mx-auto">
          <div className="bg-white rounded-md shadow-md py-8 sm:p-6">
            {cartItems.length === 0 ? (
              <div className="p-2 md:p-6">
                <p className="text-xl font-semibold mb-3">
                  Your Cart List is Empty
                </p>
                <Link
                  href={"/viewlisting"}
                  className="rounded bg-red-500 px-4 py-2 text-white font-bold"
                >
                  Shop Now
                </Link>
              </div>
            ) : (
              <>
                {/* Header */}
                <div className="hidden sm:grid grid-cols-[2fr_1fr_1fr_1fr_auto] gap-4 text-gray-700 font-semibold mb-4">
                  <div>Product</div>
                  <div>Price</div>
                  <div>Quantity</div>
                  <div>Total Price</div>
                  <div></div>
                </div>

                {/* Items */}
                {cartItems.map((item, index) => (
                  <div
                    key={item.recordId}
                    className={`grid grid-cols-1 p-2 sm:grid-cols-[2fr_1fr_1fr_1fr_auto] gap-4 items-center py-4 ${
                      index < cartItems.length - 1
                        ? "border-b border-gray-300"
                        : ""
                    }`}
                  >
                    {/* Product */}
                    <div className="flex items-center gap-4">
                      <div className="relative w-12 h-12 sm:w-16 sm:h-16 flex-shrink-0">
                        <Image
                          src={item.imageUrl[0]}
                          alt=""
                          fill
                          style={{ objectFit: "cover" }}
                          className="rounded"
                        />
                      </div>
                      <div>
                        <p className="text-gray-800 font-medium">
                          {item.breed}
                        </p>
                        <span className="text-sm text-gray-500">
                          {item.type}
                        </span>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="flex gap-4 sm:block">
                      <span className="sm:hidden text-gray-600 font-semibold">
                        Price:
                      </span>
                      ${item.purchasePrice.toFixed(2)}
                    </div>

                    {/* Quantity */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center">
                      <div className="flex items-center ">
                        <span className="sm:hidden text-gray-600 font-semibold mr-2">
                          Quantity:
                        </span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="cursor-pointer"
                          onClick={() =>
                            handleUpdateQuantity(item.recordId, -1)
                          }
                        >
                          -
                        </Button>
                        <span className="w-7 text-center">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleUpdateQuantity(item.recordId, 1)}
                          className="cursor-pointer"
                        >
                          +
                        </Button>
                      </div>
                    </div>

                    {/* Total */}
                    <div className="flex gap-4 sm:inline">
                      <span className="sm:hidden text-gray-600 font-semibold">
                        Total:
                      </span>
                      ${(item.quantity * item.purchasePrice).toFixed(2)}
                    </div>

                    {/* Remove */}
                    <div>
                      <Trash2Icon
                        className="text-gray-500 hover:text-red-500 cursor-pointer"
                        onClick={() => removeItem(item.recordId)}
                      />
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>

        {/* Right Side */}
        <div className="w-full lg:w-1/3">
          <div className="bg-white rounded-md p-4 sm:p-6">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">
              Cart Summary
            </h3>

            {/* Coupon */}
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">
                Coupon code
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter Code"
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-700 outline-none focus:ring-1 focus:ring-[#a91f64]"
                />
                <button
                  className="bg-[#a91f64] text-white px-4 py-2 rounded-md hover:bg-[#8a1b54] text-sm"
                  disabled={cartItems.length === 0}
                  onClick={applyCoupon}
                >
                  Apply
                </button>
              </div>
            </div>

            {/* Prices */}
            <div className="border-t pt-4 space-y-2 text-sm sm:text-base">
              <div className="flex justify-between text-gray-700">
                <span>Subtotal</span>
                <span>${subTotalPrice.toFixed(2)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Coupon Discount</span>
                  <span>- ${discount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between font-semibold text-gray-800">
                <span>Total</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
            </div>

            {/* Checkout */}
            <button
              className="w-full mt-4 bg-[#a91f64] text-white px-4 py-2 rounded-md hover:bg-[#8a1b54] disabled:bg-gray-300 disabled:cursor-not-allowed"
              disabled={cartItems.length === 0}
            >
              Proceed to checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartHomePage;
