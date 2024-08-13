// main.js

document.addEventListener('DOMContentLoaded', () => {
    console.log('JavaScript 파일이 로드되었습니다.');
    
    // 예시: 버튼 클릭 이벤트 추가
    const buttons = document.querySelectorAll('.btnset');
    buttons.forEach(button => {
      button.addEventListener('click', () => {
        alert('버튼이 클릭되었습니다!');
      });
    });
  });
  