import { Toaster } from "sonner"
import { ThemeProvider } from "@/providers/ThemeProvider"
import { QueryProvider } from "@/providers/QueryProvider"
import { AppRouter } from "@/routes"

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="app-theme">
      <QueryProvider>
        <AppRouter />
        <Toaster position="top-right" richColors closeButton />
      </QueryProvider>
    </ThemeProvider>
  )
}

export default App
