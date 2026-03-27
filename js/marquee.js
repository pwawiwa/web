import { stack } from './data.js';

export function initMarquee() {
  const marquee = document.getElementById('marquee');
  if (!marquee) return;
  const full = [...stack,...stack];
  marquee.innerHTML = full.map((s,i)=>`<span class="marquee-item">${s}${i<full.length-1?'<span class="marquee-sep">·</span>':''}</span>`).join('');
}
