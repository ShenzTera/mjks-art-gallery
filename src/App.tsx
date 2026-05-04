/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Phone, MapPin, Send, ChevronLeft, ChevronRight } from 'lucide-react';

// ─────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────

interface GalleryItem {
  id: string;
  title: string;
  year: string;
  description: string;
  // Use a single image OR an array for a slideshow
  imageUrl?: string;
  images?: string[];  // e.g. ['./paintings/water-lilies-1.jpg', './paintings/water-lilies-2.jpg']
  dimensions: string;
  medium: string;
}

interface ClothingItem {
  id: string;
  title: string;
  year: string;
  description: string;
  imageUrl?: string;
  images?: string[];
  size: string;
  material: string;
}

// ─────────────────────────────────────────────
// DATA — swap imageUrl values for your local JPG paths
// Place your JPGs in the /public folder and reference them as './filename.jpg'
// Or use subfolders: './paintings/water-lilies.jpg'
// ─────────────────────────────────────────────

const PAINTINGS: GalleryItem[] = [
  {
    id: 'water-lilies',
    title: 'Water Lilies',
    year: '1919',
    description: 'Part of the famous Nymphéas series, these paintings depict Monet\'s flower garden at Giverny. They were the main focus of his artistic production during the last thirty years of his life.',
    // Single image example:
    imageUrl: './paintings/water-lilies.jpg',
    // Slideshow example (comment out imageUrl above and uncomment below):
    // images: ['./paintings/water-lilies-1.jpg', './paintings/water-lilies-2.jpg', './paintings/water-lilies-3.jpg'],
    dimensions: '200 x 201 cm',
    medium: 'Oil on canvas',
  },
  {
    id: 'impression-sunrise',
    title: 'Impression, Sunrise',
    year: '1872',
    description: 'This painting is credited with inspiring the name of the Impressionist movement. It depicts the port of Le Havre, Monet\'s hometown, at sunrise.',
    imageUrl: './paintings/impression-sunrise.jpg',
    dimensions: '48 x 63 cm',
    medium: 'Oil on canvas',
  },
  {
    id: 'woman-parasol',
    title: 'Woman with a Parasol',
    year: '1875',
    description: 'Also known as Madame Monet and Her Son, this painting captures a casual family moment on a breezy summer day.',
    imageUrl: './paintings/woman-parasol.jpg',
    dimensions: '100 x 81 cm',
    medium: 'Oil on canvas',
  },
  {
    id: 'san-giorgio',
    title: 'San Giorgio Maggiore at Dusk',
    year: '1908',
    description: 'A glowing sunset view of the island monastery in Venice. Monet used a brilliant palette of yellows, oranges, and purples to capture the atmospheric light.',
    imageUrl: './paintings/san-giorgio.jpg',
    dimensions: '65 x 92 cm',
    medium: 'Oil on canvas',
  },
  {
    id: 'the-magpie',
    title: 'The Magpie',
    year: '1869',
    description: 'One of the first Impressionist snowscapes, Monet focuses on the interplay of light and shadow on the snow, with a lone magpie perched on a gate.',
    imageUrl: './paintings/the-magpie.jpg',
    dimensions: '89 x 130 cm',
    medium: 'Oil on canvas',
  },
  {
    id: 'bridge-giverny',
    title: 'The Japanese Bridge',
    year: '1899',
    description: 'Monet built the bridge himself in his garden at Giverny. He painted it dozens of times under different light conditions and seasonal shifts.',
    // Slideshow example with multiple views:
    images: ['./paintings/japanese-bridge-1.jpg', './paintings/japanese-bridge-2.jpg'],
    dimensions: '81 x 100 cm',
    medium: 'Oil on canvas',
  },
];

const CLOTHING: ClothingItem[] = [
  {
    id: 'TIE',
    title: 'Hand-painted Tie ',
    year: '2026',
    description: 'Hand-painted silk tie with a navy base and subtle illustrated details. Unique finish, refined look.',
    images: ['./clothing/tie-2.jpg','./clothing/tie-1.jpg'],
    // images: ['./clothing/silk-dress-front.jpg', './clothing/silk-dress-back.jpg', './clothing/silk-dress-detail.jpg'],
    size: '-',
    material: 'Pure silk, Hand-painted',
  },
  {
    id: 'scarf-sunrise',
    title: 'Hoodie',
    year: '2025',
    description: 'A flowing chiffon scarf printed with the warm palette of Impression, Sunrise. Versatile enough for everyday wear or special occasions.',
    images: ['./clothing/grey-hoodie.jpg','./clothing/black-hoodie.jpg'],
    size: 'S - L',
    material: 'Wool, Hand-painted',
  },
];

