export interface ProjectDetailSection {
  heading: string;
  points: string[];
}

export interface PersonalProject {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  githubUrl: string;
  /** Overrides the default "View on GitHub" label, e.g. when a project spans several repos. */
  githubLabel?: string;
  liveUrl?: string;
  /** Additional links (other repos, design docs) shown next to the main link. */
  extraLinks?: { label: string; url: string }[];
  scopeNote?: string;
  /** When present the card becomes an expandable, full-width case study. */
  details?: ProjectDetailSection[];
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
    id: 'pulsecrypto',
    title: 'PulseCrypto - Real-Time Market Viewer',
    description:
      'Real-time crypto market viewer: a Node.js/Fastify WebSocket gateway and an Expo/React Native app for Android and iOS. The gateway conflates Binance order-book streams into 100 ms broadcasts with backpressure; it is hosted on AWS EC2 and was built spec-driven with Claude Code.',
    techStack: [
      'React Native',
      'Expo',
      'TypeScript',
      'Node.js',
      'Fastify',
      'WebSockets',
      'Zustand',
      'TanStack Query',
      'Reanimated',
      'FlashList',
      'MMKV',
      'Zod',
      'Docker',
      'AWS EC2',
      'Prometheus',
    ],
    githubUrl: 'https://github.com/PathmikaW/pulsecrypto-mobile',
    githubLabel: 'Mobile app on GitHub',
    extraLinks: [
      { label: 'Backend on GitHub', url: 'https://github.com/PathmikaW/pulsecrypto-backend' },
      {
        label: 'Architecture decisions (ADRs)',
        url: 'https://github.com/PathmikaW/pulsecrypto-backend/blob/main/docs/adr/00-overview.md',
      },
    ],
    scopeNote:
      'The hosted backend runs on a small AWS EC2 instance that is stopped when idle to control cost, so live data appears only while it is running.',
    details: [
      {
        heading: 'Backend gateway (Node.js, TypeScript, Fastify)',
        points: [
          "Connects to Binance's combined depth and ticker WebSocket streams with reconnect and exponential backoff, validating every raw message with a Zod parser before it is used.",
          'Always tracks the five required pairs (BTC, ETH, SOL, DOGE, XRP against USDT) and adds extra pairs chosen at startup by live 24h volume, excluding leveraged tokens and stablecoin pairs; falls back to the required five if Binance is unreachable.',
          'Conflates the latest state per pair on a fixed, configurable timer (default 100 ms), so memory stays bounded by the number of pairs regardless of upstream message rate.',
          'Protects against slow consumers by checking ws.bufferedAmount before every write: a lagging client is skipped for that tick and disconnected after repeated skips. No per-client queues, plus per-IP and total connection caps.',
          'Computes buy/sell pressure and spread from the order book as pure, unit-tested functions.',
          'Serves GET /pairs/meta (real Binance 24h data, 60 s cache, timeout, scoped mock fallback), /health, and Prometheus /metrics with connection counts, dropped-message counts and a broadcast-latency histogram.',
        ],
      },
      {
        heading: 'Mobile app (Expo, React Native, Android and iOS)',
        points: [
          'Watchlist of every pair the backend tracks in a FlashList with memoized rows, client-side search, and favorites persisted in MMKV and restored synchronously on launch.',
          'Terminal screen with price, 24h high/low, buy/sell pressure, spread, a live order book, a market-depth chart, and a last-updated time taken from the backend tick rather than recomputed on the device.',
          'Green/red price flashes and order-book bar animations run on the UI thread with Reanimated, so a tick causes no JavaScript-thread re-render.',
          'Offline behavior: connection status is always visible, the last data stays on screen, and the socket reconnects automatically with exponential backoff and jitter, using broadcast silence as the liveness signal instead of a heartbeat protocol.',
          'Pull-to-refresh reloads /pairs/meta through TanStack Query without touching the WebSocket. REST calls go through one axios client with a common error model and retries only for transient failures.',
          'Internationalized with i18next, with design tokens extracted from the Figma REST API, and a telemetry screen showing live JS-thread FPS and WebSocket message rate.',
        ],
      },
      {
        heading: 'Performance work',
        points: [
          'Traced FPS drops under live traffic to uncached Intl formatter construction and one React commit per WebSocket message, then to hidden tabs re-rendering on every tick (JS-thread FPS had collapsed to 15-19).',
          'Fixed with cached formatters, WebSocket-to-store updates batched to one flush per animation frame, throttled MMKV writes, memoized static content, and focus-gated live subscriptions. The app now holds about 60 FPS on the Android emulator with eight pairs streaming.',
        ],
      },
      {
        heading: 'Architecture and quality',
        points: [
          'Hexagonal (ports and adapters) backend with a single composition root and ESLint-enforced dependency direction; feature-first mobile structure with a small shared core layer.',
          'One Zod wire contract mirrored byte for byte between the two repositories, with a drift-check script.',
          'Strict TypeScript, ESLint, Conventional Commits and a three-stage Husky gate. 54 backend tests (unit plus integration against a real Fastify app and ws client) and 71 mobile unit tests.',
          'Every significant decision is recorded as an ADR (28 in total) covering the options considered, the rationale and the trade-offs accepted.',
        ],
      },
      {
        heading: 'Deployment and security',
        points: [
          'Multi-stage Docker image running as a non-root user, verified on Amazon Linux and hosted on AWS EC2 behind Caddy with HTTPS/WSS; the boot script and a least-privilege IAM policy are documented.',
          'Release builds refuse to start on plaintext URLs; the backend adds rate limiting, origin checks and validated configuration. A shareable arm64 release APK is built with EAS.',
        ],
      },
      {
        heading: 'AI-assisted, spec-driven workflow',
        points: [
          'Built end to end with Claude Code against written specs and ADRs, with typecheck, lint and tests run before every commit.',
          'Scope decisions, trade-offs and corrections were directed and reviewed by me, and each decision is recorded in the ADRs.',
        ],
      },
    ],
  },
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
      'ASP.NET Core (.NET 10) order management API built on Clean Architecture - MediatR domain events, Repository + Unit of Work, FluentValidation, and a full automated test suite.',
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
      'A complete, production-style ELK Stack 8.17.1 deployment via Docker Compose - multi-node Elasticsearch cluster, SSL/TLS between nodes, Kibana authentication, and Filebeat log shipping.',
    techStack: ['Elasticsearch', 'Kibana', 'Logstash', 'Filebeat', 'Docker Compose'],
    githubUrl: 'https://github.com/PathmikaW/elk-stack-docker-setup',
  },
  {
    id: 'my-portfolio',
    title: 'This Portfolio',
    description:
      'This site - a localized (English/Sinhala) personal portfolio built on Next.js 15 with the App Router, React 19, and Tailwind CSS 4.',
    techStack: ['Next.js 15', 'React 19', 'TypeScript', 'Tailwind CSS 4', 'next-intl'],
    githubUrl: 'https://github.com/PathmikaW/my-portfolio',
  },
];

