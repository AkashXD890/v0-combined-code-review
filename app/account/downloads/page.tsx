"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download, ExternalLink, ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"

export default function DownloadsPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("plugins")

  // Mock purchased items
  const purchasedItems = {
    plugins: [
      {
        id: 1,
        name: "Economy Systems",
        description: "Vault, EssentialsX Economy, ChestShop - create player-driven economies with shops and currency.",
        purchaseDate: "2025-05-15",
        version: "2.5.1",
        fileSize: "4.2 MB",
      },
      {
        id: 2,
        name: "PvP Enhancements",
        description: "McMMO, Heroes, Custom Enchants - RPG progression and enhanced combat mechanics.",
        purchaseDate: "2025-05-10",
        version: "3.1.0",
        fileSize: "8.7 MB",
      },
    ],
    resources: [
      {
        id: 3,
        name: "Resource Packs",
        description: "High-quality texture packs, shader support, and custom resource pack hosting.",
        purchaseDate: "2025-05-12",
        version: "1.0.0",
        fileSize: "128 MB",
      },
    ],
    ranks: [
      {
        id: 4,
        name: "VIP Rank",
        description: "VIP-only areas access, custom particle effects, extra claim blocks, and more.",
        purchaseDate: "2025-05-14",
        activationKey: "VIP-1234-5678-9ABC",
      },
    ],
    crates: [
      {
        id: 5,
        name: "Legendary Crate",
        description: "5,000-15,000 in-game currency, legendary equipment sets, exclusive mounts and pets.",
        purchaseDate: "2025-05-13",
        activationKey: "CRATE-ABCD-1234-EFGH",
      },
    ],
  }

  const renderDownloadItems = (items: any[]) => {
    if (items.length === 0) {
      return (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📦</div>
          <h3 className="text-2xl font-semibold text-slate-300 mb-2">No items found</h3>
          <p className="text-slate-400">You haven't purchased any items in this category yet.</p>
        </div>
      )
    }

    return (
      <div className="space-y-4">
        {items.map((item) => (
          <Card key={item.id} className="bg-slate-900/50 border-purple-500/20">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row justify-between gap-4">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-purple-400 mb-2">{item.name}</h3>
                  <p className="text-slate-300 mb-4">{item.description}</p>

                  <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
                    <div>
                      <span className="text-slate-400">Purchased: </span>
                      <span className="text-white">{new Date(item.purchaseDate).toLocaleDateString()}</span>
                    </div>

                    {item.version && (
                      <div>
                        <span className="text-slate-400">Version: </span>
                        <span className="text-white">{item.version}</span>
                      </div>
                    )}

                    {item.fileSize && (
                      <div>
                        <span className="text-slate-400">Size: </span>
                        <span className="text-white">{item.fileSize}</span>
                      </div>
                    )}

                    {item.activationKey && (
                      <div>
                        <span className="text-slate-400">Activation Key: </span>
                        <span className="text-white font-mono">{item.activationKey}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex flex-row md:flex-col gap-3 self-end md:self-center">
                  {(activeTab === "plugins" || activeTab === "resources") && (
                    <Button className="bg-purple-600 hover:bg-purple-700">
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                  )}

                  <Button variant="outline" className="border-purple-500/20">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    View Details
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-20">
      <Button variant="ghost" className="mb-8 text-slate-400 hover:text-white" onClick={() => router.push("/")}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Home
      </Button>

      <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
        My Downloads
      </h1>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-slate-800/50">
          <TabsTrigger value="plugins">Plugins</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
          <TabsTrigger value="ranks">Server Ranks</TabsTrigger>
          <TabsTrigger value="crates">Mystery Crates</TabsTrigger>
        </TabsList>

        <TabsContent value="plugins">
          <Card className="bg-slate-900/50 border-purple-500/20">
            <CardHeader>
              <CardTitle className="text-purple-400">Purchased Plugins</CardTitle>
            </CardHeader>
            <CardContent>{renderDownloadItems(purchasedItems.plugins)}</CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="resources">
          <Card className="bg-slate-900/50 border-purple-500/20">
            <CardHeader>
              <CardTitle className="text-purple-400">Purchased Resources</CardTitle>
            </CardHeader>
            <CardContent>{renderDownloadItems(purchasedItems.resources)}</CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ranks">
          <Card className="bg-slate-900/50 border-purple-500/20">
            <CardHeader>
              <CardTitle className="text-purple-400">Purchased Server Ranks</CardTitle>
            </CardHeader>
            <CardContent>{renderDownloadItems(purchasedItems.ranks)}</CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="crates">
          <Card className="bg-slate-900/50 border-purple-500/20">
            <CardHeader>
              <CardTitle className="text-purple-400">Purchased Mystery Crates</CardTitle>
            </CardHeader>
            <CardContent>{renderDownloadItems(purchasedItems.crates)}</CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
