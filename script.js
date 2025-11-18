document.addEventListener("DOMContentLoaded", () => {
    // 왼쪽 메뉴 active 토글
    const leftItems = document.querySelectorAll(".left-item");
    leftItems.forEach(item => {
        item.addEventListener("click", () => {
            document.querySelector(".left-item.active")?.classList.remove("active");
            item.classList.add("active");
        });
    });

    // 일반 컬러 입력 요소 ID 매칭
    const headerBg = document.getElementById("headerBgColor");
    const headerText = document.getElementById("headerTextColor");
    const rowBg = document.getElementById("rowBgColor");
    const rowText = document.getElementById("rowTextColor");

    // 특정 셀 색상 컬러 입력 요소 ID 매칭
    const colNumText = document.getElementById("colNumTextColor");
    const colNumBg = document.getElementById("colNumBgColor");
    const colSelectText = document.getElementById("colSelectTextColor");
    const colSelectBg = document.getElementById("colSelectBgColor");
    const colService = document.getElementById("colServiceColor"); 
    
    // 제목 입력 요소 ID 매칭
    const titleInput = document.getElementById("titleInput");
    const titleElement = document.querySelector(".title");

    // 헬퍼: 안전하게 CSS 변수 설정
    function setVar(name, value) {
        document.documentElement.style.setProperty(name, value);
    }

    // ★ 컬러 팔레트 로직 ★
    const colorPaletteElement = document.querySelector(".color-palette");
    // 자주 사용하는 20가지 색상 정의
    const presetColors = [
        '#FF0000', '#0000FF', '#008000', '#FFFF00', '#FFA500', 
        '#800080', '#00FFFF', '#FFC0CB', '#FFFFFF', '#000000', 
        '#808080', '#A52A2A', '#00FF00', '#FFD700', '#FF4500',
        '#9932CC', '#4682B4', '#DAA520', '#2F4F4F', '#00BFFF'
    ];

    // 현재 포커스된 색상 컨트롤러를 추적하는 변수 (기본값: 헤더 배경)
    let activeColorInput = headerBg;

    // 1. 색상 버튼 생성 및 추가
    presetColors.forEach(color => {
        const swatch = document.createElement('div');
        swatch.className = 'color-swatch';
        swatch.style.backgroundColor = color;
        swatch.dataset.color = color;
        
        swatch.addEventListener('click', () => {
            if (activeColorInput) {
                const event = new Event('input', { bubbles: true });
                activeColorInput.value = color; // input 값 변경
                activeColorInput.dispatchEvent(event); // input 이벤트 강제 실행
            }
        });
        colorPaletteElement.appendChild(swatch);
    });

    // 2. 모든 컬러 입력 필드에 'focus' 이벤트 리스너 추가
    // 사용자가 어떤 컬러 피커를 마지막으로 눌렀는지 추적
    const colorInputs = document.querySelectorAll('.color-panel input[type="color"]');
    colorInputs.forEach(input => {
        input.addEventListener('focus', () => {
            activeColorInput = input;
        });
        // 부모 label 클릭 시 해당 input에 포커스가 가게 만듭니다.
        input.parentElement.addEventListener('click', () => {
            input.focus();
        });
    });

    // --- 이벤트 리스너 설정 (기존 코드 유지) ---
    // 1. 일반 테이블 색상 변경 이벤트 리스너
    if (headerBg) headerBg.addEventListener("input", e => setVar('--table-header-bg', e.target.value));
    if (headerText) headerText.addEventListener("input", e => setVar('--table-header-text', e.target.value));
    if (rowBg) rowBg.addEventListener("input", e => setVar('--table-row-bg', e.target.value));
    if (rowText) rowText.addEventListener("input", e => setVar('--table-row-text', e.target.value));

    // 2. 특정 셀 색상 변경 이벤트 리스너
    if (colNumText) colNumText.addEventListener("input", e => setVar('--col-num-text-color', e.target.value));
    if (colNumBg) colNumBg.addEventListener("input", e => setVar('--col-num-bg-color', e.target.value));
    if (colSelectText) colSelectText.addEventListener("input", e => setVar('--col-select-text-color', e.target.value));
    if (colSelectBg) colSelectBg.addEventListener("input", e => setVar('--col-select-bg-color', e.target.value));
    if (colService) colService.addEventListener("input", e => setVar('--col-service-color', e.target.value));

    // 3. 제목 변경 이벤트 리스너
    if (titleInput && titleElement) {
        titleInput.addEventListener("input", (e) => {
            titleElement.textContent = e.target.value || "실시간 데이터 현황";
        });
    } else {
        console.warn("제목 입력 필드 또는 제목 엘리먼트를 찾을 수 없습니다.");
    }
});
