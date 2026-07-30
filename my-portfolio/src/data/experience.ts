export interface Experience {
  company: string;
  role: string;
  period: string;
  description: string;
}

export const experience: Experience[] = [
  {
    company: 'Omobio (Pvt) Ltd.',
    role: 'Associate Tech Lead',
    period: 'Jan 2026 – Present',
    description:
      'Lead, mentor, and scale a cross-functional engineering team of 10+ developers, driving solution design and delivery across mobile, web, AI/ML, and data-platform initiatives. Serve as technical subject-matter expert for pre-sales engagements, producing architecture proposals and technical validation. Lead an AI/ML R&D program applying machine-learning-driven detection to an existing fraud-prevention product, and a centralized data-reporting platform spanning backend pipelines and web dashboards. Leverage AI tools throughout the design and development workflow to boost personal productivity, enabling faster turnaround and higher-quality output.',
  },
  {
    company: 'Omobio (Pvt) Ltd.',
    role: 'Senior Software Engineer',
    period: 'Jan 2024 – Jan 2026',
    description:
      'Architected cross-platform React Native mobile solutions with deep native integration (Java, Kotlin, Swift), including a ~2,700-line custom native alarm engine built from the ground up. Self-initiated AI/ML capabilities from zero: a production fraud-detection module combining semantic embeddings and a local-LLM GenAI layer, plus an ensemble ML classifier (XGBoost/CatBoost) with SHAP explainability. Delivered a Next.js web self-care portal end-to-end and fixed a 240x database query-performance regression. Mentored a team of 10 junior developers and established coding standards and CI/CD pipelines.',
  },
  {
    company: 'Omobio (Pvt) Ltd.',
    role: 'Software Engineer',
    period: 'Apr 2022 – Jan 2024',
    description:
      'Led design and development of cross-platform mobile applications in React Native, managing releases across Play Store, App Store, and Huawei AppGallery. Hardened production apps against fraud with certificate/public-key pinning and device-integrity gates. Participated in pre-sales client engagement and contributed to ISO 27001 certification-readiness documentation and a company-wide Git branching standard. Received the Emerging Employee of the Year Award (2023).',
  },
  {
    company: 'Omobio (Pvt) Ltd.',
    role: 'Software Engineer (Intern) — Full Stack',
    period: 'Oct 2021 – Apr 2022',
    description:
      'Supported frontend, backend, and mobile feature development for enterprise-grade projects using React.js, React Native, Python, and RESTful APIs; transitioned to a full-time Software Engineer role based on strong performance.',
  },
];
