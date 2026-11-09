const {chromium}=require('@playwright/test');
const assert=require('node:assert/strict');
(async()=>{const b=await chromium.launch({executablePath:process.env.CHROMIUM_PATH || '/usr/bin/chromium',args:['--no-sandbox']});
for(const route of ['','about','products','wishlist','recommendations','creations','quotes']){
const results=[];
for(const port of [5174,5173]){
const p=await b.newPage();await p.addInitScript(()=>{Math.random=()=>0.1;});
await p.goto('http://127.0.0.1:'+port+'/#/'+route);await p.waitForTimeout(800);
results.push(await p.locator('main').evaluate(el=>({text:el.textContent.replace(/\s+/g,' ').trim(),links:[...el.querySelectorAll('a[href]')].map(a=>a.getAttribute('href')).filter(h=>!h.startsWith('#/')).sort()})));
await p.close();
}
assert.deepEqual(results[1],results[0],route||'home'); console.log('Content and external links unchanged:',route||'home');
}
await b.close()})().catch(e=>{console.error(e);process.exit(1)});
