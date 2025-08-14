"use client";

import { RootState } from "@/lib/store";
import { Heart, ShoppingCart, Truck } from "lucide-react";
import Link from "next/link";
import { useSelector } from "react-redux";

const Navbar = () => {
  //get cartItems fromredux store to display the items count
  // const cartItems = useSelector((state: RootState) => state.cart.items);
  // const cartItemsCount = cartItems.reduce(
  //   (total, item) => total + item.quantity,
  //   0
  // );
  const cartItems = useSelector((state: RootState) => state.cart.items);
const cartItemsCount = cartItems.length;

  //get wishlist items from redux store to display item count
  const wishlistItems = useSelector((state: RootState) => state.wishlist.items);
  const wishlistCount = wishlistItems.length;

  return (
    <header className="w-full bg-white shadow-sm">
      <div className="container mx-auto flex items-center justify-between py-2 px-6">
        {/* Logo / Title */}
        <div className="flex flex-col leading-tight">
          <span className="text-lg font-bold text-red-500">
            Flowstatic Animal Marketplace
          </span>
          <span className="text-sm text-gray-500">Animal Markeplace</span>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex space-x-8">
          <Link href="/" className="text-gray-700 hover:text-red-500">
            Home
          </Link>
          {/* <Link
            href="/new-arrivals"
            className="text-gray-700 hover:text-red-500"
          >
            New Arrivals
          </Link>
          <Link
            href="/top-sellers"
            className="text-gray-700 hover:text-red-500"
          >
            Top Sellers
          </Link> */}
          <Link href="/viewlisting" className="text-gray-700 hover:text-red-500">
            Animals
          </Link>
        </nav>

        {/* Icons */}
        <div className="flex items-center space-x-6">
          {/* <Link href="/shipping" className="text-gray-700 hover:text-red-500">
            <Truck className="w-5 h-5" />
          </Link> */}
          <Link href="/wishlist" className="text-gray-700 relative hover:text-red-500">
            <Heart className="w-5 h-5" />
            {wishlistCount > 0 && (
              <span className="absolute -top-3 left-2 text-xs text-white bg-red-400 rounded px-1.5 py-0.5">
                {wishlistCount}
              </span>
            )}
          </Link>
          <Link href="/cart" className="text-gray-700 relative hover:text-red-500">
            <ShoppingCart className="w-5 h-5" />
            {cartItemsCount > 0 && (
              <span className="absolute -top-3 left-2 text-xs text-white bg-red-400 rounded px-1.5 py-0.5">
                {cartItemsCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
