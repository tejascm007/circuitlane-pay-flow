import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMemo } from "react";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { categories, formatINR, products } from "@/data/products";

type Search = {
  category?: string | undefined;
  max?: number | undefined;
  min?: number | undefined;
};

export const Route = createFileRoute("/products/")({
  validateSearch: (search: Record<string, unknown>): Search => ({
    category: typeof search['category'] === "string" ? search['category'] : undefined,
    min: search['min'] != null ? Number(search['min']) : undefined,
    max: search['max'] != null ? Number(search['max']) : undefined,
  }),

  head: () => ({
    meta: [
      { title: "All Laptops — CircuitLane" },
      {
        name: "description",
        content:
          "Browse every laptop at CircuitLane. Filter by category and price range, from budget picks to RTX gaming machines.",
      },
      { property: "og:title", content: "All Laptops — CircuitLane" },
      {
        property: "og:description",
        content: "Filter laptops by category and price and add them to your cart in one tap.",
      },
    ],
  }),
  component: ProductList,
});

const MIN = 30000;
const MAX = 200000;

function ProductList() {
  const { category, min, max } = Route.useSearch();
  const navigate = useNavigate();
  const search = Route.useSearch();
  const setSearch = (next: Search, replace = false) =>
    navigate({ to: "/products", search: next, replace });

  const lo = min ?? MIN;
  const hi = max ?? MAX;

  const filtered = useMemo(
    () =>
      products.filter(
        (p) => (!category || p.category === category) && p.price >= lo && p.price <= hi,
      ),
    [category, lo, hi],
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-bold tracking-tight">All laptops</h1>
      <p className="mt-2 text-muted-foreground">
        {filtered.length} {filtered.length === 1 ? "laptop" : "laptops"} available
      </p>

      <div className="mt-8 grid gap-8 lg:grid-cols-[260px_1fr]">
        <aside className="h-fit rounded-xl border border-border bg-card p-5 shadow-card">
          <p className="text-sm font-semibold">Category</p>
          <div className="mt-3 flex flex-wrap gap-2 lg:flex-col lg:items-start">
            <Button
              variant={!category ? "default" : "outline"}
              size="sm"
              className="lg:w-full lg:justify-start"
              onClick={() => setSearch({ ...search, category: undefined })}
            >
              All
            </Button>
            {categories.map((c) => (
              <Button
                key={c.name}
                variant={category === c.name ? "default" : "outline"}
                size="sm"
                className="lg:w-full lg:justify-start"
                onClick={() => setSearch({ ...search, category: c.name })}
              >
                {c.name}
              </Button>
            ))}
          </div>

          <p className="mt-7 text-sm font-semibold">Price range</p>
          <p className="mt-1 text-sm text-muted-foreground">
            {formatINR(lo)} – {formatINR(hi)}
          </p>
          <Slider
            className="mt-4"
            min={MIN}
            max={MAX}
            step={5000}
            value={[lo, hi]}
            onValueChange={(v) =>
              setSearch({ ...search, min: v[0], max: v[1] }, true)
            }
          />

          <Button
            variant="ghost"
            size="sm"
            className="mt-5 w-full"
            onClick={() => setSearch({})}
          >
            Reset filters
          </Button>
        </aside>

        <div>
          {filtered.length === 0 ? (
            <div className="rounded-xl border border-dashed border-border p-12 text-center text-muted-foreground">
              No laptops match these filters.
            </div>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {filtered.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
