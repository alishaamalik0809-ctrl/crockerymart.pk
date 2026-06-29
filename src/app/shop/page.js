"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { products } from "@/data/products";
import { useStore } from "@/context/StoreContext";

function ShopContent() {
  const searchParams = useSearchParams();
  const { addToCart, toggleWishlist, isInWishlist } = useStore();

  const [categoryFilter, setCategoryFilter] = useState("All");
  const [priceFilter, setPriceFilter] = useState("All");
  const [sortOption, setSortOption] = useState("latest");
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [searchQuery, setSearchQuery] = useState("");
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Sync state with query parameters
  useEffect(() => {
    const category = searchParams.get("category");
    const search = searchParams.get("search");
    const filterType = searchParams.get("filter");

    if (category) setCategoryFilter(category);
    if (search) setSearchQuery(search);
    if (filterType === "wishlist") {
      setCategoryFilter("Wishlist");
    } else if (!category) {
      setCategoryFilter("All");
    }
  }, [searchParams]);

  // Apply filters and sorting
  useEffect(() => {
    let result = [...products];

    // 1. Category Filter
    if (categoryFilter === "Wishlist") {
      // Filter by items inside local wishlist context
      const savedWishlist = JSON.parse(localStorage.getItem("crockery_wishlist") || "[]");
      result = result.filter(p => savedWishlist.some(w => w.id === p.id));
    } else if (categoryFilter !== "All") {
      result = result.filter((p) => p.category.toLowerCase() === categoryFilter.toLowerCase());
    }

    // 2. Search Query Filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query) ||
          p.shortDescription.toLowerCase().includes(query)
      );
    }

    // 3. Price Filter
    if (priceFilter !== "All") {
      if (priceFilter === "under-3k") {
        result = result.filter((p) => p.price < 3000);
      } else if (priceFilter === "3k-5k") {
        result = result.filter((p) => p.price >= 3000 && p.price <= 5000);
      } else if (priceFilter === "5k-10k") {
        result = result.filter((p) => p.price >= 5000 && p.price <= 10000);
      } else if (priceFilter === "above-10k") {
        result = result.filter((p) => p.price > 10000);
      }
    }

    // 4. Sorting
    if (sortOption === "price-asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOption === "price-desc") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortOption === "bestseller") {
      result.sort((a, b) => b.reviewsCount - a.reviewsCount);
    } else if (sortOption === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    }

    setFilteredProducts(result);
  }, [categoryFilter, searchQuery, priceFilter, sortOption]);

  const categories = ["All", "Plates", "Bowls", "Cups", "Sets"];

  return (
    <div className="max-w-[1200px] w-full mx-auto px-4 md:px-8 py-10 text-black">
      
      {/* Page Header */}
      <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-gray-200 pb-6">
        <div>
          <h1 className="text-3xl font-black text-gray-900">
            {categoryFilter === "Wishlist" ? "My Wishlist" : "Shop Collection"}
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            {searchQuery ? `Search results for "${searchQuery}"` : "Discover premium dining sets, ceramic bowls, and artistic glassware."}
          </p>
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          {/* Sorting Dropdown */}
          <label className="text-xs font-bold text-gray-500 uppercase tracking-wider hidden sm:inline">Sort By:</label>
          <select 
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="flex-1 md:flex-none border border-gray-200 px-4 py-2 rounded-full text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#0066CC]"
          >
            <option value="latest">Latest Arrivals</option>
            <option value="bestseller">Best Sellers</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>
          
          {/* Mobile Filter Toggle */}
          <button 
            onClick={() => setShowMobileFilters(true)}
            className="md:hidden border border-gray-200 bg-white px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 hover:bg-gray-50"
          >
            Filters
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* LEFT COLUMN: FILTERS (DESKTOP) */}
        <aside className="hidden md:flex flex-col gap-8">
          {/* Categories */}
          <div>
            <h3 className="text-sm font-black uppercase tracking-wider text-gray-900 mb-4 border-b pb-2">Categories</h3>
            <ul className="space-y-2">
              {categories.map((cat) => (
                <li key={cat}>
                  <button 
                    onClick={() => {
                      setCategoryFilter(cat);
                      if (cat === "All") {
                        router.push("/shop");
                      }
                    }}
                    className={`w-full text-left text-sm py-1.5 px-3 rounded-lg font-medium transition-colors ${categoryFilter === cat ? "bg-[#0066CC] text-white" : "text-gray-600 hover:bg-gray-100"}`}
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Price Range Filter */}
          <div>
            <h3 className="text-sm font-black uppercase tracking-wider text-gray-900 mb-4 border-b pb-2">Price Range</h3>
            <div className="space-y-2 text-sm text-gray-600">
              {[
                { label: "All Prices", value: "All" },
                { label: "Under Rs. 3,000", value: "under-3k" },
                { label: "Rs. 3,000 - Rs. 5,000", value: "3k-5k" },
                { label: "Rs. 5,000 - Rs. 10,000", value: "5k-10k" },
                { label: "Above Rs. 10,000", value: "above-10k" }
              ].map((range) => (
                <label key={range.value} className="flex items-center gap-2.5 cursor-pointer hover:text-gray-950">
                  <input 
                    type="radio" 
                    name="priceRange" 
                    value={range.value}
                    checked={priceFilter === range.value}
                    onChange={(e) => setPriceFilter(e.target.value)}
                    className="text-[#0066CC] focus:ring-[#0066CC] border-gray-300 w-4 h-4"
                  />
                  <span>{range.label}</span>
                </label>
              ))}
            </div>
          </div>
          
          {/* Trust Panel */}
          <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100 flex flex-col gap-4">
            <h4 className="text-sm font-bold text-gray-900 flex items-center gap-1.5">
              <span>🛡️ Safe Delivery Guarantee</span>
            </h4>
            <p className="text-xs text-gray-600 leading-relaxed">
              We package dinner sets in high-grade multi-layer bubble wrap. In case of transit breakage, we offer <strong>free replacement</strong> within 24 hours.
            </p>
          </div>
        </aside>

        {/* RIGHT COLUMN: PRODUCT GRID */}
        <main className="md:col-span-3">
          {filteredProducts.length === 0 ? (
            <div className="bg-white rounded-2xl py-20 px-4 text-center border border-gray-100 shadow-sm">
              <span className="text-5xl block mb-4">🔍</span>
              <h3 className="text-xl font-bold text-gray-900 mb-2">No Products Found</h3>
              <p className="text-gray-500 text-sm max-w-sm mx-auto mb-6">
                We couldn't find any products matching your filters. Try clearing some selections or searching something else.
              </p>
              <button 
                onClick={() => {
                  setCategoryFilter("All");
                  setPriceFilter("All");
                  setSearchQuery("");
                }}
                className="bg-[#0066CC] text-white py-2.5 px-6 rounded-full font-bold text-sm shadow hover:bg-blue-700 transition-colors"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => {
                const wishlistActive = isInWishlist(product.id);
                return (
                  <div key={product.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all border border-gray-100 flex flex-col group relative">
                    
                    {/* Wishlist Icon */}
                    <button 
                      onClick={() => toggleWishlist(product)}
                      className="absolute top-4 right-4 z-10 bg-white/80 hover:bg-white text-gray-700 hover:text-red-500 p-2 rounded-full backdrop-blur-sm transition-colors shadow"
                    >
                      <svg className="w-4 h-4" fill={wishlistActive ? "#EF4444" : "none"} stroke={wishlistActive ? "#EF4444" : "currentColor"} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </button>

                    {/* Image Block */}
                    <Link href={`/shop/${product.id}`} className="block relative aspect-square bg-gray-50 flex items-center justify-center overflow-hidden border-b border-gray-100 group-hover:opacity-90">
                      <span className="text-xl font-extrabold text-blue-200 uppercase tracking-widest">{product.category}</span>
                      {product.originalPrice && (
                        <span className="absolute top-4 left-4 bg-red-500 text-white text-[10px] font-black py-0.5 px-2.5 rounded-full shadow">
                          SALE
                        </span>
                      )}
                    </Link>

                    {/* Details */}
                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div>
                        <span className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider mb-1 block">{product.category}</span>
                        <Link href={`/shop/${product.id}`} className="text-sm font-bold text-gray-900 hover:text-[#0066CC] transition-colors truncate block">
                          {product.name}
                        </Link>
                        
                        {/* Rating */}
                        <div className="flex items-center gap-1 mt-1.5">
                          <div className="flex text-amber-400">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <svg key={i} className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                              </svg>
                            ))}
                          </div>
                          <span className="text-[10px] text-gray-500 font-medium">({product.reviewsCount})</span>
                        </div>
                      </div>

                      <div>
                        <div className="flex items-baseline gap-2 mt-4">
                          <span className="text-base font-extrabold text-[#0066CC]">Rs. {product.price.toLocaleString()}</span>
                          {product.originalPrice && (
                            <span className="text-xs text-gray-400 line-through">Rs. {product.originalPrice.toLocaleString()}</span>
                          )}
                        </div>

                        {/* Action buttons */}
                        <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-gray-50">
                          <Link 
                            href={`/shop/${product.id}`}
                            className="border-2 border-gray-200 hover:border-[#0066CC] text-gray-700 hover:text-[#0066CC] font-bold py-2 rounded-full text-center text-[10px] transition-colors"
                          >
                            Details
                          </Link>
                          <button 
                            onClick={() => addToCart(product, 1)}
                            className="bg-[#0066CC] hover:bg-blue-700 text-white font-bold py-2 rounded-full text-[10px] shadow"
                          >
                            Add to Cart
                          </button>
                        </div>
                      </div>

                    </div>

                  </div>
                );
              })}
            </div>
          )}
        </main>
      </div>

      {/* MOBILE FILTERS SIDEBAR OVERLAY */}
      {showMobileFilters && (
        <div className="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-sm">
          <div className="absolute inset-y-0 left-0 max-w-full flex">
            <div className="w-screen max-w-xs bg-white shadow-2xl flex flex-col p-6 text-black">
              
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-black text-gray-900">Filters</h2>
                <button 
                  onClick={() => setShowMobileFilters(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Categories */}
              <div className="mb-6">
                <h3 className="text-xs font-black uppercase tracking-wider text-gray-900 mb-3">Categories</h3>
                <div className="flex flex-wrap gap-2">
                  {categories.map((cat) => (
                    <button 
                      key={cat}
                      onClick={() => {
                        setCategoryFilter(cat);
                        setShowMobileFilters(false);
                      }}
                      className={`text-xs py-1.5 px-3 rounded-full font-bold transition-all ${categoryFilter === cat ? "bg-[#0066CC] text-white" : "bg-gray-100 text-gray-700"}`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Ranges */}
              <div className="mb-6">
                <h3 className="text-xs font-black uppercase tracking-wider text-gray-900 mb-3">Price Range</h3>
                <div className="space-y-3 text-sm text-gray-600">
                  {[
                    { label: "All Prices", value: "All" },
                    { label: "Under Rs. 3,000", value: "under-3k" },
                    { label: "Rs. 3,000 - Rs. 5,000", value: "3k-5k" },
                    { label: "Rs. 5,000 - Rs. 10,000", value: "5k-10k" },
                    { label: "Above Rs. 10,000", value: "above-10k" }
                  ].map((range) => (
                    <label key={range.value} className="flex items-center gap-2 cursor-pointer">
                      <input 
                        type="radio" 
                        name="mobilePriceRange" 
                        value={range.value}
                        checked={priceFilter === range.value}
                        onChange={(e) => {
                          setPriceFilter(e.target.value);
                          setShowMobileFilters(false);
                        }}
                        className="text-[#0066CC]"
                      />
                      <span>{range.label}</span>
                    </label>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default function Shop() {
  return (
    <Suspense fallback={<div className="text-center py-20 text-black">Loading shop...</div>}>
      <ShopContent />
    </Suspense>
  );
}
