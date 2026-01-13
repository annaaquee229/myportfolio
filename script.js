let currentX = 0;
const totalXSlides = 3;
const xSlider = document.getElementById('xSlider');
const xNavBar = document.getElementById('xNavBar');
const playIcon = document.getElementById('playIcon');

let autoPlayInterval;
let isPlaying = true;

function startAutoPlay() {
  if (autoPlayInterval) clearInterval(autoPlayInterval);
  autoPlayInterval = setInterval(() => { moveX(1); }, 4000);
}

function stopAutoPlay() {
  clearInterval(autoPlayInterval);
}

function toggleAutoPlay() {
  if (isPlaying) {
    stopAutoPlay();
    if (playIcon) playIcon.innerText = "▶";
  } else {
    startAutoPlay();
    if (playIcon) playIcon.innerText = "II";
  }
  isPlaying = !isPlaying;
}

function updateX() {
  if (xSlider) xSlider.style.transform = `translateX(-${currentX * 100}vw)`;
  if (xNavBar) xNavBar.style.transform = `translateX(${currentX * 100}%)`;
}

function moveX(dir) {
  currentX += dir;
  if (currentX < 0) currentX = totalXSlides - 1;
  else if (currentX >= totalXSlides) currentX = 0;
  updateX();
  if (isPlaying) startAutoPlay();
}

window.onload = startAutoPlay;