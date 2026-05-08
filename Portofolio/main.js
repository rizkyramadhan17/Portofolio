document.addEventListener('DOMContentLoaded', () => {
    renderProjects();
    renderDisciplines();
    setupAnimations();
    setupImageModal();
});

function renderProjects() {
    const grid = document.getElementById('project-grid');
    grid.innerHTML = projects.map(project => {
        return `
            <div class="project-card dynamic-card">
                <div class="project-image-container">
                    <img src="${project.image}" alt="${project.title}" class="project-image">
                </div>
                <div class="project-info">
                    <h3 class="project-title">${project.title}</h3>
                    <span class="project-category">${project.category}</span>
                </div>
            </div>
        `;
    }).join('');
}

function renderDisciplines() {
    const list = document.getElementById('disciplines-list');
    list.innerHTML = disciplines.map(item => `
        <div class="discipline-item">
            <span class="discipline-num">/ ${item.id}</span>
            <div class="discipline-content">
                <h3 class="discipline-name">${item.name}</h3>
                <div class="discipline-tags">
                    ${item.tags.join(' &nbsp; ')}
                </div>
            </div>
        </div>
    `).join('');
}

function setupAnimations() {
    const observerOptions = { threshold: 0.1 };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    const animateElements = document.querySelectorAll('.project-card, .discipline-item');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s cubic-bezier(0.22, 1, 0.36, 1)';
        observer.observe(el);
    });
}

function setupImageModal() {
    const modal = document.getElementById('image-modal');
    const modalImg = document.getElementById('modal-img');
    const closeBtn = document.querySelector('.modal-close');
    const projectGrid = document.getElementById('project-grid');

    if (!modal || !modalImg || !projectGrid) return;

    // Use event delegation to handle clicks on dynamically rendered images
    projectGrid.addEventListener('click', (e) => {
        const clickedImage = e.target.closest('.project-image');
        if (clickedImage) {
            modal.style.display = 'flex';
            // Small timeout to allow display:flex to register before adding active class for transition
            setTimeout(() => {
                modal.classList.add('active');
                modalImg.src = clickedImage.src;
            }, 10);
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        }
    });

    const closeModal = () => {
        modal.classList.remove('active');
        setTimeout(() => {
            modal.style.display = 'none';
            modalImg.src = '';
        }, 400); // Match transition duration
        document.body.style.overflow = 'auto'; // Re-enable scrolling
    };

    closeBtn.addEventListener('click', closeModal);

    // Close on click outside the image
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
}
