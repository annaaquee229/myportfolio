document.addEventListener('DOMContentLoaded', () => {
  const grid = document.getElementById('worksGrid');
  const moreBtn = document.getElementById('moreBtn');
  const btnText = document.getElementById('btnText');

  // 모달 관련 DOM 요소 선언
  const modal = document.getElementById('workModal');
  const modalImg = document.getElementById('modalImg');
  const modalTitle = document.getElementById('modalTitle');
  const modalDesc = document.getElementById('modalDesc');
  const modalCloseBtn = document.getElementById('modalCloseBtn');

  // 1. 실제 작업물 데이터 리스트
  // 본인의 실제 이미지 경로(예: image/파일명.png)와 원하는 제목, 설명을 입력하세요.
  const myWorks = [
    { img: 'image/goods/list001.png', title: 'PROJECT 01', desc: '웹 디자인 및 퍼블리싱 아카이브' },
    { img: 'image/goods/list002.png', title: 'PROJECT 02', desc: '쇼핑몰 상세페이지 제작' },
    { img: 'image/goods/list003.png', title: 'PROJECT 03', desc: '브랜드 비주얼 영상 프로덕션' },
    { img: 'image/goods/list004.png', title: 'PROJECT 04', desc: 'Creative design archive.' },
    { img: 'image/goods/list005.png', title: 'PROJECT 05', desc: 'Creative design archive.' },
    { img: 'image/goods/list006.png', title: 'PROJECT 06', desc: 'Creative design archive.' },
    { img: 'image/goods/list007.png', title: 'PROJECT 07', desc: 'Creative design archive.' },
    { img: 'image/goods/list008.png', title: 'PROJECT 08', desc: 'Creative design archive.' },
    { img: 'image/goods/list009.png', title: 'PROJECT 09', desc: 'Creative design archive.' },
    { img: 'image/goods/list010.png', title: 'PROJECT 10', desc: 'Creative design archive.' },
    { img: 'image/goods/list011.png', title: 'PROJECT 11', desc: 'Creative design archive.' },
    { img: 'image/goods/list012.png', title: 'PROJECT 12', desc: 'Creative design archive.' },
    { img: 'image/goods/list013.png', title: 'PROJECT 13', desc: 'Creative design archive.' },
    { img: 'image/goods/list014.png', title: 'PROJECT 14', desc: 'Creative design archive.' },
    { img: 'image/goods/list015.png', title: 'PROJECT 15', desc: 'Creative design archive.' },
    { img: 'image/goods/list016.png', title: 'PROJECT 16', desc: 'Creative design archive.' },
    { img: 'image/goods/list017.png', title: 'PROJECT 17', desc: 'Creative design archive.' },
    { img: 'image/goods/list018.png', title: 'PROJECT 18', desc: 'Creative design archive.' },
    { img: 'image/goods/list019.png', title: 'PROJECT 19', desc: 'Creative design archive.' },
    { img: 'image/goods/list020.png', title: 'PROJECT 20', desc: 'Creative design archive.' },
    { img: 'image/goods/list021.png', title: 'PROJECT 21', desc: 'Creative design archive.' }
  ];

  // 2. 동적으로 그리드 아이템 생성 및 클릭 이벤트 매핑
  myWorks.forEach((work) => {
    const li = document.createElement('li');
    li.className = 'grid-item';
    li.innerHTML = `
            <img src="${work.img}" alt="${work.title}">
            <div class="info-overlay">
                <h3>${work.title}</h3>
                <p>${work.desc}</p>
            </div>
        `;
    
    // 리스트 아이템 클릭 시 팝업창 띄우기
    li.addEventListener('click', () => {
      modalImg.src = work.img;
      modalTitle.innerText = work.title;
      modalDesc.innerText = work.desc;
      modal.classList.add('active');
    });

    grid.appendChild(li);
  });

  // 3. 팝업창 닫기 (X 버튼 클릭)
  modalCloseBtn.addEventListener('click', () => {
    modal.classList.remove('active');
  });

  // 4. 팝업창 닫기 (어두운 배경 영역 클릭)
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('active');
    }
  });

  const allItems = document.querySelectorAll('.grid-item');
  let isOpen = false;

  // 5. MORE WORKS 버튼 열고 닫기 제어
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