from flask import Flask, request, jsonify, make_response
from flask_migrate import Migrate
from flask_cors import CORS
from flask_restful import Api, Resource
from werkzeug.exceptions import BadRequest
from models import db, Product, CartItem
import json

# App configuration
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JSONIFY_PRETTYPRINT_REGULAR'] = True
app.json.compact = False

# CORS setup
CORS(app, resources={r"/*": {
    "origins": ["http://localhost:3000"],
    "methods": ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    "allow_headers": ["Content-Type"],
    "supports_credentials": True
}})

@app.after_request
def after_request(response):
    response.headers['Access-Control-Allow-Origin'] = 'http://localhost:3000'
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type,Authorization'
    response.headers['Access-Control-Allow-Methods'] = 'GET,POST,PUT,PATCH,DELETE,OPTIONS'
    response.headers['Access-Control-Allow-Credentials'] = 'true'
    return response


# Initialize extensions
db.init_app(app)
migrate = Migrate(app, db)
api = Api(app)

# Helper functions
def validate_required_fields(data, fields):
    if not all(field in data for field in fields):
        raise BadRequest(f"Missing required fields: {', '.join(fields)}")

# Resources
class ProductList(Resource):
    def get(self):
        products = [product.to_dict() for product in Product.query.all()]
        return make_response(jsonify(products), 200)

    def post(self):
        data = request.get_json()
        required_fields = ['title', 'price', 'description', 'main_image', 'category']
        validate_required_fields(data, required_fields)

        new_product = Product(
            title=data['title'],
            price=float(data['price']),
            description=data['description'],
            main_image=data['main_image'],
            category=data['category'],
            additional_images=data.get('additional_images', []),
            colors=data.get('colors', []),
            sizes=data.get('sizes', []),
            stock=data.get('stock', 0)
        )
        
        db.session.add(new_product)
        db.session.commit()
        return make_response(jsonify(new_product.to_dict()), 201)

class ProductResource(Resource):
    def get(self, id):
        product = Product.query.get(id)
        if not product:
            return {'error': 'Product not found'}, 404
        return make_response(jsonify(product.to_dict()), 200)

    def patch(self, id):
        product = Product.query.get(id)
        if not product:
            return {'error': 'Product not found'}, 404

        data = request.get_json()
        fields_to_update = ['title', 'price', 'description', 'main_image', 'category', 'stock']
        for field in fields_to_update:
            if field in data:
                setattr(product, field, data[field])

        for field in ['additional_images', 'colors', 'sizes']:
            if field in data:
                setattr(product, field, data.get(field, []))

        db.session.commit()
        return make_response(jsonify(product.to_dict()), 200)

    def delete(self, id):
        product = Product.query.get(id)
        if not product:
            return {'error': 'Product not found'}, 404

        # Delete associated cart items first
        CartItem.query.filter_by(product_id=id).delete()

        db.session.delete(product)
        db.session.commit()
        return {'message': 'Product deleted'}, 200

class CartResource(Resource):
    def get(self):
        cart_items = [item.to_dict() for item in CartItem.query.all()]
        return make_response(jsonify(cart_items), 200)

    def post(self):
        data = request.get_json()
        required_fields = ['product_id', 'selected_color', 'selected_size']
        validate_required_fields(data, required_fields)

        product = Product.query.get(data['product_id'])
        if not product:
            return {'error': 'Product not found'}, 404

        if (data['selected_color'] and data['selected_color'] not in (product.colors or [])) or \
           (data['selected_size'] and data['selected_size'] not in (product.sizes or [])):
            return {'error': 'Invalid variant selection'}, 400

        cart_item = CartItem.query.filter_by(
            product_id=data['product_id'],
            selected_color=data['selected_color'],
            selected_size=data['selected_size']
        ).first()

        quantity = data.get('quantity', 1)
        if cart_item:
            cart_item.quantity += quantity
        else:
            cart_item = CartItem(
                product_id=data['product_id'],
                selected_color=data['selected_color'],
                selected_size=data['selected_size'],
                quantity=quantity
            )
            db.session.add(cart_item)

        db.session.commit()
        return make_response(jsonify(cart_item.to_dict()), 201)

# Add resources to API
api.add_resource(ProductList, '/products')
api.add_resource(ProductResource, '/products/<int:id>')
api.add_resource(CartResource, '/cart')

# Run app
if __name__ == '__main__':
    with app.app_context():
        db.create_all()  # Ensure database tables are created
    app.run(port=5000, debug=True)
