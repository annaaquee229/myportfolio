
    // X축 무한 슬라이드 로직
    let currentX = 0;
    const totalXSlides = 3;
    const xSlider = document.getElementById('xSlider');
    const xNavBar = document.getElementById('xNavBar');

    function updateX() {
      xSlider.style.transform = `translateX(-${currentX * 100}vw)`;
      xNavBar.style.transform = `translateX(${currentX * 100}%)`;
    }

    function moveX(dir) {
      currentX += dir;
      if (currentX < 0) currentX = totalXSlides - 1;
      else if (currentX >= totalXSlides) currentX = 0;
      updateX();
    }

    // Y축 로직 및 스킵 방지
    const innerScroll = document.getElementById('innerScroll');
    const yBullets = document.querySelectorAll('.bullet');
    innerScroll.addEventListener('scroll', () => {
      const index = Math.round(innerScroll.scrollTop / window.innerHeight);
      yBullets.forEach((bullet, i) => bullet.classList.toggle('active', i === index));
    });

    innerScroll.addEventListener('wheel', (e) => {
      const scrollTop = innerScroll.scrollTop;
      const scrollHeight = innerScroll.scrollHeight;
      const height = innerScroll.offsetHeight;
      if (e.deltaY < 0 && scrollTop <= 0) return;
      if (e.deltaY > 0 && scrollTop + height < scrollHeight - 5) {
        e.stopPropagation();
      }
    }, { passive: false });
 