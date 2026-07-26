/* ── CPG AI Hub – app.js ── */
document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initVideoSection();
  initFirms();
  initAios();
  initTimeline();
  initFeedAndForm();
  initSlideModal();
});

/* ══════════════════
   NAV
══════════════════ */
function initNav() {
  const toggle = document.getElementById('mobileToggle');
  const links  = document.getElementById('navLinks');

  toggle?.addEventListener('click', () => {
    links.classList.toggle('open');
  });

  // ── Back to Top button ──
  const backToTopBtn = document.getElementById('backToTopBtn');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ── Vertical Scroll Progress Indicator (MAD Style) ──
  const progressBar = document.getElementById('scrollProgressBar');
  function updateScrollProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (docHeight > 0 && progressBar) {
      const progress = Math.min(100, Math.max(0, (scrollTop / docHeight) * 100));
      progressBar.style.height = `${progress}%`;
    }
  }
  window.addEventListener('scroll', updateScrollProgress, { passive: true });
  updateScrollProgress();

  // ── Click-toggle dropdowns (fixes hover-gap bug) ──
  const dropdowns = document.querySelectorAll('.nav-dropdown');

  dropdowns.forEach(dd => {
    const trigger = dd.querySelector('.nav-dd-trigger');
    const menu    = dd.querySelector('.nav-dd-menu');

    trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = menu.classList.contains('open');

      // Close all other menus first
      document.querySelectorAll('.nav-dd-menu').forEach(m => m.classList.remove('open'));
      document.querySelectorAll('.nav-dd-trigger').forEach(t => t.classList.remove('active'));

      if (!isOpen) {
        menu.classList.add('open');
        trigger.classList.add('active');
      }
    });
  });

  // Close menus when clicking outside
  document.addEventListener('click', () => {
    document.querySelectorAll('.nav-dd-menu').forEach(m => m.classList.remove('open'));
    document.querySelectorAll('.nav-dd-trigger').forEach(t => t.classList.remove('active'));
  });

  // Prevent menu clicks from bubbling up and closing the menu
  document.querySelectorAll('.nav-dd-menu').forEach(menu => {
    menu.addEventListener('click', e => e.stopPropagation());
  });

  // Toggle scrolled state on navbar for glass blur backdrop transitions
  const navbar = document.getElementById('navbar');
  const heroSection = document.getElementById('home');
  const handleScroll = () => {
    if (navbar) {
      const threshold = heroSection ? (heroSection.offsetHeight - 70) : 500;
      navbar.classList.toggle('scrolled', window.scrollY > threshold);
    }
  };
  window.addEventListener('scroll', handleScroll);
  handleScroll();

  // highlight active section on scroll
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
  window.addEventListener('scroll', () => {
    let cur = '';
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 80) cur = s.id;
    });
    navLinks.forEach(l => {
      l.classList.toggle('active', l.getAttribute('href') === `#${cur}`);
    });
  });
}

/* ══════════════════
   VIDEO SECTION
══════════════════ */
const VIDEOS = [
  // AI Basics
  {
    id: 'qYNweeDHiyU', title: 'AI, Machine Learning, Deep Learning and Generative AI Explained', duration: '10:01',
    cat: 'basics', catLabel: 'AI Basics',
    thumb: `https://i.ytimg.com/vi/qYNweeDHiyU/mqdefault.jpg`,
    src: 'IBM Technology'
  },
  {
    id: 'PeMlggyqz0Y', title: 'Machine Learning Explained in 100 Seconds', duration: '2:35',
    cat: 'basics', catLabel: 'AI Basics',
    thumb: `https://i.ytimg.com/vi/PeMlggyqz0Y/mqdefault.jpg`,
    src: 'Fireship'
  },
  // AI Tools
  {
    id: 'poM2n8fBcag', title: 'ChatGPT Tutorial for Beginners: How to Actually Get Work Done', duration: '14:31',
    cat: 'tools', catLabel: 'AI Tools',
    thumb: `https://i.ytimg.com/vi/poM2n8fBcag/mqdefault.jpg`,
    src: 'YouTube'
  },
  {
    id: 'd-CuF6dlqLg', title: 'Microsoft Copilot Tutorial for Beginners', duration: '14:10',
    cat: 'tools', catLabel: 'AI Tools',
    thumb: `https://i.ytimg.com/vi/d-CuF6dlqLg/mqdefault.jpg`,
    src: 'YouTube'
  },
  // Design & Architecture
  {
    id: 'uXpa89qFj0c', title: '3 AI Tools Architects Should Be Using by Now', duration: '12:26',
    cat: 'design', catLabel: 'Design & Architecture',
    thumb: `https://i.ytimg.com/vi/uXpa89qFj0c/mqdefault.jpg`,
    src: 'Show It Better'
  },
  {
    id: 'yBdOtWSA5_o', title: 'How I Used Enscape + Veras AI to Create Stunning Renders!', duration: '17:00',
    cat: 'design', catLabel: 'Design & Architecture',
    thumb: `https://i.ytimg.com/vi/yBdOtWSA5_o/mqdefault.jpg`,
    src: 'Show It Better'
  },
  // Work & Productivity
  {
    id: '4uvX6dxD6QA', title: '5 AI for Work Tips and Tricks', duration: '15:37',
    cat: 'workplace', catLabel: 'Work & Productivity',
    thumb: `https://i.ytimg.com/vi/4uvX6dxD6QA/mqdefault.jpg`,
    src: 'YouTube'
  },
  {
    id: 'htZRCE2GgIs', title: 'The Only AI Tools You Need (12-Minute Productivity Guide)', duration: '11:56',
    cat: 'workplace', catLabel: 'Work & Productivity',
    thumb: `https://i.ytimg.com/vi/htZRCE2GgIs/mqdefault.jpg`,
    src: 'Jeff Su'
  },
];


