/* --------------------------------------------------
   [JS] ANNETIQUE STUDIO 통합 인터랙션 로직 (창 전환 완벽 수정본)
-------------------------------------------------- */

/* 1. 가로 무한 슬라이더 및 재생/정지 제어 */
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
    /* 데스크탑 세로 스크롤바 우측 튕김 오류를 잡기 위해 부모 크기 기반 % 이동 연산 적용 */
    xSlider.style.transform = `translateX(-${currentX * 25}%)`;
  }
  const realIndex = currentX % totalSlides;
  
  // 하단 슬라이드 바 이동
  if (xNavBar) {
    xNavBar.style.transform = `translateX(${realIndex * 100}%)`;
  }
  
  // 💡 [창 전환 완벽 매칭] 슬라이드 테마에 맞춰 매칭된 개별 실물 페이지 파일 주소로 깔끔하게 화면 전환됩니다.
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
      clearInterval(slideInterval);
      slideAutoBtn.innerText = "PLAY";
    } else {
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