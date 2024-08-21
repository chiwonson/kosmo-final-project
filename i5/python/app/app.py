from flask import Flask, render_template, jsonify, request, redirect, url_for, send_from_directory
from werkzeug.utils import secure_filename
from pymongo import MongoClient
from bson.objectid import ObjectId
from PIL import Image
from flask_cors import CORS

import math
import datetime
import os
import pymysql

# Flask 애플리케이션 초기화
app = Flask(__name__)
CORS(app)  

# MySQL 데이터베이스 연결 설정
db_conn = pymysql.connect(
    host='localhost',  # 서버 주소
    user='root',  # 사용자 이름
    password='admin1234',  # 데이터베이스 비밀번호
    database='breadtour'  # 데이터베이스 이름
)

# 파일 업로드 설정
# os.getcwd(): 현재 작업 디렉토리의 경로를 반환, 'python/app/uploads' 폴더 지정
UPLOAD_FOLDER = os.path.join(os.getcwd(), 'uploads')

# 허용 파일 확장자
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}

# 업로드 폴더 경로 추가
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# 업로드 폴더가 존재하지 않으면 생성
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

# 허용된 파일 확장자인지 확인하는 함수
def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

# 이미지 파일 크기를 조정하는 함수
def resize_image(image_path, output_size=(800, 800)):
    with Image.open(image_path) as img:
        img.thumbnail(output_size)
        img.save(image_path)

# MongoDB 연결
client = MongoClient('mongodb://localhost:27017')
db = client['mydatabase'] # 데이터베이스 이름
pins_collection = db['pins'] # 컬렉션 이름

# map.html 템플릿을 렌더링하는 라우트
@app.route('/')
@app.route('/map')
def map():
    return render_template('map.html')

# recommend.html 템플릿을 렌더링하는 라우트, 'menu'와 'url' 값을 전달
@app.route('/recommend')
def menus():
    return render_template('recommend.html', menu='카페/빵집 추천', url='')

# 핀 데이터를 가져오는 API 엔드포인트
@app.route('/pins', methods=['GET'])
def get_pins():
    page = int(request.args.get('page', 1))
    search_type = request.args.get('search_type', '')
    search_query = request.args.get('search_query', '')
    per_page = 10 

    query = {}
    if search_type and search_query:
        query[search_type] = {'$regex': search_query, '$options': 'i'}
  
    total_pins = pins_collection.count_documents(query)
    total_pages = math.ceil(total_pins / per_page)
    pins = list(pins_collection.find(query).skip((page - 1) * per_page).limit(per_page))
   
    # 각 핀 데이터에 댓글 수와 평균 평점 추가
    for pin in pins:
        pin['comment_count'] = len(pin.get('comments', []))
        ratings = [comment['rating'] for comment in pin.get('comments', []) if 'rating' in comment]
        pin['average_rating'] = sum(ratings) / len(ratings) if ratings else 0
        pin['_id'] = str(pin['_id'])
        for comment in pin.get('comments', []):
            comment['_id'] = str(comment['_id'])
       
    # 핀 데이터, 현재 페이지, 전체 페이지 수, 검색 유형, 검색 쿼리 정보를 JSON 형태로 반환
    return jsonify({
        'pins': pins,
        'page': page,
        'total_pages': total_pages,
        'search_type': search_type,
        'search_query': search_query
    })

# map.html 템플릿을 렌더링하는 라우트
@app.route('/sall', methods=['GET'])
def sall():
    page = int(request.args.get('page', 1))
    search_type = request.args.get('search_type', '')
    search_query = request.args.get('search_query', '')
    per_page = 10

    query = {}
    if search_type and search_query:
        query[search_type] = {'$regex': search_query, '$options': 'i'}

    total_pins = pins_collection.count_documents(query)
    total_pages = math.ceil(total_pins / per_page)

    # 최신 데이터가 앞에 오도록 정렬 (date 또는 lastModified 기준으로 내림차순 정렬)
    pins = list(pins_collection.find(query).sort('date', -1).skip((page - 1) * per_page).limit(per_page))

    for pin in pins:
        pin['comment_count'] = len(pin.get('comments', []))
        ratings = [comment['rating'] for comment in pin.get('comments', []) if 'rating' in comment]
        pin['average_rating'] = sum(ratings) / len(ratings) if ratings else 0
        pin['_id'] = str(pin['_id'])

        for comment in pin.get('comments', []):
            comment['_id'] = str(comment['_id'])

    return render_template('sall.html', pins=pins, page=page, total_pages=total_pages, search_type=search_type, search_query=search_query)

