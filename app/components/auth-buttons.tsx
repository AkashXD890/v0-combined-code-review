"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { User, LogOut } from "lucide-react"

export default function AuthButtons() {
  const [isLoggedIn, setIsLoggedIn] = useState(false) // This would come from your auth context/state
  const [user, setUser] = useState({ name: "John Doe", email: "john@example.com" }) // Mock user data

  const handleLogout = () => {
    setIsLoggedIn(false)
    setUser({ name: "", email: "" })
    // Add logout logic here
  }

  if (isLoggedIn) {
    return (
      <div className="fixed top-4 right-4 z-50 flex items-center gap-4">
        <div className="hidden md:flex items-center gap-2 text-sm">
          <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
            <User className="w-4 h-4 text-white" />
          </div>
          <span className="text-slate-300">Welcome, {user.name.split(" ")[0]}</span>
        </div>
        <Button
          onClick={handleLogout}
          variant="ghost"
          size="sm"
          className="text-slate-300 hover:text-white hover:bg-purple-500/10"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </Button>
      </div>
    )
  }

  return (
    <div className="fixed top-4 right-4 z-50 flex items-center gap-2">
      <Link href="/login">
        <Button variant="ghost" size="sm" className="text-slate-300 hover:text-white hover:bg-purple-500/10">
          Login
        </Button>
      </Link>
      <Link href="/register">
        <Button
          size="sm"
          className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
        >
          Sign Up
        </Button>
      </Link>
    </div>
  )
}
