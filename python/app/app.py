
from flask import Flask, render_template, jsonify, request, redirect, url_for, send_from_directory
from werkzeug.utils import secure_filename
from pymongo import MongoClient
from bson.objectid import ObjectId
from PIL import Image
import math
import datetime
import os
import pymysql

# Flask 애플리케이션 초기화
app = Flask(__name__)

# MySQL 데이터베이스 연결 설정
db_conn = pymysql.connect(
    host='localhost',  # MySQL 데이터베이스 서버 주소
    user='root',  # MySQL 데이터베이스 사용자 이름
    password='admin1234',  # MySQL 데이터베이스 비밀번호
    database='breadtour'  # 사용할 데이터베이스 이름
)

# 파일 업로드를 위한 설정
UPLOAD_FOLDER = os.path.join(os.getcwd(), 'python', 'app', 'uploads')  # 업로드 폴더 경로 설정
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}  # 허용되는 파일 확장자
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER  # Flask 애플리케이션 설정에 업로드 폴더 추가

# 업로드 폴더가 존재하지 않으면 생성
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

# 허용된 파일 확장자인지 확인하는 함수
def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

# 이미지 파일 크기를 조정하는 함수
def resize_image(image_path, output_size=(800, 800)):
    with Image.open(image_path) as img:
        img.thumbnail(output_size)  # 이미지의 썸네일 크기 조정
        img.save(image_path)  # 조정된 이미지를 저장

# MongoDB 클라이언트를 설정하여 로컬 MongoDB 서버에 연결
client = MongoClient('mongodb://localhost:27017')
db = client['mydatabase']  # 사용할 데이터베이스 선택
pins_collection = db['pins']  # 사용할 컬렉션 선택

@app.route('/map')
def map():
    return render_template('map.html')  # 기본 홈 페이지 렌더링

@app.route('/recommend')
def menus():
    return render_template('recommend.html', menu='카페/빵집 추천', url='')  # 추천 페이지 렌더링

@app.route('/pins', methods=['GET'])
def get_pins():
    page = int(request.args.get('page', 1))  # 페이지 번호 가져오기
    search_type = request.args.get('search_type', '')  # 검색 유형 가져오기
    search_query = request.args.get('search_query', '')  # 검색 쿼리 가져오기
    per_page = 10  # 페이지 당 항목 수 설정

    query = {}
    if search_type and search_query:
        query[search_type] = {'$regex': search_query, '$options': 'i'}  # 검색 조건 설정

    total_pins = pins_collection.count_documents(query)  # 총 핀 개수 계산
    total_pages = math.ceil(total_pins / per_page)  # 총 페이지 수 계산

    pins = list(pins_collection.find(query).skip((page - 1) * per_page).limit(per_page))  # 페이지에 해당하는 핀 데이터 가져오기

    # 각 핀 데이터에 댓글 수와 평균 평점 추가
    for pin in pins:
        pin['comment_count'] = len(pin.get('comments', []))
        ratings = [comment['rating'] for comment in pin.get('comments', []) if 'rating' in comment]
        pin['average_rating'] = sum(ratings) / len(ratings) if ratings else 0
        pin['_id'] = str(pin['_id'])  # ObjectId를 문자열로 변환

        # 댓글의 ObjectId를 문자열로 변환
        for comment in pin.get('comments', []):
            comment['_id'] = str(comment['_id'])

    return jsonify({
        'pins': pins,
        'page': page,
        'total_pages': total_pages,
        'search_type': search_type,
        'search_query': search_query
    })

@app.route('/sall', methods=['GET'])
def sall():
    page = int(request.args.get('page', 1))  # 페이지 번호 가져오기
    search_type = request.args.get('search_type', '')  # 검색 유형 가져오기
    search_query = request.args.get('search_query', '')  # 검색 쿼리 가져오기
    per_page = 10  # 페이지 당 항목 수 설정

    query = {}
    if search_type and search_query:
        query[search_type] = {'$regex': search_query, '$options': 'i'}  # 검색 조건 설정

    total_pins = pins_collection.count_documents(query)  # 총 핀 개수 계산
    total_pages = math.ceil(total_pins / per_page)  # 총 페이지 수 계산

    pins = list(pins_collection.find(query).skip((page - 1) * per_page).limit(per_page))  # 페이지에 해당하는 핀 데이터 가져오기

    # 각 핀 데이터에 댓글 수와 평균 평점 추가
    for pin in pins:
        pin['comment_count'] = len(pin.get('comments', []))
        ratings = [comment['rating'] for comment in pin.get('comments', []) if 'rating' in comment]
        pin['average_rating'] = sum(ratings) / len(ratings) if ratings else 0
        pin['_id'] = str(pin['_id'])  # ObjectId를 문자열로 변환

        # 댓글의 ObjectId를 문자열로 변환
        for comment in pin.get('comments', []):
            comment['_id'] = str(comment['_id'])

    return render_template('sall.html', pins=pins, page=page, total_pages=total_pages, search_type=search_type, search_query=search_query)

