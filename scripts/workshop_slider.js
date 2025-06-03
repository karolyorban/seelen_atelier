document.addEventListener('DOMContentLoaded', function() {
    const testimonials = document.querySelectorAll('.testimonial');
    const dots = document.querySelectorAll('.dot');
    const prevArrow = document.querySelector('.prev-arrow');
    const nextArrow = document.querySelector('.next-arrow');
    const testimonialContainer = document.querySelector('.testimonials-container'); // Add this container element in your HTML
    let currentIndex = 0;
    let intervalId;
    let touchStartX = 0;
    let touchEndX = 0;
    
    function showTestimonial(index) {
        testimonials.forEach(testimonial => testimonial.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        testimonials[index].classList.add('active');
        dots[index].classList.add('active');
        currentIndex = index;
    }
    
    function nextTestimonial() {
        let newIndex = (currentIndex + 1) % testimonials.length;
        showTestimonial(newIndex);
    }
    
    function prevTestimonial() {
        let newIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
        showTestimonial(newIndex);
    }
    
    function startAutoSlide() {
        intervalId = setInterval(nextTestimonial, 5000);
    }
    
    function resetAutoSlide() {
        clearInterval(intervalId);
        startAutoSlide();
    }
    
    // Touch event handlers for swipe detection
    function handleTouchStart(e) {
        touchStartX = e.changedTouches[0].screenX;
    }
    
    function handleTouchEnd(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }
    
    function handleSwipe() {
        const minSwipeDistance = 50; // Minimum distance to consider it a swipe
        
        if (touchStartX - touchEndX > minSwipeDistance) {
            // Swipe left - go to next
            nextTestimonial();
            resetAutoSlide();
        } else if (touchEndX - touchStartX > minSwipeDistance) {
            // Swipe right - go to previous
            prevTestimonial();
            resetAutoSlide();
        }
    }
    
    // Event listeners
    nextArrow.addEventListener('click', () => {
        nextTestimonial();
        resetAutoSlide();
    });
    
    prevArrow.addEventListener('click', () => {
        prevTestimonial();
        resetAutoSlide();
    });
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showTestimonial(index);
            resetAutoSlide();
        });
    });
    
    // Add touch event listeners
    if (testimonialContainer) {
        testimonialContainer.addEventListener('touchstart', handleTouchStart, { passive: true });
        testimonialContainer.addEventListener('touchend', handleTouchEnd, { passive: true });
    }
    
    // Start auto sliding
    startAutoSlide();
});