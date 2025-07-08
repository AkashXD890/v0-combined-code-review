const express = require("express")
const path = require("path")
const fs = require("fs").promises
const multer = require("multer")
const cors = require("cors")
const session = require("express-session")

const app = express()
const PORT = process.env.PORT || 3000

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"))
app.use(
  session({
    secret: "nebula-secret-key",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  }),
)

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads/")
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname)
  },
})

const upload = multer({ storage: storage })

// Data storage (in production, use a proper database)
let data = {
  plugins: [],
  resources: [],
  ranks: [
    {
      id: 1,
      name: "Newcomer",
      price: "Free",
      color: "slate",
      features: [
        "Basic building permissions",
        "Public chat access",
        "Spawn area access",
        "Basic /home command (1 home)",
      ],
    },
    {
      id: 2,
      name: "Builder",
      price: "$4.99",
      color: "green",
      features: [
        "All Newcomer benefits",
        "Colored chat messages",
        "Multiple homes (5 homes)",
        "/kit builder daily rewards",
        "Priority server queue",
      ],
    },
    {
      id: 3,
      name: "VIP",
      price: "$9.99",
      color: "blue",
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
      id: 4,
      name: "Elite",
      price: "$19.99",
      color: "purple",
      features: [
        "All VIP benefits",
        "Unlimited homes",
        "Custom nickname colors",
        "Exclusive cosmetic pets",
        "WorldEdit permissions",
        "Monthly exclusive crates",
      ],
    },
  ],
  crates: [
    {
      id: 1,
      name: "Common Crate",
      price: "$2.99",
      color: "green",
      rewards: [
        "500-1,500 in-game currency",
        "Basic enchanted gear",
        "Food and potions",
        "Building materials",
        "Experience bottles",
      ],
    },
    {
      id: 2,
      name: "Rare Crate",
      price: "$7.99",
      color: "blue",
      rewards: [
        "2,000-5,000 in-game currency",
        "Rare enchanted weapons",
        "Cosmetic items and pets",
        "Treasure maps",
        "Rare crafting materials",
      ],
    },
    {
      id: 3,
      name: "Legendary Crate",
      price: "$15.99",
      color: "purple",
      rewards: [
        "5,000-15,000 in-game currency",
        "Legendary equipment sets",
        "Exclusive mounts and pets",
        "Rare building schematics",
        "Rank upgrade vouchers",
      ],
    },
    {
      id: 4,
      name: "Mythic Crate",
      price: "$29.99",
      color: "yellow",
      rewards: [
        "10,000-50,000 in-game currency",
        "Godlike enchanted items",
        "Ultra-rare cosmetics",
        "Private island plots",
        "Personal NPC assistant",
      ],
    },
  ],
  purchases: [],
  cart: [],
  users: [],
}

// Load data from file if exists
async function loadData() {
  try {
    const dataFile = await fs.readFile("data.json", "utf8")
    data = JSON.parse(dataFile)
  } catch (error) {
    console.log("No existing data file found, using default data")
  }
}

// Save data to file
async function saveData() {
  try {
    await fs.writeFile("data.json", JSON.stringify(data, null, 2))
  } catch (error) {
    console.error("Error saving data:", error)
  }
}

// Initialize data
loadData()

// Routes

// Serve main pages
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"))
})

app.get("/plugins", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "plugins.html"))
})

app.get("/plugins/:id", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "plugin-detail.html"))
})

app.get("/resources", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "resources.html"))
})

app.get("/minecraft", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "minecraft.html"))
})

app.get("/ranks", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "ranks.html"))
})

app.get("/crates", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "crates.html"))
})

app.get("/cart", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "cart.html"))
})

app.get("/checkout", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "checkout.html"))
})

app.get("/admin", (req, res) => {
  if (!req.session.isAdmin) {
    return res.redirect("/")
  }
  res.sendFile(path.join(__dirname, "public", "admin.html"))
})

// API Routes

// Authentication
app.post("/api/admin/login", (req, res) => {
  const { code } = req.body
  if (code === "admin123") {
    req.session.isAdmin = true
    res.json({ success: true })
  } else {
    res.status(401).json({ success: false, message: "Invalid admin code" })
  }
})

app.post("/api/admin/logout", (req, res) => {
  req.session.isAdmin = false
  res.json({ success: true })
})

