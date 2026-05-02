"use client";

import { motion } from "framer-motion";
import SpotlightBackground from "@/components/ui/spotlight-background";
import ProductGrid from "@/components/ProductGrid";

export default function Home() {
  const scrollToProducts = () => {
    document.getElementById('collection')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <SpotlightBackground>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="spotlight-inner"
        >
          <h1 className="spotlight-title">
            IMPERIALS
          </h1>
          <p className="spotlight-description">
            A curated collection of minimalist luxury. Elevate your wardrobe with our bespoke, handcrafted pieces.
          </p>
          <button onClick={scrollToProducts} className="spotlight-button">
            Explore Collection
          </button>
        </motion.div>
      </SpotlightBackground>
      
      <section id="collection" className="bg-obsidian min-h-screen pt-20">
        <ProductGrid />
      </section>
    </>
  );
}
