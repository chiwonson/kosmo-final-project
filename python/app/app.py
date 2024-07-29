from flask import Flask, render_template, jsonify, request, redirect, url_for, Response
from pymongo import MongoClient
from bson.json_util import dumps
from flask_cors import CORS
import math

app = Flask(__name__)
CORS(app)  # CORS 활성화

# MongoDB 클라이언트 설정
client = MongoClient('mongodb://localhost:27017')
db = client['mydatabase']  # 데이터베이스 이름
pins_collection = db['pins']  # 컬렉션 이름

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/recommendations', methods=['GET'])
def get_recommendations():
    recommendations = [
        {"name": "맛집1", "address": "서울시 강남구 역삼동 123-45", "lat": 37.123, "lng": 126.456},
        {"name": "맛집2", "address": "서울시 강남구 논현동 456-78", "lat": 37.456, "lng": 126.789},
        {"name": "맛집3", "address": "서울시 서초구 서초동 789-01", "lat": 37.789, "lng": 126.012}
    ]
    return jsonify(recommendations)

@app.route('/pins', methods=['GET'])
def get_pins():
    page = int(request.args.get('page', 1))
    title = request.args.get('title', '')
    address = request.args.get('address', '')
    per_page = 20
    
    query = {}
    if title:
        query['title'] = {'$regex': title, '$options': 'i'}
    if address:
        query['address'] = {'$regex': address, '$options': 'i'}
    
    total_pins = pins_collection.count_documents(query)
    total_pages = math.ceil(total_pins / per_page)
    
    pins = list(pins_collection.find(query, {'_id': 0}).skip((page - 1) * per_page).limit(per_page))
    return jsonify({
        'pins': pins,
        'page': page,
        'total_pages': total_pages,
        'title': title,
        'address': address
    })

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
    return redirect(url_for('pins_list'))

@app.route('/pins_list')
def pins_list():
    page = int(request.args.get('page', 1))
    title = request.args.get('title', '')
    address = request.args.get('address', '')
    per_page = 20
    
    query = {}
    if title:
        query['title'] = {'$regex': title, '$options': 'i'}
    if address:
        query['address'] = {'$regex': address, '$options': 'i'}
    
    total_pins = pins_collection.count_documents(query)
    total_pages = math.ceil(total_pins / per_page)
    
    pins = list(pins_collection.find(query, {'_id': 0}).skip((page - 1) * per_page).limit(per_page))
    return render_template('pins_list.html', pins=pins, page=page, total_pages=total_pages, title=title, address=address)

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

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
