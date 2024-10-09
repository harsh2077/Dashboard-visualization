from flask import Blueprint
from controllers.data_controller import get_data, add_data

api = Blueprint('api', __name__)

api.route('/data', methods=['GET'])(get_data)
api.route('/data', methods=['POST'])(add_data)
