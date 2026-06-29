"use client";

import React from "react";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="max-w-[800px] w-full mx-auto px-4 md:px-8 py-16 text-black">
      
      {/* Header */}
      <div className="text-center mb-12">
        <span className="text-[#0066CC] font-bold text-xs uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full">Our Story</span>
        <h1 className="text-3xl md:text-5xl font-black text-gray-950 mt-3">About CrockeryMart</h1>
        <div className="w-16 h-1.5 bg-amber-500 mx-auto mt-4 rounded-full"></div>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-3xl p-8 md:p-12 border border-gray-100 shadow-sm flex flex-col gap-8 text-gray-600 leading-relaxed text-sm">
        
        <p className="text-base font-medium text-gray-800">
          Welcome to <strong className="text-[#0066CC]">CrockeryMart.pk</strong>, your number one source for premium quality crockery, kitchen utensils, and table decoration in Pakistan. We are dedicated to providing you the very best of dinnerware, with a focus on durability, safety, aesthetic elegance, and excellent customer service.
        </p>

        <div>
          <h2 className="text-lg font-black text-gray-900 uppercase tracking-wider mb-3">How We Started</h2>
          <p>
            Founded in 2018 in Karachi, CrockeryMart.pk has come a long way from its beginnings in a small local market. When we first started out, our passion for helping Pakistani households set up beautiful, modern tables drove us to research fine porcelain and glassware materials, so that CrockeryMart.pk can offer you the world's most elegant designs at wholesale prices. We now serve customers all over Pakistan, and are thrilled that we are able to turn our passion into a leading online store.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 my-4 border-t border-b border-gray-100 py-6">
          <div className="flex flex-col gap-2">
            <h3 className="text-sm font-black text-gray-900 uppercase tracking-wide flex items-center gap-1.5">
              <span>🎯</span> Our Mission
            </h3>
            <p className="text-xs">
              To bring luxury dining experiences into every Pakistani home by providing premium, non-toxic, and artistically-designed crockery sets at accessible pricing.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-sm font-black text-gray-900 uppercase tracking-wide flex items-center gap-1.5">
              <span>👁️</span> Our Vision
            </h3>
            <p className="text-xs">
              To establish CrockeryMart.pk as the most trusted household kitchenware brand in Pakistan, recognized for damage-free transit and class-apart customer support.
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-black text-gray-900 uppercase tracking-wider mb-3">Our Core Commitments</h2>
          <ul className="space-y-3 pl-1">
            <li className="flex gap-2">
              <span className="text-[#0066CC] font-bold">✔</span>
              <span><strong>Quality Tested:</strong> Every bowl, plate, cup, and spoon is hand-checked for chips and glaze defects before going into delivery boxes.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-[#0066CC] font-bold">✔</span>
              <span><strong>Safe Shipping:</strong> We understand shipping ceramics is risky. That's why we use custom 3-layer bubble wrap boxes. Breakage in transit? We replace it free.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-[#0066CC] font-bold">✔</span>
              <span><strong>Honest Pricing:</strong> No middlemen. We deal directly with suppliers to pass wholesale savings of up to 30% to our homemakers and decorators.</span>
            </li>
          </ul>
        </div>

        {/* Owner bio mockup */}
        <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 mt-4 flex flex-col sm:flex-row items-center gap-6">
          <div className="w-20 h-20 bg-blue-100 rounded-full flex-shrink-0 flex items-center justify-center font-bold text-lg text-[#0066CC]">
            CM
          </div>
          <div className="flex-1 text-center sm:text-left">
            <h4 className="font-extrabold text-sm text-gray-950">Muhammad Ali</h4>
            <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Founder & Operations Head</p>
            <p className="text-xs text-gray-500 mt-2 leading-relaxed italic">
              "We built CrockeryMart.pk on the simple belief that a dining table is where families gather, bond, and share stories. Elevating that table shouldn't cost a fortune."
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-6">
          <p className="font-semibold text-gray-800 mb-4">Want to browse our latest porcelain collections?</p>
          <Link 
            href="/shop"
            className="bg-[#0066CC] hover:bg-blue-700 text-white font-extrabold py-3.5 px-8 rounded-full text-sm shadow hover:shadow-lg transition-all"
          >
            Explore the Shop
          </Link>
        </div>

      </div>
    </div>
  );
}
