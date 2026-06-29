"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useStore } from "@/context/StoreContext";
import { products } from "@/data/products";

export default function CartPage() {
  const { cart, removeFromCart, updateCartQty, clearCart } = useStore();
  const [couponCode, setCouponCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [couponApplied, setCouponApplied] = useState(false);

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  
  // Rule: Free shipping on 2+ items or orders over Rs. 10,000, otherwise flat Rs. 250 shipping
  const shippingCost = cartCount >= 2 || cartSubtotal >= 10000 || cartCount === 0 ? 0 : 250;
  
  const discountAmount = Math.round((cartSubtotal * discountPercent) / 100);
  const cartTotal = cartSubtotal - discountAmount + shippingCost;

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (couponCode.toUpperCase() === "LAUNCH10") {
      setDiscountPercent(10);
      setCouponApplied(true);
      alert("🎟️ Promo code 'LAUNCH10' applied! 10% Discount subtracted.");
    } else {
      alert("❌ Invalid promo code. Try 'LAUNCH10'.");
    }
  };

  // Recommendations: Get first 4 products that are NOT currently in the cart
  const recommendations = products
    .filter((p) => !cart.some((item) => item.product.id === p.id))
    .slice(0, 4);

  return (
    <div className="max-w-[1200px] w-full mx-auto px-4 md:px-8 py-10 text-black">
      <h1 className="text-3xl font-black text-gray-900 mb-8">Shopping Cart</h1>

      {cart.length === 0 ? (
        <div className="bg-white rounded-2xl py-20 px-6 text-center border border-gray-100 shadow-sm max-w-lg mx-auto">
          <span className="text-6xl block mb-6">🛒</span>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Your Cart is Empty</h2>
          <p className="text-gray-500 text-sm mb-8 leading-relaxed">
            Looks like you haven't added any premium crockery items to your cart yet. Discover our collection to elevate your kitchen.
          </p>
          <Link 
            href="/shop"
            className="bg-[#0066CC] hover:bg-blue-700 text-white font-extrabold py-3.5 px-8 rounded-full text-sm shadow hover:shadow-lg transition-all"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Cart items list */}
          <div className="lg:col-span-8 flex flex-col gap-4">
            
            {/* Header row (Desktop) */}
            <div className="hidden sm:grid grid-cols-12 gap-4 text-xs font-bold text-gray-500 uppercase tracking-wider px-6 pb-2 border-b border-gray-200">
              <span className="col-span-6">Product</span>
              <span className="col-span-2 text-center">Price</span>
              <span className="col-span-2 text-center">Quantity</span>
              <span className="col-span-2 text-right">Total</span>
            </div>

            {/* Items */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm divide-y divide-gray-100 overflow-hidden">
              {cart.map((item) => (
                <div key={item.product.id} className="p-6 grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                  
                  {/* Info */}
                  <div className="col-span-6 flex gap-4 items-center min-w-0">
                    {/* Image Mock */}
                    <div className="w-20 h-20 bg-gray-50 rounded-xl flex-shrink-0 flex items-center justify-center border border-gray-200 text-xs font-black text-blue-200 uppercase tracking-widest">
                      {item.product.category}
                    </div>
                    <div className="min-w-0">
                      <Link href={`/shop/${item.product.id}`} className="text-sm font-bold text-gray-900 hover:text-[#0066CC] hover:underline transition-colors block truncate">
                        {item.product.name}
                      </Link>
                      <span className="text-[10px] text-gray-400 font-semibold block mt-0.5">SKU: {item.product.sku}</span>
                      <button 
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-xs font-bold text-red-500 hover:text-red-700 transition-colors mt-2 flex items-center gap-1.5 focus:outline-none"
                      >
                        🗑️ Remove
                      </button>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="col-span-2 text-center flex sm:block justify-between items-center">
                    <span className="text-xs font-bold text-gray-500 sm:hidden">Price:</span>
                    <span className="text-sm font-semibold text-gray-700">Rs. {item.product.price.toLocaleString()}</span>
                  </div>

                  {/* Qty */}
                  <div className="col-span-2 flex sm:justify-center items-center justify-between">
                    <span className="text-xs font-bold text-gray-500 sm:hidden">Qty:</span>
                    <div className="flex items-center border border-gray-300 rounded-full bg-white overflow-hidden">
                      <button 
                        onClick={() => updateCartQty(item.product.id, item.quantity - 1)}
                        className="px-2.5 py-1.5 font-bold hover:bg-gray-150 text-gray-600 transition-colors focus:outline-none"
                      >
                        -
                      </button>
                      <span className="w-8 text-center text-xs font-bold text-gray-800">{item.quantity}</span>
                      <button 
                        onClick={() => updateCartQty(item.product.id, item.quantity + 1)}
                        className="px-2.5 py-1.5 font-bold hover:bg-gray-150 text-gray-600 transition-colors focus:outline-none"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Total */}
                  <div className="col-span-2 text-right flex sm:block justify-between items-center">
                    <span className="text-xs font-bold text-gray-500 sm:hidden">Total:</span>
                    <span className="text-sm font-extrabold text-[#0066CC]">Rs. {(item.product.price * item.quantity).toLocaleString()}</span>
                  </div>

                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-2">
              <Link 
                href="/shop"
                className="text-[#0066CC] font-bold text-sm hover:underline flex items-center gap-1.5"
              >
                ← Continue Shopping
              </Link>
              <button 
                onClick={() => {
                  if (confirm("Are you sure you want to empty your cart?")) {
                    clearCart();
                  }
                }}
                className="text-xs font-bold text-gray-500 hover:text-gray-900 border border-gray-300 rounded-full py-2 px-6 hover:bg-gray-100 transition-all"
              >
                Clear Entire Cart
              </button>
            </div>

          </div>

          {/* RIGHT COLUMN: ORDER SUMMARY */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col gap-5">
              <h3 className="text-base font-black text-gray-900 uppercase tracking-wide border-b pb-2">Order Summary</h3>
              
              <div className="flex justify-between text-sm text-gray-600">
                <span>Subtotal ({cartCount} items)</span>
                <span className="font-semibold">Rs. {cartSubtotal.toLocaleString()}</span>
              </div>
              
              <div className="flex justify-between text-sm text-gray-600">
                <span>Shipping Cost</span>
                <span className="font-semibold text-green-600">{shippingCost === 0 ? "FREE" : `Rs. ${shippingCost.toLocaleString()}`}</span>
              </div>

              {couponApplied && (
                <div className="flex justify-between text-sm text-green-600 font-bold">
                  <span>10% Discount</span>
                  <span>- Rs. {discountAmount.toLocaleString()}</span>
                </div>
              )}

              <div className="border-t border-gray-100 pt-4 flex justify-between items-baseline">
                <span className="text-base font-bold text-gray-900">Total Price</span>
                <span className="text-2xl font-black text-[#0066CC]">Rs. {cartTotal.toLocaleString()}</span>
              </div>

              {/* Coupon Form */}
              <form onSubmit={handleApplyCoupon} className="flex gap-2 mt-2">
                <input 
                  type="text" 
                  placeholder="Coupon Code" 
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  disabled={couponApplied}
                  className="flex-1 px-4 py-2 border border-gray-200 rounded-lg text-xs focus:outline-none text-black bg-white uppercase font-bold"
                />
                <button 
                  type="submit"
                  disabled={couponApplied}
                  className="bg-gray-900 hover:bg-black text-white font-extrabold text-xs py-2.5 px-4 rounded-lg transition-colors disabled:bg-gray-200 disabled:text-gray-400"
                >
                  Apply
                </button>
              </form>
              
              {couponApplied && (
                <p className="text-[10px] text-green-600 font-bold flex items-center gap-1">✔ Promo code active: 10% OFF applied</p>
              )}

              {/* Checkout CTA */}
              <Link 
                href="/checkout"
                className="bg-[#0066CC] hover:bg-blue-700 text-white text-center font-extrabold py-4 px-6 rounded-full text-sm shadow hover:shadow-lg transition-all tracking-wider uppercase mt-4"
              >
                Proceed to Checkout
              </Link>
            </div>
            
            {/* Trust Banner */}
            <div className="bg-amber-50 p-6 rounded-2xl border border-amber-100 flex flex-col gap-2.5">
              <h4 className="text-xs font-black text-gray-900 uppercase tracking-wide">📦 Free Delivery Eligibility</h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                Add 2 or more products (or purchase items worth Rs. 10,000+) to get absolutely <strong>Free Delivery</strong> nationwide.
              </p>
            </div>
          </div>

        </div>
      )}

      {/* Recommended Products */}
      {recommendations.length > 0 && (
        <section className="mt-20 border-t border-gray-200 pt-12">
          <h2 className="text-xl font-black text-gray-900 mb-8 uppercase tracking-wider">You Might Also Like</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {recommendations.map((p) => (
              <div key={p.id} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all border border-gray-100 flex flex-col group">
                <Link href={`/shop/${p.id}`} className="block relative aspect-square bg-gray-50 flex items-center justify-center overflow-hidden border-b border-gray-100 group-hover:opacity-90">
                  <span className="text-xl font-extrabold text-blue-200 uppercase tracking-widest">{p.category}</span>
                </Link>
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <Link href={`/shop/${p.id}`} className="text-xs font-bold text-gray-900 hover:text-[#0066CC] transition-colors truncate block">
                    {p.name}
                  </Link>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-sm font-extrabold text-[#0066CC]">Rs. {p.price.toLocaleString()}</span>
                    <Link 
                      href={`/shop/${p.id}`}
                      className="border border-[#0066CC] hover:bg-blue-50 text-[#0066CC] font-bold py-1 px-3 rounded-full text-[10px]"
                    >
                      View
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

    </div>
  );
}
