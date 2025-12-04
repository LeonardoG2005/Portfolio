class GradientCanvas {
    constructor() {
        this.canvas = document.getElementById('gradient-canvas');
        if (!this.canvas) return;
        
        this.ctx = this.canvas.getContext('2d');
        this.animationId = null;
        this.time = 0;
        this.getColors();
        this.resizeCanvas();
        this.animate();
        
        window.addEventListener('resize', () => this.resizeCanvas());
    }
    
    getColors() {
        const root = getComputedStyle(document.documentElement);
        this.colors = [
            root.getPropertyValue('--gradient-color-1').trim(),
            root.getPropertyValue('--gradient-color-2').trim(),
            root.getPropertyValue('--gradient-color-3').trim(),
            root.getPropertyValue('--gradient-color-4').trim(),
        ];
    }
    
    resizeCanvas() {
        const container = this.canvas.parentElement;
        this.canvas.width = container.offsetWidth;
        this.canvas.height = container.offsetHeight;
    }
    
    animate() {
        this.time += 0.005;
        this.drawGradient();
        this.animationId = requestAnimationFrame(() => this.animate());
    }
    
    drawGradient() {
        const { width, height } = this.canvas;
        const time = this.time;
        const grd = this.ctx.createLinearGradient(
            width * (0.5 + 0.3 * Math.sin(time)),
            height * (0.5 + 0.3 * Math.cos(time)),
            width * (0.5 - 0.3 * Math.sin(time + 1)),
            height * (0.5 - 0.3 * Math.cos(time + 1))
        );
        
        grd.addColorStop(0, this.colors[0]);
        grd.addColorStop(0.33, this.colors[1]);
        grd.addColorStop(0.66, this.colors[2]);
        grd.addColorStop(1, this.colors[3]);
        
        this.ctx.fillStyle = grd;
        this.ctx.fillRect(0, 0, width, height);
    }
    
    destroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
    }
}

// Initialize on DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new GradientCanvas();
    });
} else {
    new GradientCanvas();
}

const CONFIG = {
    scrollOffset: 80,
    scrollRevealThreshold: 0.1,
};

const Utils = {
    throttle(func, wait = 100) {
        let waiting = false;
        return function executedFunction(...args) {
            if (!waiting) {
                func.apply(this, args);
                waiting = true;
                setTimeout(() => {
                    waiting = false;
                }, wait);
            }
        };
    },

    smoothScrollTo(target, offset = 0) {
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
};

class HeroNavbar {
    constructor() {
        this.navbar = document.getElementById('navbarHero');
        this.navLinks = this.navbar ? this.navbar.querySelectorAll('a[href^="#"]') : [];
        this.sections = document.querySelectorAll('section[id]');
        
        this.init();
    }

    init() {
        if (!this.navbar) return;
        this.setupSmoothScroll();
    }

    setupSmoothScroll() {
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                if (targetId === '#contact') {
                    window.scrollTo({
                        top: document.body.scrollHeight,
                        behavior: 'smooth'
                    });
                    return;
                }
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    Utils.smoothScrollTo(targetSection, CONFIG.scrollOffset);
                }
            });
        });
    }
}

class ScrollReveal {
    constructor() {
        this.elements = document.querySelectorAll('.scroll-reveal');
        this.init();
    }

    init() {
        if (this.elements.length === 0) return;

        const observerOptions = {
            threshold: CONFIG.scrollRevealThreshold,
            rootMargin: '0px 0px -50px 0px'
        };

        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                }
            });
        }, observerOptions);

        this.elements.forEach(el => this.observer.observe(el));
    }
}

class LazyLoader {
    constructor() {
        this.init();
    }

    init() {
        const images = document.querySelectorAll('img[data-src]');
        
        if (images.length === 0) return;

        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }
}

class UserPreferences {
    constructor() {
        this.init();
    }

    init() {
        this.detectReducedMotion();
    }

    detectReducedMotion() {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
        
        if (prefersReducedMotion.matches) {
            document.body.classList.add('reduce-motion');
        }

        prefersReducedMotion.addEventListener('change', (e) => {
            if (e.matches) {
                document.body.classList.add('reduce-motion');
            } else {
                document.body.classList.remove('reduce-motion');
            }
        });
    }
}

class ProjectImages {
    constructor() {
        this.init();
    }

    init() {
        const projectCards = document.querySelectorAll('.project-card');
        
        projectCards.forEach(card => {
            const img = card.querySelector('.project-image');
            const placeholder = card.querySelector('.project-image-placeholder');
            
            if (img && placeholder) {
                if (img.complete && img.naturalWidth > 0) {
                    placeholder.style.display = 'none';
                } else {
                    img.addEventListener('load', () => {
                        placeholder.style.display = 'none';
                    });
                    
                    img.addEventListener('error', () => {
                        img.style.display = 'none';
                    });
                }
            }
        });
    }
}

class ProfileImageHandler {
    constructor() {
        this.profileImg = document.querySelector('.navbar-hero-profile-img');
        this.init();
    }

    init() {
        if (!this.profileImg) return;

        this.profileImg.addEventListener('error', () => {
            const placeholder = document.querySelector('.navbar-hero-profile-placeholder');
            if (placeholder) {
                placeholder.style.display = 'flex';
                this.profileImg.style.display = 'none';
            }
        });
    }
}

class HeroInlineButton {
    constructor() {
        this.button = document.querySelector('.hero-inline-btn');
        this.init();
    }

    init() {
        if (!this.button) return;

        this.button.addEventListener('click', () => {
            // Scroll al final o abre modal de contacto
            window.scrollTo({
                top: document.body.scrollHeight,
                behavior: 'smooth'
            });
        });
    }
}

class Analytics {
    constructor() {
        this.init();
    }

    init() {
        this.trackPageViews();
        this.trackClicks();
    }

    trackPageViews() {
        console.log('Página vista:', window.location.pathname);
    }

    trackClicks() {
        const importantLinks = document.querySelectorAll('.social-circle-btn, .project-card, .navbar-hero-link');
        
        importantLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const label = e.currentTarget.getAttribute('aria-label') || 
                             e.currentTarget.textContent.trim();
                console.log('Click en:', label);
            });
        });
    }
}

class App {
    constructor() {
        this.init();
    }

    init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.start());
        } else {
            this.start();
        }
    }

    start() {
        console.log('🚀 Portfolio inicializado');

        new UserPreferences();
        new HeroNavbar();
        new ScrollReveal();
        new LazyLoader();
        new ProjectImages();
        new ProfileImageHandler();
        new HeroInlineButton();
        this.setupEasterEgg();
    }

    setupEasterEgg() {
        const styles = [
            'font-size: 16px',
            'font-weight: bold',
            'background: linear-gradient(135deg, #8B5CF6 0%, #3B82F6 100%)',
            'color: white',
            'padding: 10px 20px',
            'border-radius: 8px'
        ].join(';');

        console.log('%c🎨 Portfolio con diseño premium ', styles);
        console.log('%c¿Te gusta? ¡Hablemos! 💼', 'font-size: 14px; color: #8B5CF6;');
    }
}

new App();

function openErgonominadorModal(event) {
    event.preventDefault();
    const modal = document.getElementById('ergonominadorModal');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeErgonominadorModal() {
    const modal = document.getElementById('ergonominadorModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

window.onclick = function(event) {
    const modal = document.getElementById('ergonominadorModal');
    if (event.target === modal) {
        closeErgonominadorModal();
    }
}

document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        const modal = document.getElementById('ergonominadorModal');
        if (modal.classList.contains('active')) {
            closeErgonominadorModal();
        }
    }
});
