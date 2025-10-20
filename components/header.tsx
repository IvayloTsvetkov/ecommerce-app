"use client"

import Link from "next/link"
import { ShoppingCart, Store } from "lucide-react"
import { useCart } from "./cart-provider"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"

export function Header() {
  const { getTotalItems } = useCart()
  const totalItems = getTotalItems()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 font-semibold text-lg">
          <Store className="h-6 w-6" />
          <span>ShopHub</span>
        </Link>

        <nav className="flex items-center gap-6">
          <Link href="/" className="text-sm font-medium transition-colors hover:text-accent">
            Products
          </Link>
          <Link href="/cart">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
                >
                  {totalItems}
                </Badge>
              )}
              <span className="sr-only">Shopping cart with {totalItems} items</span>
            </Button>
          </Link>
        </nav>
      </div>
    </header>
  )
}
