// src/fetch.js
// Read env safely (works in Jest + browser once Vite inlines it)
const API_BASE_URL = (
    (typeof process !== 'undefined' &&
      process.env &&
      process.env.VITE_API_BASE_URL) 
  ).replace(/\/+$/, '');
  
  export async function fetcher(path) {
    const res = await fetch(API_BASE_URL + path, { headers: { Accept: 'application/json' } });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
  }
  
  export async function patchJson(path, body) {
    const res = await fetch(API_BASE_URL + path, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(body),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
  }
  