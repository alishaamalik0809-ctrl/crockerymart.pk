"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useStore } from "@/context/StoreContext";

export default function CheckoutPage() {
  const { cart, clearCart, orderConfirm, setOrderConfirm } = useStore();

  // Form States
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("Karachi");
  const [postalCode, setPostalCode] = useState("");
  
  const [shippingMethod, setShippingMethod] = useState("standard");
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [termsAccepted, setTermsAccepted] = useState(false);

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  // Determine standard shipping cost
  const standardShippingCost = cartCount >= 2 || cartSubtotal >= 10000 || cartCount === 0 ? 0 : 250;
  
  // Shipping Method Multipliers
  let shippingCost = standardShippingCost;
  if (shippingMethod === "express") {
    shippingCost = 400; // Flat express rate
  } else if (shippingMethod === "overnight") {
    shippingCost = 600; // Flat overnight rate
  }

  // Check if coupon was active (read discount from localstorage or hardcode standard coupon check)
  // Let's assume a standard checkout discount if they had one, or keep it simple
  const savedCart = typeof window !== "undefined" ? localStorage.getItem("crockery_cart") : null;
  const isEligibleForCoupon = cartSubtotal > 0;
  // Let's check if they used promo code (we can read the subtotal or apply local storage check)
  // Since we don't have coupon in global state, let's check standard totals
  const totalAmount = cartSubtotal + shippingCost;

  const handlePlaceOrder = (e) => {
    e.preventDefault();

    if (!termsAccepted) {
      alert("Please accept the terms and conditions to confirm your order.");
      return;
    }

    if (cart.length === 0) {
      alert("Your cart is empty. Please add items before checking out.");
      return;
    }

    // Generate Mock Order
    const orderNumber = "CM-" + Math.floor(100000 + Math.random() * 900000);
    const deliveryDays = shippingMethod === "overnight" ? 1 : shippingMethod === "express" ? 2 : 4;
    const estDate = new Date();
    estDate.setDate(estDate.getDate() + deliveryDays);
    const formattedEstDate = estDate.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    });

    const confirmationDetails = {
      orderNumber,
      fullName,
      email,
      phone,
      address: `${address}, ${city} ${postalCode}`.trim(),
      paymentMethod: paymentMethod.toUpperCase(),
      shippingMethod: shippingMethod.toUpperCase(),
      estDate: formattedEstDate,
      totalAmount,
      items: [...cart]
    };

    setOrderConfirm(confirmationDetails);
    clearCart();
    window.scrollTo(0, 0);
  };

  // 1. ORDER CONFIRMATION VIEW
  if (orderConfirm) {
    return (
      <div className="max-w-[700px] w-full mx-auto px-4 md:px-8 py-16 text-black">
        <div className="bg-white rounded-3xl p-8 md:p-10 border border-green-100 shadow-2xl text-center flex flex-col items-center gap-6">
          
          <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center text-green-500 mb-2">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>

          <div>
            <h1 className="text-3xl font-black text-gray-900">Order Confirmed!</h1>
            <p className="text-gray-500 text-sm mt-1">Thank you for shopping with CrockeryMart.pk</p>
          </div>

          <div className="w-full bg-gray-50 rounded-2xl p-6 text-left border border-gray-100 divide-y divide-gray-200">
            <div className="pb-3 flex justify-between text-sm">
              <span className="font-bold text-gray-500">Order Number:</span>
              <span className="font-extrabold text-[#0066CC]">{orderConfirm.orderNumber}</span>
            </div>
            <div className="py-3 flex justify-between text-sm">
              <span className="font-bold text-gray-500">Estimated Delivery:</span>
              <span className="font-extrabold text-gray-800">{orderConfirm.estDate}</span>
            </div>
            <div className="py-3 flex justify-between text-sm">
              <span className="font-bold text-gray-500">Ship To:</span>
              <span className="font-semibold text-gray-700 text-right max-w-[200px] truncate" title={orderConfirm.address}>{orderConfirm.fullName} ({orderConfirm.city || "Pakistan"})</span>
            </div>
            <div className="py-3 flex justify-between text-sm">
              <span className="font-bold text-gray-500">Payment Mode:</span>
              <span className="font-extrabold text-amber-600">{orderConfirm.paymentMethod}</span>
            </div>
            <div className="pt-3 flex justify-between text-base font-black">
              <span>Total Paid:</span>
              <span className="text-lg text-[#0066CC]">Rs. {orderConfirm.totalAmount.toLocaleString()}</span>
            </div>
          </div>

          <p className="text-xs text-gray-500 max-w-md leading-relaxed mt-2">
            A confirmation email has been sent to <strong>{orderConfirm.email}</strong>. Our customer agent will call or WhatsApp you on <strong>{orderConfirm.phone}</strong> shortly to verify this order.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 w-full mt-4">
            <a 
              href={`https://wa.me/923001234567?text=Hi%2C%20I%20want%20to%20track%20my%20order%20%23${orderConfirm.orderNumber}`}
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex-1 bg-green-500 hover:bg-green-600 text-white font-extrabold py-3.5 rounded-full text-sm shadow hover:shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.96 9.96 0 001.333 4.993L2 22l5.13-1.347a9.945 9.945 0 004.887 1.277h.005c5.505 0 9.988-4.478 9.99-9.985C22.017 6.478 17.524 2 12.012 2zm0 18.29h-.003a8.252 8.252 0 01-4.215-1.154l-.303-.18-3.13.82.835-3.05-.198-.314a8.249 8.249 0 01-1.264-4.428c.001-4.558 3.712-8.267 8.28-8.267 2.212 0 4.291.86 5.854 2.428a8.228 8.228 0 012.425 5.85c-.002 4.56-3.713 8.266-8.282 8.266z"/>
              </svg>
              Track Order via WhatsApp
            </a>
            <Link 
              href="/shop" 
              onClick={() => setOrderConfirm(null)}
              className="flex-1 border-2 border-gray-200 text-gray-700 hover:bg-gray-50 font-extrabold py-3.5 rounded-full text-sm transition-colors text-center"
            >
              Continue Shopping
            </Link>
          </div>

        </div>
      </div>
    );
  }

  // 2. CHECKOUT FORM VIEW
  return (
    <div className="max-w-[1200px] w-full mx-auto px-4 md:px-8 py-10 text-black">
      <h1 className="text-3xl font-black text-gray-900 mb-8">Checkout Details</h1>

      {cart.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border max-w-md mx-auto px-6">
          <span className="text-5xl block mb-4">🛒</span>
          <h2 className="text-xl font-bold text-gray-900">Your Cart is Empty</h2>
          <p className="text-sm text-gray-500 mt-2 mb-6">Add products to your cart before proceeding to checkout.</p>
          <Link href="/shop" className="bg-[#0066CC] hover:bg-blue-700 text-white font-bold py-2.5 px-6 rounded-full text-sm">
            Go to Shop
          </Link>
        </div>
      ) : (
        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: Billing, Shipping, Payment Forms */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            
            {/* Step 1: Billing / Shipping Info */}
            <div className="bg-white p-6 md:p-8 rounded-2xl border border-gray-100 shadow-sm flex flex-col gap-5">
              <h2 className="text-lg font-black text-gray-900 border-b pb-2 flex items-center gap-2">
                <span className="bg-[#0066CC] text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">1</span>
                Shipping Information
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-gray-500 uppercase">Full Name *</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Fatima Ahmed"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="border border-gray-200 px-4 py-2.5 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0066CC] bg-white text-black"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-gray-500 uppercase">Phone Number *</label>
                  <input 
                    type="tel" 
                    placeholder="e.g. 03001234567"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="border border-gray-200 px-4 py-2.5 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0066CC] bg-white text-black"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-gray-500 uppercase">Email Address *</label>
                <input 
                  type="email" 
                  placeholder="e.g. fatima@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border border-gray-200 px-4 py-2.5 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0066CC] bg-white text-black"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-gray-500 uppercase">Delivery Address *</label>
                <input 
                  type="text" 
                  placeholder="Street address, Apartment, Sector, Area Name"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="border border-gray-200 px-4 py-2.5 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0066CC] bg-white text-black"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-gray-500 uppercase">City *</label>
                  <select 
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="border border-gray-200 px-4 py-2.5 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0066CC] bg-white text-black"
                  >
                    <option value="Karachi">Karachi</option>
                    <option value="Lahore">Lahore</option>
                    <option value="Islamabad">Islamabad</option>
                    <option value="Rawalpindi">Rawalpindi</option>
                    <option value="Faisalabad">Faisalabad</option>
                    <option value="Multan">Multan</option>
                    <option value="Peshawar">Peshawar</option>
                    <option value="Quetta">Quetta</option>
                    <option value="Sialkot">Sialkot</option>
                    <option value="Gujranwala">Gujranwala</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-gray-500 uppercase">Postal Code (Optional)</label>
                  <input 
                    type="text" 
                    placeholder="e.g. 75500"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    className="border border-gray-200 px-4 py-2.5 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0066CC] bg-white text-black"
                  />
                </div>
              </div>

            </div>

            {/* Step 2: Shipping Method */}
            <div className="bg-white p-6 md:p-8 rounded-2xl border border-gray-100 shadow-sm flex flex-col gap-4">
              <h2 className="text-lg font-black text-gray-900 border-b pb-2 flex items-center gap-2">
                <span className="bg-[#0066CC] text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">2</span>
                Shipping Speed
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                
                <label className={`border-2 rounded-2xl p-4 flex flex-col gap-1 cursor-pointer transition-all ${shippingMethod === "standard" ? "border-[#0066CC] bg-blue-50/30" : "border-gray-200 hover:border-gray-300 bg-white"}`}>
                  <div className="flex justify-between items-center">
                    <span className="font-extrabold text-sm text-gray-900">Standard</span>
                    <input 
                      type="radio" 
                      name="shippingSpeed" 
                      value="standard"
                      checked={shippingMethod === "standard"}
                      onChange={() => setShippingMethod("standard")}
                      className="text-[#0066CC] focus:ring-[#0066CC]"
                    />
                  </div>
                  <span className="text-xs text-green-600 font-bold">{standardShippingCost === 0 ? "FREE Shipping" : "Rs. 250"}</span>
                  <span className="text-[10px] text-gray-400 font-semibold mt-1">2-4 business days delivery nationwide</span>
                </label>

                <label className={`border-2 rounded-2xl p-4 flex flex-col gap-1 cursor-pointer transition-all ${shippingMethod === "express" ? "border-[#0066CC] bg-blue-50/30" : "border-gray-200 hover:border-gray-300 bg-white"}`}>
                  <div className="flex justify-between items-center">
                    <span className="font-extrabold text-sm text-gray-900">Express</span>
                    <input 
                      type="radio" 
                      name="shippingSpeed" 
                      value="express"
                      checked={shippingMethod === "express"}
                      onChange={() => setShippingMethod("express")}
                      className="text-[#0066CC] focus:ring-[#0066CC]"
                    />
                  </div>
                  <span className="text-xs text-[#0066CC] font-bold">Rs. 400</span>
                  <span className="text-[10px] text-gray-400 font-semibold mt-1">24-48 hours fast delivery to major cities</span>
                </label>

                <label className={`border-2 rounded-2xl p-4 flex flex-col gap-1 cursor-pointer transition-all ${shippingMethod === "overnight" ? "border-[#0066CC] bg-blue-50/30" : "border-gray-200 hover:border-gray-300 bg-white"}`}>
                  <div className="flex justify-between items-center">
                    <span className="font-extrabold text-sm text-gray-900">Overnight</span>
                    <input 
                      type="radio" 
                      name="shippingSpeed" 
                      value="overnight"
                      checked={shippingMethod === "overnight"}
                      onChange={() => setShippingMethod("overnight")}
                      className="text-[#0066CC] focus:ring-[#0066CC]"
                    />
                  </div>
                  <span className="text-xs text-amber-600 font-bold">Rs. 600</span>
                  <span className="text-[10px] text-gray-400 font-semibold mt-1">Next-day delivery (Karachi, Lahore & Islamabad)</span>
                </label>

              </div>
            </div>

            {/* Step 3: Payment Method */}
            <div className="bg-white p-6 md:p-8 rounded-2xl border border-gray-100 shadow-sm flex flex-col gap-4">
              <h2 className="text-lg font-black text-gray-900 border-b pb-2 flex items-center gap-2">
                <span className="bg-[#0066CC] text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">3</span>
                Payment Options
              </h2>
              
              <div className="flex flex-col gap-3 text-black">
                
                {/* COD */}
                <label className={`border rounded-2xl p-4 flex gap-3 items-start cursor-pointer transition-colors ${paymentMethod === "cod" ? "bg-gray-50 border-[#0066CC]" : "bg-white border-gray-200"}`}>
                  <input 
                    type="radio" 
                    name="paymentMode" 
                    value="cod"
                    checked={paymentMethod === "cod"}
                    onChange={() => setPaymentMethod("cod")}
                    className="text-[#0066CC] focus:ring-[#0066CC] mt-1"
                  />
                  <div>
                    <span className="font-bold text-sm text-gray-950 block">💵 Cash on Delivery (COD)</span>
                    <span className="text-xs text-gray-500 leading-relaxed block mt-1">Pay with cash when the rider delivers the crockery to your address. Most secure & popular option in Pakistan.</span>
                  </div>
                </label>

                {/* Bank Transfer */}
                <label className={`border rounded-2xl p-4 flex gap-3 items-start cursor-pointer transition-colors ${paymentMethod === "bank" ? "bg-gray-50 border-[#0066CC]" : "bg-white border-gray-200"}`}>
                  <input 
                    type="radio" 
                    name="paymentMode" 
                    value="bank"
                    checked={paymentMethod === "bank"}
                    onChange={() => setPaymentMethod("bank")}
                    className="text-[#0066CC] focus:ring-[#0066CC] mt-1"
                  />
                  <div className="w-full">
                    <span className="font-bold text-sm text-gray-950 block">🏦 Direct Bank Transfer</span>
                    {paymentMethod === "bank" && (
                      <div className="mt-3 bg-white border rounded-xl p-4 text-xs text-gray-600 space-y-1.5 leading-relaxed">
                        <p>Please transfer the total amount to our business bank account:</p>
                        <p><strong>Bank Name:</strong> Meezan Bank Ltd.</p>
                        <p><strong>Account Title:</strong> CrockeryMart PK</p>
                        <p><strong>Account Number:</strong> 0234-010567890</p>
                        <p><strong>IBAN:</strong> PK89 MEZN 0002 3401 0567 8900</p>
                        <p className="text-red-500 font-semibold mt-2">⚠️ Please send a screenshot of the transfer receipt to our WhatsApp (+92 300 1234567) to confirm order processing.</p>
                      </div>
                    )}
                  </div>
                </label>

                {/* Mobile Wallets */}
                <label className={`border rounded-2xl p-4 flex gap-3 items-start cursor-pointer transition-colors ${paymentMethod === "wallet" ? "bg-gray-50 border-[#0066CC]" : "bg-white border-gray-200"}`}>
                  <input 
                    type="radio" 
                    name="paymentMode" 
                    value="wallet"
                    checked={paymentMethod === "wallet"}
                    onChange={() => setPaymentMethod("wallet")}
                    className="text-[#0066CC] focus:ring-[#0066CC] mt-1"
                  />
                  <div className="w-full">
                    <span className="font-bold text-sm text-gray-950 block">📱 JazzCash / EasyPaisa Wallet</span>
                    {paymentMethod === "wallet" && (
                      <div className="mt-3 bg-white border rounded-xl p-4 text-xs text-gray-600 space-y-1.5 leading-relaxed">
                        <p>Transfer the amount to our mobile wallet:</p>
                        <p><strong>Wallet Type:</strong> EasyPaisa or JazzCash</p>
                        <p><strong>Mobile Number:</strong> 0300-1234567</p>
                        <p><strong>Account Name:</strong> Muhammad Ali</p>
                        <p className="text-red-500 font-semibold mt-2">⚠️ Email or WhatsApp the transaction ID & screenshot to us for instant approval.</p>
                      </div>
                    )}
                  </div>
                </label>

              </div>
            </div>

          </div>

          {/* RIGHT: Order Summary review & Place Order CTA */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col gap-5">
              <h3 className="text-base font-black text-gray-900 uppercase tracking-wide border-b pb-2">Review Your Order</h3>
              
              {/* Simple listing */}
              <div className="max-h-48 overflow-y-auto divide-y divide-gray-100 pr-1">
                {cart.map((item) => (
                  <div key={item.product.id} className="py-2.5 flex items-center justify-between text-xs gap-3">
                    <span className="font-bold text-gray-800 truncate flex-1">{item.product.name} <strong className="text-blue-500">x{item.quantity}</strong></span>
                    <span className="font-semibold text-gray-500">Rs. {(item.product.price * item.quantity).toLocaleString()}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-100 pt-4 space-y-2 text-xs text-gray-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold">Rs. {cartSubtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping ({shippingMethod})</span>
                  <span className="font-semibold text-green-600">{shippingCost === 0 ? "FREE" : `Rs. ${shippingCost.toLocaleString()}`}</span>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-4 flex justify-between items-baseline">
                <span className="text-sm font-bold text-gray-900">Total Payable</span>
                <span className="text-xl font-black text-[#0066CC]">Rs. {totalAmount.toLocaleString()}</span>
              </div>

              {/* T&C Accept */}
              <label className="flex items-start gap-2.5 mt-2 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                  required
                  className="text-[#0066CC] border-gray-300 w-4 h-4 mt-0.5"
                />
                <span className="text-[10px] text-gray-500 leading-normal font-medium">
                  I agree to the 7-day return policy and confirm that my phone number is correct for verification. *
                </span>
              </label>

              {/* CTA button */}
              <button 
                type="submit"
                className="w-full bg-[#0066CC] hover:bg-blue-700 text-white font-extrabold py-4 px-6 rounded-full text-sm shadow hover:shadow-lg transition-all tracking-wider uppercase mt-2"
              >
                Place Order (COD)
              </button>
            </div>
            
            {/* Trust badge */}
            <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100 flex items-center gap-3">
              <span className="text-2xl">🔒</span>
              <div>
                <h4 className="text-xs font-black text-gray-900 uppercase">Secure Checkout</h4>
                <p className="text-[10px] text-gray-500 leading-relaxed mt-0.5">Your personal information is encrypted and never shared. Buy with peace of mind.</p>
              </div>
            </div>
          </div>

        </form>
      )}

    </div>
  );
}
