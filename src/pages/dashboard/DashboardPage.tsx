import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/button"
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from "recharts"
import { Users, DollarSign, CreditCard, Activity } from "lucide-react"

const data = [
  { name: "Jan", total: 1200 },
  { name: "Feb", total: 2100 },
  { name: "Mar", total: 1800 },
  { name: "Apr", total: 2400 },
  { name: "May", total: 1700 },
  { name: "Jun", total: 2800 },
  { name: "Jul", total: 3200 },
]

const StatCard = ({ title, value, icon: Icon, description }: any) => (
  <div className="rounded-xl border bg-card p-6 shadow-sm">
    <div className="flex items-center justify-between space-y-0 pb-2">
      <h3 className="text-sm font-medium tracking-tight">{title}</h3>
      <Icon className="h-4 w-4 text-muted-foreground" />
    </div>
    <div className="pt-2">
      <div className="text-2xl font-bold">{value}</div>
      <p className="text-xs text-muted-foreground">{description}</p>
    </div>
  </div>
)

const DashboardPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard 
          title="Total Revenue" 
          value="$45,231.89" 
          icon={DollarSign}
          description="+20.1% from last month"
        />
        <StatCard 
          title="Subscriptions" 
          value="+2,350" 
          icon={Users}
          description="+180.1% from last month"
        />
        <StatCard 
          title="Sales" 
          value="+12,234" 
          icon={CreditCard}
          description="+19% from last month"
        />
        <StatCard 
          title="Active Now" 
          value="+573" 
          icon={Activity}
          description="+201 since last hour"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <div className="col-span-4 rounded-xl border bg-card p-6 shadow-sm">
          <div className="pb-4">
            <h3 className="font-semibold text-lg">Revenue Overview</h3>
            <p className="text-sm text-muted-foreground">Monthly revenue performance for the current year.</p>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--muted))" />
                <XAxis 
                  dataKey="name" 
                  stroke="hsl(var(--muted-foreground))" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false} 
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false}
                  tickFormatter={(value) => `$${value}`}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "hsl(var(--background))", 
                    borderColor: "hsl(var(--border))",
                    borderRadius: "8px"
                  }} 
                />
                <Area 
                  type="monotone" 
                  dataKey="total" 
                  stroke="hsl(var(--primary))" 
                  fillOpacity={1} 
                  fill="url(#colorTotal)" 
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="col-span-3 rounded-xl border bg-card p-6 shadow-sm">
          <div className="pb-4">
            <h3 className="font-semibold text-lg">Recent Activities</h3>
            <p className="text-sm text-muted-foreground">You made 265 sales this month.</p>
          </div>
          <div className="space-y-8 pt-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="h-9 w-9 rounded-full bg-accent" />
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">Olivia Martin</p>
                  <p className="text-xs text-muted-foreground">olivia.martin@email.com</p>
                </div>
                <div className="ml-auto font-medium">+$1,999.00</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardPage
