export function initReveal() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.05 });
  
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));

  // Parallax-lite for hero name
  window.addEventListener('scroll',()=>{
    const y=window.scrollY;
    const heroName = document.querySelector('.hero-name');
    if(heroName) heroName.style.transform=`translateY(${y*0.15}px)`;
  });
}
