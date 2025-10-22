import { ProductCard } from "./product-card";

interface Product {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  rating: number;
}

interface ProductListProps {
  page: number;
  productsPerPage: number;
}

async function getProducts({
  page,
  productsPerPage,
}: ProductListProps): Promise<Product[]> {
  const SKIP = (page - 1) * productsPerPage;

  const res = await fetch(
    `https://dummyjson.com/products?limit=${productsPerPage}&skip=${SKIP}`,
    {
      cache: "no-store",
    },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const data = await res.json();
  return data.products;
}

export const ProductList = async ({
  page,
  productsPerPage,
}: ProductListProps) => {
  const products = await getProducts({ page, productsPerPage });

  return (
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
  );
};
