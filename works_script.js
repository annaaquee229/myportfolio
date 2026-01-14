document.addEventListener('DOMContentLoaded', () => {
  const grid = document.getElementById('worksGrid');
  const moreBtn = document.getElementById('moreBtn');
  const btnText = document.getElementById('btnText');

  // 1. 21개의 아이템 생성
  for (let i = 1; i <= 21; i++) {
    const li = document.createElement('li');
    li.className = 'grid-item';
    li.innerHTML = `
            <img src="https://picsum.photos/id/${i + 40}/800/800" alt="work">
            <div class="info-overlay">
                <h3>PROJECT ${String(i).padStart(2, '0')}</h3>
                <p>Creative design archive.</p>
            </div>
        `;
    grid.appendChild(li);
  }

  const allItems = document.querySelectorAll('.grid-item');
  let isOpen = false;

  // 2. 9개 이후 아이템 제어 (3열 기준)
  moreBtn.addEventListener('click', () => {
    isOpen = !isOpen;

    allItems.forEach((item, index) => {
      if (index >= 9) {
        item.classList.toggle('show', isOpen);
      }
    });

    btnText.innerText = isOpen ? "CLOSE" : "MORE WORKS";
    moreBtn.querySelector('.material-icons').innerText = isOpen ? "expand_less" : "expand_more";
  });
});