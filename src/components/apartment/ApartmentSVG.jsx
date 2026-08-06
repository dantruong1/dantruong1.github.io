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
    <div className="relative w-full max-w-[1100px] mx-auto aspect-[16/10.5] bg-parchment-dark/50 dark:bg-night-card-alt/40 border border-espresso/10 dark:border-night-border rounded-cozy-xl shadow-2xl p-2 sm:p-4 overflow-hidden select-none">
      <svg
        viewBox="0 0 1000 660"
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
        </defs>

        {/* Outer Floor Base Container */}
        <rect
          x="20"
          y="20"
          width="960"
          height="620"
          rx="24"
          className="fill-parchment dark:fill-night-bg stroke-espresso/15 dark:stroke-night-border stroke-2"
        />

        {/* Decorative Hallway Divider Lines */}
        <line x1="20" y1="325" x2="980" y2="325" stroke="currentColor" strokeWidth="2" strokeDasharray="8,8" className="text-terracotta/20 dark:text-terracotta-glow/20" />
        <line x1="337" y1="20" x2="337" y2="640" stroke="currentColor" strokeWidth="2" strokeDasharray="8,8" className="text-terracotta/20 dark:text-terracotta-glow/20" />
        <line x1="672" y1="20" x2="672" y2="640" stroke="currentColor" strokeWidth="2" strokeDasharray="8,8" className="text-terracotta/20 dark:text-terracotta-glow/20" />

        {/* ============================================================ */}
        {/* 1. OFFICE ROOM (Top-Left: 35, 35, width: 285, height: 275) */}
        {/* ============================================================ */}
        <g opacity={selectedRoom && selectedRoom !== 'office' ? 0.35 : 1} className="transition-opacity duration-300">
          <RoomGroup
            room={ROOMS[0]}
            x={35}
            y={35}
            width={285}
            height={275}
            floorColor="fill-[url(#officeFloor)] dark:fill-night-card"
            isSelected={selectedRoom === 'office'}
            onSelectRoom={onSelectRoom}
          >
            {/* Desk Surface */}
            <rect x="30" y="65" width="225" height="110" rx="10" className="fill-mocha-light/80 dark:fill-mocha/40 stroke-espresso/20 stroke-2" />
            <rect x="35" y="70" width="215" height="100" rx="6" className="fill-mocha/20 dark:fill-mocha/20" />

            {/* Desk Lamp Decor */}
            <circle cx="48" cy="85" r="10" className="fill-amber-warm/80" />

            {/* PRODUCT 1: Surface Laptop 7 */}
            <ProductObject
              product={getProduct('surface-laptop-7')}
              onSelect={onSelectProduct}
              onTriggerEasterEgg={onTriggerEasterEgg}
              x={45}
              y={75}
              width={65}
              height={50}
              shortLabel="Surface 7"
              labelOffsetX={10}
              labelOffsetY={-65}
            >
              <rect x="8" y="24" width="48" height="16" rx="3" className="fill-slate-300 dark:fill-slate-600 stroke-slate-500 stroke-1" />
              <rect x="12" y="5" width="40" height="22" rx="2" className="fill-slate-800 stroke-slate-400 stroke-2" />
              <rect x="14" y="7" width="36" height="18" rx="1" className="fill-sky-500/80 dark:fill-sky-600/90" />
            </ProductObject>

            {/* PRODUCT 2: iPhone 17 Pro */}
            <ProductObject
              product={getProduct('iphone-17-pro')}
              onSelect={onSelectProduct}
              onTriggerEasterEgg={onTriggerEasterEgg}
              x={125}
              y={85}
              width={35}
              height={45}
              shortLabel="iPhone 17"
              labelOffsetX={0}
              labelOffsetY={-65}
            >
              <rect x="6" y="6" width="20" height="34" rx="4" className="fill-slate-900 stroke-amber-warm/80 stroke-2" />
              <rect x="8" y="8" width="16" height="30" rx="3" className="fill-slate-950" />
              <circle cx="12" cy="12" r="2.5" className="fill-slate-700" />
            </ProductObject>

            {/* PRODUCT 3: Apple Watch */}
            <ProductObject
              product={getProduct('apple-watch')}
              onSelect={onSelectProduct}
              onTriggerEasterEgg={onTriggerEasterEgg}
              x={195}
              y={80}
              width={35}
              height={35}
              shortLabel="Apple Watch"
              labelOffsetX={0}
              labelOffsetY={-65}
            >
              <rect x="13" y="2" width="8" height="30" rx="2" className="fill-espresso-muted dark:fill-night-muted" />
              <rect x="9" y="8" width="16" height="18" rx="5" className="fill-slate-900 stroke-matcha stroke-2" />
            </ProductObject>

            {/* PRODUCT 4: Herman Miller Aeron Chair */}
            <ProductObject
              product={getProduct('herman-miller-aeron')}
              onSelect={onSelectProduct}
              onTriggerEasterEgg={onTriggerEasterEgg}
              x={105}
              y={155}
              width={75}
              height={75}
              shortLabel="Aeron Chair"
              labelOffsetX={0}
              labelOffsetY={40}
            >
              <circle cx="37" cy="35" r="25" className="fill-espresso/90 dark:fill-night-card-alt stroke-terracotta/40 stroke-2" />
              <rect x="18" y="16" width="38" height="30" rx="8" className="fill-espresso dark:fill-night-bg stroke-espresso-light stroke-2" />
              <line x1="23" y1="22" x2="51" y2="22" stroke="#8a9a7b" strokeWidth="1.5" />
              <line x1="23" y1="28" x2="51" y2="28" stroke="#8a9a7b" strokeWidth="1.5" />
              <rect x="12" y="28" width="8" height="18" rx="3" className="fill-espresso-light" />
              <rect x="54" y="28" width="8" height="18" rx="3" className="fill-espresso-light" />
            </ProductObject>
          </RoomGroup>
        </g>

        {/* ============================================================ */}
        {/* 2. BEDROOM (Top-Center: 350, 35, width: 305, height: 275) */}
        {/* ============================================================ */}
        <g opacity={selectedRoom && selectedRoom !== 'bedroom' ? 0.35 : 1} className="transition-opacity duration-300">
          <RoomGroup
            room={ROOMS[1]}
            x={350}
            y={35}
            width={305}
            height={275}
            floorColor="fill-[url(#bedroomFloor)] dark:fill-night-card-alt"
            isSelected={selectedRoom === 'bedroom'}
            onSelectRoom={onSelectRoom}
          >
            {/* Woven Rug */}
            <ellipse cx="150" cy="170" rx="100" ry="45" className="fill-terracotta-soft/50 dark:fill-terracotta/20 stroke-terracotta/20 stroke-2" />

            {/* PRODUCT 5: Memory Foam Mattress (Bed Frame) */}
            <ProductObject
              product={getProduct('memory-foam-mattress')}
              onSelect={onSelectProduct}
              onTriggerEasterEgg={onTriggerEasterEgg}
              x={35}
              y={65}
              width={170}
              height={140}
              shortLabel="Zinus Mattress"
              labelOffsetX={25}
              labelOffsetY={-30}
            >
              <rect x="8" y="8" width="154" height="24" rx="5" className="fill-mocha-light dark:fill-mocha stroke-espresso/30 stroke-2" />
              <rect x="12" y="25" width="146" height="100" rx="10" className="fill-card dark:fill-night-card stroke-espresso/15 stroke-2" />
              <rect x="12" y="55" width="146" height="70" rx="8" className="fill-matcha-soft dark:fill-matcha-dark/60 stroke-matcha/40 stroke-2" />
            </ProductObject>

            {/* PRODUCT 6: Purple Pillow */}
            <ProductObject
              product={getProduct('purple-pillow')}
              onSelect={onSelectProduct}
              onTriggerEasterEgg={onTriggerEasterEgg}
              x={55}
              y={80}
              width={65}
              height={40}
              shortLabel="Purple Pillow"
              labelOffsetX={-20}
              labelOffsetY={-65}
            >
              <rect x="4" y="4" width="56" height="30" rx="8" className="fill-purple-100 dark:fill-purple-950 stroke-purple-400 stroke-2" />
              <path d="M 12 12 H 52 M 12 18 H 52 M 12 24 H 52" stroke="#a855f7" strokeWidth="1.5" strokeDasharray="3,3" />
            </ProductObject>

            {/* Nightstand Decor */}
            <g transform="translate(220, 75)">
              <rect x="0" y="0" width="55" height="55" rx="8" className="fill-mocha-soft dark:fill-night-card border stroke-espresso/10" />
              <circle cx="27.5" cy="35" r="7" className="fill-amber-warm/80" />
            </g>
          </RoomGroup>
        </g>

        {/* ============================================================ */}
        {/* 3. BATHROOM (Top-Right: 685, 35, width: 280, height: 275) */}
        {/* ============================================================ */}
        <g opacity={selectedRoom && selectedRoom !== 'bathroom' ? 0.35 : 1} className="transition-opacity duration-300">
          <RoomGroup
            room={ROOMS[2]}
            x={685}
            y={35}
            width={280}
            height={275}
            floorColor="fill-[url(#bathroomFloor)] dark:fill-night-card"
            isSelected={selectedRoom === 'bathroom'}
            onSelectRoom={onSelectRoom}
          >
            {/* Mirror */}
            <rect x="75" y="55" width="130" height="30" rx="6" className="fill-sky-100/60 dark:fill-sky-950/60 stroke-sky-300 stroke-2" />

            {/* Vanity Counter */}
            <rect x="30" y="90" width="220" height="75" rx="10" className="fill-card dark:fill-night-card-alt stroke-matcha/30 stroke-2" />
            <ellipse cx="90" cy="125" rx="35" ry="20" className="fill-matcha-soft/60 dark:fill-night-card stroke-matcha/30 stroke-2" />

            {/* PRODUCT 7: Oral-B Electric Toothbrush */}
            <ProductObject
              product={getProduct('oralb-pro-1000')}
              onSelect={onSelectProduct}
              onTriggerEasterEgg={onTriggerEasterEgg}
              x={45}
              y={95}
              width={35}
              height={55}
              shortLabel="Oral-B Brush"
              labelOffsetX={0}
              labelOffsetY={-65}
            >
              <rect x="12" y="16" width="9" height="32" rx="3" className="fill-sky-500 stroke-sky-700 stroke-1" />
              <rect x="14" y="4" width="5" height="14" rx="2" className="fill-white stroke-slate-300 stroke-1" />
            </ProductObject>

            {/* PRODUCT 8: GOODAL Sunscreen */}
            <ProductObject
              product={getProduct('goodal-sunscreen')}
              onSelect={onSelectProduct}
              onTriggerEasterEgg={onTriggerEasterEgg}
              x={125}
              y={95}
              width={35}
              height={55}
              shortLabel="GOODAL SPF"
              labelOffsetX={0}
              labelOffsetY={45}
            >
              <path d="M 10 12 L 26 12 L 29 45 L 7 45 Z" className="fill-emerald-100 dark:fill-emerald-900 stroke-emerald-500 stroke-2" />
              <rect x="11" y="45" width="14" height="6" rx="2" className="fill-emerald-600" />
            </ProductObject>

            {/* PRODUCT 9: ABIB Sunstick */}
            <ProductObject
              product={getProduct('abib-sunstick')}
              onSelect={onSelectProduct}
              onTriggerEasterEgg={onTriggerEasterEgg}
              x={200}
              y={95}
              width={35}
              height={50}
              shortLabel="ABIB Sunstick"
              labelOffsetX={0}
              labelOffsetY={-65}
            >
              <rect x="8" y="10" width="20" height="30" rx="8" className="fill-slate-100 dark:fill-slate-800 stroke-slate-400 stroke-2" />
              <rect x="9" y="28" width="18" height="10" rx="3" className="fill-emerald-500" />
            </ProductObject>
          </RoomGroup>
        </g>

        {/* ============================================================ */}
        {/* 4. KITCHEN (Bottom-Left: 35, 340, width: 310, height: 280) */}
        {/* ============================================================ */}
        <g opacity={selectedRoom && selectedRoom !== 'kitchen' ? 0.35 : 1} className="transition-opacity duration-300">
          <RoomGroup
            room={ROOMS[3]}
            x={35}
            y={340}
            width={310}
            height={280}
            floorColor="fill-[url(#kitchenFloor)] dark:fill-night-card-alt"
            isSelected={selectedRoom === 'kitchen'}
            onSelectRoom={onSelectRoom}
          >
            {/* Kitchen Counter Island */}
            <rect x="30" y="65" width="250" height="160" rx="14" className="fill-card dark:fill-night-card stroke-espresso/15 stroke-2" />
            <rect x="40" y="75" width="230" height="140" rx="8" className="fill-mocha-soft/30 dark:fill-night-card-alt" />

            {/* Steaming Coffee Mug Decor */}
            <g transform="translate(60, 110)">
              <rect x="0" y="8" width="24" height="20" rx="5" className="fill-terracotta dark:fill-terracotta-glow" />
              <path d="M 24 12 Q 30 17 24 22" stroke="#b86f52" strokeWidth="2.5" fill="none" />
              <motion.path
                d="M 5 3 Q 9 -3 5 -8 M 15 3 Q 19 -3 15 -8"
                stroke="#8a9a7b"
                strokeWidth="2"
                fill="none"
                animate={{ y: [-1, -6, -1], opacity: [0.2, 0.8, 0.2] }}
                transition={{ repeat: Infinity, duration: 2.5 }}
              />
            </g>

            {/* Fruit Bowl Decor */}
            <circle cx="215" cy="120" r="18" className="fill-amber-light dark:fill-mocha/60" />
            <circle cx="210" cy="116" r="6" className="fill-emerald-500" />
            <circle cx="220" cy="114" r="7" className="fill-amber-warm" />

            {/* PRODUCT 10: Nutribullet Pro */}
            <ProductObject
              product={getProduct('nutribullet-pro')}
              onSelect={onSelectProduct}
              onTriggerEasterEgg={onTriggerEasterEgg}
              x={120}
              y={85}
              width={65}
              height={95}
              shortLabel="Nutribullet"
              labelOffsetX={0}
              labelOffsetY={45}
            >
              <rect x="15" y="48" width="34" height="38" rx="5" className="fill-slate-800 dark:fill-slate-900 stroke-slate-500 stroke-2" />
              <path d="M 17 48 L 17 16 Q 17 8 32 8 Q 47 8 47 16 L 47 48 Z" className="fill-emerald-400/40 dark:fill-emerald-500/40 stroke-emerald-300 stroke-2" />
              <path d="M 19 48 L 19 22 Q 32 18 45 22 L 45 48 Z" className="fill-emerald-600/80" />
            </ProductObject>
          </RoomGroup>
        </g>

        {/* ============================================================ */}
        {/* 5. CLOSET (Bottom-Center: 370, 340, width: 285, height: 280) */}
        {/* ============================================================ */}
        <g opacity={selectedRoom && selectedRoom !== 'closet' ? 0.35 : 1} className="transition-opacity duration-300">
          <RoomGroup
            room={ROOMS[4]}
            x={370}
            y={340}
            width={285}
            height={280}
            floorColor="fill-[url(#closetFloor)] dark:fill-night-card"
            isSelected={selectedRoom === 'closet'}
            onSelectRoom={onSelectRoom}
          >
            {/* Wardrobe Wooden Wall Rack */}
            <rect x="25" y="65" width="235" height="160" rx="12" className="fill-mocha-soft/60 dark:fill-night-card-alt border stroke-espresso/10" />

            {/* PRODUCT 11: Buck Mason Vintage Thermal */}
            <ProductObject
              product={getProduct('buck-mason-thermal')}
              onSelect={onSelectProduct}
              onTriggerEasterEgg={onTriggerEasterEgg}
              x={40}
              y={85}
              width={60}
              height={60}
              shortLabel="Buck Mason"
              labelOffsetX={0}
              labelOffsetY={-65}
            >
              <path d="M 30 8 Q 30 0 24 5 M 8 18 L 30 9 L 52 18" stroke="#6b5e52" strokeWidth="2.5" fill="none" />
              <path d="M 10 18 L 20 16 L 40 16 L 50 18 L 56 40 L 46 43 L 42 25 L 42 55 L 18 55 L 18 25 L 14 43 L 4 40 Z" className="fill-stone-100 dark:fill-stone-300 stroke-stone-400 stroke-2" />
            </ProductObject>

            {/* PRODUCT 12: Asics Gel Nimbus 27 */}
            <ProductObject
              product={getProduct('asics-nimbus-27')}
              onSelect={onSelectProduct}
              onTriggerEasterEgg={onTriggerEasterEgg}
              x={125}
              y={95}
              width={55}
              height={45}
              shortLabel="Asics Shoes"
              labelOffsetX={0}
              labelOffsetY={45}
            >
              <path d="M 6 30 Q 25 38 50 30 L 50 38 Q 25 45 6 38 Z" className="fill-sky-400 dark:fill-sky-600" />
              <path d="M 8 30 Q 12 12 28 12 Q 42 15 48 30 Z" className="fill-slate-100 dark:fill-slate-800 stroke-slate-400 stroke-2" />
            </ProductObject>

            {/* PRODUCT 13: Le Labo Bergamote 22 */}
            <ProductObject
              product={getProduct('le-labo-bergamote-22')}
              onSelect={onSelectProduct}
              onTriggerEasterEgg={onTriggerEasterEgg}
              x={195}
              y={85}
              width={40}
              height={55}
              shortLabel="Le Labo 22"
              labelOffsetX={0}
              labelOffsetY={-65}
            >
              <rect x="8" y="18" width="22" height="30" rx="4" className="fill-amber-100/80 dark:fill-amber-950/80 stroke-amber-600 stroke-2" />
              <rect x="10" y="23" width="18" height="18" rx="2" className="fill-amber-50 stroke-amber-300 stroke-1" />
              <text x="13" y="35" className="text-[7px] font-mono font-bold fill-espresso">22</text>
            </ProductObject>
          </RoomGroup>
        </g>

        {/* ============================================================ */}
        {/* 6. ENTRYWAY (Bottom-Right: 680, 340, width: 285, height: 280) */}
        {/* ============================================================ */}
        <g opacity={selectedRoom && selectedRoom !== 'entryway' ? 0.35 : 1} className="transition-opacity duration-300">
          <RoomGroup
            room={ROOMS[5]}
            x={680}
            y={340}
            width={285}
            height={280}
            floorColor="fill-[url(#entrywayFloor)] dark:fill-night-card"
            isSelected={selectedRoom === 'entryway'}
            onSelectRoom={onSelectRoom}
          >
            {/* Front Door */}
            <rect x="180" y="65" width="80" height="160" rx="8" className="fill-mocha dark:fill-mocha-dark stroke-espresso stroke-2" />
            <circle cx="195" cy="145" r="5" className="fill-amber-warm" />

            {/* Key Hook Wall Rack */}
            <rect x="25" y="70" width="135" height="12" rx="4" className="fill-mocha-light dark:fill-mocha" />
            <circle cx="40" cy="82" r="3" className="fill-espresso" />
            <circle cx="80" cy="82" r="3" className="fill-espresso" />
            <circle cx="120" cy="82" r="3" className="fill-espresso" />

            {/* PRODUCT 14: REI Co-op Flash 22 Backpack */}
            <ProductObject
              product={getProduct('rei-flash-22')}
              onSelect={onSelectProduct}
              onTriggerEasterEgg={onTriggerEasterEgg}
              x={35}
              y={95}
              width={55}
              height={75}
              shortLabel="REI Backpack"
              labelOffsetX={0}
              labelOffsetY={35}
            >
              <path d="M 18 12 Q 30 6 42 12 L 48 68 Q 30 74 12 68 Z" className="fill-emerald-600 dark:fill-emerald-800 stroke-emerald-950 stroke-2" />
              <path d="M 16 35 Q 30 38 44 35" stroke="#f4ded4" strokeWidth="2.5" fill="none" />
              <rect x="25" y="42" width="10" height="10" rx="2" className="fill-amber-warm" />
            </ProductObject>

            {/* PRODUCT 15: Arc'teryx Atom Hoody */}
            <ProductObject
              product={getProduct('arcteryx-atom-hoody')}
              onSelect={onSelectProduct}
              onTriggerEasterEgg={onTriggerEasterEgg}
              x={105}
              y={90}
              width={55}
              height={70}
              shortLabel="Atom Hoody"
              labelOffsetX={-25}
              labelOffsetY={-60}
            >
              <path d="M 27 6 Q 27 0 21 5 M 8 18 L 27 9 L 46 18" stroke="#475569" strokeWidth="2.5" fill="none" />
              <path d="M 12 18 C 16 12 38 12 42 18 L 52 40 L 44 43 L 40 26 L 40 60 L 14 60 L 14 26 L 10 43 L 2 40 Z" className="fill-slate-700 dark:fill-slate-800 stroke-slate-900 stroke-2" />
              <path d="M 20 18 Q 27 10 34 18" className="fill-slate-600 stroke-slate-400 stroke-1" />
              <line x1="27" y1="18" x2="27" y2="60" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="3,2" />
              <circle cx="34" cy="28" r="1.5" className="fill-amber-warm" />
            </ProductObject>
          </RoomGroup>
        </g>
      </svg>
    </div>
  );
}