function initVideoSection() {
  const grid = document.getElementById('videoGrid');
  if (!grid) return;

  // Create lightbox
  const lb = document.createElement('div');
  lb.className = 'video-lightbox';
  lb.id = 'videoLightbox';
  lb.innerHTML = `
    <div class="lightbox-inner">
      <button class="lightbox-close" id="lightboxClose">&times;</button>
      <iframe id="lightboxFrame" class="lightbox-frame" allowfullscreen allow="autoplay"></iframe>
    </div>
  `;
  document.body.appendChild(lb);

  const frame = document.getElementById('lightboxFrame');
  document.getElementById('lightboxClose').addEventListener('click', () => {
    lb.classList.remove('open');
    frame.src = '';
  });
  lb.addEventListener('click', e => {
    if (e.target === lb) { lb.classList.remove('open'); frame.src = ''; }
  });

  function renderVideos(cat) {
    grid.innerHTML = '';
    const filtered = cat === 'all' ? VIDEOS : VIDEOS.filter(v => v.cat === cat);
    filtered.forEach(v => {
      const isShort = v.src.toLowerCase().includes('short') || v.duration.startsWith('0:') || v.duration === '1:00';
      const card = document.createElement('div');
      card.className = `video-card${isShort ? ' is-short' : ''}`;
      card.innerHTML = `
        <div class="video-thumb">
          <img src="${v.thumb}" alt="${v.title}" loading="lazy">
          <div class="video-thumb-overlay">
            <div class="play-btn-circle"><i class="fa-solid fa-play fa-xs"></i></div>
          </div>
          <span class="video-duration">${v.duration}</span>
        </div>
        <div class="video-info">
          <div class="video-cat">${v.catLabel}${isShort ? ' · Shorts' : ''}</div>
          <div class="video-title">${v.title}</div>
          <div class="video-src"><i class="fa-brands fa-youtube" style="color:#ff0000;"></i> ${v.src}</div>
        </div>
      `;
      card.addEventListener('click', () => {
        const inner = lb.querySelector('.lightbox-inner');
        if (isShort) {
          inner.classList.add('is-short-frame');
        } else {
          inner.classList.remove('is-short-frame');
        }
        frame.src = `https://www.youtube.com/embed/${v.id}?autoplay=1`;
        lb.classList.add('open');
      });
      grid.appendChild(card);
    });
  }

  renderVideos('all');

  document.querySelectorAll('.vf-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.vf-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderVideos(btn.dataset.vcat);
    });
  });
}

