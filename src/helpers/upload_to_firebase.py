from flask import jsonify

from src.services.firebase import upload_image_to_firebase


def send_image_to_firebase(image, folder):
    if image.mimetype not in ['image/jpeg', 'image/png']:
        response = {
            'status': 400,
            'message': 'Invalid file type'
        }
        return jsonify(response)

    image_url = upload_image_to_firebase(image, folder)

    if not image_url:
        response = {
            'status': 400,
            'message': 'Failed to upload image'
        }
        return jsonify(response)

    return image_url
