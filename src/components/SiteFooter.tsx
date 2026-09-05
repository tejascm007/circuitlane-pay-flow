import { ShieldCheck, Truck, BadgeCheck } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-border bg-secondary/60">
      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-10 sm:grid-cols-3">
        <div className="flex items-start gap-3">
          <ShieldCheck className="mt-0.5 size-5 text-primary" />
          <div>
            <p className="text-sm font-semibold">Secure payments</p>
            <p className="text-sm text-muted-foreground">All transactions via Razorpay.</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <Truck className="mt-0.5 size-5 text-primary" />
          <div>
            <p className="text-sm font-semibold">Free delivery</p>
            <p className="text-sm text-muted-foreground">Across India in 2–5 days.</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <BadgeCheck className="mt-0.5 size-5 text-primary" />
          <div>
            <p className="text-sm font-semibold">Brand warranty</p>
            <p className="text-sm text-muted-foreground">1-year onsite on every laptop.</p>
          </div>
        </div>
      </div>
      <div className="border-t border-border py-5 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} CircuitLane. Prices inclusive of GST.
      </div>
    </footer>
  );
}
