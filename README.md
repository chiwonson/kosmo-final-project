## Bread Tour

KOSMO 142기 final project

24.07.15 ~ 24.08.25

팀명   : i5

팀     : 손치원 이경원 장윤수 원유경

## 프로젝트 소개

주제    : 빵을 좋아하는 사람들을 위한 홈페이지

## 사용된 기술 스택
사용 툴

언어<br>
<img src="https://img.shields.io/badge/java-007396?style=for-the-badge&logo=OpenJDK&logoColor=white">
![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)

프레임워크<br>
<img src="https://img.shields.io/badge/Spring-6DB33F?style=for-the-badge&logo=Spring&logoColor=white">
<img src="https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=Flask&logoColor=white">

서버 클라이언트 언어<br>
<img src="https://img.shields.io/badge/Javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=FFF"/> 
<img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=FFF"/>
<img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=FFF"/> 

데이터베이스<br>
<img src="https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=MySQL&logoColor=white">
<img src="https://img.shields.io/badge/mongodb-47A248?style=for-the-badge&logo=mongodb&logoColor=white">

형상관리<br>
<img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white">

스케줄/테스크 관리<br>
<img src="https://img.shields.io/badge/notion-000000?style=for-the-badge&logo=notion&logoColor=white">

## 구현할 기능

로그인 시스템

웨이팅 시스템

실시간 시스템

추천 시스템

판매 시스템

# 프로젝트 구조

📦kosmo-final-project<br>
📦BreadTour<br>
 ┣ 📂.mvn<br>
 ┣ 📂src<br>
 ┃ ┗ 📂main<br>
 ┃ ┃ ┣ 📂java<br>
 ┃ ┃ ┃ ┗ 📂BreadTour<br>
 ┃ ┃ ┃ ┃ ┣ 📂config<br>
 ┃ ┃ ┃ ┃ ┣ 📂controller<br>
 ┃ ┃ ┃ ┃ ┣ 📂domain<br>
 ┃ ┃ ┃ ┃ ┣ 📂dto<br>
 ┃ ┃ ┃ ┃ ┣ 📂example<br>
 ┃ ┃ ┃ ┃ ┃ ┗ 📂demo<br>
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂controller<br>
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂mapper<br>
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂model<br>
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📂service<br>
 ┃ ┃ ┃ ┃ ┣ 📂repository<br>
 ┃ ┃ ┃ ┃ ┣ 📂service<br>
 ┃ ┃ ┃ ┃ ┣ 📜BreadTourApplication.java<br>
 ┃ ┃ ┃ ┃ ┣ 📜CorsConfig.java<br>
 ┃ ┃ ┃ ┃ ┗ 📜TestApplication.java<br>
 ┃ ┃ ┗ 📂resources<br>
 ┃ ┃ ┃ ┣ 📂mapper<br>
 ┃ ┃ ┃ ┣ 📂static<br>
 ┃ ┃ ┃ ┃ ┣ 📂css<br>
 ┃ ┃ ┃ ┃ ┣ 📂icons<br>
 ┃ ┃ ┃ ┃ ┣ 📂images<br>
 ┃ ┃ ┃ ┃ ┣ 📂img<br>
 ┃ ┃ ┃ ┃ ┣ 📂js<br>
 ┃ ┃ ┃ ┃ ┣ 📂videos<br>
 ┃ ┃ ┃ ┃ ┣ 📂resources<br>
 ┃ ┃ ┃ ┃ ┣ 📜order-success.html<br>
 ┃ ┃ ┃ ┃ ┗ 📜script.js<br>
 ┃ ┃ ┃ ┣ 📂templates<br>
 ┃ ┃ ┃ ┗ 📜application.properties<br>
 ┣ 📂target<br>
 ┣ 📜HELP.md<br>
 ┣ 📜mvnw<br>
 ┣ 📜mvnw.cmd<br>
 ┣ 📜pom.xml<br>
 ┗ 📜pop.xml<br>
📦python<br>
 ┗ 📂app<br>
 ┃ ┣ 📂static<br>
 ┃ ┃ ┣ 📂css<br>
 ┃ ┃ ┣ 📂icons<br>
 ┃ ┃ ┣ 📂images<br>
 ┃ ┃ ┣ 📂js<br>
 ┃ ┣ 📂templates<br>
 ┃ ┣ 📂uploads<br>
 ┃ ┣ 📂website<br>
 ┃ ┃ ┣ 📂main<br>
 ┃ ┃ ┃ ┗ 📜routes.py<br>
 ┃ ┃ ┗ 📜__init__.py<br>
 ┃ ┣ 📂__pycache__<br>
 ┃ ┃ ┗ 📜app.cpython-39.pyc<br>
 ┃ ┣ 📜app.py<br>
 ┃ ┣ 📜main.py<br>
 ┃ ┗ 📜__init__.py<br>
📦Reservation_React<br>
┗ 📂bakeryimg<br>
┗ 📂node_modules<br>
┗ 📂reserv<br>
 ┃ ┗ 📂public<br>
 ┃ ┗ 📂server<br>
 ┃ ┗ 📂src<br>
 ┃ ┃ ┣ 📂css<br>
 ┃ ┃ ┣ 📂js<br>
 ┃ ┃ ┣ 📂layout<br>
 ┃ ┃ ┣ 📂resources<br>
 ┃ ┃ ┣ 📂routes<br>
 ┃ ┃ ┃  ┣ 📜Datepick.jsx<br>
 ┃ ┃ ┃  ┣ 📜ReservDetail.jsx<br>
 ┃ ┃ ┃  ┣ 📜ReservInsert.jsx<br>
 ┃ ┃ ┃  ┣ 📜ReservMain.jsx<br>
 ┃ ┃ ┣ 📜app.jsx<br>
 ┃ ┃ ┣ 📜index.jsx<br>
 ┃ ┃ ┣ 📜setupProxy.js<br>


# kosmo final project notion

https://silk-archer-1eb.notion.site/5i-e141addddc0c4ef0916789a9d9b147ec

#<a href="https://hits.seeyoufarm.com"><img src="https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fgithub.com%2Fchiwonson%2Fkosmo-final-project&count_bg=%2379C83D&title_bg=%23555555&icon=&icon_color=%23E7E7E7&title=hits&edge_flat=false"/></a>            
