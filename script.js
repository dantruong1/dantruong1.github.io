/* ===========================
   PERSONAL WEBSITE — SCRIPT
   Loads content from JSON,
   renders sections, handles
   scroll animations & nav.
   =========================== */

document.addEventListener('DOMContentLoaded', () => {
  loadContent();
  initScrollFeatures();
});

// =============================================
// CONTENT LOADER
// =============================================

function loadContent() {
  const data = SITE_CONTENT;

  renderHero(data.hero);
  renderAbout(data.about);
  renderProjects(data.projects);
  renderMusic(data.music);
  renderQuotes(data.quotes);
  renderWritings(data.writings);
  renderRecommendations(data.recommendations);

  // Re-observe new elements for scroll animations
  observeRevealElements();
}

// =============================================
// RENDERERS
// =============================================

function renderHero(hero) {
  if (!hero) return;

  setText('heroGreeting', hero.greeting);
  setText('heroName', hero.name);
  setText('heroTagline', hero.tagline);

  if (hero.photo) {
    const wrapper = document.getElementById('heroPhotoWrapper');
    const img = document.getElementById('heroPhoto');
    img.src = hero.photo;
    img.alt = `Photo of ${hero.name}`;
    wrapper.style.display = '';
  }
}

function renderAbout(about) {
  if (!about) return;
  const container = document.getElementById('aboutContent');

  let html = '';

  // Optional photo
  if (about.photo) {
    html += `
      <div class="about__photo-wrapper">
        <img class="about__photo" src="${esc(about.photo)}" alt="About me photo">
      </div>`;
  }

  // Text paragraphs
  html += '<div class="about__text">';
  about.paragraphs.forEach(p => {
    html += `<p>${p}</p>`;
  });
  html += '</div>';

  container.innerHTML = html;
}

function renderProjects(projects) {
  if (!projects || !projects.length) return;
  const grid = document.getElementById('projectsGrid');

  grid.innerHTML = projects.map((project, i) => {
    const delay = `reveal-delay-${Math.min(i + 1, 4)}`;
    const linkOpen = project.url ? `<a href="${esc(project.url)}" target="_blank" rel="noopener noreferrer" class="project-card__link">` : '';
    const linkClose = project.url ? '</a>' : '';

    return `
      <article class="card project-card reveal ${delay}" id="project-${i + 1}">
        ${project.image ? `<img class="project-card__image" src="${esc(project.image)}" alt="${esc(project.title)}">` : ''}
        <span class="project-card__tag">${esc(project.tag)}</span>
        ${linkOpen}
          <h3 class="project-card__title">${esc(project.title)}</h3>
        ${linkClose}
        <p class="project-card__description">${esc(project.description)}</p>
        <div class="project-card__tech">
          ${project.tech.map(t => `<span class="project-card__tech-item">${esc(t)}</span>`).join('')}
        </div>
      </article>`;
  }).join('');
}

function renderMusic(music) {
  if (!music || !music.length) return;
  const grid = document.getElementById('musicGrid');

  grid.innerHTML = music.map((item, i) => {
    const delay = `reveal-delay-${Math.min(i + 1, 4)}`;
    const visual = item.image
      ? `<img class="music-card__cover" src="${esc(item.image)}" alt="${esc(item.title)}">`
      : `<span class="music-card__emoji">${item.emoji || '🎵'}</span>`;

    return `
      <article class="card music-card reveal ${delay}" id="music-${i + 1}">
        ${visual}
        <h3 class="music-card__title">${esc(item.title)}</h3>
        <p class="music-card__artist">${esc(item.artist)}</p>
        <span class="music-card__genre">${esc(item.genre)}</span>
      </article>`;
  }).join('');
}

function renderQuotes(quotes) {
  if (!quotes || !quotes.length) return;
  const list = document.getElementById('quotesList');

  list.innerHTML = quotes.map((quote, i) => {
    const delay = `reveal-delay-${Math.min(i + 1, 4)}`;
    const source = quote.source ? `, ${esc(quote.source)}` : '';

    return `
      <blockquote class="card quote-card reveal ${delay}" id="quote-${i + 1}">
        <div class="quote-card__icon">\u201C</div>
        <p class="quote-card__text">${esc(quote.text)}</p>
        <footer class="quote-card__attribution">
          — <strong>${esc(quote.author)}</strong>${source}
        </footer>
      </blockquote>`;
  }).join('');
}

