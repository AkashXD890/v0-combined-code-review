"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Rocket,
  Shield,
  Gamepad2,
  Zap,
  Database,
  Globe,
  Mic,
  BarChart3,
  RotateCcw,
  Cloud,
  Wrench,
  Smartphone,
  Settings,
  Users,
  TrendingUp,
  Lock,
  Calendar,
  Check,
  Menu,
  X,
} from "lucide-react"
import { useRouter } from "next/navigation"
import GetStartedMenu from "./components/get-started-menu"
import AuthButtons from "./components/auth-buttons"

export default function NebulaPterodactylHosting() {
  const [activeSection, setActiveSection] = useState("home")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [stars, setStars] = useState<Array<{ id: number; left: number; top: number; size: number; delay: number }>>([])
  const [showGetStartedMenu, setShowGetStartedMenu] = useState(false)
  const [adminCode, setAdminCode] = useState("")
  const [showAdminInput, setShowAdminInput] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Generate stars
    const newStars = Array.from({ length: 100 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 3 + 1,
      delay: Math.random() * 3,
    }))
    setStars(newStars)
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showGetStartedMenu && !(event.target as Element).closest(".relative")) {
        setShowGetStartedMenu(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [showGetStartedMenu])

  // Admin access check
  const handleAdminAccess = () => {
    if (adminCode === "admin123") {
      sessionStorage.setItem("isAdmin", "true")
      router.push("/admin")
    } else {
      alert("Invalid admin code")
      setAdminCode("")
    }
  }

  // Admin panel access via keyboard shortcut (Ctrl+Shift+A)
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.ctrlKey && e.shiftKey && e.key === "A") {
      e.preventDefault()
      setShowAdminInput(!showAdminInput)
    }
    if (e.key === "Escape") {
      setShowAdminInput(false)
    }
  }

  const navigation = [
    { id: "home", label: "Home" },
    { id: "hosting", label: "Game Hosting" },
    { id: "minecraft", label: "Minecraft" },
    { id: "resources", label: "Resources" },
    { id: "plugins", label: "Plugins" },
    { id: "ranks", label: "Server Ranks" },
    { id: "crates", label: "Mystery Crates" },
    { id: "addons", label: "Add-ons" },
    { id: "control", label: "Control Panel" },
    { id: "pricing", label: "Pricing" },
  ]

  const features = [
    {
      icon: <Rocket className="w-8 h-8" />,
      title: "Stellar Performance",
      description: "NVMe SSD arrays and enterprise-grade hardware deliver cosmic speeds across our global network",
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Prehistoric Protection",
      description: "Military-grade DDoS protection and advanced security keep your servers safe from extinction",
    },
    {
      icon: <Gamepad2 className="w-8 h-8" />,
      title: "Multi-Game Support",
      description: "Minecraft, CS2, Rust, ARK, and 50+ games supported with one-click installations",
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Instant Deployment",
      description: "Servers spin up in under 60 seconds with our automated pterodactyl panel integration",
    },
  ]

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

  const minecraftRanks = [
    {
      name: "Newcomer",
      price: "Free",
      color: "text-slate-400",
      borderColor: "border-slate-400",
      features: [
        "Basic building permissions",
        "Public chat access",
        "Spawn area access",
        "Basic /home command (1 home)",
      ],
    },
    {
      name: "Builder",
      price: "$4.99/month",
      color: "text-green-400",
      borderColor: "border-green-400",
      features: [
        "All Newcomer benefits",
        "Colored chat messages",
        "Multiple homes (5 homes)",
        "/kit builder daily rewards",
        "Priority server queue",
      ],
    },
    {
      name: "VIP",
      price: "$9.99/month",
      color: "text-blue-400",
      borderColor: "border-blue-400",
      features: [
        "All Builder benefits",
        "VIP-only areas access",
        "Custom particle effects",
        "Extra claim blocks",
        "/fly in claimed areas",
        "Economy bonuses (2x rewards)",
      ],
    },
    {
      name: "Elite",
      price: "$19.99/month",
      color: "text-purple-400",
      borderColor: "border-purple-400",
      features: [
        "All VIP benefits",
        "Unlimited homes",
        "Custom nickname colors",
        "Exclusive cosmetic pets",
        "WorldEdit permissions",
        "Monthly exclusive crates",
      ],
    },
  ]

  const mysteryCrates = [
    {
      name: "Common Crate",
      price: "$2.99",
      color: "from-green-500/20 to-green-600/20",
      borderColor: "border-green-500/30",
      textColor: "text-green-400",
      rewards: [
        "500-1,500 in-game currency",
        "Basic enchanted gear",
        "Food and potions",
        "Building materials",
        "Experience bottles",
      ],
    },
    {
      name: "Rare Crate",
      price: "$7.99",
      color: "from-blue-500/20 to-blue-600/20",
      borderColor: "border-blue-500/30",
      textColor: "text-blue-400",
      rewards: [
        "2,000-5,000 in-game currency",
        "Rare enchanted weapons",
        "Cosmetic items and pets",
        "Treasure maps",
        "Rare crafting materials",
      ],
    },
    {
      name: "Legendary Crate",
      price: "$15.99",
      color: "from-purple-500/20 to-purple-600/20",
      borderColor: "border-purple-500/30",
      textColor: "text-purple-400",
      rewards: [
        "5,000-15,000 in-game currency",
        "Legendary equipment sets",
        "Exclusive mounts and pets",
        "Rare building schematics",
        "Rank upgrade vouchers",
      ],
    },
    {
      name: "Mythic Crate",
      price: "$29.99",
      color: "from-yellow-500/20 to-yellow-600/20",
      borderColor: "border-yellow-500/30",
      textColor: "text-yellow-400",
      rewards: [
        "10,000-50,000 in-game currency",
        "Godlike enchanted items",
        "Ultra-rare cosmetics",
        "Private island plots",
        "Personal NPC assistant",
      ],
    },
  ]

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

  const pricingPlans = [
    {
      name: "Rookie Raptor",
      price: "$8",
      period: "/mo",
      features: [
        "2GB RAM",
        "20GB NVMe Storage",
        "Unlimited Bandwidth",
        "Basic DDoS Protection",
        "Pterodactyl Panel",
        "24/7 Support",
      ],
      popular: false,
    },
    {
      name: "Cosmic Pterodactyl",
      price: "$18",
      period: "/mo",
      features: [
        "6GB RAM",
        "60GB NVMe Storage",
        "Unlimited Bandwidth",
        "Advanced DDoS Protection",
        "Database Hosting",
        "Auto Backups",
        "Priority Support",
      ],
      popular: true,
    },
    {
      name: "Nebula Enterprise",
      price: "$45",
      period: "/mo",
      features: [
        "16GB RAM",
        "200GB NVMe Storage",
        "Unlimited Bandwidth",
        "Enterprise DDoS Protection",
        "Multiple Game Instances",
        "Custom Integrations",
        "Dedicated Support Agent",
      ],
      popular: false,
    },
  ]

  const minecraftEssentials = [
    {
      icon: "⚡",
      title: "Server Versions",
      description:
        "Vanilla, Spigot, Paper, Fabric, Forge, Bukkit - all versions from 1.8 to latest with automatic updates and version switching.",
    },
    {
      icon: "🗺️",
      title: "World Management",
      description:
        "Custom world generation, pre-built worlds, multiverse support, and automatic world backups with one-click restoration.",
    },
    {
      icon: "👥",
      title: "Player Management",
      description:
        "Whitelist control, ban management, player statistics, and advanced permission systems with group hierarchies.",
    },
  ]

  const minecraftResources = [
    {
      icon: "🎨",
      title: "Resource Packs",
      description:
        "High-quality texture packs, shader support, and custom resource pack hosting with automatic client downloads.",
    },
    {
      icon: "🏰",
      title: "Building Templates",
      description: "Spawn builds, castle schematics, city templates, and custom structures with WorldEdit integration.",
    },
    {
      icon: "🎵",
      title: "Audio Packs",
      description:
        "Custom music discs, ambient sounds, and sound effect replacements for immersive gameplay experiences.",
    },
    {
      icon: "📚",
      title: "Configuration Templates",
      description:
        "Optimized server.properties, plugin configs, and performance settings for different server types and player counts.",
    },
  ]

  const minecraftPlugins = [
    {
      icon: "🏠",
      title: "Land Protection",
      description:
        "GriefPrevention, WorldGuard, Residence - protect player builds with advanced claiming and flag systems.",
    },
    {
      icon: "💰",
      title: "Economy Systems",
      description: "Vault, EssentialsX Economy, ChestShop - create player-driven economies with shops and currency.",
    },
    {
      icon: "🎮",
      title: "Minigames",
      description: "BedWars, SkyWars, Murder Mystery, Parkour - keep players engaged with competitive gameplay.",
    },
    {
      icon: "⚔️",
      title: "PvP Enhancements",
      description: "McMMO, Heroes, Custom Enchants - RPG progression and enhanced combat mechanics.",
    },
    {
      icon: "🛠️",
      title: "Administration",
      description: "LuckPerms, CoreProtect, ClearLag - essential tools for server management and moderation.",
    },
    {
      icon: "🎯",
      title: "Custom Features",
      description:
        "Custom NPCs, Quest systems, Auction House - unique gameplay features to make your server stand out.",
    },
  ]

  const renderSection = () => {
    switch (activeSection) {
      case "home":
        return (
          <div className="space-y-20" onKeyDown={handleKeyDown} tabIndex={0}>
            {/* Hidden Admin Access - Only shown when triggered by keyboard shortcut */}
            {showAdminInput && (
              <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 bg-slate-800/95 p-6 rounded-lg border border-red-500/30 backdrop-blur-sm">
                <p className="text-sm text-slate-300 mb-4 text-center">🔐 Admin Access</p>
                <div className="flex gap-2 mb-4">
                  <Input
                    type="password"
                    placeholder="Enter admin code"
                    value={adminCode}
                    onChange={(e) => setAdminCode(e.target.value)}
                    className="bg-slate-900/50 border-red-500/20 w-48"
                    onKeyDown={(e) => e.key === "Enter" && handleAdminAccess()}
                  />
                  <Button onClick={handleAdminAccess} className="bg-red-600 hover:bg-red-700" size="sm">
                    <Lock className="w-4 h-4" />
                  </Button>
                </div>
                <p className="text-xs text-slate-400 text-center">Press Esc to close</p>
              </div>
            )}

            {/* Hero Section */}
            <section className="text-center py-20 px-4 relative">
              <div className="max-w-4xl mx-auto">
                <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-blue-400 to-pink-400 bg-clip-text text-transparent animate-pulse">
                  Yaddu's Network
                </h1>
                <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto">
                  Experience the cosmos of game server hosting with our stellar infrastructure and prehistoric
                  reliability
                </p>
                <div className="flex items-center justify-center gap-2 mb-8 text-green-400">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  <span>All Systems Operational • 99.9% Uptime</span>
                </div>
                <GetStartedMenu />
              </div>
            </section>

            {/* Features Section */}
            <section className="py-20 px-4">
              <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {features.map((feature, index) => (
                    <Card
                      key={index}
                      className="bg-slate-900/50 border-purple-500/20 hover:border-purple-500/50 transition-all duration-300 hover:transform hover:scale-105"
                    >
                      <CardContent className="p-6 text-center">
                        <div className="text-purple-400 mb-4 flex justify-center">{feature.icon}</div>
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

      case "hosting":
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

      case "minecraft":
        return (
          <div className="space-y-20">
            <section className="text-center py-20 px-4">
              <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                🏗️ Minecraft Hosting
              </h1>
              <p className="text-xl text-slate-300 max-w-2xl mx-auto">
                Everything you need to build the perfect Minecraft community
              </p>
            </section>

            {/* Minecraft Essentials */}
            <section className="px-4">
              <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl font-bold text-center mb-12 text-purple-400">🏗️ Minecraft Essentials</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {minecraftEssentials.map((essential, index) => (
                    <Card
                      key={index}
                      className="bg-slate-900/50 border-purple-500/20 hover:border-purple-500/50 transition-all duration-300 hover:transform hover:translate-x-2 hover:-translate-y-1"
                    >
                      <CardContent className="p-6">
                        <div className="text-3xl mb-4">{essential.icon}</div>
                        <h3 className="text-xl font-semibold text-purple-400 mb-3">{essential.title}</h3>
                        <p className="text-slate-300">{essential.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </section>
          </div>
        )

      case "resources":
        return (
          <div className="space-y-20">
            <section className="text-center py-20 px-4">
              <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                📦 Server Resources
              </h1>
              <p className="text-xl text-slate-300 max-w-2xl mx-auto">
                High-quality resources to enhance your Minecraft server experience
              </p>
            </section>

            <section className="px-4">
              <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {minecraftResources.map((resource, index) => (
                    <Card
                      key={index}
                      className="bg-slate-900/50 border-purple-500/20 hover:border-purple-500/50 transition-all duration-300 hover:transform hover:translate-x-2 hover:-translate-y-1"
                    >
                      <CardContent className="p-6">
                        <div className="text-3xl mb-4">{resource.icon}</div>
                        <h3 className="text-xl font-semibold text-purple-400 mb-3">{resource.title}</h3>
                        <p className="text-slate-300">{resource.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </section>
          </div>
        )

      case "plugins":
        return (
          <div className="space-y-20">
            <section className="text-center py-20 px-4">
              <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                🔧 Essential Plugins
              </h1>
              <p className="text-xl text-slate-300 max-w-2xl mx-auto">
                Powerful plugins to enhance gameplay and server management
              </p>
            </section>

            <section className="px-4">
              <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {minecraftPlugins.map((plugin, index) => (
                    <Card
                      key={index}
                      className="bg-slate-900/50 border-purple-500/20 hover:border-purple-500/50 transition-all duration-300 hover:transform hover:translate-x-2 hover:-translate-y-1"
                    >
                      <CardContent className="p-6">
                        <div className="text-3xl mb-4">{plugin.icon}</div>
                        <h3 className="text-xl font-semibold text-purple-400 mb-3">{plugin.title}</h3>
                        <p className="text-slate-300">{plugin.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </section>
          </div>
        )

      case "ranks":
        return (
          <div className="space-y-20">
            <section className="text-center py-20 px-4">
              <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                👑 Server Rank System
              </h1>
              <p className="text-xl text-slate-300 max-w-2xl mx-auto">
                Unlock exclusive perks and features with our premium rank system
              </p>
            </section>

            <section className="px-4">
              <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {minecraftRanks.map((rank, index) => (
                    <Card
                      key={index}
                      className={`bg-slate-900/50 border-2 ${rank.borderColor} hover:scale-105 transition-all duration-300`}
                    >
                      <CardContent className="p-6">
                        <h3 className={`text-xl font-semibold mb-2 ${rank.color}`}>{rank.name}</h3>
                        <p className="text-lg font-bold mb-4">{rank.price}</p>
                        <ul className="space-y-2">
                          {rank.features.map((feature, featureIndex) => (
                            <li key={featureIndex} className="flex items-center gap-2 text-sm">
                              <Check className="w-4 h-4 text-green-400" />
                              <span className="text-slate-300">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </section>
          </div>
        )

      case "crates":
        return (
          <div className="space-y-20">
            <section className="text-center py-20 px-4">
              <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                🎁 Mystery Crates
              </h1>
              <p className="text-xl text-slate-300 max-w-2xl mx-auto">
                Discover amazing rewards with our exciting mystery crate system
              </p>
            </section>

            <section className="px-4">
              <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {mysteryCrates.map((crate, index) => (
                    <Card
                      key={index}
                      className={`bg-gradient-to-br ${crate.color} border-2 ${crate.borderColor} hover:scale-105 transition-all duration-300`}
                    >
                      <CardContent className="p-6">
                        <h3 className={`text-xl font-semibold mb-2 ${crate.textColor}`}>{crate.name}</h3>
                        <p className="text-lg font-bold mb-4">{crate.price} each</p>
                        <ul className="space-y-2">
                          {crate.rewards.map((reward, rewardIndex) => (
                            <li key={rewardIndex} className="text-sm text-slate-300">
                              • {reward}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </section>
          </div>
        )

      case "addons":
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

      case "control":
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

      case "pricing":
        return (
          <div className="space-y-20">
            <section className="text-center py-20 px-4">
              <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Choose Your Hosting Plan
              </h1>
              <p className="text-xl text-slate-300 max-w-2xl mx-auto">
                Flexible pricing for every gaming community size
              </p>
            </section>

            <section className="px-4">
              <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {pricingPlans.map((plan, index) => (
                    <Card
                      key={index}
                      className={`relative bg-slate-900/50 border-2 transition-all duration-300 hover:scale-105 ${
                        plan.popular
                          ? "border-purple-500 scale-105 shadow-2xl shadow-purple-500/20"
                          : "border-purple-500/20 hover:border-purple-500/50"
                      }`}
                    >
                      {plan.popular && (
                        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                          <Badge className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-1">
                            MOST POPULAR
                          </Badge>
                        </div>
                      )}
                      <CardContent className="p-8 text-center">
                        <h3 className="text-2xl font-bold text-white mb-4">{plan.name}</h3>
                        <div className="mb-6">
                          <span className="text-4xl font-bold text-purple-400">{plan.price}</span>
                          <span className="text-slate-400">{plan.period}</span>
                        </div>
                        <ul className="space-y-3 mb-8">
                          {plan.features.map((feature, featureIndex) => (
                            <li key={featureIndex} className="flex items-center gap-2">
                              <Check className="w-5 h-5 text-purple-400" />
                              <span className="text-slate-300">{feature}</span>
                            </li>
                          ))}
                        </ul>
                        <Button
                          className={`w-full ${
                            plan.popular
                              ? "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                              : "bg-slate-700 hover:bg-slate-600"
                          }`}
                        >
                          {plan.popular ? "Get Started" : "Choose Plan"}
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </section>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white relative overflow-hidden">
      {/* Animated Stars Background */}
      <div className="fixed inset-0 pointer-events-none">
        {stars.map((star) => (
          <div
            key={star.id}
            className="absolute bg-white rounded-full animate-pulse"
            style={{
              left: `${star.left}%`,
              top: `${star.top}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              animationDelay: `${star.delay}s`,
              opacity: 0.6,
            }}
          />
        ))}
      </div>

      {/* Nebula Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute top-3/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-slate-900/90 backdrop-blur-lg border-b border-purple-500/20 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🦕</span>
              <span className="text-xl font-bold text-purple-400">Yaddu's Network</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {navigation.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`px-3 py-2 rounded-lg transition-all duration-200 ${
                    activeSection === item.id
                      ? "text-purple-400 bg-purple-500/10"
                      : "text-slate-300 hover:text-purple-400 hover:bg-purple-500/5"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button className="md:hidden p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-purple-500/20">
              {navigation.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveSection(item.id)
                    setMobileMenuOpen(false)
                  }}
                  className={`block w-full text-left px-3 py-2 rounded-lg transition-all duration-200 ${
                    activeSection === item.id
                      ? "text-purple-400 bg-purple-500/10"
                      : "text-slate-300 hover:text-purple-400 hover:bg-purple-500/5"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-16 relative z-10">
        {/* Auth Buttons - Top Right Corner */}
        <div className="fixed top-4 right-4 z-50">
          <AuthButtons />
        </div>
        {renderSection()}
      </main>

      {/* Footer */}
      
    </div>
  )
}
