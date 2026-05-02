import React from 'react';
import Link from 'next/link';
import { ShoppingBag } from 'lucide-react';

interface HeaderProps {
  onOpenCart: () => void;
  cartCount: number;
}

const Header: React.FC<HeaderProps> = ({ onOpenCart, cartCount }) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-md bg-obsidian/70 border-b border-border">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-light tracking-[0.2em] text-white">
          IMPERIALS
        </Link>
        <nav className="hidden md:flex items-center space-x-8">
          <Link href="/" className="text-sm font-medium tracking-widest uppercase text-gray-300 hover:text-gold transition-colors">
            Collections
          </Link>
          <Link href="/about" className="text-sm font-medium tracking-widest uppercase text-gray-300 hover:text-gold transition-colors">
            Maison
          </Link>
          <Link href="/contact" className="text-sm font-medium tracking-widest uppercase text-gray-300 hover:text-gold transition-colors">
            Concierge
          </Link>
        </nav>
        <div className="flex items-center space-x-6">
          <button 
            onClick={onOpenCart}
            className="relative p-2 text-white hover:text-gold transition-colors"
          >
            <ShoppingBag size={24} strokeWidth={1.5} />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 inline-flex items-center justify-center w-4 h-4 text-[10px] font-bold text-obsidian bg-gold rounded-full">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
