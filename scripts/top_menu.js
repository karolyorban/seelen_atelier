document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    const contentSections = document.querySelectorAll('.content-section');
    let isPopState = false;

    // Initialize history on first load
    if (!history.state) {
        const initialSection = window.location.hash.substring(1) || 'workshops_section';
        history.replaceState({ section: initialSection }, '', `#${initialSection}`);
    }

    function showSection(targetId, addToHistory = true) {
        // Hide all sections
        contentSections.forEach(section => {
            section.classList.remove('active');
            section.style.display = 'none';
        });

        // Show the target section
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            targetSection.classList.add('active');
            targetSection.style.display = 'flex';
            
            // Scroll to section, accounting for header height
            const headerHeight = document.querySelector('header').offsetHeight;
            window.scrollTo({
                top: targetSection.offsetTop - headerHeight,
                behavior: 'auto' // 'smooth' if you prefer
            });
            
            if (addToHistory && !isPopState) {
                history.pushState({ section: targetId }, '', `#${targetId}`);
            }
        }
    }

    // Initial load handling
    function handleInitialLoad() {
        const targetId = history.state?.section || 'workshops_section';
        showSection(targetId, false);
        
        // Force scroll to top if no hash in URL
        if (!window.location.hash) {
            window.scrollTo(0, 0);
        }
    }

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            showSection(targetId);
        });
    });

    window.addEventListener('popstate', function(e) {
        isPopState = true;
        const targetId = e.state?.section || 'workshops_section';
        showSection(targetId, false);
        isPopState = false;
    });

    // Use setTimeout to ensure DOM is fully ready
    setTimeout(handleInitialLoad, 0);
});