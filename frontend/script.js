// =====================================
// FUTURISTIC INTERACTIVE JS
// Core Logic: Neural Network + Magnetism + Typewriter + Parallax
// =====================================

// ===== GLOBAL CONFIG =====
const config = {
    colors: {
        cyan: '#00F0FF',
        purple: '#A855F7',
        bg: '#0A0E27'
    },
    reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches
};

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
    if (config.reducedMotion) return;

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
if (!config.reducedMotion) animateCursor();

// Cursor hover effect
const interactiveElements = document.querySelectorAll('a, button, .feature-card, .expertise-card, .cert-card, .course-card, input, select, textarea');
interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
});

// ===== NEURAL NETWORK BACKGROUND =====
const canvas = document.getElementById('neural-network');
const ctx = canvas.getContext('2d');
let particlesArray;

// Resize handling
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', () => {
    resizeCanvas();
    initNeuralNetwork();
});
resizeCanvas();

class Particle {
    constructor(x, y, directionX, directionY, size, color) {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.shadowBlur = 10;
        ctx.shadowColor = this.color;
        ctx.fill();
        ctx.shadowBlur = 0;
    }

    update() {
        // Boundary check
        if (this.x > canvas.width || this.x < 0) this.directionX = -this.directionX;
        if (this.y > canvas.height || this.y < 0) this.directionY = -this.directionY;

        // Mouse Interaction (Repulsion)
        let dx = mouseX - this.x;
        let dy = mouseY - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 120 && !config.reducedMotion) {
            const angle = Math.atan2(dy, dx);
            const force = (120 - distance) / 120;
            const repulsion = force * 3;
            this.x -= Math.cos(angle) * repulsion;
            this.y -= Math.sin(angle) * repulsion;
        }

        this.x += this.directionX;
        this.y += this.directionY;
        this.draw();
    }
}

function initNeuralNetwork() {
    particlesArray = [];
    const numberOfParticles = (canvas.height * canvas.width) / 15000; // Density

    for (let i = 0; i < numberOfParticles; i++) {
        let size = (Math.random() * 2) + 0.5;
        let x = (Math.random() * (innerWidth - size * 2) + size * 2);
        let y = (Math.random() * (innerHeight - size * 2) + size * 2);
        let directionX = (Math.random() * 0.4) - 0.2;
        let directionY = (Math.random() * 0.4) - 0.2;
        let color = Math.random() > 0.5 ? config.colors.cyan : config.colors.purple;

        particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
    }
}

function connectParticles() {
    let opacityValue = 1;
    for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
            let distance = ((particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x)) +
                ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y));

            if (distance < (canvas.width / 9) * (canvas.height / 9)) {
                opacityValue = 1 - (distance / 25000);
                if (opacityValue > 0) {
                    ctx.strokeStyle = `rgba(0, 240, 255, ${opacityValue * 0.2})`;
                    ctx.lineWidth = 0.5;
                    ctx.beginPath();
                    ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                    ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                    ctx.stroke();
                }
            }
        }
    }
}

function animateNeuralNetwork() {
    if (config.reducedMotion) return;
    requestAnimationFrame(animateNeuralNetwork);
    ctx.clearRect(0, 0, innerWidth, innerHeight);

    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
    }
    connectParticles();
}

// ===== MAGNETIC BUTTONS =====
function initMagneticButtons() {
    if (config.reducedMotion) return;

    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');

    buttons.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0px, 0px)';
        });
    });
}

// ===== TYPEWRITER EFFECT =====
function typeWriterEffect() {
    const heroH1 = document.querySelector('.hero-text h1');
    if (!heroH1 || config.reducedMotion) return;

    const text = heroH1.textContent;
    heroH1.textContent = '';
    heroH1.style.opacity = '1'; // Ensure visible

    let i = 0;
    const speed = 50; // ms per char

    function type() {
        if (i < text.length) {
            heroH1.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else {
            // Remove cursor blink effect if we added a CSS class for it
            heroH1.classList.add('typing-done');
        }
    }

    // Initial delay
    setTimeout(type, 500);
}

// ===== SCROLL PROGRESS =====
function initScrollProgress() {
    const progressBar = document.getElementById('scroll-progress');

    window.addEventListener('scroll', () => {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (scrollTop / scrollHeight) * 100;

        progressBar.style.width = scrolled + '%';
    });
}

// ===== PARALLAX SCROLLING =====
window.addEventListener('scroll', () => {
    if (config.reducedMotion) return;

    const scrollY = window.pageYOffset;

    // Hero Text
    const hero = document.querySelector('.hero-content');
    if (hero) hero.style.transform = `translateY(${scrollY * 0.4}px)`;

    // Hero Image
    const heroImage = document.querySelector('.hero-image');
    if (heroImage) heroImage.style.transform = `translateY(${scrollY * 0.2}px)`;
});

// ===== 3D CARD TILT =====
function init3DTilt() {
    if (config.reducedMotion) return;

    const cards = document.querySelectorAll('.feature-card, .expertise-card, .course-card, .cert-card');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            // Limit rotation to small angles
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
}

// ===== SCROLL REVEAL =====
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            // Add a small staggered delay based on index logic if possible, 
            // but for simplicity here we just trigger it.
            // Using a data attribute or just letting CSS transition handle it is smoother.
            entry.target.classList.add('active');
            revealObserver.unobserve(entry.target); // Reveal once
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

// ===== FORM HANDLING =====
document.getElementById('contact-form')?.addEventListener('submit', async function (e) {
    e.preventDefault();
    const btn = this.querySelector('.btn-submit');
    const originalText = btn.innerText;

    btn.innerHTML = '<span>Processing...</span>';
    btn.disabled = true;

    // Simplify: Just simulate success for this demo
    setTimeout(() => {
        document.getElementById('success-modal').classList.add('active');
        this.reset();
        btn.innerHTML = originalText;
        btn.disabled = false;
    }, 1500);
});

// Modal Logic
function closeModal() {
    document.getElementById('success-modal').classList.remove('active');
}
document.getElementById('success-modal')?.addEventListener('click', (e) => {
    if (e.target.id === 'success-modal') closeModal();
});
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
});

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
    // Neural Network
    initNeuralNetwork();
    animateNeuralNetwork();

    // Magnetism
    initMagneticButtons();

    // Typewriter
    typeWriterEffect();

    // Scroll Progress
    initScrollProgress();

    // 3D Tilt
    init3DTilt();

    // Scroll Reveal
    document.querySelectorAll('.features, .expertise, .certifications, .courses, .contact, .feature-card, .expertise-card, .cert-card, .course-card')
        .forEach(el => {
            el.classList.add('scroll-reveal');
            revealObserver.observe(el);
        });

    // Smooth Scroll for Anchors
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});

