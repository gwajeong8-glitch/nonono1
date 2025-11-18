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

    // ★ 특정 셀 색상 컬러 입력 요소 ID 매칭 ★
    const colNumText = document.getElementById("colNumTextColor");
    const colNumBg = document.getElementById("colNumBgColor");
    const colSelectText = document.getElementById("colSelectTextColor");
    const colSelectBg = document.getElementById("colSelectBgColor");
    // (매진 글자 색상 컨트롤러는 CSS 고정으로 인해 제거됨)
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
    // 번호 셀
    if (colNumText) colNumText.addEventListener("input", e => setVar('--col-num-text-color', e.target.value));
    if (colNumBg) colNumBg.addEventListener("input", e => setVar('--col-num-bg-color', e.target.value));
    // 선택 유형 셀
    if (colSelectText) colSelectText.addEventListener("input", e => setVar('--col-select-text-color', e.target.value));
    if (colSelectBg) colSelectBg.addEventListener("input", e => setVar('--col-select-bg-color', e.target.value));
    // (매진은 CSS에 개별 색상으로 고정되어 JS 컨트롤러 없음)

    // 3. 제목 변경 이벤트 리스너
    if (titleInput && titleElement) {
        titleInput.addEventListener("input", (e) => {
            titleElement.textContent = e.target.value || "실시간 데이터 현황";
        });
    } else {
        console.warn("제목 입력 필드 또는 제목 엘리먼트를 찾을 수 없습니다.");
    }
});
