export interface PersonalProject {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  githubUrl: string;
  liveUrl?: string;
}

export interface IndustryProject {
  id: string;
  name: string;
  category: string;
  context: string;
  techStack: string[];
  highlights: string[];
  scopeNote?: string;
  link?: { label: string; url: string };
}

export const personalProjects: PersonalProject[] = [
  {
    id: 'lottery-analyzer',
    title: 'Lottery Analyzer',
    description:
      'MSc AI applied-ML project: CatBoost with SHAP/LIME explainability on 485K Sri Lankan lottery draw records, served through a FastAPI backend and a React results dashboard.',
    techStack: ['Python', 'CatBoost', 'SHAP', 'FastAPI', 'React', 'TypeScript'],
    githubUrl: 'https://github.com/PathmikaW/lottery_analyzer',
  },
  {
    id: 'search-algorithms',
    title: 'Search Algorithms Visualizer',
    description:
      'Interactive tool visualizing and comparing 9 search algorithms (BFS, DFS, UCS, A*, IDDFS, Bidirectional, Greedy, Hill Climbing) on a real-world routing scenario, with traffic simulation and a custom graph editor.',
    techStack: ['React', 'TypeScript', 'Vite', 'Tailwind CSS'],
    githubUrl: 'https://github.com/PathmikaW/search-algorithms',
    liveUrl: 'https://search-algorithms-y5oo.vercel.app/',
  },
  {
    id: 'order-management-api',
    title: 'Order Management API',
    description:
      'ASP.NET Core (.NET 10) order management API built on Clean Architecture — MediatR domain events, Repository + Unit of Work, FluentValidation, and a full automated test suite.',
    techStack: ['.NET 10', 'ASP.NET Core', 'MediatR', 'Clean Architecture'],
    githubUrl: 'https://github.com/PathmikaW/order-management-api',
  },
  {
    id: 'computer-vision-fitting-alignment',
    title: 'Computer Vision: Fitting & Alignment',
    description:
      'MSc AI computer vision coursework: TLS/RANSAC line fitting, homography estimation via manual point correspondence and SIFT feature matching, and image alignment.',
    techStack: ['Python', 'OpenCV', 'NumPy', 'RANSAC', 'SIFT'],
    githubUrl: 'https://github.com/PathmikaW/computer-vision-fitting-alignment',
  },
  {
    id: 'elk-stack-docker-setup',
    title: 'ELK Stack Docker Setup',
    description:
      'A complete, production-style ELK Stack 8.17.1 deployment via Docker Compose — multi-node Elasticsearch cluster, SSL/TLS between nodes, Kibana authentication, and Filebeat log shipping.',
    techStack: ['Elasticsearch', 'Kibana', 'Logstash', 'Filebeat', 'Docker Compose'],
    githubUrl: 'https://github.com/PathmikaW/elk-stack-docker-setup',
  },
  {
    id: 'my-portfolio',
    title: 'This Portfolio',
    description:
      'This site — a localized (English/Sinhala) personal portfolio built on Next.js 15 with the App Router, React 19, and Tailwind CSS 4.',
    techStack: ['Next.js 15', 'React 19', 'TypeScript', 'Tailwind CSS 4', 'next-intl'],
    githubUrl: 'https://github.com/PathmikaW/my-portfolio',
  },
];

