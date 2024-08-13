from flask import Flask, render_template, jsonify, request, redirect, url_for, send_from_directory
from werkzeug.utils import secure_filename
from pymongo import MongoClient
from bson.objectid import ObjectId
from PIL import Image
# 이미지 처리와 조정을 위해 Python Imaging Library(PIL)에서 제공하는 Image 모듈을 임포트합니다.

import math
# 수학적 계산을 위해 math 모듈을 임포트합니다. 예를 들어, 페이지 계산에 사용됩니다.

import datetime
# 날짜 및 시간 처리를 위해 datetime 모듈을 임포트합니다.

import os
# 운영 체제와 상호작용하기 위한 os 모듈을 임포트합니다. 예를 들어, 경로 설정 및 디렉토리 생성 등에 사용됩니다.

import pymysql
# MySQL 데이터베이스에 연결하고 쿼리를 실행하기 위한 pymysql 모듈을 임포트합니다.

# Flask 애플리케이션 초기화
app = Flask(__name__)
# Flask 애플리케이션 인스턴스를 생성합니다. __name__은 현재 모듈의 이름을 나타냅니다.

# MySQL 데이터베이스 연결 설정
db_conn = pymysql.connect(
    host='localhost',  # MySQL 데이터베이스 서버 주소
    user='root',  # MySQL 데이터베이스 사용자 이름
    password='admin1234',  # MySQL 데이터베이스 비밀번호
    database='breadtour'  # 사용할 데이터베이스 이름
)
# MySQL 데이터베이스에 연결하기 위해 pymysql의 connect 메서드를 사용하여 데이터베이스 연결 객체를 생성합니다.

# 파일 업로드를 위한 설정
UPLOAD_FOLDER = os.path.join(os.getcwd(), 'python', 'app', 'uploads')
# 업로드된 파일을 저장할 폴더의 경로를 설정합니다. 
# os.getcwd()는 현재 작업 디렉토리의 경로를 반환하며, 그 아래 'python/app/uploads' 폴더를 지정합니다.

ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}
# 허용되는 파일 확장자를 설정합니다. 이미지 파일만 허용됩니다.

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
# Flask 애플리케이션 설정에 업로드 폴더 경로를 추가합니다.

# 업로드 폴더가 존재하지 않으면 생성
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)
# 업로드 폴더가 존재하지 않을 경우, os.makedirs()를 사용하여 폴더를 생성합니다.

# 허용된 파일 확장자인지 확인하는 함수
def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS
# 파일의 확장자를 검사하여, 허용된 파일 형식(png, jpg, jpeg, gif)인지 확인하는 함수입니다.

# 이미지 파일 크기를 조정하는 함수
def resize_image(image_path, output_size=(800, 800)):
    with Image.open(image_path) as img:
        img.thumbnail(output_size)
        img.save(image_path)
# 이미지의 크기를 조정하여 지정된 크기(여기서는 800x800)로 맞추는 함수입니다. 
# Image.open()으로 이미지를 열고, img.thumbnail()을 사용해 이미지를 지정된 크기로 축소한 후, img.save()로 이미지를 저장합니다.

# MongoDB 클라이언트를 설정하여 로컬 MongoDB 서버에 연결
client = MongoClient('mongodb://localhost:27017')
# MongoDB 서버에 연결하는 클라이언트를 생성합니다. 'localhost'와 포트 '27017'을 사용하여 로컬 MongoDB에 연결합니다.

db = client['mydatabase']
# 사용할 데이터베이스를 선택합니다. 여기서는 'mydatabase'라는 이름의 데이터베이스를 사용합니다.

pins_collection = db['pins']
# 사용할 컬렉션을 선택합니다. 여기서는 'pins'라는 이름의 컬렉션을 사용합니다.

# 기본 홈 페이지 또는 지도 페이지를 렌더링하는 라우트
@app.route('/')
@app.route('/map')
def map():
    return render_template('map.html')
# '/' 및 '/map' 경로에 대해 map.html 템플릿을 렌더링하여 홈 페이지를 보여줍니다.

# 추천 페이지를 렌더링하는 라우트
@app.route('/recommend')
def menus():
    return render_template('recommend.html', menu='카페/빵집 추천', url='')
# '/recommend' 경로에 대해 recommend.html 템플릿을 렌더링하고, 템플릿에 'menu'와 'url' 값을 전달합니다.

@app.route('/recommend2')
def recommend2():
    return render_template('recommend2.html')
# '/recommend2' 경로에 대해 recommend2.html 템플릿을 렌더링합니다.

