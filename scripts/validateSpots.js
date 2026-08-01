import { SF_SPOTS, SF_CATEGORIES } from '../src/data/sfSpots.js';

console.log('🧪 Running Validation Tests for SF Map Recommendations...');

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

// 2. Category Check
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
const fourChairs = SF_SPOTS.find((s) => s.id === 'four-chairs');
assert(fourChairs !== undefined, 'Four Chairs spot exists');
if (fourChairs) {
  assert(fourChairs.neighborhood === 'Mission District', `Four Chairs neighborhood should be "Mission District", got: "${fourChairs.neighborhood}"`);
  assert(Math.abs(fourChairs.lat - 37.7583) < 0.01, `Four Chairs latitude accurate (near 37.7583), got: ${fourChairs.lat}`);
  assert(Math.abs(fourChairs.lng - (-122.4190)) < 0.01, `Four Chairs longitude accurate (near -122.4190), got: ${fourChairs.lng}`);
}

const qCoffee = SF_SPOTS.find((s) => s.id === 'q-specialty-coffee');
if (qCoffee) {
  assert(qCoffee.neighborhood.includes('Presidio Heights') || qCoffee.neighborhood.includes('Laurel Heights'), `Q Specialty Coffee neighborhood accurately located`);
  assert(Math.abs(qCoffee.lat - 37.7868) < 0.01, `Q Specialty Coffee latitude accurate`);
}

const sohn = SF_SPOTS.find((s) => s.id === 'sohn');
if (sohn) {
  assert(sohn.neighborhood === 'Dogpatch', `Sohn neighborhood accurately located in Dogpatch`);
  assert(Math.abs(sohn.lat - 37.7574) < 0.01, `Sohn latitude accurate`);
}

console.log(`\n📊 Summary: ${passed} passed, ${failed} failed out of ${passed + failed} assertions.`);

if (failed > 0) {
  process.exit(1);
} else {
  console.log('✅ ALL SF MAP RECOMMENDATION VALIDATION TESTS PASSED!');
}
