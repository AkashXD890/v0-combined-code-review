"use client"

import { Button } from "@/components/ui/button"
import { ShoppingCart, Check } from "lucide-react"
import { useCart } from "./cart-provider"
import { useState, useEffect } from "react"

type AddToCartButtonProps = {
  item: {
    id: number
    title?: string
    name?: string
    price: string
    type: "plugin" | "resource" | "rank" | "crate"
  }
  variant?: "default" | "outline" | "secondary"
  size?: "default" | "sm" | "lg"
}

export default function AddToCartButton({ item, variant = "default", size = "default" }: AddToCartButtonProps) {
  const { addItem, items } = useCart()
  const [isInCart, setIsInCart] = useState(false)
  const [showAdded, setShowAdded] = useState(false)

  // Check if item is already in cart
  useEffect(() => {
    const itemInCart = items.some((cartItem) => cartItem.id === item.id && cartItem.type === item.type)
    setIsInCart(itemInCart)
  }, [items, item])

  const handleAddToCart = () => {
    if (!isInCart) {
      addItem(item)
      setShowAdded(true)

      // Reset "Added" state after 2 seconds
      setTimeout(() => {
        setShowAdded(false)
      }, 2000)
    }
  }

  // Don't show "Add to Cart" for free items
  if (item.price === "Free") {
    return null
  }

  return (
    <Button
      onClick={handleAddToCart}
      variant={variant}
      size={size}
      className={`${isInCart ? "bg-green-600 hover:bg-green-700" : "bg-purple-600 hover:bg-purple-700"} text-white`}
      disabled={showAdded}
    >
      {showAdded ? (
        <>
          <Check className="w-4 h-4 mr-1" />
          Added
        </>
      ) : isInCart ? (
        <>
          <Check className="w-4 h-4 mr-1" />
          In Cart
        </>
      ) : (
        <>
          <ShoppingCart className="w-4 h-4 mr-1" />
          Add to Cart
        </>
      )}
    </Button>
  )
}
