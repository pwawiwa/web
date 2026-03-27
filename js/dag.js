export function initDag() {
  const svg = document.getElementById('dag-canvas');
  if (!svg) return;

  const nodes = [
    // Education & Early Research
    {id:'telu', x:40, y:40, label:'Telkom Univ', type:'source', sub:'Data Science (3.9 GPA)'},
    {id:'sircle', x:40, y:120, label:'Sircle R&D', type:'source', sub:'General Secretary'},
    {id:'assoc', x:40, y:200, label:'Student Assoc', type:'source', sub:'Research Staff'},
    
    // Core Growth
    {id:'aws_club', x:220, y:120, label:'AWS Cloud Club', type:'transform', sub:'Curriculum Lead'},
    {id:'bi_lab', x:220, y:200, label:'BI Lab Asst', type:'transform', sub:'Power BI / Looker'},
    
    // Specialized Paths
    {id:'bangkit', x:400, y:40, label:'Bangkit Academy', type:'transform', sub:'ML (Google/Gojek)'},
    {id:'intern', x:400, y:120, label:'Tech Intern', type:'transform', sub:'Almeera Skincare'},
    {id:'chicago', x:400, y:200, label:'Market Analytics', type:'transform', sub:'PySpark / GCP'},

    // Key Milestone Projects
    {id:'yelp', x:580, y:40, label:'Yelp Lakehouse', type:'transform', sub:'Medallion / SCD2'},
    {id:'k8s', x:580, y:120, label:'Airflow-K8s', type:'transform', sub:'KubernetesExecutor'},
    {id:'crypto', x:580, y:200, label:'Crypto ETL', type:'transform', sub:'Airflow 3 / AWS'},

    // Success & Future
    {id:'airflow', x:760, y:80, label:'Airflow Cert', type:'transform', sub:'Astro Fundamentals'},
    {id:'aws_grad', x:760, y:160, label:'AWS Graduate', type:'transform', sub:'Data Engineering'},
    {id:'de', x:930, y:120, label:'Data Engineer', type:'sink', sub:'Professional Path'},
  ];

  const edges = [
    ['telu','aws_club'], ['sircle','aws_club'], ['assoc','aws_club'],
    ['telu','bi_lab'],
    ['aws_club','bangkit'], ['aws_club','intern'], ['bi_lab','chicago'],
    ['bangkit','yelp'], ['intern','yelp'], ['chicago','k8s'],
    ['yelp','airflow'], ['k8s','airflow'], ['crypto','aws_grad'],
    ['airflow','de'], ['aws_grad','de']
  ];

  let html = `<defs>
    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="2" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
    <marker id="arr" markerWidth="6" markerHeight="6" refX="6" refY="3" orient="auto">
      <path d="M0,0 L0,6 L6,3 z" fill="rgba(255,255,255,0.4)"/>
    </marker>
  </defs>`;

  edges.forEach(([a,b],i)=>{
    const na = nodes.find(n=>n.id===a), nb = nodes.find(n=>n.id===b);
    const x1=na.x+110, y1=na.y+18, x2=nb.x, y2=nb.y+18;
    const cx = (x1+x2)/2;
    html += `<path d="M${x1},${y1} C${cx},${y1} ${cx},${y2} ${x2},${y2}"
      stroke="rgba(255,255,255,0.15)" stroke-width="1.2" fill="none"
      marker-end="url(#arr)"
      style="animation: edge-draw 0.8s ${i*0.05}s ease both">
    </path>`;
  });

  nodes.forEach((n,i)=>{
    const fill = n.type==='source'?'rgba(255,255,255,0.12)':n.type==='sink'?'rgba(255,255,255,0.02)':'rgba(255,255,255,0.06)';
    const stroke = n.type==='source'?'rgba(255,255,255,0.7)':n.type==='sink'?'#ffffff':'rgba(255,255,255,0.3)';
    html += `
    <g transform="translate(${n.x},${n.y})" class="dag-node" style="animation: node-pop 0.5s ${i*0.06}s ease both">
      <rect width="110" height="36" rx="2" fill="${fill}" stroke="${stroke}" stroke-width="1" filter="${n.type==='sink'?'url(#glow)':''}"/>
      <text x="8" y="14" fill="#ffffff" font-family="JetBrains Mono,monospace" font-size="9" font-weight="600" letter-spacing="0.05em">${n.label}</text>
      <text x="8" y="27" fill="rgba(255,255,255,0.45)" font-family="JetBrains Mono,monospace" font-size="7">${n.sub}</text>
    </g>`;
  });

  svg.innerHTML = html;

  if (!document.getElementById('dag-styles')) {
    const style = document.createElement('style');
    style.id = 'dag-styles';
    style.textContent = `
      @keyframes node-pop { 
        from { opacity: 0; transform: translateY(10px) scale(0.95); } 
        to { opacity: 1; transform: translateY(0) scale(1); } 
      }
      @keyframes edge-draw { 
        from { stroke-dashoffset: 300; stroke-dasharray: 300; opacity: 0; } 
        to { stroke-dashoffset: 0; stroke-dasharray: 300; opacity: 1; } 
      }
      .dag-node { opacity: 0; transform-box: fill-box; transform-origin: center; }
    `;
    document.head.appendChild(style);
  }
}
