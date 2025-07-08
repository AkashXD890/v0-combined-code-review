"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { useCart } from "../components/cart-provider"
import { CreditCard, Building, ArrowLeft, Loader2 } from "lucide-react"

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart()
  const router = useRouter()
  const [isProcessing, setIsProcessing] = useState(false)

  // Form state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "United States",
    paymentMethod: "credit-card",
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
    savePaymentInfo: false,
    notes: "",
  })

  // Calculate tax and total
  const tax = subtotal * 0.1 // 10% tax
  const shipping = 0 // Free shipping
  const total = subtotal + tax + shipping

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, savePaymentInfo: checked }))
  }

  const handleRadioChange = (value: string) => {
    setFormData((prev) => ({ ...prev, paymentMethod: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Clear cart and redirect to success page
    clearCart()
    router.push("/checkout/success")
  }

  // Redirect to cart if empty
  if (items.length === 0 && !isProcessing) {
    router.push("/cart")
    return null
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-20">
      <Button variant="ghost" className="mb-8 text-slate-400 hover:text-white" onClick={() => router.push("/cart")}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Cart
      </Button>

      <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
        Checkout
      </h1>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Customer Information */}
            <Card className="bg-slate-900/50 border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-purple-400">Customer Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-slate-300">
                      First Name
                    </Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="bg-slate-800/50 border-purple-500/20"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-slate-300">
                      Last Name
                    </Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="bg-slate-800/50 border-purple-500/20"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-slate-300">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="bg-slate-800/50 border-purple-500/20"
                    required
                  />
                </div>
              </CardContent>
            </Card>

            {/* Billing Address */}
            <Card className="bg-slate-900/50 border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-purple-400">Billing Address</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="address" className="text-slate-300">
                    Street Address
                  </Label>
                  <Input
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="bg-slate-800/50 border-purple-500/20"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city" className="text-slate-300">
                      City
                    </Label>
                    <Input
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="bg-slate-800/50 border-purple-500/20"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state" className="text-slate-300">
                      State / Province
                    </Label>
                    <Input
                      id="state"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      className="bg-slate-800/50 border-purple-500/20"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="zipCode" className="text-slate-300">
                      ZIP / Postal Code
                    </Label>
                    <Input
                      id="zipCode"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      className="bg-slate-800/50 border-purple-500/20"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="country" className="text-slate-300">
                      Country
                    </Label>
                    <Input
                      id="country"
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      className="bg-slate-800/50 border-purple-500/20"
                      required
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card className="bg-slate-900/50 border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-purple-400">Payment Method</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <RadioGroup value={formData.paymentMethod} onValueChange={handleRadioChange} className="space-y-4">
                  <div className="flex items-center space-x-3 border border-purple-500/20 rounded-md p-4 cursor-pointer hover:bg-purple-500/5">
                    <RadioGroupItem value="credit-card" id="credit-card" className="border-purple-500" />
                    <Label htmlFor="credit-card" className="flex items-center cursor-pointer">
                      <CreditCard className="mr-2 h-5 w-5 text-purple-400" />
                      <span>Credit / Debit Card</span>
                    </Label>
                  </div>

                  <div className="flex items-center space-x-3 border border-purple-500/20 rounded-md p-4 cursor-pointer hover:bg-purple-500/5">
                    <RadioGroupItem value="invoice" id="invoice" className="border-purple-500" />
                    <Label htmlFor="invoice" className="flex items-center cursor-pointer">
                      <Building className="mr-2 h-5 w-5 text-purple-400" />
                      <span>Pay by Invoice (Business only)</span>
                    </Label>
                  </div>
                </RadioGroup>

                {formData.paymentMethod === "credit-card" && (
                  <div className="space-y-4 pt-4 border-t border-purple-500/10">
                    <div className="space-y-2">
                      <Label htmlFor="cardNumber" className="text-slate-300">
                        Card Number
                      </Label>
                      <Input
                        id="cardNumber"
                        name="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        className="bg-slate-800/50 border-purple-500/20"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="cardName" className="text-slate-300">
                        Name on Card
                      </Label>
                      <Input
                        id="cardName"
                        name="cardName"
                        placeholder="John Doe"
                        value={formData.cardName}
                        onChange={handleInputChange}
                        className="bg-slate-800/50 border-purple-500/20"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="expiryDate" className="text-slate-300">
                          Expiry Date
                        </Label>
                        <Input
                          id="expiryDate"
                          name="expiryDate"
                          placeholder="MM/YY"
                          value={formData.expiryDate}
                          onChange={handleInputChange}
                          className="bg-slate-800/50 border-purple-500/20"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cvv" className="text-slate-300">
                          CVV
                        </Label>
                        <Input
                          id="cvv"
                          name="cvv"
                          placeholder="123"
                          value={formData.cvv}
                          onChange={handleInputChange}
                          className="bg-slate-800/50 border-purple-500/20"
                          required
                        />
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 pt-2">
                      <Checkbox
                        id="savePaymentInfo"
                        checked={formData.savePaymentInfo}
                        onCheckedChange={handleCheckboxChange}
                        className="border-purple-500/50 data-[state=checked]:bg-purple-600"
                      />
                      <Label htmlFor="savePaymentInfo" className="text-sm text-slate-300">
                        Save payment information for future purchases
                      </Label>
                    </div>
                  </div>
                )}

                {formData.paymentMethod === "invoice" && (
                  <div className="space-y-4 pt-4 border-t border-purple-500/10">
                    <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-md">
                      <p className="text-blue-400">
                        Invoice payment is available for business customers only. We'll send an invoice to your email
                        address after order confirmation.
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Additional Notes */}
            <Card className="bg-slate-900/50 border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-purple-400">Additional Notes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Label htmlFor="notes" className="text-slate-300">
                    Order Notes (Optional)
                  </Label>
                  <Textarea
                    id="notes"
                    name="notes"
                    placeholder="Any special instructions or requirements for your order"
                    value={formData.notes}
                    onChange={handleInputChange}
                    className="bg-slate-800/50 border-purple-500/20 min-h-[100px]"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div>
            <Card className="bg-slate-900/50 border-purple-500/20 sticky top-20">
              <CardHeader className="border-b border-purple-500/10">
                <CardTitle className="text-purple-400">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {/* Items summary */}
                  <div className="space-y-2">
                    {items.map((item) => (
                      <div key={item.id} className="flex justify-between text-sm">
                        <span className="text-slate-300">
                          {item.title || item.name} <span className="text-slate-500">x{item.quantity}</span>
                        </span>
                        <span className="text-white">
                          ${(Number.parseFloat(item.price.replace(/[^0-9.]/g, "")) * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-purple-500/10 pt-4 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-slate-300">Subtotal</span>
                      <span className="text-white">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-300">Tax (10%)</span>
                      <span className="text-white">${tax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-300">Shipping</span>
                      <span className="text-green-400">Free</span>
                    </div>
                  </div>

                  <div className="border-t border-purple-500/10 pt-4">
                    <div className="flex justify-between font-semibold">
                      <span className="text-white">Total</span>
                      <span className="text-purple-400 text-xl">${total.toFixed(2)}</span>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full mt-6 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>Complete Purchase</>
                    )}
                  </Button>

                  <p className="text-xs text-center text-slate-400 mt-4">
                    By completing your purchase, you agree to our{" "}
                    <a href="/terms" className="text-purple-400 hover:underline">
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a href="/privacy" className="text-purple-400 hover:underline">
                      Privacy Policy
                    </a>
                    .
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  )
}
