from flask import Flask, render_template, jsonify, request, Response
from pymongo import MongoClient
from bson.json_util import dumps
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # CORS 활성화: 다른 출처의 요청을 허용

# MongoDB 클라이언트 설정
client = MongoClient('mongodb://localhost:27017')  # MongoDB 서버에 연결
db = client['mydatabase']  # 사용할 데이터베이스 선택
pins_collection = db['pins']  # 사용할 컬렉션 선택

@app.route('/')
def index():
    # 기본 경로('/')에 대한 요청을 처리하여 'index.html' 템플릿을 렌더링
    return render_template('index.html')

@app.route('/recommendations', methods=['GET'])
def get_recommendations():
    # 추천 맛집 목록을 반환하는 GET 요청 처리
    recommendations = [
        {"name": "맛집1", "address": "서울시 강남구 역삼동 123-45", "lat": 37.123, "lng": 126.456},
        {"name": "맛집2", "address": "서울시 강남구 논현동 456-78", "lat": 37.456, "lng": 126.789},
        {"name": "맛집3", "address": "서울시 서초구 서초동 789-01", "lat": 37.789, "lng": 126.012}
    ]
    # JSON 형태로 추천 맛집 목록을 반환
    return jsonify(recommendations)

@app.route('/pins', methods=['GET'])
def get_pins():
    # 저장된 핀 데이터를 MongoDB에서 조회하여 반환하는 GET 요청 처리
    pins = list(pins_collection.find({}, {'_id': 0}))  # 모든 핀 데이터 조회 (ID 제외)
    return Response(dumps(pins), mimetype='application/json')  # JSON으로 변환하여 반환

@app.route('/add_pin', methods=['POST'])
def add_pin():
    # 클라이언트로부터 POST 요청으로 전달된 핀 데이터를 처리
    data = request.json
    print("Received data:", data)  # 클라이언트로부터 받은 데이터 출력
    # 필수 데이터가 모두 포함되었는지 확인
    if not all(key in data for key in ('lat', 'lng', 'title', 'address', 'url')):
        return jsonify({"error": "Invalid data"}), 400  # 데이터가 부족하면 오류 반환
    # MongoDB에 핀 데이터 삽입
    result = pins_collection.insert_one(data)
    data['_id'] = str(result.inserted_id)  # 삽입된 데이터에 MongoDB의 ID 추가
    print("Inserted data:", data)  # 삽입된 데이터 출력
    return jsonify(data), 201  # 성공적으로 추가된 데이터와 함께 201 상태 코드 반환

if __name__ == '__main__':
    # 애플리케이션을 호스트와 포트를 지정하여 실행 (디버그 모드 활성화)
    app.run(host='0.0.0.0', port=5000, debug=True)
