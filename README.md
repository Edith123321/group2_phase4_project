# group2_phase4_project
# Mintmade store

A full-stack e-commerce application with product catalog, shopping cart, and checkout functionality.

## Features

- **Product Catalog**
  - Browse products by category
  - Search functionality
  - Product details pages

- **Shopping Cart**
  - Add/remove products
  - Adjust quantities
  - Color and size variants support
  - Real-time price calculation

- **User Experience**
  - Responsive design
  - Intuitive navigation
  - Loading states
  - Empty state handling

## Technologies Used

### Frontend
- React.js
- React Router
- Context API (State Management)
- CSS Modules
- React Icons

### Backend
- Flask (Python)
- SQLAlchemy (ORM)
- SQLite (Database)

## Installation

### Prerequisites
- Node.js (v14+)
- Python (v3.8+)
- npm or yarn

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
2. Create and activate a virtual environment:
```bash 
   pipenv install
   pipenv shell
```
3. Install dependencies:
```bash
   pip install -r requirements.txt
```
4. Initialize the database:
```bash
   python seed.py
```
5. Start the server:
```bash
   python app.py
```

### Frontend Setup
1. Navigate to the frontend directory:
```bash
   cd frontend
```
2. Install dependencies:
```bash
   npm install
```

### API Endpoints
| Endpoint           | Method | Description                  |
|--------------------|--------|------------------------------|
| `/products`        | GET    | Get all products             |
| `/products`        | POST   | Create new product           |
| `/products/:id`    | GET    | Get single product           |
| `/products/:id`    | PATCH  | Update product               |
| `/products/:id`    | DELETE | Delete product               |
| `/cart`            | GET    | Get cart items               |
| `/cart`            | POST   | Add to cart                  |
| `/cart`            | PATCH  | Update cart item             |
| `/cart`            | DELETE | Remove from cart             |

### Future Improvements
- User authentication
- Product reviews and ratings
- Order history
- Payment integration
- Admin dashboard

### Contributing
- Fork the project
- Create your feature branch (git checkout -b feature/AmazingFeature)
- Commit your changes (git commit -m 'Add some amazing feature')
- Push to the branch (git push origin feature/AmazingFeature)
- Open a Pull Request

### Contact
- Email - edithgithinji2020@gmail.com
- Github repo - https://github.com/Edith123321/group2_phase4_project