/* ══════════════════
   GLOBAL FIRMS
══════════════════ */
const FIRMS = [
  {
    name: 'Foster + Partners', abbr: 'F+P', location: 'London, UK',
    tags: ['Architecture'], cat: 'architecture',
    usecase: 'Uses AI for environmental performance simulations — calculating daylight, wind, and energy at the concept design phase, saving weeks of manual analysis.',
    impact: '40% faster environmental analysis',
    source: 'Source: Foster + Partners Technology & Innovation Report 2024'
  },
  {
    name: 'Gensler', abbr: 'GEN', location: 'USA (Global)',
    tags: ['Architecture', 'Workplace'], cat: 'architecture',
    usecase: 'Uses AI to optimise workspace layouts based on how employees actually move through buildings — data from sensors and surveys feeds into design decisions.',
    impact: '30% improvement in space efficiency',
    source: 'Source: Gensler Research Institute Design Forecast 2024'
  },
  {
    name: 'BIG – Bjarke Ingels', abbr: 'BIG', location: 'Copenhagen / NYC',
    tags: ['Urban Design', 'Architecture'], cat: 'urban',
    usecase: 'Uses generative AI to test thousands of building massing variations at once — finding the forms that balance views, sunlight, and density in minutes, not weeks.',
    impact: '10× more design options explored',
    source: 'Source: BIG Tech Lab & ArchDaily Computational Review'
  },
  {
    name: 'Arup', abbr: 'ARP', location: 'London, UK (Global)',
    tags: ['Engineering', 'Urban Design'], cat: 'engineering',
    usecase: 'Runs AI agents to validate structural models, detect clashes in BIM, and predict material failure — reducing checking time dramatically.',
    impact: '60% reduction in BIM check time',
    source: 'Source: Arup Digital & AI Engineering Case Studies 2024'
  },
  {
    name: 'AECOM', abbr: 'AEC', location: 'USA (Global)',
    tags: ['Engineering', 'Urban Design'], cat: 'engineering',
    usecase: 'Uses AI to process satellite imagery and traffic data for urban master-planning — turning weeks of data collection into hours.',
    impact: '5× faster urban data processing',
    source: 'Source: AECOM Digital Infrastructure & GIS Analytics 2024'
  },
  {
    name: 'SWA Group', abbr: 'SWA', location: 'USA',
    tags: ['Landscape'], cat: 'landscape',
    usecase: 'Uses AI image generation to quickly produce landscape visualisations from concept sketches, allowing faster client communication and design iteration.',
    impact: '50% faster client presentations',
    source: 'Source: SWA Landscape Computational Design Report 2024'
  },
  {
    name: 'Sasaki', abbr: 'SAS', location: 'Boston, USA',
    tags: ['Urban Design', 'Landscape'], cat: 'landscape',
    usecase: 'Combines GIS data with AI pattern recognition to identify the most ecologically sensitive areas to protect in large-scale urban development plans.',
    impact: 'Data-driven ecological planning',
    source: 'Source: Sasaki Eco-Planning & GIS Machine Learning Group'
  },
  {
    name: 'Zaha Hadid Architects', abbr: 'ZHA', location: 'London, UK',
    tags: ['Architecture'], cat: 'architecture',
    usecase: 'Uses parametric AI tools to computationally generate complex curved forms and facades — optimising both aesthetics and structural performance simultaneously.',
    impact: 'Pioneering computational design',
    source: 'Source: ZHA CODE Research Papers 2023–2024'
  },
  {
    name: 'MAD Architects', abbr: 'MAD', location: 'Beijing / LA / Rome',
    tags: ['Architecture', 'Urban Design'], cat: 'architecture',
    usecase: 'Integrates AI parametric tools with organic "Shanshui" concept design — transforming hand sketches into fluid, structural-optimised forms and complex digital fabrication models.',
    impact: '70% faster organic form-finding',
    source: 'Source: MAD Architects Monograph & Parametric AI Insights'
  },
];

const MAP_LOCATIONS = [
  {
    name: 'CPG Corporation (HQ)',
    coords: [103.7423, 1.3337],
    city: 'Singapore (Westgate Tower)',
    type: 'star',
    usecase: 'Global Headquarters driving AI innovation across architecture, engineering, and urban development across Asia-Pacific.',
    impact: 'Regional AI Transformation Hub',
    source: 'Source: CPG Corporation HQ Singapore'
  },
  {
    name: 'CPG Vietnam (HCMC)',
    coords: [106.6297, 10.8231],
    city: 'Ho Chi Minh City, Vietnam',
    type: 'star',
    usecase: 'Vietnam Digital Office pilot hub leading bottom-up AI adoption in architectural design, BOQ parsing, and master-planning.',
    impact: 'Active Vietnam AI Pilot Hub',
    source: 'Source: CPG Vietnam Digital Office 2026'
  },
  {
    name: 'Zaha Hadid Architects',
    coords: [-0.105, 51.520],
    city: 'London, UK (Global HQ)',
    type: 'red',
    usecase: 'Uses parametric AI tools (ZHA CODE) to computationally generate complex curved forms and facades.',
    impact: 'Pioneering computational design',
    source: 'Source: ZHA CODE Research Papers 2023–2024'
  },
  {
    name: 'Foster + Partners',
    coords: [-0.165, 51.485],
    city: 'London, UK (Global HQ)',
    type: 'blue',
    usecase: 'Applied R&D group using custom AI models for solar radiation, wind microclimate, and carbon optimization.',
    impact: '40% faster environmental analysis',
    source: 'Source: Foster + Partners Technology Report 2024'
  },
  {
    name: 'Arup',
    coords: [-0.138, 51.535],
    city: 'London, UK (Global HQ)',
    type: 'cyan',
    usecase: 'Runs AI agents to validate structural models, detect clashes in BIM, and predict material failure.',
    impact: '60% reduction in BIM check time',
    source: 'Source: Arup Digital & AI Engineering Case Studies'
  },
  {
    name: 'MAD Architects',
    coords: [116.4074, 39.9042],
    city: 'Beijing, China (Global HQ)',
    type: 'orange',
    usecase: 'Integrates AI parametric tools with organic "Shanshui" concept design — transforming hand sketches into fluid forms.',
    impact: '70% faster organic form-finding',
    source: 'Source: MAD Architects Monograph & Parametric AI Insights'
  },
  {
    name: 'Gensler',
    coords: [-122.4194, 37.7749],
    city: 'San Francisco, USA (Global HQ)',
    type: 'green',
    usecase: 'Proprietary gScale AI algorithms optimize floorplate efficiency and workspace layout from employee sensor data.',
    impact: '30% improvement in space efficiency',
    source: 'Source: Gensler Research Institute Design Forecast 2024'
  },
  {
    name: 'NBBJ',
    coords: [-122.3321, 47.6062],
    city: 'Seattle, USA (Global HQ)',
    type: 'purple',
    usecase: 'Partners with AI tools to design human-centric office layouts using spatial predictive sentiment AI.',
    impact: 'Predictive employee experience design',
    source: 'Source: Fast Company Most Innovative Companies (NBBJ AI Design)'
  },
  {
    name: 'BIG – Bjarke Ingels Group',
    coords: [12.5683, 55.6761],
    city: 'Copenhagen, Denmark (Global HQ)',
    type: 'gold',
    usecase: 'Generative AI tests thousands of building massing variations at once — balancing views, sunlight, and density.',
    impact: '10× more design options explored',
    source: 'Source: BIG Tech Lab & ArchDaily Computational Review'
  },
  {
    name: 'AECOM',
    coords: [-96.7970, 32.7767],
    city: 'Dallas, Texas, USA (Global HQ)',
    type: 'blue',
    usecase: 'Uses AI to process satellite imagery and traffic data for urban master-planning — turning weeks into hours.',
    impact: '5× faster urban data processing',
    source: 'Source: AECOM Digital Infrastructure & GIS Analytics'
  },
  {
    name: 'SWA Group',
    coords: [-122.4853, 37.8590],
    city: 'Sausalito, California, USA (HQ)',
    type: 'green',
    usecase: 'Uses AI image generation to quickly produce landscape visualisations from concept sketches for client presentations.',
    impact: '50% faster client presentations',
    source: 'Source: SWA Landscape Computational Design Report'
  },
  {
    name: 'Sasaki',
    coords: [-71.1852, 42.3709],
    city: 'Watertown, Mass., USA (Global HQ)',
    type: 'green',
    usecase: 'Combines GIS data with AI pattern recognition to identify ecologically sensitive areas in urban plans.',
    impact: 'Data-driven ecological planning',
    source: 'Source: Sasaki Eco-Planning & GIS Machine Learning Group'
  }
];

