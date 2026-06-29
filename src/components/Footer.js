"use client";

import React from "react";
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8 mt-auto border-t-4 border-amber-500">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8">
        
        {/* Main Footer Links & Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* Brand Info */}
          <div>
            <Link href="/" className="flex flex-col mb-4">
              <span className="text-2xl font-black text-white tracking-tight leading-none">
                CROCKERY<span className="text-amber-500 font-medium">MART</span>
              </span>
              <span className="text-xs text-gray-400 font-semibold tracking-widest mt-1">PREMIUM KITCHENWARE</span>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed mb-6">
              Pakistan's premier online destination for luxury crockery, elegant dinnerware, and premium kitchen utensils. Enhancing your dining table since 2018.
            </p>
            <div className="flex gap-4">
              {/* WhatsApp Social */}
              <a href="https://wa.me/923001234567" target="_blank" rel="noopener noreferrer" className="bg-[#25D366] text-white p-2.5 rounded-full hover:scale-110 transition-transform shadow-lg" title="WhatsApp Business">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.965C16.588 1.977 14.113 1.95 12.01 1.95c-5.437 0-9.864 4.373-9.868 9.803-.001 1.814.488 3.59 1.417 5.132l-.994 3.633 3.79-.974zm10.237-7.009c-.29-.145-1.72-.848-1.987-.946-.266-.097-.46-.145-.653.145-.193.29-.748.946-.917 1.139-.17.194-.339.218-.63.073-.29-.145-1.223-.45-2.33-1.439-.86-.767-1.44-1.716-1.609-2.007-.17-.29-.018-.447.127-.592.13-.13.29-.339.435-.508.145-.17.193-.29.29-.483.097-.193.048-.363-.024-.508-.073-.145-.653-1.573-.895-2.153-.236-.569-.475-.491-.653-.5-.17-.008-.363-.01-.556-.01-.193 0-.508.073-.774.363-.266.29-1.016.992-1.016 2.417s1.04 2.798 1.184 2.993c.145.193 2.046 3.125 4.957 4.38.692.298 1.233.477 1.654.61.696.22 1.329.19 1.83.115.558-.083 1.72-.702 1.962-1.38.242-.678.242-1.258.17-1.38-.073-.12-.266-.194-.556-.339z"/>
                </svg>
              </a>
              {/* Instagram */}
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="bg-[#E1306C] text-white p-2.5 rounded-full hover:scale-110 transition-transform shadow-lg" title="Instagram">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
              </a>
              {/* Facebook */}
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="bg-[#1877F2] text-white p-2.5 rounded-full hover:scale-110 transition-transform shadow-lg" title="Facebook">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white text-base font-bold mb-5 uppercase tracking-wider border-l-4 border-amber-500 pl-3">Quick Links</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/" className="hover:text-amber-500 hover:underline transition-colors">Home</Link></li>
              <li><Link href="/shop" className="hover:text-amber-500 hover:underline transition-colors">Shop All Products</Link></li>
              <li><Link href="/about" className="hover:text-amber-500 hover:underline transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-amber-500 hover:underline transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h4 className="text-white text-base font-bold mb-5 uppercase tracking-wider border-l-4 border-amber-500 pl-3">Customer Service</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/contact?topic=returns" className="hover:text-amber-500 hover:underline transition-colors">7-Day Return Policy</Link></li>
              <li><Link href="/contact?topic=shipping" className="hover:text-amber-500 hover:underline transition-colors">Shipping & Delivery Info</Link></li>
              <li><Link href="/contact?topic=privacy" className="hover:text-amber-500 hover:underline transition-colors">Privacy Policy</Link></li>
              <li><a href="https://wa.me/923001234567" target="_blank" rel="noopener noreferrer" className="hover:text-amber-500 hover:underline transition-colors">Track Your Order</a></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-white text-base font-bold mb-5 uppercase tracking-wider border-l-4 border-amber-500 pl-3">Contact Us</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Karachi, Pakistan (Delivery Nationwide)</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <div className="flex flex-col">
                  <a href="tel:+923001234567" className="hover:text-amber-500 hover:underline">+92 300 1234567</a>
                  <span className="text-xs text-gray-500">Mon - Sat (9:00 AM - 9:00 PM)</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:support@crockerymart.pk" className="hover:text-amber-500 hover:underline">support@crockerymart.pk</a>
              </li>
            </ul>
          </div>

        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-gray-800 text-center flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <p>© 2024 CrockeryMart.pk. All rights reserved.</p>
          <div className="flex gap-4">
            <span className="flex items-center gap-1 font-semibold text-gray-400">🔒 Secure Checkout</span>
            <span className="text-gray-600">|</span>
            <span className="font-semibold text-gray-400">💵 Cash on Delivery</span>
            <span className="text-gray-600">|</span>
            <span className="font-semibold text-gray-400">🏦 Bank Transfer</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
