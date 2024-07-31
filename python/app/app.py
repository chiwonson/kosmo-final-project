<<<<<<< HEAD
from flask import Flask, render_template, session, url_for, request, redirect
import pymysql
=======
from flask import Flask, render_template, jsonify, request, redirect, url_for
from pymongo import MongoClient
import math
>>>>>>> D

app = Flask(__name__)
app.secret_key = 'your_secret_key'  # Flask 세션을 사용하기 위해 필요한 시크릿 키

def connectsql():
    conn = pymysql.connect(host='localhost', user='root', passwd='admin1234')
    return conn

# MongoDB 클라이언트 설정
client = MongoClient('mongodb://localhost:27017')
db = client['mydatabase']  # 데이터베이스 이름
pins_collection = db['pins']  # 컬렉션 이름

@app.route('/')
<<<<<<< HEAD
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
=======
def index():
    return render_template('index.html')

@app.route('/recommendations', methods=['GET'])
def get_recommendations():
    recommendations = [
        {"name": "맛집1", "address": "서울시 강남구 역삼동 123-45", "lat": "37.123", "lng": "126.456"},
        {"name": "맛집2", "address": "서울시 강남구 논현동 456-78", "lat": "37.456", "lng": "126.789"},
        {"name": "맛집3", "address": "서울시 서초구 서초동 789-01", "lat": "37.789", "lng": "126.012"}
    ]
    return jsonify(recommendations)

@app.route('/pins', methods=['GET'])
def get_pins():
    page = int(request.args.get('page', 1))
    search_type = request.args.get('search_type', '')
    search_query = request.args.get('search_query', '')
    per_page = 20
    
    query = {}
    if search_type and search_query:
        query[search_type] = {'$regex': search_query, '$options': 'i'}
    
    total_pins = pins_collection.count_documents(query)
    total_pages = math.ceil(total_pins / per_page)
    
    pins = list(pins_collection.find(query, {'_id': 0}).skip((page - 1) * per_page).limit(per_page))
    return jsonify({
        'pins': pins,
        'page': page,
        'total_pages': total_pages,
        'search_type': search_type,
        'search_query': search_query
    })

@app.route('/pins_list', methods=['GET'])
def pins_list():
    page = int(request.args.get('page', 1))
    search_type = request.args.get('search_type', '')
    search_query = request.args.get('search_query', '')
    per_page = 20
    
    query = {}
    if search_type and search_query:
        query[search_type] = {'$regex': search_query, '$options': 'i'}
    
    total_pins = pins_collection.count_documents(query)
    total_pages = math.ceil(total_pins / per_page)
    
    pins = list(pins_collection.find(query, {'_id': 0}).skip((page - 1) * per_page).limit(per_page))
    return render_template('pins_list.html', pins=pins, page=page, total_pages=total_pages, search_type=search_type, search_query=search_query)

@app.route('/add_pin', methods=['POST'])
def add_pin():
    data = request.form.to_dict()
    print("Received data:", data)  # 데이터 출력
    if not all(key in data for key in ('lat', 'lng', 'title', 'address', 'url')):
        return jsonify({"error": "Invalid data"}), 400
    # MongoDB에 핀 데이터 삽입
    result = pins_collection.insert_one(data)
    data['_id'] = str(result.inserted_id)  # 삽입된 데이터에 ID를 추가
    print("Inserted data:", data)  # 삽입된 데이터 출력
    return jsonify({"success": True, "pin": data}), 200

@app.route('/insert')
def insert():
    return render_template('insert.html')

@app.route('/pin/<title>')
def pin_detail(title):
    pin = pins_collection.find_one({'title': title}, {'_id': 0})
    if pin:
        return render_template('select.html', pin=pin)
    else:
        return "Pin not found", 404

@app.route('/edit_pin/<title>', methods=['GET', 'POST'])
def edit_pin(title):
    pin = pins_collection.find_one({'title': title})
    if request.method == 'POST':
        new_data = {
            'title': request.form['title'],
            'address': request.form['address'],
            'lat': request.form['lat'],
            'lng': request.form['lng'],
            'url': request.form['url']
        }
        pins_collection.update_one({'title': title}, {'$set': new_data})
        return redirect(url_for('pin_detail', title=new_data['title']))
    return render_template('edit.html', pin=pin)

@app.route('/delete_pin/<title>', methods=['POST'])
def delete_pin(title):
    pins_collection.delete_one({'title': title})
    return redirect(url_for('pins_list'))

@app.route('/pins_nearby', methods=['GET'])
def pins_nearby():
    lat = float(request.args.get('lat'))
    lng = float(request.args.get('lng'))
    radius_km = 50  # 반경 50km

    # MongoDB의 geospatial 기능을 사용하여 반경 50km 이내의 핀을 찾기
    query = {
        'lat': {'$gte': str(lat - 0.45), '$lte': str(lat + 0.45)},  # 0.45 degrees is roughly 50km
        'lng': {'$gte': str(lng - 0.45), '$lte': str(lng + 0.45)}
    }

    pins = list(pins_collection.find(query, {'_id': 0}))
    print(f"Query: {query}, Found Pins: {len(pins)}")  # 로그 추가
    return jsonify({'pins': pins})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
>>>>>>> D
