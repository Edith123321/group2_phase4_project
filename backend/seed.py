from faker import Faker
from app import app, db  # Ensure you import the Flask app instance
from models import Product, Cart, User, CartItem  # Import models
import random

fake = Faker()

VALID_CATEGORIES = ["men's clothing", "women's clothing", "jewelries"]

def seed_data():
    with app.app_context():  # Establish application context
        users = [User(username=fake.user_name()) for _ in range(30)]
        db.session.bulk_save_objects(users)
        db.session.commit()
        print("Users seeded successfully!")

        products = [
            Product(
                name=fake.word().capitalize(),
                price=round(random.uniform(10, 100), 2),
                description=fake.sentence(),
                image=fake.image_url(),
                quantity=random.randint(1, 100),
                category=random.choice(VALID_CATEGORIES),
            ) for _ in range(30)
        ]
        db.session.bulk_save_objects(products)
        db.session.commit()
        print("Products seeded successfully!")

        carts = [
            Cart(
                user=random.choice(users),
                product=random.choice(products),
                quantity=random.randint(1, 5),
            ) for _ in range(30)
        ]
        db.session.bulk_save_objects(carts)
        db.session.commit()
        print("Carts seeded successfully!")

        cart_items = [
            CartItem(
                cart=random.choice(carts),
                product=random.choice(products),
                quantity=random.randint(1, 5),
            ) for _ in range(30)
        ]
        db.session.bulk_save_objects(cart_items)
        db.session.commit()
        print("CartItems seeded successfully!")

if __name__ == "__main__":
    seed_data()