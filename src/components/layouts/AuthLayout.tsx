import { Outlet } from "react-router-dom"

const AuthLayout = () => {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="hidden lg:flex flex-col justify-between bg-zinc-900 p-12 text-white">
        <div className="flex items-center gap-2 text-lg font-medium">
          <div className="h-8 w-8 rounded-md bg-white text-black flex items-center justify-center font-bold">A</div>
          Boilerplate Project
        </div>
        
        <div className="space-y-4">
          <blockquote className="space-y-2">
            <p className="text-lg">
              "This boilerplate has saved us countless hours of setup. The structure is perfect and the code is clean."
            </p>
            <footer className="text-sm">Sofia Davis, CTO at Acme Inc</footer>
          </blockquote>
        </div>
      </div>
      
      <div className="flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-sm space-y-6">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default AuthLayout
