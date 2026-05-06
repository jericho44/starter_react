import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Link, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"
import { useState } from "react"

const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

type RegisterFormValues = z.infer<typeof registerSchema>

const RegisterPage = () => {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  })

  const onSubmit = async (data: RegisterFormValues) => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))
      
      toast.success("Account created successfully! Please login.")
      navigate("/login")
    } catch (error) {
      toast.error("Registration failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center lg:text-left">
        <h1 className="text-3xl font-bold">Create an account</h1>
        <p className="text-muted-foreground">Enter your details below to create your account</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium" htmlFor="name">Full Name</label>
          <Input
            id="name"
            placeholder="John Doe"
            disabled={isLoading}
            {...register("name")}
          />
          {errors.name && (
            <p className="text-sm text-destructive font-medium">{errors.name.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium" htmlFor="email">Email</label>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            disabled={isLoading}
            {...register("email")}
          />
          {errors.email && (
            <p className="text-sm text-destructive font-medium">{errors.email.message}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium" htmlFor="password">Password</label>
          <Input
            id="password"
            type="password"
            disabled={isLoading}
            {...register("password")}
          />
          {errors.password && (
            <p className="text-sm text-destructive font-medium">{errors.password.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium" htmlFor="confirmPassword">Confirm Password</label>
          <Input
            id="confirmPassword"
            type="password"
            disabled={isLoading}
            {...register("confirmPassword")}
          />
          {errors.confirmPassword && (
            <p className="text-sm text-destructive font-medium">{errors.confirmPassword.message}</p>
          )}
        </div>

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
          Create Account
        </Button>
      </form>

      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link to="/login" className="text-primary hover:underline font-medium">
          Login
        </Link>
      </p>
    </div>
  )
}

export default RegisterPage