let maplibreInstance = null;

function initMapLibre() {
  const container = document.getElementById('maplibreCanvas');
  if (!container || typeof maplibregl === 'undefined') return;

  if (!maplibreInstance) {
     maplibreInstance = new maplibregl.Map({
      container: 'maplibreCanvas',
      style: 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json',
      center: [15, 25],
      zoom: 2.1,
      pitch: 0,
      renderWorldCopies: false,
      dragRotate: false,
      pitchWithRotate: false,
      touchPitch: false,
      scrollZoom: { around: 'center' },
      touchZoomRotate: { around: 'center' }
    });

    maplibreInstance.touchZoomRotate.disableRotation();
    maplibreInstance.addControl(new maplibregl.NavigationControl({ showCompass: false }), 'top-left');

    // Keep the map's internal canvas size in sync with its actual on-screen
    // size at all times. If the container resizes (e.g. layout shifts,
    // window resize) without a matching map.resize() call, MapLibre's
    // projection math goes stale and pins will visibly drift off their
    // true coordinates as soon as you zoom or pan. A ResizeObserver makes
    // sure that never happens, so every pin stays geo-anchored in place.
    if (typeof ResizeObserver !== 'undefined') {
      const ro = new ResizeObserver(() => maplibreInstance.resize());
      ro.observe(container);
    }
    window.addEventListener('resize', () => maplibreInstance.resize());

    MAP_LOCATIONS.forEach(loc => {
      const el = document.createElement('div');
      el.className = `maplibre-pin-wrap ${loc.type === 'star' ? 'm-star' : 'm-' + loc.type}`;
      el.innerHTML = loc.type === 'star' ?
        `<span class="mnode-pulse star-pulse"></span><span class="mnode-dot star-dot">⭐️</span><span class="mnode-label cpg-label">${loc.name}</span>` :
        `<span class="mnode-pulse"></span><span class="mnode-dot"></span><span class="mnode-label">${loc.name}</span>`;

      // Explicit zero offset + center anchor: the marker's geo-coordinate
      // always maps to the exact center of this 14x14 element, regardless
      // of the label/pulse elements that visually overflow it.
      new maplibregl.Marker({ element: el, anchor: 'center', offset: [0, 0] })
        .setLngLat(loc.coords)
        .addTo(maplibreInstance);

      el.addEventListener('click', () => {
        document.querySelectorAll('.maplibre-pin-wrap').forEach(m => m.classList.remove('active'));
        el.classList.add('active');

        const mipName = document.getElementById('mipName');
        const mipLoc = document.getElementById('mipLoc');
        const mipUsecase = document.getElementById('mipUsecase');
        const mipImpact = document.getElementById('mipImpact');
        const mipSource = document.getElementById('mipSource');

        if (mipName) mipName.textContent = loc.name;
        if (mipLoc) mipLoc.innerHTML = `<i class="fa-solid fa-location-dot fa-xs"></i> ${loc.city}`;
        if (mipUsecase) mipUsecase.textContent = loc.usecase;
        if (mipImpact) mipImpact.innerHTML = `<i class="fa-solid fa-arrow-trend-up"></i> ${loc.impact}`;
        if (mipSource) mipSource.textContent = loc.source;

        maplibreInstance.flyTo({ center: loc.coords, zoom: 4.0, speed: 0.8 });
      });
    });
  }

  setTimeout(() => {
    maplibreInstance.resize();
  }, 100);
}

