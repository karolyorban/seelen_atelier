document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    const contentSections = document.querySelectorAll('.content-section');
    let isPopState = false;

    // Initialize history on first load
    if (!history.state) {
        const initialSection = window.location.hash.substring(1) || 'home_section';
        history.replaceState({ section: initialSection }, '', `#${initialSection}`);
    }

    function showSection(targetId, addToHistory = true) {
        // 1. FIRST, SCROLL TO TOP (before showing new section)
        window.scrollTo({
            top: 0,
            behavior: 'auto'
        });

        // 2. Hide all sections
        contentSections.forEach(section => {
            section.classList.remove('active');
            section.style.display = 'none';
        });

        // 3. Show the target section
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            targetSection.classList.add('active');
            targetSection.style.display = 'flex';

            // 4. Optional: Scroll to section (after top jump)
            const headerHeight = document.querySelector('header').offsetHeight;
            setTimeout(() => {
                window.scrollTo({
                    top: targetSection.offsetTop - headerHeight,
                    behavior: 'auto'
                });
            }, 10);
        }

        // 5. Update history
        if (addToHistory && !isPopState) {
            history.pushState({ section: targetId }, '', `#${targetId}`);
        }
    }

    // Initial load handling
    function handleInitialLoad() {
        const targetId = history.state?.section || 'home_section';
        showSection(targetId, false);
        
        // Force scroll to top if no hash in URL
        if (!window.location.hash) {
            window.scrollTo(0, 0);
        }
    }

    // Navigation link click handlers
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            showSection(targetId);
        });
    });

    // Handle browser back/forward buttons
    window.addEventListener('popstate', function(e) {
        isPopState = true;
        const targetId = e.state?.section || 'home_section';
        showSection(targetId, false);
        isPopState = false;
    });

    // Add scroll detection for header line
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (window.scrollY > 5) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Use setTimeout to ensure DOM is fully ready
    setTimeout(handleInitialLoad, 0);
});