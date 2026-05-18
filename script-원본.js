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

/* 3. 전체 영역: 우측 세로 도트 네비게이션 연동 (자석 스크롤 완벽 대응 버전) */
const dots = document.querySelectorAll('.section-nav .dot');
const sections = document.querySelectorAll('.outer-section');
const mainWrapper = document.querySelector('.main-wrapper'); 

if (dots.length > 0 && sections.length > 0 && mainWrapper) {
  
  // 🎯 도트 클릭 시 자석 스크롤(`.main-wrapper`)의 scrollTop을 직접 연산해서 강제 이동
  dots.forEach((dot, index) => {
    dot.addEventListener('click', (e) => {
      e.preventDefault();
      
      // 안나 님의 실제 섹션들 중 클릭한 순서(index)와 맞는 섹션을 타겟팅합니다.
      const targetSection = sections[index];
      
      if (targetSection) {
        // 자석 스크롤 틀 내부에서 해당 섹션이 위치한 절대 높이값으로 부드럽게 이동시킵니다.
        mainWrapper.scrollTo({
          top: targetSection.offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });

  // 🎯 스크롤 위치 감지해서 우측 도트에 active 불 켜기
  mainWrapper.addEventListener('scroll', () => {
    let currentSectionIndex = 0;
    const scrollTop = mainWrapper.scrollTop;
    const wrapperHeight = mainWrapper.clientHeight;

    sections.forEach((section, index) => {
      const sectionTop = section.offsetTop;
      // 섹션 영역에 화면의 절반 이상이 들어오면 도트 활성화
      if (scrollTop >= sectionTop - wrapperHeight / 2) {
        currentSectionIndex = index;
      }
    });

    // 불빛 교체
    dots.forEach(dot => dot.classList.remove('active'));
    if (dots[currentSectionIndex]) {
      dots[currentSectionIndex].classList.add('active');
    }
  });
}