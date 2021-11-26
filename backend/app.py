# backend/app.py
import os, sys

from flask import Flask, render_template, request
from reverseProxy import proxyRequest
from mnist_classifier import classify_mnist_image
from imagenet_classifier import classify_image

MODE = os.getenv('FLASK_ENV')
DEV_SERVER_URL = 'http://localhost:3000/'

app = Flask(__name__)

# Ignore static folder in development mode.
if MODE == "development":
    app = Flask(__name__, static_folder=None)

@app.route('/')
@app.route('/<path:path>')
def index(path=''):
    if MODE == 'development':
        return proxyRequest(DEV_SERVER_URL, path)
    else:
        return render_template("index.html")

@app.route('/api-classify-mnist', methods=['POST'])
def classify_mnist():    
    if (request.data): 
        image = request.data
        # print('-------This is error output-------', url, file=sys.stderr)
        result = classify_mnist_image(image)
        print('Model classification: ' + result)        
        return result

@app.route('/api-classify-image', methods=['POST'])
def classify():    
    if (request.data): 
        url = request.data
        # print('-------This is error output-------', url, file=sys.stderr)
        result = classify_image(url)        
        print('Model classification: ' + result)        
        return result