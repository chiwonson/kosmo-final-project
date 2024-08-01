from flask import Flask, render_template, jsonify, request, redirect, url_for, send_from_directory
from werkzeug.utils import secure_filename
from pymongo import MongoClient
from PIL import Image
import math
import datetime
import os

app = Flask(__name__)

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

    pins = list(pins_collection.find(query, {'_id': 0}).skip((page - 1) * per_page).limit(per_page))
    
    # 각 핀 데이터에 댓글 수 추가
    for pin in pins:
        pin['comment_count'] = len(pin.get('comments', []))
    
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

    pins = list(pins_collection.find(query, {'_id': 0}).skip((page - 1) * per_page).limit(per_page))
    
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

    pins = list(pins_collection.find(query, {'_id': 0}))
    
    return jsonify({'pins': pins})

@app.route('/like_pin/<title>', methods=['POST'])
def like_pin(title):
    pins_collection.update_one({'title': title}, {'$inc': {'likes': 1}})
    return jsonify({'success': True})

@app.route('/add_comment/<title>', methods=['POST'])
def add_comment(title):
    comment = request.form.get('comment')
    author = request.form.get('author')
    photos = request.files.getlist('photos')
    
    if not comment or not author:
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
        'author': author,
        'comment': comment,
        'date': datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
        'photos': photo_filenames
    }
    
    pins_collection.update_one({'title': title}, {'$push': {'comments': comment_data}})
    return jsonify({'success': True, 'comment': comment_data})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
