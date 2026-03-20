/**
 * Cursor Interactions
 * Adds magnetic hover effects and enhanced cursor interactions
 */

// Check if device supports hover (desktop)
function isHoverDevice() {
  return window.matchMedia('(hover: hover) and (pointer: fine)').matches;
}

// Magnetic effect for buttons and cards
export function initMagneticElements() {
  // Skip completely on touch devices (mobile/tablet)
  if (!isHoverDevice()) {
    return;
  }

  const magneticElements = document.querySelectorAll('.btn--primary, .btn--secondary, .card, .card--service');

  magneticElements.forEach(element => {
    const isButton = element.classList.contains('btn--primary') || element.classList.contains('btn--secondary');
    const isCard = element.classList.contains('card');

    // Buttons attract (0.15), cards repel (0.06)
    const strength = isButton ? 0.15 : 0.06;
    const direction = isButton ? 1 : -1;

    function applyMagneticEffect(clientX, clientY) {
      const rect = element.getBoundingClientRect();
      const x = clientX - rect.left - rect.width / 2;
      const y = clientY - rect.top - rect.height / 2;
      const moveX = direction * x * strength;
      const moveY = direction * y * strength;

      // For buttons, set CSS variables for glow parallax effect
      if (isButton) {
        const parent = element.closest('.section__cta');
        if (parent) {
          parent.style.setProperty('--glow-x', `${moveX}px`);
          parent.style.setProperty('--glow-y', `${moveY}px`);
        }
      }

      // Apply magnetic transform
      if (isCard) {
        element.style.transform = `translate(${moveX}px, ${moveY}px) translateY(-16px) scale(1.05)`;
      } else {
        element.style.transform = `translate(${moveX}px, ${moveY}px)`;
      }
    }

    function resetTransform() {
      element.style.transform = '';
      if (isButton) {
        const parent = element.closest('.section__cta');
        if (parent) {
          parent.style.setProperty('--glow-x', '0px');
          parent.style.setProperty('--glow-y', '0px');
        }
      }
    }

    element.addEventListener('mousemove', (e) => {
      applyMagneticEffect(e.clientX, e.clientY);
    });

    element.addEventListener('mouseleave', resetTransform);
  });
}

// Smooth cursor trail effect
export function initCursorTrail() {
  // Skip on touch devices (mobile/tablet)
  if (!isHoverDevice()) {
    return;
  }

  let mouseX = 0;
  let mouseY = 0;
  let cursorX = 0;
  let cursorY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  // Create cursor elements
  const cursor = document.createElement('div');
  cursor.className = 'custom-cursor';
  cursor.style.cssText = `
    position: fixed;
    width: 12px;
    height: 12px;
    background: rgba(0, 122, 255, 0.6);
    border-radius: 50%;
    pointer-events: none;
    z-index: 9999;
    transition: transform 0.15s ease;
    mix-blend-mode: screen;
  `;

  const cursorOutline = document.createElement('div');
  cursorOutline.className = 'custom-cursor-outline';
  cursorOutline.style.cssText = `
    position: fixed;
    width: 40px;
    height: 40px;
    border: 2px solid rgba(0, 122, 255, 0.3);
    border-radius: 50%;
    pointer-events: none;
    z-index: 9998;
    transition: all 0.2s ease;
  `;

  document.body.appendChild(cursor);
  document.body.appendChild(cursorOutline);

  // Animate cursor
  function animateCursor() {
    // Smooth follow effect
    cursorX += (mouseX - cursorX) * 0.2;
    cursorY += (mouseY - cursorY) * 0.2;

    cursor.style.left = `${mouseX}px`;
    cursor.style.top = `${mouseY}px`;
    cursorOutline.style.left = `${cursorX - 20}px`;
    cursorOutline.style.top = `${cursorY - 20}px`;

    requestAnimationFrame(animateCursor);
  }

  animateCursor();

  // Scale up on hover interactive elements
  const interactiveElements = document.querySelectorAll('a, button, .btn, .card, input, textarea, select');

  interactiveElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
      cursor.style.transform = 'scale(1.5)';
      cursorOutline.style.transform = 'scale(1.5)';
      cursorOutline.style.borderColor = 'rgba(0, 122, 255, 0.6)';
    });

    element.addEventListener('mouseleave', () => {
      cursor.style.transform = 'scale(1)';
      cursorOutline.style.transform = 'scale(1)';
      cursorOutline.style.borderColor = 'rgba(0, 122, 255, 0.3)';
    });
  });

  // Hide default cursor on body
  document.body.style.cursor = 'none';

  // Show default cursor on elements that need it
  interactiveElements.forEach(element => {
    element.style.cursor = 'none';
  });
}

// Ripple effect on click - using event delegation
export function initRippleEffect() {
  document.addEventListener('click', function(e) {
    const element = e.target.closest('.btn, .card');
    if (!element) return;

    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.3);
      left: ${x}px;
      top: ${y}px;
      pointer-events: none;
      z-index: 100;
      animation: ripple-animation 0.6s ease-out;
    `;

    element.appendChild(ripple);

    setTimeout(() => ripple.remove(), 600);
  });

  // Add ripple animation if not exists
  if (!document.querySelector('#ripple-keyframes')) {
    const style = document.createElement('style');
    style.id = 'ripple-keyframes';
    style.textContent = `
      @keyframes ripple-animation {
        0% {
          transform: scale(0);
          opacity: 1;
        }
        100% {
          transform: scale(4);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);
  }
}

