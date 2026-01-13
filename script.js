/* 1. 가로 슬라이더 로직 (index.html 전용) */
let currentX = 0;
const totalXSlides = 3;
const xSlider = document.getElementById('xSlider');
const xNavBar = document.getElementById('xNavBar');
const playIcon = document.getElementById('playIcon');

let autoPlayInterval;
let isPlaying = true;

// 요소가 존재할 때만 실행하여 다른 페이지에서의 에러 방지
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

  window.addEventListener('load', startAutoPlay); // window.onload 중복 방지
}

/* 2. 세로 스크롤 및 불렛 로직 (works.html 전용) */
const innerScroll = document.getElementById('innerScroll');
const dots = document.querySelectorAll('.dot');
const scrollDotsContainer = document.getElementById('scrollDots');

if (innerScroll) {
  // 마우스 휠 이벤트 전파 방지 (기존 로직)
  innerScroll.addEventListener('wheel', (e) => {
    const scrollTop = innerScroll.scrollTop;
    const scrollHeight = innerScroll.scrollHeight;
    const height = innerScroll.offsetHeight;
    if (e.deltaY < 0 && scrollTop <= 0) return;
    if (e.deltaY > 0 && scrollTop + height < scrollHeight - 5) {
      e.stopPropagation();
    }
  }, { passive: false });

  // 스크롤 위치에 따른 불렛(점) 활성화 업데이트
  innerScroll.addEventListener('scroll', () => {
    const sectionHeight = innerScroll.offsetHeight;
    const index = Math.round(innerScroll.scrollTop / sectionHeight);
    
    // 점 상태 업데이트
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });

    // 세 번째 섹션(bg-y3)에서 색상 반전 (CSS 클래스명 bg-dark-theme에 맞춤)
    if (scrollDotsContainer) {
      if (index === 2) {
        scrollDotsContainer.classList.add('bg-dark-theme');
      } else {
        scrollDotsContainer.classList.remove('bg-dark-theme');
      }
    }
  });
}

// 불렛 클릭 시 해당 섹션으로 부드럽게 이동하는 함수 (HTML 전역 호출용)
function scrollToSection(index) {
  if (innerScroll) {
    const sectionHeight = innerScroll.offsetHeight;
    innerScroll.scrollTo({
      top: index * sectionHeight,
      behavior: 'smooth'
    });
  }
}