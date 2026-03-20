/**
 * Navigation Component
 * Handles mobile menu toggle and navigation functionality
 */

export function initNavigation() {
  const menuToggle = document.getElementById('menuToggle');
  const nav = document.getElementById('nav');
  const navBackdrop = document.getElementById('navBackdrop');
  const navLinks = document.querySelectorAll('.nav__link');

  if (!menuToggle || !nav || !navBackdrop) return;

  // Toggle mobile menu
  function toggleMenu() {
    const isOpen = nav.classList.contains('nav--open');

    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  // Open mobile menu
  function openMenu() {
    nav.classList.add('nav--open');
    menuToggle.classList.add('menu-toggle--active');
    navBackdrop.classList.add('nav-backdrop--active');
    document.body.style.overflow = 'hidden'; // Prevent background scroll
  }

  // Close mobile menu
  function closeMenu() {
    nav.classList.remove('nav--open');
    menuToggle.classList.remove('menu-toggle--active');
    navBackdrop.classList.remove('nav-backdrop--active');
    document.body.style.overflow = ''; // Restore scroll
  }

  // Event listeners
  menuToggle.addEventListener('click', toggleMenu);
  navBackdrop.addEventListener('click', closeMenu);

  // Close menu when clicking on a nav link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      // Only close on mobile
      if (window.innerWidth <= 768) {
        closeMenu();
      }
    });
  });

  // Close menu on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('nav--open')) {
      closeMenu();
    }
  });

  // Close menu on window resize to desktop
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      if (window.innerWidth > 768 && nav.classList.contains('nav--open')) {
        closeMenu();
      }
    }, 150);
  });
}
