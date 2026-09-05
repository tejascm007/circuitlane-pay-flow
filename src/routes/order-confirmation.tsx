import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, Package } from "lucide-react";
import { Button } from "@/components/ui/button";

type Search = {
  order_id?: string | undefined;
  payment_id?: string | undefined;
  signature?: string | undefined;
};

export const Route = createFileRoute("/order-confirmation")({
  validateSearch: (search: Record<string, unknown>): Search => ({
    order_id: typeof search['order_id'] === "string" ? search['order_id'] : undefined,
    payment_id: typeof search['payment_id'] === "string" ? search['payment_id'] : undefined,
    signature: typeof search['signature'] === "string" ? search['signature'] : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Order Confirmed — CircuitLane" },
      { name: "description", content: "Your CircuitLane laptop order is confirmed." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Order Confirmed — CircuitLane" },
      { property: "og:description", content: "Thanks for shopping with CircuitLane." },
    ],
  }),
  component: OrderConfirmation,
});

function OrderConfirmation() {
  const { order_id, payment_id } = Route.useSearch();

  return (
    <div className="mx-auto max-w-2xl px-4 py-20 text-center">
      <span className="mx-auto flex size-16 items-center justify-center rounded-full bg-success/10 text-success">
        <CheckCircle2 className="size-9" />
      </span>
      <h1 className="mt-6 text-3xl font-bold tracking-tight">Thank you for your order!</h1>
      <p className="mt-3 text-muted-foreground">
        Your payment was successful. A confirmation has been sent to your email, and your laptop
        will ship within 24 hours.
      </p>

      <div className="mt-8 rounded-xl border border-border bg-card p-6 text-left shadow-card">
        <div className="flex items-center gap-2 text-sm font-semibold">
          <Package className="size-4 text-primary" /> Payment details
        </div>
        <dl className="mt-4 space-y-3 text-sm">
          <div className="flex flex-wrap justify-between gap-2">
            <dt className="text-muted-foreground">Order ID</dt>
            <dd className="font-mono font-medium">{order_id ?? "—"}</dd>
          </div>
          <div className="flex flex-wrap justify-between gap-2">
            <dt className="text-muted-foreground">Payment ID</dt>
            <dd className="font-mono font-medium">{payment_id ?? "—"}</dd>
          </div>
        </dl>
      </div>

      <Button asChild size="lg" className="mt-8">
        <Link to="/products">Continue shopping</Link>
      </Button>
    </div>
  );
}
