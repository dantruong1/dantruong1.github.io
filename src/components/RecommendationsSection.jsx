import React from 'react';
import { SFMapSection } from './SFMapSection';
import { Bookshelf } from './Bookshelf';

export function RecommendationsSection({ content }) {
  return (
    <div className="space-y-16">
      {/* 1. SF Recommendations Map Section (Top) */}
      <SFMapSection />

      {/* 2. Interactive Bookshelf (Bottom, on scroll) */}
      <Bookshelf content={content} />
    </div>
  );
}
