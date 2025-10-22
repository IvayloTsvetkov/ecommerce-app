import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { Product } from "./product-list";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter } from "./ui/card";

export function ProductCard({
  id,
  title,
  price,
  discountPercentage,
  thumbnail,
  rating,
}: Product) {
  const discountedPrice = price * (1 - discountPercentage / 100);

  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      <Link href={`/products/${id}`}>
        <div className="relative aspect-square overflow-hidden bg-muted">
          <Image
            src={thumbnail || "/placeholder.svg"}
            alt={title}
            fill
            className="object-cover transition-transform hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </Link>
      <CardContent className="p-4">
        <Link href={`/products/${id}`}>
          <h3 className="font-semibold text-base line-clamp-2 mb-2 hover:text-accent transition-colors">
            {title}
          </h3>
        </Link>
        <div className="flex items-center gap-1 mb-2">
          <Star className="h-4 w-4 fill-accent text-accent" />
          <span className="text-sm font-medium">{rating.toFixed(1)}</span>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold">
            ${discountedPrice.toFixed(2)}
          </span>
          {discountPercentage > 0 && (
            <>
              <span className="text-base text-muted-foreground line-through">
                ${price.toFixed(2)}
              </span>
              <Badge variant="destructive">
                {discountPercentage.toFixed(0)}% OFF
              </Badge>
            </>
          )}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Link href={`/products/${id}`} className="w-full">
          <Button className="w-full">View Details</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
