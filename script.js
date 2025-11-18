document.addEventListener("DOMContentLoaded", () => {
    // 왼쪽 메뉴 active 토글
    const leftItems = document.querySelectorAll(".left-item");
    leftItems.forEach(item => {
        item.addEventListener("click", () => {
            document.querySelector(".left-item.active")?.classList.remove("active");
            item.classList.add("active");
        });
    });

    // 컬러 입력 요소들 ID 매칭
    const headerBg = document.getElementById("headerBgColor");
    const headerText = document.getElementById("headerTextColor");
    const rowBg = document.getElementById("rowBgColor");
    const rowText = document.getElementById("rowTextColor");

    // ★ 특정 셀 색상 컬러 입력 요소 ID 매칭 ★
    const colNum = document.getElementById("colNumColor");
    const colSelect = document.getElementById("colSelectColor");
    const colService = document.getElementById("colServiceColor");
    // ----------------------------------------

    // 제목 입력 요소 ID 매칭
    const titleInput = document.getElementById("titleInput");
    const titleElement = document.querySelector(".title");

    // 헬퍼: 안전하게 CSS 변수 설정
    function setVar(name, value) {
        document.documentElement.style.setProperty(name, value);
    }

    // --- 이벤트 리스너 설정 ---

    // 1. 일반 테이블 색상 변경 이벤트 리스너
    if (headerBg) headerBg.addEventListener("input", e => setVar('--table-header-bg', e.target.value));
    if (headerText) headerText.addEventListener("input", e => setVar('--table-header-text', e.target.value));
    if (rowBg) rowBg.addEventListener("input", e => setVar('--table-row-bg', e.target.value));
    if (rowText) rowText.addEventListener("input", e => setVar('--table-row-text', e.target.value));

    // 2. ★ 특정 셀 색상 변경 이벤트 리스너 ★
    if (colNum) colNum.addEventListener("input", e => setVar('--col-num-color', e.target.value));
    if (colSelect) colSelect.addEventListener("input", e => setVar('--col-select-color', e.target.value));
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
