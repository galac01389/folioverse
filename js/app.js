/**
 * FolioVerse — Main Application JavaScript
 * Controls template rendering, live preview modal, device responsiveness,
 * live template customizer, theme toggling, and interactive portfolio features.
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initHeaderColorHover();
  renderTemplateCards('all');
  initFilterButtons();
  initSearch();
  initPreviewModal();
  initCustomizerModal();
  initContactForm();
  initMobileNav();
});

/* ==========================================================================
   1. Theme Management (Dark / Light Mode)
   ========================================================================== */
function initTheme() {
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const storedTheme = localStorage.getItem('folio_theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (storedTheme === 'dark' || (!storedTheme && prefersDark)) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const isDark = document.documentElement.classList.toggle('dark');
      localStorage.setItem('folio_theme', isDark ? 'dark' : 'light');
    });
  }
}

/* ==========================================================================
   2. Template Showcase & Filtering
   ========================================================================== */
let activeCategory = 'all';
let searchQuery = '';

function renderTemplateCards(category = 'all', query = '') {
  const grid = document.getElementById('templatesGrid');
  if (!grid) return;

  const filtered = TEMPLATES_DATA.filter(tpl => {
    const matchesCategory = category === 'all' || tpl.category === category;
    const matchesSearch = query === '' || 
      tpl.title.toLowerCase().includes(query.toLowerCase()) ||
      tpl.description.toLowerCase().includes(query.toLowerCase()) ||
      tpl.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="col-span-full py-16 text-center text-zinc-500">
        <svg class="w-12 h-12 mx-auto mb-3 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p class="text-base font-semibold text-zinc-700 dark:text-zinc-300">No portfolio templates found</p>
        <p class="text-xs text-zinc-400 mt-1">Try clearing your search query or switching categories.</p>
      </div>
    `;
    return;
  }

  grid.innerHTML = filtered.map(tpl => `
    <div class="glass-card rounded-2xl overflow-hidden flex flex-col justify-between group border border-zinc-200/80 dark:border-zinc-800/80">
      
      <!-- Card Header / Preview Thumbnail Area -->
      <div class="relative bg-zinc-100 dark:bg-zinc-900/80 p-5 border-b border-zinc-200/60 dark:border-zinc-800/60">
        <div class="flex items-center justify-between gap-2 mb-3">
          <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
            ${tpl.badge || 'Template'}
          </span>
          <div class="flex items-center gap-1 text-xs font-mono text-zinc-500">
            <span>★</span>
            <span>${tpl.stars}</span>
          </div>
        </div>

        <h3 class="text-xl font-bold text-zinc-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
          ${tpl.title}
        </h3>
        <p class="text-xs text-zinc-500 dark:text-zinc-400 mt-1 line-clamp-1 font-medium">
          ${tpl.subtitle}
        </p>

        <!-- Simulated Preview Window Mockup -->
        <div class="mt-4 rounded-lg bg-zinc-950 p-2.5 border border-zinc-800 shadow-inner group-hover:border-indigo-500/30 transition-all">
          <div class="flex items-center gap-1.5 mb-2">
            <span class="w-2 h-2 rounded-full bg-rose-500/70 inline-block"></span>
            <span class="w-2 h-2 rounded-full bg-amber-500/70 inline-block"></span>
            <span class="w-2 h-2 rounded-full bg-emerald-500/70 inline-block"></span>
            <span class="text-[10px] text-zinc-500 font-mono ml-1 truncate">localhost:3000/${tpl.id}</span>
          </div>
          <div class="h-24 bg-zinc-900 rounded flex flex-col justify-center items-center text-center p-3 relative overflow-hidden">
            <div class="w-8 h-8 rounded-full mb-1.5 flex items-center justify-center font-bold text-xs" style="background: ${tpl.accentColor}20; color: ${tpl.accentColor};">
              ${tpl.title.substring(0, 2).toUpperCase()}
            </div>
            <div class="text-[11px] font-semibold text-zinc-200 truncate w-full">${tpl.title} Portfolio</div>
            <div class="text-[9px] text-zinc-500 truncate w-full">Single-page static template</div>
            <div class="absolute inset-0 bg-indigo-500/0 group-hover:bg-indigo-500/10 transition-colors flex items-center justify-center">
              <button onclick="openLivePreview('${tpl.id}')" class="opacity-0 group-hover:opacity-100 transition-opacity px-3 py-1 rounded bg-indigo-600 text-white text-[10px] font-semibold shadow-md transform scale-95 group-hover:scale-100">
                Live Preview ↗
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Card Body -->
      <div class="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <p class="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
            ${tpl.description}
          </p>

          <!-- Key highlights -->
          <div class="mt-3 space-y-1">
            ${tpl.features.slice(0, 2).map(f => `
              <div class="flex items-center gap-1.5 text-[11px] text-zinc-500 dark:text-zinc-400">
                <svg class="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/>
                </svg>
                <span>${f}</span>
              </div>
            `).join('')}
          </div>

          <!-- Tags -->
          <div class="flex flex-wrap gap-1.5 mt-4">
            ${tpl.tags.map(tag => `
              <span class="px-2 py-0.5 rounded text-[10px] font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                ${tag}
              </span>
            `).join('')}
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="pt-4 border-t border-zinc-200/60 dark:border-zinc-800/60 flex items-center gap-2">
          <button 
            onclick="openLivePreview('${tpl.id}')" 
            class="flex-1 px-3 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-sm shadow-indigo-500/20"
          >
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
            Preview
          </button>
          
          <button 
            onclick="openCustomizer('${tpl.id}')" 
            class="px-3 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-200 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            title="Customize & Export"
          >
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
            Customize
          </button>

          <button 
            onclick="downloadTemplateCode('${tpl.id}')" 
            class="p-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-200 transition-colors" 
            title="Download Template HTML"
          >
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
          </button>
        </div>

      </div>
    </div>
  `).join('');
}

function initFilterButtons() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => {
        b.classList.remove('bg-indigo-600', 'text-white');
        b.classList.add('bg-zinc-100', 'dark:bg-zinc-800', 'text-zinc-600', 'dark:text-zinc-400');
      });
      btn.classList.remove('bg-zinc-100', 'dark:bg-zinc-800', 'text-zinc-600', 'dark:text-zinc-400');
      btn.classList.add('bg-indigo-600', 'text-white');

      activeCategory = btn.getAttribute('data-filter') || 'all';
      renderTemplateCards(activeCategory, searchQuery);
    });
  });
}

function initSearch() {
  const searchInput = document.getElementById('templateSearchInput');
  if (!searchInput) return;

  searchInput.addEventListener('input', (e) => {
    searchQuery = e.target.value.trim();
    renderTemplateCards(activeCategory, searchQuery);
  });
}

/* ==========================================================================
   3. Interactive Device Preview Modal
   ========================================================================== */
let currentPreviewId = null;

function initPreviewModal() {
  const modal = document.getElementById('previewModal');
  const closeBtn = document.getElementById('closePreviewBtn');
  const frameContainer = document.getElementById('previewFrameContainer');
  const deviceButtons = document.querySelectorAll('.device-toggle-btn');
  const refreshBtn = document.getElementById('refreshPreviewBtn');
  const newTabBtn = document.getElementById('openNewTabBtn');

  if (!modal) return;

  closeBtn?.addEventListener('click', closeLivePreview);

  // Close on outside backdrop click
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeLivePreview();
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
      closeLivePreview();
    }
  });

  // Device toggle buttons (Desktop, Tablet, Mobile)
  deviceButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      deviceButtons.forEach(b => {
        b.classList.remove('bg-indigo-600', 'text-white');
        b.classList.add('bg-zinc-800', 'text-zinc-400');
      });
      btn.classList.remove('bg-zinc-800', 'text-zinc-400');
      btn.classList.add('bg-indigo-600', 'text-white');

      const device = btn.getAttribute('data-device');
      const iframeWrapper = document.getElementById('previewIframeWrapper');

      iframeWrapper.className = 'transition-all duration-300 relative mx-auto h-full flex flex-col items-center justify-center';
      if (device === 'desktop') {
        iframeWrapper.classList.add('w-full', 'h-full');
      } else if (device === 'tablet') {
        iframeWrapper.classList.add('w-[768px]', 'max-w-full', 'h-[90%]', 'rounded-2xl', 'border-8', 'border-zinc-800', 'shadow-2xl');
      } else if (device === 'mobile') {
        iframeWrapper.classList.add('w-[375px]', 'max-w-[90%]', 'h-[90%]', 'rounded-3xl', 'border-8', 'border-zinc-850', 'shadow-2xl');
      }
    });
  });

  // Refresh iframe
  refreshBtn?.addEventListener('click', () => {
    const iframe = document.getElementById('previewIframe');
    if (iframe) iframe.src = iframe.src;
  });

  // Open in new tab
  newTabBtn?.addEventListener('click', () => {
    if (currentPreviewId) {
      const tpl = getTemplateById(currentPreviewId);
      if (tpl) window.open(tpl.path, '_blank');
    }
  });
}

function openLivePreview(templateId) {
  const tpl = getTemplateById(templateId);
  if (!tpl) return;

  currentPreviewId = templateId;
  const modal = document.getElementById('previewModal');
  const iframe = document.getElementById('previewIframe');
  const titleEl = document.getElementById('previewModalTitle');

  if (titleEl) titleEl.textContent = `${tpl.title} — Live Preview`;
  if (iframe) iframe.src = tpl.path;

  modal.classList.remove('hidden');
  modal.classList.add('flex');
  document.body.style.overflow = 'hidden';
}

function closeLivePreview() {
  const modal = document.getElementById('previewModal');
  const iframe = document.getElementById('previewIframe');

  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
  if (iframe) {
    iframe.src = 'about:blank';
  }
  document.body.style.overflow = '';
}

/* ==========================================================================
   4. Live Template Customizer & Exporter
   ========================================================================== */
let activeCustomizerTemplate = null;

function initCustomizerModal() {
  const modal = document.getElementById('customizerModal');
  const closeBtn = document.getElementById('closeCustomizerBtn');
  const form = document.getElementById('customizerForm');
  const copyBtn = document.getElementById('copyCustomCodeBtn');
  const downloadBtn = document.getElementById('downloadCustomHtmlBtn');

  if (!modal) return;

  closeBtn?.addEventListener('click', () => {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    document.body.style.overflow = '';
  });

  // Update preview when fields change
  ['custName', 'custRole', 'custEmail', 'custAccentColor', 'custBio'].forEach(id => {
    const el = document.getElementById(id);
    el?.addEventListener('input', updateCustomizerPreview);
  });

  // Copy code to clipboard
  copyBtn?.addEventListener('click', () => {
    const code = generateCustomizedHtml();
    navigator.clipboard.writeText(code).then(() => {
      showToast('Customized HTML copied to clipboard!', 'success');
    }).catch(() => {
      showToast('Failed to copy. Please manually select the code.', 'error');
    });
  });

  // Download HTML
  downloadBtn?.addEventListener('click', () => {
    const code = generateCustomizedHtml();
    const name = (document.getElementById('custName')?.value || 'my-portfolio').toLowerCase().replace(/\s+/g, '-');
    downloadFile(`${name}-portfolio.html`, code);
    showToast('Download started!', 'success');
  });
}

function openCustomizer(templateId) {
  const tpl = getTemplateById(templateId);
  if (!tpl) return;

  activeCustomizerTemplate = tpl;
  const modal = document.getElementById('customizerModal');
  const titleEl = document.getElementById('customizerTemplateName');
  if (titleEl) titleEl.textContent = tpl.title;

  modal.classList.remove('hidden');
  modal.classList.add('flex');
  document.body.style.overflow = 'hidden';

  updateCustomizerPreview();
}

function generateCustomizedHtml() {
  if (!activeCustomizerTemplate) return '';

  const name = document.getElementById('custName')?.value || 'Vineet';
  const role = document.getElementById('custRole')?.value || 'Design Engineer & Full-Stack Developer';
  const email = document.getElementById('custEmail')?.value || 'vineet@portfolio.dev';
  const accent = document.getElementById('custAccentColor')?.value || '#6366f1';
  const bio = document.getElementById('custBio')?.value || 'Building elegant web experiences and modern digital products.';

  // Return generated standalone customizable HTML
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${name} &mdash; ${role}</title>
  <script src="https://cdn.tailwindcss.com"><\/script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
  <style>
    body { font-family: 'Plus Jakarta Sans', sans-serif; }
    :root { --accent: ${accent}; }
  </style>
</head>
<body class="bg-zinc-950 text-zinc-100 min-h-screen py-16 px-6">
  <div class="max-w-3xl mx-auto space-y-16">
    <header class="space-y-4">
      <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-zinc-900 border border-zinc-800" style="color: ${accent}">
        <span class="w-2 h-2 rounded-full animate-pulse" style="background-color: ${accent}"></span>
        Available for new opportunities
      </div>
      <h1 class="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">${name}</h1>
      <p class="text-xl font-medium" style="color: ${accent}">${role}</p>
      <p class="text-zinc-400 text-base leading-relaxed max-w-xl">${bio}</p>
      <div class="pt-2 flex flex-wrap gap-4">
        <a href="mailto:${email}" class="px-5 py-2.5 rounded-xl font-semibold text-xs text-white shadow-lg transition" style="background-color: ${accent}">
          Get in touch (${email})
        </a>
      </div>
    </header>

    <section class="space-y-6">
      <h2 class="text-xs font-mono uppercase tracking-widest text-zinc-500">Selected Work</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div class="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800 space-y-2">
          <h3 class="text-lg font-bold text-white">Project Alpha</h3>
          <p class="text-xs text-zinc-400">High-performance web architecture built with Next.js and Tailwind.</p>
          <span class="text-xs font-mono" style="color: ${accent}">&nearr; View Demo</span>
        </div>
        <div class="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800 space-y-2">
          <h3 class="text-lg font-bold text-white">Project Beta</h3>
          <p class="text-xs text-zinc-400">Distributed cloud automation and real-time observability system.</p>
          <span class="text-xs font-mono" style="color: ${accent}">&nearr; View Source</span>
        </div>
      </div>
    </section>

    <footer class="pt-12 border-t border-zinc-900 text-center text-xs text-zinc-600 font-mono">
      &copy; ${new Date().getFullYear()} ${name} &middot; Built with FolioVerse Open-Source Templates
    </footer>
  </div>
</body>
</html>`;
}

function updateCustomizerPreview() {
  const code = generateCustomizedHtml();
  const codeEl = document.getElementById('customizerCodeOutput');
  if (codeEl) {
    codeEl.textContent = code;
  }
}

/* ==========================================================================
   5. Direct Template Download / File Export
   ========================================================================== */
function downloadTemplateCode(templateId) {
  const tpl = getTemplateById(templateId);
  if (!tpl) return;

  fetch(tpl.path)
    .then(res => res.text())
    .then(html => {
      downloadFile(`${tpl.id}-portfolio-template.html`, html);
      showToast(`Downloaded ${tpl.title} template!`, 'success');
    })
    .catch(err => {
      showToast('Could not fetch template file.', 'error');
    });
}

function downloadFile(filename, text) {
  const blob = new Blob([text], { type: 'text/html;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/* ==========================================================================
   6. Creator Contact Form & Toast Notifications
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('creatorContactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('contactName')?.value.trim();
    const email = document.getElementById('contactEmail')?.value.trim();
    const message = document.getElementById('contactMessage')?.value.trim();

    if (!name || !email || !message) {
      showToast('Please fill out all contact fields.', 'error');
      return;
    }

    // Success feedback
    showToast(`Thank you, ${name}! Your message has been sent.`, 'success');
    form.reset();
  });
}

function showToast(message, type = 'info') {
  let toastContainer = document.getElementById('toastContainer');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'toastContainer';
    toastContainer.className = 'fixed bottom-6 right-6 z-50 flex flex-col gap-2 pointer-events-none';
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement('div');
  const bg = type === 'success' ? 'bg-emerald-600 text-white' : type === 'error' ? 'bg-rose-600 text-white' : 'bg-zinc-800 text-zinc-100';
  
  toast.className = `px-4 py-3 rounded-xl shadow-xl text-xs font-semibold flex items-center gap-2 pointer-events-auto toast-enter ${bg}`;
  toast.innerHTML = `
    <span>${type === 'success' ? '✓' : type === 'error' ? '✕' : 'ℹ'}</span>
    <span>${message}</span>
  `;

  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

/* ==========================================================================
   7. Mobile Navigation Drawer
   ========================================================================== */
function initMobileNav() {
  const menuBtn = document.getElementById('mobileMenuBtn');
  const menu = document.getElementById('mobileMenu');
  if (!menuBtn || !menu) return;

  menuBtn.addEventListener('click', () => {
    menu.classList.toggle('hidden');
  });

  const links = menu.querySelectorAll('a');
  links.forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.add('hidden');
    });
  });
}

