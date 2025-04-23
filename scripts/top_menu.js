document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    const contentSections = document.querySelectorAll('.content-section');
  
    navLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
  
        // Hide ALL sections (including home)
        contentSections.forEach(section => {
          section.classList.remove('active');
          section.style.display = 'none'; // Force hide (overrides default #home)
        });
  
        // Show ONLY the clicked section
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
          targetSection.classList.add('active');
          targetSection.style.display = 'block'; // Force show
        }
      });
    });
  });