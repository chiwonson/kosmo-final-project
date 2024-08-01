from flask import Flask, render_template, session, url_for, request, redirect
import pymysql

app = Flask(__name__)
app.secret_key = 'your_secret_key'  # Flask 세션을 사용하기 위해 필요한 시크릿 키

def connectsql():
    conn = pymysql.connect(host='localhost', user='root', passwd='admin1234')
    return conn

@app.route('/')
def welcome():
    if 'username' in session:
        username = session['username']
        return render_template('welcome.html', logininfo=username)
    else:
        username = None
        return render_template('welcome.html', logininfo=username)

@app.route('/login')
def login():
    # 로그인 페이지 렌더링 로직 추가
    pass

@app.route('/register')
def register():
    # 회원가입 페이지 렌더링 로직 추가
    pass

@app.route('/main')
def main():
    return render_template('main.html')  # 'main.html' 템플릿을 반환


@app.route('/logout')
def logout():
    session.pop('username', None)
    return redirect(url_for('welcome'))

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=False)

"""

app.py: Flask 애플리케이션의 설정 및 라우트를 정의합니다.
main.py: 애플리케이션을 실행하는 스크립트로, app.py를 임포트하여 서버를 시작합니다.

"""