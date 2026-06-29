"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

const StoreContext = createContext();

export function StoreProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [activeNotification, setActiveNotification] = useState(null);
  const [orderConfirm, setOrderConfirm] = useState(null);

  // Load cart and wishlist from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("crockery_cart");
    const savedWishlist = localStorage.getItem("crockery_wishlist");
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error("Error parsing cart data", e);
      }
    }
    if (savedWishlist) {
      try {
        setWishlist(JSON.parse(savedWishlist));
      } catch (e) {
        console.error("Error parsing wishlist data", e);
      }
    }
  }, []);

  // Save cart to localStorage
  const saveCart = (newCart) => {
    setCart(newCart);
    localStorage.setItem("crockery_cart", JSON.stringify(newCart));
  };

  // Save wishlist to localStorage
  const saveWishlist = (newWishlist) => {
    setWishlist(newWishlist);
    localStorage.setItem("crockery_wishlist", JSON.stringify(newWishlist));
  };

  // Notification helper
  const showNotification = (message) => {
    setActiveNotification(message);
    setTimeout(() => {
      setActiveNotification(null);
    }, 3000);
  };

  const addToCart = (product, quantity = 1) => {
    const existingIndex = cart.findIndex((item) => item.product.id === product.id);
    let newCart = [...cart];
    
    if (existingIndex > -1) {
      newCart[existingIndex].quantity += quantity;
    } else {
      newCart.push({ product, quantity });
    }
    
    saveCart(newCart);
    showNotification(`🛒 Added ${quantity} x ${product.name} to cart!`);
  };

  const removeFromCart = (productId) => {
    const newCart = cart.filter((item) => item.product.id !== productId);
    saveCart(newCart);
    showNotification("🗑️ Item removed from cart");
  };

  const updateCartQty = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    const newCart = cart.map((item) =>
      item.product.id === productId ? { ...item, quantity } : item
    );
    saveCart(newCart);
  };

  const clearCart = () => {
    saveCart([]);
  };

  const toggleWishlist = (product) => {
    const exists = wishlist.some((item) => item.id === product.id);
    let newWishlist;
    
    if (exists) {
      newWishlist = wishlist.filter((item) => item.id !== product.id);
      showNotification("💔 Removed from Wishlist");
    } else {
      newWishlist = [...wishlist, product];
      showNotification("💖 Added to Wishlist");
    }
    
    saveWishlist(newWishlist);
  };

  const isInWishlist = (productId) => {
    return wishlist.some((item) => item.id === productId);
  };

  return (
    <StoreContext.Provider
      value={{
        cart,
        wishlist,
        activeNotification,
        orderConfirm,
        setOrderConfirm,
        addToCart,
        removeFromCart,
        updateCartQty,
        clearCart,
        toggleWishlist,
        isInWishlist,
        showNotification
      }}
    >
      {children}
      
      {/* Global toast notification */}
      {activeNotification && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center bg-blue-600 text-white py-3 px-6 rounded-lg shadow-2xl border border-blue-400 animate-bounce">
          <span className="font-semibold text-sm">{activeNotification}</span>
        </div>
      )}
    </StoreContext.Provider>
  );
}

export function useStore() {
  return useContext(StoreContext);
}
