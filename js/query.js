import { views, projects } from './data.js';

export function initQuery() {
  let activeView = 'skills';

  document.querySelectorAll('.query-option').forEach(btn=>{
    btn.addEventListener('click',()=>{
      document.querySelectorAll('.query-option').forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      activeView=btn.dataset.view;
      document.getElementById('results-container').classList.remove('visible');
    });
  });

  document.getElementById('run-query').addEventListener('click',()=>{
    const container = document.getElementById('results-container');
    const header = document.getElementById('results-header');
    const body = document.getElementById('results-body');
    const v = views[activeView];

    header.className='results-header '+v.gridClass;
    header.innerHTML=v.cols.map(c=>`<span>${c.toUpperCase()}</span>`).join('');

    body.innerHTML='';
    v.rows.forEach((row,i)=>{
      const div=document.createElement('div');
      div.className='result-row '+v.gridClass;
      div.style.animationDelay=i*0.05+'s';

      if(activeView==='skills'){
        div.innerHTML=`
          <span>${row.skill}</span>
          <span class="skill-rating">${row.category}</span>
          <span>
            <div class="skill-bar"><div class="skill-bar-fill" style="width:0%" data-pct="${row.pct}"></div></div>
            <span class="skill-rating">${row.pct}/100</span>
          </span>`;
      } else if(activeView==='education'){
        div.innerHTML=`<span>${row.institution}</span><span>${row.degree}</span><span>${row.year}</span><span style="color:var(--gray-400); font-style:italic;">${row.gpa || ''}</span>`;
      } else if(activeView==='projects'){
        // Find the project link from the projects data (using a safer find)
        const projectData = projects.find(p => p.title === row.project);
        const link = projectData ? projectData.link : '#';
        div.innerHTML=`<span style="grid-column: span 2;"><a href="${link}" target="_blank" style="color:white; text-decoration:none; display:block; border-bottom:1px solid rgba(255,255,255,0.1); transition:all 0.2s;" onmouseover="this.style.borderBottomColor='white'; this.style.paddingLeft='4px'" onmouseout="this.style.borderBottomColor='rgba(255,255,255,0.1)'; this.style.paddingLeft='0'">${row.project}</a></span><span style="color:var(--gray-400);font-size:0.6rem">${row.stack}</span>`;
      } else {
        div.innerHTML=`<span style="grid-column: span 2;">${row.certification}</span><span style="color:var(--gray-400); font-size:0.75rem">${row.issuer}</span>`;
      }
      body.appendChild(div);

      if(activeView==='skills'){
        setTimeout(()=>{
          const fill=div.querySelector('.skill-bar-fill');
          if(fill) fill.style.width=fill.dataset.pct+'%';
        },i*50+100);
      }
    });

    container.classList.add('visible');
    // Clean up previous row count if exists
    const oldCounter = container.querySelector('.row-counter');
    if (oldCounter) oldCounter.remove();
    
    const rowCount=document.createElement('div');
    rowCount.className = 'row-counter';
    rowCount.style.cssText='font-size:0.6rem;color:var(--gray-400);padding:0.7rem 1rem;border-top:1px solid #222;letter-spacing:0.15em;';
    rowCount.textContent=`${v.rows.length} row${v.rows.length!==1?'s':''} returned · ${Date.now()%1000}ms`;
    container.appendChild(rowCount);
  });
}
