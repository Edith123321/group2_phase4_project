from flask_sqlalchemy import SQLAlchemy
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy import Column, String,Integer,ForeignKey, DateTime, Boolean
from sqlalchemy.orm import relationship
from sqlalchemy import MetaData
from sqlalchemy.ext.associationproxy import association_proxy

metadata=MetaData(naming_convention={
    "fk":"fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
})

db = SQLAlchemy(metadata=metadata)

class Product(db.Model,SerializerMixin):
    __tablename__='products'

    serialize_rules= ('-carts','-cart_items')

    id =db.Column(db.Integer,primary_key=True)
    name= db.Column(db.String, nullable=False)
    price=db.Column(db.Float,nullable=False)
    description=db.Column(db.String,nullable=False)
    image=db.Column(db.String,nullable=False)
    quantity=db.Column(db.Integer)
    created_at=db.Column(db.DateTime,server_default=db.func.now())
    updated_at=db.Column(db.DateTime,onupdate=db.func.now())
    category=db.Column(db.String,nullable=False)

    carts= db.relationship('Cart',back_populates='product')
    cart_items= db.relationship('CartItem',back_populates='product',cascade='all, delete-orphan')

    users= association_proxy('carts', 'user', creator= lambda user_obj: Cart(user=user_obj))
    carts_proxy= association_proxy('cart_items', 'cart', creator= lambda cart_obj: CartItem(cart=cart_obj))

    def __repr__(self):
        return f'<Product {self.id},{self.name},{self.price}>'
    
class Cart(db.Model,SerializerMixin):
     __tablename__= 'carts'

     serialize_rules=('-product','-user')

     id= db.Column(db.Integer,primary_key=True)
     user_id= db.Column(db.Integer,db.ForeignKey('users.id'))
     product_id= db.Column(db.Integer,db.ForeignKey('products.id'))
     quantity= db.Column(db.Integer,nullable=False,default=1)
     created_at=db.Column(db.DateTime,server_default=db.func.now())
     updated_at=db.Column(db.DateTime,onupdate=db.func.now())

     user= db.relationship('User',back_populates='carts')
     product= db.relationship('Product',back_populates='carts')
     cart_items= db.relationship('CartItem',back_populates='cart',cascade='all,delete-orphan')

     products= association_proxy('cart_items', 'product' , creator= lambda product_obj: CartItem(product=product_obj))

     def __repr__(self):
        return f'<Cart {self.id},{self.user_id},{self.product_id},{self.quantity}>'
        
class User(db.Model,SerializerMixin):
     __tablename__= 'users'

     serialize_rules= ('-carts')
     id= db.Column(db.Integer,primary_key=True)
     username= db.Column(db.String,nullable=False)

     carts= db.relationship('Cart',back_populates='user')
        
     products= association_proxy('carts', 'product', creator= lambda product_obj: Cart(product=product_obj))

     def __repr__(self):
         return f'<User {self.id},{self.username}>'
     
class CartItem(db.Model,SerializerMixin):
    __tablename__= 'cart_items'

    serialize_rules=('-cart','-product')

    id= db.Column(db.Integer,primary_key=True)
    cart_id= db.Column(db.Integer,db.ForeignKey('carts.id'))
    product_id= db.Column(db.Integer,db.ForeignKey('products.id'))
    quantity= db.Column(db.Integer,nullable=False,default=1)

    product= db.relationship('Product',back_populates='cart_items')
    cart= db.relationship('Cart',back_populates='cart_items')

    def __repr__(self):
        return f'<CartItem {self.id}, {self.cart_id}, {self.product_id}>'

