// VA Portfolio - Modern Interactivity & Advanced Animations

// ===== SCROLL-TRIGGERED ANIMATIONS =====
const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('scroll-show');
            scrollObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

// ===== STAGGER CHILDREN OBSERVER =====
const staggerObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
            staggerObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

// ===== COUNTER ANIMATION =====
function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-count'), 10);
    const suffix = el.getAttribute('data-suffix') || '';
    const duration = 2000;
    const start = performance.now();
    const update = (now) => {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.floor(target * ease) + suffix;
        if (progress < 1) requestAnimationFrame(update);
    };
    requestAnimationFrame(update);
}

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounter(entry.target);
            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

// ===== TILT CARD EFFECT =====
function addTiltEffect(card) {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -8;
        const rotateY = ((x - centerX) / centerX) * 8;
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
}

// ===== RIPPLE EFFECT ON BUTTONS =====
function addRipple(e) {
    const btn = e.currentTarget;
    const ripple = document.createElement('span');
    ripple.className = 'ripple-effect';
    const rect = btn.getBoundingClientRect();
    ripple.style.left = (e.clientX - rect.left) + 'px';
    ripple.style.top = (e.clientY - rect.top) + 'px';
    btn.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
}

// ===== PARALLAX ON HERO =====
function initParallax() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroContent = hero.querySelector('.hero-content');
        if (heroContent && scrolled < hero.offsetHeight) {
            heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
            heroContent.style.opacity = 1 - (scrolled / hero.offsetHeight) * 0.6;
        }
        // Move particles at different speeds
        hero.querySelectorAll('.particle').forEach((p, i) => {
            const speed = 0.1 + (i * 0.05);
            p.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// ===== NAVBAR SHRINK ON SCROLL =====
function initNavShrink() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    window.addEventListener('scroll', () => {
        if (window.scrollY > 80) {
            navbar.style.padding = '0.6rem 0';
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.12)';
        } else {
            navbar.style.padding = '1.2rem 0';
            navbar.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.08)';
        }
    });
}

// ===== TYPING EFFECT =====
function typeText(element, text, speed = 60) {
    element.textContent = '';
    let i = 0;
    element.style.borderRight = '2px solid white';
    const type = () => {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else {
            // Blink cursor then remove
            setTimeout(() => { element.style.borderRight = 'none'; }, 2000);
        }
    };
    type();
}

