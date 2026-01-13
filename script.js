let currentX = 0;
const totalXSlides = 3;
const xSlider = document.getElementById('xSlider');
const xNavBar = document.getElementById('xNavBar');
const playIcon = document.getElementById('playIcon');

let autoPlayInterval;
let isPlaying = true;

// 자동 재생 시작
function startAutoPlay() {
  autoPlayInterval = setInterval(() => {
    moveX(1);
  }, 4000);
}

// 자동 재생 정지
function stopAutoPlay() {
  clearInterval(autoPlayInterval);
}

// 재생/일시정지 토글
function toggleAutoPlay() {
  if (isPlaying) {
    stopAutoPlay();
    playIcon.innerText = "▶";
  } else {
    startAutoPlay();
    playIcon.innerText = "II";
  }
  isPlaying = !isPlaying;
}

// 슬라이드 및 내비바 업데이트
function updateX() {
  xSlider.style.transform = `translateX(-${currentX * 100}vw)`;
  if (xNavBar) {
    xNavBar.style.transform = `translateX(${currentX * 100}%)`;
  }
}

// 이동 함수
function moveX(dir) {
  currentX += dir;
  if (currentX < 0) currentX = totalXSlides - 1;
  else if (currentX >= totalXSlides) currentX = 0;
  updateX();
  
  // 수동 조작 시 타이머 리셋
  if (isPlaying) {
    stopAutoPlay();
    startAutoPlay();
  }
}

// 초기 실행
window.onload = startAutoPlay;