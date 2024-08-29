const slides = document.querySelectorAll('.slide');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
const dots = document.querySelectorAll('.dot');

let currentIndex = 0;
let interval;
const slideInterval = 4000;

// Function to update the slider display
const updateSlider = () => {
    slides.forEach((slide, index) => {
        slide.classList.remove('active');
        if (index === currentIndex) {
            slide.classList.add('active');
        }
    });

    dots.forEach((dot, index) => {
        dot.classList.remove('active');
        if (index === currentIndex) {
            dot.classList.add('active');
        }
    });
};

// Go to next slide
const nextSlide = () => {
    currentIndex = (currentIndex + 1) % slides.length;
    updateSlider();
};

// Go to previous slide
const prevSlide = () => {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateSlider();
};

// Set automatic transition
const startAutoSlide = () => {
    interval = setInterval(nextSlide, slideInterval);
};

// Pause automatic transition
const stopAutoSlide = () => {
    clearInterval(interval);
};

// Event listeners for navigation buttons
nextBtn.addEventListener('click', nextSlide);
prevBtn.addEventListener('click', prevSlide);

// Event listeners for pagination dots
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentIndex = index;
        updateSlider();
    });
});

// Pause slider on hover
document.querySelector('.slider').addEventListener('mouseover', stopAutoSlide);
document.querySelector('.slider').addEventListener('mouseout', startAutoSlide);

// Swipe functionality for mobile
let touchStartX = 0;

document.querySelector('.slider').addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

document.querySelector('.slider').addEventListener('touchend', (e) => {
    const touchEndX = e.changedTouches[0].screenX;
    if (touchEndX < touchStartX) {
        nextSlide();
    } else if (touchEndX > touchStartX) {
        prevSlide();
    }
});

// Initialize
updateSlider();
startAutoSlide();