# 새로운 핀 데이터 추가하는 API 엔드포인트
@app.route('/add_pin', methods=['POST'])
def add_pin():
    # 폼 데이터를 딕셔너리로 변환하여 가져옴
    data = request.form.to_dict()
    # 업로드된 사진 파일 목록을 가져옴
    photos = request.files.getlist('photos')
    
    # 필수 필드 확인, 누락된 경우 오류 메시지를 반환
    if not all(key in data for key in ('lat', 'lng', 'title', 'address', 'url', 'author', 'menu', 'content', 'hours', 'phone')):
        return jsonify({"error": "Invalid data"}), 400
 
    photo_filenames = []
    for photo in photos:
        if photo and allowed_file(photo.filename):
            filename = secure_filename(photo.filename)
            file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
            photo.save(file_path)
            resize_image(file_path)
        
            photo_filenames.append(filename)
    data['photos'] = photo_filenames
    data['date'] = datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    data['lastModified'] = data['date']
    data['likes'] = 0
    data['views'] = 0
    data['comments'] = []
    # 새로운 핀 데이터를 MongoDB에 추가, 추가된 문서의 ID를 result에 저장
    result = pins_collection.insert_one(data)
   
    data['_id'] = str(result.inserted_id)
    return jsonify({"success": True, "pin": data}), 200

# 업로드된 파일을 제공하는 엔드포인트
@app.route('/uploads/<filename>')
def uploaded_file(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)

# insert.html 템플릿을 렌더링하는 라우트
@app.route('/insert')
def insert():
    return render_template('insert.html')

# 세부 정보를 표시하는 라우트
@app.route('/pin/<title>')
def pin_detail(title):
    pin = pins_collection.find_one_and_update(
        {'title': title},
        {'$inc': {'views': 1}},
        return_document=True
    )

    if pin:
        pin['_id'] = str(pin['_id'])
        comment_count = len(pin.get('comments', []))
        return render_template('select.html', pin=pin, comment_count=comment_count)
    else:
        return "Pin not found", 404

# 특정 핀의 데이터를 업데이트하는 라우트
@app.route('/update_pin/<title>', methods=['GET', 'POST'])
def update_pin(title):
    pin = pins_collection.find_one({'title': title})

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
            'lastModified': datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        }

        photos = request.files.getlist('photos')
 
        photo_filenames = []
        for photo in photos:
            if photo and allowed_file(photo.filename):
                filename = secure_filename(photo.filename)
                file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
                photo.save(file_path)
                resize_image(file_path)
                photo_filenames.append(filename)

        if photo_filenames:
            new_data['photos'] = photo_filenames
        pins_collection.update_one({'title': title}, {'$set': new_data})
        return redirect(url_for('pin_detail', title=new_data['title']))
    return render_template('update.html', pin=pin)

# 특정 핀을 삭제하는 API 엔드포인트
@app.route('/delete_pin/<title>', methods=['POST'])
def delete_pin(title):
    pins_collection.delete_one({'title': title})
    return redirect(url_for('sall'))

# 특정 위치 근처의 핀 데이터를 가져오는 API 엔드포인트
@app.route('/pins_nearby', methods=['GET'])
def pins_nearby():
    lat = float(request.args.get('lat'))
    lng = float(request.args.get('lng'))

    radius_km = 50 # 검색 반경(50km로 설정)

    query = {
        'lat': {'$gte': str(lat - 0.45), '$lte': str(lat + 0.45)},
        'lng': {'$gte': str(lng - 0.45), '$lte': str(lng + 0.45)}
    }

    pins = list(pins_collection.find(query))

    for pin in pins:
        pin['_id'] = str(pin['_id'])
        for comment in pin.get('comments', []):
            comment['_id'] = str(comment['_id'])
    return jsonify({'pins': pins})

