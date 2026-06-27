export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Our Work", href: "/our-work" },
  { label: "Contact", href: "/contact" },
];

// ─── ACCENT COLOR (Steel Silver — replaces #007AFF everywhere) ────────────
// Use these CSS variables instead of hardcoded colors:
// var(--accent)       → #8D9AB0  (steel silver)
// var(--accent-light) → #B0BDD0  (light silver)
// var(--accent-glow)  → rgba(141,154,176,0.25)

// ─── SERVICES ─────────────────────────────────────────────────────────────
export const SERVICES = [
  {
    id: 1,
    icon: "video",
    title: "Graphic Design & Video Editing",
    desc: "Eye-catching designs and professional video editing that reflect your brand's personality and serve your marketing message — built to stop the scroll.",
    tags: ["Motion Graphics", "Video Editing", "Visual Design"],
  },
  {
    id: 2,
    icon: "palette",
    title: "Branding & Visual Identity",
    desc: "We build your full visual identity from the ground up — logo, color palette, tone of voice, and brand guidelines — to make your brand impossible to ignore.",
    tags: ["Logo Design", "Brand Guidelines", "Visual System"],
  },
  {
    id: 3,
    icon: "pen-tool",
    title: "Content Creation & Copywriting",
    desc: "Professional content written in your brand's unique voice — educational, marketing, and sales-driven copy that resonates with your audience and converts.",
    tags: ["Copywriting", "Reels Scripts", "Educational Content"],
  },
  {
    id: 4,
    icon: "trending-up",
    title: "Paid Ads & Performance Marketing",
    desc: "We manage paid ad campaigns across multiple platforms targeting serious buyers — with one goal: attract customers, generate bookings, and grow your sales.",
    tags: ["Meta Ads", "Google Ads", "TikTok Ads"],
  },
  {
    id: 5,
    icon: "users",
    title: "Social Media Management",
    desc: "Full management and growth of your social media accounts — from content planning and publishing to community engagement, analytics, and continuous optimization.",
    tags: ["Community Mgmt", "Analytics", "Content Calendar"],
  },
  {
    id: 6,
    icon: "globe",
    title: "Website Design & Development",
    desc: "We design and build fast, modern, conversion-optimized websites — from landing pages to full business sites — that reflect your brand and turn visitors into clients.",
    tags: ["Landing Pages", "Business Sites", "UI/UX Design"],
  },
];

// ─── VALUES ───────────────────────────────────────────────────────────────
export const VALUES = [
  {
    icon: "trending-up",
    title: "Growth",
    desc: "Continuous development is in our DNA. We never stop learning, optimizing, and pushing for better results — for ourselves and for every brand we work with.",
    gradient: "from-blue-500/20 to-transparent",
  },
  {
    icon: "eye",
    title: "Transparency",
    desc: "No black boxes. You get full visibility into our strategy, spending, and results. Honest reporting and open communication — always.",
    gradient: "from-purple-500/20 to-transparent",
  },
  {
    icon: "zap",
    title: "Creativity",
    desc: "We reject the generic. Every campaign, every design, and every piece of content is crafted to stand out and make a real impression in a crowded market.",
    gradient: "from-amber-500/20 to-transparent",
  },
  {
    icon: "shield",
    title: "Commitment",
    desc: "We treat your brand like it's our own. Full commitment to quality, deadlines, and your goals — we don't just deliver, we go the extra mile.",
    gradient: "from-emerald-500/20 to-transparent",
  },
];

// ─── METRICS ──────────────────────────────────────────────────────────────
export const METRICS = [
  { value: "1M+", label: "Impressions Delivered", sub: "In KSA alone" },
  { value: "3", label: "Countries Served", sub: "KSA · Egypt · and growing" },
  { value: "6", label: "Core Services", sub: "Full-funnel capability" },
  { value: "100%", label: "Commitment", sub: "To every brand we take on" },
];

// ─── CLIENTS (generic — no real names) ────────────────────────────────────
export const CLIENTS = [
  "Construction Sector",
  "Engineering Firms",
  "Medical Clinics",
  "Healthcare Specialists",
  "Restaurants & Cafés",
  "Podcast Creators",
  "E-Commerce Stores",
  "Real Estate Brands",
  "Food & Beverage",
  "Media Shows",
  "Consulting Firms",
  "Service Businesses",
];

