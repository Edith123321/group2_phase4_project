from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData

metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
})
db = SQLAlchemy(metadata=metadata)

class Product(db.Model):
    __tablename__ = 'products'
    
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(120), nullable=False)
    price = db.Column(db.Float, nullable=False)
    description = db.Column(db.Text, nullable=False)
    main_image = db.Column(db.String(255), nullable=False)
    additional_images = db.Column(db.JSON)  # Array of image URLs
    colors = db.Column(db.JSON)  # Array of color options
    sizes = db.Column(db.JSON)   # Array of size options
    category = db.Column(db.String(80), nullable=False)
    stock = db.Column(db.Integer, default=0)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())
    
    cart_items = db.relationship('CartItem', back_populates='product')

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'price': self.price,
            'description': self.description,
            'main_image': self.main_image,
            'additional_images': self.additional_images or [],
            'colors': self.colors or [],
            'sizes': self.sizes or [],
            'category': self.category,
            'stock': self.stock,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        }

class CartItem(db.Model):
    __tablename__ = 'cart_items'
    
    id = db.Column(db.Integer, primary_key=True)
    product_id = db.Column(db.Integer, db.ForeignKey('products.id'))
    quantity = db.Column(db.Integer, default=1)
    selected_color = db.Column(db.String(50))
    selected_size = db.Column(db.String(50))
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    
    product = db.relationship('Product', back_populates='cart_items')

    def to_dict(self):
        return {
            'id': self.id,
            'product_id': self.product_id,
            'product': self.product.to_dict() if self.product else None,
            'quantity': self.quantity,
            'selected_color': self.selected_color,
            'selected_size': self.selected_size,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }