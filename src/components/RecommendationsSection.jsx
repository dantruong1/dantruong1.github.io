import React from 'react';
import { SFMapSection } from './SFMapSection';
import { Bookshelf } from './Bookshelf';
import { FavoriteVideosSection } from './FavoriteVideosSection';
import { MusicRecommendationsSection } from './MusicRecommendationsSection';

export function RecommendationsSection({ content, onVideoPlay }) {
  return (
    <div className="space-y-16">
      {/* 1. SF Recommendations Map Section */}
      <SFMapSection />

      {/* 2. Dan's Bookshelf */}
      <Bookshelf content={content} />

      {/* 3. Favorite Videos */}
      <FavoriteVideosSection onVideoPlay={onVideoPlay} />

      {/* 4. Curated Music & Chill Vibes */}
      <MusicRecommendationsSection content={content} />
    </div>
  );
}
