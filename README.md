* 동영상 첨부 및 기타내용 확인 : https://ba-gotocode131.tistory.com/201?category=1058270

[영어단어장 version2.0] 단어장 기능 및 로그인 보완, sns 기능 추가

[개선점]
* version 1의 단점

- 기존 : js 파일에 mysql 쿼리를 등록, 다른 방법은 없을까? 

▶ 변경 :  시퀄라이즈 사용 (장점 : 데이터 삭제 및 테이블 생성 시 유용)

▶ 변경 : 특히 join등을 통해 user의 정보로 posts나 words의 정보를 가져올 수 있음

 

* 기존: html 내에서 작업 중 일부 데이터에 바로 적용하는 것에 어려움 겪음

▶ 변경 :  nunjucks 사용해 적용해보기({{}}를 통해 변수의 값을 넘길 수 있음)

 

* 기존 : 로그인, 회원가입 : JWT토큰 

▶ 변경 :  bcrypt로 비밀번호 설정 및 Passport 사용 

▶ 변경 :  카카오톡 로그인 및 로그인/비로그인 여부 미들웨어 설정함

 

* 변경된 단어장 기능

- 기존 : 단어 체크박스 선택 시 개별 항목들만 선택 가능

▶ 변경 : "모든 체크박스 체크" 항목 추가

- 기존 : 단어 삭제 누를 경우 status만 "D"로 변경되고 최종 삭제되지 않음

▶ 변경 : 단어 삭제 후 하단의 "삭제된 단어 확인하기"에서 최종 단어 삭제 가능
