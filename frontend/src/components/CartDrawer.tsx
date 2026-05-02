import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { CartItem } from '@/hooks/useCart';
import Link from 'next/link';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  updateQuantity: (id: string, qty: number) => void;
  removeFromCart: (id: string) => void;
  cartTotal: number;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ 
  isOpen, 
  onClose, 
  items, 
  updateQuantity, 
  removeFromCart, 
  cartTotal 
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-obsidian border-l border-border shadow-2xl z-50 flex flex-col"
          >
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h2 className="text-xl font-light tracking-widest uppercase text-white flex items-center">
                <ShoppingBag className="mr-3 text-gold" size={20} />
                Your Selection
              </h2>
              <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-gray-400">
                  <ShoppingBag size={48} className="mb-4 opacity-20" />
                  <p className="tracking-wider uppercase text-sm">Your cart is empty.</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {items.map((item) => (
                    <div key={item.product.id} className="flex gap-4 group">
                      <div className="w-24 h-32 bg-secondary rounded overflow-hidden">
                        <img 
                          src={item.product.image_url} 
                          alt={item.product.name} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <h3 className="text-sm font-medium text-white mb-1">{item.product.name}</h3>
                          <p className="text-gold text-sm">${item.product.price.toFixed(2)}</p>
                        </div>
                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center border border-border rounded">
                            <button 
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                              className="px-2 py-1 text-gray-400 hover:text-white transition-colors"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="px-2 text-sm text-white">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              className="px-2 py-1 text-gray-400 hover:text-white transition-colors"
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                          <button 
                            onClick={() => removeFromCart(item.product.id)}
                            className="text-xs tracking-wider uppercase text-gray-500 hover:text-destructive transition-colors"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {items.length > 0 && (
              <div className="p-6 border-t border-border bg-obsidian/95 backdrop-blur">
                <div className="flex justify-between mb-6">
                  <span className="text-gray-300 tracking-wider uppercase text-sm">Subtotal</span>
                  <span className="text-white font-medium">${cartTotal.toFixed(2)}</span>
                </div>
                <Link href="/checkout" onClick={onClose} className="block w-full">
                  <button className="w-full bg-gold hover:bg-gold-hover text-obsidian font-semibold tracking-widest uppercase py-4 transition-colors">
                    Proceed to Checkout
                  </button>
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
