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