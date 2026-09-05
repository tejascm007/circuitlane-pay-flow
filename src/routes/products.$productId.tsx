import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Minus, Plus, ShieldCheck, Star, Truck } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { formatINR, getProduct } from "@/data/products";
import { useCart } from "@/lib/cart";

export const Route = createFileRoute("/products/$productId")({
  loader: ({ params }) => {
    const product = getProduct(params.productId);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Laptop not found — CircuitLane" }, { name: "robots", content: "noindex" }],
      };
    }
    const { product } = loaderData;
    const title = `${product.name} — CircuitLane`;
    const description = `${product.shortSpec}. Buy the ${product.name} at ${formatINR(product.price)} with secure checkout and free delivery.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
      ],
    };
  },
  component: ProductDetail,
});

function ProductDetail() {
  const { product } = Route.useLoaderData();
  const { add } = useCart();
  const navigate = useNavigate();
  const [qty, setQty] = useState(1);
  const [active, setActive] = useState(0);

  const specRows: [string, string][] = [
    ["Processor", product.specs.cpu],
    ["Memory", product.specs.ram],
    ["Storage", product.specs.storage],
    ["Display", product.specs.display],
    ["Graphics", product.specs.graphics],
    ["Battery", product.specs.battery],
    ["Weight", product.specs.weight],
    ["Operating system", product.specs.os],
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <nav className="text-sm text-muted-foreground">
        <Link to="/products" className="hover:text-primary">
          All laptops
        </Link>
        <span className="px-2">/</span>
        <span className="text-foreground">{product.name}</span>
      </nav>

      <div className="mt-6 grid gap-10 lg:grid-cols-2">
        <div>
          <div className="overflow-hidden rounded-xl border border-border bg-secondary/40">
            <img
              src={product.gallery[active]}
              alt={product.name}
              width={1024}
              height={768}
              className="aspect-4/3 w-full object-cover"
            />
          </div>
          <div className="mt-3 flex gap-3">
            {product.gallery.map((img, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                aria-label={`View image ${i + 1}`}
                className={`overflow-hidden rounded-lg border-2 transition-colors ${
                  i === active ? "border-primary" : "border-border hover:border-primary/50"
                }`}
              >
                <img
                  src={img}
                  alt={`${product.name} view ${i + 1}`}
                  loading="lazy"
                  width={1024}
                  height={768}
                  className="h-20 w-24 object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            {product.brand} · {product.category}
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight">{product.name}</h1>
          <p className="mt-2 inline-flex items-center gap-1 text-sm text-muted-foreground">
            <Star className="size-4 fill-current text-primary" /> {product.rating} · {product.shortSpec}
          </p>

          <div className="mt-5 flex items-baseline gap-3">
            <span className="text-3xl font-extrabold text-price">{formatINR(product.price)}</span>
            <span className="text-muted-foreground line-through">{formatINR(product.mrp)}</span>
            <span className="rounded-md bg-accent px-2 py-1 text-xs font-semibold text-accent-foreground">
              {Math.round(((product.mrp - product.price) / product.mrp) * 100)}% off
            </span>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">Inclusive of all taxes</p>

          <div className="mt-6 flex items-center gap-4">
            <div className="flex items-center rounded-lg border border-border">
              <Button variant="ghost" size="icon" onClick={() => setQty((q) => Math.max(1, q - 1))}>
                <Minus className="size-4" />
              </Button>
              <span className="w-10 text-center text-sm font-semibold">{qty}</span>
              <Button variant="ghost" size="icon" onClick={() => setQty((q) => Math.min(5, q + 1))}>
                <Plus className="size-4" />
              </Button>
            </div>
            <span className="text-sm text-muted-foreground">Max 5 per order</span>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Button
              size="lg"
              variant="outline"
              onClick={() => {
                add(product.id, qty);
                toast.success("Added to cart", { description: product.name });
              }}
            >
              Add to Cart
            </Button>
            <Button
              size="lg"
              onClick={() => {
                add(product.id, qty);
                navigate({ to: "/checkout" });
              }}
            >
              Buy Now
            </Button>
          </div>

          <div className="mt-6 flex flex-wrap gap-5 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-2">
              <Truck className="size-4 text-primary" /> Free delivery in 2–5 days
            </span>
            <span className="inline-flex items-center gap-2">
              <ShieldCheck className="size-4 text-primary" /> 1-year brand warranty
            </span>
          </div>
        </div>
      </div>

      <section className="mt-14">
        <h2 className="text-xl font-bold tracking-tight">Full specifications</h2>
        <div className="mt-4 overflow-hidden rounded-xl border border-border">
          <table className="w-full text-sm">
            <tbody>
              {specRows.map(([label, value], i) => (
                <tr key={label} className={i % 2 ? "bg-secondary/50" : "bg-card"}>
                  <th className="w-52 px-4 py-3 text-left font-semibold text-muted-foreground">
                    {label}
                  </th>
                  <td className="px-4 py-3">{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
