"use client"

import { Card, CardContent } from "@/components/ui/card"
import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

export default function ResourcesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [resources, setResources] = useState([
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
  ])

  // Load admin data on component mount
  useEffect(() => {
    const adminResources = localStorage.getItem("adminResources")
    if (adminResources) {
      const parsedResources = JSON.parse(adminResources)
      const resourcesWithIcons = parsedResources.map((resource: any) => ({
        ...resource,
        icon: resource.icon || "📦",
      }))
      setResources((prevResources) => {
        const defaultTitles = prevResources.map((r) => r.title)
        const newResources = resourcesWithIcons.filter((r: any) => !defaultTitles.includes(r.title))
        return [...prevResources, ...newResources]
      })
    }
  }, [])

  const filteredResources = resources.filter((resource) => {
    const matchesSearch =
      resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesSearch
  })

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

      {/* Search Bar */}
      <div className="max-w-2xl mx-auto mb-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
          <Input
            type="text"
            placeholder="Search server resources..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-slate-800/50 border-purple-500/20 text-white placeholder:text-slate-400 focus:border-purple-500 h-12 text-lg"
          />
        </div>
      </div>

      {/* Results Count */}
      <p className="text-slate-400 mb-4">
        Showing {filteredResources.length} of {resources.length} resources
      </p>

      <section className="px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredResources.map((resource, index) => (
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

      {filteredResources.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-2xl font-semibold text-slate-300 mb-2">No resources found</h3>
          <p className="text-slate-400">Try adjusting your search terms</p>
        </div>
      )}
    </div>
  )
}
