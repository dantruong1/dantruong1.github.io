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
