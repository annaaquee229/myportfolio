/* works_script.js */
document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('worksGrid');
    const moreBtn = document.getElementById('moreBtn');
    const btnText = document.getElementById('btnText');

    // 1. 20개의 그리드 아이템 생성
    for (let i = 1; i <= 20; i++) {
        const li = document.createElement('li');
        li.className = 'grid-item';
        li.innerHTML = `
            <img src="https://picsum.photos/id/${i + 20}/800/500" alt="work">
            <div class="info-overlay">
                <h3>PROJECT ${String(i).padStart(2, '0')}</h3>
                <p>Creative design solution archive.</p>
            </div>
        `;
        grid.appendChild(li);
    }

    const allItems = document.querySelectorAll('.grid-item');
    let isOpen = false;

    // 2. MORE 버튼 클릭 이벤트
    moreBtn.addEventListener('click', () => {
        isOpen = !isOpen;
        
        allItems.forEach((item, index) => {
            if (index >= 8) { // 8번째 이후 아이템들만 제어
                if (isOpen) {
                    item.classList.add('show');
                } else {
                    item.classList.remove('show');
                }
            }
        });

        if (isOpen) {
            btnText.innerText = "CLOSE";
            moreBtn.classList.add('is-open');
        } else {
            btnText.innerText = "MORE WORKS";
            moreBtn.classList.remove('is-open');
            // 닫을 때 최상단으로 부드럽게 스크롤 이동
            window.scrollTo({ top: grid.offsetTop - 100, behavior: 'smooth' });
        }
    });
});