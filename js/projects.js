import { projects } from './data.js';

// Replaced canvas generation with direct image loading

export function initProjects() {
  const grid = document.getElementById('projects-grid');
  if (!grid) return;

  projects.forEach((p)=>{
    const card = document.createElement('div');
    card.className='project-card reveal';
    card.innerHTML=`
      <div class="project-cover-container">
        <img src="${p.cover}" alt="${p.title}" class="project-cover-img" loading="lazy">
      </div>
      <div class="project-title">${p.title}</div>
      <div class="project-desc">${p.desc}</div>
      <div class="project-tech">${p.tags.map(t=>`<span class="tech-tag">${t}</span>`).join('')}</div>
      <a class="project-link" href="${p.link}" target="_blank">View Project →</a>
    `;
    grid.appendChild(card);
  });
}