function initFirms() {
  const grid = document.getElementById('firmsGrid');
  const mapWrap = document.getElementById('firmsMapWrap');
  if (!grid) return;

  function renderFirms(filter) {
    if (filter === 'all') {
      grid.classList.add('hidden');
      if (mapWrap) mapWrap.classList.remove('hidden');
      initMapLibre();
      return;
    }

    grid.classList.remove('hidden');
    if (mapWrap) mapWrap.classList.add('hidden');

    grid.innerHTML = '';
    FIRMS.forEach(f => {
      if (filter !== 'all' && f.cat !== filter) return;
      const card = document.createElement('div');
      card.className = 'firm-card';
      card.innerHTML = `
        <div class="firm-top">
          <div class="firm-logo-box">${f.abbr.substring(0,2)}</div>
          <div>
            <div class="firm-name">${f.name}</div>
            <div class="firm-location"><i class="fa-solid fa-location-dot fa-xs"></i> ${f.location}</div>
          </div>
        </div>
        <div class="firm-tag-row">${f.tags.map(t => `<span class="firm-tag">${t}</span>`).join('')}</div>
        <p class="firm-usecase">${f.usecase}</p>
        <div class="firm-impact"><i class="fa-solid fa-arrow-trend-up"></i> ${f.impact}</div>
        <div class="firm-source">${f.source || ''}</div>
      `;
      grid.appendChild(card);
    });
  }

  renderFirms('all');

  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderFirms(btn.dataset.filter);
    });
  });
}

/* ══════════════════
   AIOS
══════════════════ */
const AIOS_LAYERS = [
  {
    num: 1, name: 'Core Identity',
    desc: 'The fixed personality, values, and purpose of the AI. For a CPG design assistant, this would be: "I help architects and urban designers. I never share confidential data. I always ask for clarification before generating."',
    example: '🔴 Example: An AI told to always follow CPG\'s design standards and HQ guidelines.'
  },
  {
    num: 2, name: 'Rules & Guardrails',
    desc: 'The boundaries the AI must never cross — like data security policies, copyright rules, and brand guidelines. These are set by IT and CPG leadership (the DTSC).',
    example: '🔴 Example: "Never paste this prompt into a public AI tool." "Do not generate images of real clients."'
  },
  {
    num: 3, name: 'Skills & Knowledge',
    desc: 'What the AI has been trained to do — analysing drawings, summarising documents, writing reports, comparing specs. This can be customised with CPG\'s own design documents.',
    example: '🔴 Example: Upload CPG\'s design manual → AI now knows your firm\'s standards automatically.'
  },
  {
    num: 4, name: 'Agents',
    desc: 'Autonomous mini-workers that can complete multi-step tasks on their own. Instead of just answering, they can open files, run comparisons, send alerts, and write reports.',
    example: '🔴 Example: An agent that checks every new drawing set against the client brief — overnight — and flags discrepancies before your morning standup.'
  },
  {
    num: 5, name: 'External Tools',
    desc: 'Connections to real-world apps: Revit, AutoCAD, Excel, SharePoint, email. The AI doesn\'t just talk — it can actually take action inside the tools your team uses every day.',
    example: '🔴 Example: Autodesk Forma AI is a Layer 5 tool — it reads your BIM model and gives performance feedback inside the software.'
  },
];

function initAios() {
  const container = document.getElementById('aiosLayers');
  if (!container) return;

  AIOS_LAYERS.forEach((l, i) => {
    const div = document.createElement('div');
    div.className = `alayer${i === 0 ? ' active' : ''}`;
    div.dataset.layer = l.num;
    div.innerHTML = `
      <div class="alayer-top">
        <span class="alayer-num">LAYER ${l.num}</span>
        <span class="alayer-name">${l.name}</span>
      </div>
      <div class="alayer-desc">
        <p>${l.desc}</p>
        <p class="alayer-example">${l.example}</p>
      </div>
    `;
    div.addEventListener('click', () => setActiveLayer(l.num));
    container.appendChild(div);
  });

  function setActiveLayer(num) {
    // Highlight detail panel
    document.querySelectorAll('.alayer').forEach((a, i) => {
      a.classList.toggle('active', i === num - 1);
    });
    // Highlight ring
    document.querySelectorAll('.cring').forEach(r => r.classList.remove('active'));
    const ring = document.querySelector(`.cring[data-layer="${num}"]`);
    if (ring) ring.classList.add('active');
    // Highlight label
    document.querySelectorAll('.clabel').forEach(l => l.classList.remove('active'));
    const lbl = document.querySelector(`.clabel[data-layer="${num}"]`);
    if (lbl) lbl.classList.add('active');
  }

  // Ring clicks
  document.querySelectorAll('.cring[data-layer]').forEach(ring => {
    ring.addEventListener('click', () => setActiveLayer(parseInt(ring.dataset.layer)));
  });

  // Label clicks
  document.querySelectorAll('.clabel[data-layer]').forEach(lbl => {
    lbl.addEventListener('click', () => setActiveLayer(parseInt(lbl.dataset.layer)));
  });

  // Default: Layer 5 (outermost) active on load
  setActiveLayer(5);
}

