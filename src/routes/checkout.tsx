import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { AlertCircle, Info, Loader2, Lock, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatINR } from "@/data/products";
import { useCart } from "@/lib/cart";
import {
  RAZORPAY_KEY_ID,
  createCheckoutOrder,
  loadRazorpayScript,
  normalisePhone,
} from "@/lib/razorpay";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Secure Checkout — CircuitLane" },
      {
        name: "description",
        content: "Complete your CircuitLane laptop order with a secure Razorpay payment.",
      },
      { property: "og:title", content: "Secure Checkout — CircuitLane" },
      { property: "og:description", content: "Guest checkout with secure Razorpay payments." },
    ],
  }),
  component: Checkout,
});

function Checkout() {
  const { ready, items, subtotal, clear } = useCart();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState({ line1: "", line2: "", city: "", state: "", pin: "" });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  if (!ready) {
    return <div className="mx-auto max-w-6xl px-4 py-24 text-center text-muted-foreground">Loading…</div>;
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 text-center">
        <h1 className="text-2xl font-bold tracking-tight">Nothing to check out</h1>
        <p className="mt-2 text-muted-foreground">Add a laptop to your cart first.</p>
        <Button asChild size="lg" className="mt-6">
          <Link to="/products">Shop Laptops</Link>
        </Button>
      </div>
    );
  }

  const valid = name.trim().length > 1 && /\S+@\S+\.\S+/.test(email) && phone.replace(/\D/g, "").length >= 10;

  async function handlePay() {
    setError(null);
    setNotice(null);

    if (!valid) {
      setError("Please enter your full name, a valid email, and a 10-digit phone number.");
      return;
    }
    if (!RAZORPAY_KEY_ID) {
      setError(
        "Payment key is not configured yet. Add VITE_RAZORPAY_KEY_ID to your environment and reload.",
      );
      return;
    }

    setLoading(true);
    try {
      const scriptOk = await loadRazorpayScript();
      if (!scriptOk) throw new Error("Could not load the secure payment window. Check your connection and retry.");

      const order = await createCheckoutOrder({
        amountInPaise: Math.round(subtotal * 100),
        customerName: name.trim(),
        customerContact: normalisePhone(phone),
      });

      const rzp = new window.Razorpay!({
        key: RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        order_id: order.order_id,
        name: "CircuitLane",
        description: `Order for ${items.length} item(s)`,
        handler: (response: {
          razorpay_payment_id: string;
          razorpay_order_id: string;
          razorpay_signature: string;
        }) => {
          clear();
          navigate({
            to: "/order-confirmation",
            search: {
              order_id: response.razorpay_order_id,
              payment_id: response.razorpay_payment_id,
              signature: response.razorpay_signature,
            },
          });
        },
        prefill: { name: name.trim(), email: email.trim(), contact: normalisePhone(phone) },
        theme: { color: "#3B82F6" },
        modal: {
          ondismiss: () => {
            setLoading(false);
            setNotice(
              "No worries — we'll send you a link to complete this payment if you'd like to finish later.",
            );
          },
        },
      });

      rzp.open();
      setLoading(false);
    } catch (e) {
      setLoading(false);
      setError(
        e instanceof Error
          ? `We couldn't start the payment. ${e.message}`
          : "We couldn't start the payment. Please try again.",
      );
    }
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="flex items-center gap-2">
        <ShieldCheck className="size-5 text-primary" />
        <h1 className="text-3xl font-bold tracking-tight">Secure Checkout</h1>
      </div>
      <p className="mt-2 text-sm text-muted-foreground">
        Guest checkout — no account needed. Payments processed securely by Razorpay.
      </p>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
        <div className="space-y-6">
          <section className="rounded-xl border border-border bg-card p-6 shadow-card">
            <h2 className="text-lg font-bold">Contact information</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <Label htmlFor="name">Full name</Label>
                <Input
                  id="name"
                  className="mt-1.5"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ananya Sharma"
                  autoComplete="name"
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  className="mt-1.5"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  autoComplete="email"
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  type="tel"
                  className="mt-1.5"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="98765 43210"
                  autoComplete="tel"
                />
              </div>
            </div>
          </section>

          <section className="rounded-xl border border-border bg-card p-6 shadow-card">
            <h2 className="text-lg font-bold">Shipping address</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <Label htmlFor="line1">Address line 1</Label>
                <Input
                  id="line1"
                  className="mt-1.5"
                  value={address.line1}
                  onChange={(e) => setAddress({ ...address, line1: e.target.value })}
                  placeholder="Flat / House no, Building"
                />
              </div>
              <div className="sm:col-span-2">
                <Label htmlFor="line2">Address line 2</Label>
                <Input
                  id="line2"
                  className="mt-1.5"
                  value={address.line2}
                  onChange={(e) => setAddress({ ...address, line2: e.target.value })}
                  placeholder="Street, Area"
                />
              </div>
              <div>
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  className="mt-1.5"
                  value={address.city}
                  onChange={(e) => setAddress({ ...address, city: e.target.value })}
                  placeholder="Bengaluru"
                />
              </div>
              <div>
                <Label htmlFor="state">State</Label>
                <Input
                  id="state"
                  className="mt-1.5"
                  value={address.state}
                  onChange={(e) => setAddress({ ...address, state: e.target.value })}
                  placeholder="Karnataka"
                />
              </div>
              <div>
                <Label htmlFor="pin">PIN code</Label>
                <Input
                  id="pin"
                  className="mt-1.5"
                  value={address.pin}
                  onChange={(e) => setAddress({ ...address, pin: e.target.value })}
                  placeholder="560001"
                />
              </div>
            </div>
          </section>
        </div>

        <aside className="h-fit rounded-xl border border-border bg-card p-6 shadow-card">
          <h2 className="text-lg font-bold">Order summary</h2>
          <div className="mt-4 space-y-3">
            {items.map(({ product, qty }) => (
              <div key={product.id} className="flex gap-3">
                <img
                  src={product.image}
                  alt={product.name}
                  loading="lazy"
                  width={1024}
                  height={768}
                  className="size-14 rounded-md object-cover"
                />
                <div className="flex-1 text-sm">
                  <p className="font-medium leading-snug">{product.name}</p>
                  <p className="text-xs text-muted-foreground">Qty {qty}</p>
                </div>
                <span className="text-sm font-semibold">{formatINR(product.price * qty)}</span>
              </div>
            ))}
          </div>

          <div className="mt-5 space-y-2 border-t border-border pt-4 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span>{formatINR(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Delivery</span>
              <span className="text-success">Free</span>
            </div>
            <div className="flex justify-between pt-2 text-base font-bold">
              <span>Total payable</span>
              <span className="text-price">{formatINR(subtotal)}</span>
            </div>
          </div>

          {error && (
            <div className="mt-4 flex gap-2 rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
              <AlertCircle className="mt-0.5 size-4 shrink-0" />
              <p>{error}</p>
            </div>
          )}
          {notice && (
            <div className="mt-4 flex gap-2 rounded-lg border border-border bg-accent/60 p-3 text-sm text-accent-foreground">
              <Info className="mt-0.5 size-4 shrink-0" />
              <p>{notice}</p>
            </div>
          )}

          <Button size="lg" className="mt-5 w-full" disabled={loading} onClick={handlePay}>
            {loading ? <Loader2 className="size-4 animate-spin" /> : <Lock className="size-4" />}
            {loading ? "Starting payment…" : `Pay Now · ${formatINR(subtotal)}`}
          </Button>
          <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
            <Lock className="size-3" /> Secure Checkout · 256-bit encrypted via Razorpay
          </p>
        </aside>
      </div>
    </div>
  );
}