# 핀 데이터를 가져오는 API 엔드포인트
@app.route('/pins', methods=['GET'])
def get_pins():
    page = int(request.args.get('page', 1))
    # 요청에서 'page' 매개변수를 가져오고, 기본값을 1로 설정합니다.
    
    search_type = request.args.get('search_type', '')
    # 요청에서 'search_type' 매개변수를 가져옵니다. 이는 검색할 필드를 나타냅니다.
    
    search_query = request.args.get('search_query', '')
    # 요청에서 'search_query' 매개변수를 가져옵니다. 이는 검색할 값을 나타냅니다.

    per_page = 10
    # 한 페이지에 표시할 항목 수를 설정합니다.

    query = {}
    if search_type and search_query:
        query[search_type] = {'$regex': search_query, '$options': 'i'}
    # 검색 유형과 검색 쿼리가 있는 경우, 정규식을 사용해 해당 필드에서 대소문자를 구분하지 않고 일치하는 항목을 찾도록 쿼리를 설정합니다.

    total_pins = pins_collection.count_documents(query)
    # 전체 핀 개수를 쿼리의 조건에 맞게 계산합니다.

    total_pages = math.ceil(total_pins / per_page)
    # 총 페이지 수를 계산하기 위해 전체 핀 개수를 페이지당 항목 수로 나눕니다.

    pins = list(pins_collection.find(query).skip((page - 1) * per_page).limit(per_page))
    # 요청된 페이지에 해당하는 핀 데이터를 데이터베이스에서 가져옵니다.
    
    # 각 핀 데이터에 댓글 수와 평균 평점을 추가
    for pin in pins:
        pin['comment_count'] = len(pin.get('comments', []))
        # 핀에 포함된 댓글의 수를 계산하여 'comment_count' 필드에 추가합니다.

        ratings = [comment['rating'] for comment in pin.get('comments', []) if 'rating' in comment]
        # 각 댓글에서 평점을 가져와 리스트로 만듭니다.

        pin['average_rating'] = sum(ratings) / len(ratings) if ratings else 0
        # 평균 평점을 계산하여 'average_rating' 필드에 추가합니다.

        pin['_id'] = str(pin['_id'])
        # ObjectId를 문자열로 변환하여 JSON으로 반환할 수 있도록 합니다.

        for comment in pin.get('comments', []):
            comment['_id'] = str(comment['_id'])
        # 각 댓글의 ObjectId를 문자열로 변환합니다.

    return jsonify({
        'pins': pins,
        'page': page,
        'total_pages': total_pages,
        'search_type': search_type,
        'search_query': search_query
    })
    # 핀 데이터, 현재 페이지, 전체 페이지 수, 검색 유형, 검색 쿼리 정보를 JSON 형태로 반환합니다.

# 전체 핀 데이터를 가져와 렌더링하는 라우트
@app.route('/sall', methods=['GET'])
def sall():
    page = int(request.args.get('page', 1))
    # 요청에서 'page' 매개변수를 가져오고, 기본값을 1로 설정합니다.

    search_type = request.args.get('search_type', '')
    # 요청에서 'search_type' 매개변수를 가져옵니다.

    search_query = request.args.get('search_query', '')
    # 요청에서 'search_query' 매개변수를 가져옵니다.

    per_page = 10
    # 한 페이지에 표시할 항목 수를 설정합니다.

    query = {}
    if search_type and search_query:
        query[search_type] = {'$regex': search_query, '$options': 'i'}
    # 검색 유형과 검색 쿼리가 있는 경우, 해당 필드에서 일치하는 항목을 찾도록 쿼리를 설정합니다.

    total_pins = pins_collection.count_documents(query)
    # 전체 핀 개수를 쿼리의 조건에 맞게 계산합니다.

    total_pages = math.ceil(total_pins / per_page)
    # 총 페이지 수를 계산합니다.

    pins = list(pins_collection.find(query).skip((page - 1) * per_page).limit(per_page))
    # 요청된 페이지에 해당하는 핀 데이터를 데이터베이스에서 가져옵니다.

    for pin in pins:
        pin['comment_count'] = len(pin.get('comments', []))
        # 핀에 포함된 댓글의 수를 계산하여 'comment_count' 필드에 추가합니다.

        ratings = [comment['rating'] for comment in pin.get('comments', []) if 'rating' in comment]
        # 각 댓글에서 평점을 가져와 리스트로 만듭니다.

        pin['average_rating'] = sum(ratings) / len(ratings) if ratings else 0
        # 평균 평점을 계산하여 'average_rating' 필드에 추가합니다.

        pin['_id'] = str(pin['_id'])
        # ObjectId를 문자열로 변환하여 JSON으로 반환할 수 있도록 합니다.

        for comment in pin.get('comments', []):
            comment['_id'] = str(comment['_id'])
        # 각 댓글의 ObjectId를 문자열로 변환합니다.

    return render_template('sall.html', pins=pins, page=page, total_pages=total_pages, search_type=search_type, search_query=search_query)
    # sall.html 템플릿을 렌더링하여 핀 데이터를 웹 페이지에 표시합니다.

