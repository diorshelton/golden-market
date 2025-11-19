# Golden Market

> A marketplace for legendary items and other things.

**Live Demo:** [https://diorshelton.github.io/golden-market](https://diorshelton.github.io/golden-market)

**Backend Repository:** [golden-market-api](https://github.com/diorshelton/golden-market-api)

Golden Market is a fantasy-themed e-commerce platform where users can browse, search, and purchase items to add to their inventory.

---

## Features

- **User Authentication**: Secure registration and login with JWT-based authentication
- **Protected Routes**: Profile pages and user-specific content secured behind authentication
- **Marketplace Browsing**: Browse fantasy items with category filtering and search
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Modern React**: Built with React 19 and the latest React Compiler for optimal performance
- **Type Safety**: Full TypeScript implementation with strict mode enabled

---

## Tech Stack

**Frontend**
- React 19.1.1
- TypeScript 5.9
- React Router v7
- Tailwind CSS 4

**Build & Development**
- Vite 7
- ESLint with React plugins
- React Compiler (Babel plugin)

**Deployment**
- GitHub Pages
- GitHub Actions CI/CD

---

## Getting Started

### Prerequisites

- Node.js LTS (latest Long Term Support version)
- npm or yarn

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/diorshelton/golden-market-fe.git
   cd golden-market-fe
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Create environment file
   ```bash
   # Create .env.local file in the root directory
   touch .env.local
   ```

4. Add your environment variables to `.env.local`
   ```env
   VITE_API_URL=http://localhost:8080
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
├── pages/              # Full page components
│   ├── MarketProto.tsx    # Main marketplace with search & filtering
│   ├── Login.tsx          # User authentication
│   ├── Register.tsx       # New user registration
│   └── Profile.tsx        # User profile (protected route)
├── components/         # Reusable components
│   ├── Header.tsx         # Navigation header
│   ├── Footer.tsx         # Footer component
│   └── ProtectedRoute.tsx # Authentication wrapper
├── config/
│   └── api.ts             # API client configuration
├── assets/             # Static assets (images, icons)
├── App.tsx             # Root component with routing
└── main.tsx            # Application entry point
```

---

## Roadmap

### ✅ Done
- User registration and login
- JWT authentication with token refresh
- Basic marketplace prototype UI with search and filtering
- Profile page prototype

### 🚧 Working On Now
- Connecting frontend to backend API
- Product catalog (both API and UI)
- Shopping cart functionality
- Purchase flow and checkout

### 📋 Next Up
- User inventory page
- Advanced search and filters
- Order history

### 💡 Future Ideas
- User avatars and customization
- Admin panel for product management

---

## Known Limitations

- **Backend Integration**: Frontend is not yet fully connected to the backend API. Currently using mock data for development.
- **Feature Completeness**: Shopping cart and purchase functionality are in active development.

---

## Related Projects

- **Backend API**: [golden-market-api](https://github.com/diorshelton/golden-market-api) - The Node.js backend powering Golden Market

---

## Feedback & Suggestions

While this project is not currently open for contributions, suggestions and feedback are always welcome! Feel free to open an issue if you have ideas or spot any bugs.

---

**License:** TBD
