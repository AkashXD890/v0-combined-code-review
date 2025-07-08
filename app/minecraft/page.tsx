"use client"

import { Card, CardContent } from "@/components/ui/card"
import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

export default function MinecraftPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [essentials, setEssentials] = useState([
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
  ])

  // Load admin data on component mount (if minecraft items are managed via resources)
  useEffect(() => {
    const adminResources = localStorage.getItem("adminResources")
    if (adminResources) {
      const parsedResources = JSON.parse(adminResources)
      // Filter for minecraft-related resources
      const minecraftResources = parsedResources
        .filter(
          (resource: any) =>
            resource.category?.toLowerCase().includes("minecraft") ||
            resource.title?.toLowerCase().includes("minecraft"),
        )
        .map((resource: any) => ({
          ...resource,
          icon: resource.icon || "🏗️",
        }))

      if (minecraftResources.length > 0) {
        setEssentials((prevEssentials) => {
          const defaultTitles = prevEssentials.map((e) => e.title)
          const newEssentials = minecraftResources.filter((r: any) => !defaultTitles.includes(r.title))
          return [...prevEssentials, ...newEssentials]
        })
      }
    }
  }, [])

  const filteredEssentials = essentials.filter((essential) => {
    const matchesSearch =
      essential.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      essential.description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesSearch
  })

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

      {/* Search Bar */}
      <div className="max-w-2xl mx-auto mb-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
          <Input
            type="text"
            placeholder="Search Minecraft essentials..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-slate-800/50 border-purple-500/20 text-white placeholder:text-slate-400 focus:border-purple-500 h-12 text-lg"
          />
        </div>
      </div>

      {/* Results Count */}
      <p className="text-slate-400 mb-4">
        Showing {filteredEssentials.length} of {essentials.length} essentials
      </p>

      {/* Minecraft Essentials */}
      <section className="px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-purple-400">🏗️ Minecraft Essentials</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredEssentials.map((essential, index) => (
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
          {filteredEssentials.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-semibold text-slate-300 mb-2">No essentials found</h3>
              <p className="text-slate-400">Try adjusting your search terms</p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