# 새로운 핀 데이터를 추가하는 API 엔드포인트
@app.route('/add_pin', methods=['POST'])
def add_pin():
    data = request.form.to_dict()
    # 폼 데이터를 딕셔너리로 변환하여 가져옵니다.

    photos = request.files.getlist('photos')
    # 업로드된 사진 파일 목록을 가져옵니다.

    if not all(key in data for key in ('lat', 'lng', 'title', 'address', 'url', 'author', 'menu', 'content', 'hours', 'phone')):
        return jsonify({"error": "Invalid data"}), 400
    # 필수 필드가 모두 포함되어 있는지 확인하고, 누락된 경우 오류 메시지를 반환합니다.

    photo_filenames = []
    for photo in photos:
        if photo and allowed_file(photo.filename):
            filename = secure_filename(photo.filename)
            # 파일 이름을 안전하게 변경합니다.

            file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
            # 파일 저장 경로를 설정합니다.

            photo.save(file_path)
            # 파일을 저장합니다.

            resize_image(file_path)
            # 파일 크기를 조정합니다.

            photo_filenames.append(filename)
    data['photos'] = photo_filenames
    # 사진 파일 이름 목록을 데이터에 추가합니다.

    data['date'] = datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    # 현재 날짜 및 시간을 'date' 필드에 추가합니다.

    data['lastModified'] = data['date']
    # 'lastModified' 필드를 'date'와 동일하게 설정합니다.

    data['likes'] = 0
    # 'likes' 필드를 0으로 초기화합니다.

    data['views'] = 0
    # 'views' 필드를 0으로 초기화합니다.

    data['comments'] = []
    # 'comments' 필드를 빈 리스트로 초기화합니다.

    result = pins_collection.insert_one(data)
    # 새로운 핀 데이터를 MongoDB에 추가하고, 추가된 문서의 ID를 result에 저장합니다.

    data['_id'] = str(result.inserted_id)
    # 삽입된 문서의 ID(ObjectId)를 문자열로 변환하여 반환할 데이터에 추가합니다.

    return jsonify({"success": True, "pin": data}), 200
    # 성공 메시지와 함께 삽입된 핀 데이터를 JSON 형식으로 반환합니다.

# 업로드된 파일을 제공하는 엔드포인트
@app.route('/uploads/<filename>')
def uploaded_file(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)
    # 요청된 파일을 업로드된 파일 폴더에서 찾아 반환합니다.

# 핀 추가 페이지를 렌더링하는 라우트
@app.route('/insert')
def insert():
    return render_template('insert.html')
    # insert.html 템플릿을 렌더링하여 핀 추가 페이지를 보여줍니다.

# 특정 핀의 세부 정보를 표시하는 라우트
@app.route('/pin/<title>')
def pin_detail(title):
    pin = pins_collection.find_one_and_update(
        {'title': title},
        {'$inc': {'views': 1}},
        return_document=True
    )
    # 제목으로 핀을 검색하고, 조회 수를 1 증가시킵니다. 업데이트된 문서를 반환합니다.

    if pin:
        pin['_id'] = str(pin['_id'])
        # ObjectId를 문자열로 변환하여 반환할 수 있도록 합니다.

        comment_count = len(pin.get('comments', []))
        # 핀에 포함된 댓글의 수를 계산합니다.

        return render_template('select.html', pin=pin, comment_count=comment_count)
        # select.html 템플릿을 렌더링하여 핀의 세부 정보를 표시합니다.

    else:
        return "Pin not found", 404
        # 핀을 찾을 수 없는 경우, 404 오류 메시지를 반환합니다.

