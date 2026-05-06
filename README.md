# Production-Ready React + TypeScript Boilerplate

This is a high-performance, scalable, and feature-rich React boilerplate built with modern best practices.

## 🚀 Features

- **Core**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, PostCSS, Dark Mode
- **UI Components**: shadcn/ui (custom implementation)
- **Routing**: React Router DOM (Lazy loading, Protected routes)
- **State Management**: Zustand (Persisted)
- **API Layer**: Axios (Interceptors, Global error handling)
- **Data Fetching**: TanStack Query (Caching, Mutations)
- **Forms**: React Hook Form + Zod validation
- **Tables**: TanStack Table (Sorting, Filtering, Pagination)
- **Charts**: Recharts integration
- **Notifications**: Sonner Toast
- **Dev Tools**: ESLint, Prettier, Husky, Lint-staged, Commitlint
- **Infrastructure**: Docker & Docker Compose (Multi-stage builds)
- **CI/CD**: GitHub Actions

## 🛠️ Project Structure

```text
src/
├── assets/          # Static assets (images, fonts, etc.)
├── components/
│   ├── ui/          # Low-level UI components (shadcn/ui style)
│   ├── common/      # Shared components across the app
│   └── layouts/     # Page layout wrappers (Main, Auth, Dashboard)
├── pages/           # Page components organized by feature
├── routes/          # Routing configuration and route guards
├── hooks/           # Custom React hooks
├── services/        # API services and external integrations
├── store/           # Global state management (Zustand)
├── lib/             # Third-party library configurations
├── utils/           # Helper functions and formatters
├── types/           # TypeScript interfaces and types
├── providers/       # Context providers (Theme, Query, Auth)
├── constants/       # App-wide constants
├── schemas/         # Zod validation schemas
├── queries/         # Custom TanStack Query hooks
└── contexts/        # React Contexts
```

## 📦 Getting Started

### Prerequisites

- Docker and Docker Compose
- Node.js 20+ (if running locally)

### Using Docker (Recommended)

1. Clone the repository.
2. Start the development server:
   ```bash
   docker compose up
   ```
3. Open [http://localhost:5173](http://localhost:5173) in your browser.

### Local Development

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the dev server:
   ```bash
   npm run dev
   ```

## 🧪 Testing & Linting

- **Run Tests**: `npm run test`
- **Lint Code**: `npm run lint`
- **Format Code**: `npm run format`

## 📄 License

MIT
