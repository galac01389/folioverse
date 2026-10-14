// Data store for all portfolio templates
const TEMPLATES_DATA = [
  {
    id: "minimalist-dev",
    title: "Minimalist Dev",
    subtitle: "Clean & typography-focused developer portfolio",
    category: "developer",
    tags: ["Minimalist", "Dark/Light Mode", "Tailwind CSS", "Semantic HTML"],
    stars: "1.4k",
    path: "templates/minimalist-dev/index.html",
    accentColor: "#10b981", // Emerald
    featured: true,
    badge: "Staff Pick",
    description: "Designed for software engineers and systems developers who prefer clean typography, distraction-free reading, and fast loading. Features dark/light mode toggle, markdown-style experience timeline, and project cards.",
    features: [
      "Zero build step & instant load time",
      "Persistent dark/light theme switch",
      "Mobile-first responsive typography",
      "Tailwind CSS v3 via CDN",
      "Accessible semantics & SEO ready"
    ]
  },
  {
    id: "creative-designer",
    title: "Creative Studio",
    subtitle: "High-impact visual showcase for designers & art directors",
    category: "designer",
    tags: ["Bold Typography", "Glassmorphism", "Dark Aesthetic", "Case Studies"],
    stars: "2.1k",
    path: "templates/creative-designer/index.html",
    accentColor: "#ec4899", // Pink
    featured: true,
    badge: "Trending",
    description: "A visually striking portfolio for product designers, creative directors, and visual artists. Includes glowing mesh gradients, glassmorphism cards, metrics bar, and editorial case-study showcases.",
    features: [
      "Cinematic glowing mesh lighting",
      "Interactive glassmorphic case study cards",
      "Metrics & social proof counter bar",
      "Capabilities & design system grid",
      "High-converting contact CTA"
    ]
  },
  {
    id: "terminal-dev",
    title: "Terminal CLI",
    subtitle: "Interactive retro command-line hacker experience",
    category: "interactive",
    tags: ["Interactive CLI", "Retro Hacker", "Zero Dependencies", "Easter Eggs"],
    stars: "3.2k",
    path: "templates/terminal-dev/index.html",
    accentColor: "#34d399", // Mint/Emerald
    featured: true,
    badge: "Most Interactive",
    description: "Turn your portfolio into a real working terminal shell! Visitors can type commands like 'help', 'about', 'skills', 'projects', 'contact', and 'matrix', or use the quick-action command chips.",
    features: [
      "Real interactive command-line parser in vanilla JS",
      "Command history navigation (Arrow Up / Arrow Down)",
      "CRT retro scanline effect overlay",
      "Clickable quick-run toolbar chips",
      "Fastfetch / system info summary card"
    ]
  },
  {
    id: "bento-grid",
    title: "Modern Bento Grid",
    subtitle: "Apple & Vercel inspired modular widget layout",
    category: "modern",
    tags: ["Bento Layout", "Live Widgets", "TypeScript/Next aesthetic", "Modern"],
    stars: "1.9k",
    path: "templates/bento-grid/index.html",
    accentColor: "#6366f1", // Indigo
    featured: true,
    badge: "Popular 2026",
    description: "Clean modular bento grid layout featuring interactive cards, live real-time local clock widget, music vibe player visualizer, tech stack toolkit, and spotlight project showcases.",
    features: [
      "Modular responsive bento grid structure",
      "Live time & timezone clock widget",
      "Music wave visualizer card",
      "Interactive hover glow borders",
      "Compact high-density storytelling"
    ]
  }
];

// Provide helper to get template by ID
function getTemplateById(id) {
  return TEMPLATES_DATA.find(t => t.id === id);
}