@app.route('/add_pin', methods=['POST'])
def add_pin():
    data = request.form.to_dict()  # 폼 데이터를 딕셔너리로 변환
    photos = request.files.getlist('photos')  # 업로드된 사진 파일 목록 가져오기

    # 필수 필드가 모두 포함되었는지 확인
    if not all(key in data for key in ('lat', 'lng', 'title', 'address', 'url', 'author', 'menu', 'content', 'hours', 'phone')):
        return jsonify({"error": "Invalid data"}), 400

    photo_filenames = []
    for photo in photos:
        if photo and allowed_file(photo.filename):
            filename = secure_filename(photo.filename)  # 파일 이름을 안전하게 변경
            file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
            photo.save(file_path)  # 파일 저장
            resize_image(file_path)  # 파일 크기 조정
            photo_filenames.append(filename)
    data['photos'] = photo_filenames  # 사진 파일 이름 목록 추가

    data['date'] = datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')  # 현재 날짜 및 시간 추가
    data['lastModified'] = data['date']  # 최초 작성일로 설정
    data['likes'] = 0  # 좋아요 수 초기화
    data['views'] = 0  # 조회 수 초기화
    data['comments'] = []  # 댓글 목록 초기화

    result = pins_collection.insert_one(data)  # 새로운 핀 데이터 추가
    data['_id'] = str(result.inserted_id)  # 삽입된 ID를 문자열로 변환

    return jsonify({"success": True, "pin": data}), 200

@app.route('/uploads/<filename>')
def uploaded_file(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)  # 업로드된 파일 제공

@app.route('/insert')
def insert():
    return render_template('insert.html')  # 핀 추가 페이지 렌더링

@app.route('/pin/<title>')
def pin_detail(title):
    pin = pins_collection.find_one_and_update(
        {'title': title},  # 제목으로 핀 검색
        {'$inc': {'views': 1}},  # 조회 수 1 증가
        return_document=True
    )

    if pin:
        pin['_id'] = str(pin['_id'])  # ObjectId를 문자열로 변환
        comment_count = len(pin.get('comments', []))  # 댓글 수 계산
        return render_template('select.html', pin=pin, comment_count=comment_count)  # 핀 상세 페이지 렌더링
    else:
        return "Pin not found", 404  # 핀을 찾을 수 없는 경우 404 오류 반환

@app.route('/update_pin/<title>', methods=['GET', 'POST'])
def update_pin(title):
    pin = pins_collection.find_one({'title': title})  # 제목으로 핀 검색

    if request.method == 'POST':
        new_data = {
            'title': request.form['title'],
            'address': request.form['address'],
            'lat': request.form['lat'],
            'lng': request.form['lng'],
            'url': request.form['url'],
            'author': request.form['author'],
            'menu': request.form['menu'],
            'content': request.form['content'],
            'hours': request.form['hours'],
            'phone': request.form['phone'],
            'lastModified': datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')  # 최종 수정일 업데이트
        }
        photos = request.files.getlist('photos')  # 업로드된 사진 파일 목록 가져오기
        photo_filenames = []
        for photo in photos:
            if photo and allowed_file(photo.filename):
                filename = secure_filename(photo.filename)  # 파일 이름을 안전하게 변경
                file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
                photo.save(file_path)  # 파일 저장
                resize_image(file_path)  # 파일 크기 조정
                photo_filenames.append(filename)
        if photo_filenames:
            new_data['photos'] = photo_filenames  # 사진 파일 이름 목록 추가

        pins_collection.update_one({'title': title}, {'$set': new_data})  # 핀 데이터 업데이트
        return redirect(url_for('pin_detail', title=new_data['title']))  # 핀 상세 페이지로 리다이렉트

    return render_template('update.html', pin=pin)  # 핀 업데이트 페이지 렌더링

@app.route('/delete_pin/<title>', methods=['POST'])
def delete_pin(title):
    pins_collection.delete_one({'title': title})  # 제목으로 핀 삭제
    return redirect(url_for('sall'))  # 핀 목록 페이지로 리다이렉트

@app.route('/pins_nearby', methods=['GET'])
def pins_nearby():
    lat = float(request.args.get('lat'))  # 위도 가져오기
    lng = float(request.args.get('lng'))  # 경도 가져오기
    radius_km = 50  # 반경 설정

    query = {
        'lat': {'$gte': str(lat - 0.45), '$lte': str(lat + 0.45)},  # 위도 범위 설정
        'lng': {'$gte': str(lng - 0.45), '$lte': str(lng + 0.45)}  # 경도 범위 설정
    }

    pins = list(pins_collection.find(query))  # 범위 내의 핀 데이터 가져오기

    # ObjectId를 문자열로 변환
    for pin in pins:
        pin['_id'] = str(pin['_id'])
        for comment in pin.get('comments', []):
            comment['_id'] = str(comment['_id'])

    return jsonify({'pins': pins})  # 핀 데이터 반환

@app.route('/like_pin/<title>', methods=['POST'])
def like_pin(title):
    pins_collection.update_one({'title': title}, {'$inc': {'likes': 1}})  # 제목으로 핀의 좋아요 수 증가
    return jsonify({'success': True})  # 성공 메시지 반환

