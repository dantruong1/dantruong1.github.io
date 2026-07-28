/* ===========================
   PERSONAL WEBSITE — SCRIPT
   Loads content from JSON,
   renders sections, handles
   scroll animations & nav.
   =========================== */

document.addEventListener('DOMContentLoaded', () => {
  loadContent();
  initScrollFeatures();
  initLofiAudioWidget();
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
  if (!container) return;

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
  if (!grid) return;

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
  if (!grid) return;

  grid.innerHTML = music.map((item, i) => {
    const delay = `reveal-d${Math.min((i % 4) + 1, 4)}`;
    const rankTag = item.rank ? `<span class="music-card__rank">${esc(item.rank)}</span>` : '';
    const badgeTag = item.badge ? `<span class="music-card__badge">${esc(item.badge)}</span>` : '';
    const noteText = item.note ? `<p class="music-card__note">${esc(item.note)}</p>` : '';
    const albumText = item.album ? ` · <em>${esc(item.album)}</em>` : '';
    const isFeatured = item.rank ? 'music-card--featured' : '';

    return `
      <article class="music-card ${isFeatured} reveal ${delay}" id="music-${i + 1}">
        <div class="music-card__header">
          <div class="music-card__disc" title="Vinyl Disc">
            <i class="ph ph-disc"></i>
          </div>
          <div class="music-card__meta">
            <div class="music-card__badges">
              ${rankTag}
              ${badgeTag}
            </div>
            <h3 class="music-card__title">${esc(item.title)}</h3>
            <p class="music-card__artist">${esc(item.artist)}${albumText}</p>
          </div>
        </div>
        ${noteText}
        <div class="music-card__footer">
          <span class="music-card__genre"><i class="ph ph-music-notes"></i> ${esc(item.genre)}</span>
          <span class="music-card__listen"><i class="ph ph-waveform"></i> Audio Vibe</span>
        </div>
      </article>`;
  }).join('');
}

let visibleQuoteCount = 8;
let allQuotesData = [];

function renderQuotes(quotes) {
  if (quotes) allQuotesData = quotes;
  if (!allQuotesData || !allQuotesData.length) return;

  const list = document.getElementById('quotesList');
  if (!list) return;
  const searchInput = document.getElementById('quoteSearch');
  const loadMoreBtn = document.getElementById('loadMoreQuotes');
  const footer = document.getElementById('quotesFooter');

  const query = searchInput ? searchInput.value.trim().toLowerCase() : '';

  const filtered = allQuotesData.filter(q => {
    if (!query) return true;
    return q.text.toLowerCase().includes(query) ||
           (q.author && q.author.toLowerCase().includes(query)) ||
           (q.source && q.source.toLowerCase().includes(query));
  });

  const quotesToShow = query ? filtered : filtered.slice(0, visibleQuoteCount);

  if (quotesToShow.length === 0) {
    list.innerHTML = `<p class="quotes__empty">No quotes matching "${esc(query)}"</p>`;
  } else {
    list.innerHTML = quotesToShow.map((quote, i) => {
      const delay = `reveal-delay-${Math.min((i % 4) + 1, 4)}`;
      const source = quote.source ? `, ${esc(quote.source)}` : '';
      const authorText = quote.author && quote.author !== 'Anonymous' ? `— <strong>${esc(quote.author)}</strong>${source}` : '';

      return `
        <blockquote class="card quote-card reveal ${delay}" id="quote-${i + 1}">
          <div class="quote-card__icon">\u201C</div>
          <p class="quote-card__text">${esc(quote.text)}</p>
          ${authorText ? `<footer class="quote-card__attribution">${authorText}</footer>` : ''}
        </blockquote>`;
    }).join('');
  }

  // Handle Load More visibility & text
  if (footer && loadMoreBtn) {
    if (query || visibleQuoteCount >= filtered.length) {
      footer.style.display = 'none';
    } else {
      footer.style.display = 'block';
      const remaining = filtered.length - visibleQuoteCount;
      loadMoreBtn.textContent = `Show More Quotes (${remaining} remaining)`;
    }
  }

  // Bind events once if needed
  if (searchInput && !searchInput.dataset.bound) {
    searchInput.dataset.bound = 'true';
    searchInput.addEventListener('input', () => {
      renderQuotes();
      observeRevealElements();
    });
  }

  if (loadMoreBtn && !loadMoreBtn.dataset.bound) {
    loadMoreBtn.dataset.bound = 'true';
    loadMoreBtn.addEventListener('click', () => {
      visibleQuoteCount += 10;
      renderQuotes();
      observeRevealElements();
    });
  }
}

function renderWritings(writings) {
  if (!writings || !writings.length) return;
  const list = document.getElementById('writingsList');
  if (!list) return;

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
  if (!grid) return;

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

// =============================================
// COZY LO-FI SONG SYNTHESIZER
// =============================================

let audioCtx = null;
let songInterval = null;
let crackleSource = null;
let isSongPlaying = false;

function initLofiAudioWidget() {
  const toggleBtn = document.getElementById('lofiToggle');
  const label = document.getElementById('lofiLabel');
  const icon = document.getElementById('lofiIcon');
  if (!toggleBtn) return;

  toggleBtn.addEventListener('click', () => {
    if (!isSongPlaying) {
      startCozyLofiSong();
      isSongPlaying = true;
      toggleBtn.classList.add('active');
      if (label) label.textContent = 'Cozy Song: Playing 🎵';
      if (icon) icon.className = 'ph ph-music-notes-simple';
    } else {
      stopCozyLofiSong();
      isSongPlaying = false;
      toggleBtn.classList.remove('active');
      if (label) label.textContent = 'Cozy Song: Off';
      if (icon) icon.className = 'ph ph-music-notes';
    }
  });
}

function startCozyLofiSong() {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!audioCtx) audioCtx = new AudioContext();
    if (audioCtx.state === 'suspended') audioCtx.resume();

    // 1. Vinyl Crackle
    const bufferSize = audioCtx.sampleRate * 2;
    const noiseBuffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = (Math.random() * 2 - 1) * 0.012;
    }

    crackleSource = audioCtx.createBufferSource();
    crackleSource.buffer = noiseBuffer;
    crackleSource.loop = true;

    const crackleFilter = audioCtx.createBiquadFilter();
    crackleFilter.type = 'lowpass';
    crackleFilter.frequency.value = 800;

    crackleSource.connect(crackleFilter);
    crackleFilter.connect(audioCtx.destination);
    crackleSource.start();

    // 2. Lo-Fi Rhodes Piano Chords Loop (Cmaj7 - Am7 - Dm7 - G7)
    const chords = [
      [261.63, 329.63, 392.00, 493.88], // Cmaj7
      [220.00, 261.63, 329.63, 392.00], // Am7
      [293.66, 349.23, 440.00, 523.25], // Dm7
      [196.00, 246.94, 293.66, 349.23]  // G7
    ];

    let chordStep = 0;

    function playChord() {
      if (!isSongPlaying) return;
      const currentChord = chords[chordStep % chords.length];
      chordStep++;

      currentChord.forEach(freq => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();

        osc.type = 'sine'; // Soft warm Rhodes tone
        osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

        const filter = audioCtx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(550, audioCtx.currentTime);

        // Soft attack & release envelope
        gain.gain.setValueAtTime(0.001, audioCtx.currentTime);
        gain.gain.linearRampToValueAtTime(0.06, audioCtx.currentTime + 0.15);
        gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 2.8);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(audioCtx.destination);

        osc.start(audioCtx.currentTime);
        osc.stop(audioCtx.currentTime + 2.9);
      });
    }

    playChord();
    songInterval = setInterval(playChord, 3000); // 3-second chord loop
  } catch (err) {
    console.error('Lofi song synth error:', err);
  }
}

function stopCozyLofiSong() {
  if (songInterval) {
    clearInterval(songInterval);
    songInterval = null;
  }
  if (crackleSource) {
    try {
      crackleSource.stop();
      crackleSource.disconnect();
    } catch (e) {}
    crackleSource = null;
  }
}
