// Competencies Carousel
class CompetenciesCarousel {
    constructor() {
        this.carousel = document.querySelector('.competencies-carousel');
        this.cards = document.querySelectorAll('.competency-card');
        this.prevBtn = document.querySelector('.carousel-prev');
        this.nextBtn = document.querySelector('.carousel-next');
        this.dotsContainer = document.querySelector('.carousel-dots');
        this.currentIndex = 0;
        this.cardsPerView = window.innerWidth >= 768 ? 2 : 1;
        
        if (!this.carousel || this.cards.length === 0) return;
        
        this.init();
    }
    
    init() {
        this.createDots();
        this.attachEventListeners();
        this.updateCarousel();
        
        // Handle window resize
        window.addEventListener('resize', () => {
            const newCardsPerView = window.innerWidth >= 768 ? 2 : 1;
            if (newCardsPerView !== this.cardsPerView) {
                this.cardsPerView = newCardsPerView;
                this.currentIndex = 0;
                this.updateCarousel();
            }
        });
    }
    
    createDots() {
        const totalDots = Math.ceil(this.cards.length / this.cardsPerView);
        this.dotsContainer.innerHTML = '';
        
        for (let i = 0; i < totalDots; i++) {
            const dot = document.createElement('div');
            dot.classList.add('carousel-dot');
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => this.goToSlide(i));
            this.dotsContainer.appendChild(dot);
        }
        
        this.dots = document.querySelectorAll('.carousel-dot');
    }
    
    attachEventListeners() {
        this.prevBtn.addEventListener('click', () => this.prev());
        this.nextBtn.addEventListener('click', () => this.next());
        
        // Touch support for mobile
        let touchStartX = 0;
        let touchEndX = 0;
        
        this.carousel.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });
        
        this.carousel.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            this.handleSwipe();
        });
        
        const handleSwipe = () => {
            if (touchEndX < touchStartX - 50) this.next();
            if (touchEndX > touchStartX + 50) this.prev();
        };
        
        this.handleSwipe = handleSwipe;
    }
    
    updateCarousel() {
        const cardWidth = this.cards[0].offsetWidth;
        const gap = 32; // 2rem gap
        const offset = -(this.currentIndex * (cardWidth + gap) * this.cardsPerView);
        
        this.carousel.style.transform = `translateX(${offset}px)`;
        
        // Update dots
        this.dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentIndex);
        });
        
        // Update button states
        this.prevBtn.style.opacity = this.currentIndex === 0 ? '0.5' : '1';
        this.prevBtn.style.cursor = this.currentIndex === 0 ? 'not-allowed' : 'pointer';
        
        const maxIndex = Math.ceil(this.cards.length / this.cardsPerView) - 1;
        this.nextBtn.style.opacity = this.currentIndex >= maxIndex ? '0.5' : '1';
        this.nextBtn.style.cursor = this.currentIndex >= maxIndex ? 'not-allowed' : 'pointer';
    }
    
    prev() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
            this.updateCarousel();
        }
    }
    
    next() {
        const maxIndex = Math.ceil(this.cards.length / this.cardsPerView) - 1;
        if (this.currentIndex < maxIndex) {
            this.currentIndex++;
            this.updateCarousel();
        }
    }
    
    goToSlide(index) {
        this.currentIndex = index;
        this.updateCarousel();
    }
}

// Initialize carousel when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new CompetenciesCarousel();
});
