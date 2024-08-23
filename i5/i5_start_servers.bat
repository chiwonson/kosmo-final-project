@echo off

REM Spring Boot 서버 실행 (Maven 빌드 및 실행)
start cmd /k "cd /d C:\Users\kosmo\Desktop\kosmo-final-project-master\kosmo-final-project-master\i5\BreadTour && mvn clean install && java -jar target/demo-0.0.1-SNAPSHOT.jar"

REM React 서버 1 실행
start cmd /k "cd /d C:\Users\kosmo\Desktop\kosmo-final-project-master\kosmo-final-project-master\i5\Reservation_React\reserv\server && npx nodemon servers.js"

REM React 서버 2 실행 (관리자모드)
start cmd /k "cd /d C:\Users\kosmo\Desktop\kosmo-final-project-master\kosmo-final-project-master\i5\Reservation_React\reserv && npm start"

REM Flask 서버 실행
start cmd /k "cd /d C:\Users\kosmo\Desktop\kosmo-final-project-master\kosmo-final-project-master\i5\python\app && python app.py"

pause
