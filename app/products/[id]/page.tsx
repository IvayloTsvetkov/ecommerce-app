import { ArrowLeft, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AddToCartButton } from "@/components/add-to-cart-button";
import { Badge } from "@/components/ui/badge";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

async function getProduct(id: string): Promise<Product> {
  const res = await fetch(`https://dummyjson.com/products/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    notFound();
  }

  return res.json();
}

export default async function ProductDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const product = await getProduct(params.id);
  const discountedPrice =
    product.price * (1 - product.discountPercentage / 100);

  return (
    <div className="container mx-auto px-4 py-8">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Products
      </Link>

      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        {/* Product Image */}
        <div className="space-y-4">
          <div className="relative aspect-square overflow-hidden rounded-lg bg-muted">
            <Image
              src={product.images[0] || product.thumbnail}
              alt={product.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          {product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-4">
              {product.images.slice(1, 5).map((image, index) => (
                <div
                  key={image}
                  className="relative aspect-square overflow-hidden rounded-md bg-muted"
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${product.title} - Image ${index + 2}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 25vw, 12vw"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="secondary">{product.category}</Badge>
              {product.brand && (
                <Badge variant="outline">{product.brand}</Badge>
              )}
            </div>
            <h1 className="text-3xl font-bold mb-4 text-balance">
              {product.title}
            </h1>

            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center gap-1">
                <Star className="h-5 w-5 fill-accent text-accent" />
                <span className="font-semibold">
                  {product.rating.toFixed(1)}
                </span>
              </div>
              <span className="text-muted-foreground">•</span>
              <span className="text-sm text-muted-foreground">
                {product.stock} in stock
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-baseline gap-3">
              <span className="text-4xl font-bold">
                ${discountedPrice.toFixed(2)}
              </span>
              {product.discountPercentage > 0 && (
                <>
                  <span className="text-xl text-muted-foreground line-through">
                    ${product.price.toFixed(2)}
                  </span>
                  <Badge variant="destructive">
                    {product.discountPercentage.toFixed(0)}% OFF
                  </Badge>
                </>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h2 className="font-semibold mb-2">Description</h2>
              <p className="text-muted-foreground leading-relaxed">
                {product.description}
              </p>
            </div>
          </div>

          <AddToCartButton
            product={{
              id: product.id,
              title: product.title,
              price: Number(discountedPrice.toFixed(2)),
              thumbnail: product.thumbnail,
            }}
          />
        </div>
      </div>
    </div>
  );
}
