// ==========================================================
// 이미지 다운로드 함수 (html2canvas 사용)
// ==========================================================
function downloadImage(elementId) {
    const captureElement = document.getElementById(elementId); 

    // 로딩 표시 및 버튼 비활성화
    const button = document.querySelector('.download-button');
    const originalText = button.textContent;
    button.textContent = '이미지 생성 중... 잠시만 기다려주세요.';
    button.disabled = true;

    html2canvas(captureElement, {
        scale: 2, /* 2배 크기로 고화질 캡처 */
        allowTaint: true,
        useCORS: true
    }).then(canvas => {
        const image = canvas.toDataURL('image/png');

        const a = document.createElement('a');
        a.href = image;
        a.download = `${elementId}_capture.png`; 
        
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

// VIP 카드 데이터 (스타일 정보 추가 및 확장자 .jpg로 수정)
const vipCardData = {
    'vip1': {
        background: 'url("vip1.jpg")', // .jpg로 수정
        id: '아까리',
        cardNo: '1747824562',
        style: {
            posX: 380,
            posY: 40,
            fontSize: 20,
            fontColor: '#ffffff'
        }
    },
    'vip2': {
        background: 'url("vip2.jpg")', // .jpg로 수정
        id: '베르사체',
        cardNo: '2345678901',
        style: {
            posX: 400, // 카드 2는 다른 위치 기본값
            posY: 50,
            fontSize: 22,
            fontColor: '#ffdd66' // 카드 2는 다른 색상 기본값
        }
    },
    'vip3': {
        background: 'url("vip3.jpg")', // .jpg로 수정
        id: '샤넬리아',
        cardNo: '3456789012',
        style: {
            posX: 420,
            posY: 60,
            fontSize: 18,
            fontColor: '#cccccc'
        }
    }
};

let currentVipCard = 'vip1'; 

// 헬퍼 함수: 스타일을 적용하고 로컬 스토리지에 저장
function applyStyle(prop, value) {
    const overlay = document.querySelector('.vip-text-overlay');
    if (prop === 'posX') {
        overlay.style.left = `${value}px`;
        localStorage.setItem(`vip_${currentVipCard}_posX`, value);
    } else if (prop === 'posY') {
        overlay.style.bottom = `${value}px`;
        localStorage.setItem(`vip_${currentVipCard}_posY`, value);
    } else if (prop === 'fontSize') {
        overlay.style.fontSize = `${value}px`;
        localStorage.setItem(`vip_${currentVipCard}_fontSize`, value);
    } else if (prop === 'fontColor') {
        overlay.style.color = value;
        localStorage.setItem(`vip_${currentVipCard}_fontColor`, value);
    }
}

function updateVipCardDisplay(cardId) {
    const display = document.getElementById('vip-card-display');
    const idSpan = document.getElementById('vip-id');
    const cardNoSpan = document.getElementById('vip-cardno');
    const data = vipCardData[cardId];
    
    const posXInput = document.getElementById('posX');
    const posYInput = document.getElementById('posY');
    const fontSizeInput = document.getElementById('fontSize');
    const fontColorInput = document.getElementById('fontColor');

    if (data) {
        display.style.backgroundImage = data.background;
        currentVipCard = cardId;

        // 1. 텍스트 내용 로드 및 적용
        const loadedId = localStorage.getItem(`vip_${cardId}_id`) || data.id;
        const loadedCardNo = localStorage.getItem(`vip_${cardId}_cardNo`) || data.cardNo;
        idSpan.textContent = loadedId;
        cardNoSpan.textContent = loadedCardNo;

        // 2. 스타일 설정 로드 (Local Storage 우선)
        const loadedPosX = localStorage.getItem(`vip_${cardId}_posX`) || data.style.posX;
        const loadedPosY = localStorage.getItem(`vip_${cardId}_posY`) || data.style.posY;
        const loadedFontSize = localStorage.getItem(`vip_${cardId}_fontSize`) || data.style.fontSize;
        const loadedFontColor = localStorage.getItem(`vip_${cardId}_fontColor`) || data.style.fontColor;
        
        // 3. UI 인풋에 반영
        posXInput.value = loadedPosX;
        posYInput.value = loadedPosY;
        fontSizeInput.value = loadedFontSize;
        fontColorInput.value = loadedFontColor;

        // 4. CSS에 적용
        applyStyle('posX', loadedPosX);
        applyStyle('posY', loadedPosY);
        applyStyle('fontSize', loadedFontSize);
        applyStyle('fontColor', loadedFontColor);
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

    // 텍스트 내용 편집 이벤트 (로컬 스토리지에 저장)
    const idSpan = document.getElementById('vip-id');
    const cardNoSpan = document.getElementById('vip-cardno');

    idSpan.addEventListener('input', (e) => {
        localStorage.setItem(`vip_${currentVipCard}_id`, e.target.textContent);
    });
    cardNoSpan.addEventListener('input', (e) => {
        localStorage.setItem(`vip_${currentVipCard}_cardNo`, e.target.textContent);
    });

    // --- 새로운 스타일 컨트롤 이벤트 리스너 추가 ---
    const posXInput = document.getElementById('posX');
    const posYInput = document.getElementById('posY');
    const fontSizeInput = document.getElementById('fontSize');
    const fontColorInput = document.getElementById('fontColor');

    posXInput.addEventListener('input', (e) => applyStyle('posX', e.target.value));
    posYInput.addEventListener('input', (e) => applyStyle('posY', e.target.value));
    fontSizeInput.addEventListener('input', (e) => applyStyle('fontSize', e.target.value));
    fontColorInput.addEventListener('input', (e) => applyStyle('fontColor', e.target.value));


    // 초기 VIP 카드 디스플레이 설정 (첫 번째 VIP 카드)
    updateVipCardDisplay(currentVipCard);
});
