"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"

export default function GetStartedMenu() {
  const [showMenu, setShowMenu] = useState(false)
  const router = useRouter()

  const handleNavigate = (path: string) => {
    setShowMenu(false)
    router.push(path)
  }

  return (
    <div className="relative">
      <Button
        size="lg"
        className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 text-lg group"
        onClick={() => setShowMenu(!showMenu)}
      >
        Get Started
        <ChevronDown className="ml-2 w-5 h-5 transition-transform group-hover:rotate-180" />
      </Button>

      {showMenu && (
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-4 w-80 bg-slate-900/95 backdrop-blur-lg border border-purple-500/30 rounded-xl shadow-2xl z-50">
          <div className="p-6 space-y-4">
            <h3 className="text-lg font-semibold text-purple-400 text-center mb-4">Choose Your Adventure</h3>

            <button
              onClick={() => handleNavigate("/minecraft")}
              className="w-full p-4 bg-slate-800/50 hover:bg-slate-700/50 rounded-lg border border-purple-500/20 hover:border-purple-500/40 transition-all duration-200 text-left group"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">🏗️</span>
                <div>
                  <div className="font-semibold text-white group-hover:text-purple-400">Minecraft Stuff</div>
                  <div className="text-sm text-slate-400">Servers, mods, worlds & more</div>
                </div>
              </div>
            </button>

            <button
              onClick={() => handleNavigate("/resources")}
              className="w-full p-4 bg-slate-800/50 hover:bg-slate-700/50 rounded-lg border border-purple-500/20 hover:border-purple-500/40 transition-all duration-200 text-left group"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">📦</span>
                <div>
                  <div className="font-semibold text-white group-hover:text-purple-400">Resources</div>
                  <div className="text-sm text-slate-400">Texture packs, builds & templates</div>
                </div>
              </div>
            </button>

            <button
              onClick={() => handleNavigate("/plugins")}
              className="w-full p-4 bg-slate-800/50 hover:bg-slate-700/50 rounded-lg border border-purple-500/20 hover:border-purple-500/40 transition-all duration-200 text-left group"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">🔧</span>
                <div>
                  <div className="font-semibold text-white group-hover:text-purple-400">Plugins</div>
                  <div className="text-sm text-slate-400">Essential & custom plugins</div>
                </div>
              </div>
            </button>

            <button
              onClick={() => handleNavigate("/ranks")}
              className="w-full p-4 bg-slate-800/50 hover:bg-slate-700/50 rounded-lg border border-purple-500/20 hover:border-purple-500/40 transition-all duration-200 text-left group"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">👑</span>
                <div>
                  <div className="font-semibold text-white group-hover:text-purple-400">Server Ranks</div>
                  <div className="text-sm text-slate-400">VIP ranks & permissions</div>
                </div>
              </div>
            </button>

            <button
              onClick={() => handleNavigate("/crates")}
              className="w-full p-4 bg-slate-800/50 hover:bg-slate-700/50 rounded-lg border border-purple-500/20 hover:border-purple-500/40 transition-all duration-200 text-left group"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">🎁</span>
                <div>
                  <div className="font-semibold text-white group-hover:text-purple-400">Mystery Crates</div>
                  <div className="text-sm text-slate-400">Loot boxes & rewards</div>
                </div>
              </div>
            </button>

            <div className="pt-4 border-t border-purple-500/20">
              <button
                onClick={() => handleNavigate("/pricing")}
                className="w-full p-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-lg text-white font-semibold transition-all duration-200"
              >
                View Hosting Plans
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
