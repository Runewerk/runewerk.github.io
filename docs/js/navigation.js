function loadContentForPath() {
    const path = window.location.pathname.split('/').pop();
    let contentFile = ""
    if (path === "about" ) {
        contentFile = "about.html";
    } else if (path === "contact") {
        contentFile = "contact.html";
    } else if (path === "services") {
        contentFile = "services.html";
    } else if (path === 'welcome'){
        contentFile = 'welcome.html';
    }
    
    htmx.ajax('GET', contentFile, { target: '#content' });
}

document.addEventListener('DOMContentLoaded', loadContentForPath);
window.addEventListener('popstate', loadContentForPath);

