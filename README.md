# Golden Market

> A marketplace for legendary items and other things.

**Live Demo:** [https://diorshelton.github.io/golden-market](https://diorshelton.github.io/golden-market)

**Backend Repository:** [golden-market-api](https://github.com/diorshelton/golden-market-api)

Golden Market is a fantasy-themed e-commerce platform where users can browse, search, and purchase items to add to their inventory using virtual coins.

---

## Features

- **User Authentication**: Secure registration and login with JWT-based authentication
- **Coin Economy**: New users start with 5,000 coins to spend in the marketplace
- **Marketplace Browsing**: Browse fantasy items with category filtering and search
- **Shopping Cart**: Add, update, and remove items before checkout
- **Checkout Flow**: Purchase items with coins — balance updates instantly after each order
- **Order History**: View all past orders and their details
- **Inventory**: Track all items acquired through purchases
- **Protected Routes**: User-specific pages secured behind authentication
- **Responsive Design**: Mobile-first approach with Tailwind CSS

---

## Tech Stack

**Frontend**
- React 19
- TypeScript
- React Router v7
- Tailwind CSS 4
- Axios

**Build & Development**
- Vite 7
- ESLint

**Deployment**
- GitHub Pages
- GitHub Actions CI/CD

---

## Getting Started

### Prerequisites

- Node.js LTS
- npm

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/diorshelton/golden-market.git
   cd golden-market
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Create a local environment file
   ```bash
   touch .env.local
   ```

4. Add the API URL to `.env.local`
   ```env
   VITE_API_URL=https://golden-market-api.onrender.com/api/v1
   ```

5. Start the development server
   ```bash
   npm run dev
   ```

6. Open your browser to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The production-ready files will be in the `dist/` directory.

---

## Project Structure

```
src/
├── pages/                    # Full page components
│   ├── Marketplace           # Browse products with search & category filtering
│   ├── Cart                  # Shopping cart
│   ├── Checkout              # Order placement and coin deduction
│   ├── Order Confirmation    # Post-purchase summary
│   ├── Orders                # Order history
│   ├── Inventory             # Items acquired through purchases
│   ├── Profile               # User profile
│   ├── Login
│   └── Register
├── components/
│   ├── auth/                 # Protected route wrapper
│   ├── Navbar/               # Navigation with live coin balance
│   └── layout/               # Header and footer
├── services/api/             # API client and service modules
│   ├── Auth
│   ├── Products
│   ├── Cart
│   ├── Orders
│   ├── Inventory
│   └── Users
├── store/                    # Global auth state (AuthContext)
├── hooks/                    # useAuth hook
├── constants/                # Route constants
├── App.tsx                   # Root component with routing
└── main.tsx                  # Application entry point
```

---

## Roadmap

### ✅ Done
- User registration and login
- JWT authentication with sessionStorage token persistence
- Coin economy (5,000 starting balance, deducted on purchase)
- Marketplace with search and category filtering
- Shopping cart (add, update, remove items)
- Checkout with atomic order processing
- Order history
- User inventory
- Profile page
- GitHub Pages deployment with SPA routing support

### 💡 Future Ideas
- User avatars and customization
- Admin panel for product and coin management
- Same-domain deployment to fully leverage HttpOnly cookie auth

---

## Related Projects

- **Backend API**: [golden-market-api](https://github.com/diorshelton/golden-market-api) — Go REST API powering Golden Market

---

## Feedback & Suggestions

While this project is not currently open for contributions, suggestions and feedback are always welcome. Feel free to open an issue if you have ideas or spot any bugs.

---

**License:** TBD
