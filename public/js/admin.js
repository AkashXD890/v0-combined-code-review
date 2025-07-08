// Admin functionality
class AdminManager {
  constructor() {
    this.init()
  }

  init() {
    this.checkAdminStatus()
  }

  async checkAdminStatus() {
    // Check if we're on admin page and user is authenticated
    if (window.location.pathname === "/admin") {
      // Admin page will handle authentication check
      return
    }
  }

  async logout() {
    try {
      const response = await fetch("/api/admin/logout", {
        method: "POST",
      })

      const result = await response.json()
      if (result.success) {
        window.location.href = "/"
      }
    } catch (error) {
      console.error("Error logging out:", error)
    }
  }
}

// Initialize admin manager
document.addEventListener("DOMContentLoaded", () => {
  new AdminManager()
})
