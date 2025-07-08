// Plugins page functionality
class PluginsManager {
  constructor() {
    this.plugins = []
    this.filteredPlugins = []
    this.searchTerm = ""
    this.init()
  }

  init() {
    this.setupEventListeners()
    this.loadPlugins()
  }

  setupEventListeners() {
    const searchInput = document.getElementById("searchInput")
    const searchBtn = document.getElementById("searchBtn")

    if (searchInput) {
      searchInput.addEventListener("input", this.debounce(this.handleSearch.bind(this), 300))
      searchInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          this.handleSearch()
        }
      })
    }

    if (searchBtn) {
      searchBtn.addEventListener("click", this.handleSearch.bind(this))
    }
  }

  async loadPlugins() {
    try {
      this.showLoading()
      const response = await fetch("/api/plugins")
      this.plugins = await response.json()
      this.filteredPlugins = [...this.plugins]
      this.renderPlugins()
      this.updateResultsInfo()
    } catch (error) {
      console.error("Error loading plugins:", error)
      this.showError("Failed to load plugins")
    }
  }

  handleSearch() {
    const searchInput = document.getElementById("searchInput")
    this.searchTerm = searchInput ? searchInput.value.toLowerCase() : ""
    this.filterPlugins()
  }

  filterPlugins() {
    if (!this.searchTerm) {
      this.filteredPlugins = [...this.plugins]
    } else {
      this.filteredPlugins = this.plugins.filter(
        (plugin) =>
          plugin.title.toLowerCase().includes(this.searchTerm) ||
          plugin.description.toLowerCase().includes(this.searchTerm) ||
          plugin.author.toLowerCase().includes(this.searchTerm) ||
          (plugin.tags && plugin.tags.some((tag) => tag.toLowerCase().includes(this.searchTerm))),
      )
    }
    this.renderPlugins()
    this.updateResultsInfo()
  }

  renderPlugins() {
    const pluginsGrid = document.getElementById("pluginsGrid")
    if (!pluginsGrid) return

    if (this.filteredPlugins.length === 0) {
      this.showEmptyState()
      return
    }

    pluginsGrid.innerHTML = this.filteredPlugins.map((plugin) => this.createPluginCard(plugin)).join("")
  }

  createPluginCard(plugin) {
    const compatibility = plugin.compatibility || []
    const tags = plugin.tags || []
    const screenshots = plugin.screenshots || []

    return `
            <div class="plugin-card" onclick="window.location.href='/plugins/${plugin.id}'">
                <div class="plugin-header">
                    <img src="${plugin.icon || "/placeholder.svg"}" alt="${plugin.title}" class="plugin-icon">
                    <div class="plugin-info">
                        <h3 class="plugin-title">${plugin.title}</h3>
                        <p class="plugin-author">by <span class="author-name">${plugin.author}</span></p>
                        <div class="plugin-stats">
                            <div class="plugin-stat">
                                <span>📥</span>
                                <span>${this.formatNumber(plugin.downloads || 0)}</span>
                            </div>
                            <div class="plugin-stat">
                                <span>❤️</span>
                                <span>${this.formatNumber(plugin.followers || 0)}</span>
                            </div>
                            <div class="plugin-stat plugin-rating">
                                <span>⭐</span>
                                <span>${plugin.rating || 0}</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <p class="plugin-description">${plugin.description}</p>
                
                <div class="plugin-tags">
                    ${compatibility
                      .slice(0, 6)
                      .map(
                        (comp) => `
                        <span class="plugin-tag">${this.getCompatibilityIcon(comp)} ${comp}</span>
                    `,
                      )
                      .join("")}
                    ${compatibility.length > 6 ? `<span class="plugin-tag">+${compatibility.length - 6} more</span>` : ""}
                </div>
                
                <div class="plugin-footer">
                    <div class="plugin-meta">
                        <span class="plugin-price ${plugin.price === "Free" ? "free" : "paid"}">
                            ${plugin.price}
                        </span>
                        <span>Updated ${plugin.lastUpdated || "recently"}</span>
                        <span>v${plugin.version || "1.0.0"}</span>
                    </div>
                    <div class="plugin-actions">
                        ${
                          plugin.price !== "Free"
                            ? `
                            <button class="btn btn-gradient btn-sm" onclick="event.stopPropagation(); addToCart({
                                id: ${plugin.id},
                                title: '${plugin.title}',
                                price: '${plugin.price}',
                                type: 'plugin'
                            })">
                                🛒 Add to Cart
                            </button>
                        `
                            : `
                            <button class="btn btn-gradient btn-sm" onclick="event.stopPropagation();">
                                📥 Download Free
                            </button>
                        `
                        }
                    </div>
                </div>
            </div>
        `
  }

  getCompatibilityIcon(comp) {
    const icons = {
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

  showLoading() {
    const pluginsGrid = document.getElementById("pluginsGrid")
    if (pluginsGrid) {
      pluginsGrid.innerHTML = `
                <div class="loading-state">
                    <div class="loading-spinner"></div>
                    <p>Loading plugins...</p>
                </div>
            `
    }
  }

  showEmptyState() {
    const pluginsGrid = document.getElementById("pluginsGrid")
    if (pluginsGrid) {
      pluginsGrid.innerHTML = `
                <div class="empty-state">
                    <div class="empty-state-icon">🔍</div>
                    <h3>No plugins found</h3>
                    <p>Try adjusting your search terms</p>
                </div>
            `
    }
  }

  showError(message) {
    const pluginsGrid = document.getElementById("pluginsGrid")
    if (pluginsGrid) {
      pluginsGrid.innerHTML = `
                <div class="empty-state">
                    <div class="empty-state-icon">❌</div>
                    <h3>Error</h3>
                    <p>${message}</p>
                </div>
            `
    }
  }

  updateResultsInfo() {
    const searchResultsInfo = document.getElementById("searchResultsInfo")
    if (searchResultsInfo) {
      searchResultsInfo.textContent = `Showing ${this.filteredPlugins.length} of ${this.plugins.length} plugins`
    }
  }

  formatNumber(num) {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(2) + "M"
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K"
    }
    return num.toString()
  }

  debounce(func, wait) {
    let timeout
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout)
        func(...args)
      }
      clearTimeout(timeout)
      timeout = setTimeout(later, wait)
    }
  }
}

// Initialize plugins manager
document.addEventListener("DOMContentLoaded", () => {
  new PluginsManager()
})
