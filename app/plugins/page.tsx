"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Download, Heart, Clock, Star, Eye } from "lucide-react"
import { useRouter } from "next/navigation"

export default function PluginsPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [plugins, setPlugins] = useState([
    {
      id: 1,
      icon: "/placeholder.svg?height=64&width=64",
      title: "EconomyCore",
      author: "ServerMaster",
      description:
        "Complete economy system with shops, auctions, and banking. Features advanced trading mechanics and multi-currency support for complex server economies.",
      category: "economy",
      price: "$12.99",
      downloads: 2840000,
      followers: 8420,
      rating: 4.8,
      lastUpdated: "2 days ago",
      version: "3.2.1",
      compatibility: ["Server", "Bukkit", "Spigot", "Paper", "Purpur", "Folia"],
      tags: ["economy", "shops", "banking", "currency", "trading"],
      screenshots: [
        "/placeholder.svg?height=200&width=300",
        "/placeholder.svg?height=200&width=300",
        "/placeholder.svg?height=200&width=300",
      ],
      features: [
        "Multi-currency support",
        "Advanced shop system",
        "Player-to-player trading",
        "Banking with interest rates",
        "Auction house integration",
        "Economy statistics dashboard",
      ],
    },
    {
      id: 2,
      icon: "/placeholder.svg?height=64&width=64",
      title: "ProtectionPlus",
      author: "GuardianDev",
      description:
        "Advanced land protection with grief prevention, claim management, and PvP zones. Includes smart auto-claim and team-based protection systems.",
      category: "protection",
      price: "Free",
      downloads: 5200000,
      followers: 12300,
      rating: 4.9,
      lastUpdated: "1 week ago",
      version: "2.8.4",
      compatibility: ["Server", "Bukkit", "Spigot", "Paper", "Purpur"],
      tags: ["protection", "claims", "grief", "pvp", "zones"],
      screenshots: ["/placeholder.svg?height=200&width=300", "/placeholder.svg?height=200&width=300"],
      features: [
        "Smart auto-claim system",
        "Team-based protection",
        "PvP zone management",
        "Grief rollback tools",
        "Permission-based access",
        "Visual claim boundaries",
      ],
    },
    {
      id: 3,
      icon: "/placeholder.svg?height=64&width=64",
      title: "MiniGameHub",
      author: "GameCrafters",
      description:
        "Complete minigame suite with BedWars, SkyWars, Murder Mystery, and custom game modes. Features matchmaking and tournament systems.",
      category: "minigames",
      price: "$24.99",
      downloads: 1680000,
      followers: 5670,
      rating: 4.7,
      lastUpdated: "3 days ago",
      version: "4.1.0",
      compatibility: ["Server", "Bukkit", "Spigot", "Paper", "Velocity", "BungeeCard"],
      tags: ["minigames", "bedwars", "skywars", "pvp", "tournaments"],
      screenshots: [
        "/placeholder.svg?height=200&width=300",
        "/placeholder.svg?height=200&width=300",
        "/placeholder.svg?height=200&width=300",
        "/placeholder.svg?height=200&width=300",
      ],
      features: [
        "Multiple game modes",
        "Automatic matchmaking",
        "Tournament system",
        "Custom arenas",
        "Player statistics",
        "Reward system",
      ],
    },
    {
      id: 4,
      icon: "/placeholder.svg?height=64&width=64",
      title: "RPGLeveling",
      author: "RPGMaster",
      description:
        "Advanced RPG progression system with custom skills, classes, and abilities. Features dynamic leveling and character customization.",
      category: "rpg",
      price: "$18.99",
      downloads: 920000,
      followers: 3240,
      rating: 4.6,
      lastUpdated: "5 days ago",
      version: "1.9.2",
      compatibility: ["Server", "Bukkit", "Spigot", "Paper", "Purpur"],
      tags: ["rpg", "leveling", "skills", "classes", "progression"],
      screenshots: ["/placeholder.svg?height=200&width=300", "/placeholder.svg?height=200&width=300"],
      features: [
        "Custom skill trees",
        "Multiple character classes",
        "Dynamic ability system",
        "Experience multipliers",
        "Prestige system",
        "Custom enchantments",
      ],
    },
    {
      id: 5,
      icon: "/placeholder.svg?height=64&width=64",
      title: "WorldManager Pro",
      author: "WorldCraft",
      description:
        "Professional world management with multiverse support, world generation, and advanced teleportation systems.",
      category: "world",
      price: "$15.99",
      downloads: 1340000,
      followers: 4580,
      rating: 4.8,
      lastUpdated: "1 day ago",
      version: "2.5.3",
      compatibility: ["Server", "Bukkit", "Spigot", "Paper", "Purpur", "Folia"],
      tags: ["world", "multiverse", "teleport", "generation", "management"],
      screenshots: [
        "/placeholder.svg?height=200&width=300",
        "/placeholder.svg?height=200&width=300",
        "/placeholder.svg?height=200&width=300",
      ],
      features: [
        "Unlimited worlds",
        "Custom world generation",
        "Advanced teleportation",
        "World-specific settings",
        "Automatic backups",
        "Permission integration",
      ],
    },
    {
      id: 6,
      icon: "/placeholder.svg?height=64&width=64",
      title: "ChatEnhancer",
      author: "ChatMods",
      description:
        "Enhanced chat system with channels, formatting, moderation tools, and social features for better player communication.",
      category: "social",
      price: "$8.99",
      downloads: 2100000,
      followers: 6890,
      rating: 4.5,
      lastUpdated: "4 days ago",
      version: "3.0.1",
      compatibility: ["Server", "Bukkit", "Spigot", "Paper", "Velocity", "BungeeCard"],
      tags: ["chat", "social", "moderation", "channels", "formatting"],
      screenshots: ["/placeholder.svg?height=200&width=300"],
      features: [
        "Multiple chat channels",
        "Rich text formatting",
        "Auto-moderation",
        "Private messaging",
        "Chat history",
        "Emoji support",
      ],
    },
  ])

  // Load admin data on component mount
  useEffect(() => {
    const adminPlugins = localStorage.getItem("adminPlugins")
    if (adminPlugins) {
      const parsedPlugins = JSON.parse(adminPlugins)
      const pluginsWithDefaults = parsedPlugins.map((plugin: any) => ({
        ...plugin,
        icon: plugin.iconUrl || "/placeholder.svg?height=64&width=64",
        author: plugin.author || "Unknown",
        downloads: plugin.downloads || Math.floor(Math.random() * 1000000),
        followers: plugin.followers || Math.floor(Math.random() * 10000),
        rating: plugin.rating || (4 + Math.random()).toFixed(1),
        lastUpdated: plugin.lastUpdated || "Recently",
        compatibility: plugin.compatibility || ["Server", "Bukkit", "Spigot"],
        tags: plugin.tags || [plugin.category || "general"],
        screenshots: plugin.screenshots || [],
        features: plugin.features || [],
      }))
      setPlugins((prevPlugins) => {
        const defaultTitles = prevPlugins.map((p) => p.title)
        const newPlugins = pluginsWithDefaults.filter((p: any) => !defaultTitles.includes(p.title))
        return [...prevPlugins, ...newPlugins]
      })
    }
  }, [])

  const filteredPlugins = plugins.filter((plugin) => {
    const matchesSearch =
      plugin.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      plugin.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      plugin.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      plugin.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))

    return matchesSearch
  })

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(2) + "M"
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K"
    }
    return num.toString()
  }

  const getCompatibilityIcon = (comp: string) => {
    const icons: { [key: string]: string } = {
      Server: "🖥️",
      Bukkit: "🪣",
      Spigot: "🌾",
      Paper: "📄",
      Purpur: "💜",
      Folia: "🍃",
      Velocity: "⚡",
      BungeeCard: "🔗",
      Forge: "⚒️",
      Fabric: "🧵",
      Quilt: "🧶",
      NeoForge: "🔥",
    }
    return icons[comp] || "⚙️"
  }

  const handlePluginClick = (pluginId: number) => {
    router.push(`/plugins/${pluginId}`)
  }

  return (
    <div className="space-y-8">
      <section className="text-center py-20 px-4">
        <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
          🔧 Plugin Repository
        </h1>
        <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-8">
          Discover powerful plugins to enhance your Minecraft server
        </p>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search plugins by name, author, or features..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-slate-800/50 border-purple-500/20 text-white placeholder:text-slate-400 focus:border-purple-500 h-12 text-lg"
            />
          </div>
        </div>

        {/* Results Count */}
        <p className="text-slate-400 mb-4">
          Showing {filteredPlugins.length} of {plugins.length} plugins
        </p>
      </section>

      <section className="px-4">
        <div className="max-w-6xl mx-auto">
          <div className="space-y-4">
            {filteredPlugins.map((plugin) => (
              <Card
                key={plugin.id}
                className="bg-slate-900/50 border-purple-500/20 hover:border-purple-500/50 transition-all duration-300 hover:bg-slate-900/70 cursor-pointer"
                onClick={() => handlePluginClick(plugin.id)}
              >
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    {/* Plugin Icon */}
                    <div className="flex-shrink-0">
                      <img
                        src={plugin.icon || "/placeholder.svg"}
                        alt={plugin.title}
                        className="w-16 h-16 rounded-lg border border-purple-500/20 object-cover"
                      />
                    </div>

                    {/* Main Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="text-xl font-bold text-white mb-1">{plugin.title}</h3>
                          <p className="text-slate-400 text-sm">
                            by <span className="text-purple-400 hover:underline">{plugin.author}</span>
                          </p>
                        </div>

                        {/* Stats */}
                        <div className="text-right flex-shrink-0">
                          <div className="flex items-center gap-1 text-slate-400 mb-1">
                            <Download className="w-4 h-4" />
                            <span className="font-semibold">{formatNumber(plugin.downloads)}</span>
                            <span className="text-sm">downloads</span>
                          </div>
                          <div className="flex items-center gap-1 text-slate-400">
                            <Heart className="w-4 h-4" />
                            <span className="font-semibold">{formatNumber(plugin.followers)}</span>
                            <span className="text-sm">followers</span>
                          </div>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-slate-300 mb-3 line-clamp-2">{plugin.description}</p>

                      {/* Compatibility Tags */}
                      <div className="flex flex-wrap gap-1 mb-3">
                        {plugin.compatibility.slice(0, 8).map((comp, index) => (
                          <Badge key={index} variant="outline" className="border-purple-500/30 text-purple-300 text-xs">
                            {getCompatibilityIcon(comp)} {comp}
                          </Badge>
                        ))}
                        {plugin.compatibility.length > 8 && (
                          <Badge variant="outline" className="border-slate-500/30 text-slate-400 text-xs">
                            +{plugin.compatibility.length - 8} more
                          </Badge>
                        )}
                      </div>

                      {/* Bottom Row */}
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1 text-yellow-400">
                            <Star className="w-4 h-4 fill-current" />
                            <span className="font-semibold">{plugin.rating}</span>
                          </div>
                          <span
                            className={`font-bold text-lg ${plugin.price === "Free" ? "text-green-400" : "text-purple-400"}`}
                          >
                            {plugin.price}
                          </span>
                        </div>

                        <div className="flex items-center gap-4 text-slate-400 text-sm">
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>Updated {plugin.lastUpdated}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Eye className="w-4 h-4" />
                            <span>v{plugin.version}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredPlugins.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-semibold text-slate-300 mb-2">No plugins found</h3>
              <p className="text-slate-400">Try adjusting your search terms</p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
