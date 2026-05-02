"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/contact-submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
      }
    } catch (error) {
      console.error("Submission failed", error);
      setStatus('idle');
    }
  };

  return (
    <div className="min-h-screen bg-obsidian py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h1 className="text-4xl md:text-6xl font-light tracking-widest uppercase text-white mb-6">Concierge</h1>
          <p className="text-gray-400 max-w-2xl mx-auto mb-6">
            For private viewings, bespoke tailoring, or general inquiries, our dedicated concierge team is at your service.
          </p>
          <div className="w-24 h-1 bg-gold mx-auto"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="text-2xl text-gold tracking-widest uppercase mb-8">Send an Inquiry</h2>
            {status === 'success' ? (
              <div className="bg-secondary border border-gold p-8 text-center">
                <h3 className="text-xl text-white mb-2 tracking-widest">Message Received</h3>
                <p className="text-gray-400">A member of our concierge team will contact you shortly.</p>
                <button 
                  onClick={() => setStatus('idle')}
                  className="mt-6 text-gold underline text-sm tracking-widest uppercase"
                >
                  Send another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm tracking-widest uppercase text-gray-400 mb-2">Name</label>
                  <input 
                    type="text" 
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-secondary border border-border text-white px-4 py-3 focus:outline-none focus:border-gold transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm tracking-widest uppercase text-gray-400 mb-2">Email</label>
                  <input 
                    type="email" 
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full bg-secondary border border-border text-white px-4 py-3 focus:outline-none focus:border-gold transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm tracking-widest uppercase text-gray-400 mb-2">Message</label>
                  <textarea 
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="w-full bg-secondary border border-border text-white px-4 py-3 focus:outline-none focus:border-gold transition-colors resize-none"
                  ></textarea>
                </div>
                <button 
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full bg-gold hover:bg-gold-hover text-obsidian font-semibold tracking-widest uppercase py-4 transition-colors disabled:opacity-50"
                >
                  {status === 'submitting' ? 'Sending...' : 'Submit Inquiry'}
                </button>
              </form>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col h-full"
          >
            <h2 className="text-2xl text-white tracking-widest uppercase mb-8">Flagship Boutique</h2>
            <div className="flex-1 bg-secondary border border-border min-h-[400px] relative">
              {/* Google Maps Embed */}
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2482.905020272023!2d-0.1444004839849223!3d51.51403661803716!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487604d502268421%3A0x6a7d62889992f993!2sNew%20Bond%20St%2C%20London%20W1S%202SR%2C%20UK!5e0!3m2!1sen!2sus!4v1689620000000!5m2!1sen!2sus" 
                className="absolute inset-0 w-full h-full border-0 grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-700" 
                allowFullScreen={false} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
            <div className="mt-8 text-gray-400 space-y-2 font-light">
              <p>124 New Bond Street</p>
              <p>Mayfair, London, W1S 1DX</p>
              <p className="text-gold pt-2">+44 20 7946 0011</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