// Data API endpoints
app.get("/api/plugins", (req, res) => {
  const { search } = req.query
  let plugins = data.plugins

  if (search) {
    plugins = plugins.filter(
      (plugin) =>
        plugin.title.toLowerCase().includes(search.toLowerCase()) ||
        plugin.description.toLowerCase().includes(search.toLowerCase()) ||
        plugin.author.toLowerCase().includes(search.toLowerCase()),
    )
  }

  res.json(plugins)
})

app.get("/api/plugins/:id", (req, res) => {
  const plugin = data.plugins.find((p) => p.id === Number.parseInt(req.params.id))
  if (!plugin) {
    return res.status(404).json({ error: "Plugin not found" })
  }
  res.json(plugin)
})

app.get("/api/resources", (req, res) => {
  const { search } = req.query
  let resources = data.resources

  if (search) {
    resources = resources.filter(
      (resource) =>
        resource.title.toLowerCase().includes(search.toLowerCase()) ||
        resource.description.toLowerCase().includes(search.toLowerCase()),
    )
  }

  res.json(resources)
})

app.get("/api/ranks", (req, res) => {
  res.json(data.ranks)
})

app.get("/api/crates", (req, res) => {
  res.json(data.crates)
})

// Admin API endpoints
app.post(
  "/api/admin/plugins",
  upload.fields([
    { name: "icon", maxCount: 1 },
    { name: "file", maxCount: 1 },
    { name: "screenshots", maxCount: 10 },
  ]),
  (req, res) => {
    if (!req.session.isAdmin) {
      return res.status(403).json({ error: "Unauthorized" })
    }

    const plugin = {
      id: Date.now(),
      ...req.body,
      features: req.body.features ? req.body.features.split("\n").filter((f) => f.trim()) : [],
      requirements: req.body.requirements ? req.body.requirements.split("\n").filter((r) => r.trim()) : [],
      installation: req.body.installation ? req.body.installation.split("\n").filter((i) => i.trim()) : [],
      compatibility: req.body.compatibility ? req.body.compatibility.split(",") : [],
      downloads: 0,
      followers: 0,
      rating: 0,
      lastUpdated: new Date().toISOString(),
    }

    // Handle file uploads
    if (req.files.icon) {
      plugin.icon = `/uploads/${req.files.icon[0].filename}`
    }

    if (req.files.file) {
      plugin.fileUrl = `/uploads/${req.files.file[0].filename}`
      plugin.fileName = req.files.file[0].originalname
      plugin.fileSize = (req.files.file[0].size / 1024 / 1024).toFixed(2) + " MB"
    }

    if (req.files.screenshots) {
      plugin.screenshots = req.files.screenshots.map((file, index) => ({
        url: `/uploads/${file.filename}`,
        title: req.body[`screenshot_title_${index}`] || `Screenshot ${index + 1}`,
        description: req.body[`screenshot_desc_${index}`] || "Plugin interface",
      }))
    }

    data.plugins.push(plugin)
    saveData()
    res.json(plugin)
  },
)

app.put(
  "/api/admin/plugins/:id",
  upload.fields([
    { name: "icon", maxCount: 1 },
    { name: "file", maxCount: 1 },
    { name: "screenshots", maxCount: 10 },
  ]),
  (req, res) => {
    if (!req.session.isAdmin) {
      return res.status(403).json({ error: "Unauthorized" })
    }

    const pluginIndex = data.plugins.findIndex((p) => p.id === Number.parseInt(req.params.id))
    if (pluginIndex === -1) {
      return res.status(404).json({ error: "Plugin not found" })
    }

    const updatedPlugin = {
      ...data.plugins[pluginIndex],
      ...req.body,
      features: req.body.features ? req.body.features.split("\n").filter((f) => f.trim()) : [],
      requirements: req.body.requirements ? req.body.requirements.split("\n").filter((r) => r.trim()) : [],
      installation: req.body.installation ? req.body.installation.split("\n").filter((i) => i.trim()) : [],
      compatibility: req.body.compatibility ? req.body.compatibility.split(",") : [],
    }

    // Handle file uploads
    if (req.files.icon) {
      updatedPlugin.icon = `/uploads/${req.files.icon[0].filename}`
    }

    if (req.files.file) {
      updatedPlugin.fileUrl = `/uploads/${req.files.file[0].filename}`
      updatedPlugin.fileName = req.files.file[0].originalname
      updatedPlugin.fileSize = (req.files.file[0].size / 1024 / 1024).toFixed(2) + " MB"
    }

    if (req.files.screenshots) {
      updatedPlugin.screenshots = req.files.screenshots.map((file, index) => ({
        url: `/uploads/${file.filename}`,
        title: req.body[`screenshot_title_${index}`] || `Screenshot ${index + 1}`,
        description: req.body[`screenshot_desc_${index}`] || "Plugin interface",
      }))
    }

    data.plugins[pluginIndex] = updatedPlugin
    saveData()
    res.json(updatedPlugin)
  },
)

