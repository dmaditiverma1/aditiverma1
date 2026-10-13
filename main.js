// Aditi Verma Portfolio - Interactive Features & Functionality

document.addEventListener('DOMContentLoaded', () => {

    // 1. Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const menuIcon = document.getElementById('menuIcon');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            if (mobileMenu.classList.contains('hidden')) {
                menuIcon.classList.remove('fa-xmark');
                menuIcon.classList.add('fa-bars');
            } else {
                menuIcon.classList.remove('fa-bars');
                menuIcon.classList.add('fa-xmark');
            }
        });

        const mobileLinks = document.querySelectorAll('.mobile-nav-link');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                menuIcon.classList.remove('fa-xmark');
                menuIcon.classList.add('fa-bars');
            });
        });
    }

    // 2. Animated Stats Counter (Immediate display + smooth counting)
    const counters = document.querySelectorAll('.counter');
    let hasAnimated = false;

    const runCounters = () => {
        if (hasAnimated) return;
        hasAnimated = true;
        counters.forEach(counter => {
            const target = parseFloat(counter.getAttribute('data-target'));
            const decimals = parseInt(counter.getAttribute('data-decimals') || '0', 10);
            const prefix = counter.getAttribute('data-prefix') || '';
            const suffix = counter.getAttribute('data-suffix') || '';
            const duration = 1500;
            const startTime = performance.now();

            const updateCount = (currentTime) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const easeProgress = 1 - Math.pow(1 - progress, 3);
                const currentVal = easeProgress * target;

                if (decimals > 0) {
                    counter.innerText = prefix + currentVal.toFixed(decimals) + suffix;
                } else {
                    counter.innerText = prefix + Math.floor(currentVal) + suffix;
                }

                if (progress < 1) {
                    requestAnimationFrame(updateCount);
                } else {
                    counter.innerText = prefix + (decimals > 0 ? target.toFixed(decimals) : target) + suffix;
                }
            };

            requestAnimationFrame(updateCount);
        });
    };

    // Auto trigger counters after slight delay so numbers are never stuck at 0
    setTimeout(runCounters, 300);

    // Also observe on scroll
    const counterSection = document.querySelector('.counter')?.closest('section');
    if (counterSection && 'IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    runCounters();
                }
            });
        }, { threshold: 0.1 });
        observer.observe(counterSection);
    }

    // 3. Brand & Project Filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => {
                b.classList.remove('active', 'bg-[#987AB8]', 'text-white');
                b.classList.add('bg-white', 'text-[#554A62]');
            });
            btn.classList.add('active', 'bg-[#987AB8]', 'text-white');
            btn.classList.remove('bg-white', 'text-[#554A62]');

            const filter = btn.getAttribute('data-filter');
            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filter === 'all' || category === filter) {
                    card.style.display = 'block';
                    card.classList.remove('hidden');
                } else {
                    card.style.display = 'none';
                    card.classList.add('hidden');
                }
            });
        });
    });

    // 4. Dynamic Year
    const yearElem = document.getElementById('currentYear');
    if (yearElem) {
        yearElem.textContent = new Date().getFullYear();
    }

    // 5. Certificate Lightbox Modal
    const certModal = document.getElementById('certModal');
    const certModalImg = document.getElementById('certModalImg');
    const certModalTitle = document.getElementById('certModalTitle');
    const certModalId = document.getElementById('certModalId');
    const closeCertModal = document.getElementById('closeCertModal');
    const certTriggers = document.querySelectorAll('.cert-preview-trigger');

    if (certModal && certModalImg && closeCertModal) {
        certTriggers.forEach(trigger => {
            trigger.addEventListener('click', () => {
                const imgPath = trigger.getAttribute('data-img');
                const title = trigger.getAttribute('data-title') || 'Certificate Preview';
                const id = trigger.getAttribute('data-id') || '';

                certModalImg.src = imgPath;
                certModalTitle.textContent = title;
                certModalId.textContent = id ? `Credential ID: ${id}` : 'Verified Credential';

                certModal.classList.remove('hidden');
                certModal.classList.add('flex');
                document.body.style.overflow = 'hidden';
            });
        });

        const closeModal = () => {
            certModal.classList.add('hidden');
            certModal.classList.remove('flex');
            document.body.style.overflow = 'auto';
            certModalImg.src = '';
        };

        closeCertModal.addEventListener('click', closeModal);
        certModal.addEventListener('click', (e) => {
            if (e.target === certModal) closeModal();
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !certModal.classList.contains('hidden')) {
                closeModal();
            }
        });
    }
});