@app.route('/add_comment/<title>', methods=['POST'])
def add_comment(title):
    author = request.form.get('author')  # 작성자 가져오기

    if not author:
        return jsonify({'error': 'Missing data'}), 400  # 작성자가 없는 경우 오류 메시지 반환

    # MySQL 데이터베이스에서 작성자 검증
    cursor = db_conn.cursor()
    cursor.execute("SELECT COUNT(*) FROM B_MBOARD WHERE MNICK = %s", (author,))
    author_exists = cursor.fetchone()[0]
    
    if not author_exists:
        return jsonify({'error': 'Invalid author'}), 400  # 작성자가 유효하지 않은 경우 오류 메시지 반환

    comment = request.form.get('comment')  # 댓글 내용 가져오기
    rating = request.form.get('rating')  # 평점 가져오기
    photos = request.files.getlist('photos')  # 업로드된 사진 파일 목록 가져오기

    if not comment or not rating:
        return jsonify({'error': 'Missing data'}), 400  # 댓글 내용 또는 평점이 없는 경우 오류 메시지 반환

    photo_filenames = []
    for photo in photos:
        if photo and allowed_file(photo.filename):
            filename = secure_filename(photo.filename)  # 파일 이름을 안전하게 변경
            file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
            photo.save(file_path)  # 파일 저장
            resize_image(file_path)  # 파일 크기 조정
            photo_filenames.append(filename)

    comment_data = {
        '_id': ObjectId(),
        'author': author,
        'comment': comment,
        'rating': int(rating),
        'date': datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
        'lastModified': datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S'),  # 댓글 작성일 추가
        'photos': photo_filenames,
        'likes': 0  # 댓글 좋아요 수 초기화
    }

    pins_collection.update_one({'title': title}, {'$push': {'comments': comment_data}})  # 핀 데이터에 댓글 추가
    
    # ObjectId를 문자열로 변환
    comment_data['_id'] = str(comment_data['_id'])
    
    return jsonify({'success': True, 'comment': comment_data})  # 성공 메시지 및 댓글 데이터 반환

@app.route('/update_comment/<comment_id>', methods=['POST'])
def update_comment(comment_id):
    new_comment = request.form.get('comment')  # 새로운 댓글 내용 가져오기
    rating = request.form.get('rating')  # 새로운 평점 가져오기
    photos = request.files.getlist('photos')  # 업로드된 사진 파일 목록 가져오기

    if not new_comment or not rating:
        return jsonify({'error': 'Missing data'}), 400  # 새로운 댓글 내용 또는 평점이 없는 경우 오류 메시지 반환

    existing_comment = pins_collection.find_one({'comments._id': ObjectId(comment_id)}, {'comments.$': 1})
    if not existing_comment:
        return jsonify({'error': 'Comment not found'}), 404  # 기존 댓글을 찾을 수 없는 경우 오류 메시지 반환

    existing_photos = existing_comment['comments'][0]['photos']

    photo_filenames = existing_photos  # 기본적으로 기존 사진 사용
    if photos:
        photo_filenames = []
        for photo in photos:
            if photo and allowed_file(photo.filename):
                filename = secure_filename(photo.filename)  # 파일 이름을 안전하게 변경
                file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
                photo.save(file_path)  # 파일 저장
                resize_image(file_path)  # 파일 크기 조정
                photo_filenames.append(filename)

    update_fields = {
        'comments.$.comment': new_comment,

        'comments.$.rating': int(rating),
        'comments.$.date': datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
        'comments.$.lastModified': datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S'),  # 댓글 수정일 추가
        'comments.$.photos': photo_filenames
    }

    pins_collection.update_one(
        {'comments._id': ObjectId(comment_id)},
        {'$set': update_fields}
    )

    updated_comment = pins_collection.find_one(
        {'comments._id': ObjectId(comment_id)},
        {'comments.$': 1}
    )

    if updated_comment:
        updated_comment = updated_comment['comments'][0]
        updated_comment['_id'] = str(updated_comment['_id'])

    return jsonify({'success': True, 'comment': updated_comment})  # 성공 메시지 및 업데이트된 댓글 데이터 반환

@app.route('/delete_comment/<title>/<comment_id>', methods=['DELETE'])
def delete_comment(title, comment_id):
    result = pins_collection.update_one(
        {'title': title},
        {'$pull': {'comments': {'_id': ObjectId(comment_id)}}}
    )
    if result.modified_count > 0:
        return jsonify({'success': True})  # 성공 메시지 반환
    else:
        return jsonify({'success': False, 'error': 'Comment not found'})  # 댓글을 찾을 수 없는 경우 오류 메시지 반환

@app.route('/like_comment/<comment_id>', methods=['POST'])
def like_comment(comment_id):
    pins_collection.update_one(
        {'comments._id': ObjectId(comment_id)},
        {'$inc': {'comments.$.likes': 1}}
    )
    return jsonify({'success': True})


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)  # 애플리케이션 실행