/* ══════════════════
   TIMELINE
══════════════════ */
const TIMELINE = {
  1950: {
    year: '1950s–60s', title: 'Foundations of Artificial Intelligence',
    desc: 'Alan Turing proposed the Turing Test in 1950.<br><br>In 1956, the Dartmouth Conference took place, where John McCarthy coined the term "Artificial Intelligence".<br><br>Early breakthroughs included Logic Theorist and LISP programming.<br><br>The dream of simulating human intelligence was born.',
    tags: ['Alan Turing', 'Dartmouth 1956', 'Logic Theorist', 'LISP Language', 'John McCarthy'],
  },
  1980: {
    year: '1980s–90s', title: 'Machine Learning & Expert Systems',
    desc: 'Rule-based Expert Systems emerged for commercial use, like XCON at Digital Equipment Corp, which saved $40M a year.<br><br>Backpropagation revived neural networks.<br><br>Support Vector Machines (SVM) and Random Forests became industry standards for structured data prediction.',
    tags: ['Expert Systems', 'Backpropagation', 'Machine Learning', 'SVM & Random Forest', 'Rule-Based AI'],
  },
  2000: {
    year: '2000s', title: 'Big Data & AI in the Background',
    desc: 'The explosive growth of the web generated massive datasets for the first time.<br><br>GPUs, originally built for graphics, were repurposed for parallel computing, letting machine learning scale to millions of parameters.<br><br>In 2006, Facebook\'s News Feed started using AI algorithms to decide what content each person sees.<br><br>This was AI quietly shaping what people saw online, working in the background, long before anyone talked to it directly.',
    tags: ['Big Data', 'GPU Computing', 'Facebook News Feed 2006', 'Recommendation Algorithms', 'Spatial Machine Learning'],
  },
  2010: {
    year: '2010s', title: 'Virtual Assistants & Deep Learning Revolution',
    desc: 'In 2011, Siri launched on the iPhone 4S, becoming the first popular virtual assistant people could actually talk to.<br><br>AlexNet (2012) shattered visual recognition error rates on ImageNet.<br><br>DeepMind\'s AlphaGo (2016) defeated the world Go champion, and ResNet enabled much deeper neural networks.<br><br>In 2017, the Transformer paper "Attention Is All You Need" set the stage for modern LLMs like ChatGPT.',
    tags: ['Siri 2011', 'AlexNet 2012', 'AlphaGo 2016', 'Transformer Architecture', 'Computer Vision & NLP'],
  },
  2020: {
    year: '2020s+', title: 'Generative AI & Autonomous Agents',
    desc: 'ChatGPT launched in late 2022 and started a global wave.<br><br>Then came GPT-4, Google Gemini, Anthropic Claude, xAI Grok, and Diffusion Models like Midjourney and DALL-E, bringing multimodal intelligence to the mainstream.<br><br>AI evolved from passive question and answer tools into autonomous Agents that execute complex multi-step workflows, write code, and optimize BIM spatial design.',
    tags: ['GPT-4 & Claude 3.5', 'Diffusion Models', 'Multimodal AI', 'Autonomous AI Agents', 'Copilot Studio'],
  },
  future: {
    year: 'Future & Beyond', title: 'The Future is Unwritten, Stay Curious! ✨',
    desc: '<strong>"Shaping the future through design innovation."</strong><br><br>From rule-based systems, to data-driven learning, to generative and multimodal intelligence.<br><br>AI isn\'t replacing human expertise, it multiplies design potential. What daily workflow will you transform next at CPG?',
    tags: ['Shaping the Future', 'Design Innovation', 'Stay Curious ✨', 'Human + AI Collaboration'],
  },
};

