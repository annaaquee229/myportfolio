/* 전역 변수 참조 */
const xSlider = document.getElementById('xSlider');
const xNavBar = document.getElementById('xNavBar');
const playIcon = document.getElementById('playIcon');
const innerScroll = document.getElementById('innerScroll');
const dots = document.querySelectorAll('.dot');
const scrollDotsContainer = document.getElementById('scrollDots');

let currentX = 0;
const totalXSlides = 3;
let autoPlayInterval;
let isPlaying = true;

/* =========================================
   1. 가로 슬라이더 로직 (index-live-test.html 원본)
   ========================================= */
if (xSlider) {
  function startAutoPlay() {
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
    xSlider.style.transform = `translateX(-${currentX * 100}vw)`;
    if (xNavBar) {
      xNavBar.style.transform = `translateX(${currentX * 100}%)`;
    }
  }

  function moveX(dir) {
    currentX += dir;
    if (currentX < 0) currentX = totalXSlides - 1;
    else if (currentX >= totalXSlides) currentX = 0;
    updateX();
    if (isPlaying) {
      stopAutoPlay();
      startAutoPlay();
    }
  }

  // 페이지 로드 시 자동재생 시작
  window.addEventListener('load', startAutoPlay);
}

/* =========================================
   2. 세로 스크롤 및 불렛 로직 (Works/통합용)
   ========================================= */
if (innerScroll) {
  // 스크롤 시 불렛(점) 활성화 업데이트
  innerScroll.addEventListener('scroll', () => {
    const sectionHeight = innerScroll.offsetHeight;
    const index = Math.round(innerScroll.scrollTop / sectionHeight);

    // 우측 점 상태 업데이트
    if (dots.length > 0) {
      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
      });
    }

    // 세 번째 섹션(bg-y3) 진입 시 불렛 색상 반전 (CSS의 .bg-dark-theme 연동)
    if (scrollDotsContainer) {
      if (index === 2) scrollDotsContainer.classList.add('bg-dark-theme');
      else scrollDotsContainer.classList.remove('bg-dark-theme');
    }
  });

  // 휠 이벤트 제어 (내부 스크롤 전파 방지)
  innerScroll.addEventListener('wheel', (e) => {
    const scrollTop = innerScroll.scrollTop;
    const scrollHeight = innerScroll.scrollHeight;
    const height = innerScroll.offsetHeight;
    if (e.deltaY < 0 && scrollTop <= 0) return;
    if (e.deltaY > 0 && scrollTop + height < scrollHeight - 5) {
      e.stopPropagation();
    }
  }, { passive: false });
}

// 불렛 클릭 시 해당 섹션으로 부드럽게 이동하는 함수
function scrollToSection(index) {
  if (innerScroll) {
    innerScroll.scrollTo({
      top: index * innerScroll.offsetHeight,
      behavior: 'smooth'
    });
  }
}