# 특정 핀의 좋아요 수를 증가시키는 API 엔드포인트
@app.route('/like_pin/<title>', methods=['POST'])
def like_pin(title):
    pins_collection.update_one({'title': title}, {'$inc': {'likes': 1}})
    return jsonify({'success': True})

# 특정 핀에 댓글을 추가하는 API 엔드포인트
@app.route('/add_comment/<title>', methods=['POST'])
def add_comment(title):
    author = request.form.get('author')
    # 요청에서 작성자를 가져옵니다.

    if not author:
        return jsonify({'error': 'Missing data'}), 400

    # MySQL 데이터베이스에서 작성자 = MNIC 확인
    cursor = db_conn.cursor()
    cursor.execute("SELECT COUNT(*) FROM B_MBOARD WHERE MNICK = %s", (author,))
    author_exists = cursor.fetchone()[0]

    if not author_exists:
        return jsonify({'error': 'Invalid author'}), 400

    comment = request.form.get('comment')
    rating = request.form.get('rating')
    photos = request.files.getlist('photos')
 
    if not comment or not rating:
        return jsonify({'error': 'Missing data'}), 400

    photo_filenames = []
    for photo in photos:
        if photo and allowed_file(photo.filename):
            filename = secure_filename(photo.filename)
            file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
            photo.save(file_path)
            resize_image(file_path)
            photo_filenames.append(filename)

    comment_data = {
        '_id': ObjectId(),
        'author': author,
        'comment': comment,
        'rating': int(rating),
        'date': datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
        'lastModified': datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
        'photos': photo_filenames,
        'likes': 0
    }
 
    pins_collection.update_one({'title': title}, {'$push': {'comments': comment_data}})
    comment_data['_id'] = str(comment_data['_id'])
    return jsonify({'success': True, 'comment': comment_data})

# 특정 댓글을 업데이트하는 API 엔드포인트
@app.route('/update_comment/<comment_id>', methods=['POST'])
def update_comment(comment_id):
    new_comment = request.form.get('comment')
    rating = request.form.get('rating')
    photos = request.files.getlist('photos')
 
    if not new_comment or not rating:
        return jsonify({'error': 'Missing data'}), 400

    existing_comment = pins_collection.find_one({'comments._id': ObjectId(comment_id)}, {'comments.$': 1})
    if not existing_comment:
        return jsonify({'error': 'Comment not found'}), 404

    existing_photos = existing_comment['comments'][0]['photos']

    # 새 사진 파일이 있는 경우, 기존 사진을 덮어씁니다.
    photo_filenames = existing_photos
    if photos:
        photo_filenames = []
        for photo in photos:
            if photo and allowed_file(photo.filename):
                filename = secure_filename(photo.filename)
                file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
                photo.save(file_path)
                resize_image(file_path)
                photo_filenames.append(filename)

    update_fields = {
        'comments.$.comment': new_comment,
        'comments.$.rating': int(rating),
        'comments.$.date': datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
        'comments.$.lastModified': datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
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

    return jsonify({'success': True, 'comment': updated_comment})


# 특정 댓글을 삭제하는 API 엔드포인트
@app.route('/delete_comment/<title>/<comment_id>', methods=['DELETE'])
def delete_comment(title, comment_id):
    result = pins_collection.update_one(
        {'title': title},
        {'$pull': {'comments': {'_id': ObjectId(comment_id)}}}
    )

    if result.modified_count > 0:
        return jsonify({'success': True})
    else:
        return jsonify({'success': False, 'error': 'Comment not found'})

# 특정 댓글의 좋아요 수를 증가시키는 API 엔드포인트
@app.route('/like_comment/<comment_id>', methods=['POST'])
def like_comment(comment_id):
    pins_collection.update_one(
        {'comments._id': ObjectId(comment_id)},
        {'$inc': {'comments.$.likes': 1}}
    )

    return jsonify({'success': True})

# 애플리케이션 실행
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
 