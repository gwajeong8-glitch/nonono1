// ==========================================================
// 이미지 다운로드 함수 (html2canvas 사용)
// ==========================================================
function downloadImage(elementId) {
    const captureElement = document.getElementById(elementId); // 캡처할 요소 ID

    // 로딩 표시 및 버튼 비활성화
    const button = document.querySelector('.download-button');
    const originalText = button.textContent;
    button.textContent = '이미지 생성 중... 잠시만 기다려주세요.';
    button.disabled = true;

    html2canvas(captureElement, {
        scale: 2, 
        allowTaint: true,
        useCORS: true
    }).then(canvas => {
        const image = canvas.toDataURL('image/png');

        const a = document.createElement('a');
        a.href = image;
        a.download = `${elementId}_capture.png`; // 다운로드 파일명
        
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        // 버튼 원래대로 복구
        button.textContent = originalText;
        button.disabled = false;

    }).catch(error => {
        console.error('이미지 생성 중 오류 발생:', error);
        button.textContent = '❌ 오류 발생 (콘솔 확인)';
        button.disabled = false;
        alert('이미지 생성에 실패했습니다.');
    });
}

// ==========================================================
// VIP 카드 기능 로직
// ==========================================================

// VIP 카드 데이터 (초기값 설정)
const vipCardData = {
    'vip1': {
        background: 'url("https://i.imgur.com/your-vip1-image.png")', // 여기에 실제 이미지 URL 또는 경로 입력
        id: '아까리',
        cardNo: '1747824562'
    },
    'vip2': {
        background: 'url("https://i.imgur.com/your-vip2-image.png")', // 여기에 실제 이미지 URL 또는 경로 입력
        id: '베르사체',
        cardNo: '2345678901'
    },
    'vip3': {
        background: 'url("https://i.imgur.com/your-vip3-image.png")', // 여기에 실제 이미지 URL 또는 경로 입력
        id: '샤넬리아',
        cardNo: '3456789012'
    }
};

let currentVipCard = 'vip1'; // 현재 활성화된 VIP 카드

function updateVipCardDisplay(cardId) {
    const display = document.getElementById('vip-card-display');
    const idSpan = document.getElementById('vip-id');
    const cardNoSpan = document.getElementById('vip-cardno');

    const data = vipCardData[cardId];
    if (data) {
        display.style.backgroundImage = data.background;
        idSpan.textContent = data.id;
        cardNoSpan.textContent = data.cardNo;
        currentVipCard = cardId;

        // 로컬 스토리지에서 저장된 값 로드 (있다면)
        idSpan.textContent = localStorage.getItem(`vip_${cardId}_id`) || data.id;
        cardNoSpan.textContent = localStorage.getItem(`vip_${cardId}_cardNo`) || data.cardNo;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    window.downloadImage = downloadImage; 

    // 상단 VIP 메뉴 탭 클릭 이벤트
    const vipMenus = document.querySelectorAll(".top-menu .menu");
    vipMenus.forEach(menu => {
        menu.addEventListener("click", (event) => {
            // 모든 메뉴의 active 클래스 제거
            vipMenus.forEach(m => m.classList.remove('active'));
            // 클릭된 메뉴에 active 클래스 추가
            event.target.classList.add('active');

            const cardId = event.target.dataset.card;
            updateVipCardDisplay(cardId);
        });
    });

    // 편집 가능한 텍스트 필드 변경 시 로컬 스토리지에 저장
    const idSpan = document.getElementById('vip-id');
    const cardNoSpan = document.getElementById('vip-cardno');

    idSpan.addEventListener('input', (e) => {
        localStorage.setItem(`vip_${currentVipCard}_id`, e.target.textContent);
    });
    cardNoSpan.addEventListener('input', (e) => {
        localStorage.setItem(`vip_${currentVipCard}_cardNo`, e.target.textContent);
    });

    // 초기 VIP 카드 디스플레이 설정 (첫 번째 VIP 카드)
    updateVipCardDisplay(currentVipCard);

    // .setting-panel을 VIP 카드 기능에서는 숨김 (필요한 경우만 보이도록)
    document.querySelector('.setting-panel').style.display = 'block'; // VIP 카드 기능에 다운로드 버튼이 있으므로 보이도록 설정
});
