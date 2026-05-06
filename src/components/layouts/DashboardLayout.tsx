import { Outlet, Link, useLocation } from "react-router-dom"
import { useAuthStore } from "@/store/useAuthStore"
import { useTheme } from "@/providers/ThemeProvider"
import { 
  LayoutDashboard, 
  Users, 
  Settings, 
  LogOut, 
  Moon, 
  Sun,
  Bell,
  Search
} from "lucide-react"
import { cn } from "@/lib/utils"

const SidebarItem = ({ to, icon: Icon, label, active }: { to: string, icon: any, label: string, active: boolean }) => (
  <Link
    to={to}
    className={cn(
      "flex items-center gap-3 px-3 py-2 rounded-md transition-colors text-sm font-medium",
      active 
        ? "bg-primary text-primary-foreground" 
        : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
    )}
  >
    <Icon size={18} />
    {label}
  </Link>
)

const DashboardLayout = () => {
  const { user, logout } = useAuthStore()
  const { theme, setTheme } = useTheme()
  const location = useLocation()

  const navItems = [
    { to: "/dashboard", icon: LayoutDashboard, label: "Overview" },
    { to: "/dashboard/users", icon: Users, label: "Users" },
    { to: "/dashboard/settings", icon: Settings, label: "Settings" },
  ]

  return (
    <div className="min-h-screen flex bg-background">
      {/* Sidebar */}
      <aside className="w-64 border-r hidden md:flex flex-col">
        <div className="p-6 border-b">
          <Link to="/" className="flex items-center gap-2 font-bold text-xl">
            <span>Boilerplate</span>
          </Link>
        </div>
        
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => (
            <SidebarItem 
              key={item.to} 
              {...item} 
              active={location.pathname === item.to} 
            />
          ))}
        </nav>

        <div className="p-4 border-t space-y-2">
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="flex w-full items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            {theme === "dark" ? "Light Mode" : "Dark Mode"}
          </button>
          <button
            onClick={logout}
            className="flex w-full items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 border-b flex items-center justify-between px-6 bg-card">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative max-w-md w-full hidden sm:block">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <input
                type="search"
                placeholder="Search..."
                className="w-full bg-background border rounded-md py-2 pl-9 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 rounded-full hover:bg-accent relative">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-destructive rounded-full" />
            </button>
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium">{user?.name || "User"}</p>
                <p className="text-xs text-muted-foreground">{user?.email || "user@example.com"}</p>
              </div>
              <div className="h-9 w-9 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
                {user?.name?.[0] || "U"}
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout
