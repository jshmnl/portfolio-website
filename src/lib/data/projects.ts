export interface SchemaColumn {
  name: string
  type: string
  constraint?: string
  nullable?: boolean
  note?: string
}

export interface SchemaTable {
  name: string
  columns: SchemaColumn[]
}

export interface ProjectScreenshot {
  src: string
  caption: string
}

export interface Project {
  slug: string
  title: string
  subtitle: string
  year: number
  role: string
  context: string
  stack: string[]
  problem: string
  architectureDescription: string
  features: string[]
  schema: SchemaTable[]
  outcome: string
  tableCount: number
  heroScreenshot: string
  screenshots: ProjectScreenshot[]
}

export const projects: Project[] = [
  {
    slug: 'project-monitoring-system',
    title: 'Government Procurement Monitoring System',
    subtitle: 'OJT Project @ BTR-DAD | Full-Stack Developer & DBA',
    year: 2026,
    role: 'Full-Stack Developer & Database Administrator',
    context: 'On-the-Job Training',
    stack: ['Laravel 12', 'PHP 8.2', 'PostgreSQL', 'Alpine.js', 'Tailwind CSS', 'Chart.js', 'Vite'],
    problem:
      'The Bureau of Treasury – Domestic Debt Management division managed hundreds of government procurement projects manually, with no centralized system to track budget allocations, procurement modes, or project lifecycle status across fiscal years. This created bottlenecks in accountability and reporting — with no audit trail for who changed what, when.',
    architectureDescription:
      'Built on Laravel\'s MVC pattern with PostgreSQL as the primary data store. Blade templates handle server-side rendering, with Alpine.js adding reactivity for form interactions, status dropdowns, and table filters — no full page reloads needed. Chart.js integrates directly into Blade views for budget visualizations across CO and MOOE classifications. The audit trail is implemented through Eloquent model observers that fire on every create, update, delete, and restore event — capturing old and new field values as JSON snapshots and writing them to audit_logs. Role-based access is enforced at the middleware layer before any controller logic executes, ensuring officers cannot access admin routes regardless of URL manipulation.',
    features: [
      'Role-based access control (Admin / Officer / Viewer)',
      'Real-time audit trail capturing old & new field values',
      'Multi-fiscal-year project tracking with year scopes',
      'CSV report export and summary dashboards',
      'Soft delete with full restoration capability',
      'Chart.js budget visualization across CO & MOOE classes',
    ],
    schema: [
      {
        name: 'users',
        columns: [
          { name: 'id',                      type: 'BIGINT',       constraint: 'PK',               nullable: false },
          { name: 'name',                    type: 'VARCHAR(255)',                                  nullable: false },
          { name: 'email',                   type: 'VARCHAR(255)', constraint: 'UNIQUE',            nullable: false },
          { name: 'role',                    type: 'VARCHAR(255)', constraint: "DEFAULT 'officer'", nullable: false, note: 'admin | officer | viewer' },
          { name: 'password',                type: 'VARCHAR(255)',                                  nullable: false },
          { name: 'email_verified_at',       type: 'TIMESTAMP',                                    nullable: true  },
          { name: 'created_at / updated_at', type: 'TIMESTAMP',                                    nullable: false },
        ],
      },
      {
        name: 'projects',
        columns: [
          { name: 'id',                      type: 'BIGINT',        constraint: 'PK',                  nullable: false },
          { name: 'created_by',              type: 'BIGINT',        constraint: 'FK → users',          nullable: true  },
          { name: 'code',                    type: 'VARCHAR(255)',                                      nullable: false, note: 'Unique per fiscal year' },
          { name: 'name',                    type: 'VARCHAR(255)',                                      nullable: false },
          { name: 'office',                  type: 'VARCHAR(255)',                                      nullable: false },
          { name: 'cls',                     type: 'VARCHAR(255)',                                      nullable: false, note: 'CO | MOOE' },
          { name: 'year',                    type: 'SMALLINT',      constraint: 'DEFAULT 2025',         nullable: false },
          { name: 'nep',                     type: 'DECIMAL(15,2)', constraint: 'DEFAULT 0',            nullable: false, note: 'National Expenditure Program' },
          { name: 'adj',                     type: 'DECIMAL(15,2)', constraint: 'DEFAULT 0',            nullable: false, note: 'Adjusted budget' },
          { name: 'abc',                     type: 'DECIMAL(15,2)', constraint: 'DEFAULT 0',            nullable: false, note: 'Approved Budget for Contract' },
          { name: 'contracted',              type: 'DECIMAL(15,2)', constraint: 'DEFAULT 0',            nullable: false },
          { name: 'sav1 / sav2 / sav3',     type: 'DECIMAL(15,2)',                                     nullable: false, note: 'Three savings categories' },
          { name: 'freeup / earmarked',      type: 'DECIMAL(15,2)',                                     nullable: false },
          { name: 'procmode',                type: 'VARCHAR(255)',                                      nullable: true  },
          { name: 'payterms',                type: 'VARCHAR(255)',                                      nullable: true  },
          { name: 'status',                  type: 'VARCHAR(255)',  constraint: "DEFAULT 'Pending'",    nullable: false },
          { name: 'desc / tor',              type: 'TEXT',                                              nullable: true  },
          { name: 'accountable',             type: 'JSONB',                                             nullable: true,  note: 'Accountable persons' },
          { name: 'bac',                     type: 'JSONB',                                             nullable: true,  note: 'Bids & Awards Committee' },
          { name: 'execution / contract',    type: 'JSONB',                                             nullable: true  },
          { name: 'implementation',          type: 'JSONB',                                             nullable: true  },
          { name: 'deleted_at',              type: 'TIMESTAMP',     constraint: 'SOFT DELETE',          nullable: true  },
          { name: 'created_at / updated_at', type: 'TIMESTAMP',                                         nullable: false },
        ],
      },
      {
        name: 'audit_logs',
        columns: [
          { name: 'id',           type: 'BIGINT',       constraint: 'PK',             nullable: false },
          { name: 'user_id',      type: 'BIGINT',       constraint: 'FK → users',     nullable: true  },
          { name: 'project_id',   type: 'BIGINT',       constraint: 'FK → projects',  nullable: true  },
          { name: 'action',       type: 'VARCHAR(255)',                                nullable: false, note: 'created | updated | deleted | restored' },
          { name: 'project_code', type: 'VARCHAR(255)',                                nullable: true,  note: 'Denormalized for deleted records' },
          { name: 'project_name', type: 'VARCHAR(255)',                                nullable: true,  note: 'Denormalized for deleted records' },
          { name: 'old_values',   type: 'JSON',                                        nullable: true  },
          { name: 'new_values',   type: 'JSON',                                        nullable: true  },
          { name: 'ip_address',   type: 'VARCHAR(45)',                                 nullable: true  },
          { name: 'user_agent',   type: 'TEXT',                                        nullable: true  },
          { name: 'created_at',   type: 'TIMESTAMP',                                  nullable: false },
        ],
      },
    ],
    outcome:
      'Delivered a production-ready government procurement monitoring system with a complete audit trail, role-based workflows, and multi-dimensional budget tracking across fiscal years — deployed and used by the BTR-DAD division.',
    tableCount: 3,
    heroScreenshot: '/screenshots/btr-dashboard.png',
    screenshots: [
      { src: '/screenshots/btr-dashboard.png',        caption: 'Dashboard — KPI cards and Chart.js budget visualizations' },
      { src: '/screenshots/btr-projects-list.png',    caption: 'Projects Table — filterable list with status badges and pagination' },
      { src: '/screenshots/btr-new-project.png',      caption: 'New Project Wizard — 8-step multi-section form' },
      { src: '/screenshots/btr-budget-allocation.png',caption: 'Budget Allocation — horizontal bar chart by office' },
    ],
  },
  {
    slug: 'labor-law-case-analyzer',
    title: 'Philippine Labor Law Case Analyzer',
    subtitle: 'Thesis Project | Full-Stack Developer & ML Engineer',
    year: 2026,
    role: 'Full-Stack Developer, AI Integration Engineer',
    context: 'Undergraduate Thesis',
    stack: ['Laravel 12', 'PHP 8.2', 'Tailwind CSS 4', 'Z.AI API', 'DOMPDF', 'Vite', 'PostgreSQL'],
    problem:
      'Philippine labor law practitioners and workers lack accessible tools to objectively assess the likely outcome of illegal dismissal cases. Legal signal analysis requires deep domain expertise, making pre-litigation assessment expensive and inaccessible to ordinary workers who cannot afford legal counsel.',
    architectureDescription:
      'A Laravel MVC application backed by PostgreSQL. PDF uploads are processed server-side — a custom text extraction pipeline parses the document and pattern-matches against 14 legal signal definitions. The rule-based prediction engine is a dedicated PHP service class that independently scores each signal by weighted value, then computes a normalized confidence score on a 0.0–1.0 scale. Z.AI API requests are dispatched synchronously during analysis, with the full LLM response stored as JSONB alongside the rule-based scores for re-rendering without re-querying. All analysis data lives in a single case_analyses table using JSON columns for nested structures like signal breakdowns, legal doctrines, and recommended reliefs.',
    features: [
      'Dual input: PDF upload or manual signal entry',
      'Rule-based prediction engine with 14 weighted legal signals',
      'Z.AI-powered analysis — doctrines, reliefs, precedents',
      'Automated PDF text extraction & signal auto-detection',
      'Case history with filtering, search, and CSV export',
      'Confidence scoring system on a 0.0–1.0 scale',
    ],
    schema: [
      {
        name: 'case_analyses',
        columns: [
          { name: 'id',                      type: 'BIGINT',       constraint: 'PK',                      nullable: false },
          { name: 'case_title',              type: 'VARCHAR(255)', constraint: "DEFAULT 'Untitled Case'",  nullable: false },
          { name: 'input_mode',              type: 'ENUM',                                                 nullable: false, note: 'pdf | manual' },
          { name: 'description',             type: 'TEXT',                                                 nullable: true  },
          { name: 'signals',                 type: 'JSON',                                                 nullable: true,  note: 'Array of detected legal signals' },
          { name: 'extracted_text',          type: 'LONGTEXT',                                             nullable: true  },
          { name: 'pdf_path',                type: 'VARCHAR(255)',                                         nullable: true  },
          { name: 'predicted_outcome',       type: 'VARCHAR(255)',                                         nullable: false, note: 'EMPLOYEE_WINS | EMPLOYER_WINS | PARTIAL' },
          { name: 'confidence_score',        type: 'FLOAT',                                                nullable: false, note: '0.0 – 1.0 scale' },
          { name: 'signal_breakdown',        type: 'JSON',                                                 nullable: true,  note: 'Per-signal impact analysis' },
          { name: 'legal_doctrines',         type: 'JSON',                                                 nullable: true  },
          { name: 'reliefs',                 type: 'JSON',                                                 nullable: true,  note: 'Reinstatement, backwages, damages' },
          { name: 'similar_cases',           type: 'JSON',                                                 nullable: true  },
          { name: 'strengths_weaknesses',    type: 'JSON',                                                 nullable: true  },
          { name: 'ai_analysis',             type: 'JSON',                                                 nullable: true,  note: 'Z.AI full response object' },
          { name: 'created_at / updated_at', type: 'TIMESTAMP',                                            nullable: false },
        ],
      },
    ],
    outcome:
      'Built an accessible legal tech tool that democratizes labor law case analysis using a hybrid rule-based + AI prediction system, achieving reliable outcome prediction for Philippine illegal dismissal cases — making professional-grade legal assessment available to anyone.',
    tableCount: 1,
    heroScreenshot: '/screenshots/thesis-landing.png',
    screenshots: [
      { src: '/screenshots/thesis-landing.png',    caption: 'Landing — hero with floating prediction cards' },
      { src: '/screenshots/thesis-analyze.png',    caption: 'Analyze — case input form' },
      { src: '/screenshots/thesis-signals.png',    caption: 'Signals — legal signal selection grid' },
      { src: '/screenshots/thesis-history.png',    caption: 'History — analysis log with stats' },
      { src: '/screenshots/thesis-result.png',     caption: 'Result — Employee Wins at 86% confidence' },
      { src: '/screenshots/thesis-breakdown.png',  caption: 'Breakdown — signal breakdown and outcome slider' },
      { src: '/screenshots/thesis-strengths.png',  caption: 'Strengths & Weaknesses — dual-column analysis' },
    ],
  },
]

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug)
}
