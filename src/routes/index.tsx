import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom"
import { useAuthStore } from "@/store/useAuthStore"
import { lazy, Suspense } from "react"
import MainLayout from "@/components/layouts/MainLayout"
import AuthLayout from "@/components/layouts/AuthLayout"
import DashboardLayout from "@/components/layouts/DashboardLayout"
import { Loader2 } from "lucide-react"

// Lazy loaded pages
const LandingPage = lazy(() => import("@/pages/LandingPage"))
const LoginPage = lazy(() => import("@/pages/auth/LoginPage"))
const RegisterPage = lazy(() => import("@/pages/auth/RegisterPage"))
const DashboardPage = lazy(() => import("@/pages/dashboard/DashboardPage"))
const UserPage = lazy(() => import("@/pages/dashboard/UserPage"))

const LoadingFallback = () => (
  <div className="flex h-screen w-full items-center justify-center">
    <Loader2 className="h-10 w-10 animate-spin text-primary" />
  </div>
)

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuthStore()
  if (!isAuthenticated) return <Navigate to="/login" replace />
  return <>{children}</>
}

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuthStore()
  if (isAuthenticated) return <Navigate to="/dashboard" replace />
  return <>{children}</>
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <LandingPage />
          </Suspense>
        ),
      },
    ],
  },
  {
    element: (
      <PublicRoute>
        <AuthLayout />
      </PublicRoute>
    ),
    children: [
      {
        path: "login",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <LoginPage />
          </Suspense>
        ),
      },
      {
        path: "register",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <RegisterPage />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <DashboardPage />
          </Suspense>
        ),
      },
      {
        path: "users",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <UserPage />
          </Suspense>
        ),
      },
    ],
  },
])

export const AppRouter = () => {
  return <RouterProvider router={router} />
}
