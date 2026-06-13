/* ============================================================
   GLOBAL NAVIGATION LOADER
   Dynamically fetches site-nav.html and stabilizes title text
============================================================ */
document.addEventListener("DOMContentLoaded", () => {
  const navContainer = document.getElementById('site-nav');
  
  if (navContainer) {
    fetch('/includes/site-nav.html')
      .then(response => {
        if (!response.ok) throw new Error("Shared navigation file missing");
        return response.text();
      })
      .then(html => {
        // 1. Render the HTML fragment safely into the page
        navContainer.innerHTML = html;

        // 2. Split on any style of dash (-, –, —) to isolate the page name cleanly
        const cleanTitle = document.title.split('–')[0].split('—')[0].split('-')[0].trim();
        
        // 3. Update the breadcrumb tracking text slot safely
        const currentPageElement = navContainer.querySelector('.current-page');
        if (currentPageElement) {
          currentPageElement.textContent = cleanTitle;
        }
      })
      .catch(err => console.error("Error building navigation element: ", err));
  }
});
