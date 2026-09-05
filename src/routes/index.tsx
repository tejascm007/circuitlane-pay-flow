import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ProductCard";
import { categories, products } from "@/data/products";
import heroImage from "@/assets/laptop-gaming.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CircuitLane — Buy Laptops Online in India" },
      {
        name: "description",
        content:
          "Shop gaming laptops, ultrabooks, business and budget laptops from Dell, HP, Lenovo, ASUS, Apple and Acer with secure Razorpay checkout.",
      },
      { property: "og:title", content: "CircuitLane — Buy Laptops Online in India" },
      {
        property: "og:description",
        content: "Top laptop brands, honest prices in ₹, and a fast secure checkout.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  const featured = products.slice(0, 8);

  return (
    <div>
      <section className="border-b border-border" style={{ background: "var(--gradient-hero)" }}>
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 md:grid-cols-2 md:py-20">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-background/70 px-3 py-1 text-xs font-semibold text-primary">
              <ShieldCheck className="size-3.5" /> Secure Razorpay checkout
            </span>
            <h1 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight md:text-5xl">
              Laptops that keep up with your ambition.
            </h1>
            <p className="mt-4 max-w-md text-muted-foreground">
              Hand-picked machines from Dell, HP, Lenovo, ASUS, Apple and Acer — from ₹36,990 to
              flagship creator rigs. Free delivery across India.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link to="/products">
                  Shop Laptops <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/products" search={{ category: "Gaming" }}>
                  Gaming picks
                </Link>
              </Button>
            </div>
          </div>
          <img
            src={heroImage}
            alt="A lineup of modern laptops available at CircuitLane"
            width={1600}
            height={900}
            className="rounded-2xl shadow-lift"
          />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14">
        <h2 className="text-2xl font-bold tracking-tight">Shop by category</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((c) => (
            <Link
              key={c.name}
              to="/products"
              search={{ category: c.name }}
              className="group overflow-hidden rounded-xl border border-border bg-card shadow-card transition-shadow hover:shadow-lift"
            >
              <img
                src={c.image}
                alt={`${c.name} laptops`}
                loading="lazy"
                width={1024}
                height={768}
                className="aspect-4/3 w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="p-4">
                <p className="font-semibold">{c.name}</p>
                <p className="text-sm text-muted-foreground">{c.blurb}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-4">
        <div className="flex items-end justify-between">
          <h2 className="text-2xl font-bold tracking-tight">Featured laptops</h2>
          <Link to="/products" className="text-sm font-medium text-primary hover:underline">
            View all
          </Link>
        </div>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
