export function initCursor() {
  const cursor = document.getElementById('cursor');
  const ring = document.getElementById('cursor-ring');
  let mx=0, my=0, rx=0, ry=0;

  document.addEventListener('mousemove', e => { 
    mx=e.clientX; 
    my=e.clientY; 
    cursor.style.left=mx+'px'; 
    cursor.style.top=my+'px'; 
  });

  function animRing(){ 
    rx+=(mx-rx)*.12; 
    ry+=(my-ry)*.12; 
    ring.style.left=rx+'px'; 
    ring.style.top=ry+'px'; 
    requestAnimationFrame(animRing); 
  }
  animRing();

  document.querySelectorAll('a,button').forEach(el => {
    el.addEventListener('mouseenter', () => { 
      ring.style.width='60px'; 
      ring.style.height='60px'; 
    });
    el.addEventListener('mouseleave', () => { 
      ring.style.width='36px'; 
      ring.style.height='36px'; 
    });
  });
}
