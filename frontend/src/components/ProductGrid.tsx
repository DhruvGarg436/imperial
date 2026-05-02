"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useCart, Product } from '@/hooks/useCart';

export default function ProductGrid() {
  const [products, setProducts] = useState<Product[]>([]);
  const { addToCart } = useCart();

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/products`)
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error("Error fetching products:", err));
  }, []);

  return (
    <div className="container mx-auto px-6 py-20">
      <h2 className="text-3xl font-light tracking-widest uppercase text-white mb-12 text-center">The Collection</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {products.map((product, idx) => (
          <motion.div 
            key={product.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1, duration: 0.8 }}
            className="group cursor-pointer"
          >
            <div className="relative aspect-[3/4] overflow-hidden rounded bg-secondary mb-6">
              <img 
                src={product.image_url} 
                alt={product.name} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(product);
                  }}
                  className="bg-gold text-obsidian px-6 py-3 uppercase tracking-widest text-sm font-semibold hover:bg-gold-hover transition-colors"
                >
                  Add to Cart
                </button>
              </div>
            </div>
            <h3 className="text-lg font-medium text-white mb-2">{product.name}</h3>
            <p className="text-gold mb-3">${product.price.toFixed(2)}</p>
            <p className="text-gray-400 text-sm leading-relaxed">{product.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
