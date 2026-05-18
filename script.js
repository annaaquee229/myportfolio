/* --------------------------------------------------
   [JS] ANNETIQUE STUDIO 통합 인터랙션 로직
-------------------------------------------------- */

/* 1. 가로 무한 슬라이더 및 재생/정지 제어 (원형 완벽 보존) */
let currentX = 0;
const totalSlides = 3;
const xSlider = document.getElementById('xSlider');
const xNavBar = document.getElementById('xNavBar');
const dynamicBtn = document.getElementById('dynamicBtn');
const slideAutoBtn = document.getElementById('slideAutoBtn'); 

let isAutoPlay = true; 
let slideInterval = setInterval(moveX, 2000); 

function moveX() {
  currentX++;
  if (xSlider) {
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
}

function updateSlider() {
  if (xSlider) {
    xSlider.style.transform = `translateX(-${currentX * 25}%)`;
  }
  const realIndex = currentX % totalSlides;
  
  if (xNavBar) {
    xNavBar.style.transform = `translateX(${realIndex * 100}%)`;
  }
  
  const links = ["works.html", "concept.html", "skills.html"];
  const texts = ["PROJECT VIEW", "CONCEPT VIEW", "SKILLS VIEW"];
  if (dynamicBtn) {
    dynamicBtn.href = links[realIndex];
    dynamicBtn.innerText = texts[realIndex];
  }
}

if (slideAutoBtn) {
  slideAutoBtn.addEventListener('click', () => {
    if (isAutoPlay) {
      clearInterval(slideInterval);
      slideAutoBtn.innerText = "PLAY";
    } else {
      slideInterval = setInterval(moveX, 2000);
      slideAutoBtn.innerText = "STOP";
    }
    isAutoPlay = !isAutoPlay;
  });
}

/* 2. 세로 스냅 및 도트 인디케이터 로직 (안전 휠 버퍼 탑재) */
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

  // 💡 내부 스크롤 박스가 끝에 도달하기 전까지 외부 레이아웃이 급하게 넘어가 버리는 현상을 방어합니다.
  innerScroll.addEventListener('wheel', (e) => {
    const scrollTop = innerScroll.scrollTop;
    
    // 첫 슬라이드에서 위로 올릴 때만 부모 스냅 작동 허용
    if (e.deltaY < 0 && scrollTop <= 0) return;
    
    // 마지막 내부 슬라이드 바닥에 닿기 전까지는 부모 스냅이 아래로 튀는 것을 강력 차단
    if (e.deltaY > 0 && scrollTop + innerScroll.offsetHeight < innerScroll.scrollHeight - 5) {
      e.stopPropagation();
    }
  }, { passive: false });
}

if (outerContainer && verticalSection) {
  outerContainer.addEventListener('scroll', () => {
    const vTop = verticalSection.offsetTop;
    const current = outerContainer.scrollTop;
    
    if (current >= vTop - 50 && current < vTop + verticalSection.offsetHeight - 50) {
      scrollDots.classList.add('visible');
    } else {
      scrollDots.classList.remove('visible');
    }
  });
}

/* 3. 도트 클릭 시 부드러운 이동 함수 */
function scrollToInner(index) {
  if (innerScroll) {
    innerScroll.scrollTo({
      top: index * innerScroll.offsetHeight,
      behavior: 'smooth'
    });
  }
}