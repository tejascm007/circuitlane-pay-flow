import { Link } from "@tanstack/react-router";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatINR, type Product } from "@/data/products";
import { useCart } from "@/lib/cart";
import { toast } from "sonner";

export function ProductCard({ product }: { product: Product }) {
  const { add } = useCart();

  return (
    <div className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-card transition-shadow hover:shadow-lift">
      <Link
        to="/products/$productId"
        params={{ productId: product.id }}
        className="block overflow-hidden bg-secondary/50"
      >
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          width={1024}
          height={768}
          className="aspect-4/3 w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </Link>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span className="font-semibold uppercase tracking-wide">{product.brand}</span>
          <span className="inline-flex items-center gap-1">
            <Star className="size-3 fill-current text-primary" /> {product.rating}
          </span>
        </div>

        <Link
          to="/products/$productId"
          params={{ productId: product.id }}
          className="text-sm font-semibold leading-snug hover:text-primary"
        >
          {product.name}
        </Link>
        <p className="line-clamp-2 text-xs text-muted-foreground">{product.shortSpec}</p>

        <div className="mt-auto pt-3">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-price">{formatINR(product.price)}</span>
            <span className="text-xs text-muted-foreground line-through">
              {formatINR(product.mrp)}
            </span>
          </div>
          <Button
            className="mt-3 w-full"
            onClick={() => {
              add(product.id);
              toast.success("Added to cart", { description: product.name });
            }}
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
}
