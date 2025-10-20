import { ProductCard } from "@/components/product-card"

interface Product {
  id: number
  title: string
  price: number
  thumbnail: string
  rating: number
}

async function getProducts(): Promise<Product[]> {
  const res = await fetch("https://dummyjson.com/products", {
    cache: "no-store",
  })

  if (!res.ok) {
    throw new Error("Failed to fetch products")
  }

  const data = await res.json()
  return data.products
}

export default async function HomePage() {
  const products = await getProducts()

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2 text-balance">Discover Amazing Products</h1>
        <p className="text-muted-foreground text-lg">Browse our curated collection of quality items</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            title={product.title}
            price={product.price}
            thumbnail={product.thumbnail}
            rating={product.rating}
          />
        ))}
      </div>
    </div>
  )
}
