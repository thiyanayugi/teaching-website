// iOS-style Liquid Glass Animation
document.addEventListener('DOMContentLoaded', function() {
    // Create liquid glass blobs
    const hero = document.querySelector('.hero');
    if (!hero) return;

    // Create multiple liquid blobs
    for (let i = 0; i < 5; i++) {
        const blob = document.createElement('div');
        blob.className = 'liquid-blob';
        blob.style.left = `${Math.random() * 100}%`;
        blob.style.top = `${Math.random() * 100}%`;
        blob.style.animationDelay = `${Math.random() * 5}s`;
        blob.style.animationDuration = `${15 + Math.random() * 10}s`;
        hero.appendChild(blob);
    }

    // Mouse move effect for liquid glass cards
    const cards = document.querySelectorAll('.service-card, .competency-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-15px) scale(1.02)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });

    // Liquid glass effect on About Me button
    const aboutToggle = document.querySelector('.about-header');
    if (aboutToggle) {
        aboutToggle.addEventListener('mousemove', (e) => {
            const rect = aboutToggle.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            aboutToggle.style.setProperty('--mouse-x', `${x}px`);
            aboutToggle.style.setProperty('--mouse-y', `${y}px`);
        });
    }

    // Smooth scroll reveal animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for scroll animations
    document.querySelectorAll('.service-card, .competency-card, .about-container').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
        observer.observe(el);
    });
});
