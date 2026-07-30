export interface Experience {
  company: string;
  role: string;
  period: string;
  highlights: string[];
}

export const experience: Experience[] = [
  {
    company: 'Omobio (Pvt) Ltd.',
    role: 'Associate Tech Lead',
    period: 'Jan 2026 – Present',
    highlights: [
      'Lead, mentor, and scale a cross-functional engineering team of 10+ developers, driving solution design and delivery across mobile, web, AI/ML, and data-platform initiatives.',
      'Leverage AI tools throughout design and development workflows to boost personal productivity, enabling faster turnaround, higher quality output, and more efficient day-to-day execution.',
      'Serve as technical subject-matter expert for pre-sales engagements, producing architecture proposals and technical validation for clients across Africa, South Asia, and the Middle East.',
      'Lead two flagship engineering initiatives: an AI/ML R&D program applying machine-learning-driven detection to an existing fraud-prevention product, and a centralized data-reporting platform spanning backend pipelines and web dashboards.',
      'Manage client engagements end-to-end, from requirements gathering through production delivery.',
    ],
  },
  {
    company: 'Omobio (Pvt) Ltd.',
    role: 'Senior Software Engineer',
    period: 'Jan 2024 – Jan 2026',
    highlights: [
      'Led Agile delivery of end-to-end mobile and web applications, owning architecture design, effort estimation, and SOW reviews, while mentoring a team of 10 junior developers and establishing coding standards and CI/CD pipelines.',
      "Owned a flagship telecom mobile self-care application for 2+ years (this role and the one prior): led its React Native version upgrade, delivered 3+ feature change requests, and hardened it with certificate/public-key pinning, a device-integrity gate (root/jailbreak detection), and a dual push-notification pipeline.",
      "Built a telecom operator's Next.js web self-care portal end-to-end — core auth/locale middleware, custom API layer, and payment-gateway integration across six payment methods.",
      'Architected a cross-platform React Native mobile solution with deep native integration (Java, Kotlin, Swift): built a ~2,700-line custom native alarm engine from the ground up (26 files, replacing third-party libraries) and integrated RevenueCat for end-to-end in-app subscription purchasing across iOS StoreKit and Google Play Billing.',
      'Built the foundational security architecture for a new telecom mobile application: SSL/certificate pinning, a custom per-request API integrity-signing scheme with remote kill-switch, and encrypted selective state persistence.',
      'Self-initiated AI/ML capabilities in telecom security from the ground up: a production fraud-detection module (semantic embeddings + local-LLM GenAI subsystem) and an ensemble ML classifier (XGBoost/CatBoost, SHAP, Optuna) with a TPS-based hardware-sizing model, extended into R&D with voice-fraud risk-scoring (Random Forest, social-graph analysis) and a churn/CLV-prediction prototype (scikit-learn, Flask, React).',
      "Delivered SQL/CDR reporting engineering for a telecom operator's billing platform (Bangladesh): reverse-engineered field mappings, recovered ~85,000 dropped records, and fixed a 240x query-performance regression (4+ min → ~20 sec) via targeted database indexing.",
    ],
  },
  {
    company: 'Omobio (Pvt) Ltd.',
    role: 'Software Engineer',
    period: 'Apr 2022 – Jan 2024',
    highlights: [
      'Led design and development of cross-platform mobile applications for multiple telecom and enterprise clients in React Native, managing releases across Play Store, App Store, and Huawei AppGallery.',
      'Contributed to a carrier-grade device-management platform (PHP Yii2 backend, React/Redux-Saga admin console), working within its device blacklist/whitelist fraud-prevention subsystem.',
      'Led a major React Native version upgrade of a production telecom self-care app across two major versions, with New Architecture scaffolding.',
      'Participated in pre-sales client engagement and contributed to ISO 27001 certification-readiness documentation and a company-wide Git branching standard, later delivered as an internal training program.',
      'Received the Emerging Employee of the Year Award (2023) for outstanding technical contribution.',
    ],
  },
  {
    company: 'Omobio (Pvt) Ltd.',
    role: 'Software Engineer (Intern) — Full Stack',
    period: 'Oct 2021 – Apr 2022',
    highlights: [
      'Supported frontend, backend, and mobile feature development for enterprise-grade projects using React.js, React Native, Python, and RESTful APIs; transitioned to a full-time Software Engineer role based on strong performance.',
    ],
  },
];
