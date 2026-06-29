"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { products } from "@/data/products";
import { useStore } from "@/context/StoreContext";

export default function Home() {
  const { addToCart, toggleWishlist, isInWishlist } = useStore();
  const [timeLeft, setTimeLeft] = useState({ days: 5, hours: 0, minutes: 0, seconds: 0 });

  // Featured Products (First 6 items in list)
  const featuredProducts = products.slice(0, 6);

  // Just Arrived Products (Last 4 items in list)
  const latestProducts = products.slice(-4);

  // Dynamic Countdown Timer
  useEffect(() => {
    // 5 days countdown
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 5);

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate.getTime() - now;

      if (difference <= 0) {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        const d = Math.floor(difference / (1000 * 60 * 60 * 24));
        const h = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((difference % (1000 * 60)) / 1000);
        setTimeLeft({ days: d, hours: h, minutes: m, seconds: s });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col w-full text-black">
      
      {/* 1. HERO SECTION */}
      <section className="relative bg-gradient-to-r from-gray-900 via-gray-800 to-blue-900 text-white min-h-[500px] flex items-center overflow-hidden py-16 px-4 md:px-8">
        <div className="absolute inset-0 opacity-40 z-0">
          <Image 
            src="/images/hero.jpg" 
            alt="Premium Crockery Background" 
            fill 
            priority
            className="object-cover"
          />
        </div>
        <div className="max-w-[1200px] w-full mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 flex flex-col items-start gap-6 animate-slide-up">
            <span className="bg-amber-500 text-gray-950 font-bold text-xs uppercase tracking-widest px-3 py-1 rounded-full shadow-lg">
              ✨ Pakistani Kitchenware Redefined
            </span>
            <h1 className="text-4xl md:text-6xl font-black leading-tight tracking-tight">
              Premium Crockery <br />
              <span className="text-blue-400">Delivered to Your Door</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-lg leading-relaxed">
              Quality Guaranteed | Fast Delivery (24-48 Hours) | Best Wholesale Prices
            </p>
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Link 
                href="/shop" 
                className="bg-[#0066CC] hover:bg-blue-700 text-white font-extrabold text-center py-4 px-8 rounded-full text-base tracking-wider transition-all transform hover:-translate-y-1 shadow-lg hover:shadow-blue-500/20"
              >
                SHOP NOW
              </Link>
              <Link 
                href="/about" 
                className="border-2 border-white/60 hover:border-white hover:bg-white/10 text-white font-extrabold text-center py-4 px-8 rounded-full text-base tracking-wider transition-all"
              >
                OUR STORY
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. TRUST SECTION */}
      <section className="bg-white py-6 border-b border-gray-100 shadow-sm relative z-20">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex items-center gap-3 justify-center text-center md:text-left">
            <span className="text-2xl">✅</span>
            <div>
              <p className="font-extrabold text-sm text-gray-950">100% Original</p>
              <p className="text-xs text-gray-500">Premium Quality</p>
            </div>
          </div>
          <div className="flex items-center gap-3 justify-center text-center md:text-left">
            <span className="text-2xl">📦</span>
            <div>
              <p className="font-extrabold text-sm text-gray-950">Fast Delivery</p>
              <p className="text-xs text-gray-500">24-48 hours delivery</p>
            </div>
          </div>
          <div className="flex items-center gap-3 justify-center text-center md:text-left">
            <span className="text-2xl">💰</span>
            <div>
              <p className="font-extrabold text-sm text-gray-950">7-Day Guarantee</p>
              <p className="text-xs text-gray-500">Easy refund process</p>
            </div>
          </div>
          <div className="flex items-center gap-3 justify-center text-center md:text-left">
            <span className="text-2xl">🤝</span>
            <div>
              <p className="font-extrabold text-sm text-gray-950">Trusted Brand</p>
              <p className="text-xs text-gray-500">1000+ happy customers</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FEATURED PRODUCTS SECTION */}
      <section className="py-16 bg-[#F5F5F5]">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <span className="text-[#0066CC] font-bold text-xs uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full">Top Choices</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-2">Bestselling Products</h2>
            <div className="w-16 h-1.5 bg-amber-500 mx-auto mt-4 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => {
              const wishlistActive = isInWishlist(product.id);
              return (
                <div key={product.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col group relative">
                  
                  {/* Wishlist Button */}
                  <button 
                    onClick={() => toggleWishlist(product)}
                    className="absolute top-4 right-4 z-10 bg-white/80 hover:bg-white text-gray-700 hover:text-red-500 p-2 rounded-full backdrop-blur-sm transition-colors shadow-md"
                  >
                    <svg className="w-5 h-5" fill={wishlistActive ? "#EF4444" : "none"} stroke={wishlistActive ? "#EF4444" : "currentColor"} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </button>

                  {/* Product Visual */}
                  <Link href={`/shop/${product.id}`} className="block relative aspect-square w-full bg-gray-50 flex items-center justify-center overflow-hidden border-b border-gray-100 group-hover:opacity-90">
                    <span className="text-3xl font-extrabold text-blue-200 uppercase tracking-widest">{product.category}</span>
                    {product.originalPrice && (
                      <span className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold py-1 px-3 rounded-full shadow">
                        SALE
                      </span>
                    )}
                  </Link>

                  {/* Details */}
                  <div className="p-6 flex-1 flex flex-col">
                    <span className="text-xs text-gray-500 font-semibold uppercase mb-1 tracking-wider">{product.category}</span>
                    <Link href={`/shop/${product.id}`} className="text-base font-bold text-gray-900 hover:text-[#0066CC] transition-colors truncate block">
                      {product.name}
                    </Link>
                    
                    {/* Stars */}
                    <div className="flex items-center gap-1 mt-2">
                      <div className="flex text-amber-400">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                          </svg>
                        ))}
                      </div>
                      <span className="text-xs text-gray-500 font-medium">({product.reviewsCount})</span>
                    </div>

                    <div className="flex items-baseline gap-2 mt-4">
                      <span className="text-xl font-black text-[#0066CC]">Rs. {product.price.toLocaleString()}</span>
                      {product.originalPrice && (
                        <span className="text-sm text-gray-400 line-through">Rs. {product.originalPrice.toLocaleString()}</span>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="grid grid-cols-2 gap-2 mt-6 pt-4 border-t border-gray-100">
                      <Link 
                        href={`/shop/${product.id}`}
                        className="border-2 border-gray-200 hover:border-[#0066CC] text-gray-700 hover:text-[#0066CC] font-bold py-2.5 rounded-full text-center text-xs transition-colors"
                      >
                        Details
                      </Link>
                      <button 
                        onClick={() => addToCart(product, 1)}
                        className="bg-[#0066CC] hover:bg-blue-700 text-white font-bold py-2.5 rounded-full text-xs transition-all shadow hover:shadow-blue-500/20"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. SPECIAL OFFER BANNER */}
      <section className="py-16 bg-[#0066CC] text-white overflow-hidden relative">
        <div className="absolute inset-0 bg-blue-900 opacity-30 pointer-events-none"></div>
        <div className="max-w-[1200px] mx-auto px-4 md:px-8 relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col items-center md:items-start text-center md:text-left gap-4">
            <span className="bg-amber-400 text-gray-950 font-black py-1 px-4 rounded-full text-sm animate-pulse tracking-wide">
              🎁 LAUNCH OFFER - 10% OFF!
            </span>
            <h3 className="text-3xl md:text-5xl font-black leading-tight">
              Get Free Shipping on 2+ Items
            </h3>
            <p className="text-blue-100 text-base max-w-md">
              Order any two products and enjoy absolutely free delivery across Pakistan. Perfect for gifts!
            </p>
          </div>
          <div className="flex flex-col items-center gap-4 bg-white/10 p-6 rounded-2xl border border-white/20 shadow-2xl backdrop-blur-md min-w-[280px]">
            <p className="text-sm font-semibold tracking-wider uppercase text-yellow-300">Offer Ends In:</p>
            <div className="flex gap-4">
              <div className="flex flex-col items-center">
                <span className="text-3xl font-black">{timeLeft.days}</span>
                <span className="text-[10px] text-blue-200 font-bold uppercase">Days</span>
              </div>
              <span className="text-3xl font-black text-amber-400">:</span>
              <div className="flex flex-col items-center">
                <span className="text-3xl font-black">{timeLeft.hours}</span>
                <span className="text-[10px] text-blue-200 font-bold uppercase">Hours</span>
              </div>
              <span className="text-3xl font-black text-amber-400">:</span>
              <div className="flex flex-col items-center">
                <span className="text-3xl font-black">{timeLeft.minutes}</span>
                <span className="text-[10px] text-blue-200 font-bold uppercase">Min</span>
              </div>
              <span className="text-3xl font-black text-amber-400">:</span>
              <div className="flex flex-col items-center">
                <span className="text-3xl font-black">{timeLeft.seconds}</span>
                <span className="text-[10px] text-blue-200 font-bold uppercase">Sec</span>
              </div>
            </div>
            <Link 
              href="/shop" 
              className="w-full text-center bg-amber-400 hover:bg-amber-500 text-gray-950 font-black py-3 px-6 rounded-full text-sm shadow tracking-wide mt-4"
            >
              SHOP NOW
            </Link>
          </div>
        </div>
      </section>

      {/* 5. WHY CHOOSE US SECTION */}
      <section className="py-16 bg-white">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <span className="text-[#0066CC] font-bold text-xs uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full">Our Standards</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-2">Why Choose CrockeryMart</h2>
            <div className="w-16 h-1.5 bg-amber-500 mx-auto mt-4 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-6 border border-gray-100 rounded-2xl hover:border-blue-200 transition-colors">
              <span className="text-3xl mb-4 block">🔍</span>
              <h4 className="font-extrabold text-lg text-gray-950 mb-2">Tested Quality</h4>
              <p className="text-sm text-gray-500 leading-relaxed">Each crockery item is personally verified and safety checked by our operations team before packaging.</p>
            </div>
            <div className="p-6 border border-gray-100 rounded-2xl hover:border-blue-200 transition-colors">
              <span className="text-3xl mb-4 block">⚡</span>
              <h4 className="font-extrabold text-lg text-gray-950 mb-2">Fast Delivery</h4>
              <p className="text-sm text-gray-500 leading-relaxed">We process orders within hours, delivering to Karachi, Lahore, and Islamabad within 24-48 hours.</p>
            </div>
            <div className="p-6 border border-gray-100 rounded-2xl hover:border-blue-200 transition-colors">
              <span className="text-3xl mb-4 block">🏷️</span>
              <h4 className="font-extrabold text-lg text-gray-950 mb-2">Best Prices</h4>
              <p className="text-sm text-gray-500 leading-relaxed">By sourcing directly from manufacturers, our prices are up to 30% cheaper than local retail outlets.</p>
            </div>
            <div className="p-6 border border-gray-100 rounded-2xl hover:border-blue-200 transition-colors">
              <span className="text-3xl mb-4 block">🔄</span>
              <h4 className="font-extrabold text-lg text-gray-950 mb-2">Easy 7-Day Returns</h4>
              <p className="text-sm text-gray-500 leading-relaxed">Not satisfied? Simply ship it back to us within 7 days for a hassle-free, full money-back guarantee.</p>
            </div>
            <div className="p-6 border border-gray-100 rounded-2xl hover:border-blue-200 transition-colors">
              <span className="text-3xl mb-4 block">💬</span>
              <h4 className="font-extrabold text-lg text-gray-950 mb-2">1-Hour Support response</h4>
              <p className="text-sm text-gray-500 leading-relaxed">Have questions? Reach us via WhatsApp click-to-chat. Our representative responds in under an hour.</p>
            </div>
            <div className="p-6 border border-gray-100 rounded-2xl hover:border-blue-200 transition-colors">
              <span className="text-3xl mb-4 block">🚚</span>
              <h4 className="font-extrabold text-lg text-gray-950 mb-2">Free Shipping</h4>
              <p className="text-sm text-gray-500 leading-relaxed">Get free shipping nationwide when you buy 2 or more products from our premium catalog.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CUSTOMER TESTIMONIALS SECTION */}
      <section className="py-16 bg-[#F5F5F5] border-t border-b border-gray-100">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <span className="text-[#0066CC] font-bold text-xs uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full">Reviews</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-2">What Our Customers Say</h2>
            <div className="w-16 h-1.5 bg-amber-500 mx-auto mt-4 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
              <div>
                <div className="flex text-amber-400 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                    </svg>
                  ))}
                </div>
                <p className="text-gray-600 italic text-sm leading-relaxed mb-6">
                  "Best quality plates! Highly recommended. Ordering dinnerware online is scary because of breakage, but CrockeryMart packed them in bubble wraps securely. Absolutely beautiful design!"
                </p>
              </div>
              <div className="flex items-center justify-between border-t border-gray-50 pt-4">
                <span className="font-extrabold text-sm text-gray-900">Fatima</span>
                <span className="text-xs text-gray-500 font-semibold">Karachi | Verified ✅</span>
              </div>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
              <div>
                <div className="flex text-amber-400 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                    </svg>
                  ))}
                </div>
                <p className="text-gray-600 italic text-sm leading-relaxed mb-6">
                  "The Emerald Gold Tea Cups are gorgeous. They make my high teas with friends look extremely luxury. The gold coating hasn't faded at all. Excellent service!"
                </p>
              </div>
              <div className="flex items-center justify-between border-t border-gray-50 pt-4">
                <span className="font-extrabold text-sm text-gray-900">Zainab</span>
                <span className="text-xs text-gray-500 font-semibold">Lahore | Verified ✅</span>
              </div>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
              <div>
                <div className="flex text-amber-400 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                    </svg>
                  ))}
                </div>
                <p className="text-gray-600 italic text-sm leading-relaxed mb-6">
                  "Ordered ramen bowls set. They are heavy stoneware and the wooden chopsticks/spoons are premium. Fast delivery to Islamabad. Outstanding client-first approach!"
                </p>
              </div>
              <div className="flex items-center justify-between border-t border-gray-50 pt-4">
                <span className="font-extrabold text-sm text-gray-900">Usman</span>
                <span className="text-xs text-gray-500 font-semibold">Islamabad | Verified ✅</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. LATEST PRODUCTS SECTION */}
      <section className="py-16 bg-white">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-12 gap-4">
            <div className="text-center sm:text-left">
              <span className="text-[#0066CC] font-bold text-xs uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full">Just Arrived</span>
              <h2 className="text-3xl font-extrabold text-gray-900 mt-2">Newest Collections</h2>
            </div>
            <Link 
              href="/shop" 
              className="text-[#0066CC] font-bold text-sm hover:underline flex items-center gap-1 group"
            >
              View All Products 
              <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {latestProducts.map((product) => {
              const wishlistActive = isInWishlist(product.id);
              return (
                <div key={product.id} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all border border-gray-100 flex flex-col group relative">
                  
                  {/* Wishlist Button */}
                  <button 
                    onClick={() => toggleWishlist(product)}
                    className="absolute top-3 right-3 z-10 bg-white/80 hover:bg-white text-gray-700 hover:text-red-500 p-1.5 rounded-full backdrop-blur-sm transition-colors shadow-md"
                  >
                    <svg className="w-4 h-4" fill={wishlistActive ? "#EF4444" : "none"} stroke={wishlistActive ? "#EF4444" : "currentColor"} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </button>

                  <Link href={`/shop/${product.id}`} className="block relative aspect-square bg-gray-50 flex items-center justify-center overflow-hidden border-b border-gray-100 group-hover:opacity-90">
                    <span className="text-xl font-extrabold text-blue-200 uppercase tracking-widest">{product.category}</span>
                  </Link>

                  <div className="p-4 flex-1 flex flex-col">
                    <Link href={`/shop/${product.id}`} className="text-sm font-bold text-gray-900 hover:text-[#0066CC] transition-colors truncate block">
                      {product.name}
                    </Link>
                    <div className="flex items-center justify-between mt-3">
                      <span className="text-base font-extrabold text-[#0066CC]">Rs. {product.price.toLocaleString()}</span>
                      <button 
                        onClick={() => addToCart(product, 1)}
                        className="bg-[#0066CC] hover:bg-blue-700 text-white font-extrabold py-1 px-3 rounded-full text-xs transition-colors"
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 8. NEWSLETTER SIGNUP */}
      <section className="py-16 bg-gradient-to-r from-blue-900 to-gray-900 text-white border-t-4 border-amber-500">
        <div className="max-w-[600px] mx-auto px-4 text-center flex flex-col gap-6">
          <h3 className="text-3xl font-black">Get Exclusive Offers!</h3>
          <p className="text-blue-100 text-sm leading-relaxed">
            Subscribe to our weekly newsletter to receive custom discount codes, sales alerts, and home decor tips. Get a <strong>10% discount</strong> voucher code instantly upon subscribing!
          </p>
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              alert("📧 Thank you for subscribing! Check your email for your 10% discount code.");
            }}
            className="flex flex-col sm:flex-row gap-3 mt-2"
          >
            <input 
              type="email" 
              placeholder="Enter your email address" 
              required
              className="flex-1 px-5 py-3.5 rounded-full text-black focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm"
            />
            <button 
              type="submit" 
              className="bg-amber-400 hover:bg-amber-500 text-gray-950 font-black py-3.5 px-8 rounded-full text-sm shadow hover:shadow-lg transition-all"
            >
              SUBSCRIBE
            </button>
          </form>
        </div>
      </section>

    </div>
  );
}
