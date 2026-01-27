// =====================================
// FUTURISTIC INTERACTIVE JS
// Custom Cursor + Parallax + 3D Tilt + Scroll Reveals
// =====================================

// ===== CUSTOM CURSOR =====
const cursor = document.createElement('div');
cursor.id = 'custom-cursor';
document.body.appendChild(cursor);

const cursorDot = document.createElement('div');
cursorDot.id = 'custom-cursor-dot';
document.body.appendChild(cursorDot);

let mouseX = 0, mouseY = 0;
let cursorX = 0, cursorY = 0;
let dotX = 0, dotY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dotX = e.clientX;
    dotY = e.clientY;
});

function animateCursor() {
    // Smooth following for ring
    cursorX += (mouseX - cursorX) * 0.15;
    cursorY += (mouseY - cursorY) * 0.15;

    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';

    // Instant for dot
    cursorDot.style.left = dotX + 'px';
    cursorDot.style.top = dotY + 'px';

    requestAnimationFrame(animateCursor);
}
animateCursor();

// Cursor hover effect on interactive elements
const interactiveElements = document.querySelectorAll('a, button, .feature-card, .expertise-card, .cert-card, .course-card, input, select, textarea');
interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        document.body.classList.add('cursor-hover');
    });
    el.addEventListener('mouseleave', () => {
        document.body.classList.remove('cursor-hover');
    });
});

// ===== PARALLAX SCROLLING =====
let scrollY = 0;

window.addEventListener('scroll', () => {
    scrollY = window.pageYOffset;

    // Hero parallax
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${scrollY * 0.5}px)`;
    }

    // Image parallax
    const heroImage = document.querySelector('.hero-image');
    if (heroImage) {
        heroImage.style.transform = `translateY(${scrollY * -0.3}px)`;
    }
});

// ===== 3D CARD TILT (Lightweight vanilla implementation) =====
function init3DTilt() {
    const cards = document.querySelectorAll('.feature-card, .expertise-card, .course-card, .cert-card');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px) scale(1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
}

// ===== SCROLL REVEAL ANIMATIONS =====
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
};

const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            // Stagger animation
            setTimeout(() => {
                entry.target.classList.add('active');
            }, index * 100);
        }
    });
}, observerOptions);

// ===== FORM SUBMISSION =====
document.getElementById('contact-form').addEventListener('submit', async function (e) {
    e.preventDefault();

    const form = e.target;
    const submitBtn = form.querySelector('.btn-submit');
    const originalHTML = submitBtn.innerHTML;

    // Show loading state
    submitBtn.innerHTML = '<span>SENDING...</span>';
    submitBtn.disabled = true;
    submitBtn.style.opacity = '0.6';

    // Collect form data
    const formData = {
        name: form.name.value,
        email: form.email.value,
        topic: form.topic.value,
        experience: form.experience.value,
        goal: form.goal.value
    };

    try {
        const response = await fetch('/api/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        const result = await response.json();

        if (result.success) {
            // Show success modal
            document.getElementById('success-modal').classList.add('active');

            // Reset form
            form.reset();
        } else {
            throw new Error(result.message || 'Something went wrong');
        }
    } catch (error) {
        alert('Error: ' + (error.message || 'Please try again later'));
        console.error('Error:', error);
    } finally {
        // Reset button
        submitBtn.innerHTML = originalHTML;
        submitBtn.disabled = false;
        submitBtn.style.opacity = '1';
    }
});

// ===== MODAL CONTROLS =====
function closeModal() {
    document.getElementById('success-modal').classList.remove('active');
}

// Close modal on overlay click
document.getElementById('success-modal').addEventListener('click', function (e) {
    if (e.target === this) {
        closeModal();
    }
});

// ===== SMOOTH SCROLLING =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== KEYBOARD ACCESSIBILITY =====
document.addEventListener('keydown', function (e) {
    // ESC to close modal
    if (e.key === 'Escape') {
        const modal = document.getElementById('success-modal');
        if (modal.classList.contains('active')) {
            closeModal();
        }
    }
});

// ===== INITIALIZE ON DOM READY =====
document.addEventListener('DOMContentLoaded', () => {
    // Add scroll-reveal class to all sections and cards
    const revealElements = document.querySelectorAll(
        '.features, .expertise, .certifications, .courses, .contact, ' +
        '.feature-card, .expertise-card, .cert-card, .course-card'
    );

    revealElements.forEach(el => {
        el.classList.add('scroll-reveal');
        scrollObserver.observe(el);
    });

    // Initialize 3D tilt
    init3DTilt();

    // Trigger hero animations
    const heroText = document.querySelector('.hero-text');
    if (heroText) {
        setTimeout(() => {
            heroText.style.opacity = '1';
        }, 100);
    }
});

// ===== PERFORMANCE: Reduce motion for accessibility =====
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (prefersReducedMotion.matches) {
    // Disable parallax and animations
    document.querySelectorAll('*').forEach(el => {
        el.style.animation = 'none';
        el.style.transition = 'none';
    });
}
