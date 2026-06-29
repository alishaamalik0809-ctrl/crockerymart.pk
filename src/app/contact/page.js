"use client";

import React, { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      alert("Please fill in all required fields.");
      return;
    }
    alert(`📨 Message Sent!\nThank you, ${formData.name}. Our representative will contact you via email (${formData.email}) or phone within 1 hour.`);
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="max-w-[1200px] w-full mx-auto px-4 md:px-8 py-10 text-black">
      
      {/* Header */}
      <div className="text-center mb-12">
        <span className="text-[#0066CC] font-bold text-xs uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full">Support</span>
        <h1 className="text-3xl md:text-5xl font-black text-gray-950 mt-3">Get in Touch</h1>
        <div className="w-16 h-1.5 bg-amber-500 mx-auto mt-4 rounded-full"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: CONTACT FORM */}
        <main className="lg:col-span-7 bg-white p-6 md:p-10 rounded-3xl border border-gray-100 shadow-sm">
          <h2 className="text-xl font-black text-gray-900 mb-6 uppercase tracking-wider">Send Us a Message</h2>
          
          <form onSubmit={handleSubmit} className="flex flex-col gap-5 text-black">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-gray-500 uppercase">Your Name *</label>
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Fatima Ahmed"
                  required
                  className="border border-gray-200 px-4 py-2.5 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0066CC] bg-white text-black"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-gray-500 uppercase">Email Address *</label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="e.g. fatima@example.com"
                  required
                  className="border border-gray-200 px-4 py-2.5 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0066CC] bg-white text-black"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-gray-500 uppercase">Subject</label>
              <input 
                type="text" 
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="How can we help you?"
                className="border border-gray-200 px-4 py-2.5 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0066CC] bg-white text-black"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-gray-500 uppercase">Message *</label>
              <textarea 
                rows="6"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us details about your requirements or custom bulk requests..."
                required
                className="border border-gray-200 px-4 py-2.5 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0066CC] bg-white text-black"
              ></textarea>
            </div>

            <button 
              type="submit"
              className="bg-[#0066CC] hover:bg-blue-700 text-white font-extrabold py-3.5 px-8 rounded-full text-sm shadow hover:shadow-lg transition-all tracking-wider uppercase mt-2 self-start"
            >
              Send Message
            </button>

          </form>
        </main>

        {/* RIGHT COLUMN: CONTACT INFORMATION */}
        <aside className="lg:col-span-5 flex flex-col gap-6">
          
          {/* Quick Contact Info */}
          <div className="bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-sm flex flex-col gap-6">
            <h2 className="text-lg font-black text-gray-900 border-b pb-2 uppercase tracking-wide">Contact Details</h2>
            
            <div className="flex flex-col gap-5">
              
              <div className="flex items-start gap-3.5">
                <span className="text-2xl mt-0.5">📞</span>
                <div>
                  <h4 className="text-xs font-black text-gray-500 uppercase tracking-wide">Phone Number</h4>
                  <a href="tel:+923001234567" className="text-sm font-bold text-gray-900 hover:text-[#0066CC] transition-colors mt-0.5 block">
                    +92 300 1234567
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <span className="text-2xl mt-0.5">💬</span>
                <div>
                  <h4 className="text-xs font-black text-gray-500 uppercase tracking-wide">WhatsApp click-to-chat</h4>
                  <a 
                    href="https://wa.me/923001234567?text=Hi%20CrockeryMart%20I%20have%20a%20question"
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sm font-extrabold text-green-600 hover:underline mt-0.5 block flex items-center gap-1.5"
                  >
                    <span>Chat on WhatsApp</span>
                    <span className="bg-green-100 text-green-700 text-[10px] py-0.5 px-2 rounded-full">Online</span>
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <span className="text-2xl mt-0.5">✉️</span>
                <div>
                  <h4 className="text-xs font-black text-gray-500 uppercase tracking-wide">Email Support</h4>
                  <a href="mailto:support@crockerymart.pk" className="text-sm font-bold text-gray-900 hover:text-[#0066CC] transition-colors mt-0.5 block">
                    support@crockerymart.pk
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <span className="text-2xl mt-0.5">🕒</span>
                <div>
                  <h4 className="text-xs font-black text-gray-500 uppercase tracking-wide">Business Hours</h4>
                  <p className="text-sm font-semibold text-gray-700 mt-0.5">
                    Monday - Saturday (9:00 AM - 9:00 PM PST)
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* Location Mock Map Panel */}
          <div className="bg-gray-900 text-white p-6 md:p-8 rounded-3xl border border-gray-800 shadow-sm flex flex-col gap-4">
            <h3 className="text-base font-black text-white uppercase tracking-wider flex items-center gap-1.5">
              <span>📍</span> Distribution Hub
            </h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Our central warehouse is located in Karachi, from where all orders are package-tested and dispatched.
            </p>
            <div className="border border-gray-800 bg-gray-950 rounded-2xl h-44 flex flex-col items-center justify-center text-center p-4 relative overflow-hidden">
              <span className="text-3xl block mb-2">🗺️</span>
              <p className="text-xs text-gray-300 font-bold">CrockeryMart Logistics Center</p>
              <p className="text-[10px] text-gray-500 mt-1">Sector 15, Korangi Industrial Area, Karachi</p>
              
              {/* Decorative grid */}
              <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>
            </div>
          </div>

        </aside>

      </div>

    </div>
  );
}
