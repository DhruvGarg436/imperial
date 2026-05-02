"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useCart } from "@/hooks/useCart";
import Link from "next/link";
import { CheckCircle, Lock } from "lucide-react";

export default function Checkout() {
  const { items, cartTotal, clearCart } = useCart();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'processing' | 'success'>('idle');

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;
    
    setStatus('processing');
    
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/process-payment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cart_items: items.map(i => ({ product_id: i.product.id, quantity: i.quantity })),
          total_amount: cartTotal,
          user_email: email
        })
      });
      
      if (res.ok) {
        setStatus('success');
        clearCart();
      }
    } catch (error) {
      console.error("Payment failed", error);
      setStatus('idle');
    }
  };

  if (status === 'success') {
    return (
      <div className="min-h-screen bg-obsidian flex flex-col items-center justify-center p-6 text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", bounce: 0.5 }}
          className="mb-6 text-gold"
        >
          <CheckCircle size={80} strokeWidth={1} />
        </motion.div>
        <h1 className="text-3xl tracking-widest uppercase text-white mb-4">Payment Successful</h1>
        <p className="text-gray-400 max-w-md mx-auto mb-8 font-light">
          Thank you for your purchase. A confirmation receipt has been sent to your email. Your pieces will be carefully prepared for complimentary white-glove delivery.
        </p>
        <Link href="/">
          <button className="border border-gold text-gold hover:bg-gold hover:text-obsidian px-8 py-3 tracking-widest uppercase transition-colors">
            Return to Boutique
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-obsidian py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-light tracking-widest uppercase text-white mb-12 border-b border-border pb-4 flex items-center justify-between">
          <span>Checkout</span>
          <Lock size={20} className="text-gray-500" />
        </h1>

        {items.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 tracking-wider uppercase mb-8">Your cart is empty.</p>
            <Link href="/">
              <button className="bg-gold hover:bg-gold-hover text-obsidian px-8 py-3 tracking-widest uppercase font-semibold transition-colors">
                Continue Shopping
              </button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-xl tracking-widest uppercase text-white mb-6">Payment Details</h2>
              <form onSubmit={handlePayment} className="space-y-6">
                <div>
                  <label className="block text-sm tracking-widest uppercase text-gray-400 mb-2">Email Address</label>
                  <input 
                    type="email" 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-secondary border border-border text-white px-4 py-3 focus:outline-none focus:border-gold transition-colors"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <label className="block text-sm tracking-widest uppercase text-gray-400 mb-2">Card Information</label>
                    <input 
                      type="text" 
                      placeholder="0000 0000 0000 0000"
                      className="w-full bg-secondary border border-border text-white px-4 py-3 focus:outline-none focus:border-gold transition-colors font-mono"
                    />
                  </div>
                  <div>
                    <input 
                      type="text" 
                      placeholder="MM/YY"
                      className="w-full bg-secondary border border-border text-white px-4 py-3 focus:outline-none focus:border-gold transition-colors font-mono"
                    />
                  </div>
                  <div>
                    <input 
                      type="text" 
                      placeholder="CVC"
                      className="w-full bg-secondary border border-border text-white px-4 py-3 focus:outline-none focus:border-gold transition-colors font-mono"
                    />
                  </div>
                </div>
                <button 
                  type="submit"
                  disabled={status === 'processing'}
                  className="w-full bg-gold hover:bg-gold-hover text-obsidian font-semibold tracking-widest uppercase py-4 mt-8 transition-colors disabled:opacity-50 flex items-center justify-center"
                >
                  {status === 'processing' ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-obsidian" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </span>
                  ) : (
                    `Pay $${cartTotal.toFixed(2)}`
                  )}
                </button>
              </form>
            </div>

            <div className="bg-secondary p-8 border border-border h-fit">
              <h2 className="text-xl tracking-widest uppercase text-white mb-6">Order Summary</h2>
              <div className="space-y-4 mb-8">
                {items.map(item => (
                  <div key={item.product.id} className="flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                      <span className="text-gray-400 text-sm">{item.quantity}x</span>
                      <span className="text-white text-sm">{item.product.name}</span>
                    </div>
                    <span className="text-gold text-sm">${(item.product.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-border pt-6 space-y-3">
                <div className="flex justify-between text-gray-400 text-sm">
                  <span>Subtotal</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-400 text-sm">
                  <span>Shipping</span>
                  <span className="text-gold">Complimentary</span>
                </div>
                <div className="flex justify-between text-white text-lg mt-4 pt-4 border-t border-border font-medium">
                  <span className="tracking-widest uppercase">Total</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
