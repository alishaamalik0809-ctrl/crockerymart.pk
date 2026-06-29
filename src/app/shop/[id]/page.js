"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { products } from "@/data/products";
import { useStore } from "@/context/StoreContext";

export default function ProductDetail() {
  const { id } = useParams();
  const router = useRouter();
  const { addToCart, toggleWishlist, isInWishlist } = useStore();

  const [product, setProduct] = useState(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  
  // Review form states
  const [reviewName, setReviewName] = useState("");
  const [reviewLocation, setReviewLocation] = useState("");
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewTitle, setReviewTitle] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [localReviews, setLocalReviews] = useState([]);
  const [showReviewForm, setShowReviewForm] = useState(false);

  useEffect(() => {
    if (id) {
      const foundProduct = products.find((p) => p.id === id);
      if (foundProduct) {
        setProduct(foundProduct);
        setLocalReviews(foundProduct.reviews || []);
        setActiveImageIndex(0);
      }
    }
  }, [id]);

  if (!product) {
    return (
      <div className="max-w-[1200px] mx-auto px-4 py-20 text-center text-black">
        <h2 className="text-2xl font-bold">Product Not Found</h2>
        <p className="text-gray-500 mt-2">The product you are looking for does not exist.</p>
        <Link href="/shop" className="inline-block bg-[#0066CC] text-white font-bold py-2.5 px-6 rounded-full mt-4">
          Return to Shop
        </Link>
      </div>
    );
  }

  const discountPercent = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleQtyChange = (val) => {
    if (val < 1) return;
    setQuantity(val);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    router.push("/checkout");
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!reviewName || !reviewText) {
      alert("Please fill out your Name and Review text.");
      return;
    }

    const newReview = {
      name: reviewName,
      location: reviewLocation || "Pakistan",
      rating: reviewRating,
      title: reviewTitle || "Excellent Product",
      text: reviewText,
      verified: true,
      date: new Date().toISOString().split("T")[0]
    };

    setLocalReviews([newReview, ...localReviews]);
    setReviewName("");
    setReviewLocation("");
    setReviewRating(5);
    setReviewTitle("");
    setReviewText("");
    setShowReviewForm(false);
    alert("🌟 Thank you! Your review has been added successfully.");
  };

  // Filter out the current product from related products
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const wishlistActive = isInWishlist(product.id);

  // Compute average rating with local reviews
  const totalReviewsCount = localReviews.length;
  const averageRating = totalReviewsCount > 0
    ? (localReviews.reduce((sum, r) => sum + r.rating, 0) / totalReviewsCount).toFixed(1)
    : product.rating;

  return (
    <div className="max-w-[1200px] w-full mx-auto px-4 md:px-8 py-10 text-black">
      
      {/* Breadcrumbs */}
      <nav className="text-xs text-gray-500 mb-8 flex items-center gap-2">
        <Link href="/" className="hover:underline hover:text-[#0066CC]">Home</Link>
        <span>/</span>
        <Link href="/shop" className="hover:underline hover:text-[#0066CC]">Shop</Link>
        <span>/</span>
        <Link href={`/shop?category=${product.category}`} className="hover:underline hover:text-[#0066CC]">{product.category}</Link>
        <span>/</span>
        <span className="text-gray-900 truncate font-semibold">{product.name}</span>
      </nav>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* LEFT COLUMN: IMAGES */}
        <div className="lg:col-span-6 flex flex-col gap-4">
          {/* Large display */}
          <div className="relative aspect-square w-full bg-gray-50 rounded-2xl border border-gray-200 overflow-hidden flex items-center justify-center group">
            <span className="text-5xl font-black text-blue-200 uppercase tracking-widest">{product.category}</span>
            {product.originalPrice && (
              <span className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold py-1 px-3 rounded-full shadow">
                -{discountPercent}% OFF
              </span>
            )}
          </div>
          
          {/* Thumbnails */}
          <div className="grid grid-cols-4 gap-3">
            {product.images.map((img, index) => (
              <button
                key={index}
                onClick={() => setActiveImageIndex(index)}
                className={`aspect-square rounded-xl bg-gray-50 border-2 overflow-hidden flex items-center justify-center text-xs font-bold text-gray-400 hover:border-[#0066CC] transition-all ${activeImageIndex === index ? "border-[#0066CC]" : "border-gray-200"}`}
              >
                {product.category} {index + 1}
              </button>
            ))}
          </div>

          {/* Guarantee Badges */}
          <div className="grid grid-cols-3 gap-3 bg-white p-4 rounded-xl border border-gray-100 mt-4 text-center">
            <div>
              <span className="text-lg">🛡️</span>
              <p className="text-[10px] font-black text-gray-800 uppercase tracking-wider mt-1">100% Original</p>
            </div>
            <div className="border-x border-gray-100">
              <span className="text-lg">🚚</span>
              <p className="text-[10px] font-black text-gray-800 uppercase tracking-wider mt-1">Safe Delivery</p>
            </div>
            <div>
              <span className="text-lg">🔄</span>
              <p className="text-[10px] font-black text-gray-800 uppercase tracking-wider mt-1">7-Day Return</p>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: DETAILS */}
        <div className="lg:col-span-6 flex flex-col gap-6">
          <div>
            <span className="bg-blue-50 text-[#0066CC] text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full tracking-wider inline-block mb-3">
              {product.category}
            </span>
            <h1 className="text-2xl md:text-3xl font-black text-gray-950 leading-tight">
              {product.name}
            </h1>
            <p className="text-xs text-gray-400 mt-1 font-semibold">SKU: <span className="text-gray-700">{product.sku}</span> | Status: <span className={product.stock > 5 ? "text-green-600 font-bold" : "text-amber-600 font-bold"}>{product.stock > 5 ? "In Stock" : `Only ${product.stock} left`}</span></p>
          </div>

          {/* Stars & Reviews summary */}
          <div className="flex items-center gap-3">
            <div className="flex text-amber-400">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                </svg>
              ))}
            </div>
            <span className="text-sm font-bold text-gray-900">{averageRating}/5.0</span>
            <span className="text-gray-300">|</span>
            <a href="#reviews-section" className="text-sm text-[#0066CC] font-bold hover:underline">
              {totalReviewsCount} Customer Reviews
            </a>
          </div>

          {/* Pricing */}
          <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 flex items-center justify-between">
            <div>
              <span className="text-xs text-gray-500 font-bold uppercase tracking-wider block">Price</span>
              <div className="flex items-baseline gap-3 mt-1">
                <span className="text-3xl font-black text-[#0066CC]">Rs. {product.price.toLocaleString()}</span>
                {product.originalPrice && (
                  <span className="text-base text-gray-400 line-through font-semibold">Rs. {product.originalPrice.toLocaleString()}</span>
                )}
              </div>
            </div>
            {product.originalPrice && (
              <span className="bg-amber-400 text-gray-900 font-black px-4 py-2 rounded-xl text-sm shadow">
                Save Rs. {(product.originalPrice - product.price).toLocaleString()}
              </span>
            )}
          </div>

          <p className="text-gray-600 text-sm leading-relaxed">
            {product.shortDescription}
          </p>

          {/* What's included */}
          <div>
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-2">🍱 What's Included:</h3>
            <ul className="grid grid-cols-2 gap-2 text-xs text-gray-600">
              {product.whatsIncluded.map((item, idx) => (
                <li key={idx} className="flex items-center gap-1.5 font-medium">
                  <span className="text-blue-500">✔</span> {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Purchase Actions */}
          <div className="flex flex-col gap-4 mt-2">
            <div className="flex gap-4 items-center">
              {/* Qty selector */}
              <div className="flex items-center border border-gray-300 rounded-full overflow-hidden bg-white">
                <button 
                  onClick={() => handleQtyChange(quantity - 1)}
                  className="px-4 py-3 hover:bg-gray-100 font-black text-gray-600 transition-colors"
                >
                  -
                </button>
                <span className="w-12 text-center text-sm font-bold text-gray-950">{quantity}</span>
                <button 
                  onClick={() => handleQtyChange(quantity + 1)}
                  className="px-4 py-3 hover:bg-gray-100 font-black text-gray-600 transition-colors"
                >
                  +
                </button>
              </div>

              {/* Add to Wishlist */}
              <button 
                onClick={() => toggleWishlist(product)}
                className={`p-3.5 border rounded-full transition-all flex-shrink-0 ${wishlistActive ? "bg-red-50 border-red-200 text-red-500" : "bg-white border-gray-300 text-gray-500 hover:text-red-500"}`}
                title={wishlistActive ? "Remove from Wishlist" : "Add to Wishlist"}
              >
                <svg className="w-6 h-6" fill={wishlistActive ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button 
                onClick={() => addToCart(product, quantity)}
                className="bg-[#0066CC] hover:bg-blue-700 text-white font-extrabold py-4 px-6 rounded-full text-sm shadow hover:shadow-lg transition-all tracking-wider uppercase"
              >
                Add to Cart
              </button>
              <button 
                onClick={handleBuyNow}
                className="bg-amber-400 hover:bg-amber-500 text-gray-950 font-extrabold py-4 px-6 rounded-full text-sm shadow hover:shadow-lg transition-all tracking-wider uppercase"
              >
                Buy It Now (Fast Checkout)
              </button>
            </div>
          </div>

          {/* Delivery terms */}
          <div className="text-xs text-gray-500 bg-gray-50 border border-gray-100 rounded-xl p-4 flex flex-col gap-2">
            <p><strong>🚛 Delivery Info:</strong> Free shipping on ordering 2 or more products. Delivery takes 24-48 hours inside Karachi, Lahore & Islamabad, and 2-4 days for other cities.</p>
            <p><strong>💳 Payment Options:</strong> Cash on Delivery (COD), Direct Bank Transfer, or JazzCash / EasyPaisa.</p>
          </div>

        </div>

      </div>

      {/* Specifications Table */}
      <section className="mt-16 border-t border-gray-200 pt-12">
        <h2 className="text-xl font-black text-gray-900 mb-6 uppercase tracking-wider">Specifications & Features</h2>
        <div className="overflow-hidden border border-gray-200 rounded-2xl">
          <table className="min-w-full divide-y divide-gray-200 text-sm text-left">
            <tbody className="divide-y divide-gray-100 bg-white">
              {Object.entries(product.specs).map(([key, value]) => (
                <tr key={key} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-bold text-gray-700 w-1/3 bg-gray-50">{key}</td>
                  <td className="px-6 py-4 text-gray-600 font-medium">{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Customer Reviews Section */}
      <section id="reviews-section" className="mt-16 border-t border-gray-200 pt-12">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h2 className="text-xl font-black text-gray-900 uppercase tracking-wider">Customer Reviews</h2>
            <p className="text-xs text-gray-500 mt-1">Read reviews from real verified buyers of this product.</p>
          </div>
          <button 
            onClick={() => setShowReviewForm(!showReviewForm)}
            className="border-2 border-[#0066CC] hover:bg-blue-50 text-[#0066CC] font-bold py-2.5 px-6 rounded-full text-sm transition-all"
          >
            {showReviewForm ? "Cancel Review" : "Write a Review"}
          </button>
        </div>

        {/* Review Form */}
        {showReviewForm && (
          <form onSubmit={handleReviewSubmit} className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm max-w-xl mb-8 flex flex-col gap-4 animate-fade-in">
            <h3 className="font-extrabold text-base text-gray-900">Share Your Experience</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-gray-500 uppercase">Your Name</label>
                <input 
                  type="text" 
                  value={reviewName}
                  onChange={(e) => setReviewName(e.target.value)}
                  placeholder="e.g. Fatima" 
                  required
                  className="border border-gray-200 px-3.5 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0066CC]"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-gray-500 uppercase">City</label>
                <input 
                  type="text" 
                  value={reviewLocation}
                  onChange={(e) => setReviewLocation(e.target.value)}
                  placeholder="e.g. Karachi"
                  className="border border-gray-200 px-3.5 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0066CC]"
                />
              </div>
            </div>
            
            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-gray-500 uppercase">Rating</label>
              <select 
                value={reviewRating}
                onChange={(e) => setReviewRating(Number(e.target.value))}
                className="border border-gray-200 px-3.5 py-2 rounded-lg text-sm bg-white"
              >
                <option value={5}>⭐⭐⭐⭐⭐ (5/5)</option>
                <option value={4}>⭐⭐⭐⭐ (4/5)</option>
                <option value={3}>⭐⭐⭐ (3/5)</option>
                <option value={2}>⭐⭐ (2/5)</option>
                <option value={1}>⭐ (1/5)</option>
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-gray-500 uppercase">Review Title</label>
              <input 
                type="text" 
                value={reviewTitle}
                onChange={(e) => setReviewTitle(e.target.value)}
                placeholder="e.g. Beautiful and elegant!" 
                className="border border-gray-200 px-3.5 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0066CC]"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-gray-500 uppercase">Review Details</label>
              <textarea 
                rows="4"
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                placeholder="How is the quality? Was packing safe?" 
                required
                className="border border-gray-200 px-3.5 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0066CC]"
              ></textarea>
            </div>

            <button 
              type="submit" 
              className="bg-[#0066CC] hover:bg-blue-700 text-white font-extrabold py-3 rounded-lg text-sm shadow mt-2"
            >
              Submit Review
            </button>
          </form>
        )}

        {/* Reviews List */}
        {localReviews.length === 0 ? (
          <p className="text-sm text-gray-500 italic bg-gray-50 p-6 rounded-xl border border-gray-100 text-center">
            No reviews yet for this product. Be the first to write a review!
          </p>
        ) : (
          <div className="space-y-6">
            {localReviews.map((review, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col gap-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-extrabold text-sm text-gray-900">{review.title}</h4>
                    <div className="flex text-amber-400 gap-0.5 mt-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <svg key={i} className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                        </svg>
                      ))}
                    </div>
                  </div>
                  <span className="text-[10px] text-gray-400 font-semibold">{review.date}</span>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed font-medium">"{review.text}"</p>
                <div className="flex items-center gap-2 pt-2 border-t border-gray-50 text-[10px] text-gray-400 font-semibold">
                  <span className="text-gray-900 font-extrabold">{review.name}</span>
                  <span>({review.location})</span>
                  <span>•</span>
                  <span className="text-green-600 font-bold">Verified Buyer ✅</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Related Products Grid */}
      {relatedProducts.length > 0 && (
        <section className="mt-16 border-t border-gray-200 pt-12">
          <h2 className="text-xl font-black text-gray-900 mb-8 uppercase tracking-wider">You Might Also Like</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {relatedProducts.map((p) => {
              const wishlistActive = isInWishlist(p.id);
              return (
                <div key={p.id} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all border border-gray-100 flex flex-col group relative">
                  
                  <button 
                    onClick={() => toggleWishlist(p)}
                    className="absolute top-3 right-3 z-10 bg-white/80 hover:bg-white text-gray-700 hover:text-red-500 p-1.5 rounded-full backdrop-blur-sm transition-colors shadow"
                  >
                    <svg className="w-4 h-4" fill={wishlistActive ? "#EF4444" : "none"} stroke={wishlistActive ? "#EF4444" : "currentColor"} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </button>

                  <Link href={`/shop/${p.id}`} className="block relative aspect-square bg-gray-50 flex items-center justify-center overflow-hidden border-b border-gray-100 group-hover:opacity-90">
                    <span className="text-xl font-extrabold text-blue-200 uppercase tracking-widest">{p.category}</span>
                  </Link>

                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <Link href={`/shop/${p.id}`} className="text-xs font-bold text-gray-900 hover:text-[#0066CC] transition-colors truncate block">
                      {p.name}
                    </Link>
                    <div className="flex items-center justify-between mt-3">
                      <span className="text-sm font-extrabold text-[#0066CC]">Rs. {p.price.toLocaleString()}</span>
                      <button 
                        onClick={() => addToCart(p, 1)}
                        className="bg-[#0066CC] hover:bg-blue-700 text-white font-extrabold py-1 px-3 rounded-full text-[10px]"
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

    </div>
  );
}
