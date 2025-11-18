document.addEventListener("DOMContentLoaded", () => {
    // ----------------------------------------------------
    // 1. 설정 저장 및 불러오기 로직 정의
    // ----------------------------------------------------

    // 헬퍼: 안전하게 CSS 변수 설정
    function setVar(name, value) {
        document.documentElement.style.setProperty(name, value);
    }
    
    // 헬퍼: 로컬 스토리지에 설정 저장 (자동 저장)
    function saveSetting(key, value) {
        if (value) {
            localStorage.setItem(key, value);
        }
    }

    // 헬퍼: 로컬 스토리지에서 설정 불러오기 및 적용
    function loadSettings() {
        const settings = {
            // 일반 색상
            '--table-header-bg': "headerBgColor",
            '--table-header-text': "headerTextColor",
            '--table-row-bg': "rowBgColor",
            '--table-row-text': "rowTextColor",
            // 특정 셀 색상
            '--col-num-text-color': "colNumTextColor",
            '--col-num-bg-color': "colNumBgColor",
            '--col-select-text-color': "colSelectTextColor",
            '--col-select-bg-color': "colSelectBgColor",
            '--col-service-color': "colServiceColor",
        };

        // 1. 색상 설정 불러오기
        for (const cssVar in settings) {
            const inputId = settings[cssVar];
            const storedValue = localStorage.getItem(inputId);
            const inputElement = document.getElementById(inputId);

            if (storedValue) {
                setVar(cssVar, storedValue);
                if (inputElement) {
                    inputElement.value = storedValue;
                }
            }
        }
        
        // 2. 제목 설정 불러오기
        const titleElement = document.querySelector(".title");
        const storedTitle = localStorage.getItem("titleSetting");
        if (storedTitle && titleElement) {
            titleElement.textContent = storedTitle;
            const titleInput = document.getElementById("titleInput");
            if (titleInput) {
                titleInput.value = storedTitle;
            }
        }
    }
    
    // 페이지 로드 시 설정 불러오기
    loadSettings();

    // ----------------------------------------------------
    // 2. 초기화 및 이벤트 리스너 설정 (저장 로직 추가)
    // ----------------------------------------------------

    // 왼쪽 메뉴 active 토글
    const leftItems = document.querySelectorAll(".left-item");
    leftItems.forEach(item => {
        item.addEventListener("click", () => {
            document.querySelector(".left-item.active")?.classList.remove("active");
            item.classList.add("active");
        });
    });

    // 컬러 입력 요소 ID 매칭
    const headerBg = document.getElementById("headerBgColor");
    const headerText = document.getElementById("headerTextColor");
    const rowBg = document.getElementById("rowBgColor");
    const rowText = document.getElementById("rowTextColor");
    const colNumText = document.getElementById("colNumTextColor");
    const colNumBg = document.getElementById("colNumBgColor");
    const colSelectText = document.getElementById("colSelectTextColor");
    const colSelectBg = document.getElementById("colSelectBgColor");
    const colService = document.getElementById("colServiceColor"); 
    
    // 제목 입력 요소 ID 매칭
    const titleInput = document.getElementById("titleInput");
    const titleElement = document.querySelector(".title");

    // ★ 컬러 팔레트 로직 ★
    const colorPaletteElement = document.querySelector(".color-palette");
    const presetColors = [
        '#FF0000', '#0000FF', '#008000', '#FFFF00', '#FFA500', 
        '#800080', '#00FFFF', '#FFC0CB', '#FFFFFF', '#000000', 
        '#808080', '#A52A2A', '#00FF00', '#FFD700', '#FF4500',
        '#9932CC', '#4682B4', '#DAA520', '#2F4F4F', '#00BFFF'
    ];
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
                activeColorInput.value = color; 
                activeColorInput.dispatchEvent(event); 
            }
        });
        colorPaletteElement.appendChild(swatch);
    });

    // 2. 모든 컬러 입력 필드에 'focus' 이벤트 리스너 추가
    const colorInputs = document.querySelectorAll('.color-panel input[type="color"]');
    colorInputs.forEach(input => {
        input.addEventListener('focus', () => {
            activeColorInput = input;
        });
        input.parentElement.addEventListener('click', () => {
            input.focus();
        });
    });

    // --- 이벤트 리스너 설정 (저장 로직 통합) ---
    
    // 1. 일반 테이블 색상 변경 이벤트 리스너
    if (headerBg) headerBg.addEventListener("input", e => { setVar('--table-header-bg', e.target.value); saveSetting('headerBgColor', e.target.value); });
    if (headerText) headerText.addEventListener("input", e => { setVar('--table-header-text', e.target.value); saveSetting('headerTextColor', e.target.value); });
    if (rowBg) rowBg.addEventListener("input", e => { setVar('--table-row-bg', e.target.value); saveSetting('rowBgColor', e.target.value); });
    if (rowText) rowText.addEventListener("input", e => { setVar('--table-row-text', e.target.value); saveSetting('rowTextColor', e.target.value); });

    // 2. 특정 셀 색상 변경 이벤트 리스너
    if (colNumText) colNumText.addEventListener("input", e => { setVar('--col-num-text-color', e.target.value); saveSetting('colNumTextColor', e.target.value); });
    if (colNumBg) colNumBg.addEventListener("input", e => { setVar('--col-num-bg-color', e.target.value); saveSetting('colNumBgColor', e.target.value); });
    if (colSelectText) colSelectText.addEventListener("input", e => { setVar('--col-select-text-color', e.target.value); saveSetting('colSelectTextColor', e.target.value); });
    if (colSelectBg) colSelectBg.addEventListener("input", e => { setVar('--col-select-bg-color', e.target.value); saveSetting('colSelectBgColor', e.target.value); });
    if (colService) colService.addEventListener("input", e => { setVar('--col-service-color', e.target.value); saveSetting('colServiceColor', e.target.value); });

    // 3. 제목 변경 이벤트 리스너
    if (titleInput && titleElement) {
        titleInput.addEventListener("input", (e) => {
            const newTitle = e.target.value || "실시간 데이터 현황";
            titleElement.textContent = newTitle;
            saveSetting('titleSetting', newTitle);
        });
    } else {
        console.warn("제목 입력 필드 또는 제목 엘리먼트를 찾을 수 없습니다.");
    }
});
