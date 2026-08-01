import { SF_SPOTS, SF_CATEGORIES } from '../src/data/sfSpots.js';

console.log('🧪 Running Comprehensive Validation Tests for SF Map Recommendations...');

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    passed++;
  } else {
    failed++;
    console.error(`❌ FAIL: ${message}`);
  }
}

// 1. Total Count & Uniqueness
const ids = new Set();
SF_SPOTS.forEach((spot) => {
  assert(!ids.has(spot.id), `Duplicate ID found: ${spot.id}`);
  ids.add(spot.id);
});

// 2. Category Check & Schema Validation
const validCategories = new Set(SF_CATEGORIES.map((c) => c.id).filter((id) => id !== 'all'));

SF_SPOTS.forEach((spot) => {
  assert(validCategories.has(spot.category), `Spot ${spot.name} (${spot.id}) has invalid category: ${spot.category}`);
  assert(spot.name && spot.name.trim().length > 0, `Spot ${spot.id} missing name`);
  assert(spot.neighborhood && spot.neighborhood.trim().length > 0, `Spot ${spot.id} missing neighborhood`);
  assert(typeof spot.lat === 'number' && spot.lat >= 37.7 && spot.lat <= 38.0, `Spot ${spot.name} (${spot.id}) has out-of-bounds latitude: ${spot.lat}`);
  assert(typeof spot.lng === 'number' && spot.lng >= -122.6 && spot.lng <= -122.3, `Spot ${spot.name} (${spot.id}) has out-of-bounds longitude: ${spot.lng}`);
  assert(spot.googleMapsUrl && spot.googleMapsUrl.startsWith('http'), `Spot ${spot.id} missing valid googleMapsUrl`);
  assert(spot.yelpUrl && spot.yelpUrl.startsWith('http'), `Spot ${spot.id} missing valid yelpUrl`);
});

// 3. Specific Critical Spot Verifications
const assertions = [
  { id: 'four-chairs', expectedNeighborhood: 'Mission District', expectedLat: 37.7583, expectedLng: -122.4190 },
  { id: 'ollei', expectedNeighborhood: 'Russian Hill / Polk Street', expectedLat: 37.7969, expectedLng: -122.4226 },
  { id: 'cafe-shoji', expectedNeighborhood: 'SOMA / FiDi', expectedLat: 37.7865, expectedLng: -122.4003 },
  { id: 'komeya-no-bento', expectedNeighborhood: 'Cow Hollow / Marina', expectedLat: 37.7986, expectedLng: -122.4308 },
  { id: 'khao-tiew', expectedNeighborhood: 'West Portal / Forest Hill', expectedLat: 37.7411, expectedLng: -122.4650 },
  { id: 'sohn', expectedNeighborhood: 'Dogpatch', expectedLat: 37.7574, expectedLng: -122.3880 },
];

assertions.forEach(({ id, expectedNeighborhood, expectedLat, expectedLng }) => {
  const spot = SF_SPOTS.find((s) => s.id === id);
  assert(spot !== undefined, `Spot ${id} exists`);
  if (spot) {
    assert(spot.neighborhood === expectedNeighborhood, `Spot "${id}" neighborhood should be "${expectedNeighborhood}", got: "${spot.neighborhood}"`);
    assert(Math.abs(spot.lat - expectedLat) < 0.01, `Spot "${id}" latitude accurate (expected ${expectedLat}), got: ${spot.lat}`);
    assert(Math.abs(spot.lng - expectedLng) < 0.01, `Spot "${id}" longitude accurate (expected ${expectedLng}), got: ${spot.lng}`);
  }
});

console.log(`\n📊 Summary: ${passed} passed, ${failed} failed out of ${passed + failed} assertions.`);

if (failed > 0) {
  process.exit(1);
} else {
  console.log('✅ ALL SF MAP RECOMMENDATION VALIDATION TESTS PASSED!');
}
