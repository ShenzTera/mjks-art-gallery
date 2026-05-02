/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Share, X, Info, Mail, Phone, MapPin, Send } from 'lucide-react';

interface Painting {
  id: string;
  title: string;
  year: string;
  description: string;
  imageUrl: string;
  dimensions: string;
  medium: string;
}

const PAINTINGS: Painting[] = [
  {
    id: 'water-lilies',
    title: 'Water Lilies',
    year: '1919',
    description: 'Part of the famous Nymphéas series, these paintings depict Monet\'s flower garden at Giverny. They were the main focus of his artistic production during the last thirty years of his life.',
    imageUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=800&auto=format&fit=crop',
    dimensions: '200 x 201 cm',
    medium: 'Oil on canvas'
  },
  {
    id: 'impression-sunrise',
    title: 'Impression, Sunrise',
    year: '1872',
    description: 'This painting is credited with inspiring the name of the Impressionist movement. It depicts the port of Le Havre, Monet\'s hometown, at sunrise.',
    imageUrl: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?q=80&w=800&auto=format&fit=crop',
    dimensions: '48 x 63 cm',
    medium: 'Oil on canvas'
  },
  {
    id: 'woman-parasol',
    title: 'Woman with a Parasol',
    year: '1875',
    description: 'Also known as Madame Monet and Her Son, this painting captures a casual family moment on a breezy summer day. It is one of Monet\'s most famous works.',
    imageUrl: 'https://images.unsplash.com/photo-1582201942988-13e60e4556ee?q=80&w=800&auto=format&fit=crop',
    dimensions: '100 x 81 cm',
    medium: 'Oil on canvas'
  },
  {
    id: 'san-giorgio',
    title: 'San Giorgio Maggiore at Dusk',
    year: '1908',
    description: 'A glowing sunset view of the island monastery in Venice. Monet used a brilliant palette of yellows, oranges, and purples to capture the atmospheric light.',
    imageUrl: 'https://images.unsplash.com/photo-1578301978018-3005759f48f7?q=80&w=800&auto=format&fit=crop',
    dimensions: '65 x 92 cm',
    medium: 'Oil on canvas'
  },
  {
    id: 'the-magpie',
    title: 'The Magpie',
    year: '1869',
    description: 'One of the first Impressionist snowscapes, Monet focuses on the interplay of light and shadow on the snow, with a lone magpie perched on a gate.',
    imageUrl: 'https://images.unsplash.com/photo-1579783922514-023a07802875?q=80&w=800&auto=format&fit=crop',
    dimensions: '89 x 130 cm',
    medium: 'Oil on canvas'
  },
  {
    id: 'bridge-giverny',
    title: 'The Japanese Bridge',
    year: '1899',
    description: 'Monet built the bridge himself in his garden at Giverny. He painted it dozens of times under different light conditions and seasonal shifts.',
    imageUrl: 'https://images.unsplash.com/photo-1576769974112-06de6eeafdf1?q=80&w=800&auto=format&fit=crop',
    dimensions: '81 x 100 cm',
    medium: 'Oil on canvas'
  }
];

