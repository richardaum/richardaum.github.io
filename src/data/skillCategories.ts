export const skillCategories = {
  // Languages
  JavaScript: ["languages"],
  TypeScript: ["languages"],
  Java: ["languages"],
  Kotlin: ["languages"],

  // Frontend
  React: ["frontend"],
  "Next.js": ["frontend"],
  "Angular.js": ["frontend"],
  "CSS Modules": ["frontend"],
  CSS: ["frontend"],
  SASS: ["frontend"],
  TailwindCSS: ["frontend"],
  "Styled Components": ["frontend"],
  HTML: ["frontend"],
  Vite: ["frontend", "tooling"],
  "React Query": ["frontend"],
  "Design Systems": ["frontend"],
  "Micro-frontends": ["frontend", "architecture"],
  "Progressive Web Apps (PWA)": ["frontend"],
  "Responsive design": ["frontend"],
  Accessibility: ["frontend"],

  // Backend and APIs
  "Node.js": ["backend"],
  Express: ["backend"],
  "Express.js": ["backend"],
  NestJS: ["backend"],
  Fastify: ["backend"],
  GraphQL: ["backend", "apis"],
  TypeORM: ["backend", "data"],
  BFF: ["backend", "architecture"],
  WebSockets: ["backend", "apis"],
  "Bolt for Slack": ["apis"],

  // Data
  PostgreSQL: ["data"],
  MySQL: ["data"],
  SQLite: ["data"],
  Contentful: ["data"],

  // Testing and quality
  Jest: ["testing"],
  "React Testing Library": ["testing"],
  Cypress: ["testing"],
  Mocha: ["testing"],
  Enzyme: ["testing"],
  ESLint: ["quality"],

  // Tooling and delivery
  Git: ["tooling"],
  Yarn: ["tooling"],
  Webpack: ["tooling"],
  Babel: ["tooling"],
  Docker: ["delivery"],
  DigitalOcean: ["delivery"],
  Dokku: ["delivery"],
  "Github Pages": ["delivery"],
  "Github Actions": ["delivery"],
  "Script automation": ["tooling"],

  // Architecture and leadership
  "Technical Leadership": ["leadership"],

  // AI-assisted development
  "Claude Code": ["ai"],
  Cursor: ["ai"],
} as const;

export type SkillCategory = (typeof skillCategories)[keyof typeof skillCategories][number];

export const skillCategoryOrder: SkillCategory[] = [
  "frontend",
  "languages",
  "architecture",
  "testing",
  "quality",
  "backend",
  "apis",
  "data",
  "tooling",
  "delivery",
  "ai",
  "leadership",
];

export const skillCategoryLabels: Record<SkillCategory, string> = {
  frontend: "Frontend",
  languages: "Languages",
  architecture: "Architecture",
  testing: "Testing",
  quality: "Code quality",
  backend: "Backend",
  apis: "APIs and integrations",
  data: "Data",
  tooling: "Tooling",
  delivery: "Delivery and infrastructure",
  ai: "AI-assisted development",
  leadership: "Leadership",
};
