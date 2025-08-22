"use client";
import { Button } from "@/components/ui/button";
import { removeFromCart, updateQuantity } from "@/lib/cartSlice";
import { RootState } from "@/lib/store";
import { Trash2Icon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useSelector, useDispatch } from "react-redux";

interface CartPageProps {
  onProceedToCheckout: () => void;
}

const CartHomePage: React.FC<CartPageProps> = ({ onProceedToCheckout }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);

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

  const cartItemsCount = cartItems.length;
  return (
    <div className="w-full container px-4">
      <div className="flex flex-col items-start gap-2 md:flex-row md:justify-between md:items-center">
        <div>
          <h1 className="text-xl md:text-xl font-bold text-gray-800 mb-2">
            Shopping Cart
          </h1>
          <p>{cartItemsCount} Animal(s) in the Cart</p>
        </div>
        {cartItems.length > 0 &&
        <div>
          <Link
            href={"/viewlisting"}
            className="rounded bg-red-500 px-4 py-2 text-white font-bold"
          >
            Continue Shopping
          </Link>
        </div>
         }
      </div>
      <hr />
      <div className="flex flex-col gap-2">
        {/* Left Side */}
        <div className="w-full sm:mx-auto">
          <div className="rounded-md py-8 sm:p-2">
            {cartItems.length === 0 ? (
              <div className="p-2 md:p-3 flex items-center justify-center flex-col">
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
                <div className="hidden sm:grid grid-cols-[2fr_1fr_1fr_1fr_auto] gap-4 text-gray-700 font-semibold mb-2">
                  <div>Product</div>
                  <div>Price</div>
                  <div>Quantity</div>
                  <div>Total Price</div>
                  <div></div>
                </div>

                {/* Items */}
                <div className="flex flex-col gap-2">
                  {cartItems.map((item, index) => (
                  <div
                    key={item.recordId}
                    className={`grid grid-cols-1 p-2 border rounded-md sm:grid-cols-[2fr_1fr_1fr_1fr_auto] gap-4 items-center py-2
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
                </div>
              </>
            )}
          </div>
        </div>

        {cartItems.length > 0 && (
          <div className="sm:p-6 flex items-center justify-end">
            {/* Checkout */}
            <Button
            variant={"outline"}
              className=" mt-4 bg-red-500 text-white hover:text-white cursor-pointer px-4 py-2 rounded-md hover:bg-red-500 disabled:bg-gray-300 disabled:cursor-not-allowed"
              disabled={cartItems.length === 0}
              onClick={onProceedToCheckout}
            >
              Proceed to checkout
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartHomePage;