// ─────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────

/** Returns the resolved images array from an item (supports single or multi) */
function getImages(item: GalleryItem | ClothingItem): string[] {
  if (item.images && item.images.length > 0) return item.images;
  if (item.imageUrl) return [item.imageUrl];
  return ['./placeholder.jpg'];
}

// ─────────────────────────────────────────────
// SLIDE VIEWER — reusable for both sections
// ─────────────────────────────────────────────

interface SlideViewerProps {
  images: string[];
  alt: string;
  className?: string;
  imgClassName?: string;
}

function SlideViewer({ images, alt, className = '', imgClassName = '' }: SlideViewerProps) {
  const [current, setCurrent] = useState(0);
  const hasMany = images.length > 1;

  const prev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrent(i => (i - 1 + images.length) % images.length);
  };
  const next = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrent(i => (i + 1) % images.length);
  };

  return (
    <div className={`relative group/slide ${className}`}>
      <AnimatePresence mode="wait">
        <motion.img
          key={images[current]}
          src={images[current]}
          alt={`${alt} — view ${current + 1}`}
          className={imgClassName}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          loading="lazy"
          decoding="async"
        />
      </AnimatePresence>

      {hasMany && (
        <>
          <button
            onClick={prev}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 p-1.5 bg-black/60 rounded-full text-white opacity-0 group-hover/slide:opacity-100 transition-opacity"
            aria-label="Previous image"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={next}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 p-1.5 bg-black/60 rounded-full text-white opacity-0 group-hover/slide:opacity-100 transition-opacity"
            aria-label="Next image"
          >
            <ChevronRight size={16} />
          </button>
          {/* Dot indicators */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={(e) => { e.stopPropagation(); setCurrent(i); }}
                className={`w-1.5 h-1.5 rounded-full transition-all ${i === current ? 'bg-[#e6c278] w-3' : 'bg-white/40'}`}
                aria-label={`Go to image ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────
// MODAL — for paintings (with gold frame)
// ─────────────────────────────────────────────

interface PaintingModalProps {
  item: GalleryItem;
  onClose: () => void;
}

function PaintingModal({ item, onClose }: PaintingModalProps) {
  const images = getImages(item);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-sm overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full min-h-full p-4 sm:p-6 md:p-12 flex flex-col md:flex-row items-center justify-center gap-6 sm:gap-8 md:gap-16"
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="fixed top-4 right-4 sm:top-6 sm:right-6 md:top-8 md:right-8 z-[70] p-2 bg-stone-800 rounded-full text-stone-300 hover:text-white transition-colors"
        >
          <X size={20} />
        </button>

        {/* Painting with slideshow */}
        <motion.div
          className="w-full md:flex-1 flex justify-center md:justify-end items-center pt-10 md:pt-0"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ type: 'spring', damping: 25, stiffness: 100 }}
        >
          <div className="gold-frame w-full max-w-[260px] sm:max-w-sm md:max-w-full relative">
            <div className="bg-black">
              <SlideViewer
                images={images}
                alt={item.title}
                imgClassName="w-full max-h-[38vh] sm:max-h-[45vh] md:max-h-[70vh] object-contain block opacity-100 saturate-[1.2]"
              />
            </div>
            <div className="absolute -inset-10 pointer-events-none bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.2)_0%,transparent_70%)] opacity-50" />
          </div>
        </motion.div>

        {/* Info panel */}
        <motion.div
          className="w-full md:flex-1 md:max-w-xl pb-6 md:pb-0 md:pr-12"
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <div className="bg-black/40 p-5 sm:p-8 md:p-14 rounded-sm border border-white/10 backdrop-blur-md shadow-2xl relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#e6c278]/5 blur-3xl" />
            <span className="text-[10px] tracking-[0.4em] uppercase text-[#e6c278] block mb-3 sm:mb-4 font-sans opacity-70">PERMANENT EXHIBITION</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display italic mb-2 text-[#e6c278] leading-tight">{item.title}</h2>
            <div className="h-px w-16 sm:w-24 bg-[#e6c278]/30 my-5 sm:my-10" />
            <p className="text-sm sm:text-base md:text-lg text-[#f4ece1]/90 leading-relaxed font-light italic">{item.description}</p>
            <div className="grid grid-cols-2 gap-4 sm:gap-10 mt-5 sm:mt-10 pt-5 sm:pt-10 border-t border-white/5">
              <div>
                <span className="block text-[9px] uppercase tracking-widest mb-2 opacity-50 font-sans text-stone-400">SPECIFICATIONS</span>
                <span className="text-xs font-light italic text-[#f4ece1]/80">{item.dimensions}</span>
              </div>
              <div>
                <span className="block text-[9px] uppercase tracking-widest mb-2 opacity-50 font-sans text-stone-400">MEDIUM</span>
                <span className="text-xs font-light italic text-[#f4ece1]/80">{item.medium}</span>
              </div>
            </div>
            <div className="mt-6 sm:mt-12 flex flex-col sm:flex-row gap-3 sm:gap-4">
              <button className="w-full sm:flex-1 px-6 sm:px-10 py-3 sm:py-4 bg-[#e6c278] text-[#5c1616] text-[11px] tracking-[0.25em] uppercase hover:brightness-110 transition-all font-sans font-bold">
                Request Details
              </button>
              <button className="w-full sm:flex-1 px-6 sm:px-10 py-3 sm:py-4 border border-white/20 text-white text-[11px] tracking-[0.25em] uppercase hover:bg-white hover:text-black transition-all font-sans">
                Share Work
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────
// MODAL — for clothing (clean/editorial style)
// ─────────────────────────────────────────────

interface ClothingModalProps {
  item: ClothingItem;
  onClose: () => void;
}

function ClothingModal({ item, onClose }: ClothingModalProps) {
  const images = getImages(item);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-sm overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full min-h-full p-4 sm:p-6 md:p-12 flex flex-col md:flex-row items-center justify-center gap-6 sm:gap-8 md:gap-16"
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="fixed top-4 right-4 sm:top-6 sm:right-6 md:top-8 md:right-8 z-[70] p-2 bg-stone-800 rounded-full text-stone-300 hover:text-white transition-colors"
        >
          <X size={20} />
        </button>

        {/* Clothing image with slideshow */}
        <motion.div
          className="w-full md:flex-1 flex justify-center md:justify-end items-center pt-10 md:pt-0"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ type: 'spring', damping: 25, stiffness: 100 }}
        >
          <div className="clothing-frame w-full max-w-[240px] sm:max-w-xs md:max-w-sm relative overflow-hidden">
            <SlideViewer
              images={images}
              alt={item.title}
              imgClassName="w-full max-h-[45vh] sm:max-h-[55vh] md:max-h-[75vh] object-cover block"
            />
          </div>
        </motion.div>

        {/* Info panel */}
        <motion.div
          className="w-full md:flex-1 md:max-w-xl pb-6 md:pb-0 md:pr-12"
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <div className="bg-black/40 p-5 sm:p-8 md:p-14 rounded-sm border border-white/10 backdrop-blur-md shadow-2xl relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#e6c278]/5 blur-3xl" />
            <span className="text-[10px] tracking-[0.4em] uppercase text-[#e6c278] block mb-3 sm:mb-4 font-sans opacity-70">WEARABLE ART</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display italic mb-2 text-[#e6c278] leading-tight">{item.title}</h2>
            <div className="h-px w-16 sm:w-24 bg-[#e6c278]/30 my-5 sm:my-10" />
            <p className="text-sm sm:text-base md:text-lg text-[#f4ece1]/90 leading-relaxed font-light italic">{item.description}</p>
            <div className="grid grid-cols-2 gap-4 sm:gap-10 mt-5 sm:mt-10 pt-5 sm:pt-10 border-t border-white/5">
              <div>
                <span className="block text-[9px] uppercase tracking-widest mb-2 opacity-50 font-sans text-stone-400">SIZE</span>
                <span className="text-xs font-light italic text-[#f4ece1]/80">{item.size}</span>
              </div>
              <div>
                <span className="block text-[9px] uppercase tracking-widest mb-2 opacity-50 font-sans text-stone-400">MATERIAL</span>
                <span className="text-xs font-light italic text-[#f4ece1]/80">{item.material}</span>
              </div>
            </div>
            <div className="mt-6 sm:mt-12 flex flex-col sm:flex-row gap-3 sm:gap-4">
              <a href="mailto:miriamjk567@gmail.com?subject=Clothing Inquiry" className="w-full sm:flex-1">
                <button className="w-full px-6 sm:px-10 py-3 sm:py-4 bg-[#e6c278] text-[#5c1616] text-[11px] tracking-[0.25em] uppercase hover:brightness-110 transition-all font-sans font-bold">
                  Inquire to Purchase
                </button>
              </a>
              <button className="w-full sm:flex-1 px-6 sm:px-10 py-3 sm:py-4 border border-white/20 text-white text-[11px] tracking-[0.25em] uppercase hover:bg-white hover:text-black transition-all font-sans">
                Share
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────
// MAIN APP
// ─────────────────────────────────────────────

export default function App() {
  const [activePainting, setActivePainting] = useState<GalleryItem | null>(null);
  const [activeClothing, setActiveClothing] = useState<ClothingItem | null>(null);

  const artistBio = "Welcome to my digital gallery. I am a curator and artist dedicated to the preservation of classical techniques in a modern world. This space is a collection of my inspirations and works that speak to the soul of French Impressionism. Through these frames, I invite you to explore the interplay of light and emotion.";

  return (
    <div className="min-h-screen font-serif museum-wall relative pb-16 sm:pb-20 selection:bg-[#e6c278] selection:text-[#5c1616]">
      <div className="vignette" />
      <div className="page-trim" />
      
      {/* ── HEADER ── */}
      <header className="relative z-50 flex justify-between items-center px-4 sm:px-8 md:px-12 py-4 sm:py-6 border-b border-white/10 bg-[#4a1111]/50 backdrop-blur-md">
        <div className="text-[10px] sm:text-xs tracking-[0.2em] sm:tracking-[0.3em] uppercase opacity-70 font-sans flex items-center gap-2">
          <span>🎨 MJKs Virtual Gallery</span>
        </div>
        <nav className="hidden md:flex gap-6 lg:gap-8 text-[10px] uppercase tracking-[0.2em] font-sans">
          <a href="#paintings" className="hover:text-[#e6c278] transition-colors">Exhibitions</a>
          <a href="#clothing" className="hover:text-[#e6c278] transition-colors">Clothing</a>
          <a href="#contact" className="hover:text-[#e6c278] transition-colors">Contact</a>
        </nav>
        <nav className="flex md:hidden gap-4 text-[9px] uppercase tracking-[0.15em] font-sans">
          <a href="#clothing" className="hover:text-[#e6c278] transition-colors opacity-70">Clothing</a>
          <a href="#contact" className="hover:text-[#e6c278] transition-colors opacity-70">Contact</a>
        </nav>
      </header>

      {/* ── BIO ── */}
      <section className="pt-10 sm:pt-16 md:pt-24 px-4 sm:px-8 md:px-12 max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="flex flex-col md:flex-row items-center gap-8 sm:gap-12 md:gap-20 border-l-2 border-[#d4af37] pl-5 sm:pl-8 md:pl-16 font-instrument"
        >
          <div className="w-44 sm:w-56 md:w-1/3 flex-shrink-0">
            <div className="aspect-[3/4] overflow-hidden translate-y-2 sm:translate-y-4 rounded-sm shadow-2xl ring-1 ring-white/10">
              <img
                src="./my-profile.jpg"
                alt="MJK Portrait"
                className="w-full h-full object-cover brightness-105 transition-all duration-1000"
                loading="eager"
                decoding="async"
              />
            </div>
          </div>
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

      {/* ── PAINTINGS DIVIDER ── */}
      <div id="paintings" className="mt-14 sm:mt-24 md:mt-40 mb-8 sm:mb-12 md:mb-16 text-center max-w-7xl mx-auto px-4 sm:px-6 relative z-10 flex items-center gap-4 sm:gap-6">
        <div className="h-px flex-1 bg-white/5" />
        <span className="text-[9px] sm:text-[10px] tracking-[0.4em] sm:tracking-[0.6em] uppercase text-[#e6c278]/50 font-sans whitespace-nowrap">Selected Works</span>
        <div className="h-px flex-1 bg-white/5" />
      </div>

      {/* ── PAINTINGS GRID ── */}
      <section className="mt-8 sm:mt-12 md:mt-24 px-4 sm:px-8 md:px-12 max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 md:gap-16">
        {PAINTINGS.map((painting, index) => {
          const imgs = getImages(painting);
          const hasSlides = imgs.length > 1;
          return (
            <motion.div
              key={painting.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              className="group cursor-pointer"
              onClick={() => setActivePainting(painting)}
            >
              <div className="gold-frame transition-all duration-500 group-hover:-translate-y-2 sm:group-hover:-translate-y-4 group-hover:shadow-[0_45px_90px_-25px_rgba(0,0,0,0.9)] relative">
                {hasSlides && (
                  <span className="absolute top-2 right-2 z-10 bg-black/70 text-[#e6c278] text-[9px] tracking-widest uppercase px-2 py-0.5 font-sans pointer-events-none">
                    {imgs.length} views
                  </span>
                )}
                <div className="bg-black overflow-hidden aspect-[4/5]">
                  <img
                    src={imgs[0]}
                    alt={painting.title}
                    className="w-full h-full object-cover saturate-[1.1] brightness-90 group-hover:brightness-100 transition-all duration-700 opacity-90 group-hover:opacity-100"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </div>
              <div className="mt-4 sm:mt-6 md:mt-8 text-center">
                <h3 className="text-base sm:text-lg md:text-xl font-display text-[#e6c278] italic tracking-wide group-hover:text-white transition-colors">{painting.title}</h3>
                <p className="text-[10px] font-sans text-[#f4ece1]/40 mt-1 tracking-widest uppercase">{painting.year}</p>
              </div>
            </motion.div>
          );
        })}
      </section>

      {/* ── CLOTHING DIVIDER ── */}
      <div id="clothing" className="mt-20 sm:mt-32 md:mt-48 mb-8 sm:mb-12 md:mb-16 text-center max-w-7xl mx-auto px-4 sm:px-6 relative z-10 flex items-center gap-4 sm:gap-6">
        <div className="h-px flex-1 bg-white/5" />
        <span className="text-[9px] sm:text-[10px] tracking-[0.4em] sm:tracking-[0.6em] uppercase text-[#e6c278]/50 font-sans whitespace-nowrap">Wearable Art</span>
        <div className="h-px flex-1 bg-white/5" />
      </div>

      {/* ── CLOTHING GRID ── */}
      <section className="mt-8 sm:mt-12 md:mt-16 px-4 sm:px-8 md:px-12 max-w-7xl mx-auto">
        <div className="text-center mb-10 sm:mb-14">
          <p className="text-sm sm:text-base md:text-lg text-[#f4ece1]/60 font-light italic max-w-xl mx-auto leading-relaxed">
            Art you can wear — each piece is inspired by the paintings in this gallery, crafted in limited quantities.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-15 items-start">
          {CLOTHING.map((item, index) => {
            const imgs = getImages(item);
            const hasSlides = imgs.length > 1;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.7 }}
                className="group cursor-pointer"
                onClick={() => setActiveClothing(item)}
              >
                <div className="relative overflow-hidden clothing-card transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)]">
                  {hasSlides && (
                    <span className="absolute top-2 left-2 z-10 bg-black/70 text-[#e6c278] text-[9px] tracking-widest uppercase px-2 py-0.5 font-sans pointer-events-none">
                      {imgs.length} views
                    </span>
                  )}
                  <div className="aspect-[3/4] overflow-hidden bg-[#3a0f0f]">
                    <img
                      src={imgs[0]}
                      alt={item.title}
                      className="w-full h-full object-cover brightness-90 group-hover:brightness-100 group-hover:scale-105 transition-all duration-700 opacity-90 group-hover:opacity-100"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                </div>
                <div className="mt-3 sm:mt-5 text-center">
                  <h3 className="text-sm sm:text-base md:text-lg font-display text-[#e6c278] italic tracking-wide group-hover:text-white transition-colors leading-snug">{item.title}</h3>
                  <p className="text-[9px] sm:text-[10px] font-sans text-[#f4ece1]/35 mt-1 tracking-widest uppercase">{item.material.split(',')[0]}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section className="mt-20 sm:mt-32 md:mt-48 px-4 sm:px-8 md:px-12 max-w-7xl mx-auto relative z-10" id="contact">
        <div className="bg-[#4a1111]/30 backdrop-blur-md border border-white/10 p-6 sm:p-10 md:p-20 relative overflow-hidden ring-1 ring-white/10">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#e6c278]/5 blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="flex flex-col md:flex-row gap-10 sm:gap-12 md:gap-16 items-start">
            <div className="flex-1 w-full">
              <span className="text-[10px] tracking-[0.4em] uppercase text-[#e6c278] block mb-3 sm:mb-4 font-sans opacity-70">CORRESPONDENCE</span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display italic mb-5 sm:mb-8 text-[#f4ece1]">Get in Touch</h2>
              <p className="text-sm sm:text-lg md:text-xl text-[#f4ece1]/70 leading-relaxed font-light italic mb-8 sm:mb-12">
                For inquiries regarding paintings or clothing pieces, I invite you to reach out.
              </p>
              <div className="space-y-4 sm:space-y-6">
                {[
                  { icon: <Mail size={15} />, text: 'miriamjk567@gmail.com' },
                  { icon: <Phone size={15} />, text: '+91 81 2907 4012' },
                  { icon: <MapPin size={15} />, text: 'Bangalore, India' },
                ].map(({ icon, text }) => (
                  <div key={text} className="flex items-center gap-3 sm:gap-4 group">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-[#e6c278]/30 flex items-center justify-center flex-shrink-0 group-hover:bg-[#e6c278] group-hover:text-[#5c1616] transition-all">
                      {icon}
                    </div>
                    <span className="text-[#f4ece1]/80 font-sans tracking-wider text-xs sm:text-sm break-all">{text}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-1 w-full">
              <form className="space-y-4 sm:space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label className="block text-[9px] uppercase tracking-widest text-[#e6c278] mb-2 font-sans opacity-50">Full Name</label>
                    <input className="w-full bg-white/5 border border-white/10 px-3 sm:px-4 py-3 focus:outline-none focus:border-[#e6c278]/50 transition-colors italic font-light" type="text" placeholder="Your Name" />
                  </div>
                  <div>
                    <label className="block text-[9px] uppercase tracking-widest text-[#e6c278] mb-2 font-sans opacity-50">Email Address</label>
                    <input className="w-full bg-white/5 border border-white/10 px-3 sm:px-4 py-3 focus:outline-none focus:border-[#e6c278]/50 transition-colors italic font-light" type="email" placeholder="email@example.com" />
                  </div>
                </div>
                <div>
                  <label className="block text-[9px] uppercase tracking-widest text-[#e6c278] mb-2 font-sans opacity-50">Your Inquiry</label>
                  <textarea rows={4} className="w-full bg-white/5 border border-white/10 px-3 sm:px-4 py-3 focus:outline-none focus:border-[#e6c278]/50 transition-colors italic font-light resize-none" placeholder="I am interested in..." />
                </div>
                <a href="mailto:miriamjk567@gmail.com?subject=Gallery Inquiry" onClick={e => e.stopPropagation()}>
                  <button type="button" className="w-full sm:w-auto px-8 sm:px-12 py-4 bg-[#e6c278] text-[#5c1616] text-[11px] tracking-[0.3em] uppercase font-bold hover:brightness-110 transition-all flex items-center justify-center gap-3">
                    <Send size={14} /> Send Inquiry
                  </button>
                </a>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ── MODALS ── */}
      <AnimatePresence>
        {activePainting && <PaintingModal item={activePainting} onClose={() => setActivePainting(null)} />}
      </AnimatePresence>
      <AnimatePresence>
        {activeClothing && <ClothingModal item={activeClothing} onClose={() => setActiveClothing(null)} />}
      </AnimatePresence>

      {/* ── FOOTER ── */}
      <footer className="mt-20 sm:mt-28 md:mt-40 pb-10 sm:pb-12 text-center text-[#e6c278]/40 relative z-10">
        <div className="w-10 h-10 border border-[#e6c278]/30 rounded-full mx-auto mb-6 flex items-center justify-center hover:-translate-y-1 transition-transform cursor-pointer">
          <span className="text-serif italic text-xs font-bold">L</span>
        </div>
        <p className="text-[9px] tracking-[0.5em] uppercase font-light font-sans mb-2">• MJKs Virtual Gallery •</p>
        <p className="text-[8px] tracking-[0.3em] uppercase opacity-50 font-sans italic">Designed By Shenz</p>
      </footer>
    </div>
  );
}
