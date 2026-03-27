export const projects = [
  {
    title: 'Yelp Lakehouse — GCP Medallion Pipeline',
    desc: 'Production-grade Data Lakehouse on GCP using a Medallion Architecture with Airflow, BigLake, and SCD Type 2.',
    tags: ['GCP', 'Airflow', 'BigQuery', 'Soda'],
    link: 'https://github.com/pwawiwa/yelp-lakehouse-complete-data-pipeline-with-GCP',
    cover: 'imgs/yelp_lakehouse_cover_webp_1774621606284.png'
  },
  {
    title: 'Airflow on Kubernetes',
    desc: 'Scalable Apache Airflow deployment on Kubernetes using KubernetesExecutor and Helm with Git-Sync.',
    tags: ['Kubernetes', 'Airflow', 'Helm', 'DevOps'],
    link: 'https://github.com/pwawiwa/airflow-k8s-project',
    cover: 'imgs/airflow_k8s_cover_webp_1774621694005.png'
  },
  {
    title: 'E-commerce Medallion Pipeline',
    desc: 'ELT pipeline orchestrating 100k+ records on GCP with data-aware scheduling and BigQuery push-down.',
    tags: ['GCP', 'Airflow', 'BigQuery', 'SQL'],
    link: 'https://github.com/pwawiwa/ELT-E-commerce-Medallion-Data-Pipeline-with-Airflow',
    cover: 'imgs/ecommerce_medallion_cover_webp_1774621770573.png'
  },
  {
    title: 'Crypto Real-time ETL',
    desc: 'Real-time ETL using Airflow 3 TaskFlow API to stream Coinbase data into S3 and Redshift.',
    tags: ['Airflow 3', 'AWS', 'Redshift', 'Python'],
    link: 'https://github.com/pwawiwa/crypto-etl-airflow-redshift',
    cover: 'imgs/crypto_etl_cover_webp_1774621843850.png'
  },
  {
    title: 'dbt + Airflow Data Engineering',
    desc: 'Production-grade engineering using dbt (Cosmos) and Airflow to orchestrate Snowflake transformations.',
    tags: ['dbt', 'Snowflake', 'Airflow', 'SQL'],
    link: 'https://github.com/pwawiwa/dbt_airflow',
    cover: 'imgs/dbt_airflow_cover_webp_1774622087726.png'
  },
  {
    title: 'Fintech Medallion Pipeline',
    desc: 'Financial Data Lakehouse on GCP with SCD Type 2 tracking and automated anomaly detection.',
    tags: ['GCP', 'Fintech', 'SCD2', 'BigQuery'],
    link: 'https://github.com/pwawiwa/fintech-medallion-data-pipeline-gcp-airflow',
    cover: 'imgs/fintech_lakehouse_cover_webp_1774622356680.png'
  },
  {
    title: 'FakeStore ETL — Airflow 3.1',
    desc: 'Automated ETL extracting e-commerce data from APIs, processed through Pandas and PostgreSQL.',
    tags: ['Airflow 3.1', 'PostgreSQL', 'Pandas', 'API'],
    link: 'https://github.com/pwawiwa/Airflow',
    cover: 'imgs/fakestore_etl_cover_webp_1774622419478.png'
  },
  {
    title: 'FakeStore ETL — Airflow 3.1',
    desc: 'Automated ETL extracting e-commerce data from APIs, processed through Pandas and PostgreSQL.',
    tags: ['Airflow 3.1', 'PostgreSQL', 'Pandas', 'API'],
    link: 'https://github.com/pwawiwa/Airflow',
    cover: 'imgs/fakestore_etl_cover_webp_1774622419478.png'
  },
  {
    title: 'n8n AI Receipt Automation',
    desc: 'Receipt-to-Sheets automation using n8n and AI for automated expense tracking.',
    tags: ['n8n', 'AI', 'Automation', 'No-Code'],
    link: 'https://github.com/pwawiwa/n8n-receipt2sheet',
    cover: 'imgs/n8n_receipt_cover_webp_1774622149408.png'
  },
  {
    title: 'RAG Medium Vector DB',
    desc: 'RAG implementation for Medium articles using Vector Databases for intelligent knowledge retrieval.',
    tags: ['AI', 'RAG', 'VectorDB', 'Python'],
    link: 'https://github.com/pwawiwa/RAG-of-Medium-Articles-with-Vector-Database-Implementation',
    cover: 'imgs/rag_medium_cover_webp_1774621940821.png'
  },
  {
    title: 'ML Deployment with CI/CD',
    desc: 'Machine Learning model deployment pipeline featuring automated CI/CD and monitoring.',
    tags: ['MLOps', 'CI/CD', 'Docker', 'Python'],
    link: 'https://github.com/pwawiwa/ML-Deployment-CI-CD',
    cover: 'imgs/ml_deployment_cover_webp_1774622008349.png'
  }
];

export const views = {
  skills: {
    cols:['skill','category','proficiency'],
    gridClass:'grid-skills',
    rows:[
      {skill:'Python',category:'Language',pct:95},
      {skill:'PyTorch / TF',category:'Deep Learning',pct:93},
      {skill:'Apache Airflow',category:'Orchestration',pct:92},
      {skill:'AWS',category:'Cloud',pct:92},
      {skill:'GCP',category:'Cloud',pct:90},
      {skill:'Databricks',category:'Lakehouse',pct:89},
      {skill:'SQL / BigQuery',category:'Query Engine',pct:88},
      {skill:'n8n',category:'AI/ML',pct:88},
      {skill:'Apache Spark',category:'Processing',pct:85},
      {skill:'Docker',category:'Container',pct:85},
      {skill:'Kubernetes',category:'Infrastructure',pct:82},
      {skill:'Snowflake',category:'Data Warehouse',pct:82},
      {skill:'Terraform',category:'IaC',pct:82},
      {skill:'dbt',category:'Transformation',pct:80},
    ]
  },
  education: {
    cols:['institution','degree','year','gpa'],
    gridClass:'grid-edu',
    rows:[
      {institution:'Telkom University',degree:'Data Science',year:'2022–2026',gpa:'3.9 GPA Cumlaude'},
    ]
  },
  projects: {
    cols:['project','stack'],
    gridClass:'grid-proj',
    rows: projects.slice(0,8).map(p=>({project:p.title,stack:p.tags.join(', ')}))
  },
  certifications: {
    cols:['certification','issuer'],
    gridClass:'grid-cert',
    rows:[
      {certification:'AWS Academy Graduate Data Engineering',issuer:'Amazon Web Services'},
      {certification:'AWS Certified AI Practitioner',issuer:'Amazon Web Services'},
      {certification:'Apache Airflow Fundamentals',issuer:'Astronomer'},
      {certification:'Deep Learning TensorFlow Developer',issuer:'DeepLearning.AI'},
    ]
  }
};

export const stack = ['Apache Airflow','BigQuery','Kubernetes','Apache Spark','dbt','Snowflake','GCP','AWS','Databricks','Python','Docker','Terraform','Kafka','Soda','LangChain','n8n','PostgreSQL','Redshift','Helm','Git'];

export const typingTexts = [
  'The pursuit of perfection and continuous improvement on my craft.',
  'Turning raw data into insight, pipelines into products.',
  'SELECT wisdom FROM experience WHERE iteration > 0;'
];
