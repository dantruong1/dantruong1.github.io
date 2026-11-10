# UI validation

The redesign preserves the café palette, existing content, photos, destinations, and application features. Stageshow's bento guidance informed the introduction-first composition, supporting scrapbook, shared spacing, and varied card surfaces. No faux product UI or scripted demo was added.

## Reproduce

1. Run `npm ci`.
2. Run `npm run build`.
3. Run `npm test`. Chromium defaults to /usr/bin/chromium; set CHROMIUM_PATH for another installation.

Playwright serves the production build and checks nine routes (including legacy projects/writings aliases) at 375, 768, 1024, and 1440 pixels. It checks horizontal overflow and uncaught browser errors, keyboard card navigation, back navigation, mobile menu dismissal and focus restoration, theme persistence, audio controls, quote rotation, image decoding, and skip-link focus without route changes. Screenshots cover mobile and desktop in light and dark themes. Generated screenshots and HTML reports are ignored by Git.

## Original-revision regression comparison

Serve the original revision on port 5174 and the changed revision on port 5173, then run `node scripts/content-regression.cjs`. The comparison fixes the random quote seed and compares all main-region text and external link destinations on home, about, products, wishlist, recommendations, creations, and quotes.

Result: all seven pages matched the original copy and external link destinations.

## Visual review and limits

Reviewed desktop and phone screenshots for reading order, card spacing, wrapping, and photo captions. The new layout puts the introduction first, keeps all scrapbook captions readable, and stacks directory cards on narrow screens. Focus rings and reduced-motion handling supplement existing interactions.

Tests use Chromium; Safari and Firefox were not run. Remote map tiles, embedded videos, and outbound destinations depend on third-party services. Audio tests confirm control state, not subjective sound quality. Vite reports the existing large JavaScript bundle warning.

## Pixel garden addition

Original seeded Canvas artwork adds cherry blossoms, sage foliage, and an autumn tree above the Cozy Corner. Pointer position affects the breeze. Animation pauses offscreen and in hidden tabs, includes a pause/resume control, and reacts immediately to system reduced-motion changes. No external assets or dependencies were added.

Validation: production build and all nine existing regression tests passed. A separate browser test verifies changing animation frames, stable pixels while paused, and a still scene when reduced motion is enabled.

## Pixel café, directory sprites, and footer

Added original, decorative SVG pixel scenes with no external assets or dependencies. The café record and steam animate only during music playback. Six directory illustrations respond to hover and keyboard focus. The footer bench and streetlamp follow the theme, with a leaf that moves on interaction. All scenes respect reduced motion and stay outside the accessibility tree; existing controls and links retain their accessible names.

Validation: production build, responsive route checks at four widths, existing navigation/audio/theme/garden checks, and a new scene test for playback animation state, keyboard activation, lamp theme colors, and reduced motion. Screenshots cover phone and desktop in both themes. The existing bundle-size warning remains; browser tests use Chromium.
