import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Sparkles, Compass, Moon, Sun, ExternalLink, Tag } from 'lucide-react';
import { ApartmentSVG } from './apartment/ApartmentSVG';
import { AmbientEffects } from './apartment/AmbientEffects';
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
  const [isNightMode, setIsNightMode] = useState(false);
  const [expandedMobileRoom, setExpandedMobileRoom] = useState('office');

  const handleSelectProduct = (product) => {
    setSelectedProduct(product);
  };

  const handleTriggerEasterEgg = (type) => {
    if (type === 'nighttime') {
      setIsNightMode((prev) => !prev);
    }
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
        <div className="flex items-center gap-3 mb-2">
          <span className="section-kicker">
            <Home className="w-3.5 h-3.5 text-terracotta dark:text-terracotta-glow shrink-0" />
            dan's apartment tour
          </span>
          <div className="organic-divider flex-1" />
        </div>

        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-espresso dark:text-night-text tracking-tight mb-2 flex items-center gap-2">
              Favorite Products
              <Sparkles className="w-5 h-5 text-amber-warm" />
            </h2>
            <p className="text-sm md:text-base text-espresso-muted dark:text-night-muted font-sans leading-relaxed max-w-2xl">
              Welcome to my apartment! Every object in this tour is something I genuinely own, use regularly, and would happily recommend to a close friend. Click any object to explore.
            </p>
          </div>

          {/* Quick Day / Night Easter Egg Toggle */}
          <button
            onClick={() => setIsNightMode((prev) => !prev)}
            className="inline-flex items-center gap-2 text-xs font-mono px-3.5 py-2 rounded-full bg-card-alt dark:bg-night-card-alt border border-espresso/10 dark:border-night-border text-espresso dark:text-night-text hover:scale-105 transition-all self-start sm:self-auto shrink-0 shadow-xs"
          >
            {isNightMode ? (
              <>
                <Sun className="w-3.5 h-3.5 text-amber-warm" />
                <span>Daylight View</span>
              </>
            ) : (
              <>
                <Moon className="w-3.5 h-3.5 text-indigo-400" />
                <span>Night Ambient View</span>
              </>
            )}
          </button>
        </div>
      </motion.div>

      {/* Room Selection Legend Pills */}
      <motion.div variants={fadeUp} className="mb-6">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
          <button
            onClick={() => setSelectedRoom(null)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition-all whitespace-nowrap ${
              selectedRoom === null
                ? 'bg-matcha text-white dark:bg-matcha-dark font-medium shadow-xs'
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
                onClick={() => setSelectedRoom(isSelected ? null : room.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition-all whitespace-nowrap flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-matcha text-white dark:bg-matcha-dark font-medium shadow-xs'
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

      {/* DESKTOP VIEW: Interactive Apartment Floorplan */}
      <motion.div variants={fadeUp} className="hidden md:block relative">
        <AmbientEffects isNightMode={isNightMode} />
        <ApartmentSVG
          selectedProduct={selectedProduct}
          selectedRoom={selectedRoom}
          onSelectProduct={handleSelectProduct}
          onSelectRoom={setSelectedRoom}
          onTriggerEasterEgg={handleTriggerEasterEgg}
        />

        <div className="mt-4 flex items-center justify-between text-xs font-mono text-espresso-muted/70 dark:text-night-muted/70 px-2">
          <span className="flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5 text-terracotta dark:text-terracotta-glow" />
            Hover over objects to inspect · Click to view details
          </span>
          <span>14 Handcrafted Recommendations</span>
        </div>
      </motion.div>

      {/* MOBILE VIEW: Room Cards Stack (Responsive Fallback) */}
      <div className="block md:hidden space-y-4">
        {ROOMS.map((room) => {
          const roomProducts = PRODUCTS.filter((p) => p.room === room.id);
          const isExpanded = expandedMobileRoom === room.id;

          return (
            <Card
              key={room.id}
              className="p-5 bg-card dark:bg-night-card border-espresso/8 dark:border-night-border shadow-cozy"
            >
              <button
                onClick={() => setExpandedMobileRoom(isExpanded ? null : room.id)}
                className="w-full flex items-center justify-between text-left"
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-xl">{room.icon}</span>
                  <div>
                    <h3 className="font-serif text-lg font-bold text-espresso dark:text-night-text">
                      {room.name}
                    </h3>
                    <p className="text-xs text-espresso-muted dark:text-night-muted font-sans">
                      {room.description}
                    </p>
                  </div>
                </div>
                <Badge variant="default" className="font-mono text-[10px]">
                  {roomProducts.length} items
                </Badge>
              </button>

              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="pt-4 mt-4 border-t border-espresso/8 dark:border-night-border space-y-3"
                  >
                    {roomProducts.map((prod) => (
                      <div
                        key={prod.id}
                        onClick={() => handleSelectProduct(prod)}
                        className="p-3.5 rounded-xl bg-mocha-soft/40 dark:bg-night-card-alt border border-espresso/5 dark:border-night-border cursor-pointer hover:border-matcha/40 transition-all"
                      >
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <span className="font-mono text-[10px] font-bold text-terracotta uppercase">
                            {prod.brand}
                          </span>
                          <span className="text-xs">{prod.badges[0]?.emoji}</span>
                        </div>

                        <h4 className="font-serif text-base font-bold text-espresso dark:text-night-text mb-1">
                          {prod.name}
                        </h4>

                        <p className="text-xs font-sans text-espresso-light dark:text-night-muted line-clamp-2 leading-relaxed mb-3">
                          {prod.recommendation}
                        </p>

                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-mono text-matcha-dark dark:text-matcha-glow font-medium flex items-center gap-1">
                            Details & Link →
                          </span>
                        </div>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>
          );
        })}
      </div>

      {/* Slide-in Detail Panel */}
      <ProductDetailPanel
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </motion.section>
  );
}
