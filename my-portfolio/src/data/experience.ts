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
    period: 'Jan 2026 - Sep 2026',
    highlights: [
      'Led, mentored, and scaled a cross-functional engineering team of 10+ developers, driving solution design and delivery across mobile, web, AI/ML, and data-platform initiatives.',
      'Leveraged AI tools throughout design and development workflows to boost personal productivity, enabling faster turnaround, higher quality output, and more efficient day-to-day execution.',
      'Served as the technical subject-matter expert for pre-sales engagements, producing architecture proposals and technical validation for clients across Africa, South Asia, and the Middle East.',
      'Led two flagship engineering initiatives: an AI/ML R&D program applying machine-learning-driven detection to an existing fraud-prevention product, and a centralized data-reporting platform spanning backend pipelines and web dashboards.',
      'Managed client engagements, handled team responsibilities, and reported to management accordingly.',
      'Maintained and versioned all project planning, communications, and self-learning documentation on the company SharePoint, keeping it accessible across teams for smooth knowledge transfer.',
    ],
  },
  {
    company: 'Omobio (Pvt) Ltd.',
    role: 'Senior Software Engineer',
    period: 'Jan 2024 - Jan 2026',
    highlights: [
      'Led Agile delivery of end-to-end mobile and web applications, owning architecture design, effort estimation, and SOW reviews, while mentoring a team of 10 junior developers and establishing coding standards and CI/CD pipelines.',
      "Led the project team building a telecom operator's Next.js web self-care portal, taking it to production with payment-gateway integration across multiple payment methods.",
      'Owned a flagship telecom mobile self-care app for 2+ years (this role and the prior one): led its React Native version upgrade, delivered 3+ feature change requests, and hardened its security.',
      'Self-initiated AI/ML capabilities in telecom security from the ground up: an embedding- and LLM-based fraud-detection module and an ensemble ML classifier with explainability and hyperparameter tuning, plus a TPS-based hardware-sizing model - extended into R&D with voice-fraud risk-scoring, social-graph analysis, and a churn/CLV-prediction prototype.',
      'Developed a cross-platform React Native mobile solution with native integration (Java, Kotlin, Swift): a fully custom native alarm engine built from the ground up to replace third-party libraries, plus RevenueCat integration for in-app subscriptions across iOS StoreKit and Google Play Billing.',
      'Contributed to SQL/CDR reporting engineering for an SMSC billing platform, recovering ~85,000 dropped records and fixing a ~100x query-performance regression via targeted database indexing.',
      'Managed client communications, project management, and documentation across new opportunities and ongoing projects.',
      'Represented the team in company progress meetings, delivering quarterly and annual progress updates on its behalf.',
    ],
  },
  {
    company: 'Omobio (Pvt) Ltd.',
    role: 'Software Engineer',
    period: 'May 2022 - Jan 2024',
    highlights: [
      'Led design and development of cross-platform mobile applications for multiple telecom and enterprise clients in React Native, managing releases across Play Store, App Store, and Huawei AppGallery.',
      "Contributed to the React admin-console frontends (Redux state management) of Dialog's MDA device-management platform and CDR-disclosure portal.",
      'Led a major React Native version upgrade of a production telecom self-care app across two major versions, with New Architecture.',
      'Participated in pre-sales client engagement and contributed to ISO 27001 certification-readiness documentation and a company-wide Git branching standard, later delivered as an internal training program.',
      'Received the Emerging Employee of the Year Award (2023) for outstanding technical contribution.',
    ],
  },
  {
    company: 'Omobio (Pvt) Ltd.',
    role: 'Software Engineer (Intern) - Full Stack',
    period: 'Oct 2021 - Apr 2022',
    highlights: [
      'Supported frontend, backend, and mobile feature development for enterprise-grade projects using React.js, React Native, Sencha Touch, Ext.js, and RESTful APIs.',
      'Interacted with clients and completed a change request, undertaking all the development for a production-grade Salesforce mobile application.',
      'Implemented automation scripts to improve development efficiency and reduce repetitive tasks.',
      'Gained hands-on exposure to Agile methodologies, CI/CD pipelines, and cross-functional collaboration.',
      'Successfully transitioned into a full-time Software Engineer role based on strong performance, adaptability, and learning ability.',
    ],
  },
];
