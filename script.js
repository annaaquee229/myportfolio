/* --------------------------------------------------
   [JS] ANNETIQUE STUDIO 통합 인터랙션 로직 (초경량 정석 버전)
-------------------------------------------------- */

/* 1. 첫 번째 섹션: 가로 무한 슬라이더 및 재생/정지 제어 (안나 님 오리지널 원형 완벽 보존) */
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

// 💡 네 번째 섹션의 기차 선로(터널)와 기차 본체를 선택합니다.
const goodsContainer = document.querySelector('.goods-container');
const goodsList = document.querySelector('.goods-list');

if (goodsContainer && goodsList) {
  let scrollSpeed = 1; // 💡 숫자가 커질수록 자동 슬라이드 속도가 빨라집니다.
  let animationFrameId = null;
  let isHovered = false;

  // 1. 끊김 없이 흐르는 무한 자동 슬라이드 함수 구동
  function autoScroll() {
    if (!isHovered) {
      // 터널의 스크롤을 오른쪽으로 1px씩 계속 밀어줍니다.
      goodsContainer.scrollLeft += scrollSpeed;

      // 만약 오른쪽 끝까지 다 도달했다면, 다시 맨 왼쪽(0)으로 자연스럽게 순간 이동시킵니다.
      if (goodsContainer.scrollLeft >= (goodsContainer.scrollWidth - goodsContainer.clientWidth)) {
        goodsContainer.scrollLeft = 0;
      }
    }
    // 브라우저의 부드러운 프레임에 맞춰 무한 반복 재생합니다.
    animationFrameId = requestAnimationFrame(autoScroll);
  }

  // 2. 안나 님이 제안하신 마우스 호버(Hover) 이벤트 매칭
  // 마우스가 상품 구역 안으로 들어오면 스크롤 잠시 멈춤!
  goodsContainer.addEventListener('mouseenter', () => {
    isHovered = true;
  });

  // 마우스가 상품 구역 바깥으로 나가면 다시 부드럽게 출발!
  goodsContainer.addEventListener('mouseleave', () => {
    isHovered = false;
  });

  // 3. 네 번째 섹션 슬라이더 자동 시작
  autoScroll();
}