export const industryProjects: IndustryProject[] = [
  {
    id: 'hutch-selfcare',
    name: 'Hutch Selfcare',
    category: 'Mobile',
    context: 'Telecom self-care app for Hutch (Sri Lanka) - dashboard, multi-connection management, loyalty, parental controls.',
    techStack: ['React Native 0.76', 'React Navigation 7', 'Firebase Cloud Messaging', 'Huawei HMS', 'SSL Pinning'],
    link: {
      label: 'View on Google Play',
      url: 'https://play.google.com/store/apps/details?id=com.omobio.etisalatone&hl=en&gl=US',
    },
    highlights: [
      'Built and maintained a React Native telecom self-care app covering the dashboard, multi-connection management, loyalty and offers, value-added services, login/OTP, and parental controls.',
      "Built the app's state management layer (React Context + useReducer) for sessions, connection switching, and app updates.",
      'Hardened the app against fraud with certificate pinning and device-integrity checks.',
      'Built push notifications that work on both Google and Huawei devices (Firebase Cloud Messaging and Huawei HMS), with rich media notifications on iOS.',
      'Built a custom animated promotional carousel and in-app QR/barcode scanning.',
      'Supported i18next-based localization across English, Sinhala, and Tamil.',
    ],
  },
  {
    id: 'circadian',
    name: 'Circadian - Native Alarm Engine & Monetization',
    category: 'Mobile',
    context: "A wellness app's fully custom, cross-platform native alarm engine and in-app subscription system.",
    techStack: ['React Native', 'Java', 'Kotlin', 'Swift', 'Objective-C', 'RevenueCat'],
    highlights: [
      'Developed a fully custom, cross-platform native alarm engine from the ground up in Java (Android) and Swift/Objective-C (iOS), bridged to a unified JavaScript API and replacing third-party alarm libraries.',
      'Made Android alarms reliable despite Doze mode and battery-optimization restrictions, including background and killed-app handling.',
      'Designed a reboot-persistence system that automatically re-arms all active alarms after device restart.',
      "Built the iOS alarm subsystem on Apple's local-notification scheduling framework, with custom gradual volume-ramp audio playback.",
      'Built an astronomy-driven scheduling engine that turns sunrise and sunset data into personalized wake, sleep, meal, exercise, and light-exposure alarms.',
      'Integrated RevenueCat for end-to-end in-app subscription purchasing and entitlement management across iOS StoreKit and Google Play Billing.',
      'Implemented regional subscription pricing by country.',
      'Built promotional discount and win-back retention flows.',
    ],
  },
  {
    id: 'vodafone-selfcare',
    name: 'Vodafone Selfcare (Fiji)',
    category: 'Mobile',
    context: 'Production self-care app for Vodafone Fiji - major React Native version upgrade and release engineering.',
    techStack: ['React Native', 'New Architecture/TurboModules', 'Redux', 'Firebase Crashlytics'],
    scopeNote: 'Scope: version upgrade, New Architecture scaffolding, and release engineering on an existing large codebase - not original feature design.',
    highlights: [
      'Led a major React Native version upgrade with New Architecture support (TurboModules, JSI) on a large, multi-year production codebase, including release engineering and field QA.',
      'Updated the Android native layer and third-party native dependencies for the upgrade, including a build break caused by the JCenter shutdown.',
      'Prepared the app for production release by removing debug logging and producing versioned release builds.',
      'Fixed display bugs in the postpaid balance screens and supported QA testing on production builds.',
    ],
  },
  {
    id: 'firewallbi',
    name: 'SMS Firewall AI/ML Suite & FirewallBI',
    category: 'Data Platforms & AI/ML',
    context: 'Telecom SMS-firewall AI/ML detection suite and business-intelligence platform, deployed as a centralized on-prem system.',
    techStack: ['Python', 'FastAPI', 'Next.js', 'XGBoost', 'CatBoost', 'SentenceTransformers', 'Ollama', 'Elasticsearch', 'Kibana', 'Logstash', 'Docker', 'GitLab CI/CD', 'PostgreSQL', 'Erlang/OTP'],
    highlights: [
      'Led this flagship AI/ML R&D initiative as Associate Tech Lead, extending the fraud-detection engine and reporting layer.',
      'Architected and led a modular SMS Firewall AI/ML Suite (FastAPI, containerized modules, single admin CMS) covering OTP-bypass, encoded-Unicode, phishing-URL, grey-route, and campaign detection.',
      'Built the OTP-bypass and grey-route detection module using semantic embeddings and similarity matching.',
      'Phishing-URL detection module: an ensemble ML classifier combining XGBoost and CatBoost with SHAP explainability and Optuna hyperparameter tuning.',
      'Added a local-LLM GenAI layer (Gemma via Ollama and LangChain) supporting content review and translation across the suite, with multilingual embeddings for semantic search and automatic language detection.',
      'Built a Next.js management dashboard (Reporting CMS) surfacing fraud-detection outputs and firewall rule controls atop the FastAPI detection backend.',
      'Architected FirewallBI as a centralized on-prem BI platform, evolving it from an early ELK-based prototype into a production containerized system.',
      'Evaluated cloud, hybrid, and on-prem architectures and orchestration tools before choosing the shipped design.',
      'Set up a secured multi-node Elasticsearch cluster with TLS and role-based access.',
      "Built the platform's data pipelines (Logstash, PostgreSQL rollups) and an automated data-reconciliation framework with alerting.",
      'Contributed risk scoring and graph-based fraud-ring detection to an R&D flash-call fraud-detection prototype.',
    ],
  },
  {
    id: 'sor',
    name: 'SOR - Steering of Roaming (Centralized Reporting Platform)',
    category: 'Data Platforms & AI/ML',
    context: 'Centralized web-based telecom data-reporting platform spanning backend pipelines through web dashboards.',
    techStack: ['Python', 'Celery', 'PostgreSQL', 'ClickHouse', 'Elasticsearch', 'Apache Superset', 'Prometheus', 'Grafana', 'Docker', 'GitHub Actions'],
    highlights: [
      'Led the SOR (Steering of Roaming) centralized reporting platform as a flagship initiative, from backend pipelines to web dashboards.',
      'Built asynchronous task processing with Celery and containerized deployment with Docker.',
      'Tech stack spans Python, Celery, PostgreSQL, ClickHouse, and Elasticsearch for data processing and storage, Apache Superset for BI dashboards, Prometheus and Grafana for monitoring, and GitHub Actions for CI/CD.',
    ],
  },
  {
    id: 'hopp',
    name: "HOPP - Hutch Web Self-Care Portal",
    category: 'Web',
    context: "Hutch's Next.js 14 web self-care portal.",
    techStack: ['Next.js 14', 'React', 'TypeScript', 'Tailwind CSS', 'shadcn/ui', 'next-intl', 'Axios'],
    highlights: [
      'Led the project team building HOPP and took it to production, owning the frontend architecture and core infrastructure.',
      'Built a custom backend-driven image CAPTCHA component instead of relying on a third-party reCAPTCHA package.',
      'Integrated a bank payment gateway end to end, alongside multiple card payment methods.',
      'Enforced Conventional Commits with Husky, lint-staged, and Commitlint, delivered under a company-wide Hybrid Git Flow branching model.',
    ],
  },
  {
    id: 'banglalink-smsc',
    name: 'SMSC Reporting Engineering (Bangladesh)',
    category: 'Data Platforms & AI/ML',
    context: "Report validation and data engineering for a telecom operator's SMSC billing/reporting platform (Bangladesh).",
    techStack: ['SQL', 'MariaDB', 'MySQL', 'AWK', 'Python', 'ETL'],
    highlights: [
      'Contributed to SQL/CDR reporting engineering for the SMSC billing platform, recovering previously dropped records and fixing a major query-performance regression through targeted database indexing.',
      'Documented how raw call records map to each report, and built automated cross-validation scripts to check report accuracy against source logs.',
      'Found and fixed several report-accuracy defects in time-window filtering and scheduled aggregation.',
      'Designed and built a new delay-statistics reporting pipeline end to end: database schema, scheduled aggregation, and a Python processor deployed to production.',
      'Extended the record-processing schema with a new field and documented the logic behind dozens of report types.',
    ],
  },
  {
    id: 'mda',
    name: 'MDA - Dialog Device Management Platform',
    category: 'Web',
    context: "Dialog Axiata's Mobile Device Management platform.",
    techStack: ['React', 'Redux', 'Material-UI', 'JavaScript'],
    scopeNote: 'Scope: contributed to the React admin-console frontend of an existing platform; the PHP backend and Erlang/OTP signaling core were owned by other teams.',
    highlights: [
      "Contributed to the React admin console (Material-UI, Redux state management) of Dialog Axiata's Mobile Device Management (MDM) platform, a carrier-grade admin system also comprising a PHP Yii2 backend and an Erlang/OTP telecom-signaling core.",
      "Built device-management UI in the React admin console for the platform's device-blocking subsystem.",
      'Built UI for device-configuration and SMS-campaign scheduling features, including an SMS segment counter.',
    ],
  },
  {
    id: 'cmdp',
    name: 'Dialog CDR Disclosure Portal',
    category: 'Web',
    context: "Dialog's portal for handling authorized call-record disclosure requests.",
    techStack: ['PHP', 'Yii2', 'React', 'Material-UI', 'Java'],
    scopeNote: 'Scope: targeted bug fixes and QA/deployment support, not platform authorship.',
    highlights: [
      'Fixed search defects in the request-management interface and updated build configuration for a test environment.',
      'Supported QA and production deployments and fixed a file-download defect.',
    ],
  },
  {
    id: 'bangla-sms',
    name: 'SMS Opt-In/Opt-Out Platform (Bangladesh)',
    category: 'Web',
    context: 'SMS language-preference (opt-in/opt-out) platform for a telecom operator in Bangladesh.',
    techStack: ['Erlang', 'PHP', 'Yii2', 'React', 'MariaDB', 'Redis'],
    scopeNote: 'Scope: requirements review, solution scoping, and initial project setup.',
    highlights: [
      'Reviewed the SRS and contributed solution architecture for the platform (Erlang core, PHP/React interface, clustered database, Redis, high availability).',
      'Reviewed platform scope: user roles, bulk preference management, daily data sync, and low-latency real-time APIs.',
      'Set up the initial project repository, reusing an existing internal platform as the starting point.',
    ],
  },
  {
    id: 'dtel',
    name: 'Dtel',
    category: 'Mobile',
    context: "React Native app for Dialog's fixed-line/home-telecom brand - security and infrastructure foundation.",
    techStack: ['React Native', 'Redux', 'redux-persist', 'Firebase'],
    scopeNote: 'Scope: early architecture and foundation work, before feature development.',
    highlights: [
      'Built the security and infrastructure layer for Dtel ahead of feature development.',
      'Implemented certificate pinning and request-integrity checks between the app and its backend.',
      'Configured encrypted, selective Redux persistence to disk-persist only non-sensitive locale/config state, keeping session data out of unencrypted storage.',
      'Set up multi-language support that loads a small language bundle at startup and full translations after login.',
      'Integrated Firebase for crash reporting, performance monitoring, remote config, and messaging.',
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
      'Generated password-protected PDF slips for each employee.',
      'Built a verification step that checks payroll data against HR records before generating slips, including date-format cleanup.',
      'Added automatic correction of mismatched records, with a backup of the source file first.',
      'Tracked slip generation and email delivery separately for each employee, with audit logs.',
      'Packaged the tool as a standalone Windows executable for non-technical HR use.',
    ],
  },
  {
    id: 'retailhub',
    name: 'RetailHub',
    category: 'Web',
    context: "Dialog's retail/device-sales web platform.",
    techStack: ['Docker', 'CI/CD'],
    highlights: [
      'Supported RetailHub as part of a containerized platform family, with vulnerability scanning built into the CI pipeline.',
    ],
  },
  {
    id: 'pre-sales-architecture',
    name: 'Pre-Sales & Solution Architecture',
    category: 'Pre-Sales & Architecture',
    context: 'Technical architecture proposals and effort estimation across telecom operators.',
    techStack: ['Solution Architecture', 'Effort Estimation', 'RFP/RFQ Response'],
    scopeNote: 'Proposal and architecture work - not delivered/shipped software.',
    highlights: [
      'Authored technical architecture proposals and effort estimates for telecom operators across South Asia, Africa, and the Middle East, spanning AI/ML fraud and CVM platforms, large-scale CDR search infrastructure, and roaming/steering solutions.',
      'Served as technical subject-matter expert in client-facing pre-sales engagements, producing solution validation and technical responses to RFPs/RFQs.',
      'Compiled competitive and market research (e.g., flash-call fraud market sizing) to support solution positioning.',
    ],
  },
];
