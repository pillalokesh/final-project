# 🥤 Amrutha Juice — Premium Juice Delivery Platform

Modern, animated, full-stack juice delivery web application built with React, Node.js, MongoDB, and deployed on AWS.

---

## 🚀 Features

### Frontend
- **Beautiful Landing Page** with animated login/signup
- **Dynamic Homepage** with hero banners, categories, offers, testimonials
- **12 Category Pages** — each with unique design and animations
- **Juice Detail Pages** with size/sugar/ice customization
- **Cart & Order System** with animated checkout
- **Contact Page** — sends emails to pillalokesh3@gmail.com
- **Profile Page** with order history
- **Wishlist System**
- **Dark Mode** support
- **Fully Responsive** mobile-first design
- **Framer Motion** animations throughout
- **Tailwind CSS** styling

### Backend
- **JWT Authentication** (signup, login, logout)
- **MongoDB** database with Mongoose
- **Nodemailer** integration for contact form
- **Order Management** API
- **Protected Routes** with middleware
- **Rate Limiting** and security headers
- **RESTful API** architecture

---

## 📁 Project Structure

```
final-project/
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.js
│   │   │   └── JuiceCard.js
│   │   ├── context/
│   │   │   └── AppContext.js
│   │   ├── data/
│   │   │   └── juices.js
│   │   ├── pages/
│   │   │   ├── LandingPage.js
│   │   │   ├── HomePage.js
│   │   │   ├── CategoryPage.js
│   │   │   ├── JuiceDetailPage.js
│   │   │   ├── CartPage.js
│   │   │   ├── ContactPage.js
│   │   │   ├── MenuPage.js
│   │   │   ├── WishlistPage.js
│   │   │   ├── ProfilePage.js
│   │   │   └── OffersPage.js
│   │   ├── App.js
│   │   ├── index.js
│   │   └── index.css
│   ├── package.json
│   ├── tailwind.config.js
│   ├── nginx.conf
│   └── Dockerfile
├── backend/
│   ├── config/
│   │   └── database.js
│   ├── models/
│   │   ├── User.js
│   │   └── Order.js
│   ├── middleware/
│   │   └── auth.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── contact.js
│   │   └── orders.js
│   ├── server.js
│   ├── package.json
│   ├── .env.example
│   └── Dockerfile
└── README.md
```

---

## 🛠️ Tech Stack

### Frontend
- React 18
- React Router DOM
- Tailwind CSS
- Framer Motion
- Axios
- React Hot Toast
- Lucide React Icons

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- Bcrypt.js
- Nodemailer
- Helmet (security)
- Express Rate Limit
- Morgan (logging)

### DevOps
- Docker
- Nginx
- AWS ECS Fargate
- AWS ECR
- AWS RDS (optional)
- GitHub Actions CI/CD

---

## 🚀 Local Development Setup

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)
- Git

### 1. Clone Repository
```bash
git clone <your-repo-url>
cd final-project
```

### 2. Backend Setup
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your MongoDB URI and email credentials
npm start
# Backend runs on http://localhost:5000
```

### 3. Frontend Setup
```bash
cd frontend
npm install
npm start
# Frontend runs on http://localhost:3000
```

### 4. Environment Variables

**Backend `.env`:**
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/amrutha-juice
JWT_SECRET=your_secret_key
CLIENT_URL=http://localhost:3000
SMTP_USER=pillalokesh3@gmail.com
SMTP_PASS=your_gmail_app_password
```

**Gmail App Password:**
1. Go to Google Account → Security
2. Enable 2-Step Verification
3. Generate App Password
4. Use in `SMTP_PASS`

---

## 📦 Production Deployment

### Docker Build
```bash
# Frontend
cd frontend
docker build -t amrutha-frontend .

# Backend
cd backend
docker build -t amrutha-backend .
```

### AWS ECS Deployment
Already configured with GitHub Actions in `.github/workflows/deploy.yml`

