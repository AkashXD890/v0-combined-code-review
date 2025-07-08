"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Check } from "lucide-react"
import { useState, useEffect } from "react"
import AddToCartButton from "../components/add-to-cart-button"

export default function RanksPage() {
  const [ranks, setRanks] = useState([
    {
      id: 1,
      name: "Newcomer",
      price: "Free",
      color: "text-slate-400",
      borderColor: "border-slate-400",
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
      color: "text-green-400",
      borderColor: "border-green-400",
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
      color: "text-blue-400",
      borderColor: "border-blue-400",
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
      color: "text-purple-400",
      borderColor: "border-purple-400",
      features: [
        "All VIP benefits",
        "Unlimited homes",
        "Custom nickname colors",
        "Exclusive cosmetic pets",
        "WorldEdit permissions",
        "Monthly exclusive crates",
      ],
    },
  ])

  // Load admin data on component mount
  useEffect(() => {
    const adminRanks = localStorage.getItem("adminRanks")
    if (adminRanks) {
      const parsedRanks = JSON.parse(adminRanks)
      const ranksWithColors = parsedRanks.map((rank: any) => ({
        ...rank,
        color: `text-${rank.color || "purple"}-400`,
        borderColor: `border-${rank.color || "purple"}-400`,
      }))
      setRanks((prevRanks) => {
        const defaultNames = prevRanks.map((r) => r.name)
        const newRanks = ranksWithColors.filter((r: any) => !defaultNames.includes(r.name))
        return [...prevRanks, ...newRanks]
      })
    }
  }, [])

  return (
    <div className="space-y-20">
      <section className="text-center py-20 px-4">
        <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
          👑 Server Rank System
        </h1>
        <p className="text-xl text-slate-300 max-w-2xl mx-auto">
          Unlock exclusive perks and features with our premium rank system
        </p>
      </section>

      <section className="px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {ranks.map((rank, index) => (
              <Card
                key={index}
                className={`bg-slate-900/50 border-2 ${rank.borderColor} hover:scale-105 transition-all duration-300`}
              >
                <CardContent className="p-6">
                  <h3 className={`text-xl font-semibold mb-2 ${rank.color}`}>{rank.name}</h3>
                  <p className="text-lg font-bold mb-4">{rank.price}</p>
                  <ul className="space-y-2 mb-6">
                    {rank.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-2 text-sm">
                        <Check className="w-4 h-4 text-green-400" />
                        <span className="text-slate-300">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto">
                    {rank.price === "Free" ? (
                      <div className="text-center text-green-400 font-semibold">Default Rank</div>
                    ) : (
                      <AddToCartButton
                        item={{
                          id: rank.id,
                          name: rank.name,
                          price: rank.price,
                          type: "rank",
                        }}
                        variant="outline"
                        size="sm"
                      />
                    )}
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
