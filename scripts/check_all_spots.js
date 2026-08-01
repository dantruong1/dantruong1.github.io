import { SF_SPOTS } from '../src/data/sfSpots.js';

async function verifyAll() {
  console.log('Checking all spots in sfSpots.js...\n');
  for (let s of SF_SPOTS) {
    const query = encodeURIComponent(`${s.name} San Francisco address`);
    try {
      const res = await fetch(`https://html.duckduckgo.com/html/?q=${query}`, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        }
      });
      const html = await res.text();
      // Extract snippets
      const matches = html.match(/<a class="result__snippet[^>]*>(.*?)<\/a>/g) || [];
      const text = matches.slice(0, 2).map(m => m.replace(/<[^>]+>/g, '')).join(' ');
      console.log(`[${s.id}] Given: "${s.neighborhood}" (${s.lat}, ${s.lng})`);
      console.log(`  Name: ${s.name}`);
      console.log(`  Snippet: ${text.slice(0, 150)}`);
      console.log('---');
    } catch (e) {
      console.log(`[${s.id}] Error: ${e.message}`);
    }
    await new Promise(r => setTimeout(r, 600));
  }
}

verifyAll();
