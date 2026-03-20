/**
 * Simple Typewriter Effect - Pure CSS Animation
 * JavaScript only switches texts and adds animation class
 * CSS handles: type → pause → remove animation cycle
 */

export function initTypewriter() {
  const container = document.getElementById('typewriterContainer');

  if (!container) return;

  const texts = container.querySelectorAll('.hero__typewriter-text');
  if (texts.length === 0) return;

  let currentIndex = 0;

  // Animation duration (matches CSS keyframes)
  const ANIMATION_DURATION = 4000; // 4s total: 0.8s type + 2.4s pause + 0.8s remove

  function switchToNextText() {
    const currentText = texts[currentIndex];

    // Remove animation class and hide current text
    currentText.classList.remove('hero__typewriter-text--animate');
    currentText.classList.remove('hero__typewriter-text--active');

    // Move to next text
    currentIndex = (currentIndex + 1) % texts.length;
    const nextText = texts[currentIndex];

    // Show next text and start its animation
    nextText.classList.add('hero__typewriter-text--active');

    // Small delay before starting next animation
    setTimeout(startNextText, 100);
  }

  function startNextText() {
    const currentText = texts[currentIndex];

    // Start the complete animation cycle (type → pause → remove)
    currentText.classList.add('hero__typewriter-text--animate');

    // After animation completes, switch to next text
    setTimeout(switchToNextText, ANIMATION_DURATION);
  }

  // Start with first text after initial delay
  setTimeout(startNextText, 500);
}
