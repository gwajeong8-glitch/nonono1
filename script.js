document.addEventListener("DOMContentLoaded", () => {

    // 왼쪽 메뉴 active 적용
    document.querySelectorAll(".left-item").forEach(item => {
        item.addEventListener("click", () => {
            document.querySelector(".left-item.active")?.classList.remove("active");
            item.classList.add("active");
        });
    });

    // CSS 변수 변경 함수
    const setVar = (name, value) => {
        document.documentElement.style.setProperty(name, value);
    };

    // 표 컬러
    document.getElementById("headerBgColor").addEventListener("input", e => setVar('--table-header-bg', e.target.value));
    document.getElementById("headerTextColor").addEventListener("input", e => setVar('--table-header-text', e.target.value));
    document.getElementById("rowBgColor").addEventListener("input", e => setVar('--table-row-bg', e.target.value));
    document.getElementById("rowTextColor").addEventListener("input", e => setVar('--table-row-text', e.target.value));

    // 번호/유형/매진 컬러 개별 설정
    document.getElementById("leftNumberColor").addEventListener("input", e => setVar('--left-number-color', e.target.value));
    document.getElementById("typeSelectColor").addEventListener("input", e => setVar('--type-select-color', e.target.value));
    document.getElementById("soldoutColor").addEventListener("input", e => setVar('--soldout-text-color', e.target.value));

});
