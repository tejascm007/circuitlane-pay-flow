import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatINR } from "@/data/products";
import { useCart } from "@/lib/cart";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Your Cart — CircuitLane" },
      { name: "description", content: "Review the laptops in your CircuitLane cart before checkout." },
      { property: "og:title", content: "Your Cart — CircuitLane" },
      { property: "og:description", content: "Review your laptops and proceed to secure checkout." },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const { ready, items, subtotal, setQty, remove } = useCart();

  if (!ready) {
    return <div className="mx-auto max-w-6xl px-4 py-24 text-center text-muted-foreground">Loading…</div>;
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 text-center">
        <span className="mx-auto flex size-16 items-center justify-center rounded-full bg-secondary text-muted-foreground">
          <ShoppingCart className="size-7" />
        </span>
        <h1 className="mt-6 text-2xl font-bold tracking-tight">Your cart is empty</h1>
        <p className="mt-2 text-muted-foreground">
          Browse our laptops and add one to get started.
        </p>
        <Button asChild size="lg" className="mt-6">
          <Link to="/products">Shop Laptops</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-bold tracking-tight">Your cart</h1>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_340px]">
        <div className="space-y-4">
          {items.map(({ product, qty }) => (
            <div
              key={product.id}
              className="flex flex-col gap-4 rounded-xl border border-border bg-card p-4 shadow-card sm:flex-row"
            >
              <img
                src={product.image}
                alt={product.name}
                loading="lazy"
                width={1024}
                height={768}
                className="h-28 w-full rounded-lg object-cover sm:w-40"
              />
              <div className="flex flex-1 flex-col">
                <Link
                  to="/products/$productId"
                  params={{ productId: product.id }}
                  className="font-semibold hover:text-primary"
                >
                  {product.name}
                </Link>
                <p className="mt-1 text-xs text-muted-foreground">{product.shortSpec}</p>
                <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-3">
                  <div className="flex items-center rounded-lg border border-border">
                    <Button variant="ghost" size="icon" onClick={() => setQty(product.id, qty - 1)}>
                      <Minus className="size-4" />
                    </Button>
                    <span className="w-9 text-center text-sm font-semibold">{qty}</span>
                    <Button variant="ghost" size="icon" onClick={() => setQty(product.id, qty + 1)}>
                      <Plus className="size-4" />
                    </Button>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-bold text-price">{formatINR(product.price * qty)}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      aria-label={`Remove ${product.name}`}
                      onClick={() => remove(product.id)}
                    >
                      <Trash2 className="size-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <aside className="h-fit rounded-xl border border-border bg-card p-6 shadow-card">
          <h2 className="text-lg font-bold">Order summary</h2>
          <div className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="font-medium">{formatINR(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Delivery</span>
              <span className="font-medium text-success">Free</span>
            </div>
          </div>
          <div className="mt-4 flex justify-between border-t border-border pt-4 text-base font-bold">
            <span>Total</span>
            <span className="text-price">{formatINR(subtotal)}</span>
          </div>
          <Button asChild size="lg" className="mt-6 w-full">
            <Link to="/checkout">Proceed to Checkout</Link>
          </Button>
          <Button asChild variant="ghost" className="mt-2 w-full">
            <Link to="/products">Continue shopping</Link>
          </Button>
        </aside>
      </div>
    </div>
  );
}
