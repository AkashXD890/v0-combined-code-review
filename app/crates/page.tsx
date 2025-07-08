"use client"

import { Card, CardContent } from "@/components/ui/card"
import { useState, useEffect } from "react"
import AddToCartButton from "../components/add-to-cart-button"

export default function CratesPage() {
  const [crates, setCrates] = useState([
    {
      id: 1,
      name: "Common Crate",
      price: "$2.99",
      color: "from-green-500/20 to-green-600/20",
      borderColor: "border-green-500/30",
      textColor: "text-green-400",
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
      color: "from-blue-500/20 to-blue-600/20",
      borderColor: "border-blue-500/30",
      textColor: "text-blue-400",
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
      color: "from-purple-500/20 to-purple-600/20",
      borderColor: "border-purple-500/30",
      textColor: "text-purple-400",
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
      color: "from-yellow-500/20 to-yellow-600/20",
      borderColor: "border-yellow-500/30",
      textColor: "text-yellow-400",
      rewards: [
        "10,000-50,000 in-game currency",
        "Godlike enchanted items",
        "Ultra-rare cosmetics",
        "Private island plots",
        "Personal NPC assistant",
      ],
    },
  ])

  // Load admin data on component mount
  useEffect(() => {
    const adminCrates = localStorage.getItem("adminCrates")
    if (adminCrates) {
      const parsedCrates = JSON.parse(adminCrates)
      const cratesWithColors = parsedCrates.map((crate: any) => ({
        ...crate,
        color: `from-${crate.color || "purple"}-500/20 to-${crate.color || "purple"}-600/20`,
        borderColor: `border-${crate.color || "purple"}-500/30`,
        textColor: `text-${crate.color || "purple"}-400`,
      }))
      setCrates((prevCrates) => {
        const defaultNames = prevCrates.map((c) => c.name)
        const newCrates = cratesWithColors.filter((c: any) => !defaultNames.includes(c.name))
        return [...prevCrates, ...newCrates]
      })
    }
  }, [])

  return (
    <div className="space-y-20">
      <section className="text-center py-20 px-4">
        <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
          🎁 Mystery Crates
        </h1>
        <p className="text-xl text-slate-300 max-w-2xl mx-auto">
          Discover amazing rewards with our exciting mystery crate system
        </p>
      </section>

      <section className="px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {crates.map((crate, index) => (
              <Card
                key={index}
                className={`bg-gradient-to-br ${crate.color} border-2 ${crate.borderColor} hover:scale-105 transition-all duration-300`}
              >
                <CardContent className="p-6">
                  <h3 className={`text-xl font-semibold mb-2 ${crate.textColor}`}>{crate.name}</h3>
                  <p className="text-lg font-bold mb-4">{crate.price} each</p>
                  <ul className="space-y-2 mb-6">
                    {crate.rewards.map((reward, rewardIndex) => (
                      <li key={rewardIndex} className="text-sm text-slate-300">
                        • {reward}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto">
                    <AddToCartButton
                      item={{
                        id: crate.id,
                        name: crate.name,
                        price: crate.price,
                        type: "crate",
                      }}
                      variant="outline"
                      size="sm"
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
