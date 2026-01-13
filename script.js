/* [원본 유지] index-live-test.html의 변수 및 상태 */
let currentX = 0;
const totalXSlides = 3;
const xSlider = document.getElementById('xSlider');
const xNavBar = document.getElementById('xNavBar');
const playIcon = document.getElementById('playIcon');

let autoPlayInterval;
let isPlaying = true;

/* [원본 유지] 가로 슬라이더 관련 함수들 */
function startAutoPlay() { 
  if (xSlider) autoPlayInterval = setInterval(() => { moveX(1); }, 4000); 
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
  if (isPlaying) { 
    stopAutoPlay(); 
    startAutoPlay(); 
  }
}

window.onload = startAutoPlay;

/* [원본 유지] 휠 이벤트 제어 로직 */
const innerScroll = document.getElementById('innerScroll');
if (innerScroll) {
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

/* =========================================
   [추가 통합] 우측 불렛 인디케이터 제어 로직
   ========================================= */
const dots = document.querySelectorAll('.dot');
const scrollDotsContainer = document.getElementById('scrollDots');

if (innerScroll) {
  innerScroll.addEventListener('scroll', () => {
    const sectionHeight = innerScroll.offsetHeight;
    const index = Math.round(innerScroll.scrollTop / sectionHeight);
    
    // 우측 점(인디케이터) 활성화 상태 업데이트
    if (dots.length > 0) {
      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
      });
    }

    // bg-y3(세 번째 섹션) 진입 시 불렛 색상 반전 처리
    if (scrollDotsContainer) {
      if (index === 2) scrollDotsContainer.classList.add('bg-dark-theme');
      else scrollDotsContainer.classList.remove('bg-dark-theme');
    }
  });
}

// 우측 점 클릭 시 해당 섹션으로 부드럽게 이동하는 함수
function scrollToSection(index) {
  if (innerScroll) {
    innerScroll.scrollTo({
      top: index * innerScroll.offsetHeight,
      behavior: 'smooth'
    });
  }
}