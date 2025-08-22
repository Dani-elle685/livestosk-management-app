"use client";

import { RootState } from "@/lib/store";
import { Heart, ShoppingCart, Menu, X } from "lucide-react";
import Link from "next/link";
import { useSelector } from "react-redux";
import { useState } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/viewlisting", label: "Animals" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const cartItemsCount = useSelector((state: RootState) => state.cart.items.length);
  const wishlistCount = useSelector((state: RootState) => state.wishlist.items.length);

  return (
    <header className="w-full bg-white shadow-sm">
      <div className="container mx-auto flex items-center justify-between py-2 px-6">
        {/* Logo / Title */}
        <div className="flex flex-col leading-tight">
          <span className="text-lg font-bold text-red-500">
            Flowstatic Animal Marketplace
          </span>
          <span className="text-sm text-gray-500">Animal Marketplace</span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          <NavLinks />
        </nav>

        {/* Icons */}
        <div className="flex items-center space-x-6">
          <IconLink href="/wishlist" icon={<Heart className="w-5 h-5" />} count={wishlistCount} />
          <IconLink href="/cart" icon={<ShoppingCart className="w-5 h-5" />} count={cartItemsCount} />

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700 hover:text-red-500"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <nav className="md:hidden bg-white border-t border-gray-200 shadow-sm">
          <div className="flex flex-col space-y-4 px-6 py-4">
            <NavLinks closeMenu={() => setIsMenuOpen(false)} />
          </div>
        </nav>
      )}
    </header>
  );
};

/* Reusable Nav Links */
const NavLinks = ({ closeMenu }: { closeMenu?: () => void }) => (
  <>
    {navLinks.map((link) => (
      <Link
        key={link.href}
        href={link.href}
        className="text-gray-700 hover:text-red-500"
        onClick={closeMenu}
      >
        {link.label}
      </Link>
    ))}
  </>
);

/* Reusable Icon Link */
const IconLink = ({ href, icon, count }: { href: string; icon: React.ReactNode; count: number }) => (
  <Link href={href} className="text-gray-700 relative hover:text-red-500">
    {icon}
    {count > 0 && (
      <span className="absolute -top-3 left-2 text-xs text-white bg-red-400 rounded px-1.5 py-0.5">
        {count}
      </span>
    )}
  </Link>
);

export default Navbar;
