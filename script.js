/* --------------------------------------------------
   [JS] ANNETIQUE STUDIO 통합 인터랙션 로직
-------------------------------------------------- */

/* 1. 가로 무한 슬라이더 및 재생/정지 제어 */
let currentX = 0;
const totalSlides = 3;
const xSlider = document.getElementById('xSlider');
const xNavBar = document.getElementById('xNavBar');
const dynamicBtn = document.getElementById('dynamicBtn');
const slideAutoBtn = document.getElementById('slideAutoBtn'); // HTML에 추가한 버튼 ID

let isAutoPlay = true; // 자동 재생 상태 변수
let slideInterval = setInterval(moveX, 2000); // 2초 간격 실행

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
    xSlider.style.transform = `translateX(-${currentX * 100}vw)`;
  }
  const realIndex = currentX % totalSlides;
  
  // 하단 슬라이드 바 이동
  if (xNavBar) {
    xNavBar.style.transform = `translateX(${realIndex * 100}%)`;
  }
  
  // 버튼 링크 및 텍스트 변경
  const links = ["works.html", "concept.html", "skills.html"];
  const texts = ["PROJECT VIEW", "CONCEPT VIEW", "SKILLS VIEW"];
  if (dynamicBtn) {
    dynamicBtn.href = links[realIndex];
    dynamicBtn.innerText = texts[realIndex];
  }
}

// 재생/정지 버튼 이벤트 리스너
if (slideAutoBtn) {
  slideAutoBtn.addEventListener('click', () => {
    if (isAutoPlay) {
      // 멈춤 상태로 전환
      clearInterval(slideInterval);
      slideAutoBtn.innerText = "PLAY";
    } else {
      // 재생 상태로 전환
      slideInterval = setInterval(moveX, 2000);
      slideAutoBtn.innerText = "STOP";
    }
    isAutoPlay = !isAutoPlay;
  });
}

/* 2. 세로 스냅 및 도트 인디케이터 로직 */
const innerScroll = document.getElementById('innerScroll');
const scrollDots = document.getElementById('scrollDots');
const dots = document.querySelectorAll('.dot');
const outerContainer = document.getElementById('outerContainer');
const verticalSection = document.getElementById('verticalSection');

if (innerScroll) {
  // 내부 세로 스크롤 시 도트 활성화
  innerScroll.addEventListener('scroll', () => {
    const index = Math.round(innerScroll.scrollTop / innerScroll.offsetHeight);
    dots.forEach((dot, i) => dot.classList.toggle('active', i === index));
  });

  // 스크롤 전파 방지 (내부 스크롤 우선)
  innerScroll.addEventListener('wheel', (e) => {
    const scrollTop = innerScroll.scrollTop;
    if (e.deltaY < 0 && scrollTop <= 0) return;
    if (e.deltaY > 0 && scrollTop + innerScroll.offsetHeight < innerScroll.scrollHeight - 5) {
      e.stopPropagation();
    }
  }, { passive: false });
}

// 전체 레이아웃 스크롤 시 도트 노출 여부 제어
if (outerContainer && verticalSection) {
  outerContainer.addEventListener('scroll', () => {
    const vTop = verticalSection.offsetTop;
    const current = outerContainer.scrollTop;
    
    // 세로 섹션(Vertical Section) 영역에 도달했을 때만 도트 표시
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