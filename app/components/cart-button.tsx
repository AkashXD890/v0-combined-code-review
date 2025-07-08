"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Plus, Minus, Trash2 } from "lucide-react"
import { useCart } from "./cart-provider"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"

export default function CartButton() {
  const { items, removeItem, updateQuantity, itemCount, subtotal } = useCart()
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()

  const handleCheckout = () => {
    setIsOpen(false)
    router.push("/cart")
  }

  if (itemCount === 0) {
    return (
      <Button variant="ghost" size="sm" className="relative text-slate-300 hover:text-white hover:bg-purple-500/10">
        <ShoppingCart className="w-5 h-5" />
      </Button>
    )
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="sm" className="relative text-slate-300 hover:text-white hover:bg-purple-500/10">
          <ShoppingCart className="w-5 h-5" />
          <Badge className="absolute -top-2 -right-2 bg-purple-600 text-[10px] min-w-[18px] h-[18px] flex items-center justify-center rounded-full">
            {itemCount}
          </Badge>
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md bg-slate-900/95 border-purple-500/20 backdrop-blur-lg">
        <SheetHeader>
          <SheetTitle className="text-purple-400">Your Cart</SheetTitle>
        </SheetHeader>

        <div className="mt-6 flex flex-col gap-5 h-[calc(100vh-220px)] overflow-y-auto">
          {items.length === 0 ? (
            <div className="text-center py-10">
              <div className="text-4xl mb-3">🛒</div>
              <p className="text-slate-400">Your cart is empty</p>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-4 border-b border-purple-500/10 pb-4">
                <div className="w-12 h-12 bg-slate-800 rounded-md flex items-center justify-center text-2xl">
                  {item.type === "plugin" && "🔧"}
                  {item.type === "resource" && "📦"}
                  {item.type === "rank" && "👑"}
                  {item.type === "crate" && "🎁"}
                </div>

                <div className="flex-1">
                  <h4 className="text-white font-medium">{item.title || item.name}</h4>
                  <div className="flex justify-between items-center mt-2">
                    <div className="text-purple-400 font-semibold">{item.price}</div>

                    <div className="flex items-center gap-2">
                      <Button
                        size="icon"
                        variant="outline"
                        className="h-7 w-7 rounded-full border-purple-500/20"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>

                      <span className="text-white w-5 text-center">{item.quantity}</span>

                      <Button
                        size="icon"
                        variant="outline"
                        className="h-7 w-7 rounded-full border-purple-500/20"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>

                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-7 w-7 text-red-400 hover:text-red-300 hover:bg-red-500/10"
                        onClick={() => removeItem(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="mt-auto pt-4 border-t border-purple-500/20">
            <div className="flex justify-between mb-4">
              <span className="text-slate-300">Subtotal</span>
              <span className="text-white font-semibold">${subtotal.toFixed(2)}</span>
            </div>

            <SheetFooter className="flex-col gap-3 sm:flex-col">
              <SheetClose asChild>
                <Button
                  onClick={handleCheckout}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                >
                  Checkout
                </Button>
              </SheetClose>

              <SheetClose asChild>
                <Button variant="outline" className="w-full border-purple-500/20">
                  Continue Shopping
                </Button>
              </SheetClose>
            </SheetFooter>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}
