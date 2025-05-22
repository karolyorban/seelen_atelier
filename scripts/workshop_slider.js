document.addEventListener('DOMContentLoaded', function() {
    const testimonials = document.querySelectorAll('.testimonial');
    const dots = document.querySelectorAll('.dot');
    const prevArrow = document.querySelector('.prev-arrow');
    const nextArrow = document.querySelector('.next-arrow');
    let currentIndex = 0;
    let intervalId;
    
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
    
    // Start auto sliding
    startAutoSlide();
});