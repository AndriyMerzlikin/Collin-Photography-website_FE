'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { CartItem } from '@/types/cartTypes';

type CartItemWithType = CartItem & { type: 'digital' | 'frame' };

type CartContextType = {
  cart: CartItemWithType[];
  addToCart: (item: CartItemWithType) => void;
  removeFromCart: (_id: string) => void;
  clearCart: () => void;
  increaseQuantity: (_id: string) => void;
  decreaseQuantity: (_id: string) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItemWithType[]>([]);

  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) setCart(JSON.parse(storedCart));
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item: CartItemWithType) => {
    setCart((prev) => {
      const existing = prev.find((i) => i._id === item._id);

      if (item.type === 'digital' && existing) {
        return prev;
      }

      if (existing && item.type === 'frame') {
        return prev.map((i) =>
          i._id === item._id
            ? { ...i, quantity: i.quantity + item.quantity }
            : i,
        );
      }

      return [...prev, item];
    });
  };

  const increaseQuantity = (_id: string) => {
    setCart((prev) =>
      prev.map((item) =>
        item._id === _id && item.type === 'frame'
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      ),
    );
  };

  const decreaseQuantity = (_id: string) => {
    setCart((prev) =>
      prev.map((item) =>
        item._id === _id && item.type === 'frame' && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item,
      ),
    );
  };

  const removeFromCart = (_id: string) => {
    setCart((prev) => prev.filter((item) => item._id !== _id));
  };

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        increaseQuantity,
        decreaseQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
};
