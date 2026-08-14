/**
 * Modern & Interactive Portfolio Engine — Rizky Ramadhan Wardono
 */

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initScrollProgress();
    initMouseSpotlight();
    renderStats();
    initFilterTabs();
    renderProjects('all');
    renderDisciplines();
    initModal();
    initCopyActions();
    initScrollSpy();
});

/* ==========================================================================
   1. Theme Switcher (Dark / Light)
   ========================================================================== */
function initTheme() {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';

    document.documentElement.setAttribute('data-theme', savedTheme);

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('portfolio-theme', newTheme);
            showToast(`Tema beralih ke mode ${newTheme === 'dark' ? 'Gelap 🌙' : 'Terang ☀️'}`);
        });
    }
}

/* ==========================================================================
   2. Scroll Progress Bar & Scroll Spy
   ========================================================================== */
function initScrollProgress() {
    const progressBar = document.getElementById('scroll-progress');
    if (!progressBar) return;

    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progressPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        progressBar.style.width = `${progressPercent}%`;
    }, { passive: true });
}

function initScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu .nav-link');

    if (!sections.length || !navLinks.length) return;

    window.addEventListener('scroll', () => {
        let currentSectionId = '';
        const scrollPosition = window.scrollY + 200;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    }, { passive: true });
}

/* ==========================================================================
   3. Mouse Spotlight Follower
   ========================================================================== */
function initMouseSpotlight() {
    const spotlight = document.getElementById('mouse-spotlight');
    if (!spotlight) return;

    window.addEventListener('mousemove', (e) => {
        spotlight.style.left = `${e.clientX}px`;
        spotlight.style.top = `${e.clientY}px`;
    }, { passive: true });
}

/* ==========================================================================
   4. Stats Section & Counter Animation
   ========================================================================== */
function renderStats() {
    const container = document.getElementById('stats-grid');
    if (!container || typeof statsData === 'undefined') return;

    container.innerHTML = statsData.map(stat => `
        <div class="stat-card">
            <div class="stat-number-wrapper">
                <span class="stat-number" data-target="${stat.value}">0</span>
                <span class="stat-suffix">${stat.suffix}</span>
            </div>
            <div class="stat-label">${stat.label}</div>
            <div class="stat-desc">${stat.description}</div>
        </div>
    `).join('');

    animateCounters();
}

function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalValue = parseInt(target.getAttribute('data-target'), 10) || 0;
                let currentValue = 0;
                const duration = 1500;
                const increment = Math.max(1, Math.ceil(finalValue / (duration / 25)));

                const timer = setInterval(() => {
                    currentValue += increment;
                    if (currentValue >= finalValue) {
                        target.textContent = finalValue;
                        clearInterval(timer);
                    } else {
                        target.textContent = currentValue;
                    }
                }, 25);

                obs.unobserve(target);
            }
        });
    }, { threshold: 0.2 });

    counters.forEach(counter => observer.observe(counter));
}

/* ==========================================================================
   5. Projects & Filter Tabs with 3D Tilt
   ========================================================================== */
function initFilterTabs() {
    const tabsContainer = document.getElementById('filter-tabs');
    if (!tabsContainer || typeof projectCategories === 'undefined') return;

    tabsContainer.innerHTML = projectCategories.map((cat, index) => `
        <button class="filter-btn ${index === 0 ? 'active' : ''}" data-category="${cat.id}">
            ${cat.label}
        </button>
    `).join('');

    tabsContainer.addEventListener('click', (e) => {
        const btn = e.target.closest('.filter-btn');
        if (!btn) return;

        tabsContainer.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const selectedCategory = btn.getAttribute('data-category');
        renderProjects(selectedCategory);
    });
}

function renderProjects(categoryFilter = 'all') {
    const grid = document.getElementById('projects-grid');
    if (!grid || typeof projects === 'undefined') return;

    const filtered = categoryFilter === 'all'
        ? projects
        : projects.filter(p => p.category === categoryFilter);

    if (filtered.length === 0) {
        grid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 3rem; color: var(--text-muted);">Tidak ada project untuk kategori ini.</div>`;
        return;
    }

    grid.innerHTML = filtered.map(project => `
        <div class="tilt-card-wrapper">
            <div class="project-card" data-project-id="${project.id}">
                <div class="project-image-wrap">
                    <span class="project-badge">${project.badge || project.categoryLabel}</span>
                    <img src="${project.image}" alt="${project.title}" class="project-thumbnail" loading="lazy">
                    <div class="project-overlay-trigger">
                        <span class="overlay-pill">
                            <span>Detail Project</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
                        </span>
                    </div>
                </div>
                <div class="project-content">
                    <span class="project-meta-cat">${project.categoryLabel}</span>
                    <h3 class="project-heading">${project.title}</h3>
                    <p class="project-description">${project.description}</p>
                    <div class="project-tags-list">
                        ${project.tags.slice(0, 3).map(tag => `<span class="project-tag-pill">${tag}</span>`).join('')}
                        ${project.tags.length > 3 ? `<span class="project-tag-pill">+${project.tags.length - 3}</span>` : ''}
                    </div>
                </div>
            </div>
        </div>
    `).join('');

    init3DTilt();
}