function renderWritings(writings) {
  if (!writings || !writings.length) return;
  const list = document.getElementById('writingsList');

  list.innerHTML = writings.map((writing, i) => {
    const delay = `reveal-delay-${Math.min(i + 1, 4)}`;
    const isLink = writing.url && writing.url.length > 0;
    const tag = isLink ? 'a' : 'article';
    const linkAttrs = isLink ? `href="${esc(writing.url)}" target="_blank" rel="noopener noreferrer"` : '';

    return `
      <${tag} class="card writing-card reveal ${delay}" id="writing-${i + 1}" ${linkAttrs}>
        <time class="writing-card__date">${esc(writing.date)}</time>
        <div class="writing-card__content">
          <h3 class="writing-card__title">${esc(writing.title)}</h3>
          <p class="writing-card__excerpt">${esc(writing.excerpt)}</p>
        </div>
        ${isLink ? '<span class="writing-card__external">↗</span>' : ''}
      </${tag}>`;
  }).join('');
}

function renderRecommendations(recs) {
  if (!recs || !recs.length) return;
  const grid = document.getElementById('recsGrid');

  grid.innerHTML = recs.map((rec, i) => {
    const delay = `reveal-delay-${Math.min(i + 1, 4)}`;
    const categoryClass = `rec-card__category--${esc(rec.category)}`;
    const isLink = rec.url && rec.url.length > 0;
    const tag = isLink ? 'a' : 'article';
    const linkAttrs = isLink ? `href="${esc(rec.url)}" target="_blank" rel="noopener noreferrer"` : '';

    return `
      <${tag} class="card rec-card reveal ${delay}" id="rec-${i + 1}" ${linkAttrs}>
        ${rec.image ? `<img class="rec-card__image" src="${esc(rec.image)}" alt="${esc(rec.title)}">` : ''}
        <span class="rec-card__category ${categoryClass}">${esc(rec.category)}</span>
        <h3 class="rec-card__title">${esc(rec.title)}</h3>
        <p class="rec-card__description">${esc(rec.description)}</p>
      </${tag}>`;
  }).join('');
}

// =============================================
// UTILITIES
// =============================================

function esc(str) {
  if (!str) return '';
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

function setText(id, text) {
  const el = document.getElementById(id);
  if (el && text) el.textContent = text;
}

// =============================================
// SCROLL FEATURES
// =============================================

function initScrollFeatures() {
  const scrollProgress = document.getElementById('scrollProgress');
  const backToTop = document.getElementById('backToTop');

  // Scroll progress bar
  function updateScrollProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? scrollTop / docHeight : 0;
    scrollProgress.style.transform = `scaleX(${progress})`;
  }

  // Back to top button
  function updateBackToTop() {
    if (window.scrollY > 500) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  }

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Throttled scroll handler
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        updateScrollProgress();
        updateBackToTop();
        ticking = false;
      });
      ticking = true;
    }
  });

  // Active section tracking for ToC
  const sections = document.querySelectorAll('.section[id]');
  const tocLinks = document.querySelectorAll('.toc__link');

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const id = entry.target.getAttribute('id');
        const tocLink = document.getElementById(`toc-${id}`);
        if (tocLink) {
          if (entry.isIntersecting) {
            tocLinks.forEach((link) => link.style.borderColor = 'transparent');
            tocLink.style.borderColor = 'var(--border-card-hover)';
          }
        }
      });
    },
    { threshold: 0.2, rootMargin: '-10% 0px -70% 0px' }
  );

  sections.forEach((section) => sectionObserver.observe(section));

  // Initial state
  updateScrollProgress();
  updateBackToTop();

  // Observe any existing reveal elements
  observeRevealElements();
}

// Intersection Observer for scroll-triggered fade-in
function observeRevealElements() {
  const revealElements = document.querySelectorAll('.reveal:not(.observed)');

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  revealElements.forEach((el) => {
    el.classList.add('observed');
    revealObserver.observe(el);
  });
}
