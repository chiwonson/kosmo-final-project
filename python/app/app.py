from flask import Flask, render_template, jsonify, request, redirect, url_for, send_from_directory
from werkzeug.utils import secure_filename
from pymongo import MongoClient
from bson.objectid import ObjectId
from PIL import Image
import math
import datetime
import os
import pymysql

app = Flask(__name__)

# MySQL 데이터베이스 연결 설정
db_conn = pymysql.connect(
    host='localhost',
    user='root',
    password='admin1234',
    database='bakery'
)

# 파일 업로드 설정
UPLOAD_FOLDER = os.path.join(os.getcwd(), 'python', 'app', 'uploads')
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def resize_image(image_path, output_size=(800, 800)):
    with Image.open(image_path) as img:
        img.thumbnail(output_size)
        img.save(image_path)

# MongoDB 클라이언트를 설정하여 로컬 MongoDB 서버에 연결합니다.
client = MongoClient('mongodb://localhost:27017')
db = client['mydatabase']
pins_collection = db['pins']

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/recommend')
def menus():
    return render_template('recommend.html', menu='카페/빵집 추천', url='')

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
        pin['_id'] = str(pin['_id'])  # ObjectId를 문자열로 변환

        # 댓글의 ObjectId를 문자열로 변환
        for comment in pin.get('comments', []):
            comment['_id'] = str(comment['_id'])

    return render_template('sall.html', pins=pins, page=page, total_pages=total_pages, search_type=search_type, search_query=search_query)

@app.route('/add_pin', methods=['POST'])
def add_pin():
    data = request.form.to_dict()
    photos = request.files.getlist('photos')

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
    data['likes'] = 0
    data['views'] = 0
    data['comments'] = []

    result = pins_collection.insert_one(data)
    data['_id'] = str(result.inserted_id)

    return jsonify({"success": True, "pin": data}), 200

@app.route('/uploads/<filename>')
def uploaded_file(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)

@app.route('/insert')
def insert():
    return render_template('insert.html')

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
            'phone': request.form['phone']
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

@app.route('/delete_pin/<title>', methods=['POST'])
def delete_pin(title):
    pins_collection.delete_one({'title': title})
    return redirect(url_for('sall'))

@app.route('/pins_nearby', methods=['GET'])
def pins_nearby():
    lat = float(request.args.get('lat'))
    lng = float(request.args.get('lng'))
    radius_km = 50

    query = {
        'lat': {'$gte': str(lat - 0.45), '$lte': str(lat + 0.45)},
        'lng': {'$gte': str(lng - 0.45), '$lte': str(lng + 0.45)}
    }

    pins = list(pins_collection.find(query))

    # ObjectId를 문자열로 변환
    for pin in pins:
        pin['_id'] = str(pin['_id'])
        for comment in pin.get('comments', []):
            comment['_id'] = str(comment['_id'])

    return jsonify({'pins': pins})

@app.route('/like_pin/<title>', methods=['POST'])
def like_pin(title):
    pins_collection.update_one({'title': title}, {'$inc': {'likes': 1}})
    return jsonify({'success': True})

@app.route('/add_comment/<title>', methods=['POST'])
def add_comment(title):
    author = request.form.get('author')

    if not author:
        return jsonify({'error': 'Missing data'}), 400

    # MySQL 데이터베이스에서 작성자 검증
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
        'photos': photo_filenames
    }

    pins_collection.update_one({'title': title}, {'$push': {'comments': comment_data}})
    
    # ObjectId를 문자열로 변환
    comment_data['_id'] = str(comment_data['_id'])
    
    return jsonify({'success': True, 'comment': comment_data})

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

    photo_filenames = existing_photos  # 기본적으로 기존 사진 사용
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

@app.route('/delete_comment/<title>/<comment_id>', methods=['POST'])
def delete_comment(title, comment_id):
    result = pins_collection.update_one(
        {'title': title},
        {'$pull': {'comments': {'_id': ObjectId(comment_id)}}}
    )
    if result.modified_count > 0:
        return jsonify({'success': True})
    else:
        return jsonify({'success': False, 'error': 'Comment not found'})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
