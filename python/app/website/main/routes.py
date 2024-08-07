# website/main/routes.py
from flask import Blueprint, render_template, session, url_for, request, redirect

main_routes = Blueprint('main', __name__)

@main_routes.route('/redirect-to-springboot')
def welcome():
    if 'username' in session:
        username = session['username']
        return render_template('http://localhost:8083/welcome', logininfo=username)
    else:
        username = None
        return render_template('http://localhost:8083/welcome', logininfo=username)

@main_routes.route('http://localhost:8083/login')
def login():
    # 로그인 페이지 렌더링 로직 추가
    pass

@main_routes.route('/redirect-to-springboot')
def register():
    # 회원가입 페이지 렌더링 로직 추가
    pass

@main_routes.route('/main')
def main():
    return render_template('http://localhost:8083/main')  # 'main.html' 템플릿을 반환

@main_routes.route('/logout')
def logout():
    session.pop('username', None)
    return redirect(url_for('main.welcome'))
