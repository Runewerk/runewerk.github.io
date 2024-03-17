function loadContentForPath() {
    // Adjust the condition to better handle the root path
    const path = window.location.pathname.split('/').pop(); // Gets the last part of the path
    let contentFile = "welcome.html"; // Assume root path needs welcome.html

    if (path === "about") {
        contentFile = "about.html";
    } else if (path === "contact") {
        contentFile = "contact.html";
    } else if (path === "services") {
        contentFile = "services.html";
    }
    // No need to change contentFile for root, as it defaults to "welcome.html"

    htmx.ajax('GET', `docs/${contentFile}`, { target: '#content' });
}

document.addEventListener('DOMContentLoaded', loadContentForPath);
window.addEventListener('popstate', loadContentForPath);

