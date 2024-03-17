// Function to dynamically load content based on URL path
function loadContentForPath() {
    const path = window.location.pathname.split('/').pop(); // Gets the last part of the path
    let contentFile = "welcome.html"; // Default content

    if (path === "about") {
        contentFile = "about.html";
    } else if (path === "contact") {
        contentFile = "contact.html";
    } else if (path === "services") {
        contentFile = "services.html";
    } // Add more conditions for other pages as needed

    htmx.ajax('GET', `docs/${contentFile}`, { target: '#content' });
}

// Load content for the current path when the page loads
document.addEventListener('DOMContentLoaded', loadContentForPath);

// Load content for the current path when the history changes
window.addEventListener('popstate', loadContentForPath);
