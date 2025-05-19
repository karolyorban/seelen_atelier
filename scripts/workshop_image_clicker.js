function setupWorkshopImages() {
    const workshopImages = document.querySelectorAll('.workshop_image img');
    let currentlyZoomed = null; // Track which image is zoomed

    workshopImages.forEach((image) => {
        image.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent event from reaching document

            // If another image is already zoomed, shrink it first
            if (currentlyZoomed && currentlyZoomed !== this) {
                currentlyZoomed.classList.remove('clicked');
            }

            // Toggle zoom on the clicked image
            this.classList.toggle('clicked');
            currentlyZoomed = this.classList.contains('clicked') ? this : null;
        });
    });

    // Clicking anywhere outside shrinks the zoomed image
    document.addEventListener('click', () => {
        if (currentlyZoomed) {
            currentlyZoomed.classList.remove('clicked');
            currentlyZoomed = null;
        }
    });
}

document.addEventListener('DOMContentLoaded', setupWorkshopImages);