// Store scroll position before leaving a section
let scrollPositions = {};

function showSection(targetId) {
    // Save current scroll position
    scrollPositions[currentSection] = window.scrollY;

    // ... (rest of showSection logic)

    // Restore scroll position if returning to a section
    if (scrollPositions[targetId]) {
        window.scrollTo(0, scrollPositions[targetId]);
    } else {
        window.scrollTo(0, 0);
    }
}