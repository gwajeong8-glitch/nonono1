// 안전한 바인딩과 초기화
document.addEventListener("DOMContentLoaded", () => {
const setVar = (name, value) => document.documentElement.style.setProperty(name, value);


const bind = (id, variable) => {
const el = document.getElementById(id);
if (!el) return console.warn(`Element #${id} not found`);
el.addEventListener('input', e => setVar(variable, e.target.value));
};


// 표 전체 색상
bind('headerBgColor', '--table-header-bg');
bind('headerTextColor', '--table-header-text');
bind('rowBgColor', '--table-row-bg');
bind('rowTextColor', '--table-row-text');


// 번호/유형(cell) 색상 (배경 + 글자)
bind('leftNumberBg', '--left-number-bg');
bind('leftNumberText', '--left-number-text');
bind('typeBg', '--type-select-bg');
bind('typeText', '--type-select-text');


// 매진(글자만)
bind('soldoutColor', '--soldout-text-color');


// 왼쪽 메뉴 active 토글
document.querySelectorAll('.left-item').forEach(item => {
item.addEventListener('click', () => {
document.querySelector('.left-item.active')?.classList.remove('active');
item.classList.add('active');
});
});


// 초기값을 CSS 변수에 세팅 (input의 기본값을 적용)
document.querySelectorAll('.color-panel input[type=color]').forEach(inp => {
setVar('--' + (inp.id.replace(/[A-Z]/g, m => '-' + m.toLowerCase())), inp.value);
});
});
