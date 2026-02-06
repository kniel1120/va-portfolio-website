// VA Portfolio - Modern Interactivity & Advanced Animations

const createObserver = () => {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    return observer;
};

document.addEventListener('DOMContentLoaded', () => {
    const observer = createObserver();
    const elementsToAnimate = document.querySelectorAll('.feature-card, .service');
    elementsToAnimate.forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });

    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    const contactForm = document.querySelector('#contact-form');
    if (contactForm) {
        const inputs = contactForm.querySelectorAll('input, textarea');
        
        inputs.forEach((input, index) => {
            input.style.animationDelay = `${index * 0.1}s`;
            input.addEventListener('focus', function() {
                this.style.borderColor = '#667eea';
                this.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
                this.style.transform = 'scale(1.01)';
            });
            input.addEventListener('blur', function() {
                this.style.borderColor = '#e0e0e0';
                this.style.boxShadow = 'none';
                this.style.transform = 'scale(1)';
            });
        });
        
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = contactForm.querySelector('#name').value.trim();
            const email = contactForm.querySelector('#email').value.trim();
            const message = contactForm.querySelector('#message').value.trim();
            
            if (name && email && message) {
                const button = contactForm.querySelector('button');
                const originalText = button.textContent;
                const originalBg = button.style.background;
                
                button.textContent = '✓ Message Sent Successfully!';
                button.style.background = 'linear-gradient(135deg, #4caf50 0%, #45a049 100%)';
                button.disabled = true;
                button.style.pointerEvents = 'none';
                
                contactForm.reset();
                inputs.forEach(input => {
                    input.style.animation = 'fadeInUp 0.3s ease';
                });
                
                setTimeout(() => {
                    button.textContent = originalText;
                    button.style.background = originalBg;
                    button.disabled = false;
                    button.style.pointerEvents = 'auto';
                }, 4000);
            } else {
                alert('Please fill in all fields');
            }
        });
    }

    document.documentElement.style.scrollBehavior = 'smooth';
});

window.addEventListener('load', () => {
    document.body.style.animation = 'fadeInUp 0.6s ease';
});