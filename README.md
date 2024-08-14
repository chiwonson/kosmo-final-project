## Bread Tour

KOSMO 142기 final project

24.07.15 ~ 24.08.25

팀명   : i5

팀     : 손치원 이경원 장윤수 원유경

## 프로젝트 소개

주제    : 빵을 좋아하는 사람들을 위한 홈페이지

## 사용된 기술 스택
사용 툴
<img src="https://img.shields.io/badge/java-007396?style=for-the-badge&logo=OpenJDK&logoColor=white"> 
<img src="https://img.shields.io/badge/Spring-6DB33F?style=for-the-badge&logo=Spring&logoColor=white"> 
<img src="https://img.shields.io/badge/Javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=FFF"/> 
<img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=FFF"/>
<img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=FFF"/> 
![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)

데이터베이스
<img src="https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=MySQL&logoColor=white">
<img src="https://img.shields.io/badge/mongodb-47A248?style=for-the-badge&logo=mongodb&logoColor=white">

형상관리
<img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white">
<img src="https://img.shields.io/badge/notion-000000?style=for-the-badge&logo=notion&logoColor=white">

## 구현할 기능

로그인 시스템 

웨이팅 시스템 

실시간 시스템

추천 시스템 

판매 시스템

# 프로젝트 구조

📦kosmo-final-project<br>
 📦BreadTour
 ┣ 📂.mvn
 ┣ 📂src
 ┃ ┗ 📂main
 ┃ ┃ ┣ 📂java
 ┃ ┃ ┃ ┗ 📂BreadTour
 ┃ ┃ ┃ ┃ ┣ 📂config
 ┃ ┃ ┃ ┃ ┣ 📂controller
 ┃ ┃ ┃ ┃ ┣ 📂domain
 ┃ ┃ ┃ ┃ ┣ 📂dto
 ┃ ┃ ┃ ┃ ┣ 📂example
 ┃ ┃ ┃ ┃ ┃ ┗ 📂demo
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂controller
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂mapper
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂model
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📂service
 ┃ ┃ ┃ ┃ ┣ 📂repository
 ┃ ┃ ┃ ┃ ┣ 📂service
 ┃ ┃ ┃ ┃ ┣ 📜BreadTourApplication.java
 ┃ ┃ ┃ ┃ ┣ 📜CorsConfig.java
 ┃ ┃ ┃ ┃ ┗ 📜TestApplication.java
 ┃ ┃ ┗ 📂resources
 ┃ ┃ ┃ ┣ 📂mapper
 ┃ ┃ ┃ ┣ 📂static
 ┃ ┃ ┃ ┃ ┣ 📂css
 ┃ ┃ ┃ ┃ ┣ 📂icons
 ┃ ┃ ┃ ┃ ┣ 📂images
 ┃ ┃ ┃ ┃ ┣ 📂img
 ┃ ┃ ┃ ┃ ┣ 📂js
 ┃ ┃ ┃ ┃ ┣ 📂videos
 ┃ ┃ ┃ ┃ ┣ 📂resources
 ┃ ┃ ┃ ┃ ┣ 📜order-success.html
 ┃ ┃ ┃ ┃ ┗ 📜script.js
 ┃ ┃ ┃ ┣ 📂templates
 ┃ ┃ ┃ ┗ 📜application.properties
 ┣ 📂target
 ┣ 📜HELP.md
 ┣ 📜mvnw
 ┣ 📜mvnw.cmd
 ┣ 📜pom.xml
 ┗ 📜pop.xml
📦python
 ┗ 📂app
 ┃ ┣ 📂static
 ┃ ┃ ┣ 📂css
 ┃ ┃ ┣ 📂icons
 ┃ ┃ ┣ 📂images
 ┃ ┃ ┣ 📂js
 ┃ ┣ 📂templates
 ┃ ┣ 📂uploads
 ┃ ┣ 📂website
 ┃ ┃ ┣ 📂main
 ┃ ┃ ┃ ┗ 📜routes.py
 ┃ ┃ ┗ 📜__init__.py
 ┃ ┣ 📂__pycache__
 ┃ ┃ ┗ 📜app.cpython-39.pyc
 ┃ ┣ 📜app.py
 ┃ ┣ 📜main.py
 ┃ ┗ 📜__init__.py
📦Reservation_React
┗ 📂bakeryimg
┗ 📂node_modules
┗ 📂reserv
 ┃ ┗ 📂public
 ┃ ┗ 📂server
 ┃ ┗ 📂src
 ┃ ┃ ┣ 📂css
 ┃ ┃ ┣ 📂js
 ┃ ┃ ┣ 📂layout
 ┃ ┃ ┣ 📂resources
 ┃ ┃ ┣ 📂routes
 ┃ ┃ ┃  ┣ 📜Datepick.jsx
 ┃ ┃ ┃  ┣ 📜ReservDetail.jsx
 ┃ ┃ ┃  ┣ 📜ReservInsert.jsx
 ┃ ┃ ┃  ┣ 📜ReservMain.jsx
 ┃ ┃ ┣ 📜app.jsx
 ┃ ┃ ┣ 📜index.jsx
 ┃ ┃ ┣ 📜setupProxy.js


# kosmo final project notion

https://www.notion.so/5i-e141addddc0c4ef0916789a9d9b147ec?pvs=4

#<a href="https://hits.seeyoufarm.com"><img src="https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fgithub.com%2Fchiwonson%2Fkosmo-final-project&count_bg=%2379C83D&title_bg=%23555555&icon=&icon_color=%23E7E7E7&title=hits&edge_flat=false"/></a>            