/* ==========================================================================
   8. Colorful Header Hover Controller
   ========================================================================== */
function initHeaderColorHover() {
  const brandName = document.getElementById('brandName');
  const header = document.querySelector('header');
  const navLinks = document.querySelectorAll('.nav-link-colorful');

  // 1. Interactive letter-by-letter animation for Brand Name "vineet"
  if (brandName) {
    const rawText = brandName.textContent.trim();
    // Split into individual interactive letter spans
    brandName.innerHTML = rawText
      .split('')
      .map((char, index) => `<span class="brand-char brand-char-${index % 6}">${char}</span>`)
      .join('');

    // Trigger subtle wave on mouseenter over the brand logo
    const brandLogo = document.getElementById('brandLogo');
    brandLogo?.addEventListener('mouseenter', () => {
      const chars = brandName.querySelectorAll('.brand-char');
      chars.forEach((char, i) => {
        setTimeout(() => {
          char.style.transform = 'translateY(-3px) scale(1.18)';
          setTimeout(() => {
            char.style.transform = '';
          }, 300);
        }, i * 45);
      });
    });
  }

  // 2. Header ambient cursor glow follower
  if (header) {
    let glow = document.getElementById('headerCursorGlow');
    if (!glow) {
      glow = document.createElement('div');
      glow.id = 'headerCursorGlow';
      header.appendChild(glow);
    }

    const vibrantPalette = [
      'rgba(244, 63, 94, 0.25)',   // Rose
      'rgba(236, 72, 153, 0.25)',  // Pink
      'rgba(168, 85, 247, 0.25)',  // Purple
      'rgba(6, 182, 212, 0.25)',   // Cyan
      'rgba(16, 185, 129, 0.25)',  // Emerald
      'rgba(245, 158, 11, 0.25)'   // Amber
    ];

    header.addEventListener('mousemove', (e) => {
      const rect = header.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      glow.style.left = `${x}px`;
      glow.style.top = `${y}px`;
      glow.style.opacity = '1';
    });

    header.addEventListener('mouseleave', () => {
      glow.style.opacity = '0';
    });

    // 3. Dynamic color spark & glow shift on nav link hover
    navLinks.forEach((link, idx) => {
      link.addEventListener('mouseenter', () => {
        const pickedColor = vibrantPalette[idx % vibrantPalette.length];
        glow.style.background = `radial-gradient(circle, ${pickedColor} 0%, transparent 70%)`;
      });
    });
  }
}

