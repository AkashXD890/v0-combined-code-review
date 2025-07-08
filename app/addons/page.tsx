import { Card, CardContent } from "@/components/ui/card"
import { Database, Globe, Mic, BarChart3, RotateCcw, Cloud, Wrench, Smartphone } from "lucide-react"

export default function AddonsPage() {
  const addons = [
    {
      icon: <Database className="w-6 h-6" />,
      title: "Database Hosting",
      description:
        "MySQL, PostgreSQL, MongoDB databases with automated backups, scaling, and 24/7 monitoring for persistent game data.",
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Web Hosting",
      description:
        "Companion websites, forums, donation pages, and player statistics with SSL certificates and CDN integration.",
    },
    {
      icon: <Mic className="w-6 h-6" />,
      title: "Voice Servers",
      description:
        "TeamSpeak, Discord bots, and Mumble servers with music bots, moderation tools, and custom integrations.",
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Analytics Dashboard",
      description:
        "Real-time player statistics, performance monitoring, crash reports, and automated server health alerts.",
    },
    {
      icon: <RotateCcw className="w-6 h-6" />,
      title: "Auto-Restart Services",
      description:
        "Intelligent server monitoring with automatic restarts, memory optimization, and scheduled maintenance windows.",
    },
    {
      icon: <Cloud className="w-6 h-6" />,
      title: "Cloud Backups",
      description: "Automated world saves, configuration backups, and one-click restore points with 30-day retention.",
    },
    {
      icon: <Wrench className="w-6 h-6" />,
      title: "Custom Modifications",
      description: "Bespoke plugin development, server scripting, and integration services by our development team.",
    },
    {
      icon: <Smartphone className="w-6 h-6" />,
      title: "Mobile Management",
      description:
        "iOS and Android apps for server management, player communication, and real-time monitoring on the go.",
    },
  ]

  return (
    <div className="space-y-20">
      <section className="text-center py-20 px-4">
        <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
          Server Add-ons
        </h1>
        <p className="text-xl text-slate-300 max-w-2xl mx-auto">
          Enhance your gaming experience with our premium add-on services
        </p>
      </section>

      <section className="px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {addons.map((addon, index) => (
              <Card
                key={index}
                className="bg-slate-900/50 border-purple-500/20 hover:border-purple-500/50 transition-all duration-300 hover:transform hover:translate-x-2 hover:-translate-y-1"
              >
                <CardContent className="p-6">
                  <div className="text-purple-400 mb-4">{addon.icon}</div>
                  <h3 className="text-xl font-semibold text-purple-400 mb-3">{addon.title}</h3>
                  <p className="text-slate-300">{addon.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
