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

// Hero play button: plays the hero video again from the start.
const heroVideo = document.querySelector('.video--hero video');
const heroPlay = document.querySelector('.video-play');

heroPlay.addEventListener('click', () => {
  heroVideo.currentTime = 0;
  heroVideo.play();
});

// Play/pause toggle buttons (e.g. the Interaction video):
// the icon follows the video's real state, also when it ends by itself.
document.querySelectorAll('.video-toggle').forEach((btn) => {
  const video = btn.closest('.video').querySelector('video');

  btn.addEventListener('click', () => {
    if (video.paused) video.play();
    else video.pause();
  });

  function syncButton() {
    const playing = !video.paused && !video.ended;
    btn.classList.toggle('is-playing', playing);
    btn.setAttribute('aria-label', playing ? 'Pause video' : 'Play video');
  }

  video.addEventListener('play', syncButton);
  video.addEventListener('pause', syncButton);
  video.addEventListener('ended', syncButton);
});
