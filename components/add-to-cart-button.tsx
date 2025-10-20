"use client"

import { ShoppingCart } from "lucide-react"
import { Button } from "./ui/button"
import { useCart } from "./cart-provider"
import { useToast } from "@/hooks/use-toast"

interface AddToCartButtonProps {
  product: {
    id: number
    title: string
    price: number
    thumbnail: string
  }
}

export function AddToCartButton({ product }: AddToCartButtonProps) {
  const { addToCart } = useCart()
  const { toast } = useToast()

  const handleAddToCart = () => {
    addToCart(product)
    toast({
      title: "Added to cart",
      description: `${product.title} has been added to your cart.`,
    })
  }

  return (
    <Button size="lg" className="w-full" onClick={handleAddToCart}>
      <ShoppingCart className="mr-2 h-5 w-5" />
      Add to Cart
    </Button>
  )
}
