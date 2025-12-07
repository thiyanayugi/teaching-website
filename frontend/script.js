document.getElementById('contact-form').addEventListener('submit', async function (e) {
    e.preventDefault();

    const form = e.target;
    const loadingOverlay = document.getElementById('loading-overlay');
    const successModal = document.getElementById('success-modal');

    // Show loading overlay
    loadingOverlay.classList.add('active');

    // Detect language automatically
    function detectLanguage() {
        // Check current page language from language-switcher
        const currentLang = document.documentElement.lang || 'en';
        if (currentLang === 'de') return 'de';
        
        // Check for German text in form fields
        const textFields = [
            form.interest.value,
            form.goal.value,
            form.background.value
        ].join(' ');
        
        // Simple German detection: common German words
        const germanWords = /\b(ich|und|der|die|das|ist|sind|haben|sein|mit|für|auf|von|zu|im|am|ein|eine|einen|einem|mein|dein|sein|ihr|unser|möchte|würde|können|müssen|sollen|wollen)\b/i;
        
        if (germanWords.test(textFields)) {
            return 'de';
        }
        
        return 'en';
    }

    const detectedLanguage = detectLanguage();

    // Collect form data
    const formData = {
        name: form.name.value,
        email: form.email.value,
        topic: form.topic.value,
        language: detectedLanguage,
        background: form.background.value,
        experience: form.experience.value,
        interest: form.interest.value,
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
            // Hide loading
            loadingOverlay.classList.remove('active');
            
            // Show success modal with confetti
            successModal.classList.add('active');
            launchConfetti();
            
            // Reset form
            form.reset();
        } else {
            throw new Error(result.message || 'Something went wrong');
        }
    } catch (error) {
        // Hide loading
        loadingOverlay.classList.remove('active');
        
        // Show error to user
        alert('Error: ' + (error.message || 'Something went wrong. Please try again.'));
        console.error('Error:', error);
    }
});

// FAQ Accordion Functionality
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const faqItem = question.parentElement;
        const isActive = faqItem.classList.contains('active');
        
        // Close all FAQ items
        document.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove('active');
        });
        
        // Open clicked item if it wasn't active
        if (!isActive) {
            faqItem.classList.add('active');
        }
    });
});

// Close Success Modal
function closeSuccessModal() {
    document.getElementById('success-modal').classList.remove('active');
}

// Confetti Animation
function launchConfetti() {
    const canvas = document.getElementById('confetti-canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const confettiPieces = [];
    const colors = ['#3b82f6', '#60a5fa', '#a78bfa', '#f472b6', '#fbbf24', '#34d399'];
    
    // Create confetti pieces
    for (let i = 0; i < 150; i++) {
        confettiPieces.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height - canvas.height,
            w: Math.random() * 10 + 5,
            h: Math.random() * 10 + 5,
            color: colors[Math.floor(Math.random() * colors.length)],
            rotation: Math.random() * 360,
            rotationSpeed: Math.random() * 10 - 5,
            velocityX: Math.random() * 4 - 2,
            velocityY: Math.random() * 3 + 2,
            gravity: 0.1
        });
    }
    
    function drawConfetti() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        confettiPieces.forEach((piece, index) => {
            ctx.save();
            ctx.translate(piece.x, piece.y);
            ctx.rotate(piece.rotation * Math.PI / 180);
            ctx.fillStyle = piece.color;
            ctx.fillRect(-piece.w / 2, -piece.h / 2, piece.w, piece.h);
            ctx.restore();
            
            // Update position
            piece.x += piece.velocityX;
            piece.y += piece.velocityY;
            piece.velocityY += piece.gravity;
            piece.rotation += piece.rotationSpeed;
            
            // Remove if off screen
            if (piece.y > canvas.height) {
                confettiPieces.splice(index, 1);
            }
        });
        
        if (confettiPieces.length > 0) {
            requestAnimationFrame(drawConfetti);
        }
    }
    
    drawConfetti();
}

// Handle window resize for confetti canvas
window.addEventListener('resize', () => {
    const canvas = document.getElementById('confetti-canvas');
    if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
});

// Smooth scrolling for anchor links
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

// Toggle About Me section
function toggleAbout() {
    const content = document.getElementById('about-content');
    const toggle = document.getElementById('about-toggle');
    const header = document.querySelector('.about-header');
    
    content.classList.toggle('expanded');
    toggle.classList.toggle('rotated');
    header.classList.toggle('expanded');
}

// Toggle What I Teach section
function toggleServices() {
    const content = document.getElementById('services-content');
    const toggle = document.getElementById('services-toggle');
    const header = document.querySelector('.services-header');
    
    content.classList.toggle('expanded');
    toggle.classList.toggle('rotated');
    header.classList.toggle('expanded');
}
