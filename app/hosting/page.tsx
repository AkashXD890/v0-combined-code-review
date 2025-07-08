import { Card, CardContent } from "@/components/ui/card"

export default function HostingPage() {
  const gameHostingServices = [
    {
      icon: "🏗️",
      title: "Minecraft Hosting",
      description:
        "Vanilla, Modded, Bukkit, Spigot, Paper, Fabric, Forge - all versions supported with automatic mod installation and world management.",
    },
    {
      icon: "🔫",
      title: "FPS Game Servers",
      description:
        "CS2, Call of Duty, Battlefield, and Valorant private servers with anti-cheat integration and custom map support.",
    },
    {
      icon: "🏎️",
      title: "Racing & Sports",
      description:
        "Assetto Corsa, BeamNG, FIFA, and racing simulators with championship management and telemetry tracking.",
    },
    {
      icon: "🦖",
      title: "Survival Games",
      description:
        "ARK, Rust, 7 Days to Die, Conan Exiles with automatic backups, custom settings, and mod workshop integration.",
    },
    {
      icon: "🎲",
      title: "Sandbox & Creative",
      description:
        "Garry's Mod, Space Engineers, Factorio with community workshop integration and custom scripting support.",
    },
    {
      icon: "⚔️",
      title: "MMO & RPG Servers",
      description:
        "Private WoW, RuneScape, MU Online servers with database management and player progression tracking.",
    },
  ]

  return (
    <div className="space-y-20">
      <section className="text-center py-20 px-4">
        <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
          Game Server Hosting
        </h1>
        <p className="text-xl text-slate-300 max-w-2xl mx-auto">
          Professional hosting solutions for serious gamers and communities
        </p>
      </section>

      <section className="px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {gameHostingServices.map((service, index) => (
              <Card
                key={index}
                className="bg-slate-900/50 border-purple-500/20 hover:border-purple-500/50 transition-all duration-300 hover:transform hover:translate-x-2 hover:-translate-y-1"
              >
                <CardContent className="p-6">
                  <div className="text-3xl mb-4">{service.icon}</div>
                  <h3 className="text-xl font-semibold text-purple-400 mb-3">{service.title}</h3>
                  <p className="text-slate-300">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
