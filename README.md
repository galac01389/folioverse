# 🌌 FolioVerse &mdash; Dual Portfolio Website & Template Hub
*Designed &amp; Developed by **Vineet***

**FolioVerse** is a dual-purpose static web platform:
1. **A Personal Creator Portfolio** showcasing Vineet's professional design and engineering work, case studies, skills matrix, experience timeline, and contact channels.
2. **An Open-Source Template Marketplace & Customizer Studio** providing 4 standalone, zero-build, production-ready portfolio templates for software engineers, designers, hackers, and creators.

---

## 🚀 Key Features

### 👤 Personal Creator Portfolio
- **Dual Value Hero Section:** Clear personal positioning alongside open-source template creator credibility.
- **Client Case Studies:** Showcases architecture, UI systems, and telemetry projects with metrics.
- **Skills Matrix:** Categorized into Frontend & UI, Backend & APIs, Design & UX, and Cloud/DevOps.
- **Career Timeline:** Interactive milestone history with role responsibilities and achievements.
- **Interactive Contact Form:** Built-in form validation, direct email triggers, and animated toast alerts.
- **Dark & Light Mode:** Seamless theme toggling with `localStorage` memory and system theme detection.

### 🎨 Portfolio Template Hub & Customizer Studio
- **4 Standalone Production Templates Included:**
  1. `Minimalist Dev` (`templates/minimalist-dev/index.html`): Editorial typography, dark/light theme, timeline, and project showcases.
  2. `Creative Studio` (`templates/creative-designer/index.html`): Bold aesthetics, glowing mesh gradients, glassmorphism cards, and metrics bar.
  3. `Terminal CLI` (`templates/terminal-dev/index.html`): Real interactive terminal shell in vanilla JS with commands (`help`, `about`, `skills`, `projects`, `contact`, `clear`, `matrix`), command history, and quick toolbar chips.
  4. `Modern Bento Grid` (`templates/bento-grid/index.html`): Apple/Vercel inspired modular cards with a real-time local clock widget, Spotify audio visualizer, and tech toolkit.
- **Interactive Device Live Preview:** Test any template inside the app with realistic **Desktop (100%)**, **Tablet (768px)**, and **Mobile (375px)** device frame switchers.
- **Live Customizer Studio:** Personalize your Name, Headline, Accent Color, Bio, and Email in real-time, then export customized HTML code with a single click.
- **Zero Build Step:** 100% static HTML5, Tailwind CSS via CDN, and vanilla JavaScript. No Node.js, npm, or webpack builds required!

---

## 📂 Project Structure

```
folioverse/
├── index.html                           # Flagship Portfolio & Template Hub website
├── README.md                            # Documentation & deployment guide
├── css/
│   └── main.css                         # Custom styles, glassmorphism, animations & device frames
├── js/
│   ├── app.js                           # UI logic, device previewer, customizer & toast engine
│   └── templates-data.js                # Template metadata, tags, and category registry
└── templates/                           # Standalone ready-to-deploy portfolio templates
    ├── minimalist-dev/
    │   └── index.html                   # Minimalist Developer template
    ├── creative-designer/
    │   └── index.html                   # High-impact Creative Designer template
    ├── terminal-dev/
    │   └── index.html                   # Interactive Retro Hacker Terminal template
    └── bento-grid/
        └── index.html                   # Modern Bento Grid portfolio template
```

---

## ⚡ How to Run Locally

Because FolioVerse uses standard static web technologies, you can run it using any method:

### Method 1: Python Built-in Server (Recommended)
Open PowerShell or your terminal in the `folioverse` directory:
```powershell
python -m http.server 3000
```
Then open [http://localhost:3000](http://localhost:3000) in your browser.

### Method 2: Node.js `npx serve`
```bash
npx serve .
```

### Method 3: Direct File Opening
Double-click `index.html` or open it directly in Chrome, Firefox, Safari, or Edge.

---

## 🚢 Free 1-Minute Deployment Options

### 1. GitHub Pages
1. Push this folder to a GitHub repository.
2. Go to **Settings** &rarr; **Pages**.
3. Under **Branch**, select `main` and `/ (root)` folder.
4. Click **Save**. Your portfolio is live at `https://<username>.github.io/<repo>/`!

### 2. Netlify Drop
1. Visit [app.netlify.com/drop](https://app.netlify.com/drop).
2. Drag and drop the `folioverse` folder directly onto the browser window.
3. Your site deploys in under 5 seconds with an instant SSL link.

### 3. Vercel
1. Install Vercel CLI with `npm i -g vercel` or import from GitHub on [vercel.com](https://vercel.com).
2. Run `vercel` and press enter to deploy instantly.

---

## 📄 License
Released under the **MIT License**. Free for personal and commercial usage.
