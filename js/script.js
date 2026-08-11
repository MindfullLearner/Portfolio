// ============ MOBILE NAVIGATION TOGGLE ============
const navToggle = document.getElementById('nav-toggle');
const navToggleLabel = document.getElementById('nav-toggle-label');
const siteNav = document.getElementById('site-nav');

function openNav() {
  siteNav.classList.add('is-open');
  navToggle.setAttribute('aria-expanded', 'true');
  navToggleLabel.textContent = 'CLOSE';
  document.body.style.overflow = 'hidden';
}

function closeNav() {
  siteNav.classList.remove('is-open');
  navToggle.setAttribute('aria-expanded', 'false');
  navToggleLabel.textContent = 'MENU';
  document.body.style.overflow = '';
}

navToggle.addEventListener('click', () => {
  const isOpen = siteNav.classList.contains('is-open');
  isOpen ? closeNav() : openNav();
});

// Close the mobile menu whenever a nav link is tapped
siteNav.querySelectorAll('.nav-link').forEach((link) => {
  link.addEventListener('click', closeNav);
});

// Close the mobile menu with the Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && siteNav.classList.contains('is-open')) {
    closeNav();
    navToggle.focus();
  }
});

// Close the menu automatically if the viewport grows back to desktop size
window.addEventListener('resize', () => {
  if (window.innerWidth > 720 && siteNav.classList.contains('is-open')) {
    closeNav();
  }
});

// ============ CONTACT FORM (front-end only demo) ============
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  if (!contactForm.checkValidity()) {
    formStatus.textContent = 'Please fill in all fields with a valid email.';
    return;
  }
  formStatus.textContent = 'Thanks! Your message has been noted (demo only — connect a backend or form service to actually send it).';
  contactForm.reset();
});

// ============ FOOTER YEAR ============
document.getElementById('year').textContent = new Date().getFullYear();
