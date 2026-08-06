import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Sparkles, Compass, ExternalLink, Tag, Grid, LayoutGrid, CheckCircle } from 'lucide-react';
import { ApartmentSVG } from './apartment/ApartmentSVG';
import { ProductDetailPanel } from './apartment/ProductDetailPanel';
import { ROOMS, PRODUCTS } from '../data/products';
import { Card, CardTitle } from './ui/card';
import { Badge } from './ui/badge';

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const fadeUp = {
  hidden: { y: 18, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

export function ProductRecsSection() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(null);

  const handleSelectProduct = (product) => {
    setSelectedProduct(product);
  };

  const handleSelectRoom = (roomId) => {
    setSelectedRoom((prev) => (prev === roomId ? null : roomId));
  };

  const filteredProducts = selectedRoom
    ? PRODUCTS.filter((p) => p.room === selectedRoom)
    : PRODUCTS;

  return (
    <motion.section
      variants={stagger}
      initial="hidden"
      animate="show"
      className="max-w-6xl mx-auto mb-14"
    >
      {/* Header Banner */}
      <motion.div variants={fadeUp} className="mb-7">
        <div>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-espresso dark:text-night-text tracking-tight mb-2 flex items-center gap-2">
            Favorite Products
            <Sparkles className="w-5 h-5 text-amber-warm" />
          </h2>
          
          {/* Realigned Kicker directly under Favorite Products */}
          <div className="flex items-center gap-3 mb-3">
            <span className="section-kicker">
              <Home className="w-3.5 h-3.5 text-terracotta dark:text-terracotta-glow shrink-0" />
              dan's apartment tour
            </span>
            <div className="organic-divider flex-1" />
          </div>

          {/* Horizontally Extended Blurb */}
          <p className="text-sm md:text-base text-espresso-muted dark:text-night-muted font-sans leading-relaxed w-full max-w-4xl">
            Welcome to my apartment! Every object in this tour is something I genuinely own, use regularly, and would happily recommend to a close friend. Click any labeled object or browse the showcase cards below.
          </p>
        </div>
      </motion.div>

      {/* Room Legend Pill Bar */}
      <motion.div variants={fadeUp} className="mb-6">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
          <button
            onClick={() => setSelectedRoom(null)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition-all whitespace-nowrap ${
              selectedRoom === null
                ? 'bg-matcha text-white dark:bg-matcha-dark font-semibold shadow-xs'
                : 'bg-card/80 dark:bg-night-card/80 text-espresso-muted dark:text-night-muted hover:text-espresso border border-espresso/8 dark:border-night-border'
            }`}
          >
            All Rooms ({PRODUCTS.length})
          </button>

          {ROOMS.map((room) => {
            const isSelected = selectedRoom === room.id;
            const roomProductCount = PRODUCTS.filter((p) => p.room === room.id).length;
            return (
              <button
                key={room.id}
                onClick={() => handleSelectRoom(room.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition-all whitespace-nowrap flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-matcha text-white dark:bg-matcha-dark font-semibold shadow-xs'
                    : 'bg-card/80 dark:bg-night-card/80 text-espresso-muted dark:text-night-muted hover:text-espresso border border-espresso/8 dark:border-night-border'
                }`}
              >
                <span>{room.icon}</span>
                <span>{room.name}</span>
                <span className="opacity-60 text-[10px]">({roomProductCount})</span>
              </button>
            );
          })}
        </div>
      </motion.div>

      {/* DESKTOP INTERACTIVE APARTMENT FLOORPLAN */}
      <motion.div variants={fadeUp} className="hidden md:block relative mb-12">
        <ApartmentSVG
          selectedProduct={selectedProduct}
          selectedRoom={selectedRoom}
          onSelectProduct={handleSelectProduct}
          onSelectRoom={handleSelectRoom}
        />

        <div className="mt-4 flex items-center justify-between text-xs font-mono text-espresso-muted/70 dark:text-night-muted/70 px-2">
          <span className="flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5 text-terracotta dark:text-terracotta-glow" />
            Click any labeled object in the apartment to open its full recommendation details
          </span>
          <span>15 Handcrafted Products</span>
        </div>
      </motion.div>

      {/* PRODUCT SHOWCASE CARDS GRID (Intuitive list view for Desktop & Mobile) */}
      <motion.div variants={fadeUp} className="space-y-6">
        <div className="flex items-center justify-between border-b border-espresso/10 dark:border-night-border pb-3">
          <h3 className="font-serif text-2xl font-bold text-espresso dark:text-night-text tracking-tight flex items-center gap-2">
            <LayoutGrid className="w-5 h-5 text-matcha-dark dark:text-matcha-glow" />
            Product Showcase Grid
            {selectedRoom && (
              <span className="text-xs font-mono text-terracotta uppercase font-normal">
                · {ROOMS.find((r) => r.id === selectedRoom)?.name} Filtered
              </span>
            )}
          </h3>

          <span className="text-xs font-mono text-espresso-muted dark:text-night-muted">
            Showing {filteredProducts.length} of {PRODUCTS.length} items
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredProducts.map((prod) => (
            <motion.div
              key={prod.id}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
            >
              <Card
                className="p-5 bg-card dark:bg-night-card border-espresso/8 dark:border-night-border hover:border-matcha/50 transition-all duration-300 shadow-cozy h-full flex flex-col justify-between cursor-pointer group relative overflow-hidden"
                onClick={() => handleSelectProduct(prod)}
              >
                <div>
                  {/* Top Category / Brand & Badge */}
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="font-mono text-[10px] font-bold text-terracotta dark:text-terracotta-glow uppercase tracking-wider">
                      {prod.brand} · {prod.roomLabel}
                    </span>
                    <Badge variant={prod.badges[0]?.variant === 'terracotta' ? 'terracotta' : 'matcha'} className="text-[10px] py-0.5 px-2 font-mono">
                      {prod.badges[0]?.emoji} {prod.badges[0]?.label}
                    </Badge>
                  </div>

                  {/* Product Title */}
                  <h4 className="font-serif text-lg font-bold text-espresso dark:text-night-text group-hover:text-matcha-dark dark:group-hover:text-matcha-glow transition-colors mb-2 leading-tight">
                    {prod.name}
                  </h4>

                  {/* Recommendation snippet */}
                  <p className="text-xs font-sans text-espresso-light dark:text-night-muted line-clamp-3 leading-relaxed mb-4">
                    "{prod.recommendation}"
                  </p>
                </div>

                {/* Footer Action */}
                <div className="pt-3 border-t border-espresso/6 dark:border-night-border flex items-center justify-between text-xs font-mono text-matcha-dark dark:text-matcha-glow font-medium group-hover:translate-x-0.5 transition-transform">
                  <span className="flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5 text-amber-warm" />
                    Inspect Details
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-70 group-hover:opacity-100" />
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Slide-in Detail Panel */}
      <ProductDetailPanel
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </motion.section>
  );
}
