"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useStore } from "@/context/StoreContext";

export default function Header() {
  const { cart, wishlist } = useStore();
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isMiniCartOpen, setIsMiniCartOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const totalCartItems = cart.reduce((total, item) => total + item.quantity, 0);
  const totalCartPrice = cart.reduce((total, item) => total + item.product.price * item.quantity, 0);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop" },
    { name: "About Us", href: "/about" },
    { name: "Contact Us", href: "/contact" }
  ];

  return (
    <>
      {/* Top Banner */}
      <div className="bg-[#0066CC] text-white text-center py-2 px-4 text-xs font-semibold tracking-wider flex justify-between items-center max-w-[1200px] mx-auto md:px-8">
        <span className="hidden sm:inline">🇵🇰 Premium Crockery Delivered Nationwide</span>
        <span className="mx-auto sm:mx-0">🎉 LAUNCH OFFER: 10% OFF with code: <strong>LAUNCH10</strong></span>
        <a 
          href="https://wa.me/923001234567" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="hover:underline flex items-center gap-1 font-bold text-yellow-300"
        >
          {/* WhatsApp icon */}
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
            <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.96 9.96 0 001.333 4.993L2 22l5.13-1.347a9.945 9.945 0 004.887 1.277h.005c5.505 0 9.988-4.478 9.99-9.985C22.017 6.478 17.524 2 12.012 2zm0 18.29h-.003a8.252 8.252 0 01-4.215-1.154l-.303-.18-3.13.82.835-3.05-.198-.314a8.249 8.249 0 01-1.264-4.428c.001-4.558 3.712-8.267 8.28-8.267 2.212 0 4.291.86 5.854 2.428a8.228 8.228 0 012.425 5.85c-.002 4.56-3.713 8.266-8.282 8.266z"/>
          </svg>
          WhatsApp Us
        </a>
      </div>

      {/* Main Header */}
      <header className={`sticky top-0 z-40 w-full transition-all duration-300 ${scrolled ? "bg-white shadow-md py-3" : "bg-white/95 backdrop-blur-md py-5 border-b border-gray-100"}`}>
        <div className="max-w-[1200px] mx-auto px-4 md:px-8 flex items-center justify-between gap-4">
          
          {/* Logo */}
          <Link href="/" className="flex flex-col">
            <span className="text-xl md:text-2xl font-extrabold text-[#0066CC] tracking-tight leading-none">
              CROCKERY<span className="text-amber-500 font-medium">MART</span>
            </span>
            <span className="text-[10px] text-gray-500 font-semibold tracking-widest mt-0.5">PREMIUM KITCHENWARE</span>
          </Link>

          {/* Search bar (Desktop) */}
          <form onSubmit={handleSearchSubmit} className="hidden md:flex flex-1 max-w-md relative">
            <input
              type="text"
              placeholder="Search premium plates, bowls, cups..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-4 pr-10 py-2 border-2 border-gray-200 rounded-full focus:outline-none focus:border-[#0066CC] text-sm transition-colors text-black"
            />
            <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#0066CC] transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </form>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm font-semibold transition-colors hover:text-[#0066CC] ${pathname === link.href ? "text-[#0066CC] border-b-2 border-[#0066CC] pb-1" : "text-gray-700"}`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4 text-black">
            
            {/* Wishlist Link */}
            <Link href="/shop?filter=wishlist" className="relative p-2 text-gray-600 hover:text-[#0066CC] transition-colors" title="Wishlist">
              <svg className="w-6 h-6" fill={wishlist.length > 0 ? "#FFD700" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white shadow">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Cart Icon (Toggles Mini Cart) */}
            <button 
              onClick={() => setIsMiniCartOpen(!isMiniCartOpen)}
              className="relative p-2 text-gray-600 hover:text-[#0066CC] transition-colors focus:outline-none"
              title="Shopping Cart"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {totalCartItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#0066CC] text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white shadow">
                  {totalCartItems}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-gray-600 hover:text-[#0066CC] transition-colors focus:outline-none"
            >
              {isMobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>

        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full bg-white border-t border-gray-100 shadow-xl py-4 px-6 flex flex-col gap-4 transition-all duration-300">
            {/* Mobile Search */}
            <form onSubmit={handleSearchSubmit} className="relative w-full">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-4 pr-10 py-2 border border-gray-200 rounded-full focus:outline-none text-sm text-black"
              />
              <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </form>

            <nav className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-base font-semibold py-1 transition-colors hover:text-[#0066CC] ${pathname === link.href ? "text-[#0066CC]" : "text-gray-700"}`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>
            <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
              <a 
                href="https://wa.me/923001234567" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2.5 rounded-full text-center flex items-center justify-center gap-2 text-sm shadow"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.96 9.96 0 001.333 4.993L2 22l5.13-1.347a9.945 9.945 0 004.887 1.277h.005c5.505 0 9.988-4.478 9.99-9.985C22.017 6.478 17.524 2 12.012 2zm0 18.29h-.003a8.252 8.252 0 01-4.215-1.154l-.303-.18-3.13.82.835-3.05-.198-.314a8.249 8.249 0 01-1.264-4.428c.001-4.558 3.712-8.267 8.28-8.267 2.212 0 4.291.86 5.854 2.428a8.228 8.228 0 012.425 5.85c-.002 4.56-3.713 8.266-8.282 8.266z"/>
                </svg>
                Chat on WhatsApp
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Mini Cart Modal Overlay */}
      {isMiniCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-sm transition-opacity">
          <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-md bg-white text-black shadow-2xl flex flex-col">
              
              {/* Mini Cart Header */}
              <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
                <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  <span>Shopping Cart</span>
                  <span className="bg-blue-100 text-[#0066CC] text-xs font-semibold py-0.5 px-2.5 rounded-full">{totalCartItems}</span>
                </h2>
                <button 
                  onClick={() => setIsMiniCartOpen(false)}
                  className="text-gray-400 hover:text-gray-600 focus:outline-none"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Mini Cart Content */}
              <div className="flex-1 overflow-y-auto px-6 py-4">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center">
                    <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center text-gray-300 mb-4">
                      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                      </svg>
                    </div>
                    <p className="text-gray-500 font-medium mb-4">Your cart is empty.</p>
                    <Link 
                      href="/shop" 
                      onClick={() => setIsMiniCartOpen(false)}
                      className="bg-[#0066CC] hover:bg-blue-700 text-white font-bold py-2.5 px-6 rounded-full text-sm transition-all"
                    >
                      Shop Premium Crockery
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cart.map((item) => (
                      <div key={item.product.id} className="flex gap-4 py-3 border-b border-gray-100">
                        {/* Mock image container */}
                        <div className="w-16 h-16 bg-gray-100 rounded-lg flex-shrink-0 flex items-center justify-center overflow-hidden border border-gray-200 relative font-bold text-xs text-[#0066CC]">
                          {item.product.category}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-bold text-gray-900 truncate">{item.product.name}</h4>
                          <p className="text-xs text-gray-500 mt-0.5">Qty: {item.quantity}</p>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-sm font-extrabold text-[#0066CC]">Rs. {item.product.price.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Mini Cart Footer */}
              {cart.length > 0 && (
                <div className="px-6 py-6 border-t border-gray-100 bg-gray-50">
                  <div className="flex justify-between text-base font-bold text-gray-900 mb-4">
                    <span>Subtotal</span>
                    <span className="text-lg text-[#0066CC] font-extrabold">Rs. {totalCartPrice.toLocaleString()}</span>
                  </div>
                  <p className="text-xs text-gray-500 mb-4">Shipping and discount code calculated at checkout.</p>
                  <div className="grid grid-cols-2 gap-3">
                    <Link 
                      href="/cart"
                      onClick={() => setIsMiniCartOpen(false)}
                      className="border-2 border-gray-200 text-gray-700 font-bold py-3 rounded-full text-center text-sm hover:bg-gray-100 transition-colors"
                    >
                      View Cart
                    </Link>
                    <Link 
                      href="/checkout"
                      onClick={() => setIsMiniCartOpen(false)}
                      className="bg-[#0066CC] hover:bg-blue-700 text-white font-bold py-3 rounded-full text-center text-sm shadow hover:shadow-lg transition-all"
                    >
                      Checkout
                    </Link>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      )}
    </>
  );
}
