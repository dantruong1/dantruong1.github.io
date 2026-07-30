import React from 'react';
import { SFMapSection } from './SFMapSection';
import { Bookshelf } from './Bookshelf';
import { FavoriteVideosSection } from './FavoriteVideosSection';

export function RecommendationsSection({ content, onVideoPlay }) {
  return (
    <div className="space-y-16">
      {/* 1. SF Recommendations Map Section (Top) */}
      <SFMapSection />

      {/* 2. Dan's Bookshelf (Middle, single-row interactive shelf) */}
      <Bookshelf content={content} />

      {/* 3. Favorite Videos (Bottom, embedded YouTube speeches with auto-pause Lofi trigger) */}
      <FavoriteVideosSection onVideoPlay={onVideoPlay} />
    </div>
  );
}
