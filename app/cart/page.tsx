"use client"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Trash2, Plus, Minus, ArrowRight } from "lucide-react"
import { useCart } from "../components/cart-provider"

export default function CartPage() {
  const { items, removeItem, updateQuantity, subtotal, clearCart } = useCart()
  const router = useRouter()

  // Calculate tax and total
  const tax = subtotal * 0.1 // 10% tax
  const total = subtotal + tax

  const handleCheckout = () => {
    router.push("/checkout")
  }

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20">
        <Card className="bg-slate-900/50 border-purple-500/20">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-purple-400">Your Cart</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center py-12">
            <div className="text-6xl mb-4">🛒</div>
            <h3 className="text-2xl font-semibold text-slate-300 mb-4">Your cart is empty</h3>
            <p className="text-slate-400 mb-8">Looks like you haven't added any items to your cart yet.</p>
            <Button
              onClick={() => router.push("/")}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            >
              Continue Shopping
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-20">
      <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
        Your Cart
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card className="bg-slate-900/50 border-purple-500/20 mb-6">
            <CardHeader className="border-b border-purple-500/10">
              <div className="flex justify-between items-center">
                <CardTitle className="text-purple-400">Cart Items ({items.length})</CardTitle>
                <Button variant="ghost" size="sm" className="text-slate-400 hover:text-red-400" onClick={clearCart}>
                  <Trash2 className="w-4 h-4 mr-2" />
                  Clear Cart
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-purple-500/10">
                {items.map((item) => (
                  <div key={item.id} className="flex p-6">
                    <div className="w-16 h-16 bg-slate-800 rounded-md flex items-center justify-center text-3xl mr-4">
                      {item.type === "plugin" && "🔧"}
                      {item.type === "resource" && "📦"}
                      {item.type === "rank" && "👑"}
                      {item.type === "crate" && "🎁"}
                    </div>

                    <div className="flex-1">
                      <h3 className="text-lg font-medium text-white mb-1">{item.title || item.name}</h3>
                      <p className="text-sm text-slate-400 mb-2">
                        Type: {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                      </p>

                      <div className="flex justify-between items-center">
                        <div className="text-purple-400 font-semibold">{item.price}</div>

                        <div className="flex items-center gap-3">
                          <div className="flex items-center border border-purple-500/20 rounded-md">
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-8 w-8 rounded-none border-r border-purple-500/20"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>

                            <span className="text-white w-8 text-center">{item.quantity}</span>

                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-8 w-8 rounded-none border-l border-purple-500/20"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>

                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-8 w-8 text-red-400 hover:text-red-300 hover:bg-red-500/10"
                            onClick={() => removeItem(item.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-between">
            <Button variant="outline" className="border-purple-500/20" onClick={() => router.push("/")}>
              Continue Shopping
            </Button>
          </div>
        </div>

        <div>
          <Card className="bg-slate-900/50 border-purple-500/20 sticky top-20">
            <CardHeader className="border-b border-purple-500/10">
              <CardTitle className="text-purple-400">Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-slate-300">Subtotal</span>
                  <span className="text-white">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-300">Tax (10%)</span>
                  <span className="text-white">${tax.toFixed(2)}</span>
                </div>
                <div className="border-t border-purple-500/10 pt-4 mt-4">
                  <div className="flex justify-between font-semibold">
                    <span className="text-white">Total</span>
                    <span className="text-purple-400 text-xl">${total.toFixed(2)}</span>
                  </div>
                </div>

                <Button
                  onClick={handleCheckout}
                  className="w-full mt-6 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                >
                  Proceed to Checkout
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