function initTimeline() {
  const display = document.getElementById('timelineDisplay');
  const fillBar = document.getElementById('ttrackFillBar');
  if (!display) return;

  const FILL_PERCENTS = {
    '1950': '5%',
    '1980': '23%',
    '2000': '41%',
    '2010': '59%',
    '2020': '77%',
    'future': '100%'
  };

  function selectEra(yKey) {
    const d = TIMELINE[yKey];
    if (!d) return;

    // Update fill bar
    if (fillBar && FILL_PERCENTS[yKey]) {
      fillBar.style.width = FILL_PERCENTS[yKey];
      fillBar.classList.toggle('is-future', yKey === 'future');
    }

    // Sync active classes
    document.querySelectorAll('.tyear-item').forEach(el => {
      el.classList.toggle('active', el.dataset.year === String(yKey));
    });
    document.querySelectorAll('.tpin-node').forEach(el => {
      el.classList.toggle('active', el.dataset.year === String(yKey));
    });
    document.querySelectorAll('.ttitle-item').forEach(el => {
      el.classList.toggle('active', el.dataset.year === String(yKey));
    });

    // Render detail card
    display.innerHTML = `
      <div class="tdisp-year${yKey === 'future' ? ' is-gold' : ''}">${d.year}</div>
      <div class="tdisp-title">${d.title}</div>
      <p class="tdisp-desc">${d.desc}</p>
      <div class="tdisp-tags">${d.tags.map(t => `<span class="tdisp-tag">${t}</span>`).join('')}</div>
    `;
  }

  // Ordered list of eras, used for keyboard next/previous navigation
  const ERA_KEYS = ['1950', '1980', '2000', '2010', '2020', 'future'];
  let currentEraIndex = 0;

  // Click handlers on years, pins, titles
  const clickables = document.querySelectorAll('.tyear-item, .tpin-node, .ttitle-item');
  clickables.forEach(el => {
    el.addEventListener('click', () => {
      selectEra(el.dataset.year);
      currentEraIndex = ERA_KEYS.indexOf(String(el.dataset.year));
    });
  });

  // Keyboard navigation: ArrowRight = next era, ArrowLeft = previous era.
  // Only active while the timeline section is visible on screen, and never
  // while the user is typing into a form field elsewhere on the page.
  const timelineSection = document.getElementById('timeline');
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;

    const activeTag = document.activeElement.tagName;
    if (activeTag === 'INPUT' || activeTag === 'TEXTAREA' || activeTag === 'SELECT') return;

    if (timelineSection) {
      const rect = timelineSection.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
      if (!isVisible) return;
    }

    e.preventDefault();
    if (e.key === 'ArrowRight') {
      currentEraIndex = Math.min(currentEraIndex + 1, ERA_KEYS.length - 1);
    } else {
      currentEraIndex = Math.max(currentEraIndex - 1, 0);
    }
    selectEra(ERA_KEYS[currentEraIndex]);
  });

  selectEra('1950');
}

/* ══════════════════
   FEED & FORM
══════════════════ */
const SEED_IDEAS = [
  { name: 'Cuong N.', dept: 'Architecture', time: '2h ago', text: 'Every project I spend 2 days manually extracting areas from PDFs and entering them into Excel. A tool that reads the drawing and fills the sheet automatically would save my whole week.', hours: '~8 hrs/week' },
  { name: 'Landscape Team', dept: 'Landscape', time: '5h ago', text: 'When clients ask for alternative plant palettes, I have to research each plant manually. An AI that could suggest plants based on climate zone and visual style would be incredibly useful.', hours: '~5 hrs/week' },
  { name: 'Anonymous', dept: 'QS & Contracts', time: '1d ago', text: 'Comparing BOQ specs against tender drawings takes forever. Sometimes we miss small discrepancies that cause rework. AI that cross-checks both documents would be a game-changer.', hours: '~12 hrs/week' },
  { name: 'Senior Architect', dept: 'Architecture', time: '2d ago', text: 'Meeting minutes — I attend 4+ meetings a week. Writing up accurate notes takes an hour each. I use Copilot now and it\'s already saving me 3 hours a week minimum.', hours: '~4 hrs/week' },
];

function initFeedAndForm() {
  const feed = document.getElementById('ideasFeed');
  if (!feed) return;

  function addToFeed(item, prepend = false) {
    const div = document.createElement('div');
    div.className = 'feed-item';
    div.innerHTML = `
      <div class="fi-top">
        <div>
          <span class="fi-name">${item.name}</span>
          <span class="fi-dept" style="margin-left:8px;">${item.dept}</span>
        </div>
        <span class="fi-time">${item.time}</span>
      </div>
      <div class="fi-text">${item.text}</div>
      ${item.hours ? `<div class="fi-hours"><i class="fa-solid fa-clock fa-xs"></i> ${item.hours}</div>` : ''}
    `;
    if (prepend && feed.firstChild) {
      feed.insertBefore(div, feed.firstChild);
    } else {
      feed.appendChild(div);
    }
  }

  SEED_IDEAS.forEach(i => addToFeed(i));

  // Form submit
  const form = document.getElementById('ideaForm');
  form?.addEventListener('submit', e => {
    e.preventDefault();
    const name   = document.getElementById('empName').value.trim() || 'Anonymous';
    const dept   = document.getElementById('deptSelect').value;
    const text   = document.getElementById('bottleneck').value.trim();
    const hours  = document.getElementById('hoursSaved').value;

    addToFeed({ name, dept, time: 'Just now', text, hours: hours ? `~${hours} hrs/week` : null }, true);

    // Update dashboard counters
    const ideasEl = document.getElementById('totalIdeasCount');
    const hoursEl = document.getElementById('totalHoursSaved');
    if (ideasEl) ideasEl.textContent = parseInt(ideasEl.textContent) + 1;
    if (hoursEl && hours) hoursEl.textContent = parseInt(hoursEl.textContent) + parseInt(hours);

    form.reset();

    // Short confirmation
    const btn = form.querySelector('.btn-submit-full');
    btn.innerHTML = '<i class="fa-solid fa-check"></i> Sent to leadership!';
    btn.style.background = '#10b981';
    setTimeout(() => {
      btn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Send to CPG Leadership';
      btn.style.background = '';
    }, 3000);
  });
}

