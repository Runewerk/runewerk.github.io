// Function to set the dark mode preference
function setDarkModePreference(isDarkMode) {
    const html = document.documentElement;
    if (isDarkMode) {
        html.classList.add('dark');
    } else {
        html.classList.remove('dark');
    }
    localStorage.setItem('darkMode', isDarkMode);
    toggleDarkModeIcon();
}

// Function to toggle the dark mode
function toggleDarkMode() {
    const isDarkMode = document.documentElement.classList.toggle('dark');
    setDarkModePreference(isDarkMode);
}

// Function to toggle the dark mode icon
function toggleDarkModeIcon() {
    const toggleDarkModeButton = document.getElementById('toggleDarkMode');
    const icon = toggleDarkModeButton.querySelector('svg');
    const iconPath = icon.querySelector('path');

    if (document.documentElement.classList.contains('dark')) {
        // Switch to light mode icon
        iconPath.setAttribute('d', 'M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z');
    } else {
        // Switch to dark mode icon
        iconPath.setAttribute('d', 'M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z');
    }
}

// Check if the dark mode preference is already stored in local storage
document.addEventListener('DOMContentLoaded', function() {
    const darkModePref = localStorage.getItem('darkMode');
    setDarkModePreference(darkModePref === 'true');

    const toggleDarkModeButton = document.getElementById('toggleDarkMode');
    toggleDarkModeButton.addEventListener('click', toggleDarkMode);
});