function init3DTilt() {
    const cards = document.querySelectorAll('.project-card');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -7;
            const rotateY = ((x - centerX) / centerX) * 7;

            card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-4px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
        });
    });
}

/* ==========================================================================
   6. Disciplines / Skills Matrix
   ========================================================================== */
function renderDisciplines() {
    const container = document.getElementById('disciplines-grid');
    if (!container || typeof disciplines === 'undefined') return;

    container.innerHTML = disciplines.map(disc => `
        <div class="discipline-card">
            <div class="disc-header">
                <div class="disc-icon-badge">${disc.icon}</div>
                <span class="disc-num">/ ${disc.id}</span>
            </div>
            <h3 class="disc-title">${disc.name}</h3>
            <p class="disc-description">${disc.description}</p>
            <div class="disc-tags-wrapper">
                ${disc.tags.map(tag => `<span class="disc-skill-badge">${tag}</span>`).join('')}
            </div>
        </div>
    `).join('');
}

/* ==========================================================================
   7. Rich Interactive Project Modal
   ========================================================================== */
function initModal() {
    const modal = document.getElementById('project-modal');
    const closeBtn = document.getElementById('modal-close');
    const projectGrid = document.getElementById('projects-grid');

    if (!modal || !closeBtn || !projectGrid) return;

    projectGrid.addEventListener('click', (e) => {
        const card = e.target.closest('.project-card');
        if (!card) return;

        const projectId = card.getAttribute('data-project-id');
        const project = projects.find(p => p.id === projectId);
        if (project) {
            openProjectModal(project);
        }
    });

    const closeModal = () => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    };

    closeBtn.addEventListener('click', closeModal);

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
}

function openProjectModal(project) {
    const modal = document.getElementById('project-modal');
    const img = document.getElementById('modal-project-img');
    const title = document.getElementById('modal-project-title');
    const subtitle = document.getElementById('modal-project-subtitle');
    const desc = document.getElementById('modal-project-desc');
    const actionsContainer = document.getElementById('modal-actions-container');
    const highlightsBox = document.getElementById('modal-highlights-box');
    const highlightsList = document.getElementById('modal-highlights-list');
    const tagsContainer = document.getElementById('modal-tags-container');

    img.src = project.image;
    img.alt = project.title;
    title.textContent = project.title;
    subtitle.textContent = project.subtitle || project.categoryLabel;
    desc.textContent = project.description;

    // Actions
    if (project.link) {
        actionsContainer.innerHTML = `
            <a href="${project.link}" target="_blank" class="btn-modern-primary" style="padding: 0.6rem 1.25rem; font-size: 0.88rem;">
                <span>Buka Live Demo</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
            </a>
        `;
    } else {
        actionsContainer.innerHTML = `
            <span class="project-badge" style="position: static; display: inline-block;">${project.badge}</span>
        `;
    }

    // Highlights
    if (project.highlights && project.highlights.length > 0) {
        highlightsBox.style.display = 'block';
        highlightsList.innerHTML = project.highlights.map(h => `<li>${h}</li>`).join('');
    } else {
        highlightsBox.style.display = 'none';
    }

    // Tags
    tagsContainer.innerHTML = project.tags.map(tag => `<span class="disc-skill-badge">${tag}</span>`).join('');

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

/* ==========================================================================
   8. Copy to Clipboard Actions & Toast Notification
   ========================================================================== */
function initCopyActions() {
    const quickBtn = document.getElementById('quick-copy-email-btn');
    const boxBtn = document.getElementById('copy-email-box-btn');
    const emailToCopy = (typeof profileData !== 'undefined' && profileData.email) ? profileData.email : 'rizkyramadhab05@gmail.com';

    const handleCopy = (e) => {
        e.preventDefault();
        navigator.clipboard.writeText(emailToCopy).then(() => {
            showToast(`Email disalin: ${emailToCopy} 📋`);
        }).catch(() => {
            showToast('Gagal menyalin email otomatis.');
        });
    };

    if (quickBtn) quickBtn.addEventListener('click', handleCopy);
    if (boxBtn) boxBtn.addEventListener('click', handleCopy);
}

function showToast(message) {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast-item';
    toast.innerHTML = `
        <svg class="toast-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
        </svg>
        <span>${message}</span>
    `;

    container.appendChild(toast);

    // Trigger animation
    requestAnimationFrame(() => {
        toast.classList.add('show');
    });

    // Auto dismiss
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 3000);
}