// ─── PORTFOLIO ────────────────────────────────────────────────────────────
export const PORTFOLIO = [
  {
    id: 1,
    region: "KSA",
    sector: "Construction",
    title: "Construction & Engineering — KSA",
    desc: "Performance-driven ad campaigns for construction companies and engineering consultancies, targeting serious B2B clients — resulting in significantly increased sales inquiries.",
    result: "+Sales Demand",
    tags: ["Performance Ads", "B2B Strategy", "Content"],
    color: "#8D9AB0",
  },
  {
    id: 2,
    region: "KSA",
    sector: "Branding",
    title: "Brand Visual Identity — KSA",
    desc: "Built complete visual identity systems for Saudi brands from scratch — covering logos, visual guidelines, content tone, and full brand documentation.",
    result: "Full Identity",
    tags: ["Branding", "Visual Guidelines", "Logo"],
    color: "#A0AABC",
  },
  {
    id: 3,
    region: "KSA",
    sector: "Paid Ads",
    title: "1000000+ Impressions Campaign — KSA",
    desc: "Managed high-performance paid ad campaigns in the Saudi market that exceeded 1,000,000 impressions in a short period — targeting the right audience with trust-building creative.",
    result: "1M+ Impressions",
    tags: ["Meta Ads", "Creative", "Performance"],
    color: "#B0BDD0",
  },
  {
    id: 4,
    region: "Egypt",
    sector: "Medical",
    title: "Doctors & Clinics — Egypt",
    desc: "Managed awareness-focused social accounts for doctors and clinics, produced Before/After content and patient experience stories, and ran targeted ad campaigns that generated real bookings.",
    result: "Real Leads",
    tags: ["SMM", "Ads", "Medical Content"],
    color: "#8D9AB0",
  },
  {
    id: 5,
    region: "Egypt",
    sector: "Podcast",
    title: "Podcast & Media Show — Egypt",
    desc: "Full-service podcast production: concept design, visual identity, episode management, professional editing, Reels & Shorts, and social media growth strategy.",
    result: "Full Production",
    tags: ["Video Editing", "Reels", "SMM"],
    color: "#9AA6B8",
  },
  {
    id: 6,
    region: "Egypt",
    sector: "F&B",
    title: "Restaurants & Food Brands — Egypt",
    desc: "Built compelling visual identities and produced professional food content. Managed entertainment + sales posts and ran marketing campaigns that drove up orders and revenue.",
    result: "+Orders & Sales",
    tags: ["Branding", "Photography", "Content"],
    color: "#A0AABC",
  },
];

// ─── WHY US ───────────────────────────────────────────────────────────────
export const WHY_US = [
  {
    num: "01",
    title: "A Young Team That Understands the Market",
    desc: "We are not a traditional agency running old playbooks. Our young, hungry team has deep knowledge of the KSA and Egypt markets — their culture, consumer behavior, and digital landscape.",
  },
  {
    num: "02",
    title: "We Focus on Results Not Just Presence",
    desc: "Likes and views don't pay the bills. We build strategies around real business outcomes — leads, bookings, sales, and measurable growth that directly impacts your bottom line.",
  },
  {
    num: "03",
    title: "Faster Execution & Real Content",
    desc: "No bureaucracy, no delays. We move fast, produce authentic content, and adapt our strategies flexibly based on what the data and the market tell us.",
  },
  {
    num: "04",
    title: "A Custom Plan for Every Brand",
    desc: "We don't believe in copy-paste strategies. Every brand gets its own tailored marketing plan built on its unique goals, audience, and competitive landscape.",
  },
];

// ─── PROCESS ──────────────────────────────────────────────────────────────
export const PROCESS = [
  {
    num: "01",
    title: "Research & Discovery",
    desc: "We start by deeply understanding your brand, your audience, your competitors, and the market — so every decision we make is informed, not guessed.",
    icon: "search",
  },
  {
    num: "02",
    title: "Planning & Strategy",
    desc: "We translate insights into a clear, actionable marketing strategy — defining goals, channels, content direction, and KPIs before a single post goes live.",
    icon: "map",
  },
  {
    num: "03",
    title: "Execution",
    desc: "This is where we build — content creation, design, video production, and ad campaign management. Every asset is crafted with purpose and precision.",
    icon: "zap",
  },
  {
    num: "04",
    title: "Optimization",
    desc: "We analyze the results, learn from the data, and continuously improve performance. Growth is not a one-time event — it's an ongoing process.",
    icon: "bar-chart-2",
  },
];

// ─── CONTACTS ─────────────────────────────────────────────────────────────
export const CONTACTS = {
  phones: [
    { label: "Egypt — Line 1", number: "+20 103 514 0832", flag: "🇪🇬" },
    { label: "Egypt — Line 2", number: "+20 102 608 1399", flag: "🇪🇬" },
    { label: "KSA", number: "+966 59 919 4160", flag: "🇸🇦" },
  ],
  email: "ouragency259@gmail.com",
  socials: [
    {
      label: "Instagram",
      handle: "@our_agency",
      href: "https://instagram.com/our_agency5",
      icon: "instagram",
    },
    {
      label: "TikTok",
      handle: "@our_agency",
      href: "https://tiktok.com/@our_agency2",
      icon: "tiktok",
    },
    {
      label: "Facebook",
      handle: "our agency",
      href: "https://www.facebook.com/share/1Bpf7RwLhh/",
      icon: "facebook",
    },
  ],
};

// ─── ABOUT ────────────────────────────────────────────────────────────────
export const ABOUT = {
  description:
    "OUR is a digital marketing agency powered by a team of young creatives. We work with passion and real effort — believing that every brand deserves a marketing plan built on deep market understanding, powerful content, and realistic execution that supports the goal.",
  tagline: "We are not just service providers — we are growth partners.",
  vision:
    "To become the turning point for ambitious brands. We provide marketing strategies built on creativity, data, and real market understanding — drawing a clear path to growth amidst competitors, creating real measurable value, and being the partner that walks with them step by step toward a stronger presence that competes with the biggest players.",
  mission:
    "We deliver practical marketing solutions that support brand building, attract the right customers, and achieve measurable results — through powerful content management, strategic ad campaigns, and building an impactful digital identity.",
};
