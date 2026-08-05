import React from 'react';
import { motion } from 'framer-motion';
import { RoomGroup } from './RoomGroup';
import { ProductObject } from './ProductObject';
import { ROOMS, PRODUCTS } from '../../data/products';

export function ApartmentSVG({
  selectedProduct,
  selectedRoom,
  onSelectProduct,
  onSelectRoom,
  onTriggerEasterEgg,
}) {
  const getProduct = (id) => PRODUCTS.find((p) => p.id === id);

  return (
    <div className="relative w-full max-w-[1100px] mx-auto aspect-[16/10] bg-parchment-dark/50 dark:bg-night-card-alt/40 border border-espresso/10 dark:border-night-border rounded-cozy-xl shadow-2xl p-2 sm:p-4 overflow-hidden select-none">
      <svg
        viewBox="0 0 1000 650"
        className="w-full h-full drop-shadow-md"
        style={{ transformStyle: 'preserve-3d' }}
      >
        <defs>
          {/* Gradients */}
          <linearGradient id="officeFloor" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#efe8dc" />
            <stop offset="100%" stopColor="#e2d8c7" />
          </linearGradient>

          <linearGradient id="bedroomFloor" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fdf6ee" />
            <stop offset="100%" stopColor="#f4ded4" />
          </linearGradient>

          <linearGradient id="bathroomFloor" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#eef2ea" />
            <stop offset="100%" stopColor="#d2dcc8" />
          </linearGradient>

          <linearGradient id="kitchenFloor" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f2eae0" />
            <stop offset="100%" stopColor="#e8d5c0" />
          </linearGradient>

          <linearGradient id="closetFloor" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f5ece2" />
            <stop offset="100%" stopColor="#e2d4c4" />
          </linearGradient>

          <linearGradient id="entrywayFloor" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#efe5d8" />
            <stop offset="100%" stopColor="#d9cbb7" />
          </linearGradient>

          {/* Plant sway animation filter */}
          <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* ── APARTMENT WALLS & FLOOROUTLINE ── */}
        {/* Outer Floor Base */}
        <rect
          x="30"
          y="20"
          width="940"
          height="610"
          rx="24"
          className="fill-parchment dark:fill-night-bg stroke-espresso/15 dark:stroke-night-border stroke-2"
        />

        {/* Hallway / Central Corridor Decor */}
        <path
          d="M 330 310 L 670 310"
          stroke="currentColor"
          strokeWidth="3"
          strokeDasharray="6,6"
          className="text-terracotta/30 dark:text-terracotta-glow/30"
        />

        {/* ============================================================ */}
        {/* 1. OFFICE ROOM (Top-Left: 50, 40, width: 440, height: 260) */}
        {/* ============================================================ */}
        <RoomGroup
          room={ROOMS[0]}
          x={50}
          y={40}
          width={440}
          height={260}
          floorColor="fill-[url(#officeFloor)] dark:fill-night-card"
          isSelected={selectedRoom === 'office'}
          onSelectRoom={onSelectRoom}
        >
          {/* Wooden Desk */}
          <rect
            x="70"
            y="70"
            width="260"
            height="120"
            rx="12"
            className="fill-mocha-light/80 dark:fill-mocha/40 stroke-espresso/20 dark:stroke-night-border stroke-2"
          />
          <rect
            x="75"
            y="75"
            width="250"
            height="110"
            rx="8"
            className="fill-mocha/20 dark:fill-mocha/20"
          />

          {/* Desk Lamp (Decor) */}
          <circle cx="95" cy="95" r="14" className="fill-amber-warm/80" />
          <path
            d="M 95 95 Q 110 80 125 90"
            stroke="#d49b5c"
            strokeWidth="3"
            fill="none"
          />

          {/* Plant in Corner */}
          <g transform="translate(360, 60)">
            <ellipse cx="20" cy="35" rx="16" ry="8" className="fill-espresso/20" />
            <rect x="8" y="20" width="24" height="20" rx="4" className="fill-terracotta dark:fill-terracotta-dark" />
            <motion.path
              d="M 20 20 Q 5 0 -5 15 M 20 20 Q 35 2 45 18 M 20 20 Q 20 -10 20 -2"
              stroke="#556347"
              strokeWidth="5"
              strokeLinecap="round"
              fill="none"
              animate={{ rotate: [-2, 2, -2] }}
              transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
            />
          </g>

          {/* PRODUCT 1: Herman Miller Aeron Chair */}
          <ProductObject
            product={getProduct('herman-miller-aeron')}
            onSelect={onSelectProduct}
            onTriggerEasterEgg={onTriggerEasterEgg}
            x={150}
            y={150}
            width={100}
            height={90}
          >
            {/* Aeron Chair SVG Artwork */}
            <circle cx="50" cy="45" r="32" className="fill-espresso/90 dark:fill-night-card-alt stroke-terracotta/40 stroke-2" />
            {/* Mesh pattern backrest */}
            <rect x="25" y="22" width="50" height="38" rx="10" className="fill-espresso dark:fill-night-bg stroke-espresso-light stroke-2" />
            <line x1="32" y1="28" x2="68" y2="28" stroke="#8a9a7b" strokeWidth="1.5" />
            <line x1="32" y1="36" x2="68" y2="36" stroke="#8a9a7b" strokeWidth="1.5" />
            <line x1="32" y1="44" x2="68" y2="44" stroke="#8a9a7b" strokeWidth="1.5" />
            {/* Armrests */}
            <rect x="18" y="38" width="10" height="22" rx="4" className="fill-espresso-light" />
            <rect x="72" y="38" width="10" height="22" rx="4" className="fill-espresso-light" />
            {/* Wheel base */}
            <path d="M 50 64 L 25 80 M 50 64 L 75 80 M 50 64 L 50 82" stroke="#6b5e52" strokeWidth="3" />
          </ProductObject>

          {/* PRODUCT 2: Surface Laptop 7 */}
          <ProductObject
            product={getProduct('surface-laptop-7')}
            onSelect={onSelectProduct}
            onTriggerEasterEgg={onTriggerEasterEgg}
            x={130}
            y={80}
            width={85}
            height={60}
          >
            {/* Laptop Base & Keyboard */}
            <rect x="10" y="32" width="65" height="22" rx="4" className="fill-slate-300 dark:fill-slate-600 stroke-slate-500 stroke-1" />
            <rect x="18" y="35" width="49" height="12" rx="2" className="fill-slate-800" />
            <rect x="32" y="49" width="20" height="4" rx="1" className="fill-slate-400" />
            {/* Opened Screen */}
            <rect x="14" y="5" width="57" height="30" rx="3" className="fill-slate-800 stroke-slate-400 stroke-2" />
            <rect x="17" y="8" width="51" height="24" rx="2" className="fill-sky-500/80 dark:fill-sky-600/90" />
            {/* Microsoft Windows logo doodle */}
            <g transform="translate(38, 16) scale(0.6)">
              <rect x="0" y="0" width="5" height="5" className="fill-white" />
              <rect x="6" y="0" width="5" height="5" className="fill-white" />
              <rect x="0" y="6" width="5" height="5" className="fill-white" />
              <rect x="6" y="6" width="5" height="5" className="fill-white" />
            </g>
          </ProductObject>

          {/* PRODUCT 3: iPhone 17 Pro */}
          <ProductObject
            product={getProduct('iphone-17-pro')}
            onSelect={onSelectProduct}
            onTriggerEasterEgg={onTriggerEasterEgg}
            x={235}
            y={95}
            width={40}
            height={50}
          >
            <rect x="8" y="8" width="24" height="40" rx="5" className="fill-slate-900 stroke-amber-warm/80 stroke-2" />
            <rect x="10" y="10" width="20" height="36" rx="4" className="fill-slate-950" />
            {/* Camera bump */}
            <circle cx="15" cy="15" r="3" className="fill-slate-700" />
            <circle cx="21" cy="15" r="3" className="fill-slate-700" />
            <circle cx="15" cy="21" r="3" className="fill-slate-700" />
          </ProductObject>

          {/* PRODUCT 4: Apple Watch */}
          <ProductObject
            product={getProduct('apple-watch')}
            onSelect={onSelectProduct}
            onTriggerEasterEgg={onTriggerEasterEgg}
            x={285}
            y={105}
            width={40}
            height={40}
          >
            {/* Watch Band */}
            <rect x="16" y="2" width="10" height="36" rx="3" className="fill-espresso-muted dark:fill-night-muted" />
            {/* Watch Face */}
            <rect x="11" y="10" width="20" height="22" rx="6" className="fill-slate-900 stroke-matcha stroke-2" />
            {/* Screen ring indicator */}
            <circle cx="21" cy="21" r="5" fill="none" stroke="#8a9a7b" strokeWidth="2" strokeDasharray="20 5" />
          </ProductObject>
        </RoomGroup>

        {/* ============================================================ */}
        {/* 2. BEDROOM (Top-Right: 510, 40, width: 440, height: 260) */}
        {/* ============================================================ */}
        <RoomGroup
          room={ROOMS[1]}
          x={510}
          y={40}
          width={440}
          height={260}
          floorColor="fill-[url(#bedroomFloor)] dark:fill-night-card-alt"
          isSelected={selectedRoom === 'bedroom'}
          onSelectRoom={onSelectRoom}
        >
          {/* Cozy Woven Rug */}
          <ellipse cx="230" cy="160" rx="140" ry="60" className="fill-terracotta-soft/60 dark:fill-terracotta/20 stroke-terracotta/20 stroke-2" />

          {/* PRODUCT 5: Memory Foam Mattress (Bed Frame) */}
          <ProductObject
            product={getProduct('memory-foam-mattress')}
            onSelect={onSelectProduct}
            onTriggerEasterEgg={onTriggerEasterEgg}
            x={70}
            y={60}
            width={240}
            height={160}
          >
            {/* Wooden Headboard */}
            <rect x="10" y="10" width="220" height="30" rx="6" className="fill-mocha-light dark:fill-mocha stroke-espresso/30 stroke-2" />
            {/* Mattress Base */}
            <rect x="15" y="32" width="210" height="120" rx="14" className="fill-card dark:fill-night-card stroke-espresso/15 dark:stroke-night-border stroke-2" />
            {/* Blanket / Duvet */}
            <rect x="15" y="70" width="210" height="82" rx="10" className="fill-matcha-soft dark:fill-matcha-dark/60 stroke-matcha/40 stroke-2" />
            {/* Decorative duvet crease line */}
            <path d="M 15 70 Q 120 85 225 70" stroke="#8a9a7b" strokeWidth="3" fill="none" />
          </ProductObject>

          {/* PRODUCT 6: Purple Pillow */}
          <ProductObject
            product={getProduct('purple-pillow')}
            onSelect={onSelectProduct}
            onTriggerEasterEgg={onTriggerEasterEgg}
            x={100}
            y={80}
            width={80}
            height={45}
          >
            {/* Pillow Body */}
            <rect x="5" y="5" width="70" height="35" rx="10" className="fill-purple-100 dark:fill-purple-950 stroke-purple-400 stroke-2" />
            {/* Purple Gel Grid Mesh Texture Doodle */}
            <path d="M 15 15 H 65 M 15 23 H 65 M 15 30 H 65" stroke="#a855f7" strokeWidth="1.5" strokeDasharray="3,3" />
          </ProductObject>

          {/* Nightstand & Water (Decor) */}
          <g transform="translate(325, 70)">
            <rect x="0" y="0" width="70" height="70" rx="10" className="fill-mocha-soft dark:fill-night-card border stroke-espresso/10" />
            <rect x="8" y="12" width="54" height="20" rx="4" className="fill-card dark:fill-night-card-alt" />
            <circle cx="35" cy="50" r="10" className="fill-amber-warm/80" />
          </g>
        </RoomGroup>

        {/* ============================================================ */}
        {/* 3. BATHROOM (Middle-Right: 510, 320, width: 440, height: 140) */}
        {/* ============================================================ */}
        <RoomGroup
          room={ROOMS[2]}
          x={510}
          y={320}
          width={440}
          height={140}
          floorColor="fill-[url(#bathroomFloor)] dark:fill-night-card"
          isSelected={selectedRoom === 'bathroom'}
          onSelectRoom={onSelectRoom}
        >
          {/* Vanity Counter */}
          <rect x="40" y="45" width="360" height="70" rx="10" className="fill-card dark:fill-night-card-alt stroke-matcha/30 stroke-2" />
          <ellipse cx="120" cy="80" rx="45" ry="25" className="fill-matcha-soft/60 dark:fill-night-card stroke-matcha/30 stroke-2" />
          {/* Mirror */}
          <rect x="60" y="10" width="120" height="30" rx="6" className="fill-sky-100/60 dark:fill-sky-950/60 stroke-sky-300 stroke-2" />

          {/* PRODUCT 7: Oral-B Electric Toothbrush */}
          <ProductObject
            product={getProduct('oralb-pro-1000')}
            onSelect={onSelectProduct}
            onTriggerEasterEgg={onTriggerEasterEgg}
            x={190}
            y={50}
            width={40}
            height={65}
          >
            {/* Toothbrush Body */}
            <rect x="15" y="20" width="10" height="40" rx="4" className="fill-sky-500 stroke-sky-700 stroke-1" />
            <rect x="17" y="5" width="6" height="18" rx="2" className="fill-white stroke-slate-300 stroke-1" />
            <circle cx="20" cy="30" r="2.5" className="fill-white" />
          </ProductObject>

          {/* PRODUCT 8: GOODAL Sunscreen */}
          <ProductObject
            product={getProduct('goodal-sunscreen')}
            onSelect={onSelectProduct}
            onTriggerEasterEgg={onTriggerEasterEgg}
            x={245}
            y={50}
            width={45}
            height={65}
          >
            {/* Sunscreen Tube */}
            <path d="M 12 15 L 33 15 L 37 55 L 8 55 Z" className="fill-emerald-100 dark:fill-emerald-900 stroke-emerald-500 stroke-2" />
            <rect x="14" y="55" width="17" height="8" rx="2" className="fill-emerald-600" />
            <circle cx="22.5" cy="32" r="6" className="fill-amber-warm" />
          </ProductObject>

          {/* PRODUCT 9: ABIB Sunstick */}
          <ProductObject
            product={getProduct('abib-sunstick')}
            onSelect={onSelectProduct}
            onTriggerEasterEgg={onTriggerEasterEgg}
            x={305}
            y={55}
            width={45}
            height={60}
          >
            {/* Curved Sunstick Bar */}
            <rect x="10" y="15" width="25" height="38" rx="10" className="fill-slate-100 dark:fill-slate-800 stroke-slate-400 stroke-2" />
            <rect x="12" y="38" width="21" height="12" rx="4" className="fill-emerald-500" />
          </ProductObject>
        </RoomGroup>

        {/* ============================================================ */}
        {/* 4. KITCHEN (Bottom-Left: 50, 320, width: 440, height: 290) */}
        {/* ============================================================ */}
        <RoomGroup
          room={ROOMS[3]}
          x={50}
          y={320}
          width={440}
          height={290}
          floorColor="fill-[url(#kitchenFloor)] dark:fill-night-card-alt"
          isSelected={selectedRoom === 'kitchen'}
          onSelectRoom={onSelectRoom}
        >
          {/* Kitchen Countertop Island */}
          <rect x="40" y="60" width="360" height="180" rx="16" className="fill-card dark:fill-night-card stroke-espresso/15 stroke-2" />
          <rect x="50" y="70" width="340" height="160" rx="10" className="fill-mocha-soft/30 dark:fill-night-card-alt" />

          {/* Steaming Coffee / Tea Cup Decor */}
          <g transform="translate(90, 110)">
            <rect x="0" y="10" width="28" height="24" rx="6" className="fill-terracotta dark:fill-terracotta-glow" />
            <path d="M 28 16 Q 36 22 28 28" stroke="#b86f52" strokeWidth="3" fill="none" />
            {/* Rising Steam Lines */}
            <motion.path
              d="M 6 4 Q 10 -4 6 -10 M 18 4 Q 22 -4 18 -10"
              stroke="#8a9a7b"
              strokeWidth="2"
              fill="none"
              animate={{ y: [-2, -8, -2], opacity: [0.2, 0.8, 0.2] }}
              transition={{ repeat: Infinity, duration: 2.5 }}
            />
          </g>

          {/* Fruit Bowl Decor */}
          <circle cx="310" cy="130" r="22" className="fill-amber-light dark:fill-mocha/60" />
          <circle cx="304" cy="126" r="7" className="fill-emerald-500" />
          <circle cx="316" cy="124" r="8" className="fill-amber-warm" />
          <circle cx="310" cy="134" r="7" className="fill-rose-400" />

          {/* PRODUCT 10: Nutribullet Pro */}
          <ProductObject
            product={getProduct('nutribullet-pro')}
            onSelect={onSelectProduct}
            onTriggerEasterEgg={onTriggerEasterEgg}
            x={180}
            y={90}
            width={75}
            height={110}
          >
            {/* Blender Motor Base */}
            <rect x="18" y="55" width="38" height="45" rx="6" className="fill-slate-800 dark:fill-slate-900 stroke-slate-500 stroke-2" />
            <rect x="22" y="85" width="30" height="4" rx="2" className="fill-slate-400" />
            {/* Transparent Bullet Cup */}
            <path d="M 20 55 L 20 18 Q 20 8 37 8 Q 54 8 54 18 L 54 55 Z" className="fill-emerald-400/40 dark:fill-emerald-500/40 stroke-emerald-300 stroke-2" />
            {/* Green Smoothie Content */}
            <path d="M 22 55 L 22 25 Q 37 20 52 25 L 52 55 Z" className="fill-emerald-600/80" />
          </ProductObject>
        </RoomGroup>

        {/* ============================================================ */}
        {/* 5. CLOSET (Middle-Left: 50, 40 + decor area overlay) */}
        {/* ============================================================ */}
        <g transform="translate(70, 190)">
          {/* Wardrobe Wooden Rack */}
          <rect x="0" y="0" width="220" height="85" rx="8" className="fill-mocha-soft/60 dark:fill-night-card border stroke-espresso/10" />

          {/* PRODUCT 11: Buck Mason Vintage Thermal */}
          <ProductObject
            product={getProduct('buck-mason-thermal')}
            onSelect={onSelectProduct}
            onTriggerEasterEgg={onTriggerEasterEgg}
            x={15}
            y={10}
            width={65}
            height={65}
          >
            {/* Hanger */}
            <path d="M 32 8 Q 32 0 26 5 M 10 20 L 32 10 L 54 20" stroke="#6b5e52" strokeWidth="2.5" fill="none" />
            {/* Thermal Long Sleeve Shirt */}
            <path d="M 12 20 L 22 18 L 42 18 L 52 20 L 60 45 L 50 48 L 46 28 L 46 60 L 18 60 L 18 28 L 14 48 L 4 45 Z" className="fill-stone-100 dark:fill-stone-300 stroke-stone-400 stroke-2" />
          </ProductObject>

          {/* PRODUCT 12: Asics Gel Nimbus 27 */}
          <ProductObject
            product={getProduct('asics-nimbus-27')}
            onSelect={onSelectProduct}
            onTriggerEasterEgg={onTriggerEasterEgg}
            x={90}
            y={20}
            width={65}
            height={50}
          >
            {/* Cloud Cushion Sole */}
            <path d="M 8 34 Q 30 42 58 34 L 58 42 Q 30 50 8 42 Z" className="fill-sky-400 dark:fill-sky-600" />
            {/* Sneaker Upper */}
            <path d="M 10 34 Q 15 15 32 15 Q 48 18 56 34 Z" className="fill-slate-100 dark:fill-slate-800 stroke-slate-400 stroke-2" />
            <path d="M 24 22 L 40 32 M 30 20 L 46 30" stroke="#38bdf8" strokeWidth="2" />
          </ProductObject>

          {/* PRODUCT 13: Le Labo Bergamote 22 */}
          <ProductObject
            product={getProduct('le-labo-bergamote-22')}
            onSelect={onSelectProduct}
            onTriggerEasterEgg={onTriggerEasterEgg}
            x={160}
            y={15}
            width={45}
            height={60}
          >
            {/* Glass Perfume Bottle */}
            <rect x="10" y="20" width="25" height="35" rx="4" className="fill-amber-100/80 dark:fill-amber-950/80 stroke-amber-600 stroke-2" />
            {/* Vintage Label */}
            <rect x="13" y="26" width="19" height="20" rx="2" className="fill-amber-50 stroke-amber-300 stroke-1" />
            <text x="16" y="38" className="text-[7px] font-mono font-bold fill-espresso">22</text>
            {/* Spray Cap */}
            <rect x="18" y="10" width="9" height="10" rx="2" className="fill-slate-400" />
          </ProductObject>
        </g>

        {/* ============================================================ */}
        {/* 6. ENTRYWAY (Bottom-Right: 510, 480, width: 440, height: 130) */}
        {/* ============================================================ */}
        <RoomGroup
          room={ROOMS[5]}
          x={510}
          y={480}
          width={440}
          height={130}
          floorColor="fill-[url(#entrywayFloor)] dark:fill-night-card"
          isSelected={selectedRoom === 'entryway'}
          onSelectRoom={onSelectRoom}
        >
          {/* Front Door */}
          <rect x="340" y="15" width="80" height="100" rx="6" className="fill-mocha dark:fill-mocha-dark stroke-espresso stroke-2" />
          <circle cx="355" cy="65" r="5" className="fill-amber-warm" />

          {/* Key Hook Wall Rack */}
          <rect x="50" y="20" width="120" height="14" rx="4" className="fill-mocha-light dark:fill-mocha" />
          <circle cx="70" cy="34" r="3" className="fill-espresso" />
          <circle cx="110" cy="34" r="3" className="fill-espresso" />
          <circle cx="150" cy="34" r="3" className="fill-espresso" />

          {/* PRODUCT 14: REI Co-op Flash 22 Backpack */}
          <ProductObject
            product={getProduct('rei-flash-22')}
            onSelect={onSelectProduct}
            onTriggerEasterEgg={onTriggerEasterEgg}
            x={180}
            y={25}
            width={70}
            height={85}
          >
            {/* Backpack Straps & Main Bag Body */}
            <path d="M 22 15 Q 35 8 48 15 L 56 75 Q 35 82 14 75 Z" className="fill-emerald-600 dark:fill-emerald-800 stroke-emerald-950 stroke-2" />
            {/* Zipper Pocket & Buckle */}
            <path d="M 20 40 Q 35 44 50 40" stroke="#f4ded4" strokeWidth="2.5" fill="none" />
            <rect x="30" y="48" width="10" height="12" rx="2" className="fill-amber-warm" />
          </ProductObject>
        </RoomGroup>
      </svg>
    </div>
  );
}
