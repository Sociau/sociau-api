from flask import jsonify, request

from database.db import db
from src.helpers.upload_to_firebase import send_image_to_firebase
from src.entities.Post.model import Post


class PostController:
    @staticmethod
    def add():
        try:
            data = request.form
            main_photo = ""

            if 'main_photo' in request.files:
                main_photo_file = request.files['main_photo']

                if main_photo_file.filename == '':
                    return jsonify({'status': 400, 'message': 'No file selected'}), 400

                main_photo = send_image_to_firebase(
                    main_photo_file, 'fotos_dos_Posts')

            neighborhood = data.get('neighborhood')
            street = data.get('street')
            text = data.get('text')
            veterinary_event = bool(data.get('veterinary_event')) or False
            parterns_campaign = bool(data.get('parterns_campaign')) or False
            lost_animal = bool(data.get('lost_animal')) or False
            city = data.get('city')
            state = data.get('state')
            person_id = data.get('person_id')

            Post = Post(
                state=state,
                city=city,
                neighborhood=neighborhood,
                street=street,
                text=text,
                main_photo=main_photo,
                lost_animal=lost_animal,
                veterinary_event=veterinary_event,
                parterns_campaign=parterns_campaign,
                person_id=person_id,
            )

            db.session.add(Post)
            try:
                db.session.commit()
                print("Post salvo com sucesso!")
            except Exception as e:
                print(f"Erro ao salvar Post: {str(e)}")
                raise e

            response = {
                'status': 200,
                'message': 'success'
            }

            return jsonify(response)
        except Exception as e:
            response = {
                'status': 500,
                'message': str(e)
            }
            print(str(e))
            return jsonify(response)

    @staticmethod
    def get():
        try:
            filters = []

            name = request.args.get('name')
            if name:
                filters.append(Post.name.like(f"%{name}%"))

            species = request.args.get('species')
            if species:
                filters.append(Post.species == species)

            size = request.args.get('size')
            if size:
                filters.append(Post.size == size)

            gender = request.args.get('gender')
            if gender:
                if gender in ['M', 'F']:
                    filters.append(Post.gender == gender)
                else:
                    return jsonify({'status': 400, 'message': 'Invalid gender value'}), 400

            state = request.args.get('state')
            if state:
                filters.append(Post.state == state)

            city = request.args.get('city')
            if city:
                filters.append(Post.city == city)

            page = request.args.get('page', 1, type=int)
            per_page = request.args.get('per_page', 30, type=int)
            sort_by = request.args.get('sort_by', 'id')
            order = request.args.get('order', 'asc')
            query = Post.query.filter(*filters)

            if order == 'desc':
                query = query.order_by(getattr(Post, sort_by).desc())
            else:
                query = query.order_by(getattr(Post, sort_by).asc())

            pagination = query.paginate(
                page=page, per_page=per_page, error_out=False)
            Posts = [
                {
                    'Post': Post.to_dict()
                } for Post in pagination.items
            ]

            response = {
                'status': 200,
                'total': pagination.total,
                'pages': pagination.pages,
                'current_page': pagination.page,
                'per_page': pagination.per_page,
                'Posts': Posts
            }
            return jsonify(response), 200

        except Exception as e:
            print(str(e))
            return jsonify({'status': 500, 'message': 'Internal server error', 'error': str(e)}), 500

    @staticmethod
    def get_by_id(Post_id):
        try:
            Post = Post.query.get(Post_id)
            if not Post:
                return jsonify({'status': 404, 'message': 'Post not found'}), 404

            response = {
                'status': 200,
                'Post': Post.to_dict()
            }
            return jsonify(response), 200

        except Exception as e:
            return jsonify({'status': 500, 'message': 'Internal server error', 'error': str(e)}), 500
