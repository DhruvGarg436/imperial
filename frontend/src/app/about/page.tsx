"use client";

import { motion } from "framer-motion";

export default function About() {
  return (
    <div className="min-h-screen bg-obsidian py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h1 className="text-4xl md:text-6xl font-light tracking-widest uppercase text-white mb-6">The Maison</h1>
          <div className="w-24 h-1 bg-gold mx-auto"></div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20"
        >
          <div>
            <img 
              src="https://images.unsplash.com/photo-1549439602-43ebca2327af?q=80&w=1000&auto=format&fit=crop" 
              alt="Artisan craftsmanship" 
              className="w-full h-[600px] object-cover grayscale hover:grayscale-0 transition-all duration-700"
            />
          </div>
          <div className="space-y-6 text-gray-300 leading-relaxed font-light">
            <h2 className="text-2xl text-white tracking-widest uppercase mb-4">Our Heritage</h2>
            <p>
              Founded on the principles of uncompromising quality and timeless elegance, IMPERIALS represents the pinnacle of modern luxury. Every garment we create is a testament to the artisan's touch, blending traditional craftsmanship with contemporary silhouettes.
            </p>
            <p>
              We source only the rarest materials—from the finest Italian silks to hand-combed Mongolian cashmere—ensuring that every piece not only looks extraordinary but feels transcendent against the skin.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center bg-secondary p-12 md:p-20 border border-border"
        >
          <h2 className="text-2xl text-gold tracking-widest uppercase mb-6">Sustainable Luxury</h2>
          <p className="text-gray-300 leading-relaxed max-w-2xl mx-auto font-light">
            True luxury is responsible. We are committed to an ethical supply chain, working directly with generational artisans and environmentally conscious mills to ensure our legacy is one of beauty, not burden.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
