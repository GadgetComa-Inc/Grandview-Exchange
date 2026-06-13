/* ============================================================
   GLOBAL NAVIGATION LOADER
   Dynamically fetches site-nav.html and initializes controls
============================================================ */
document.addEventListener("DOMContentLoaded", () => {
  const navContainer = document.getElementById('site-nav');
  
  if (navContainer) {
    fetch('/includes/site-nav.html')
      .then(response => {
        if (!response.ok) throw new Error("Navigation asset not found");
        return response.text();
      })
      .then(html => {
        // 1. Inject the navigation markup cleanly
        navContainer.innerHTML = html;

        // 2. Safely parse and isolate the page title before any separating dashes
        const cleanTitle = document.title.split('–')[0].split('--')[0].split('-')[0].trim();
        
        // 3. Inject page title into the breadcrumb tracker slot
        const currentPageElement = navContainer.querySelector('.current-page');
        if (currentPageElement) {
          currentPageElement.textContent = cleanTitle;
        }
      })
      .catch(err => console.error("Error loading shared navigation layout: ", err));
  }
});
