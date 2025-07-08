// Cart functionality
class CartManager {
  constructor() {
    this.cart = []
    this.init()
  }

  init() {
    this.loadCart()
    this.setupEventListeners()
    this.updateCartDisplay()
  }

  setupEventListeners() {
    // Cart button
    const cartBtn = document.getElementById("cartBtn")
    if (cartBtn) {
      cartBtn.addEventListener("click", this.showCartModal.bind(this))
    }

    // Cart modal close
    const cartModalClose = document.getElementById("cartModalClose")
    if (cartModalClose) {
      cartModalClose.addEventListener("click", this.hideCartModal.bind(this))
    }
  }

  async loadCart() {
    try {
      const response = await fetch("/api/cart")
      this.cart = await response.json()
      this.updateCartDisplay()
    } catch (error) {
      console.error("Error loading cart:", error)
    }
  }

  async addToCart(item) {
    try {
      const response = await fetch("/api/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
      })

      const result = await response.json()
      if (result.success) {
        this.cart = result.cart
        this.updateCartDisplay()
        this.showAlert(`${item.title} added to cart!`, "success")
      }
    } catch (error) {
      console.error("Error adding to cart:", error)
      this.showAlert("Error adding item to cart", "error")
    }
  }

  async removeFromCart(itemId) {
    try {
      const response = await fetch("/api/cart/remove", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: itemId }),
      })

      const result = await response.json()
      if (result.success) {
        this.cart = result.cart
        this.updateCartDisplay()
        this.renderCartItems()
      }
    } catch (error) {
      console.error("Error removing from cart:", error)
    }
  }

  async updateQuantity(itemId, quantity) {
    const item = this.cart.find((item) => item.id === itemId)
    if (item) {
      item.quantity = quantity
      this.updateCartDisplay()
      this.renderCartItems()
    }
  }

  async clearCart() {
    try {
      const response = await fetch("/api/cart/clear", {
        method: "POST",
      })

      const result = await response.json()
      if (result.success) {
        this.cart = []
        this.updateCartDisplay()
        this.renderCartItems()
      }
    } catch (error) {
      console.error("Error clearing cart:", error)
    }
  }

  updateCartDisplay() {
    const cartCount = document.getElementById("cartCount")
    if (cartCount) {
      const totalItems = this.cart.reduce((sum, item) => sum + item.quantity, 0)
      cartCount.textContent = totalItems
      cartCount.style.display = totalItems > 0 ? "flex" : "none"
    }
  }

  showCartModal() {
    const cartModal = document.getElementById("cartModal")
    if (cartModal) {
      cartModal.classList.add("show")
      this.renderCartItems()
    }
  }

  hideCartModal() {
    const cartModal = document.getElementById("cartModal")
    if (cartModal) {
      cartModal.classList.remove("show")
    }
  }

  renderCartItems() {
    const cartItems = document.getElementById("cartItems")
    const cartFooter = document.getElementById("cartFooter")

    if (!cartItems || !cartFooter) return

    if (this.cart.length === 0) {
      cartItems.innerHTML = `
                <div class="empty-cart">
                    <div class="empty-cart-icon">🛒</div>
                    <h3>Your cart is empty</h3>
                    <p>Add some items to get started!</p>
                </div>
            `
      cartFooter.innerHTML = ""
      return
    }

    // Render cart items
    cartItems.innerHTML = this.cart
      .map(
        (item) => `
            <div class="cart-item">
                <div class="cart-item-icon">
                    ${this.getItemIcon(item.type)}
                </div>
                <div class="cart-item-details">
                    <div class="cart-item-title">${item.title}</div>
                    <div class="cart-item-price">${item.price}</div>
                </div>
                <div class="cart-item-actions">
                    <button class="quantity-btn" onclick="cartManager.updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                    <span class="quantity">${item.quantity}</span>
                    <button class="quantity-btn" onclick="cartManager.updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                    <button class="remove-btn" onclick="cartManager.removeFromCart(${item.id})">×</button>
                </div>
            </div>
        `,
      )
      .join("")

    // Calculate total
    const subtotal = this.cart.reduce((sum, item) => {
      const price = Number.parseFloat(item.price.replace(/[^0-9.]/g, ""))
      return sum + (isNaN(price) ? 0 : price * item.quantity)
    }, 0)

    // Render cart footer
    cartFooter.innerHTML = `
            <div class="cart-total">
                <span>Subtotal:</span>
                <span>$${subtotal.toFixed(2)}</span>
            </div>
            <div class="cart-actions">
                <button class="btn btn-gradient" onclick="window.location.href='/checkout'">
                    Checkout
                </button>
                <button class="btn btn-outline" onclick="cartManager.hideCartModal()">
                    Continue Shopping
                </button>
            </div>
        `
  }

  getItemIcon(type) {
    const icons = {
      plugin: "🔧",
      resource: "📦",
      rank: "👑",
      crate: "🎁",
    }
    return icons[type] || "📦"
  }

  showAlert(message, type = "info") {
    // Create alert element
    const alert = document.createElement("div")
    alert.className = `alert alert-${type}`
    alert.textContent = message
    alert.style.position = "fixed"
    alert.style.top = "5rem"
    alert.style.right = "1rem"
    alert.style.zIndex = "9999"
    alert.style.minWidth = "300px"

    document.body.appendChild(alert)

    // Remove alert after 3 seconds
    setTimeout(() => {
      if (alert.parentNode) {
        alert.parentNode.removeChild(alert)
      }
    }, 3000)
  }
}

// Initialize cart manager
let cartManager
document.addEventListener("DOMContentLoaded", () => {
  cartManager = new CartManager()
})

// Global function for add to cart buttons
function addToCart(item) {
  if (cartManager) {
    cartManager.addToCart(item)
  }
}
