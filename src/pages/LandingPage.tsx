import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { ArrowRight, CheckCircle2, Rocket, Shield, Zap } from "lucide-react"

const LandingPage = () => {
  const features = [
    {
      title: "Fast Performance",
      description: "Optimized with Vite and modern React patterns for lightning-fast load times.",
      icon: Zap,
    },
    {
      title: "Secure by Default",
      description: "JWT authentication, route guards, and XSS prevention built-in.",
      icon: Shield,
    },
    {
      title: "Scalable Architecture",
      description: "Feature-based structure that grows with your team and complexity.",
      icon: Rocket,
    },
    {
      title: "Ready to Deploy",
      description: "Dockerized and CI/CD ready with GitHub Actions.",
      icon: CheckCircle2,
    },
  ]

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="py-20 px-6 bg-gradient-to-b from-background to-accent/20">
        <div className="container max-w-5xl mx-auto text-center space-y-8">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
            The Ultimate React Boilerplate for <span className="text-primary">Production</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Build scalable, high-performance web applications faster with our pre-configured stack: 
            React, TypeScript, Tailwind, Zustand, and TanStack Query.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <Button size="lg" asChild>
              <Link to="/register">
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="https://github.com" target="_blank" rel="noreferrer">
                View on GitHub
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl font-bold">Everything you need</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              We've included all the tools and best practices required to ship production-ready apps today.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="p-6 border rounded-xl bg-card hover:shadow-md transition-shadow">
                <div className="h-12 w-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
                  <feature.icon size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-primary text-primary-foreground">
        <div className="container mx-auto text-center space-y-6">
          <h2 className="text-3xl font-bold">Ready to start building?</h2>
          <p className="text-primary-foreground/80 max-w-xl mx-auto">
            Join thousands of developers using our boilerplate to launch their projects in record time.
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link to="/register">Start for Free</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}

export default LandingPage
