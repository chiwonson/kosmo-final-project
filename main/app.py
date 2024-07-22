from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def index():
    return 'Hello, BreadTour! This is my Flask app.'

if __name__ == '__main__':
    app.run(debug=True)
