export interface Profile {
  name: string;
  title: string;
  summary: string;
  skills: string[];
  languages: { language: string; level: string }[];
}

export const profile: Profile = {
  name: 'Pathmika Weerarathna',
  title: 'Associate Tech Lead — Full-Stack Engineer (Mobile & Web), AI/ML Exposure',
  summary:
    'Full-stack engineer and Associate Tech Lead with five years of experience delivering production mobile and web applications, having grown through every engineering level at the same company. Core strengths in React Native mobile development (native modules, app security, monetization) and Next.js/React web platforms, backed by solid REST API and backend engineering. Alongside this, gained hands-on AI/ML exposure self-initiating and leading a fraud-detection R&D initiative spanning NLP embeddings, GenAI, and ensemble ML models. Deepening technical foundations through an MSc in Artificial Intelligence at the University of Moratuwa. Recognized as Emerging Employee of the Year (2023).',
  skills: [
    'React Native',
    'Android (Java/Kotlin)',
    'iOS (Swift/Objective-C)',
    'React.js',
    'Next.js',
    'TypeScript',
    'Python',
    'FastAPI',
    'Java (Spring Boot)',
    '.NET (ASP.NET Core)',
    'PyTorch',
    'XGBoost / CatBoost',
    'NLP / Semantic Search',
    'PostgreSQL',
    'ClickHouse',
    'Elasticsearch / ELK',
    'Celery',
    'Apache Superset',
    'Docker',
    'Git',
    'CI/CD',
    'Prometheus / Grafana',
  ],
  languages: [
    { language: 'English', level: 'Professional' },
    { language: 'Sinhala', level: 'Native' },
  ],
};
