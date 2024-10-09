from flask import Flask
from flask_cors import CORS
from routes.api import api
from dotenv import load_dotenv
import os

load_dotenv()   

app = Flask(__name__)
CORS(app)   

@app.route('/')
def index():
    return "Welcome to the Flask API!"

@app.route('/robots.txt')
def robots():
    return "User-agent: *\nDisallow: /", 200, {'Content-Type': 'text/plain'}

 
app.register_blueprint(api, url_prefix='/api')

if __name__ == '__main__':
    app.run(port=5000, debug=True)   
