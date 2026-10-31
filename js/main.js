// Scroll progress bar: fills as the page is scrolled,
// and is only visible while the user is scrolling.
const bar = document.querySelector('.progress');
const fill = document.querySelector('.progress-fill');
const HIDE_DELAY = 800;   // ms after the last scroll before the bar fades out
let hideTimer;

function updateProgress() {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  const pct = max > 0 ? (window.scrollY / max) * 100 : 0;
  fill.style.width = pct + '%';
}

function onScroll() {
  updateProgress();
  bar.classList.add('is-visible');
  clearTimeout(hideTimer);
  hideTimer = setTimeout(() => bar.classList.remove('is-visible'), HIDE_DELAY);
}

window.addEventListener('scroll', onScroll, { passive: true });
window.addEventListener('resize', updateProgress);
updateProgress();
