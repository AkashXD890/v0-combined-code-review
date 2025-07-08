"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Download, Heart, ArrowLeft, Star, Clock, FileText, Shield, Terminal, Key, ImageIcon } from "lucide-react"
import AddToCartButton from "../../components/add-to-cart-button"
import MediaModal from "./media-modal"

export default function PluginDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [plugin, setPlugin] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("overview")
  const [showMediaModal, setShowMediaModal] = useState(false)
  const [mediaModalIndex, setMediaModalIndex] = useState(0)

  useEffect(() => {
    // In a real app, you would fetch the plugin data from an API
    // For now, we'll simulate loading from localStorage
    const fetchPlugin = async () => {
      setLoading(true)

      // First check admin plugins
      const adminPlugins = localStorage.getItem("adminPlugins")
      let allPlugins = []

      if (adminPlugins) {
        allPlugins = JSON.parse(adminPlugins)
      }

      // Add default plugins if not found
      if (allPlugins.length === 0 || !allPlugins.find((p: any) => p.id.toString() === params.id)) {
        allPlugins = [
          {
            id: 1,
            icon: "/placeholder.svg?height=128&width=128",
            title: "EconomyCore",
            author: "ServerMaster",
            description:
              "Complete economy system with shops, auctions, and banking. Features advanced trading mechanics and multi-currency support for complex server economies.",
            longDescription:
              "EconomyCore is the ultimate economy solution for Minecraft servers. It provides a comprehensive set of tools for creating a dynamic economy on your server. From basic currency management to complex trading systems, EconomyCore has everything you need to create an engaging economic experience for your players.",
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
              {
                url: "/placeholder.svg?height=400&width=600",
                title: "Main Economy Dashboard",
                description:
                  "Overview of the economy system with real-time statistics, player balances, and transaction history",
              },
              {
                url: "/placeholder.svg?height=400&width=600",
                title: "Shop Creation Interface",
                description: "Easy-to-use shop creation tool with drag-and-drop functionality and price management",
              },
              {
                url: "/placeholder.svg?height=400&width=600",
                title: "Banking System",
                description:
                  "Advanced banking features including loans, interest rates, and secure player-to-player transfers",
              },
              {
                url: "/placeholder.svg?height=400&width=600",
                title: "Auction House",
                description: "Dynamic auction system where players can bid on items with automatic notifications",
              },
            ],
            features: [
              "Multi-currency support with exchange rates",
              "Advanced shop system with custom shop types",
              "Player-to-player trading with secure trade interface",
              "Banking with interest rates and loans",
              "Auction house with bidding system",
              "Economy statistics dashboard for admins",
              "API for developers to integrate with other plugins",
              "Vault integration for compatibility",
              "MySQL and SQLite database support",
              "Customizable language files",
            ],
            requirements: [
              "Spigot or Paper 1.8.8 - 1.20.1",
              "Java 8 or higher",
              "Vault (optional but recommended)",
              "PlaceholderAPI (optional)",
            ],
            installation: [
              "Download the plugin JAR file",
              "Place the JAR file in your server's plugins folder",
              "Restart your server",
              "Edit the configuration file to customize settings",
              "Use /economy reload to apply changes",
            ],
            commands: [
              { name: "/eco give <player> <amount>", description: "Give money to a player" },
              { name: "/eco take <player> <amount>", description: "Take money from a player" },
              { name: "/eco set <player> <amount>", description: "Set a player's balance" },
              { name: "/eco reset <player>", description: "Reset a player's balance" },
              { name: "/shop create", description: "Create a new shop" },
              { name: "/bank deposit <amount>", description: "Deposit money into your bank account" },
              { name: "/bank withdraw <amount>", description: "Withdraw money from your bank account" },
              { name: "/trade <player>", description: "Send a trade request to a player" },
            ],
            permissions: [
              { name: "economycore.admin", description: "Access to all admin commands" },
              { name: "economycore.shop.create", description: "Ability to create shops" },
              { name: "economycore.bank.interest", description: "Receive interest on bank deposits" },
              { name: "economycore.trade", description: "Ability to trade with other players" },
            ],
            placeholders: [
              { name: "%economycore_balance%", description: "Player's current balance" },
              { name: "%economycore_bank_balance%", description: "Player's bank balance" },
              { name: "%economycore_total_balance%", description: "Player's total balance (wallet + bank)" },
            ],
          },
          // Add more default plugins as needed
        ]
      }

      const foundPlugin = allPlugins.find((p: any) => p.id.toString() === params.id)

      if (foundPlugin) {
        // Ensure all required fields exist
        setPlugin({
          ...foundPlugin,
          longDescription: foundPlugin.longDescription || foundPlugin.description,
          requirements: foundPlugin.requirements || [],
          installation: foundPlugin.installation || [],
          commands: foundPlugin.commands || [],
          permissions: foundPlugin.permissions || [],
          placeholders: foundPlugin.placeholders || [],
          icon: foundPlugin.icon || foundPlugin.iconUrl || "/placeholder.svg?height=128&width=128",
        })
      } else {
        // Plugin not found, redirect to plugins list
        router.push("/plugins")
      }

      setLoading(false)
    }

    fetchPlugin()
  }, [params.id, router])

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(2) + "M"
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K"
    }
    return num.toString()
  }

  if (loading || !plugin) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-pulse text-purple-400 text-xl">Loading plugin details...</div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Back Button */}
      <div className="mb-6">
        <Button variant="ghost" onClick={() => router.push("/plugins")} className="text-slate-400 hover:text-white">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Plugins
        </Button>
      </div>

      {/* Plugin Header */}
      <div className="bg-slate-900/70 border border-purple-500/20 rounded-lg p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Plugin Icon */}
          <div className="flex-shrink-0">
            <img
              src={plugin.icon || "/placeholder.svg"}
              alt={plugin.title}
              className="w-32 h-32 rounded-lg border border-purple-500/30 object-cover"
            />
          </div>

          {/* Plugin Info */}
          <div className="flex-1">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-white mb-1">{plugin.title}</h1>
                <p className="text-slate-400">
                  by <span className="text-purple-400 hover:underline cursor-pointer">{plugin.author}</span>
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {plugin.price === "Free" ? (
                  <Button className="bg-green-600 hover:bg-green-700 text-white">
                    <Download className="w-4 h-4 mr-2" />
                    Download Free
                  </Button>
                ) : (
                  <AddToCartButton
                    item={{
                      id: plugin.id,
                      title: plugin.title,
                      price: plugin.price,
                      type: "plugin",
                    }}
                  />
                )}
                <Button variant="outline" className="border-purple-500/20">
                  <Heart className="w-4 h-4 mr-2" />
                  Follow
                </Button>
              </div>
            </div>

            {/* Plugin Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
              <div className="bg-slate-800/50 rounded-lg p-3">
                <div className="flex items-center gap-2 text-slate-400 mb-1">
                  <Download className="w-4 h-4" />
                  <span className="text-sm">Downloads</span>
                </div>
                <p className="text-xl font-bold text-white">{formatNumber(plugin.downloads)}</p>
              </div>
              <div className="bg-slate-800/50 rounded-lg p-3">
                <div className="flex items-center gap-2 text-slate-400 mb-1">
                  <Heart className="w-4 h-4" />
                  <span className="text-sm">Followers</span>
                </div>
                <p className="text-xl font-bold text-white">{formatNumber(plugin.followers)}</p>
              </div>
              <div className="bg-slate-800/50 rounded-lg p-3">
                <div className="flex items-center gap-2 text-slate-400 mb-1">
                  <Star className="w-4 h-4" />
                  <span className="text-sm">Rating</span>
                </div>
                <p className="text-xl font-bold text-white">{plugin.rating}/5.0</p>
              </div>
              <div className="bg-slate-800/50 rounded-lg p-3">
                <div className="flex items-center gap-2 text-slate-400 mb-1">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">Updated</span>
                </div>
                <p className="text-xl font-bold text-white">{plugin.lastUpdated}</p>
              </div>
            </div>

            {/* Version and Compatibility */}
            <div className="mt-6 flex flex-col sm:flex-row gap-4">
              <div>
                <p className="text-slate-400 text-sm mb-1">Version</p>
                <Badge variant="outline" className="border-purple-500/30 text-purple-300">
                  v{plugin.version}
                </Badge>
              </div>
              <div>
                <p className="text-slate-400 text-sm mb-1">Compatibility</p>
                <div className="flex flex-wrap gap-1">
                  {plugin.compatibility.map((comp: string, index: number) => (
                    <Badge key={index} variant="outline" className="border-purple-500/30 text-purple-300">
                      {comp}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
        <TabsList className="grid grid-cols-2 md:grid-cols-5 bg-slate-800/50 mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="installation">Installation</TabsTrigger>
          <TabsTrigger value="commands">Commands</TabsTrigger>
          <TabsTrigger value="permissions">Permissions</TabsTrigger>
          <TabsTrigger value="media">Media</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-8">
          {/* About Section */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-yellow-500/20 p-2 rounded-lg">
                <FileText className="w-6 h-6 text-yellow-500" />
              </div>
              <h2 className="text-2xl font-bold text-yellow-500">ABOUT</h2>
            </div>
            <Card className="bg-slate-900/50 border-purple-500/20">
              <CardContent className="p-6">
                <p className="text-slate-300 leading-relaxed whitespace-pre-line">{plugin.longDescription}</p>
              </CardContent>
            </Card>
          </section>

          {/* Requirements Section */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-amber-500/20 p-2 rounded-lg">
                <Shield className="w-6 h-6 text-amber-500" />
              </div>
              <h2 className="text-2xl font-bold text-amber-500">REQUIREMENTS</h2>
            </div>
            <Card className="bg-slate-900/50 border-purple-500/20">
              <CardContent className="p-6">
                <ul className="space-y-3">
                  {plugin.requirements && plugin.requirements.length > 0 ? (
                    plugin.requirements.map((req: string, index: number) => (
                      <li key={index} className="flex items-start gap-2 text-slate-300">
                        <div className="min-w-[20px] mt-1">•</div>
                        <span>{req}</span>
                      </li>
                    ))
                  ) : (
                    <li className="text-slate-300">No specific requirements listed.</li>
                  )}
                </ul>
              </CardContent>
            </Card>
          </section>

          {/* Features Section */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-yellow-500/20 p-2 rounded-lg">
                <Star className="w-6 h-6 text-yellow-500" />
              </div>
              <h2 className="text-2xl font-bold text-yellow-500">FEATURES</h2>
            </div>
            <Card className="bg-slate-900/50 border-purple-500/20">
              <CardContent className="p-6">
                <ul className="space-y-3">
                  {plugin.features.map((feature: string, index: number) => (
                    <li key={index} className="flex items-start gap-2 text-slate-300">
                      <div className="min-w-[20px] mt-1">•</div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </section>
        </TabsContent>

        {/* Installation Tab */}
        <TabsContent value="installation" className="space-y-8">
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-amber-500/20 p-2 rounded-lg">
                <Download className="w-6 h-6 text-amber-500" />
              </div>
              <h2 className="text-2xl font-bold text-amber-500">INSTALLATION</h2>
            </div>
            <Card className="bg-slate-900/50 border-purple-500/20">
              <CardContent className="p-6">
                <ol className="space-y-4">
                  {plugin.installation && plugin.installation.length > 0 ? (
                    plugin.installation.map((step: string, index: number) => (
                      <li key={index} className="flex items-start gap-3 text-slate-300">
                        <div className="bg-purple-500/20 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                          {index + 1}
                        </div>
                        <span>{step}</span>
                      </li>
                    ))
                  ) : (
                    <li className="text-slate-300">
                      <p>Standard installation:</p>
                      <ol className="ml-6 mt-2 space-y-2 list-decimal">
                        <li>Download the plugin JAR file</li>
                        <li>Place the JAR file in your server's plugins folder</li>
                        <li>Restart your server</li>
                        <li>Configure the plugin settings as needed</li>
                      </ol>
                    </li>
                  )}
                </ol>
              </CardContent>
            </Card>
          </section>
        </TabsContent>

        {/* Commands Tab */}
        <TabsContent value="commands" className="space-y-8">
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-amber-500/20 p-2 rounded-lg">
                <Terminal className="w-6 h-6 text-amber-500" />
              </div>
              <h2 className="text-2xl font-bold text-amber-500">COMMANDS</h2>
            </div>
            <Card className="bg-slate-900/50 border-purple-500/20">
              <CardContent className="p-6">
                {plugin.commands && plugin.commands.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-purple-500/20">
                          <th className="text-left py-3 px-4 text-purple-400">Command</th>
                          <th className="text-left py-3 px-4 text-purple-400">Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        {plugin.commands.map((cmd: any, index: number) => (
                          <tr key={index} className="border-b border-purple-500/10">
                            <td className="py-3 px-4 text-white font-mono">{cmd.name}</td>
                            <td className="py-3 px-4 text-slate-300">{cmd.description}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="text-slate-300">No commands listed for this plugin.</p>
                )}
              </CardContent>
            </Card>
          </section>
        </TabsContent>

        {/* Permissions Tab */}
        <TabsContent value="permissions" className="space-y-8">
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-amber-500/20 p-2 rounded-lg">
                <Key className="w-6 h-6 text-amber-500" />
              </div>
              <h2 className="text-2xl font-bold text-amber-500">PERMISSIONS</h2>
            </div>
            <Card className="bg-slate-900/50 border-purple-500/20">
              <CardContent className="p-6">
                {plugin.permissions && plugin.permissions.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-purple-500/20">
                          <th className="text-left py-3 px-4 text-purple-400">Permission</th>
                          <th className="text-left py-3 px-4 text-purple-400">Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        {plugin.permissions.map((perm: any, index: number) => (
                          <tr key={index} className="border-b border-purple-500/10">
                            <td className="py-3 px-4 text-white font-mono">{perm.name}</td>
                            <td className="py-3 px-4 text-slate-300">{perm.description}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="text-slate-300">No permissions listed for this plugin.</p>
                )}
              </CardContent>
            </Card>
          </section>
        </TabsContent>

        {/* Media Tab */}
        <TabsContent value="media" className="space-y-8">
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-amber-500/20 p-2 rounded-lg">
                <ImageIcon className="w-6 h-6 text-amber-500" />
              </div>
              <h2 className="text-2xl font-bold text-amber-500">MEDIA</h2>
            </div>
            <Card className="bg-slate-900/50 border-purple-500/20">
              <CardContent className="p-6">
                {plugin.screenshots && plugin.screenshots.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {plugin.screenshots.map((screenshot: any, index: number) => {
                      const screenshotData =
                        typeof screenshot === "string"
                          ? { url: screenshot, title: `Screenshot ${index + 1}`, description: "Plugin interface" }
                          : screenshot

                      return (
                        <div
                          key={index}
                          className="group cursor-pointer"
                          onClick={() => {
                            setMediaModalIndex(index)
                            setShowMediaModal(true)
                          }}
                        >
                          {/* Screenshot title */}
                          <div className="mb-3">
                            <h4 className="text-lg font-semibold text-purple-400 mb-1">{screenshotData.title}</h4>
                            <p className="text-sm text-slate-400">{screenshotData.description}</p>
                          </div>

                          {/* Screenshot image */}
                          <div className="overflow-hidden rounded-lg border border-purple-500/20 group-hover:border-purple-500/50 transition-all duration-200">
                            <img
                              src={screenshotData.url || "/placeholder.svg"}
                              alt={screenshotData.title || `${plugin.title} screenshot ${index + 1}`}
                              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-200"
                            />
                          </div>

                          {/* Click hint */}
                          <div className="mt-2 text-center">
                            <span className="text-xs text-slate-500 group-hover:text-purple-400 transition-colors">
                              Click to view full size
                            </span>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">🖼️</div>
                    <p className="text-slate-300">No screenshots available for this plugin.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </section>
        </TabsContent>
      </Tabs>
      {showMediaModal && plugin.screenshots && (
        <MediaModal
          images={plugin.screenshots}
          initialIndex={mediaModalIndex}
          onClose={() => setShowMediaModal(false)}
        />
      )}
    </div>
  )
}
