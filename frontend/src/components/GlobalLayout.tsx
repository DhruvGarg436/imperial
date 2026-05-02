"use client";

import React from 'react';
import Header from './Header';
import CartDrawer from './CartDrawer';
import AiChatFab from './AiChatFab';
import { useCart } from '@/hooks/useCart';

export default function GlobalLayout({ children }: { children: React.ReactNode }) {
  const { items, isOpen, setIsOpen, updateQuantity, removeFromCart, cartTotal, cartCount } = useCart();

  return (
    <>
      <Header onOpenCart={() => setIsOpen(true)} cartCount={cartCount} />
      <CartDrawer 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)} 
        items={items} 
        updateQuantity={updateQuantity} 
        removeFromCart={removeFromCart} 
        cartTotal={cartTotal} 
      />
      <main className="pt-20 min-h-screen">
        {children}
      </main>
      <AiChatFab />
    </>
  );
}
