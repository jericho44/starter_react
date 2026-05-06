import { Outlet, Link } from "react-router-dom"
import { useAuthStore } from "@/store/useAuthStore"
import { useTheme } from "@/providers/ThemeContext"
import { Moon, Sun, Menu, X } from "lucide-react"
import { useState } from "react"

const MainLayout = () => {
  const { isAuthenticated, logout } = useAuthStore()
  const { theme, setTheme } = useTheme()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link to="/" className="flex items-center space-x-2">
              <span className="inline-block font-bold text-xl">Boilerplate</span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link to="/" className="transition-colors hover:text-primary">Home</Link>
            <Link to="/features" className="transition-colors hover:text-primary">Features</Link>
            <Link to="/pricing" className="transition-colors hover:text-primary">Pricing</Link>
          </nav>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-md hover:bg-accent transition-colors"
            >
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {isAuthenticated ? (
              <div className="flex items-center gap-4">
                <Link to="/dashboard" className="text-sm font-medium hover:text-primary">Dashboard</Link>
                <button 
                  onClick={logout}
                  className="bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-medium hover:bg-primary/90 transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Link to="/login" className="text-sm font-medium hover:text-primary">Login</Link>
                <Link 
                  to="/register" 
                  className="bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-medium hover:bg-primary/90 transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            )}

            <button 
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-b bg-background p-4 flex flex-col gap-4 animate-in slide-in-from-top duration-300">
          <Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
          <Link to="/features" onClick={() => setIsMenuOpen(false)}>Features</Link>
          <Link to="/pricing" onClick={() => setIsMenuOpen(false)}>Pricing</Link>
          <hr />
          {!isAuthenticated ? (
            <>
              <Link to="/login" onClick={() => setIsMenuOpen(false)}>Login</Link>
              <Link to="/register" onClick={() => setIsMenuOpen(false)}>Sign Up</Link>
            </>
          ) : (
            <Link to="/dashboard" onClick={() => setIsMenuOpen(false)}>Dashboard</Link>
          )}
        </div>
      )}

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            Built as a Boilerplate. The source code is available on GitHub.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default MainLayout
