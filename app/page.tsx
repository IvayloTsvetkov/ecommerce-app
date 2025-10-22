import { Suspense } from "react";
import { ProductList } from "@/components/product-list";
import { ProductPagination } from "@/components/product-pagination";

async function getTotalProducts(): Promise<number> {
  const res = await fetch("https://dummyjson.com/products?limit=1", {
    cache: "no-store",
  });
  const data = await res.json();
  return data.total;
}

export default async function HomePage(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const page = Number(searchParams?.page) || 1;
  const productsPerPage = 30;
  const total = await getTotalProducts();
  const totalPages = Math.ceil(total / productsPerPage);

  return (
    <div className="container flex flex-col gap-8 mx-auto px-4 py-8">
      <div>
        <h1 className="text-4xl font-bold mb-2 text-balance">
          Discover Amazing Products
        </h1>
        <p className="text-muted-foreground text-lg">
          Browse our curated collection of quality items
        </p>
      </div>

      <Suspense key={page} fallback={<div>Loading...</div>}>
        <ProductList page={page} productsPerPage={productsPerPage} />
      </Suspense>

      <ProductPagination totalPages={totalPages} />
    </div>
  );
}
