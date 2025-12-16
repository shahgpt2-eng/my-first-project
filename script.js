function renderLayout() {
  const header = document.getElementById('site-header');
  const footer = document.getElementById('site-footer');
  if (header) {
    header.innerHTML = `
    <header>
      <div class="navbar">
        <a class="logo" href="/">Rent Luxury Vans</a>
        <button class="btn btn-outline menu-toggle" aria-label="Toggle menu" onclick="toggleNav()">Menu</button>
        <nav class="nav-links" id="nav-links">
          <a href="/">Home</a>
          <div class="dropdown" id="services-dropdown">
            <div class="dropdown-toggle" onclick="toggleDropdown(event)">Services <span>▾</span></div>
            <div class="dropdown-menu">
              <a href="/nemt">Non-Emergency Medical Transportation (NEMT)</a>
              <a href="/school-shuttle">School Shuttle Service - Student Transport</a>
              <a href="/fleet">LUXURY VANS</a>
              <a href="/chauffeur">Chauffer</a>
              <a href="/special-events">Special Events</a>
            </div>
          </div>
          <a href="/fleet">The Fleet</a>
          <a href="/team">Our Team</a>
          <a href="/testimonials">Testimonials</a>
          <a href="/faqs">FAQs</a>
          <a href="/contact">Contact Us</a>
          <a class="btn btn-primary" href="/book">Check Availability</a>
        </nav>
      </div>
    </header>`;
  }
  if (footer) {
    footer.innerHTML = `
    <div class="footer">
      <div class="footer-inner">
        <div>
          <h4>Rent Luxury Vans</h4>
          <p class="small-note">Premium vans, vetted chauffeurs, and a concierge approach for smooth travel.</p>
          <a href="/book" class="btn btn-primary">Check Availability</a>
          <a href="tel:8888620276" class="btn btn-outline">Call Dispatch (888-862-0276)</a>
        </div>
        <div>
          <h4>Company</h4>
          <a href="/">Home</a>
          <a href="/fleet">The Fleet</a>
          <a href="/team">Our Team</a>
          <a href="/testimonials">Testimonials</a>
          <a href="/faqs">FAQs</a>
          <a href="/contact">Contact Us</a>
        </div>
        <div>
          <h4>Services</h4>
          <a href="/nemt">Non-Emergency Medical Transportation (NEMT)</a>
          <a href="/school-shuttle">School Shuttle Service - Student Transport</a>
          <a href="/fleet">LUXURY VANS</a>
          <a href="/chauffeur">Chauffer</a>
          <a href="/special-events">Special Events</a>
        </div>
        <div>
          <h4>Get Moving</h4>
          <a href="/fleet/suv">SUV Options</a>
          <a href="/fleet/10-passenger">10-Passenger Vans</a>
          <a href="/fleet/15-passenger">15-Passenger Vans</a>
          <a href="/fleet/media">Fleet Media Gallery</a>
          <a href="/book">Check Availability</a>
        </div>
      </div>
      <div class="footer-bottom">Dedicated dispatch and concierge support around the clock.</div>
    </div>`;
  }
}

function toggleDropdown(event) {
  event.stopPropagation();
  const dropdown = document.getElementById('services-dropdown');
  dropdown.classList.toggle('open');
}
function toggleNav() {
  const nav = document.getElementById('nav-links');
  nav.classList.toggle('open');
}

document.addEventListener('click', () => {
  const dropdown = document.getElementById('services-dropdown');
  if (dropdown) dropdown.classList.remove('open');
});

document.addEventListener('DOMContentLoaded', () => {
  renderLayout();
  document.querySelectorAll('.faq-question').forEach((btn) => {
    btn.addEventListener('click', () => {
      btn.parentElement.classList.toggle('open');
    });
  });
});
