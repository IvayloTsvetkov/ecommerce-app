## Getting Started

First, install the dependencies:
```bash
pnpm i
```

then, you can run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Process and thoughts
1. The project was scaffolded using v0 to speed the process.
2. I setup biome for formatting and linting.
3. I noticed the v0 output didn't include pagination, so I:
    * Added pagination using the shadcn Pagination component.
    * In the home page, I created a server function that retrives a single item and serves as a way to get the product count.
    * I moved the product list into a custom component with the goal of wrapping it in Suspense and prevent showing a blank page on page change.
4. I saw discrepancy between the product list page and the product details page because the product list page didn't take the discount percentage into consideration, so I added the discounted price to the product list page as well.
5. I realized the calculated price based on the price and the discount percentage resulted in a number with a lot of digits after the decimal point which led to visually inaccurate total cost, so I used only the first two digits after the decimal point.

## Limitations
1. The data is retrived on the server side which can cause more load on the server. An alternative approach would be to fetch the data on the client-side.
2. Currently there's no caching in place. If you navigate between the same two pages, you'll see the fallback loader each time. This can be resolved with a bit of extra logic.
3. In case of a larger product catalog or the option to displaying fewer items per page, it might be a good idea to limit the amount of pages shown to the user by utilizing the <PaginationEllipsis /> component.
4. The UI and UX can be improved by replacing the Loading text with a skeleton. If done correctly, it can prevent a layout shift.