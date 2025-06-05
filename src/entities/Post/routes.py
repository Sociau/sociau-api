from flask import Blueprint

from src.middlewares.jwt import token_required
from src.entities.Post.controller import PostController


post_routes = Blueprint('post', __name__)


@post_routes.route('/post', methods=['POST'])
@token_required
def add_pet_route(current_user):
    return PostController.add()


@post_routes.route('/post', methods=['GET'])
def get_pets_route():
    return PostController.get()


@post_routes.route('/post/<int:post_id>', methods=['GET'])
def get_post_route(post_id):
    return PostController.get_by_id(post_id)
