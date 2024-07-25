from flask import Flask, render_template, jsonify, request, Response
from pymongo import MongoClient
from bson.json_util import dumps
from flask_cors import CORS

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
    pins = list(pins_collection.find({}, {'_id': 0}))  # MongoDB에서 핀 데이터 조회
    return Response(dumps(pins), mimetype='application/json')  # dumps를 사용하여 JSON으로 변환

@app.route('/add_pin', methods=['POST'])
def add_pin():
    data = request.json
    print("Received data:", data)  # 데이터 출력
    if not all(key in data for key in ('lat', 'lng', 'title', 'address', 'url')):
        return jsonify({"error": "Invalid data"}), 400
    # MongoDB에 핀 데이터 삽입
    result = pins_collection.insert_one(data)
    data['_id'] = str(result.inserted_id)  # 삽입된 데이터에 ID를 추가
    print("Inserted data:", data)  # 삽입된 데이터 출력
    return jsonify(data), 201

@app.route('/pins_list')
def pins_list():
    # 모든 핀 데이터를 조회
    pins = list(pins_collection.find({}, {'_id': 0}))
    return render_template('pins_list.html', pins=pins)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