export const industryProjects: IndustryProject[] = [
  {
    id: 'circadian',
    name: 'Circadian — Native Alarm Engine & Monetization',
    category: 'Mobile',
    context: "A wellness app's fully custom, cross-platform native alarm engine and in-app subscription system.",
    techStack: ['React Native', 'Java', 'Kotlin', 'Swift', 'Objective-C', 'RevenueCat'],
    highlights: [
      'Architected and built a fully custom, cross-platform native alarm engine from the ground up — ~2,700 lines of native Java (Android) and Swift/Objective-C (iOS) across 26 files, bridged to a unified JavaScript API, replacing reliance on third-party alarm libraries.',
      'Engineered Android alarm reliability using AlarmManager.setExactAndAllowWhileIdle, foreground Services, WakeLock management, and BroadcastReceivers to guarantee exact-time delivery despite Doze mode, App Standby, and OEM battery-optimization restrictions.',
      'Designed a reboot-persistence system (BootReceiver + JSON-backed SharedPreferences) to automatically re-arm all active alarms after device restart.',
      'Built the iOS alarm subsystem on UNUserNotificationCenter/UNCalendarNotificationTrigger with custom AVAudioPlayer-based gradual volume-ramp playback.',
      'Built a "circadian rhythm" scheduling engine converting sunrise/sunset/civil-dawn/dusk astronomical data into dynamically computed wake, sleep, meal, exercise, and light-exposure alarms.',
      'Integrated RevenueCat for end-to-end in-app subscription purchasing and entitlement management across iOS StoreKit and Google Play Billing.',
      'Designed a client-side regional pricing engine mapping ISO country codes to four currency/price tiers for iOS offerings.',
      'Built promotional discount and win-back retention flows — percentage-based promo codes, 50%-off retention offers, and complimentary trial extensions.',
    ],
  },
  {
    id: 'hutch-selfcare',
    name: 'Hutch Selfcare',
    category: 'Mobile',
    context: 'Telecom self-care app for Hutch (Sri Lanka) — dashboard, multi-connection management, loyalty, parental controls.',
    techStack: ['React Native 0.76', 'React Navigation 7', 'Firebase Cloud Messaging', 'Huawei HMS', 'SSL Pinning'],
    link: {
      label: 'View on Google Play',
      url: 'https://play.google.com/store/apps/details?id=com.omobio.etisalatone&hl=en&gl=US',
    },
    highlights: [
      'Built and maintained a React Native 0.76 (React 18, React Navigation 7) telecom self-care app spanning dashboard, multi-connection management, loyalty/offers, VAS, login/OTP, and parental-control feature modules.',
      'Designed a centralized React Context + useReducer application state store managing session, multi-line/connection switching, loyalty tier, and force-update state without a third-party state management library.',
      'Enforced certificate/public-key pinning with dual SHA-256 pinned certificates on every network request.',
      'Implemented a per-network-call device-integrity gate detecting root/jailbreak status, USB-debugging/developer mode, emulator environments, and instrumentation-hook tampering.',
      "Architected a dual push-notification pipeline dynamically selecting between Firebase Cloud Messaging and Huawei HMS Push Kit at runtime, solving Android push delivery across Sri Lanka's fragmented GMS/HMS device landscape.",
      'Implemented a custom iOS Notification Service Extension for rich media/image push notifications.',
      "Built a custom 3D parallax promotional carousel and integrated QR/barcode scanning directly on react-native-vision-camera's code-scanner APIs.",
      'Supported i18next-based localization across English, Sinhala, and Tamil.',
    ],
  },
  {
    id: 'vodafone-selfcare',
    name: 'Vodafone Selfcare (Fiji)',
    category: 'Mobile',
    context: 'Production self-care app for Vodafone Fiji — major React Native version upgrade and release engineering.',
    techStack: ['React Native', 'New Architecture/TurboModules', 'Redux-Saga', 'Firebase Crashlytics'],
    scopeNote: 'Scope: version upgrade, New Architecture scaffolding, and release engineering on an existing large codebase — not original feature design.',
    highlights: [
      'Led the React Native version upgrade from 0.59.3 to 0.70.5, scaffolding New Architecture plumbing (TurboModuleManagerDelegate, MainComponentsRegistry, CMakeLists, JSI OnLoad bootstrap) alongside the existing Java bridge.',
      'Rewired MainActivity/MainApplication and re-integrated third-party native Android dependencies across the upgrade, resolving a JCenter-shutdown build breakage.',
      'Hardened the app for production release by auditing and removing dev-only console logging across ~15 feature modules, and produced multiple versioned release APK builds.',
      'Diagnosed and fixed conditional-rendering display bugs in the postpaid broadband balance-info UI.',
      'Performed field QA testing on production builds, reproducing and logging install/crash defects and data-display bugs.',
      'Worked within a large, multi-year (2017–2024) production codebase built on Redux + Redux-Saga, React Navigation, and Firebase Analytics/Crashlytics.',
    ],
  },
  {
    id: 'firewallbi',
    name: 'SMS Firewall AI/ML Suite & FirewallBI',
    category: 'Data Platforms & AI/ML',
    context: 'Multi-tenant telecom SMS-firewall AI/ML detection suite and business-intelligence platform, deployed across 8 on-prem operator sites.',
    techStack: ['Elasticsearch', 'Kibana', 'Logstash', 'Docker', 'GitLab CI/CD', 'PostgreSQL', 'Erlang/OTP', 'SentenceTransformers', 'Ollama', 'Next.js'],
    highlights: [
      'Lead this flagship AI/ML R&D initiative as Associate Tech Lead, extending the fraud-detection engine and reporting layer.',
      'Architected and led development of FirewallBI, deployed across 8 on-prem operator sites (including live references at 1,500 TPS/16.3M subscribers and 500 TPS/3.5M subscribers), evolving it from an early ELK-based analytics prototype into a productionized, containerized platform.',
      "Evaluated multiple candidate architectures (hybrid AWS RDS + on-prem ELK, fully-AWS RDS+OpenSearch+EKS, on-prem Kubernetes ELK sized for 50k-100k writes/sec) and orchestration tools (Airflow vs. Prefect) before settling on Logstash's native JDBC cron scheduling for the shipped platform.",
      "Custom-patched Kibana's compiled JS bundles directly inside running Docker containers to strip Elastic branding and rebuild a private-registry Kibana image, avoiding an Enterprise license.",
      'Stood up a 3-node Elasticsearch 8.17 cluster with mutual TLS between all nodes, authoring the OpenSSL CA and certificate-generation toolchain from scratch, plus custom Kibana RBAC roles.',
      'Built 300+ Logstash JDBC pipeline configurations across 6+ operator deployments, each executing hand-written PostgreSQL rollup queries, plus a parallelized Python reconciliation framework validating data integrity with Slack/email alerting.',
      'Built a production fraud-detection module (live deployment) combining Caesar-cipher/base64 CDR decryption, SentenceTransformer embeddings, and cosine-similarity matching against a 365-day rolling reference table to auto-block OTP-bypass and grey-route A2P traffic at ~378 messages/sec.',
      'Extended the engine with a local-LLM passive/GenAI mode (Ollama-hosted Llama 3 8B) and an NLLB-200 translation model for 20-language CDR content classification.',
      'Built a Next.js management dashboard (Reporting CMS) surfacing fraud-detection outputs and firewall rule controls atop the FastAPI detection backend.',
      'Delivered a flash-call fraud-detection and monetization system built on CAMEL/CAP signaling with an inline IVR decision path, layered with Random Forest risk scoring and social-graph-based SIM-box-ring detection.',
    ],
  },
  {
    id: 'sor',
    name: 'SOR — Steering of Roaming (Centralized Reporting Platform)',
    category: 'Data Platforms & AI/ML',
    context: 'Centralized web-based telecom data-reporting platform spanning backend pipelines through web dashboards.',
    techStack: ['Python', 'Celery', 'PostgreSQL', 'ClickHouse', 'Elasticsearch', 'Apache Superset', 'Prometheus', 'Grafana', 'Docker', 'GitHub Actions'],
    highlights: [
      'Lead the SOR (Steering of Roaming) centralized reporting platform as a flagship initiative, architecting full-stack telecom data-reporting solutions from backend pipelines through web dashboards.',
      'Architected and directed implementation of a centralized web-based reporting platform, optimizing and processing large-scale telecom datasets using asynchronous task processing and message queues (Celery) with containerized deployment (Docker).',
      'Tech stack spans Python, Celery, PostgreSQL, ClickHouse, and Elasticsearch for data processing and storage, Apache Superset for BI dashboards, Prometheus and Grafana for monitoring, and GitHub Actions for CI/CD.',
    ],
  },
  {
    id: 'hopp',
    name: "HOPP — Hutch Web Self-Care Portal",
    category: 'Web',
    context: "Hutch's Next.js 14 web self-care portal.",
    techStack: ['Next.js 14', 'React', 'TypeScript', 'Tailwind CSS', 'shadcn/ui', 'next-intl', 'Axios'],
    highlights: [
      'Built HOPP, authoring core infrastructure including the locale/auth middleware, a custom Axios wrapper class, and the API service and storage service layers (confirmed via authorship headers on the source).',
      'Designed a custom Axios wrapper (jsonGet/jsonPost/formPost/formMultiPartPost/downloadFile) with CancelToken-based request timeouts and a unified ApiError contract.',
      'Implemented a React Context + useReducer global state store with selective localStorage persistence, and a quota-guarded (5MB) storage-service wrapper.',
      'Built a custom backend-driven image CAPTCHA component instead of relying on a third-party reCAPTCHA package.',
      'Integrated the FriMi payment gateway (Nations Trust Bank) end-to-end — OAuth2 client-credentials flow, four request types, 18-scenario error mapping — alongside Visa/Mastercard/Amex/Alipay/Genie/Sampath Vishwa.',
      'Enforced Conventional Commits via Husky + lint-staged + Commitlint git hooks, delivered under a company-wide Hybrid Git Flow branching model.',
    ],
  },
  {
    id: 'banglalink-smsc',
    name: 'Banglalink SMSC Reporting Engineering',
    category: 'Data Platforms & AI/ML',
    context: "Report validation and data engineering for a telecom operator's SMSC billing/reporting platform (Bangladesh).",
    techStack: ['SQL', 'MariaDB', 'MySQL', 'AWK', 'Python', 'ETL'],
    highlights: [
      'Reverse-engineered and documented the CDR-to-report field mapping for a CSG-vendor SMSC billing/reporting platform, writing AWK-based cross-validation scripts achieving 99.94–99.98% accuracy against raw CDR logs.',
      'Root-caused and fixed multiple report-accuracy defects: a 5-minute time-bucket filter silently dropping ~79% of boundary-spanning records, a MySQL scheduled event skipping 4 of every 12 five-minute buckets per hour, and a Customized Success Rate bug — recovering ~85,000 previously-dropped records.',
      'Diagnosed a 240x query-performance regression caused by 7 missing indexes; added them without foreign-key constraints to avoid write-lock contention, cutting query time from 4+ minutes to ~20 seconds.',
      'Designed and built a new Delay Statistic reporting pipeline end-to-end — new database schema, a new MySQL scheduled-event aggregator, and a standalone Python delay processor deployed across a 4-server production cluster.',
      'Added a new Data Coding Scheme (DCS) field across the CDR-processing schema via a merged pull request, and catalogued SQL/logic mappings for 45+ distinct report types.',
    ],
  },
  {
    id: 'mda',
    name: 'MDA — Dialog Device Management Platform',
    category: 'Web',
    context: "Dialog Axiata's Mobile Device Management platform.",
    techStack: ['PHP', 'Yii2', 'React', 'Redux-Saga', 'Erlang/OTP', 'SS7/Diameter'],
    scopeNote: 'Scope: contributed to specific subsystems within an existing platform; the Erlang/OTP signaling core is specialized infrastructure owned by a dedicated team.',
    highlights: [
      "Contributed to Dialog Axiata's Mobile Device Management (MDM) platform — a carrier-grade admin system combining a PHP Yii2 backend, a React (Material-UI, Redux-Saga) admin console, and an Erlang/OTP telecom-signaling core.",
      'Worked within the platform\'s Equipment Identity Register (EIR) subsystem for IMEI blacklist/whitelist device blocking, spanning backend controllers and the React device-management UI.',
      'Supported the PHP-to-Erlang RPC bridge connecting the admin platform to real-time SS7/Diameter signaling components implementing 3GPP interfaces (S6a, S6c, S13, Sh).',
      'Contributed to device-configuration and SMS-campaign scheduling features (throttled campaign delivery via SMPP) and a custom GSM-7BIT/UTF-16 SMS segment counter for accurate billing.',
    ],
  },
  {
    id: 'cmdp',
    name: 'CMDP — Dialog CDR Disclosure Platform',
    category: 'Web',
    context: "Dialog Axiata's Call Detail Record (CDR) disclosure-request platform for law-enforcement/court data requests.",
    techStack: ['PHP', 'Yii2', 'React', 'Material-UI', 'Java'],
    scopeNote: 'Scope: targeted bug fixes and QA/deployment support, not platform authorship.',
    highlights: [
      'Fixed a CDR search date-picker defect and a CDR search-type toggle bug in the request-management UI, and updated build configuration for a testbed environment.',
      'Performed QA/production deployment support and fixed a Content-Disposition header-parsing defect affecting file-attachment downloads.',
      'Platform context: implements a full work-order/approval workflow engine, OTP-based authentication with LDAP-backed login, granular per-action RBAC, encrypted CDR data at rest, and Java-based legal PDF form generation.',
    ],
  },
  {
    id: 'bangla-sms',
    name: 'Bangla SMS (Robi Opt-In/Opt-Out)',
    category: 'Web',
    context: 'BTRC-mandated Bangla/English SMS language-preference platform for Robi (Bangladesh, Axiata Group).',
    techStack: ['Erlang', 'PHP', 'Yii2', 'React', 'MariaDB', 'Redis'],
    scopeNote: 'Scope: SRS technical review and solution scoping, plus bootstrapping the initial repository — no evidence of subsequent feature-level implementation.',
    highlights: [
      'Reviewed the System Requirements Specification (v1.1) against the proposed architecture — Erlang core, PHP/React GUI, MariaDB 10.6 cluster, Redis, active/standby N+1 redundancy.',
      'Reviewed platform scope covering 5 user-role types, bulk MSISDN/language-preference management, a daily D-1 dump sync, and real-time push/pull REST APIs (sub-100ms QoS) sized for 200 TPS hardware / 100 TPS software capacity.',
      'Bootstrapped the initial project repository, evaluating and importing an existing internal Yii2/React platform codebase as a starting scaffold.',
    ],
  },
  {
    id: 'dtel',
    name: 'Dtel',
    category: 'Mobile',
    context: "React Native app for Dialog's fixed-line/home-telecom brand — security and infrastructure foundation.",
    techStack: ['React Native', 'Redux-Saga', 'redux-persist', 'Firebase'],
    scopeNote: 'Snapshot captures an early architecture/scaffolding phase — bullets focus on the security/infrastructure work actually present in the code.',
    highlights: [
      "Built the foundational architecture for Dtel, establishing the app's security and infrastructure layer ahead of feature development.",
      'Implemented SSL/certificate pinning against the operator\'s production certificate chain and a custom per-request API integrity-signing scheme with a remote kill-switch that force-closes the app if backend integrity checks fail.',
      'Configured encrypted, selective Redux persistence to disk-persist only non-sensitive locale/config state, keeping session data out of unencrypted storage.',
      'Set up a two-tier internationalization strategy for 6 languages, loading a minimal locale bundle at first paint and swapping in full translations post-login.',
      'Wired a full Firebase observability and growth stack (Crashlytics, Performance Monitoring, Remote Config, Dynamic Links, In-App Messaging, Cloud Messaging) into the Redux store layer.',
    ],
  },
  {
    id: 'payroll-system',
    name: 'Payroll Slip Generation System',
    category: 'Automation',
    context: 'Internal payroll slip generation and distribution desktop tool.',
    techStack: ['Python', 'Tkinter', 'pandas', 'PyPDF2', 'PyInstaller'],
    highlights: [
      'Built an end-to-end payroll slip generation and distribution desktop tool automating company-wide salary slip creation and email delivery, replacing a manual HR process.',
      "Implemented per-employee PDF encryption with passwords algorithmically derived from each employee's NIC and date of birth.",
      'Built a cross-file data-verification engine reconciling 5 payroll fields against an HR master spreadsheet before generation, including ambiguous date-format detection and Excel serial-date normalization.',
      'Developed an auto-remediation module that backs up the source workbook, locates mismatched records, and rewrites corrected cells in place, with file-lock detection.',
      'Implemented per-employee failure isolation (PDF generation vs. email delivery tracked independently) and dual timestamped audit logs.',
      'Packaged the tool as a standalone Windows executable for non-technical HR use.',
    ],
  },
  {
    id: 'retailhub',
    name: 'RetailHub',
    category: 'Web',
    context: "Dialog's retail/device-sales web platform.",
    techStack: ['Docker', 'CI/CD'],
    scopeNote: 'Kept brief — available material is limited to environment/CI artifacts, not source code or scope documents.',
    highlights: [
      'Supported RetailHub as part of a containerized "O2A" (online-to-agent) platform family alongside sibling device-sale and win-back services, with CI-integrated container vulnerability scanning on an internal registry.',
    ],
  },
  {
    id: 'pre-sales-architecture',
    name: 'Pre-Sales & Solution Architecture',
    category: 'Pre-Sales & Architecture',
    context: 'Technical architecture proposals and effort estimation across telecom operators.',
    techStack: ['Solution Architecture', 'Effort Estimation', 'RFP/RFQ Response'],
    scopeNote: 'Proposal and architecture work — not delivered/shipped software.',
    highlights: [
      'Authored technical architecture proposals and effort estimates for telecom operators across South Asia, Africa, and the Middle East, spanning AI/ML fraud and CVM platforms, large-scale CDR search infrastructure (150B+ record scale), and roaming/steering solutions.',
      'Served as technical subject-matter expert in client-facing pre-sales engagements, producing solution validation and technical responses to RFPs/RFQs.',
      'Compiled competitive and market research (e.g., flash-call fraud market sizing) to support solution positioning.',
    ],
  },
];
