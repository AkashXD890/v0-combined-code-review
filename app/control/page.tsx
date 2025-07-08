import { Card, CardContent } from "@/components/ui/card"
import { Settings, Users, TrendingUp, Zap, Lock, Calendar } from "lucide-react"

export default function ControlPage() {
  const controlPanelFeatures = [
    {
      icon: <Settings className="w-6 h-6" />,
      title: "Advanced Controls",
      description:
        "Full server management with console access, file manager, database tools, and real-time resource monitoring.",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "User Management",
      description:
        "Sub-user permissions, role-based access control, and team collaboration tools for community management.",
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Performance Metrics",
      description: "CPU, RAM, disk usage graphs, network monitoring, and performance optimization recommendations.",
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "One-Click Installs",
      description: "Automated mod installations, plugin managers, and game-specific tools with dependency resolution.",
    },
    {
      icon: <Lock className="w-6 h-6" />,
      title: "Security Center",
      description: "2FA authentication, IP whitelisting, security logs, and automated threat detection and response.",
    },
    {
      icon: <Calendar className="w-6 h-6" />,
      title: "Scheduling System",
      description: "Automated tasks, maintenance windows, backup scheduling, and custom cron job management.",
    },
  ]

  return (
    <div className="space-y-20">
      <section className="text-center py-20 px-4">
        <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
          Yaddu's Network Control Panel
        </h1>
        <p className="text-xl text-slate-300 max-w-2xl mx-auto">
          Industry-leading server management with our custom Nebula interface
        </p>
      </section>

      <section className="px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {controlPanelFeatures.map((feature, index) => (
              <Card
                key={index}
                className="bg-slate-900/50 border-purple-500/20 hover:border-purple-500/50 transition-all duration-300 hover:transform hover:translate-x-2 hover:-translate-y-1"
              >
                <CardContent className="p-6">
                  <div className="text-purple-400 mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold text-purple-400 mb-3">{feature.title}</h3>
                  <p className="text-slate-300">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
