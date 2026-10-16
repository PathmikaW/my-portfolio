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
      'Served as the technical subject-matter expert for pre-sales engagements, producing architecture proposals and technical validation for clients across Africa, South Asia, and the Middle East.',
      'Led two flagship platforms: the AI/ML R&D team enhancing the SMS Firewall product with ML-driven detection, and the SOR (Steering of Roaming) centralized reporting platform.',
      'Leveraged AI tools throughout the design and development workflow to boost personal productivity, enabling faster turnaround and higher-quality output.',
      'Managed client engagements end-to-end and maintained versioned project planning, communications, and technical documentation on company SharePoint for smooth knowledge transfer.',
    ],
  },
  {
    company: 'Omobio (Pvt) Ltd.',
    role: 'Senior Software Engineer',
    period: 'Jan 2024 - Jan 2026',
    highlights: [
      'Led Agile delivery of end-to-end mobile and web applications, owning architecture design, effort estimation, and SOW reviews.',
      'Contributed to SQL/CDR reporting engineering for an SMSC billing platform, recovering previously dropped records and fixing a major query-performance regression through targeted database indexing.',
      'Developed cross-platform mobile solutions in React Native with native integration (Java, Kotlin, Swift), including a fully custom native alarm engine built from the ground up to replace third-party alarm libraries on Android and iOS.',
      'Integrated RevenueCat for end-to-end in-app subscription purchasing.',
      'Self-initiated the AI/ML fraud-detection R&D work now powering the SMS Firewall AI/ML Suite.',
      "Led delivery of HOPP, Hutch's Next.js 14 web self-care portal, owning frontend architecture and payment-gateway integration across multiple payment methods, and took it to production.",
      'Continued ownership of Hutch Selfcare (led for 2+ years across this role and the one prior): led its React Native version upgrade from 0.66.5 to 0.76.5, delivered 3+ change requests for new feature additions, and strengthened its security.',
      'Mentored a team of 10 junior developers, conducted code reviews, and established coding standards and GitHub Actions CI/CD pipelines.',
    ],
  },
  {
    company: 'Omobio (Pvt) Ltd.',
    role: 'Software Engineer',
    period: 'May 2022 - Jan 2024',
    highlights: [
      'Led design and development of cross-platform mobile applications (Hutch Selfcare, Vodafone Selfcare, MyDialog, RetailHub, Circadian, SFA) in React Native, managing releases across Play Store, App Store, and Huawei AppGallery.',
      "Contributed to the React admin-console frontends of Dialog's MDA device-management platform and CDR-disclosure portal, built with Redux state management.",
      "Hardened Hutch Selfcare against fraud through security optimizations, and led the React Native version upgrade of Vodafone Fiji's production self-care app from RN 0.59.3 to 0.70.5.",
      'Participated in pre-sales client engagement and contributed to ISO 27001 certification-readiness documentation and a company-wide Git branching standard, later delivered as an internal training program.',
      'Received the Emerging Employee of the Year Award (2023) for outstanding technical contribution.',
    ],
  },
  {
    company: 'Omobio (Pvt) Ltd.',
    role: 'Software Engineer (Intern) - Full Stack',
    period: 'Oct 2021 - Apr 2022',
    highlights: [
      'Supported frontend, backend, and mobile feature development for enterprise-grade projects using React.js, React Native, Ext.js/Sencha Touch, and RESTful APIs, including full delivery of a client change request for a production Salesforce mobile application; transitioned to a full-time Software Engineer role based on strong performance.',
    ],
  },
];
