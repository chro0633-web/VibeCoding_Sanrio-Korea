/* =====================================================
   main.js - 메인 페이지 전용 기능
   메인 배너(.banner-image.pc-ver) 클릭 시
   상단 메뉴 배경색 변경 + 로고 360도 회전 (트랜지션 2초)
   ※ common.js 다음에 불러올 것
   ===================================================== */
   (function () {
    //대상선정
    //1. 이벤트 대상: 상단 배너 (.banner-image pc-ver)
    const 너를클릭해 = document.querySelector(".banner-image.pc-ver");
    //2. 변경 대상: 상단 영역 (.header-area-inner)
    const 나야나 = document.querySelector(".header-area-inner");
  
    //메인 배너/헤더가 없는 페이지에서는 아무것도 실행하지 않음
    if (!너를클릭해 || !나야나) return;
  
    //const는 상수 또는 함수를 담는 변수 선언
    //함수는 호출시 함수명(전달값) -> 소괄호 필수
    const 나야나함수 = (색상) => {
      나야나.style.backgroundColor = 색상;
      //회전은 로고가 하도록 변경 (.logo-box)
      나야나.style.transition = "2s ease-in-out";
      const 로고 = 나야나.querySelector(".logo-box");
      if (로고) {
        로고.style.rotate = "360deg";
        로고.style.transition = "4s ease-in-out";
      }
    };
    /////// 구분을 위해 함수 끝에 이런식으로 주석을 붙이기도..(쌤스타일) ///////
  
    //3. 이벤트 설정하기: 클릭 이벤트
    //클릭시 함수 호출은 바로 실행 안되게 화살표 함수로 표시
    너를클릭해.onclick = () => {
      //해당 요소의 클릭 이벤트가 발생하면 이 구역을 실행함
      나야나함수("orange");
    }; /////onclick 함수/////
  })();
  
  
  /* =====================================================
     플레이스 슬라이더 (바닐라 JS)
     2초 대기 → 다음 이미지가 오른쪽에서 1초간 들어옴 → 무한 반복
     ===================================================== */
  (function () {
    const 슬라이드들 = document.querySelectorAll(".place-slide");
    if (슬라이드들.length < 2) return;
  
    const 대기시간 = 2000; // 2초 후 이동 시작
    const 이동시간 = 1000; // 1초간 이동
  
    let 현재 = 0;
    let 층 = 1; // 새로 들어오는 슬라이드를 항상 맨 위로 올리기 위한 z-index 카운터
  
    // 처음엔 첫번째 이미지만 보이게: 나머지는 오른쪽 바깥에 대기
    슬라이드들.forEach((슬라이드, i) => {
      슬라이드.style.zIndex = i === 0 ? 1 : 0;
      슬라이드.style.transform = i === 0 ? "translateX(0)" : "translateX(100%)";
    });
  
    const 다음이동 = () => {
      const 다음 = (현재 + 1) % 슬라이드들.length;
      const 들어올놈 = 슬라이드들[다음];
  
      // 1) 트랜지션 없이 오른쪽 바깥에 두고, 맨 위로 올림
      들어올놈.style.transition = "none";
      들어올놈.style.transform = "translateX(100%)";
      들어올놈.style.zIndex = ++층;
      void 들어올놈.offsetWidth; // 강제 리플로우: 위 상태를 확정시켜야 아래 트랜지션이 작동
  
      // 2) 1초 동안 제자리로 이동
      들어올놈.style.transition = `transform ${이동시간}ms ease-in-out`;
      들어올놈.style.transform = "translateX(0)";
  
      현재 = 다음;
      // 3) 이동이 끝나면 2초 대기 후 다시 반복
      setTimeout(다음이동, 이동시간 + 대기시간);
    };
  
    setTimeout(다음이동, 대기시간);
  })();