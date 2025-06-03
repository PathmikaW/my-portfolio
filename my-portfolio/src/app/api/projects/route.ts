import { NextResponse } from 'next/server';

export async function GET() {
  const projects = [
    // Section: Project Leadership & Delivery
    {
      id: 1,
      section: 'Project Leadership & Delivery',
      title: 'Agile/Hybrid Project Leadership',
      description: 'Led teams using Agile/Hybrid methodologies for successful project delivery, contributed to ISO 27001, Git standardization, pre-sales & SOW alignment.',
      techStack: ['Agile', 'ISO 27001', 'Git', 'SOW'],
      moreDetailsHtml: `
        <p>Led multiple project teams using Agile, Scrum, and hybrid delivery models to ensure timely releases for telecom and enterprise clients.</p>
        <ul>
          <li>Defined project processes and delivery workflows</li>
          <li>Contributed to ISO 27001 audits and documentation</li>
          <li>Established Git branching strategies and CI/CD pipelines</li>
          <li>Supported pre-sales with effort estimation and SOW preparation</li>
        </ul>
      `,
    },

    // Section: Mobile App Development
    {
      id: 2,
      section: 'Mobile App Development',
      title: 'Hutch Selfcare App',
      description: 'Built and deployed cross-platform app with React Native.',
      techStack: ['React Native', 'Java/Kotlin', 'Swift', 'REST API'],
      url: 'https://play.google.com/store/apps/details?id=com.hutch.selfcare',
      moreDetailsHtml: `
        <p>Developed and maintained the Hutch Selfcare App for Android & iOS platforms.</p>
        <ul>
          <li>Integrated with telecom backend APIs for balance, usage, and billing</li>
          <li>Implemented biometric authentication and push notifications</li>
          <li>Optimized app performance and store rating to 4.5+</li>
        </ul>
      `,
    },
    {
      id: 3,
      section: 'Mobile App Development',
      title: 'Vodafone Selfcare',
      description: 'Managed native integrations and store deployments.',
      techStack: ['React Native', 'Kotlin', 'Swift'],
      moreDetailsHtml: `
        <p>Delivered Vodafone Selfcare with extensive native features:</p>
        <ul>
          <li>Deep linking and in-app dynamic offers</li>
          <li>Integrated with Vodafone’s CI/CD pipelines</li>
          <li>Handled Google Play and App Store deployments</li>
        </ul>
      `,
    },
    {
      id: 4,
      section: 'Mobile App Development',
      title: 'MyDialog, RetailHub, Dtel, Circadian, SFA',
      description: 'Full feature delivery & store deployments across multiple apps.',
      techStack: ['React Native', 'Flutter', 'Native Modules'],
      moreDetailsHtml: `
        <p>Contributed to several key mobile apps:</p>
        <ul>
          <li>MyDialog: React Native app with custom telco modules</li>
          <li>RetailHub: B2B retail management with Bluetooth printer support</li>
          <li>Circadian & Dtel: Healthcare and telco apps</li>
          <li>SFA: Sales Force Automation app (Flutter)</li>
        </ul>
      `,
    },

    // Section: Web Development
    {
      id: 5,
      section: 'Web Development',
      title: 'HOPP',
      description: 'Secure, scalable web app using Next.js and React.',
      techStack: ['Next.js', 'React.js', 'TypeScript'],
      moreDetailsHtml: `
        <p>Built a scalable web app for the HOPP project:</p>
        <ul>
          <li>Server-side rendering with Next.js</li>
          <li>JWT-based authentication</li>
          <li>Optimized lighthouse score 95+</li>
        </ul>
      `,
    },
    {
      id: 6,
      section: 'Web Development',
      title: 'Bangla SMS, MDA, SFA (Web)',
      description: 'Developed various web applications for telecom.',
      techStack: ['React.js', 'Ext.js', 'Next.js', 'PostgreSQL'],
      moreDetailsHtml: `
        <p>Developed multiple enterprise web apps:</p>
        <ul>
          <li>Bangla SMS: Rich SMS editor with language support</li>
          <li>MDA: Mobile Device Analytics dashboard</li>
          <li>SFA (Web): Sales force reporting web portal</li>
        </ul>
      `,
    },

    // Section: AI/ML Contributions
    {
      id: 7,
      section: 'AI/ML Contributions',
      title: 'Telecom AIML Modules',
      description: 'Contributed to A2P, Campaign Detection & Insights.',
      techStack: ['Python', 'LangChain', 'Qdrant', 'Rasa', 'ChatGPT'],
      moreDetailsHtml: `
        <p>Designed and implemented AI/ML modules for telecom clients:</p>
        <ul>
          <li>A2P Spam Detection using LangChain and Qdrant vector DB</li>
          <li>Campaign Detection using NLP and pattern matching</li>
          <li>Integrated Rasa-based chatbots for internal support</li>
        </ul>
      `,
    },
    {
      id: 8,
      section: 'AI/ML Contributions',
      title: '5G Pre-Sales Solution',
      description: 'Designed system architecture for 5G pre-sales AI solution.',
      techStack: ['Python', 'LangChain', 'Telco Data Engineering'],
      moreDetailsHtml: `
        <p>Architected a predictive AI solution for 5G pre-sales:</p>
        <ul>
          <li>Data pipeline for telco usage & customer segmentation</li>
          <li>AI-driven coverage prediction</li>
          <li>Dynamic pricing models for enterprise sales</li>
        </ul>
      `,
    },
    {
      id: 9,
      section: 'AI/ML Contributions',
      title: 'Telco AI/ML Demo Modules',
      description: 'Developed demo modules for telecom-specific AI/ML solutions.',
      techStack: ['Python', 'LangChain', 'LLM', 'NLP'],
      moreDetailsHtml: `
        <p>Created multiple AI/ML demo modules for POCs:</p>
        <ul>
          <li>Churn prediction model</li>
          <li>Customer Lifetime Value prediction</li>
          <li>AI-based telco Q&A bot (LangChain + GPT)</li>
        </ul>
      `,
    },

    // Section: ELK Stack Implementation
    {
      id: 10,
      section: 'ELK Stack Implementation',
      title: 'FirewallBI & Data Visualization',
      description: 'Architected and deployed ELK-based Data Visualization Platform.',
      techStack: ['ELK Stack', 'Kibana', 'PostgreSQL', 'Airflow', 'Docker'],
      moreDetailsHtml: `
        <p>Designed a data visualization platform using ELK Stack:</p>
        <ul>
          <li>Elasticsearch for storing firewall logs</li>
          <li>Kibana dashboards for real-time insights</li>
          <li>Airflow for data pipeline orchestration</li>
          <li>PostgreSQL for structured reporting</li>
        </ul>
      `,
    },

    // Section: Automation Tools
    {
      id: 11,
      section: 'Automation Tools',
      title: 'Salary Slip Generation System',
      description: 'Automates payroll email distribution company-wide.',
      techStack: ['Python', 'Email Automation', 'SMTP'],
      moreDetailsHtml: `
        <p>Developed an internal automation tool:</p>
        <ul>
          <li>Generates personalized salary slips in PDF format</li>
          <li>Emails to all employees via SMTP integration</li>
          <li>Integrated with HRIS for secure data access</li>
        </ul>
      `,
    },

    // Section: University Projects
    {
      id: 12,
      section: 'University Projects',
      title: 'MDASP',
      description: 'Admin dashboard for data services using Vue.js & Laravel.',
      techStack: ['Vue.js', 'Laravel'],
      moreDetailsHtml: `
        <p>Developed a university project for MDASP:</p>
        <ul>
          <li>Admin dashboard with user role management</li>
          <li>Dynamic data grids and charts</li>
          <li>REST API integration</li>
        </ul>
      `,
    },
    {
      id: 13,
      section: 'University Projects',
      title: 'Food Service System',
      description: 'Full stack app built with HTML/CSS/JS/PHP.',
      techStack: ['HTML', 'CSS', 'JavaScript', 'PHP'],
      moreDetailsHtml: `
        <p>Designed and developed a food service web app:</p>
        <ul>
          <li>Menu management</li>
          <li>Order processing</li>
          <li>Basic reporting</li>
        </ul>
      `,
    },
    {
      id: 14,
      section: 'University Projects',
      title: 'FREELAN Business Analysis',
      description: 'Research with actionable insights presentation.',
      techStack: ['Business Analysis', 'Presentation'],
      moreDetailsHtml: `
        <p>Conducted business analysis for FREELAN:</p>
        <ul>
          <li>Market research and competitor analysis</li>
          <li>SWOT and PESTEL analysis</li>
          <li>Presented actionable recommendations</li>
        </ul>
      `,
    },
  ];

  return NextResponse.json(projects);
}
