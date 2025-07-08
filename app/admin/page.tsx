"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Search,
  Users,
  DollarSign,
  Download,
  TrendingUp,
  LogOut,
  Plus,
  Edit,
  Trash2,
  Save,
  X,
  FileText,
} from "lucide-react"

export default function AdminDashboard() {
  const [isAdmin, setIsAdmin] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingItem, setEditingItem] = useState<any>(null)
  const [activeCategory, setActiveCategory] = useState("plugins")
  const [plugins, setPlugins] = useState<any[]>([])
  const [resources, setResources] = useState<any[]>([])
  const [ranks, setRanks] = useState<any[]>([])
  const [crates, setCrates] = useState<any[]>([])
  const [newItem, setNewItem] = useState({
    title: "",
    description: "",
    longDescription: "",
    price: "",
    category: "",
    features: "",
    rewards: "",
    name: "",
    color: "",
    iconUrl: "",
    fileUrl: "",
    screenshots: [] as any[],
    fileName: "",
    fileSize: "",
    version: "",
    author: "",
    compatibility: [] as string[],
    requirements: "",
    installation: "",
    commands: "",
    permissions: "",
    placeholders: "",
  })
  const [websiteStats, setWebsiteStats] = useState({
    totalRevenue: 54000,
    totalUsers: 4500,
    activeServers: 24,
    conversionRate: 18,
  })
  const [showScreenshots, setShowScreenshots] = useState<string[]>([])
  const [selectedScreenshot, setSelectedScreenshot] = useState<string | null>(null)
  const router = useRouter()

  const [purchases, setPurchases] = useState([
    {
      id: 1,
      orderNumber: "YN-123456",
      customerName: "John Doe",
      customerEmail: "john@example.com",
      items: [
        { name: "Economy Systems", type: "plugin", price: "$9.99", quantity: 1 },
        { name: "VIP Rank", type: "rank", price: "$9.99", quantity: 1 },
      ],
      subtotal: 19.98,
      tax: 2.0,
      total: 21.98,
      status: "completed",
      paymentMethod: "Credit Card",
      purchaseDate: "2025-01-08T10:30:00Z",
      billingAddress: {
        address: "123 Main St",
        city: "New York",
        state: "NY",
        zipCode: "10001",
        country: "United States",
      },
    },
    {
      id: 2,
      orderNumber: "YN-123457",
      customerName: "Jane Smith",
      customerEmail: "jane@example.com",
      items: [
        { name: "Legendary Crate", type: "crate", price: "$15.99", quantity: 2 },
        { name: "PvP Enhancements", type: "plugin", price: "$14.99", quantity: 1 },
      ],
      subtotal: 46.97,
      tax: 4.7,
      total: 51.67,
      status: "completed",
      paymentMethod: "Credit Card",
      purchaseDate: "2025-01-08T09:15:00Z",
      billingAddress: {
        address: "456 Oak Ave",
        city: "Los Angeles",
        state: "CA",
        zipCode: "90210",
        country: "United States",
      },
    },
    {
      id: 3,
      orderNumber: "YN-123458",
      customerName: "Mike Johnson",
      customerEmail: "mike@example.com",
      items: [{ name: "Elite Rank", type: "rank", price: "$19.99", quantity: 1 }],
      subtotal: 19.99,
      tax: 2.0,
      total: 21.99,
      status: "pending",
      paymentMethod: "Invoice",
      purchaseDate: "2025-01-08T11:45:00Z",
      billingAddress: {
        address: "789 Pine St",
        city: "Chicago",
        state: "IL",
        zipCode: "60601",
        country: "United States",
      },
    },
    {
      id: 4,
      orderNumber: "YN-123459",
      customerName: "Sarah Wilson",
      customerEmail: "sarah@example.com",
      items: [
        { name: "Minigames", type: "plugin", price: "$19.99", quantity: 1 },
        { name: "Common Crate", type: "crate", price: "$2.99", quantity: 3 },
      ],
      subtotal: 28.96,
      tax: 2.9,
      total: 31.86,
      status: "completed",
      paymentMethod: "Credit Card",
      purchaseDate: "2025-01-07T16:20:00Z",
      billingAddress: {
        address: "321 Elm St",
        city: "Miami",
        state: "FL",
        zipCode: "33101",
        country: "United States",
      },
    },
  ])
  const [selectedPurchase, setSelectedPurchase] = useState<any>(null)
  const [showPurchaseDetails, setShowPurchaseDetails] = useState(false)

  // Load data from localStorage on mount
  useEffect(() => {
    const adminStatus = sessionStorage.getItem("isAdmin") === "true"
    setIsAdmin(adminStatus)

    if (!adminStatus) {
      router.push("/")
      return
    }

    // Load data from localStorage
    const savedPlugins = localStorage.getItem("adminPlugins")
    const savedResources = localStorage.getItem("adminResources")
    const savedRanks = localStorage.getItem("adminRanks")
    const savedCrates = localStorage.getItem("adminCrates")

    if (savedPlugins) setPlugins(JSON.parse(savedPlugins))
    if (savedResources) setResources(JSON.parse(savedResources))
    if (savedRanks) setRanks(JSON.parse(savedRanks))
    if (savedCrates) setCrates(JSON.parse(savedCrates))
  }, [router])

  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem("adminPlugins", JSON.stringify(plugins))
  }, [plugins])

  useEffect(() => {
    localStorage.setItem("adminResources", JSON.stringify(resources))
  }, [resources])

  useEffect(() => {
    localStorage.setItem("adminRanks", JSON.stringify(ranks))
  }, [ranks])

  useEffect(() => {
    localStorage.setItem("adminCrates", JSON.stringify(crates))
  }, [crates])

  // File upload handlers
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>, type: "icon" | "file" | "screenshot") => {
    const file = event.target.files?.[0]
    if (!file) return

    // Create blob URL for preview (in real app, you'd upload to server)
    const blobUrl = URL.createObjectURL(file)

    if (type === "icon") {
      setNewItem((prev) => ({ ...prev, iconUrl: blobUrl }))
    } else if (type === "file") {
      setNewItem((prev) => ({
        ...prev,
        fileUrl: blobUrl,
        fileName: file.name,
        fileSize: (file.size / 1024 / 1024).toFixed(2) + " MB",
      }))
    } else if (type === "screenshot") {
      setNewItem((prev) => ({
        ...prev,
        screenshots: [
          ...prev.screenshots,
          {
            url: blobUrl,
            title: `Screenshot ${prev.screenshots.length + 1}`,
            description: "Plugin interface and features",
          },
        ],
      }))
    }
  }

  const removeScreenshot = (index: number) => {
    setNewItem((prev) => ({
      ...prev,
      screenshots: prev.screenshots.filter((_, i) => i !== index),
    }))
  }

  const handleEditItem = (item: any) => {
    setEditingItem(item)
    setNewItem({
      title: item.title || "",
      description: item.description || "",
      longDescription: item.longDescription || item.description || "",
      price: item.price || "",
      category: item.category || "",
      features: Array.isArray(item.features) ? item.features.join("\n") : "",
      rewards: Array.isArray(item.rewards) ? item.rewards.join("\n") : "",
      name: item.name || "",
      color: item.color || "",
      iconUrl: item.iconUrl || item.icon || "",
      fileUrl: item.fileUrl || "",
      screenshots: item.screenshots || [],
      fileName: item.fileName || "",
      fileSize: item.fileSize || "",
      version: item.version || "",
      author: item.author || "",
      compatibility: item.compatibility || [],
      requirements: Array.isArray(item.requirements) ? item.requirements.join("\n") : "",
      installation: Array.isArray(item.installation) ? item.installation.join("\n") : "",
      commands: Array.isArray(item.commands)
        ? item.commands.map((cmd: any) => `${cmd.name}|${cmd.description}`).join("\n")
        : "",
      permissions: Array.isArray(item.permissions)
        ? item.permissions.map((perm: any) => `${perm.name}|${perm.description}`).join("\n")
        : "",
      placeholders: Array.isArray(item.placeholders)
        ? item.placeholders.map((ph: any) => `${ph.name}|${ph.description}`).join("\n")
        : "",
    })
    setShowAddForm(true)
  }

  const handleAddItem = () => {
    // Process commands, permissions, and placeholders
    const processCommands = (cmdText: string) => {
      if (!cmdText) return []
      return cmdText
        .split("\n")
        .filter((line) => line.trim())
        .map((line) => {
          const [name, description] = line.split("|").map((s) => s.trim())
          return { name, description: description || "" }
        })
    }

    const processTextList = (text: string) => {
      if (!text) return []
      return text
        .split("\n")
        .filter((line) => line.trim())
        .map((line) => line.trim())
    }

    if (editingItem) {
      // Update existing item
      const updatedItem = {
        ...editingItem,
        ...newItem,
        features: processTextList(newItem.features),
        rewards: processTextList(newItem.rewards),
        requirements: processTextList(newItem.requirements),
        installation: processTextList(newItem.installation),
        commands: processCommands(newItem.commands),
        permissions: processCommands(newItem.permissions),
        placeholders: processCommands(newItem.placeholders),
      }

      switch (activeCategory) {
        case "plugins":
          setPlugins((prev) => prev.map((p) => (p.id === editingItem.id ? updatedItem : p)))
          break
        case "resources":
          setResources((prev) => prev.map((r) => (r.id === editingItem.id ? updatedItem : r)))
          break
        case "ranks":
          setRanks((prev) => prev.map((r) => (r.id === editingItem.id ? updatedItem : r)))
          break
        case "crates":
          setCrates((prev) => prev.map((c) => (c.id === editingItem.id ? updatedItem : c)))
          break
      }
      setEditingItem(null)
    } else {
      // Add new item
      const item = {
        id: Date.now(),
        ...newItem,
        features: processTextList(newItem.features),
        rewards: processTextList(newItem.rewards),
        requirements: processTextList(newItem.requirements),
        installation: processTextList(newItem.installation),
        commands: processCommands(newItem.commands),
        permissions: processCommands(newItem.permissions),
        placeholders: processCommands(newItem.placeholders),
        downloads: 0,
        followers: 0,
        rating: 0,
        status: "active",
      }

      switch (activeCategory) {
        case "plugins":
          setPlugins((prev) => [...prev, item])
          break
        case "resources":
          setResources((prev) => [...prev, item])
          break
        case "ranks":
          setRanks((prev) => [...prev, item])
          break
        case "crates":
          setCrates((prev) => [...prev, item])
          break
      }
    }

    setNewItem({
      title: "",
      description: "",
      longDescription: "",
      price: "",
      category: "",
      features: "",
      rewards: "",
      name: "",
      color: "",
      iconUrl: "",
      fileUrl: "",
      screenshots: [],
      fileName: "",
      fileSize: "",
      version: "",
      author: "",
      compatibility: [],
      requirements: "",
      installation: "",
      commands: "",
      permissions: "",
      placeholders: "",
    })
    setShowAddForm(false)
  }

  const handleDeleteItem = (id: number) => {
    switch (activeCategory) {
      case "plugins":
        setPlugins(plugins.filter((p) => p.id !== id))
        break
      case "resources":
        setResources(resources.filter((r) => r.id !== id))
        break
      case "ranks":
        setRanks(ranks.filter((r) => r.id !== id))
        break
      case "crates":
        setCrates(crates.filter((c) => c.id !== id))
        break
    }
  }

  const handleLogout = () => {
    sessionStorage.removeItem("isAdmin")
    router.push("/")
  }

  const handleCompatibilityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target
    setNewItem((prev) => ({
      ...prev,
      compatibility: checked ? [...prev.compatibility, value] : prev.compatibility.filter((c) => c !== value),
    }))
  }

  const renderScreenshotModal = () => {
    if (!selectedScreenshot) return null

    return (
      <div
        className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
        onClick={() => setSelectedScreenshot(null)}
      >
        <div className="max-w-4xl max-h-[90vh] relative">
          <img
            src={selectedScreenshot || "/placeholder.svg"}
            alt="Screenshot"
            className="max-w-full max-h-full object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
          <Button
            variant="ghost"
            size="sm"
            className="absolute top-2 right-2 bg-black/50 text-white hover:bg-black/70"
            onClick={() => setSelectedScreenshot(null)}
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>
    )
  }

  const renderPurchaseDetails = () => {
    const filteredPurchases = purchases.filter(
      (purchase) =>
        purchase.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        purchase.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        purchase.customerEmail.toLowerCase().includes(searchTerm.toLowerCase()),
    )

    return (
      <div className="space-y-4">
        {filteredPurchases.map((purchase) => (
          <Card key={purchase.id} className="bg-slate-900/50 border-purple-500/20">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-3">
                    <h3 className="text-xl font-semibold text-purple-400">{purchase.orderNumber}</h3>
                    <Badge
                      variant={purchase.status === "completed" ? "default" : "secondary"}
                      className={purchase.status === "completed" ? "bg-green-600" : "bg-yellow-600"}
                    >
                      {purchase.status}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-slate-400">Customer</p>
                      <p className="text-white font-medium">{purchase.customerName}</p>
                      <p className="text-slate-300 text-sm">{purchase.customerEmail}</p>
                    </div>

                    <div>
                      <p className="text-sm text-slate-400">Purchase Date</p>
                      <p className="text-white">{new Date(purchase.purchaseDate).toLocaleDateString()}</p>
                      <p className="text-slate-300 text-sm">{new Date(purchase.purchaseDate).toLocaleTimeString()}</p>
                    </div>

                    <div>
                      <p className="text-sm text-slate-400">Total Amount</p>
                      <p className="text-white font-bold text-lg">${purchase.total.toFixed(2)}</p>
                      <p className="text-slate-300 text-sm">{purchase.paymentMethod}</p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm text-slate-400 mb-2">Items Purchased ({purchase.items.length})</p>
                    <div className="flex flex-wrap gap-2">
                      {purchase.items.map((item, index) => (
                        <Badge key={index} variant="outline" className="border-purple-500/30 text-purple-300">
                          {item.name} ({item.type}) x{item.quantity}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <Button
                  size="sm"
                  variant="outline"
                  className="border-purple-500/20"
                  onClick={() => {
                    setSelectedPurchase(purchase)
                    setShowPurchaseDetails(true)
                  }}
                >
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  const renderPurchaseModal = () => {
    if (!selectedPurchase) return null

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <Card className="bg-slate-900/95 border-purple-500/20 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <CardHeader className="border-b border-purple-500/10">
            <div className="flex justify-between items-center">
              <CardTitle className="text-purple-400">Purchase Details - {selectedPurchase.orderNumber}</CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setShowPurchaseDetails(false)
                  setSelectedPurchase(null)
                }}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>

          <CardContent className="p-6 space-y-6">
            {/* Customer Information */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-3">Customer Information</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-800/30 p-4 rounded-lg">
                <div>
                  <p className="text-slate-400 text-sm">Name</p>
                  <p className="text-white">{selectedPurchase.customerName}</p>
                </div>
                <div>
                  <p className="text-slate-400 text-sm">Email</p>
                  <p className="text-white">{selectedPurchase.customerEmail}</p>
                </div>
              </div>
            </div>

            {/* Billing Address */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-3">Billing Address</h4>
              <div className="bg-slate-800/30 p-4 rounded-lg">
                <p className="text-white">{selectedPurchase.billingAddress.address}</p>
                <p className="text-white">
                  {selectedPurchase.billingAddress.city}, {selectedPurchase.billingAddress.state}{" "}
                  {selectedPurchase.billingAddress.zipCode}
                </p>
                <p className="text-white">{selectedPurchase.billingAddress.country}</p>
              </div>
            </div>

            {/* Order Details */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-3">Order Details</h4>
              <div className="bg-slate-800/30 p-4 rounde-lg space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-slate-400 text-sm">Order Date</p>
                    <p className="text-white">{new Date(selectedPurchase.purchaseDate).toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm">Payment Method</p>
                    <p className="text-white">{selectedPurchase.paymentMethod}</p>
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm">Status</p>
                    <Badge
                      variant={selectedPurchase.status === "completed" ? "default" : "secondary"}
                      className={selectedPurchase.status === "completed" ? "bg-green-600" : "bg-yellow-600"}
                    >
                      {selectedPurchase.status}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>

            {/* Items Purchased */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-3">Items Purchased</h4>
              <div className="space-y-3">
                {selectedPurchase.items.map((item, index) => (
                  <div key={index} className="flex justify-between items-center bg-slate-800/30 p-4 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">
                        {item.type === "plugin" && "🔧"}
                        {item.type === "resource" && "📦"}
                        {item.type === "rank" && "👑"}
                        {item.type === "crate" && "🎁"}
                      </div>
                      <div>
                        <p className="text-white font-medium">{item.name}</p>
                        <p className="text-slate-400 text-sm capitalize">{item.type}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-white">
                        {item.price} x {item.quantity}
                      </p>
                      <p className="text-slate-400 text-sm">
                        ${(Number.parseFloat(item.price.replace("$", "")) * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-3">Order Summary</h4>
              <div className="bg-slate-800/30 p-4 rounded-lg space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-300">Subtotal</span>
                  <span className="text-white">${selectedPurchase.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-300">Tax</span>
                  <span className="text-white">${selectedPurchase.tax.toFixed(2)}</span>
                </div>
                <div className="border-t border-purple-500/20 pt-2 mt-2">
                  <div className="flex justify-between font-semibold">
                    <span className="text-white">Total</span>
                    <span className="text-purple-400 text-xl">${selectedPurchase.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const updateScreenshotData = (index: number, field: "title" | "description", value: string) => {
    setNewItem((prev) => ({
      ...prev,
      screenshots: prev.screenshots.map((screenshot, i) => {
        if (i === index) {
          const screenshotData =
            typeof screenshot === "string" ? { url: screenshot, title: "", description: "" } : screenshot
          return { ...screenshotData, [field]: value }
        }
        return screenshot
      }),
    }))
  }

  const renderItemForm = () => (
    <Card className="bg-slate-900/50 border-purple-500/20 mb-6">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-purple-400">
            {editingItem ? "Edit" : "Add New"} {activeCategory.slice(0, -1)}
          </CardTitle>
          <Button
            onClick={() => {
              setShowAddForm(false)
              setEditingItem(null)
              setNewItem({
                title: "",
                description: "",
                longDescription: "",
                price: "",
                category: "",
                features: "",
                rewards: "",
                name: "",
                color: "",
                iconUrl: "",
                fileUrl: "",
                screenshots: [],
                fileName: "",
                fileSize: "",
                version: "",
                author: "",
                compatibility: [],
                requirements: "",
                installation: "",
                commands: "",
                permissions: "",
                placeholders: "",
              })
            }}
            variant="ghost"
            size="sm"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Basic Information */}
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-white">Basic Information</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-slate-300">
                {activeCategory === "ranks" || activeCategory === "crates" ? "Name" : "Title"}
              </Label>
              <Input
                value={activeCategory === "ranks" || activeCategory === "crates" ? newItem.name : newItem.title}
                onChange={(e) =>
                  setNewItem({
                    ...newItem,
                    [activeCategory === "ranks" || activeCategory === "crates" ? "name" : "title"]: e.target.value,
                  })
                }
                className="bg-slate-800/50 border-purple-500/20"
              />
            </div>
            <div>
              <Label className="text-slate-300">Price</Label>
              <Input
                value={newItem.price}
                onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
                placeholder="e.g., $9.99 or Free"
                className="bg-slate-800/50 border-purple-500/20"
              />
            </div>
          </div>

          {(activeCategory === "plugins" || activeCategory === "resources") && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label className="text-slate-300">Category</Label>
                <Input
                  value={newItem.category}
                  onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                  className="bg-slate-800/50 border-purple-500/20"
                />
              </div>
              <div>
                <Label className="text-slate-300">Version</Label>
                <Input
                  value={newItem.version}
                  onChange={(e) => setNewItem({ ...newItem, version: e.target.value })}
                  placeholder="e.g., 1.0.0"
                  className="bg-slate-800/50 border-purple-500/20"
                />
              </div>
              <div>
                <Label className="text-slate-300">Author</Label>
                <Input
                  value={newItem.author}
                  onChange={(e) => setNewItem({ ...newItem, author: e.target.value })}
                  placeholder="Plugin author name"
                  className="bg-slate-800/50 border-purple-500/20"
                />
              </div>
            </div>
          )}

          <div>
            <Label className="text-slate-300">Short Description</Label>
            <Textarea
              value={newItem.description}
              onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
              className="bg-slate-800/50 border-purple-500/20 min-h-[80px]"
              placeholder="Brief description for listings"
            />
          </div>

          {activeCategory === "plugins" && (
            <div>
              <Label className="text-slate-300">Long Description</Label>
              <Textarea
                value={newItem.longDescription}
                onChange={(e) => setNewItem({ ...newItem, longDescription: e.target.value })}
                className="bg-slate-800/50 border-purple-500/20 min-h-[120px]"
                placeholder="Detailed description for plugin page"
              />
            </div>
          )}
        </div>

        {/* Compatibility (for plugins) */}
        {activeCategory === "plugins" && (
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Compatibility</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {["Server", "Bukkit", "Spigot", "Paper", "Purpur", "Folia", "Velocity", "BungeeCard"].map((comp) => (
                <label key={comp} className="flex items-center gap-2 text-slate-300">
                  <input
                    type="checkbox"
                    value={comp}
                    checked={newItem.compatibility.includes(comp)}
                    onChange={handleCompatibilityChange}
                    className="rounded border-purple-500/20"
                  />
                  {comp}
                </label>
              ))}
            </div>
          </div>
        )}

        {/* File Uploads */}
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-white">Media & Files</h4>

          {/* Icon Upload */}
          <div>
            <Label className="text-slate-300">Icon/Logo</Label>
            <div className="flex items-center gap-4 mt-2">
              <div className="flex-1">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileUpload(e, "icon")}
                  className="bg-slate-800/50 border-purple-500/20"
                />
              </div>
              {newItem.iconUrl && (
                <div className="w-16 h-16 border border-purple-500/20 rounded-lg overflow-hidden">
                  <img
                    src={newItem.iconUrl || "/placeholder.svg"}
                    alt="Icon preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>
          </div>

          {/* File Upload (for plugins/resources) */}
          {(activeCategory === "plugins" || activeCategory === "resources") && (
            <div>
              <Label className="text-slate-300">
                {activeCategory === "plugins" ? "Plugin File (.jar, .zip)" : "Resource File"}
              </Label>
              <div className="space-y-2">
                <Input
                  type="file"
                  accept={activeCategory === "plugins" ? ".jar,.zip" : "*"}
                  onChange={(e) => handleFileUpload(e, "file")}
                  className="bg-slate-800/50 border-purple-500/20"
                />
                {newItem.fileName && (
                  <div className="flex items-center gap-2 text-sm text-slate-300 bg-slate-800/30 p-2 rounded">
                    <FileText className="w-4 h-4" />
                    <span>{newItem.fileName}</span>
                    <span className="text-slate-400">({newItem.fileSize})</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Screenshots */}
          <div>
            <Label className="text-slate-300">Screenshots</Label>
            <div className="space-y-3">
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileUpload(e, "screenshot")}
                className="bg-slate-800/50 border-purple-500/20"
              />

              {newItem.screenshots.length > 0 && (
                <div className="space-y-4">
                  {newItem.screenshots.map((screenshot, index) => {
                    const screenshotData =
                      typeof screenshot === "string" ? { url: screenshot, title: "", description: "" } : screenshot

                    return (
                      <div key={index} className="border border-purple-500/20 rounded-lg p-4">
                        <div className="flex gap-4">
                          <div className="relative group flex-shrink-0">
                            <img
                              src={screenshotData.url || "/placeholder.svg"}
                              alt={`Screenshot ${index + 1}`}
                              className="w-24 h-16 object-cover rounded border border-purple-500/20 cursor-pointer hover:border-purple-500/50 transition-colors"
                              onClick={() => setSelectedScreenshot(screenshotData.url)}
                            />
                            <Button
                              size="sm"
                              variant="destructive"
                              className="absolute -top-2 -right-2 w-6 h-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                              onClick={() => removeScreenshot(index)}
                            >
                              <X className="w-3 h-3" />
                            </Button>
                          </div>

                          <div className="flex-1 space-y-2">
                            <div>
                              <Label className="text-slate-400 text-xs">Screenshot Title</Label>
                              <Input
                                value={screenshotData.title || ""}
                                onChange={(e) => updateScreenshotData(index, "title", e.target.value)}
                                placeholder="e.g., Main Dashboard, Shop Interface"
                                className="bg-slate-800/50 border-purple-500/20 text-sm"
                              />
                            </div>
                            <div>
                              <Label className="text-slate-400 text-xs">Description</Label>
                              <Input
                                value={screenshotData.description || ""}
                                onChange={(e) => updateScreenshotData(index, "description", e.target.value)}
                                placeholder="Brief description of what this screenshot shows"
                                className="bg-slate-800/50 border-purple-500/20 text-sm"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Plugin-specific fields */}
        {activeCategory === "plugins" && (
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Plugin Details</h4>

            <div>
              <Label className="text-slate-300">Requirements (one per line)</Label>
              <Textarea
                value={newItem.requirements}
                onChange={(e) => setNewItem({ ...newItem, requirements: e.target.value })}
                placeholder="Spigot or Paper 1.8.8 - 1.20.1&#10;Java 8 or higher&#10;Vault (optional)"
                className="bg-slate-800/50 border-purple-500/20"
              />
            </div>

            <div>
              <Label className="text-slate-300">Installation Steps (one per line)</Label>
              <Textarea
                value={newItem.installation}
                onChange={(e) => setNewItem({ ...newItem, installation: e.target.value })}
                placeholder="Download the plugin JAR file&#10;Place the JAR file in your server's plugins folder&#10;Restart your server"
                className="bg-slate-800/50 border-purple-500/20"
              />
            </div>

            <div>
              <Label className="text-slate-300">Commands (format: command|description, one per line)</Label>
              <Textarea
                value={newItem.commands}
                onChange={(e) => setNewItem({ ...newItem, commands: e.target.value })}
                placeholder="/eco give &lt;player&gt; &lt;amount&gt;|Give money to a player&#10;/eco take &lt;player&gt; &lt;amount&gt;|Take money from a player"
                className="bg-slate-800/50 border-purple-500/20"
              />
            </div>

            <div>
              <Label className="text-slate-300">Permissions (format: permission|description, one per line)</Label>
              <Textarea
                value={newItem.permissions}
                onChange={(e) => setNewItem({ ...newItem, permissions: e.target.value })}
                placeholder="economycore.admin|Access to all admin commands&#10;economycore.shop.create|Ability to create shops"
                className="bg-slate-800/50 border-purple-500/20"
              />
            </div>
          </div>
        )}

        {/* Category-specific fields */}
        {activeCategory === "ranks" && (
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Rank Details</h4>
            <div>
              <Label className="text-slate-300">Features (one per line)</Label>
              <Textarea
                value={newItem.features}
                onChange={(e) => setNewItem({ ...newItem, features: e.target.value })}
                placeholder="VIP-only areas access&#10;Custom particle effects&#10;Extra claim blocks"
                className="bg-slate-800/50 border-purple-500/20"
              />
            </div>
            <div>
              <Label className="text-slate-300">Color Theme</Label>
              <Input
                value={newItem.color}
                onChange={(e) => setNewItem({ ...newItem, color: e.target.value })}
                placeholder="blue, purple, green, etc."
                className="bg-slate-800/50 border-purple-500/20"
              />
            </div>
          </div>
        )}

        {activeCategory === "crates" && (
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Crate Details</h4>
            <div>
              <Label className="text-slate-300">Rewards (one per line)</Label>
              <Textarea
                value={newItem.rewards}
                onChange={(e) => setNewItem({ ...newItem, rewards: e.target.value })}
                placeholder="2,000-5,000 in-game currency&#10;Rare enchanted weapons&#10;Cosmetic items and pets"
                className="bg-slate-800/50 border-purple-500/20"
              />
            </div>
            <div>
              <Label className="text-slate-300">Color Theme</Label>
              <Input
                value={newItem.color}
                onChange={(e) => setNewItem({ ...newItem, color: e.target.value })}
                placeholder="blue, purple, green, etc."
                className="bg-slate-800/50 border-purple-500/20"
              />
            </div>
          </div>
        )}

        {activeCategory === "resources" && (
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Resource Details</h4>
            <div>
              <Label className="text-slate-300">Features (one per line)</Label>
              <Textarea
                value={newItem.features}
                onChange={(e) => setNewItem({ ...newItem, features: e.target.value })}
                placeholder="High-resolution textures&#10;Custom animations&#10;Shader compatibility"
                className="bg-slate-800/50 border-purple-500/20"
              />
            </div>
          </div>
        )}

        <Button onClick={handleAddItem} className="bg-purple-600 hover:bg-purple-700 w-full">
          <Save className="w-4 h-4 mr-2" />
          {editingItem ? "Update" : "Add"} {activeCategory.slice(0, -1)}
        </Button>
      </CardContent>
    </Card>
  )

  const renderItemsList = () => {
    let items: any[] = []
    switch (activeCategory) {
      case "plugins":
        items = plugins
        break
      case "resources":
        items = resources
        break
      case "ranks":
        items = ranks
        break
      case "crates":
        items = crates
        break
    }

    const filteredItems = items.filter((item) =>
      (item.title || item.name || "").toLowerCase().includes(searchTerm.toLowerCase()),
    )

    return (
      <div className="space-y-4">
        {filteredItems.map((item) => (
          <Card key={item.id} className="bg-slate-900/50 border-purple-500/20">
            <CardContent className="p-6">
              <div className="flex gap-4">
                {/* Item Icon */}
                <div className="w-16 h-16 bg-slate-800 rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0">
                  {item.iconUrl ? (
                    <img src={item.iconUrl || "/placeholder.svg"} alt="Icon" className="w-full h-full object-cover" />
                  ) : (
                    <div className="text-2xl">
                      {activeCategory === "plugins" && "🔧"}
                      {activeCategory === "resources" && "📦"}
                      {activeCategory === "ranks" && "👑"}
                      {activeCategory === "crates" && "🎁"}
                    </div>
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-semibold text-purple-400">{item.title || item.name}</h3>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-purple-500/20"
                        onClick={() => handleEditItem(item)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-red-500/20 text-red-400"
                        onClick={() => handleDeleteItem(item.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {item.description && <p className="text-slate-300 mb-3">{item.description}</p>}

                  {/* File Info */}
                  {item.fileName && (
                    <div className="flex items-center gap-2 mb-2 text-sm text-slate-400">
                      <FileText className="w-4 h-4" />
                      <span>{item.fileName}</span>
                      {item.fileSize && <span>({item.fileSize})</span>}
                      {item.version && <span>v{item.version}</span>}
                    </div>
                  )}

                  {/* Screenshots */}
                  {item.screenshots && item.screenshots.length > 0 && (
                    <div className="mb-3">
                      <p className="text-sm text-slate-400 mb-2">Screenshots ({item.screenshots.length})</p>
                      <div className="flex gap-2 overflow-x-auto">
                        {item.screenshots.slice(0, 4).map((screenshot: any, index: number) => (
                          <img
                            key={index}
                            src={screenshot.url || "/placeholder.svg"}
                            alt={`Screenshot ${index + 1}`}
                            className="w-16 h-12 object-cover rounded border border-purple-500/20 cursor-pointer hover:border-purple-500/50 transition-colors flex-shrink-0"
                            onClick={() => setSelectedScreenshot(screenshot.url)}
                          />
                        ))}
                        {item.screenshots.length > 4 && (
                          <div className="w-16 h-12 bg-slate-800 rounded border border-purple-500/20 flex items-center justify-center text-xs text-slate-400 flex-shrink-0">
                            +{item.screenshots.length - 4}
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Features/Rewards */}
                  {item.features && (
                    <div className="mb-2">
                      <p className="text-sm text-slate-400">Features:</p>
                      <ul className="text-sm text-slate-300">
                        {item.features.slice(0, 3).map((feature: string, index: number) => (
                          <li key={index}>• {feature}</li>
                        ))}
                        {item.features.length > 3 && (
                          <li className="text-slate-400">... and {item.features.length - 3} more</li>
                        )}
                      </ul>
                    </div>
                  )}

                  {item.rewards && (
                    <div className="mb-2">
                      <p className="text-sm text-slate-400">Rewards:</p>
                      <ul className="text-sm text-slate-300">
                        {item.rewards.slice(0, 3).map((reward: string, index: number) => (
                          <li key={index}>• {reward}</li>
                        ))}
                        {item.rewards.length > 3 && (
                          <li className="text-slate-400">... and {item.rewards.length - 3} more</li>
                        )}
                      </ul>
                    </div>
                  )}

                  <div className="flex items-center gap-4 mt-2">
                    <span className="font-bold text-green-400">{item.price}</span>
                    {item.downloads !== undefined && (
                      <span className="text-sm text-slate-400">{item.downloads} downloads</span>
                    )}
                    {item.rating !== undefined && <span className="text-sm text-yellow-400">★ {item.rating}</span>}
                    <Badge
                      variant={item.status === "active" ? "default" : "secondary"}
                      className={item.status === "active" ? "bg-green-600" : "bg-gray-600"}
                    >
                      {item.status}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  // If not admin, show nothing while redirecting
  if (!isAdmin) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-red-400 to-purple-400 bg-clip-text text-transparent">
              🔐 Website Admin Dashboard
            </h1>
            <p className="text-slate-300">Manage all website content, pricing, and features</p>
          </div>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="border-red-500/30 text-red-400 hover:bg-red-500/10"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-slate-900/50 border-purple-500/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Total Revenue</p>
                  <p className="text-2xl font-bold text-green-400">${websiteStats.totalRevenue.toLocaleString()}</p>
                </div>
                <DollarSign className="w-8 h-8 text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/50 border-purple-500/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Total Users</p>
                  <p className="text-2xl font-bold text-blue-400">{websiteStats.totalUsers.toLocaleString()}</p>
                </div>
                <Users className="w-8 h-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/50 border-purple-500/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Active Servers</p>
                  <p className="text-2xl font-bold text-purple-400">{websiteStats.activeServers.toLocaleString()}</p>
                </div>
                <Download className="w-8 h-8 text-purple-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/50 border-purple-500/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Conversion Rate</p>
                  <p className="text-2xl font-bold text-yellow-400">{websiteStats.conversionRate}%</p>
                </div>
                <TrendingUp className="w-8 h-8 text-yellow-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Management */}
        <Tabs value={activeCategory} onValueChange={setActiveCategory} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-slate-800/50">
            <TabsTrigger value="plugins">Plugins</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
            <TabsTrigger value="ranks">Server Ranks</TabsTrigger>
            <TabsTrigger value="crates">Mystery Crates</TabsTrigger>
            <TabsTrigger value="purchases">Purchase Details</TabsTrigger>
          </TabsList>

          {/* Content Management Tabs */}
          <TabsContent value={activeCategory} className="space-y-6">
            <Card className="bg-slate-900/50 border-purple-500/20">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-purple-400 capitalize">Manage {activeCategory}</CardTitle>
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                      <Input
                        placeholder={`Search ${activeCategory}...`}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 bg-slate-800/50 border-purple-500/20 text-white w-64"
                      />
                    </div>
                    {activeCategory !== "purchases" && (
                      <Button onClick={() => setShowAddForm(true)} className="bg-purple-600 hover:bg-purple-700">
                        <Plus className="w-4 h-4 mr-2" />
                        Add New
                      </Button>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {showAddForm && renderItemForm()}
                {renderItemsList()}
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="purchases" className="space-y-6">
            <Card className="bg-slate-900/50 border-purple-500/20">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-purple-400">Purchase Details & Customer Orders</CardTitle>
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                      <Input
                        placeholder="Search orders, customers, emails..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 bg-slate-800/50 border-purple-500/20 text-white w-64"
                      />
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>{renderPurchaseDetails()}</CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      {showPurchaseDetails && renderPurchaseModal()}
      {renderScreenshotModal()}
    </div>
  )
}
