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

        // Close mobile menu on clicking any link
        const mobileLinks = document.querySelectorAll('.mobile-nav-link');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                menuIcon.classList.remove('fa-xmark');
                menuIcon.classList.add('fa-bars');
            });
        });
    }

    // 2. Animated Stats Counter on Scroll
    const counters = document.querySelectorAll('.counter');
    let hasAnimated = false;

    const runCounters = () => {
        counters.forEach(counter => {
            const target = parseFloat(counter.getAttribute('data-target'));
            const decimals = parseInt(counter.getAttribute('data-decimals') || '0', 10);
            const prefix = counter.getAttribute('data-prefix') || '';
            const suffix = counter.getAttribute('data-suffix') || '';
            const duration = 1800; // ms
            const startTime = performance.now();

            const updateCount = (currentTime) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                // Ease out quad
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
                    if (decimals > 0) {
                        counter.innerText = prefix + target.toFixed(decimals) + suffix;
                    } else {
                        counter.innerText = prefix + target + suffix;
                    }
                }
            };

            requestAnimationFrame(updateCount);
        });
    };

    // Intersection Observer for Counters
    const counterSection = document.querySelector('.counter')?.closest('section');
    if (counterSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !hasAnimated) {
                    hasAnimated = true;
                    runCounters();
                }
            });
        }, { threshold: 0.25 });

        observer.observe(counterSection);
    }

    // 3. Brand & Project Filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active state
            filterButtons.forEach(b => {
                b.classList.remove('active', 'bg-emerald-500', 'text-slate-950');
                b.classList.add('bg-slate-800/80', 'text-slate-300');
            });
            btn.classList.add('active', 'bg-emerald-500', 'text-slate-950');
            btn.classList.remove('bg-slate-800/80', 'text-slate-300');

            const filter = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filter === 'all' || category.includes(filter)) {
                    card.style.display = 'flex';
                    card.classList.add('animate-fadeIn');
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // 4. Dynamic Copyright Year
    const yearElem = document.getElementById('currentYear');
    if (yearElem) {
        yearElem.textContent = new Date().getFullYear();
    }

    // 7. Certificate Lightbox Modal
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
            if (e.target === certModal) {
                closeModal();
            }
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !certModal.classList.contains('hidden')) {
                closeModal();
            }
        });
    }
});
