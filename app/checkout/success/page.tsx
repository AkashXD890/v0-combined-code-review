"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Download, Home } from "lucide-react"

export default function CheckoutSuccessPage() {
  const router = useRouter()
  const orderNumber = `YN-${Math.floor(100000 + Math.random() * 900000)}`

  // Redirect if user refreshes the success page (since we don't have real order data)
  useEffect(() => {
    const hasCompletedOrder = sessionStorage.getItem("orderCompleted")

    if (!hasCompletedOrder) {
      sessionStorage.setItem("orderCompleted", "true")
    }

    return () => {
      // Clean up when navigating away
      sessionStorage.removeItem("orderCompleted")
    }
  }, [])

  return (
    <div className="max-w-3xl mx-auto px-4 py-20">
      <Card className="bg-slate-900/50 border-purple-500/20">
        <CardHeader className="text-center border-b border-purple-500/10 pb-6">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center">
              <CheckCircle className="h-10 w-10 text-green-500" />
            </div>
          </div>
          <CardTitle className="text-3xl font-bold text-white">Order Successful!</CardTitle>
          <p className="text-slate-300 mt-2">Thank you for your purchase. Your order has been confirmed.</p>
        </CardHeader>

        <CardContent className="pt-6 space-y-6">
          <div className="bg-slate-800/50 border border-purple-500/20 rounded-lg p-4">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
              <div>
                <p className="text-slate-400 text-sm">Order Number</p>
                <p className="text-xl font-semibold text-purple-400">{orderNumber}</p>
              </div>
              <div>
                <p className="text-slate-400 text-sm">Date</p>
                <p className="text-white">{new Date().toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-slate-400 text-sm">Status</p>
                <p className="text-green-400 font-medium">Completed</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">What happens next?</h3>

            <div className="space-y-3">
              <div className="flex gap-3">
                <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 flex-shrink-0">
                  1
                </div>
                <p className="text-slate-300">
                  You'll receive an email confirmation with your order details and access instructions.
                </p>
              </div>

              <div className="flex gap-3">
                <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 flex-shrink-0">
                  2
                </div>
                <p className="text-slate-300">
                  Digital products will be available immediately in your account dashboard.
                </p>
              </div>

              <div className="flex gap-3">
                <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 flex-shrink-0">
                  3
                </div>
                <p className="text-slate-300">
                  Server ranks and crates will be activated on your account within 5 minutes.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button
              onClick={() => router.push("/account/downloads")}
              variant="outline"
              className="border-purple-500/20 flex-1"
            >
              <Download className="mr-2 h-4 w-4" />
              View Downloads
            </Button>

            <Button
              onClick={() => router.push("/")}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 flex-1"
            >
              <Home className="mr-2 h-4 w-4" />
              Return to Home
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
