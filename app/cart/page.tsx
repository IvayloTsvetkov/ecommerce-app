"use client"

import { useCart } from "@/components/cart-provider"
import { CartItemCard } from "@/components/cart-item-card"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ShoppingBag, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function CartPage() {
  const { items, getTotalItems, getTotalPrice } = useCart()
  const totalItems = getTotalItems()
  const totalPrice = getTotalPrice()

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto text-center space-y-6">
          <div className="flex justify-center">
            <div className="rounded-full bg-muted p-6">
              <ShoppingBag className="h-12 w-12 text-muted-foreground" />
            </div>
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-bold">Your cart is empty</h1>
            <p className="text-muted-foreground">Add some products to get started</p>
          </div>
          <Link href="/">
            <Button size="lg">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        Continue Shopping
      </Link>

      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <CartItemCard key={item.id} item={item} />
          ))}
        </div>

        <div className="lg:col-span-1">
          <Card className="sticky top-20">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Items ({totalItems})</span>
                <span className="font-medium">${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Shipping</span>
                <span className="font-medium text-accent">Free</span>
              </div>
              <div className="border-t pt-4">
                <div className="flex justify-between">
                  <span className="font-semibold">Total</span>
                  <span className="text-2xl font-bold">${totalPrice.toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button size="lg" className="w-full">
                Proceed to Checkout
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