// ===== INITIALIZE EVERYTHING =====
document.addEventListener('DOMContentLoaded', () => {
    // Scroll-triggered elements: section headings
    const sections = document.querySelectorAll('.intro-section, .features-section, .services-detail-section, section');
    sections.forEach(section => {
        const heading = section.querySelector('h2');
        if (heading && !heading.classList.contains('scroll-hidden') && !heading.closest('.hero')) {
            heading.classList.add('scroll-hidden', 'from-bottom');
            scrollObserver.observe(heading);
        }
    });

    // Animate detail-cards and detail-intros
    document.querySelectorAll('.detail-card').forEach(card => {
        card.classList.add('scroll-hidden', 'from-bottom');
        scrollObserver.observe(card);
    });

    // Animate intro section paragraphs
    document.querySelectorAll('.intro-section p').forEach((p, i) => {
        p.classList.add('scroll-hidden', 'from-bottom');
        p.style.transitionDelay = `${i * 0.15}s`;
        scrollObserver.observe(p);
    });

    // Animate h3 headings inside detail-cards
    document.querySelectorAll('.detail-card h3').forEach(h3 => {
        h3.classList.add('scroll-hidden', 'from-left');
        scrollObserver.observe(h3);
    });

    // Animate service items alternating left/right
    document.querySelectorAll('.service-item').forEach((item, i) => {
        item.classList.add('scroll-hidden', i % 2 === 0 ? 'from-left' : 'from-right');
        item.style.transitionDelay = `${i * 0.08}s`;
        scrollObserver.observe(item);
    });

    // Animate benefit items from bottom
    document.querySelectorAll('.benefit-item').forEach((item, i) => {
        item.classList.add('scroll-hidden', 'from-bottom');
        item.style.transitionDelay = `${i * 0.1}s`;
        scrollObserver.observe(item);
    });

    // Feature cards with scale
    document.querySelectorAll('.feature-card').forEach((card, i) => {
        card.classList.add('scroll-hidden', 'from-scale');
        card.style.transitionDelay = `${i * 0.15}s`;
        scrollObserver.observe(card);
    });

    // Testimonials stagger
    document.querySelectorAll('.service').forEach((card, i) => {
        card.classList.add('scroll-hidden', 'from-bottom');
        card.style.transitionDelay = `${i * 0.1}s`;
        scrollObserver.observe(card);
    });

    // Contact cards with rotate entrance
    document.querySelectorAll('.contact-card').forEach((card, i) => {
        card.classList.add('scroll-hidden', 'from-scale');
        card.style.transitionDelay = `${i * 0.15}s`;
        scrollObserver.observe(card);
    });

    // Work showcase cards
    document.querySelectorAll('.showcase-card').forEach((card, i) => {
        card.classList.add('scroll-hidden', i === 0 ? 'from-left' : 'from-right');
        card.style.transitionDelay = `${i * 0.2}s`;
        scrollObserver.observe(card);
    });

    // Work showcase subtitle
    const showcaseP = document.querySelector('.work-showcase-section p');
    if (showcaseP) {
        showcaseP.classList.add('scroll-hidden', 'from-bottom');
        scrollObserver.observe(showcaseP);
    }

    // Tool cards - stagger parent
    const toolGrids = document.querySelectorAll('.tool-card');
    toolGrids.forEach((card, i) => {
        card.classList.add('scroll-hidden', 'from-bottom');
        card.style.transitionDelay = `${i * 0.04}s`;
        scrollObserver.observe(card);
    });

    // Tilt effect on feature cards
    document.querySelectorAll('.feature-card').forEach(addTiltEffect);

    // Ripple on CTA buttons
    document.querySelectorAll('.cta-button, .contact-link, [href^="mailto:"], [href^="tel:"]').forEach(btn => {
        btn.classList.add('ripple-btn');
        btn.addEventListener('click', addRipple);
    });

    // Counter animation for any data-count elements
    document.querySelectorAll('[data-count]').forEach(el => counterObserver.observe(el));

    // Typing effect for hero subtitle — wait for slideInUp to finish first
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroSubtitle) {
        const text = heroSubtitle.textContent;
        // slideInUp is 0.8s with 0.4s delay = 1.2s total
        setTimeout(() => typeText(heroSubtitle, text, 45), 1400);
    }

    // Init parallax and nav shrink
    initParallax();
    initNavShrink();

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // ===== CURSOR GLOW FOLLOWER =====
    const cursorGlow = document.getElementById('cursorGlow');
    if (cursorGlow && window.innerWidth > 768) {
        let mouseX = 0, mouseY = 0;
        let glowX = 0, glowY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            cursorGlow.classList.add('active');
        });

        document.addEventListener('mouseleave', () => {
            cursorGlow.classList.remove('active');
        });

        // Smooth follow with lerp
        function updateGlow() {
            glowX += (mouseX - glowX) * 0.08;
            glowY += (mouseY - glowY) * 0.08;
            cursorGlow.style.left = glowX + 'px';
            cursorGlow.style.top = glowY + 'px';
            requestAnimationFrame(updateGlow);
        }
        updateGlow();
    }

    // ===== SCROLL PROGRESS BAR =====
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.prepend(progressBar);
    window.addEventListener('scroll', () => {
        const scrollTop = document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const progress = (scrollTop / scrollHeight) * 100;
        progressBar.style.width = progress + '%';
    });

    document.documentElement.style.scrollBehavior = 'smooth';
});

window.addEventListener('load', () => {
    document.body.style.animation = 'fadeInUp 0.6s ease';
});