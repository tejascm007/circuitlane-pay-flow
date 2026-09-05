import { Link } from "@tanstack/react-router";
import { Laptop, ShoppingCart } from "lucide-react";
import { useCart } from "@/lib/cart";

export function SiteHeader() {
  const { count } = useCart();

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4">
        <Link to="/" className="flex items-center gap-2 font-bold tracking-tight">
          <span className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Laptop className="size-5" />
          </span>
          <span className="text-lg">
            Circuit<span className="text-primary">Lane</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium text-muted-foreground sm:flex">
          <Link to="/" activeProps={{ className: "text-foreground" }} className="hover:text-primary">
            Home
          </Link>
          <Link
            to="/products"
            activeProps={{ className: "text-foreground" }}
            className="hover:text-primary"
          >
            All Laptops
          </Link>
        </nav>

        <Link
          to="/cart"
          className="relative inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm font-medium transition-colors hover:border-primary hover:text-primary"
        >
          <ShoppingCart className="size-4" />
          <span className="hidden sm:inline">Cart</span>
          {count > 0 && (
            <span className="absolute -right-2 -top-2 flex size-5 items-center justify-center rounded-full bg-primary text-[11px] font-bold text-primary-foreground">
              {count}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
}
