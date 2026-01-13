/* --------------------------------------------------
   [JS] 인터랙션 및 슬라이더 로직
-------------------------------------------------- */

/* 가로 무한 슬라이더 로직 (2초 간격) */
let currentX = 0;
const totalSlides = 3;
const xSlider = document.getElementById('xSlider');
const xNavBar = document.getElementById('xNavBar');
const dynamicBtn = document.getElementById('dynamicBtn');

function moveX() {
  currentX++;
  xSlider.style.transition = "transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)";
  updateSlider();
  if (currentX === totalSlides) {
    setTimeout(() => {
      xSlider.style.transition = "none";
      currentX = 0;
      updateSlider();
    }, 600);
  }
}

function updateSlider() {
  xSlider.style.transform = `translateX(-${currentX * 100}vw)`;
  const realIndex = currentX % totalSlides;
  if (xNavBar) xNavBar.style.transform = `translateX(${realIndex * 100}%)`;
  
  const links = ["works.html", "concept.html", "skills.html"];
  const texts = ["PROJECT VIEW", "CONCEPT VIEW", "SKILLS VIEW"];
  if (dynamicBtn) {
    dynamicBtn.href = links[realIndex];
    dynamicBtn.innerText = texts[realIndex];
  }
}

setInterval(moveX, 2000);

/* 세로 스냅 및 도트 로직 */
const innerScroll = document.getElementById('innerScroll');
const scrollDots = document.getElementById('scrollDots');
const dots = document.querySelectorAll('.dot');
const outerContainer = document.getElementById('outerContainer');
const verticalSection = document.getElementById('verticalSection');

if (innerScroll) {
  innerScroll.addEventListener('scroll', () => {
    const index = Math.round(innerScroll.scrollTop / innerScroll.offsetHeight);
    dots.forEach((dot, i) => dot.classList.toggle('active', i === index));
  });

  innerScroll.addEventListener('wheel', (e) => {
    const scrollTop = innerScroll.scrollTop;
    if (e.deltaY < 0 && scrollTop <= 0) return;
    if (e.deltaY > 0 && scrollTop + innerScroll.offsetHeight < innerScroll.scrollHeight - 5) {
      e.stopPropagation();
    }
  }, { passive: false });
}

if (outerContainer && verticalSection) {
  outerContainer.addEventListener('scroll', () => {
    const vTop = verticalSection.offsetTop;
    const current = outerContainer.scrollTop;
    // 세로 섹션 영역에서만 도트 노출
    if (current >= vTop - 50 && current < vTop + verticalSection.offsetHeight - 50) {
      scrollDots.classList.add('visible');
    } else {
      scrollDots.classList.remove('visible');
    }
  });
}

function scrollToInner(index) {
  if (innerScroll) {
    innerScroll.scrollTo({ 
        top: index * innerScroll.offsetHeight, 
        behavior: 'smooth' 
    });
  }
}