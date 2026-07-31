import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapPin, Navigation, ExternalLink, Search, Sparkles, Compass } from 'lucide-react';
import { SF_CATEGORIES, SF_SPOTS } from '../data/sfSpots';
import { Card, CardTitle } from './ui/card';
import { Badge } from './ui/badge';

// Helper component to programmatically animate/fly map to selected spot
function MapFlyToController({ spot }) {
  const map = useMap();
  useEffect(() => {
    if (spot) {
      map.flyTo([spot.lat, spot.lng], 15, {
        duration: 1.5,
        easeLinearity: 0.25,
      });
    }
  }, [spot, map]);
  return null;
}

// Create custom Leaflet HTML DivIcon pins matching site palette
function createCustomMarkerIcon(category, isSelected) {
  const iconMap = {
    cafes: '☕',
    food: '🍜',
    views: '🌉',
    drinks: '🍸',
    arts: '🎨',
  };
  const emoji = iconMap[category] || '📍';
  const bgColor = isSelected
    ? 'bg-terracotta dark:bg-terracotta-glow text-white scale-125 z-50'
    : 'bg-matcha dark:bg-matcha-dark text-white hover:scale-110';
  const borderColor = isSelected ? 'border-card dark:border-night-card shadow-lg' : 'border-card dark:border-night-card shadow-md';

  return L.divIcon({
    className: 'custom-map-pin',
    html: `
      <div className="relative flex items-center justify-center">
        <div className="w-8 h-8 rounded-full ${bgColor} ${borderColor} border-2 flex items-center justify-center text-xs transition-all duration-300">
          <span>${emoji}</span>
        </div>
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 ${isSelected ? 'bg-terracotta dark:bg-terracotta-glow' : 'bg-matcha dark:bg-matcha-dark'} rotate-45" />
      </div>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });
}

export function SFMapSection() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpot, setSelectedSpot] = useState(SF_SPOTS[0]);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const checkDark = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };
    checkDark();

    const observer = new MutationObserver(checkDark);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  // Filter spots by category & search query
  const filteredSpots = SF_SPOTS.filter((spot) => {
    const matchesCategory = selectedCategory === 'all' || spot.category === selectedCategory;
    const matchesSearch =
      spot.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      spot.neighborhood.toLowerCase().includes(searchQuery.toLowerCase()) ||
      spot.vibe.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <motion.section
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-6xl mx-auto mb-14"
    >
      {/* Standardized Header */}
      <div className="mb-7">
        <div className="flex items-center gap-3 mb-2">
          <span className="section-kicker">curated sf guide</span>
          <div className="organic-divider flex-1" />
        </div>
        <h2 className="font-serif text-3xl md:text-4xl font-bold text-espresso dark:text-night-text tracking-tight flex items-center gap-2 mb-2">
          <Compass className="w-7 h-7 text-matcha dark:text-matcha-glow" />
          SF Recommendations Map
        </h2>
        <p className="text-sm md:text-base text-espresso-muted dark:text-night-muted font-sans leading-relaxed w-full">
          An interactive guide to my absolute favorite spots in San Francisco — from early morning croissant runs to golden hour viewpoints and cozy late-night dining.
        </p>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-6">
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
          {SF_CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-mono font-medium transition-all duration-200 flex items-center gap-1.5 whitespace-nowrap ${
                  isActive
                    ? 'bg-matcha dark:bg-matcha-dark text-white shadow-sm'
                    : 'bg-card dark:bg-night-card-alt border border-espresso/10 dark:border-night-border text-espresso-muted dark:text-night-muted hover:text-espresso dark:hover:text-night-text hover:bg-parchment-dark dark:hover:bg-night-card'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Search Input */}
        <div className="relative min-w-[240px]">
          <Search className="w-4 h-4 text-espresso-muted dark:text-night-muted absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search spot or neighborhood..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-card dark:bg-night-card-alt border border-espresso/10 dark:border-night-border rounded-full pl-9 pr-4 py-1.5 text-xs font-sans text-espresso dark:text-night-text placeholder:text-espresso-muted/60 dark:placeholder:text-night-muted/60 focus:outline-none focus:border-matcha dark:focus:border-matcha-glow transition-colors"
          />
        </div>
      </div>

      {/* Main Map + Sidebar Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Map Canvas Container */}
        <div className="lg:col-span-7 bg-card dark:bg-night-card rounded-cozy-lg overflow-hidden border border-espresso/10 dark:border-night-border shadow-cozy dark:shadow-dark-cozy h-[440px] lg:h-[540px] relative z-10">
          <MapContainer
            center={[37.7749, -122.4194]}
            zoom={12}
            scrollWheelZoom={true}
            className="w-full h-full"
            style={{ background: isDark ? '#1c1714' : '#f7f3ec' }}
          >
            {/* CartoDB Map Tiles (Voyager for Light, Dark Matter for Dark) */}
            <TileLayer
              key={isDark ? 'dark-tiles' : 'light-tiles'}
              attribution='&copy; <a href="https://carto.com/">CARTO</a>'
              url={
                isDark
                  ? 'https://{s}.basemaps.cartocdn.com/rastertiles/dark_all/{z}/{x}/{y}{r}.png'
                  : 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png'
              }
            />

            <MapFlyToController spot={selectedSpot} />

            {/* Render Markers */}
            {filteredSpots.map((spot) => {
              const isSelected = selectedSpot?.id === spot.id;
              return (
                <Marker
                  key={spot.id}
                  position={[spot.lat, spot.lng]}
                  icon={createCustomMarkerIcon(spot.category, isSelected)}
                  eventHandlers={{
                    click: () => setSelectedSpot(spot),
                  }}
                >
                  <Popup className="custom-leaflet-popup">
                    <div className="p-1 font-sans">
                      <span className="font-mono text-[10px] text-terracotta dark:text-[#f7ded4] font-semibold block">
                        {spot.neighborhood}
                      </span>
                      <h4 className="font-serif font-bold text-sm text-espresso dark:text-[#f7f3ec] mb-1">
                        {spot.name}
                      </h4>
                      <p className="text-xs text-espresso-muted dark:text-[#c5b8ac] italic mb-2">"{spot.vibe}"</p>
                      <button
                        onClick={() => setSelectedSpot(spot)}
                        className="text-[11px] font-mono text-matcha-dark dark:text-[#d2e3c4] font-medium underline"
                      >
                        View Full Note →
                      </button>
                    </div>
                  </Popup>
                </Marker>
              );
            })}
          </MapContainer>
        </div>

        {/* Selected Spot Details & List Drawer */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          {/* Selected Spot Card */}
          <AnimatePresence mode="wait">
            {selectedSpot && (
              <motion.div
                key={selectedSpot.id}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="p-6 bg-card dark:bg-night-card border-matcha/30 dark:border-matcha-glow/30 relative overflow-hidden shadow-cozy dark:shadow-dark-cozy">
                  <div className="washi-tape washi-tape-top-right" />

                  <div className="flex items-center justify-between gap-2 mb-2">
                    <Badge variant="terracotta">{selectedSpot.categoryLabel}</Badge>
                    <span className="text-xs font-mono text-espresso-muted dark:text-night-muted flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-terracotta dark:text-terracotta-glow" />
                      {selectedSpot.neighborhood}
                    </span>
                  </div>

                  <CardTitle className="text-2xl mb-1 text-espresso dark:text-night-text font-serif">
                    {selectedSpot.name}
                  </CardTitle>
                  <p className="text-xs font-hand text-terracotta dark:text-terracotta-glow text-base mb-4">
                    "{selectedSpot.vibe}"
                  </p>

                  <p className="text-xs md:text-sm text-espresso-light dark:text-night-muted leading-relaxed font-sans mb-4">
                    {selectedSpot.note}
                  </p>

                  {selectedSpot.mustTry && (
                    <div className="bg-matcha-soft/60 dark:bg-matcha-dark/35 rounded-cozy px-3 py-2 border border-matcha/15 dark:border-matcha/30 mb-5">
                      <span className="text-[10px] font-mono text-matcha-dark dark:text-matcha-glow font-bold block mb-0.5">
                        MUST-TRY ITEM
                      </span>
                      <span className="text-xs font-medium text-espresso dark:text-night-text flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-amber-warm" />
                        {selectedSpot.mustTry}
                      </span>
                    </div>
                  )}

                  {/* External Links */}
                  <div className="flex items-center gap-3 pt-3 border-t border-espresso/10 dark:border-night-border">
                    <a
                      href={selectedSpot.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-mono text-matcha-dark dark:text-matcha-glow hover:text-matcha font-medium flex items-center gap-1 transition-colors"
                    >
                      <span>Google Maps</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                    <a
                      href={selectedSpot.yelpUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-mono text-terracotta dark:text-terracotta-glow hover:text-terracotta/80 font-medium flex items-center gap-1 transition-colors"
                    >
                      <span>Yelp</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Spots List Selector */}
          <div className="flex-1 bg-card/60 dark:bg-night-card/60 rounded-cozy-lg border border-espresso/10 dark:border-night-border p-4 max-h-[260px] overflow-y-auto no-scrollbar space-y-2">
            <span className="text-[11px] font-mono text-espresso-muted dark:text-night-muted block mb-2 px-1">
              ALL SPOTS ({filteredSpots.length}) — CLICK TO FLY MAP
            </span>

            {filteredSpots.map((spot) => {
              const isSelected = selectedSpot?.id === spot.id;
              return (
                <button
                  key={spot.id}
                  onClick={() => setSelectedSpot(spot)}
                  className={`w-full text-left p-3 rounded-cozy text-xs transition-all duration-200 flex items-center justify-between gap-2 ${
                    isSelected
                      ? 'bg-matcha-soft dark:bg-matcha-dark/40 border border-matcha dark:border-matcha-glow text-espresso dark:text-night-text font-medium shadow-sm'
                      : 'bg-card dark:bg-night-card hover:bg-parchment-dark/50 dark:hover:bg-night-card-alt text-espresso-light dark:text-night-muted border border-espresso/5 dark:border-night-border'
                  }`}
                >
                  <div className="min-w-0">
                    <h5 className="font-serif text-sm font-semibold truncate text-espresso dark:text-night-text">
                      {spot.name}
                    </h5>
                    <span className="text-[11px] font-mono text-espresso-muted dark:text-night-muted truncate block">
                      {spot.neighborhood}
                    </span>
                  </div>
                  <Navigation className={`w-3.5 h-3.5 shrink-0 ${isSelected ? 'text-matcha-dark dark:text-matcha-glow' : 'text-espresso-muted dark:text-night-muted'}`} />
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </motion.section>
  );
}
