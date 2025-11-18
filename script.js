document.addEventListener("DOMContentLoaded", () => {
    // 왼쪽 메뉴 active 토글
    const leftItems = document.querySelectorAll(".left-item");
    leftItems.forEach(item => {
        item.addEventListener("click", () => {
            document.querySelector(".left-item.active")?.classList.remove("active");
            item.classList.add("active");
        });
    });

    // 컬러 입력 요소들
    const headerBg = document.getElementById("headerBgColor");
    const headerText = document.getElementById("headerTextColor");
    const rowBg = document.getElementById("rowBgColor");
    const rowText = document.getElementById("rowTextColor");

    // 존재 여부 확인 (문제 원인 찾기 쉬움)
    if (!headerBg || !headerText || !rowBg || !rowText) {
        console.warn("컬러 입력 요소가 하나 이상 없습니다. HTML에서 id를 확인하세요.");
    }

    // 헬퍼: 안전하게 프로퍼티 설정
    function setVar(name, value) {
        document.documentElement.style.setProperty(name, value);
    }

    if (headerBg) headerBg.addEventListener("input", e => setVar('--table-header-bg', e.target.value));
    if (headerText) headerText.addEventListener("input", e => setVar('--table-header-text', e.target.value));
    if (rowBg) rowBg.addEventListener("input", e => setVar('--table-row-bg', e.target.value));
    if (rowText) rowText.addEventListener("input", e => setVar('--table-row-text', e.target.value));
});
