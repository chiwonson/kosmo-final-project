
from flask import Flask, render_template, session, url_for, request, redirect


app = Flask(__name__)

def connectsql():
    conn=pymysql.connect(host='localhost', user='root', passwd='admin1234')
    return conn
"""
@app.route('/')
@app.route('/welcome')
def home():
    return 'Hello BreadTour  : '
"""

@app.route('/')
# 세션유지를 통한 로그인 유무 확인
def welcome():
    if 'username' in session:
        username = session['username']

        return render_template('welcome.html', logininfo=username)
    else:
        username = None
        return render_template('welcome.html', logininfo=username)


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=False)

