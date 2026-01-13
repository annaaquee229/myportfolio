/* [원본 로직] 가로 슬라이더 및 자동재생 */
let currentX = 0;
const totalXSlides = 3;
const xSlider = document.getElementById('xSlider');
const xNavBar = document.getElementById('xNavBar');
const playIcon = document.getElementById('playIcon');

let autoPlayInterval;
let isPlaying = true;

function startAutoPlay() { if (xSlider) autoPlayInterval = setInterval(() => { moveX(1); }, 4000); }
function stopAutoPlay() { clearInterval(autoPlayInterval); }

function toggleAutoPlay() {
  if (isPlaying) { stopAutoPlay(); if (playIcon) playIcon.innerText = "▶"; }
  else { startAutoPlay(); if (playIcon) playIcon.innerText = "II"; }
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
  if (isPlaying) { stopAutoPlay(); startAutoPlay(); }
}

window.onload = startAutoPlay;

/* [원본 로직] 휠 전파 방지 */
const innerScroll = document.getElementById('innerScroll');
if (innerScroll) {
  innerScroll.addEventListener('wheel', (e) => {
    const scrollTop = innerScroll.scrollTop;
    const scrollHeight = innerScroll.scrollHeight;
    const height = innerScroll.offsetHeight;
    if (e.deltaY < 0 && scrollTop <= 0) return;
    if (e.deltaY > 0 && scrollTop + height < scrollHeight - 5) { e.stopPropagation(); }
  }, { passive: false });
}

/* [추가 로직] 우측 도트 내비게이션 활성화 */
const dots = document.querySelectorAll('.dot');
const scrollDotsContainer = document.getElementById('scrollDots');

if (innerScroll) {
  innerScroll.addEventListener('scroll', () => {
    const sectionHeight = innerScroll.offsetHeight;
    const index = Math.round(innerScroll.scrollTop / sectionHeight);
    
    // 점 활성화 업데이트
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });

    // 밝은 배경(세 번째 섹션)에서 점 색상 반전
    if (scrollDotsContainer) {
      if (index === 2) scrollDotsContainer.classList.add('bg-dark-theme');
      else scrollDotsContainer.classList.remove('bg-dark-theme');
    }
  });
}

// 점 클릭 시 이동
function scrollToSection(index) {
  if (innerScroll) {
    innerScroll.scrollTo({
      top: index * innerScroll.offsetHeight,
      behavior: 'smooth'
    });
  }
}