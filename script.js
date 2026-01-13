const xSlider = document.getElementById('xSlider');
const innerScroll = document.getElementById('innerScroll');
const dots = document.querySelectorAll('.dot');
const scrollDotsContainer = document.getElementById('scrollDots');

/* 가로 슬라이더 로직 */
let currentX = 0;
if (xSlider) {
  function moveX(dir) {
    currentX += dir;
    if (currentX < 0) currentX = 2;
    else if (currentX >= 3) currentX = 0;
    xSlider.style.transform = `translateX(-${currentX * 100}vw)`;
  }
}

/* 세로 스크롤 & 우측 도트 업데이트 */
if (innerScroll) {
  innerScroll.addEventListener('scroll', () => {
    const sectionHeight = innerScroll.offsetHeight;
    const index = Math.round(innerScroll.scrollTop / sectionHeight);
    dots.forEach((dot, i) => { dot.classList.toggle('active', i === index); });
    if (scrollDotsContainer) {
      if (index === 2) scrollDotsContainer.classList.add('bg-dark-theme');
      else scrollDotsContainer.classList.remove('bg-dark-theme');
    }
  });
}

function scrollToSection(index) {
  if (innerScroll) {
    innerScroll.scrollTo({ top: index * innerScroll.offsetHeight, behavior: 'smooth' });
  }
}