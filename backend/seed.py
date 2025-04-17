from app import app, db, Product, CartItem
from random import choice, randint, uniform

def seed_products():

    CartItem.query.delete()
    Product.query.delete()
    db.session.commit()

    
    
    categories = ["men's wear", "women's wear", "jewelry"]
    
    # Variants by category
    variants = {
        "men's wear": {
            "colors": ["Navy", "Black", "White", "Gray", "Olive"],
            "sizes": ["S", "M", "L", "XL", "XXL"]
        },
        "women's wear": {
            "colors": ["Black", "Blush", "Dusty Rose", "Ivory", "Emerald"],
            "sizes": ["XS", "S", "M", "L", "XL"]
        },
        "jewelry": {
            "colors": ["Gold", "Silver", "Rose Gold", "Platinum"],
            "sizes": ["One Size"]
        }
    }
    
    products_data = [
        # Men's Wear (15 items)
        {
            "title": "Classic Oxford Shirt",
            "price": 2549.99,
            "description": "100% cotton button-down shirt with spread collar",
            "main_image": "https://i.pinimg.com/474x/f7/42/64/f742644d552b4919f680cf3393593dad.jpg",
            "category": "men's wear",
            "stock": 50
        },
        {
            "title": "Slim Fit Chinos",
            "price": 1559.99,
            "description": "Stretch cotton twill pants with tapered leg",
            "main_image": "https://i.pinimg.com/474x/fe/d0/78/fed0780db2b9e24c29c9dae8d96fcc2b.jpg",
            "category": "men's wear",
            "stock": 35
        },
        {
            "title": "Cashmere Sweater",
            "price": 1299.99,
            "description": "Luxurious 100% cashmere crewneck sweater",
            "main_image": "https://i.pinimg.com/474x/9c/35/1b/9c351b806a239319a5b89a7bc1ad06f6.jpg",
            "category": "men's wear",
            "stock": 20
        },
        {
            "title": "Casual Jacket",
            "price": 2599.99,
            "description": "Lightweight jacket for casual outings",
            "main_image": "https://i.pinimg.com/474x/9d/8f/eb/9d8feb2099e795eeb40e3b911aa66254.jpg",
            "category": "men's wear",
            "stock": 40
        },
        {
            "title": "Summer Shorts",
            "price": 934.99,
            "description": "Comfortable cotton shorts for hot weather",
            "main_image": "https://i.pinimg.com/474x/bc/dc/b8/bcdcb8a092116c3ee191f654986bdadf.jpg",
            "category": "men's wear",
            "stock": 25
        },
        {
            "title": "Denim Jeans",
            "price": 1579.99,
            "description": "Classic straight fit jeans with durable fabric",
            "main_image": "https://i.pinimg.com/474x/9c/6e/f6/9c6ef6ccc31ffcdcd964727bba4c7a09.jpg",
            "category": "men's wear",
            "stock": 45
        },
        {
            "title": "Wool Overcoat",
            "price": 19999.99,
            "description": "Premium wool blend overcoat for cold weather",
            "main_image": "https://i.pinimg.com/474x/5b/2c/c7/5b2cc72b7f3a74743f4dd16a58d927e6.jpg",
            "category": "men's wear",
            "stock": 15
        },
        {
            "title": "Polo Shirt",
            "price": 1339.99,
            "description": "Breathable pique cotton polo with logo detail",
            "main_image": "https://i.pinimg.com/474x/20/e5/5e/20e55e578dde7ceea39c49e06c64327c.jpg",
            "category": "men's wear",
            "stock": 60
        },
        {
            "title": "Athletic Joggers",
            "price": 1554.99,
            "description": "Moisture-wicking joggers with elastic cuffs",
            "main_image": "https://i.pinimg.com/474x/d7/d1/38/d7d1389bea7e7de32e7991360c5bc021.jpg",
            "category": "men's wear",
            "stock": 30
        },
        {
            "title": "Formal Suit",
            "price": 14299.99,
            "description": "Tailored two-piece suit for special occasions",
            "main_image": "https://i.pinimg.com/474x/74/f8/66/74f866ea992c1d073d99fd51cfbadf33.jpg",
            "category": "men's wear",
            "stock": 10
        },
        # Women's Wear (15 items)
        {
            "title": "Wrap Dress",
            "price": 1579.99,
            "description": "Flattering viscose wrap dress with tie waist",
            "main_image": "https://i.pinimg.com/474x/39/22/c6/3922c6be81dfef90b168bf5e5823d88c.jpg",
            "category": "women's wear",
            "stock": 40
        },
        {
            "title": "High-Waisted Jeans",
            "price": 1069.99,
            "description": "Stretch denim with raw hem and distressed details",
            "main_image": "https://i.pinimg.com/474x/92/44/bc/9244bc446c0b4053d3714cbbc2b9ff90.jpg",
            "category": "women's wear",
            "stock": 30
        },
        {
            "title": "Silk Blouse",
            "price": 849.99,
            "description": "100% silk blouse with delicate button details",
            "main_image": "https://i.pinimg.com/474x/72/40/eb/7240ebf0c9f11b5e99e28ee3fc01ce63.jpg",
            "category": "women's wear",
            "stock": 25
        },
        {
            "title": "Leather Jacket",
            "price": 3149.99,
            "description": "Soft leather jacket with zippers",
            "main_image": "https://i.pinimg.com/736x/84/87/33/84873358af7215c4daf8a12447321202.jpg",
            "category": "women's wear",
            "stock": 15
        },
        {
            "title": "Maxi Skirt",
            "price": 1259.99,
            "description": "Flowy skirt with bohemian style",
            "main_image": "https://i.pinimg.com/474x/6a/af/34/6aaf346c2d3bdcd0bf5f631313d16541.jpg",
            "category": "women's wear",
            "stock": 20
        },
        {
            "title": "Knit Sweater",
            "price": 2665.99,
            "description": "Chunky knit sweater with roll neck",
            "main_image": "https://i.pinimg.com/474x/07/27/06/072706596d143f55bee5e04cc3bf6c27.jpg",
            "category": "women's wear",
            "stock": 35
        },
        {
            "title": "Tailored Blazer",
            "price": 1519.99,
            "description": "Structured blazer with notched lapels",
            "main_image": "https://i.pinimg.com/474x/47/12/a7/4712a79269e40e43652ea38ac19ac72b.jpg",
            "category": "women's wear",
            "stock": 18
        },
        {
            "title": "Lace Top",
            "price": 845.99,
            "description": "Feminine top with delicate lace detailing",
            "main_image": "https://i.pinimg.com/474x/ae/9f/8f/ae9f8f0983cc75d6290682bb57a2eea8.jpg",
            "category": "women's wear",
            "stock": 40
        },
        {
            "title": "Winter Coat",
            "price": 3179.99,
            "description": "Warm wool-blend coat with faux fur trim",
            "main_image": "https://i.pinimg.com/474x/fe/3f/fe/fe3ffea8adbac91ac7279657e9ee4dcf.jpg",
            "category": "women's wear",
            "stock": 12
        },
        {
            "title": "Yoga Set",
            "price": 1689.99,
            "description": "Matching sports bra and leggings set",
            "main_image": "https://i.pinimg.com/474x/89/a9/24/89a924d9ad8ab5e398107ffdc731bd22.jpg",
            "category": "women's wear",
            "stock": 25
        },
        # Jewelry (10 items)
        {
            "title": "Diamond Stud Earrings",
            "price": 24599.99,
            "description": "14K white gold with 0.5ct total diamond weight",
            "main_image": "https://i.pinimg.com/474x/8e/0d/09/8e0d097d47ea76a334de13f8368d39fe.jpg",
            "category": "jewelry",
            "stock": 15
        },
        {
            "title": "Pearl Necklace",
            "price": 14509.99,
            "description": "18-inch freshwater pearl strand with gold clasp",
            "main_image": "https://i.pinimg.com/474x/a8/6c/a1/a86ca11752db9a4cbcfafa691c766a3c.jpg",
            "category": "jewelry",
            "stock": 10
        },
        {
            "title": "Signet Ring",
            "price": 1699.99,
            "description": "Solid 14K gold ring with optional engraving",
            "main_image": "https://i.pinimg.com/474x/a1/04/24/a10424dc3ff3291f305cee960ec81386.jpg",
            "category": "jewelry",
            "stock": 8
        },
        {
            "title": "Gold Bracelet",
            "price": 24449.99,
            "description": "Elegant gold bracelet with intricate design",
            "main_image": "https://i.pinimg.com/474x/f2/b5/25/f2b525c58350a5c9dde44144c6ceba18.jpg",
            "category": "jewelry",
            "stock": 12
        },
        {
            "title": "Rose Gold Pendant",
            "price": 17529.99,
            "description": "Rose gold pendant with a minimalist design",
            "main_image": "https://i.pinimg.com/474x/e4/0c/69/e40c698334cfeff842ff5528913aba81.jpg",
            "category": "jewelry",
            "stock": 18
        },
        {
            "title": "Statement Earrings",
            "price": 8789.99,
            "description": "Geometric drop earrings in gold-plated brass",
            "main_image": "https://i.pinimg.com/474x/cf/ab/d5/cfabd59b0851a6b7d9970265ff9bbcd3.jpg",
            "category": "jewelry",
            "stock": 22
        },
        {
            "title": "Charm Bracelet",
            "price": 1459.99,
            "description": "Silver bracelet with customizable charms",
            "main_image": "https://i.pinimg.com/736x/29/24/d7/2924d74796aeccf488b503f8d97920dc.jpg",
            "category": "jewelry",
            "stock": 14
        },
        {
            "title": "Engagement Ring",
            "price": 9999.99,
            "description": "Solitaire diamond ring in platinum setting",
            "main_image": "https://i.pinimg.com/474x/7c/0e/14/7c0e14e41879d3e3391c7643124362d0.jpg",
            "category": "jewelry",
            "stock": 5
        },
        {
            "title": "Birthstone Necklace",
            "price": 18529.99,
            "description": "Personalized necklace with birthstone pendant",
            "main_image": "https://i.pinimg.com/474x/d8/15/02/d81502e247a01143629911e5bae22ec9.jpg",
            "category": "jewelry",
            "stock": 20
        },
        {
            "title": "Cuff Links",
            "price": 799.99,
            "description": "Sterling silver cufflinks with enamel detail",
            "main_image": "https://i.pinimg.com/474x/57/ca/1b/57ca1b6888753120d540bf3c03c32e58.jpg",
            "category": "jewelry",
            "stock": 16
        }
    ]

    for product_data in products_data:
        category = product_data["category"]
        product = Product(
            title=product_data["title"],
            price=product_data["price"],
            description=product_data["description"],
            main_image=product_data["main_image"],
            category=category,
            stock=product_data["stock"],
            colors=variants[category]["colors"],
            sizes=variants[category]["sizes"]
        )
        db.session.add(product)
    
    db.session.commit()
    print(f"✅ Seeded {len(products_data)} products across 3 categories!")

if __name__ == '__main__':
    with app.app_context():
        db.drop_all()
        db.create_all()
        seed_products()
    print("Database seeding completed!")