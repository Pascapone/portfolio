# backend/app.py
import os, sys

from flask import Flask, render_template, request
from reverseProxy import proxyRequest
from mnist_classifier import classify_mnist_image
from imagenet_classifier import classify_image
import json
from astar_pathfinding import find_path
from grid import create_grid

node_config = json.load(open('../frontend/src/configs/pathfinding.json', 'r'))

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
        result = classify_mnist_image(image)
        print('Model classification: ' + result)        
        return result

@app.route('/api-classify-image', methods=['POST'])
def classify():    
    if (request.data): 
        url = request.data
        result = classify_image(url)        
        print('Model classification: ' + result)        
        return result

@app.route('/api-astar-find-path', methods=['POST'])
def astar_pathfinding():    
    if (request.data): 
        grid = json.loads(request.data)
        result, grid_history = find_path(grid, node_config)
        
        if result == 0:
            return { "status" : "no start node"}
        elif result == 1:
            return { "status" : "no finish node"}
        

        grid_history_object = []
        for step in grid_history:
            grid_history_object.append(
                [[{"row" : node.row, "col" : node.col, "nodeType" : node.node_type, "fCost" : node.f_cost} for node in row] for row in step]
            )

        if result == 2:
            return { "status" : "blocked", "path" : None, "gridHistory" : grid_history_object }

        return_path = []
        for node in result:
            return_path.append({'row' : node.row, 'col' : node.col})

        return { "status" : "success", "path" : return_path, "gridHistory" : grid_history_object }

@app.route('/api-populate-grid', methods=['POST'])
def populate_grid():    
    if (request.data):     
        data = json.loads(request.data)
        grid = create_grid(node_config, *data.values())
        grid = [[{'row' : node.row, 'col' : node.col, 'nodeType' : node.node_type} for node in row] for row in grid]
        return {'grid' : grid}