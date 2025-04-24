document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    const contentSections = document.querySelectorAll('.content-section');
    let isPopState = false; // Flag to track back/forward navigation

    // Initialize history on first load
    if (!history.state) {
        const initialSection = window.location.hash.substring(1) || 'workshops';
        history.replaceState({ section: initialSection }, '', `#${initialSection}`);
    }

    // Function to show a section
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
            
            // Update history if this is a user action (not back/forward)
            if (addToHistory && !isPopState) {
                history.pushState({ section: targetId }, '', `#${targetId}`);
            }
        }
    }

    // Handle link clicks
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            showSection(targetId);
        });
    });

    // Handle back/forward navigation
    window.addEventListener('popstate', function(e) {
        isPopState = true;
        const targetId = e.state?.section || 'workshops';
        showSection(targetId, false);
        isPopState = false;
    });

    // Initial load
    showSection(history.state?.section || 'workshops', false);
});