/* ══════════════════
   SLIDE MODAL
══════════════════ */
const SLIDES = [
  { num: 1, title: 'Why Now? The Urgency of AI', body: 'Meta, Goldman Sachs, and Autodesk are grading staff on AI skills. CPG global competitors are already using AI agents. Vietnam needs to move fast - or fall behind.' },
  { num: 2, title: 'What AI Actually Is (No Jargon)', body: 'A very smart assistant that has read everything and can answer in seconds. You still make decisions; it helps you get there 10x faster. Like a pen - you need something to write first.' },
  { num: 3, title: '70 Years to Get Here', body: 'From Dartmouth 1956 > Expert Systems 1980s > Deep Learning 2012 > ChatGPT 2022 > AI Agents 2024. This is not a trend - it is a fundamental shift.' },
  { num: 4, title: 'Global AI Investment: Where is the Money?', body: '$200B+ invested in 2023 alone. Google, Microsoft, Amazon, and NVIDIA racing for the infrastructure layer. Architecture & urban design sector expected to see 40% productivity gain by 2028.' },
  { num: 5, title: 'What Global AEC Leaders Are Doing', body: 'Foster+Partners: AI environmental sims. BIG: Generative massing. Arup: BIM validation agents. Gensler: Space optimization. All seeing measurable results - right now.' },
  { num: 6, title: 'The 5-Layer AI Agent Model', body: 'Core Identity > Rules > Skills > Agents > Tools. An AI system CPG can build - starting simple, growing to fully autonomous agents that check drawings overnight while the team sleeps.' },
  { num: 7, title: 'CPG\'s Starting Point: Real Pain Points', body: 'Data from this workshop: Staff identify 8-12 hours/week lost to repetitive tasks. BOQ checking, render iterations, plant research, meeting notes - all AI-automatable within 6 months.' },
  { num: 8, title: 'The Bottom-Up Approach', body: 'Awareness > Urgency > Responsibility. Staff understand why - they feel the cost of not changing - they take ownership. Not top-down mandates - bottom-up participation.' },
  { num: 9, title: 'CPG AI Tools Roadmap', body: 'Phase 1 (Now): Microsoft Copilot for all staff. Phase 2 (Q3 2026): Sandbox for Midjourney, Veras, Forma. Phase 3 (Q1 2027): Custom AI agents for BIM & QS workflows.' },
  { num: 10, title: 'Data Governance & Security', body: 'DTSC policy: No confidential data in public AI tools. Copilot is O365-secured. Sandbox environments for testing. Every AI tool must be vetted before deployment. Security first.' },
  { num: 11, title: 'The CPG AI Hub: Staff Portal', body: 'A simple website where staff: Watch short AI explainer videos → Understand which tools to use → Submit bottlenecks and ideas → Leadership collects data and prioritises AI tools.' },
  { num: 12, title: 'Call to Action: Start This Week', body: 'One ask: Each person identifies one task this week that takes over 2 hours. We\'ll show you how AI can help — no technical skills required. The pen is ready. Let\'s write something great.' },
];

function initSlideModal() {
  const modal = document.getElementById('slideModal');
  const openBtn = document.getElementById('openSlidesBtn');
  const closeBtn = document.getElementById('closeSlideModal');
  const container = document.getElementById('slideListContainer');
  const copyBtn = document.getElementById('copySlidesBtn');

  if (!modal) return;

  // Populate
  SLIDES.forEach(s => {
    const div = document.createElement('div');
    div.className = 'slide-item';
    div.innerHTML = `
      <div class="slide-num">${s.num}</div>
      <div class="slide-info"><h4>${s.title}</h4><p>${s.body}</p></div>
    `;
    container.appendChild(div);
  });

  openBtn?.addEventListener('click', () => modal.classList.add('open'));
  document.getElementById('openSlidesBtnFooter')?.addEventListener('click', () => modal.classList.add('open'));
  closeBtn?.addEventListener('click', () => modal.classList.remove('open'));
  modal.addEventListener('click', e => { if (e.target === modal) modal.classList.remove('open'); });

  copyBtn?.addEventListener('click', () => {
    const text = SLIDES.map(s => `Slide ${s.num}: ${s.title}\n${s.body}`).join('\n\n');
    navigator.clipboard.writeText(text).then(() => {
      copyBtn.innerHTML = '<i class="fa-solid fa-check"></i> Copied!';
      setTimeout(() => { copyBtn.innerHTML = '<i class="fa-solid fa-copy"></i> Copy to clipboard'; }, 2000);
    });
  });
}