# 특정 핀의 데이터를 업데이트하는 라우트
@app.route('/update_pin/<title>', methods=['GET', 'POST'])
def update_pin(title):
    pin = pins_collection.find_one({'title': title})
    # 제목으로 핀을 검색합니다.

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
        # 폼 데이터를 기반으로 새로운 데이터를 생성합니다. 
        # 'lastModified' 필드를 현재 시간으로 설정합니다.

        photos = request.files.getlist('photos')
        # 업로드된 사진 파일 목록을 가져옵니다.

        photo_filenames = []
        for photo in photos:
            if photo and allowed_file(photo.filename):
                filename = secure_filename(photo.filename)
                # 파일 이름을 안전하게 변경합니다.

                file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
                # 파일 저장 경로를 설정합니다.

                photo.save(file_path)
                # 파일을 저장합니다.

                resize_image(file_path)
                # 파일 크기를 조정합니다.

                photo_filenames.append(filename)
        if photo_filenames:
            new_data['photos'] = photo_filenames
        # 새 사진 파일이 있을 경우, 기존 데이터를 덮어씁니다.

        pins_collection.update_one({'title': title}, {'$set': new_data})
        # MongoDB에서 핀 데이터를 업데이트합니다.

        return redirect(url_for('pin_detail', title=new_data['title']))
        # 업데이트된 핀의 세부 정보 페이지로 리다이렉트합니다.

    return render_template('update.html', pin=pin)
    # GET 요청인 경우, update.html 템플릿을 렌더링하여 핀 업데이트 페이지를 보여줍니다.

# 특정 핀을 삭제하는 API 엔드포인트
@app.route('/delete_pin/<title>', methods=['POST'])
def delete_pin(title):
    pins_collection.delete_one({'title': title})
    # 제목으로 핀을 찾아 삭제합니다.

    return redirect(url_for('sall'))
    # 핀 목록 페이지로 리다이렉트합니다.

# 특정 위치 근처의 핀 데이터를 가져오는 API 엔드포인트
@app.route('/pins_nearby', methods=['GET'])
def pins_nearby():
    lat = float(request.args.get('lat'))
    lng = float(request.args.get('lng'))
    # 요청에서 위도와 경도를 가져옵니다.

    radius_km = 50
    # 검색 반경을 설정합니다. (여기서는 50km로 설정)

    query = {
        'lat': {'$gte': str(lat - 0.45), '$lte': str(lat + 0.45)},
        'lng': {'$gte': str(lng - 0.45), '$lte': str(lng + 0.45)}
    }
    # 위도와 경도의 범위를 설정하여 해당 범위 내의 핀을 찾는 쿼리를 생성합니다.

    pins = list(pins_collection.find(query))
    # 쿼리 조건에 맞는 핀 데이터를 가져옵니다.

    for pin in pins:
        pin['_id'] = str(pin['_id'])
        # ObjectId를 문자열로 변환합니다.

        for comment in pin.get('comments', []):
            comment['_id'] = str(comment['_id'])
        # 댓글의 ObjectId를 문자열로 변환합니다.

    return jsonify({'pins': pins})
    # 핀 데이터를 JSON 형태로 반환합니다.

# 특정 핀의 좋아요 수를 증가시키는 API 엔드포인트
@app.route('/like_pin/<title>', methods=['POST'])
def like_pin(title):
    pins_collection.update_one({'title': title}, {'$inc': {'likes': 1}})
    # 제목으로 핀을 찾아 'likes' 필드를 1 증가시킵니다.

    return jsonify({'success': True})
    # 성공 메시지를 JSON 형태로 반환합니다.

# 특정 핀에 댓글을 추가하는 API 엔드포인트
@app.route('/add_comment/<title>', methods=['POST'])
def add_comment(title):
    author = request.form.get('author')
    # 요청에서 작성자를 가져옵니다.

    if not author:
        return jsonify({'error': 'Missing data'}), 400
    # 작성자가 없는 경우 오류 메시지를 반환합니다.

    cursor = db_conn.cursor()
    cursor.execute("SELECT COUNT(*) FROM B_MBOARD WHERE MNICK = %s", (author,))
    author_exists = cursor.fetchone()[0]
    # MySQL 데이터베이스에서 작성자가 유효한지 확인합니다.

    if not author_exists:
        return jsonify({'error': 'Invalid author'}), 400
    # 작성자가 유효하지 않은 경우 오류 메시지를 반환합니다.

    comment = request.form.get('comment')
    rating = request.form.get('rating')
    photos = request.files.getlist('photos')
    # 요청에서 댓글 내용, 평점, 사진 파일 목록을 가져옵니다.

    if not comment or not rating:
        return jsonify({'error': 'Missing data'}), 400
    # 댓글 내용 또는 평점이 없는 경우 오류 메시지를 반환합니다.

    photo_filenames = []
    for photo in photos:
        if photo and allowed_file(photo.filename):
            filename = secure_filename(photo.filename)
            file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
            photo.save(file_path)
            resize_image(file_path)
            photo_filenames.append(filename)
    # 사진 파일을 처리하여 저장하고, 파일 이름 목록을 만듭니다.

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
    # 댓글 데이터를 구성합니다. 댓글의 ObjectId, 작성자, 댓글 내용, 평점, 작성일, 수정일, 사진, 좋아요 수를 포함합니다.

    pins_collection.update_one({'title': title}, {'$push': {'comments': comment_data}})
    # 핀 데이터에 댓글을 추가합니다.

    comment_data['_id'] = str(comment_data['_id'])
    # 댓글의 ObjectId를 문자열로 변환합니다.

    return jsonify({'success': True, 'comment': comment_data})
    # 성공 메시지와 함께 추가된 댓글 데이터를 JSON 형식으로 반환합니다.

