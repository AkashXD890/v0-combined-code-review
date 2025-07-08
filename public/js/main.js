// Main JavaScript functionality
class NebulaApp {
  constructor() {
    this.init()
  }

  init() {
    this.createStars()
    this.setupEventListeners()
    this.setupGetStartedMenu()
    this.setupMobileMenu()
    this.setupAdminAccess()
  }

  createStars() {
    const starsBg = document.getElementById("starsBg")
    if (!starsBg) return

    for (let i = 0; i < 100; i++) {
      const star = document.createElement("div")
      star.className = "star"
      star.style.left = Math.random() * 100 + "%"
      star.style.top = Math.random() * 100 + "%"
      star.style.width = Math.random() * 3 + 1 + "px"
      star.style.height = star.style.width
      star.style.animationDelay = Math.random() * 3 + "s"
      starsBg.appendChild(star)
    }
  }

  setupEventListeners() {
    // Auth button
    const authBtn = document.getElementById("authBtn")
    if (authBtn) {
      authBtn.addEventListener("click", this.handleAuth.bind(this))
    }

    // Close modals on escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        this.closeAllModals()
      }

      // Admin access shortcut (Ctrl+Shift+A)
      if (e.ctrlKey && e.shiftKey && e.key === "A") {
        e.preventDefault()
        this.showAdminModal()
      }
    })

    // Close modals on outside click
    document.addEventListener("click", (e) => {
      if (e.target.classList.contains("modal")) {
        this.closeAllModals()
      }
    })
  }

  setupGetStartedMenu() {
    const getStartedBtn = document.getElementById("getStartedBtn")
    const getStartedDropdown = document.getElementById("getStartedDropdown")

    if (getStartedBtn && getStartedDropdown) {
      getStartedBtn.addEventListener("click", (e) => {
        e.stopPropagation()
        getStartedBtn.classList.toggle("active")
        getStartedDropdown.classList.toggle("show")
      })

      // Close dropdown when clicking outside
      document.addEventListener("click", () => {
        getStartedBtn.classList.remove("active")
        getStartedDropdown.classList.remove("show")
      })
    }
  }

  setupMobileMenu() {
    const mobileMenuBtn = document.getElementById("mobileMenuBtn")
    const navMenu = document.getElementById("navMenu")

    if (mobileMenuBtn && navMenu) {
      mobileMenuBtn.addEventListener("click", () => {
        navMenu.classList.toggle("show")
      })
    }
  }

  setupAdminAccess() {
    const adminModal = document.getElementById("adminModal")
    const adminCode = document.getElementById("adminCode")
    const adminLoginBtn = document.getElementById("adminLoginBtn")
    const adminCancelBtn = document.getElementById("adminCancelBtn")

    if (adminLoginBtn) {
      adminLoginBtn.addEventListener("click", this.handleAdminLogin.bind(this))
    }

    if (adminCancelBtn) {
      adminCancelBtn.addEventListener("click", this.closeAdminModal.bind(this))
    }

    if (adminCode) {
      adminCode.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          this.handleAdminLogin()
        }
      })
    }
  }

  async handleAuth() {
    // Simple auth toggle for demo
    const authBtn = document.getElementById("authBtn")
    if (authBtn.textContent === "Login") {
      // Simulate login
      authBtn.textContent = "Logout"
      this.showAlert("Logged in successfully!", "success")
    } else {
      // Simulate logout
      authBtn.textContent = "Login"
      this.showAlert("Logged out successfully!", "info")
    }
  }

  showAdminModal() {
    const adminModal = document.getElementById("adminModal")
    if (adminModal) {
      adminModal.classList.add("show")
      const adminCode = document.getElementById("adminCode")
      if (adminCode) {
        adminCode.focus()
      }
    }
  }

  closeAdminModal() {
    const adminModal = document.getElementById("adminModal")
    if (adminModal) {
      adminModal.classList.remove("show")
      const adminCode = document.getElementById("adminCode")
      if (adminCode) {
        adminCode.value = ""
      }
    }
  }

  async handleAdminLogin() {
    const adminCode = document.getElementById("adminCode")
    if (!adminCode) return

    const code = adminCode.value

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code }),
      })

      const result = await response.json()

      if (result.success) {
        this.closeAdminModal()
        window.location.href = "/admin"
      } else {
        this.showAlert("Invalid admin code", "error")
        adminCode.value = ""
      }
    } catch (error) {
      this.showAlert("Error logging in", "error")
    }
  }

  closeAllModals() {
    const modals = document.querySelectorAll(".modal")
    modals.forEach((modal) => {
      modal.classList.remove("show")
    })
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

  // Utility methods
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

// Initialize the app when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new NebulaApp()
})