export default function App() {
  const [activePainting, setActivePainting] = useState<Painting | null>(null);

  const artistBio = "Welcome to my digital gallery. I am a curator and artist dedicated to the preservation of classical techniques in a modern world. This space is a collection of my inspirations and works that speak to the soul of French Impressionism. Through these frames, I invite you to explore the interplay of light and emotion.";
  const handleShareWork = async () => {
  try {
    await navigator.clipboard.writeText(window.location.href);
    alert("Link copied! You can now paste and send the message.");
  } catch (err) {
    console.error("Failed to copy link:", err);
  }
};

const handleRequestDetails = (paintingTitle: string) => {
  const email = "miriamjk567@gmail.com";
  const subject = encodeURIComponent(`Inquiry: ${paintingTitle}`);
  const body = encodeURIComponent(`I am interested in learning more about "${paintingTitle}" in your gallery.`);
  window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
};
  return (
    <div className="min-h-screen font-serif museum-wall relative pb-16 sm:pb-20 selection:bg-[#e6c278] selection:text-[#5c1616]">
      <div className="vignette" />
      <div className="page-trim" />
      
      {/* Header / Navigation */}
      <header className="relative z-50 flex justify-between items-center px-4 sm:px-8 md:px-12 py-4 sm:py-6 border-b border-white/10 bg-[#4a1111]/50 backdrop-blur-md">
        <div className="text-[10px] sm:text-xs tracking-[0.2em] sm:tracking-[0.3em] uppercase opacity-70 font-sans flex items-center gap-2">
          <span>🎨 MJKs Virtual Gallery</span>
        </div>
        {/* Desktop nav */}
        <nav className="hidden md:flex gap-6 lg:gap-8 text-[10px] uppercase tracking-[0.2em] font-sans">
          <a href="#" className="hover:text-[#e6c278] transition-colors">Exhibitions</a>
          <a href="#contact" className="hover:text-[#e6c278] transition-colors">Contact</a>
        </nav>
        {/* Mobile nav */}
        <nav className="flex md:hidden gap-4 text-[9px] uppercase tracking-[0.15em] font-sans">
          <a href="#contact" className="hover:text-[#e6c278] transition-colors opacity-70">Contact</a>
        </nav>
      </header>

      {/* Hero / Bio Section */}
      <section className="pt-10 sm:pt-16 md:pt-24 px-4 sm:px-8 md:px-12 max-w-7xl mx-auto relative z-10">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 1 }}
           className="flex flex-col md:flex-row items-center gap-8 sm:gap-12 md:gap-20 border-l-2 border-[#d4af37] pl-5 sm:pl-8 md:pl-16 font-instrument"
        >
          {/* Profile Picture */}
          <div className="w-44 sm:w-56 md:w-1/3 flex-shrink-0">
            <div className="aspect-[3/4] overflow-hidden translate-y-2 sm:translate-y-4 rounded-sm shadow-2xl ring-1 ring-white/10">
              <img 
                src="/my-profile.jpg"
                alt="MJK Portrait" 
                className="w-full h-full object-cover brightness-105 transition-all duration-1000"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          {/* Bio Text */}
          <div className="flex-1 text-center md:text-left">
            <span className="text-[10px] tracking-[0.4em] sm:tracking-[0.5em] uppercase text-[#e6c278] block mb-3 sm:mb-4 font-sans opacity-70">ARTIST</span>
            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-instrument italic mb-4 sm:mb-6 tracking-tight text-[#f4ece1]">
              Miriam Joseph
            </h1>
            <div className="max-w-2xl mx-auto md:mx-0">
              <p className="text-sm sm:text-lg md:text-xl lg:text-2xl text-[#f4ece1]/90 leading-relaxed font-light italic mb-6 sm:mb-8">
                {artistBio}
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Gallery Divider */}
      <div className="mt-14 sm:mt-24 md:mt-40 mb-8 sm:mb-12 md:mb-16 text-center max-w-7xl mx-auto px-4 sm:px-6 relative z-10 flex items-center gap-4 sm:gap-6">
        <div className="h-px flex-1 bg-white/5"></div>
        <span className="text-[9px] sm:text-[10px] tracking-[0.4em] sm:tracking-[0.6em] uppercase text-[#e6c278]/50 font-sans whitespace-nowrap">Selected Works</span>
        <div className="h-px flex-1 bg-white/5"></div>
      </div>

      {/* Gallery Grid */}
      <section className="mt-8 sm:mt-12 md:mt-24 px-4 sm:px-8 md:px-12 max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 md:gap-16">
        {PAINTINGS.map((painting, index) => (
          <motion.div
            key={painting.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1, duration: 0.8 }}
            className="group cursor-pointer"
            onClick={() => setActivePainting(painting)}
          >
            <div className="gold-frame transition-all duration-500 group-hover:-translate-y-2 sm:group-hover:-translate-y-4 group-hover:shadow-[0_45px_90px_-25px_rgba(0,0,0,0.9)]">
              <div className="bg-black overflow-hidden aspect-[4/5]">
                <img 
                  src={painting.imageUrl} 
                  alt={painting.title}
                  className="w-full h-full object-cover saturate-[1.1] brightness-90 group-hover:brightness-100 transition-all duration-700 opacity-90 group-hover:opacity-100"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
            <div className="mt-4 sm:mt-6 md:mt-8 text-center">
              <h3 className="text-base sm:text-lg md:text-xl font-display text-[#e6c278] italic tracking-wide group-hover:text-white transition-colors">{painting.title}</h3>
              <p className="text-[10px] font-sans text-[#f4ece1]/40 mt-1 tracking-widest uppercase">{painting.year}</p>
            </div>
          </motion.div>
        ))}
      </section>

      {/* Contact Section */}
      <section className="mt-20 sm:mt-32 md:mt-48 px-4 sm:px-8 md:px-12 max-w-7xl mx-auto relative z-10" id="contact">
        <div className="bg-[#4a1111]/30 backdrop-blur-md border border-white/10 p-6 sm:p-10 md:p-20 relative overflow-hidden ring-1 ring-white/10">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#e6c278]/5 blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          
          <div className="flex flex-col md:flex-row gap-10 sm:gap-12 md:gap-16 items-start">
            {/* Left: Info */}
            <div className="flex-1 w-full">
              <span className="text-[10px] tracking-[0.4em] uppercase text-[#e6c278] block mb-3 sm:mb-4 font-sans opacity-70">CORRESPONDENCE</span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display italic mb-5 sm:mb-8 text-[#f4ece1]">Get in Touch</h2>
              <p className="text-sm sm:text-lg md:text-xl text-[#f4ece1]/70 leading-relaxed font-light italic mb-8 sm:mb-12">
                For inquiries regarding any of my paintings, I invite you to reach out.
              </p>

              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-center gap-3 sm:gap-4 group">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-[#e6c278]/30 flex items-center justify-center flex-shrink-0 group-hover:bg-[#e6c278] group-hover:text-[#5c1616] transition-all">
                    <Mail size={15} />
                  </div>
                  <span className="text-[#f4ece1]/80 font-sans tracking-wider text-xs sm:text-sm break-all">miriamjk567@gmail.com</span>
                </div>
                <div className="flex items-center gap-3 sm:gap-4 group">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-[#e6c278]/30 flex items-center justify-center flex-shrink-0 group-hover:bg-[#e6c278] group-hover:text-[#5c1616] transition-all">
                    <Phone size={15} />
                  </div>
                  <span className="text-[#f4ece1]/80 font-sans tracking-wider text-xs sm:text-sm">+971 55 507 8487</span>
                </div>
                <div className="flex items-center gap-3 sm:gap-4 group">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-[#e6c278]/30 flex items-center justify-center flex-shrink-0 group-hover:bg-[#e6c278] group-hover:text-[#5c1616] transition-all">
                    <MapPin size={15} />
                  </div>
                  <span className="text-[#f4ece1]/80 font-sans tracking-wider text-xs sm:text-sm">Bangalore, India</span>
                </div>
              </div>
            </div>

            {/* Right: Form */}
            <div className="flex-1 w-full">
              <form className="space-y-4 sm:space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div className="relative group">
                    <label className="block text-[9px] uppercase tracking-widest text-[#e6c278] mb-2 font-sans opacity-50">Full Name</label>
                    <input className="w-full bg-white/5 border border-white/10 px-3 sm:px-4 py-3 text-sm focus:outline-none focus:border-[#e6c278]/50 transition-colors italic font-light" type="text" placeholder="Your Name" />
                  </div>
                  <div className="relative group">
                    <label className="block text-[9px] uppercase tracking-widest text-[#e6c278] mb-2 font-sans opacity-50">Email Address</label>
                    <input className="w-full bg-white/5 border border-white/10 px-3 sm:px-4 py-3 text-sm focus:outline-none focus:border-[#e6c278]/50 transition-colors italic font-light" type="email" placeholder="email@example.com" />
                  </div>
                </div>
                <div>
                  <label className="block text-[9px] uppercase tracking-widest text-[#e6c278] mb-2 font-sans opacity-50">Your Inquiry</label>
                  <textarea rows={4} className="w-full bg-white/5 border border-white/10 px-3 sm:px-4 py-3 text-sm focus:outline-none focus:border-[#e6c278]/50 transition-colors italic font-light resize-none" placeholder="I am interested in..."></textarea>
                </div>
               
                <a 
                  href="mailto:miriamjk567@gmail.com?subject=Gallery Inquiry" 
                  onClick={(e) => e.stopPropagation()}
                >
                  <button 
                    type="button" 
                    className="w-full sm:w-auto px-8 sm:px-12 py-4 bg-[#e6c278] text-[#5c1616] text-[11px] tracking-[0.3em] uppercase font-bold hover:brightness-110 transition-all flex items-center justify-center gap-3"
                  >
                    <Send size={14} /> Send Inquiry
                  </button>
                </a>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Detail Modal */}
      <AnimatePresence>
        {activePainting && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-sm overflow-y-auto"
          >
            <div className="relative w-full min-h-full p-4 sm:p-6 md:p-12 flex flex-col md:flex-row items-center justify-center gap-6 sm:gap-8 md:gap-16">
              {/* Close Button */}
              <button 
                onClick={() => setActivePainting(null)}
                className="fixed top-4 right-4 sm:top-6 sm:right-6 md:top-8 md:right-8 z-[70] p-2 bg-stone-800 rounded-full text-stone-300 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>

              {/* Painting */}
              <motion.div 
                layoutId={activePainting.id}
                className="w-full md:flex-1 flex justify-center md:justify-end items-center pt-10 md:pt-0"
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ type: 'spring', damping: 25, stiffness: 100 }}
              >
                <div className="gold-frame w-full max-w-[260px] sm:max-w-sm md:max-w-full relative">
                  <div className="bg-black">
                    <img 
                      src={activePainting.imageUrl} 
                      alt={activePainting.title}
                      className="w-full max-h-[38vh] sm:max-h-[45vh] md:max-h-[70vh] object-contain block opacity-100 saturate-[1.2]"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="absolute -inset-10 pointer-events-none bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.2)_0%,transparent_70%)] opacity-50"></div>
                </div>
              </motion.div>

              {/* Info Panel */}
              <motion.div 
                className="w-full md:flex-1 md:max-w-xl pb-6 md:pb-0 md:pr-12"
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                <div className="bg-black/40 p-5 sm:p-8 md:p-14 rounded-sm border border-white/10 backdrop-blur-md shadow-2xl relative">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#e6c278]/5 blur-3xl"></div>
                  
                  <span className="text-[10px] tracking-[0.4em] uppercase text-[#e6c278] block mb-3 sm:mb-4 font-sans opacity-70">PERMANENT EXHIBITION</span>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display italic mb-2 text-[#e6c278] leading-tight">{activePainting.title}</h2>
                  
                  <div className="h-px w-16 sm:w-24 bg-[#e6c278]/30 my-5 sm:my-10" />
                  
                  <p className="text-sm sm:text-base md:text-lg text-[#f4ece1]/90 leading-relaxed font-light italic">
                    {activePainting.description}
                  </p>

                  <div className="grid grid-cols-2 gap-4 sm:gap-10 mt-5 sm:mt-10 pt-5 sm:pt-10 border-t border-white/5">
                    <div>
                      <span className="block text-[9px] uppercase tracking-widest mb-2 opacity-50 font-sans text-stone-400">SPECIFICATIONS</span>
                      <span className="text-xs font-light italic text-[#f4ece1]/80">{activePainting.dimensions}</span>
                    </div>
                    <div>
                      <span className="block text-[9px] uppercase tracking-widest mb-2 opacity-50 font-sans text-stone-400">MEDIUM</span>
                      <span className="text-xs font-light italic text-[#f4ece1]/80">{activePainting.medium}</span>
                    </div>
                  </div>

                  <div className="mt-6 sm:mt-12 flex flex-col sm:flex-row gap-3 sm:gap-4">
  <button 
    onClick={() => handleRequestDetails(activePainting.title)}
    className="w-full sm:flex-1 px-6 sm:px-10 py-3 sm:py-4 bg-[#e6c278] text-[#5c1616] text-[11px] tracking-[0.25em] uppercase hover:brightness-110 transition-all font-sans font-bold"
  >
    Request Details
  </button>
  <button 
    onClick={handleShareWork}
    className="w-full sm:flex-1 px-6 sm:px-10 py-3 sm:py-4 border border-white/20 text-white text-[11px] tracking-[0.25em] uppercase hover:bg-white hover:text-black transition-all font-sans"
  >
    Share Work
  </button>
</div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="mt-20 sm:mt-28 md:mt-40 pb-10 sm:pb-12 text-center text-[#e6c278]/40 relative z-10">
        <div className="w-10 h-10 border border-[#e6c278]/30 rounded-full mx-auto mb-6 flex items-center justify-center hover:-translate-y-1 transition-transform cursor-pointer">
          <span className="text-serif italic text-xs font-bold">L</span>
        </div>
        <p className="text-[9px] tracking-[0.5em] uppercase font-light font-sans mb-2">• MJKs Virtual Gallery •</p>
        <p className="text-[8px] tracking-[0.3em] uppercase opacity-50 font-sans italic">Designed By Shenz @2026</p>
      </footer>
    </div>
  );
}