# 특정 댓글을 업데이트하는 API 엔드포인트
@app.route('/update_comment/<comment_id>', methods=['POST'])
def update_comment(comment_id):
    new_comment = request.form.get('comment')
    rating = request.form.get('rating')
    photos = request.files.getlist('photos')
    # 요청에서 새로운 댓글 내용, 평점, 사진 파일 목록을 가져옵니다.

    if not new_comment or not rating:
        return jsonify({'error': 'Missing data'}), 400
    # 새로운 댓글 내용 또는 평점이 없는 경우 오류 메시지를 반환합니다.

    existing_comment = pins_collection.find_one({'comments._id': ObjectId(comment_id)}, {'comments.$': 1})
    if not existing_comment:
        return jsonify({'error': 'Comment not found'}), 404
    # 기존 댓글을 찾을 수 없는 경우 오류 메시지를 반환합니다.

    existing_photos = existing_comment['comments'][0]['photos']
    # 기존 댓글에서 사진 파일 이름 목록을 가져옵니다.

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
    # 새 사진 파일이 있는 경우, 기존 사진을 덮어씁니다.

    update_fields = {
        'comments.$.comment': new_comment,
        'comments.$.rating': int(rating),
        'comments.$.date': datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
        'comments.$.lastModified': datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
        'comments.$.photos': photo_filenames
    }
    # 댓글을 업데이트하기 위해 필요한 필드를 설정합니다.

    pins_collection.update_one(
        {'comments._id': ObjectId(comment_id)},
        {'$set': update_fields}
    )
    # 댓글의 ID로 댓글 데이터를 업데이트합니다.

    updated_comment = pins_collection.find_one(
        {'comments._id': ObjectId(comment_id)},
        {'comments.$': 1}
    )
    # 업데이트된 댓글을 다시 가져옵니다.

    if updated_comment:
        updated_comment = updated_comment['comments'][0]
        updated_comment['_id'] = str(updated_comment['_id'])
        # ObjectId를 문자열로 변환합니다.

    return jsonify({'success': True, 'comment': updated_comment})
    # 성공 메시지와 함께 업데이트된 댓글 데이터를 JSON 형식으로 반환합니다.

# 특정 댓글을 삭제하는 API 엔드포인트
@app.route('/delete_comment/<title>/<comment_id>', methods=['DELETE'])
def delete_comment(title, comment_id):
    result = pins_collection.update_one(
        {'title': title},
        {'$pull': {'comments': {'_id': ObjectId(comment_id)}}}
    )
    # 제목으로 핀을 찾아 댓글을 삭제합니다.

    if result.modified_count > 0:
        return jsonify({'success': True})
    else:
        return jsonify({'success': False, 'error': 'Comment not found'})
    # 성공 여부에 따라 성공 메시지 또는 오류 메시지를 반환합니다.

# 특정 댓글의 좋아요 수를 증가시키는 API 엔드포인트
@app.route('/like_comment/<comment_id>', methods=['POST'])
def like_comment(comment_id):
    pins_collection.update_one(
        {'comments._id': ObjectId(comment_id)},
        {'$inc': {'comments.$.likes': 1}}
    )
    # 댓글의 ID로 댓글의 좋아요 수를 1 증가시킵니다.

    return jsonify({'success': True})
    # 성공 메시지를 반환합니다.

# 애플리케이션 실행
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
    # Flask 애플리케이션을 실행합니다. 
    # host='0.0.0.0'으로 모든 네트워크 인터페이스에서 접속 가능하도록 하고, 포트는 5000번을 사용하며, 디버그 모드를 활성화합니다.