app.delete("/api/admin/plugins/:id", (req, res) => {
  if (!req.session.isAdmin) {
    return res.status(403).json({ error: "Unauthorized" })
  }

  const pluginIndex = data.plugins.findIndex((p) => p.id === Number.parseInt(req.params.id))
  if (pluginIndex === -1) {
    return res.status(404).json({ error: "Plugin not found" })
  }

  data.plugins.splice(pluginIndex, 1)
  saveData()
  res.json({ success: true })
})

// Similar endpoints for resources, ranks, and crates
app.post(
  "/api/admin/resources",
  upload.fields([
    { name: "icon", maxCount: 1 },
    { name: "file", maxCount: 1 },
    { name: "screenshots", maxCount: 10 },
  ]),
  (req, res) => {
    if (!req.session.isAdmin) {
      return res.status(403).json({ error: "Unauthorized" })
    }

    const resource = {
      id: Date.now(),
      ...req.body,
      features: req.body.features ? req.body.features.split("\n").filter((f) => f.trim()) : [],
    }

    if (req.files.icon) {
      resource.icon = `/uploads/${req.files.icon[0].filename}`
    }

    if (req.files.file) {
      resource.fileUrl = `/uploads/${req.files.file[0].filename}`
      resource.fileName = req.files.file[0].originalname
      resource.fileSize = (req.files.file[0].size / 1024 / 1024).toFixed(2) + " MB"
    }

    data.resources.push(resource)
    saveData()
    res.json(resource)
  },
)

app.post("/api/admin/ranks", (req, res) => {
  if (!req.session.isAdmin) {
    return res.status(403).json({ error: "Unauthorized" })
  }

  const rank = {
    id: Date.now(),
    ...req.body,
    features: req.body.features ? req.body.features.split("\n").filter((f) => f.trim()) : [],
  }

  data.ranks.push(rank)
  saveData()
  res.json(rank)
})

app.post("/api/admin/crates", (req, res) => {
  if (!req.session.isAdmin) {
    return res.status(403).json({ error: "Unauthorized" })
  }

  const crate = {
    id: Date.now(),
    ...req.body,
    rewards: req.body.rewards ? req.body.rewards.split("\n").filter((r) => r.trim()) : [],
  }

  data.crates.push(crate)
  saveData()
  res.json(crate)
})

// Cart API
app.get("/api/cart", (req, res) => {
  res.json(req.session.cart || [])
})

app.post("/api/cart/add", (req, res) => {
  if (!req.session.cart) {
    req.session.cart = []
  }

  const { id, type, title, price } = req.body
  const existingItem = req.session.cart.find((item) => item.id === id && item.type === type)

  if (existingItem) {
    existingItem.quantity += 1
  } else {
    req.session.cart.push({
      id,
      type,
      title,
      price,
      quantity: 1,
    })
  }

  res.json({ success: true, cart: req.session.cart })
})

app.post("/api/cart/remove", (req, res) => {
  if (!req.session.cart) {
    req.session.cart = []
  }

  const { id } = req.body
  req.session.cart = req.session.cart.filter((item) => item.id !== id)
  res.json({ success: true, cart: req.session.cart })
})

app.post("/api/cart/clear", (req, res) => {
  req.session.cart = []
  res.json({ success: true })
})

// Checkout API
app.post("/api/checkout", (req, res) => {
  const order = {
    id: Date.now(),
    orderNumber: `YN-${Math.floor(100000 + Math.random() * 900000)}`,
    items: req.session.cart || [],
    customerInfo: req.body,
    total: req.body.total,
    status: "completed",
    date: new Date().toISOString(),
  }

  data.purchases.push(order)
  req.session.cart = []
  saveData()

  res.json({ success: true, order })
})

// Create uploads directory if it doesn't exist
async function createUploadsDir() {
  try {
    await fs.mkdir("public/uploads", { recursive: true })
  } catch (error) {
    console.log("Uploads directory already exists")
  }
}

createUploadsDir()

app.listen(PORT, () => {
  console.log(`🦕 Yaddu's Network server running on http://localhost:${PORT}`)
})
