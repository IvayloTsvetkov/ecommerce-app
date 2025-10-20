"use client"

import Image from "next/image"
import { Minus, Plus, Trash2 } from "lucide-react"
import { Card, CardContent } from "./ui/card"
import { Button } from "./ui/button"
import { useCart, type CartItem } from "./cart-provider"

interface CartItemCardProps {
  item: CartItem
}

export function CartItemCard({ item }: CartItemCardProps) {
  const { updateQuantity, removeFromCart } = useCart()

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex gap-4">
          <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-md bg-muted">
            <Image
              src={item.thumbnail || "/placeholder.svg"}
              alt={item.title}
              fill
              className="object-cover"
              sizes="96px"
            />
          </div>

          <div className="flex flex-1 flex-col justify-between">
            <div className="flex justify-between">
              <div>
                <h3 className="font-semibold line-clamp-2">{item.title}</h3>
                <p className="text-lg font-bold mt-1">${item.price.toFixed(2)}</p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeFromCart(item.id)}
                className="text-muted-foreground hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">Remove item</span>
              </Button>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 bg-transparent"
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
              >
                <Minus className="h-3 w-3" />
                <span className="sr-only">Decrease quantity</span>
              </Button>
              <span className="w-12 text-center font-medium">{item.quantity}</span>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 bg-transparent"
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
              >
                <Plus className="h-3 w-3" />
                <span className="sr-only">Increase quantity</span>
              </Button>
              <span className="ml-auto font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
