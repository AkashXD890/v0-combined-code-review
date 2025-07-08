import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"

export default function PricingPage() {
  const pricingPlans = [
    {
      name: "Rookie Raptor",
      price: "$8",
      period: "/mo",
      features: [
        "2GB RAM",
        "20GB NVMe Storage",
        "Unlimited Bandwidth",
        "Basic DDoS Protection",
        "Pterodactyl Panel",
        "24/7 Support",
      ],
      popular: false,
    },
    {
      name: "Cosmic Pterodactyl",
      price: "$18",
      period: "/mo",
      features: [
        "6GB RAM",
        "60GB NVMe Storage",
        "Unlimited Bandwidth",
        "Advanced DDoS Protection",
        "Database Hosting",
        "Auto Backups",
        "Priority Support",
      ],
      popular: true,
    },
    {
      name: "Nebula Enterprise",
      price: "$45",
      period: "/mo",
      features: [
        "16GB RAM",
        "200GB NVMe Storage",
        "Unlimited Bandwidth",
        "Enterprise DDoS Protection",
        "Multiple Game Instances",
        "Custom Integrations",
        "Dedicated Support Agent",
      ],
      popular: false,
    },
  ]

  return (
    <div className="space-y-20">
      <section className="text-center py-20 px-4">
        <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
          Choose Your Hosting Plan
        </h1>
        <p className="text-xl text-slate-300 max-w-2xl mx-auto">Flexible pricing for every gaming community size</p>
      </section>

      <section className="px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <Card
                key={index}
                className={`relative bg-slate-900/50 border-2 transition-all duration-300 hover:scale-105 ${
                  plan.popular
                    ? "border-purple-500 scale-105 shadow-2xl shadow-purple-500/20"
                    : "border-purple-500/20 hover:border-purple-500/50"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-1">
                      MOST POPULAR
                    </Badge>
                  </div>
                )}
                <CardContent className="p-8 text-center">
                  <h3 className="text-2xl font-bold text-white mb-4">{plan.name}</h3>
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-purple-400">{plan.price}</span>
                    <span className="text-slate-400">{plan.period}</span>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-2">
                        <Check className="w-5 h-5 text-purple-400" />
                        <span className="text-slate-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    className={`w-full ${
                      plan.popular
                        ? "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                        : "bg-slate-700 hover:bg-slate-600"
                    }`}
                  >
                    {plan.popular ? "Get Started" : "Choose Plan"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
