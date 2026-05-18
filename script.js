/* --------------------------------------------------
   [JS] ANNETIQUE STUDIO 통합 인터랙션 로직
-------------------------------------------------- */

/* 1. 첫 번째 섹션: 가로 무한 슬라이더 및 재생/정지 제어 */
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

/* 2. 네 번째 섹션: 굿즈 자동 스크롤 제어 */
const goodsContainer = document.querySelector('.goods-container');
const goodsList = document.querySelector('.goods-list');

if (goodsContainer && goodsList) {
  let scrollSpeed = 1; 
  let animationFrameId = null;
  let isHovered = false;

  function autoScroll() {
    if (!isHovered) {
      goodsContainer.scrollLeft += scrollSpeed;

      if (goodsContainer.scrollLeft >= (goodsContainer.scrollWidth - goodsContainer.clientWidth)) {
        goodsContainer.scrollLeft = 0;
      }
    }
    animationFrameId = requestAnimationFrame(autoScroll);
  }

  goodsContainer.addEventListener('mouseenter', () => {
    isHovered = true;
  });

  goodsContainer.addEventListener('mouseleave', () => {
    isHovered = false;
  });

  autoScroll();
}

/* 3. 전체 영역: 우측 미니멀 숫자 내비게이션 & 상단 프로그레스 바 제어 */
const dots = document.querySelectorAll('.section-nav .dot');
const sections = document.querySelectorAll('.outer-section');
const mainWrapper = document.querySelector('.main-wrapper'); 

if (dots.length > 0 && sections.length > 0 && mainWrapper) {
  
  dots.forEach((dot, index) => {
    dot.addEventListener('click', (e) => {
      e.preventDefault();
      const targetSection = sections[index];
      if (targetSection) {
        mainWrapper.scrollTo({
          top: targetSection.offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });

  mainWrapper.addEventListener('scroll', () => {
    const scrollTop = mainWrapper.scrollTop;
    const wrapperHeight = mainWrapper.clientHeight;
    const totalScrollHeight = mainWrapper.scrollHeight - wrapperHeight;

    // 상단 얇은 바 퍼센트 연산
    const scrollPercent = (scrollTop / totalScrollHeight) * 100;
    document.documentElement.style.setProperty('--scroll-progress', `${scrollPercent}%`);

    let currentSectionIndex = 0;
    sections.forEach((section, index) => {
      const sectionTop = section.offsetTop;
      if (scrollTop >= sectionTop - wrapperHeight / 2) {
        currentSectionIndex = index;
      }
    });

    dots.forEach(dot => dot.classList.remove('active'));
    if (dots[currentSectionIndex]) {
      dots[currentSectionIndex].classList.add('active');
    }
  });
}

/* 4. 전체 영역: 마우스 팔로우 커스텀 커서 제어 (순수 반짝이 버전) */
const customCursor = document.querySelector('.custom-cursor');

if (customCursor) {
  // 동그라미 대신 하얀색 반짝이 모양 주입
  customCursor.innerHTML = '✨';

  // 1) 마우스 실시간 좌표 추적
  window.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    
    customCursor.style.left = `${mouseX}px`;
    customCursor.style.top = `${mouseY}px`;
  });

  // 2) 클릭 가능한 요소에 마우스가 올라가면 반짝이가 커지도록 클래스 추가
  const interactiveElements = document.querySelectorAll('a, button, .goods-item, .grid-item, .dot');
  
  interactiveElements.forEach(elem => {
    elem.addEventListener('mouseenter', () => {
      customCursor.classList.add('hover');
    });
    elem.addEventListener('mouseleave', () => {
      customCursor.classList.remove('hover');
    });
  });
}