Push to `main` branch triggers automatic deployment to AWS ECS.

---

## 🎨 Features Breakdown

### Authentication System
- JWT-based auth with httpOnly cookies
- Signup with name, email, password
- Login with email, password
- Protected routes
- Auto-redirect if not logged in

### Cart System
- Add to cart with customization (size, sugar, ice)
- Quantity controls
- Coupon system (AMRUTHA20, B2G1FREE, WEEKEND30)
- Free delivery above ₹199
- Order confirmation with animated popup

### Contact Form
- Sends email to `pillalokesh3@gmail.com`
- Auto-reply to user
- Beautiful email templates
- Form validation

### Category Pages
Each of 12 categories has:
- Unique gradient theme
- Custom animations
- Filter & sort options
- Responsive grid layout

### Juice Detail Page
- Large product images
- Size selection (S, M, L, XL)
- Sugar level (no sugar, less, normal, extra)
- Ice level (no ice, less, normal, extra)
- Quantity selector
- Add to cart
- Related products

---

## 🔗 API Endpoints

### Auth
- `POST /api/auth/signup` — Register user
- `POST /api/auth/login` — Login user
- `GET /api/auth/me` — Get current user
- `POST /api/auth/logout` — Logout

### Contact
- `POST /api/contact` — Send contact email

### Orders
- `POST /api/orders` — Create order
- `GET /api/orders/my` — Get user orders
- `GET /api/orders/:id` — Get single order

---

## 🎯 Key Pages

| Page | Route | Description |
|------|-------|-------------|
| Landing | `/` | Login/Signup with animations |
| Home | `/home` | Hero, categories, trending, offers |
| Menu | `/menu` | All juices with search & filter |
| Category | `/category/:id` | Category-specific juices |
| Juice Detail | `/juice/:id` | Full product details |
| Cart | `/cart` | Cart items & checkout |
| Wishlist | `/wishlist` | Saved juices |
| Contact | `/contact` | Contact form |
| Profile | `/profile` | User profile & orders |
| Offers | `/offers` | All coupons & deals |

---

## 🎨 Design System

### Colors
- Primary: Orange (#f97316)
- Secondary: Pink (#ec4899)
- Accent: Purple (#a855f7)
- Background: Dark (#0a0a0a)

### Animations
- Framer Motion page transitions
- Floating fruit animations
- Hover effects on cards
- Loading skeletons
- Smooth scrolling

### Typography
- Display: Poppins
- Body: Inter

---

## 📧 Contact Email Setup

Contact form sends emails to: **pillalokesh3@gmail.com**

Uses Nodemailer with Gmail SMTP.

**Setup:**
1. Enable 2FA on Gmail
2. Generate App Password
3. Add to `.env` as `SMTP_PASS`

---

## 🚀 Deployment Status

- ✅ Frontend: React SPA
- ✅ Backend: Node.js API
- ✅ Database: MongoDB
- ✅ Email: Nodemailer
- ✅ Docker: Multi-stage builds
- ✅ CI/CD: GitHub Actions
- ✅ AWS: ECS Fargate deployment

---

## 📝 Future Enhancements

- [ ] Payment gateway integration (Razorpay/Stripe)
- [ ] Real-time order tracking with Socket.io
- [ ] Admin dashboard
- [ ] Push notifications
- [ ] Mobile app (React Native)
- [ ] AI chatbot assistant
- [ ] Loyalty points system
- [ ] Subscription plans

---

## 👨‍💻 Developer

**Lokesh Pilla**
- Email: pillalokesh3@gmail.com
- GitHub: [Your GitHub]

---

## 📄 License

MIT License — Free to use for personal and commercial projects.

---

## 🙏 Acknowledgments

- Unsplash for juice images
- Lucide for icons
- Tailwind CSS for styling
- Framer Motion for animations

---

**Built with ❤️ for Amrutha Juice 🥤**
