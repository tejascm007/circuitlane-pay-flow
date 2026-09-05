export const BACKEND_URL =
  (import.meta.env['VITE_BACKEND_URL'] as string | undefined) || "http://localhost:8000";

export const RAZORPAY_KEY_ID = (import.meta.env['VITE_RAZORPAY_KEY_ID'] as string | undefined) || "";

const SCRIPT_SRC = "https://checkout.razorpay.com/v1/checkout.js";

declare global {
  interface Window {
    Razorpay?: new (options: Record<string, unknown>) => { open: () => void };
  }
}

export function loadRazorpayScript(): Promise<boolean> {
  if (typeof window === "undefined") return Promise.resolve(false);
  if (window.Razorpay) return Promise.resolve(true);

  return new Promise((resolve) => {
    const existing = document.querySelector<HTMLScriptElement>(`script[src="${SCRIPT_SRC}"]`);
    if (existing) {
      existing.addEventListener("load", () => resolve(true));
      existing.addEventListener("error", () => resolve(false));
      return;
    }
    const script = document.createElement("script");
    script.src = SCRIPT_SRC;
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export type CreateOrderResponse = {
  order_id: string;
  amount: number;
  currency: string;
};

export async function createCheckoutOrder(payload: {
  amountInPaise: number;
  customerName: string;
  customerContact: string;
}): Promise<CreateOrderResponse> {
  const res = await fetch(`${BACKEND_URL}/api/checkout/orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      amount: payload.amountInPaise,
      currency: "INR",
      customer_id: null,
      customer_name: payload.customerName,
      customer_contact: payload.customerContact,
      receipt: `order-${Date.now()}`,
    }),
  });

  if (!res.ok) {
    // The backend returns {"detail": "..."} as real JSON for a handled
    // error (e.g. Razorpay itself rejecting the amount) - parse it so the
    // customer sees that message, not the raw JSON string.
    const text = await res.text().catch(() => "");
    let detail = text;
    try {
      const parsed = JSON.parse(text) as { detail?: unknown };
      if (typeof parsed.detail === "string") detail = parsed.detail;
    } catch {
      /* not JSON - fall back to the raw text */
    }
    throw new Error(`Order creation failed (${res.status}). ${detail.slice(0, 180) || "Please try again."}`);
  }

  return (await res.json()) as CreateOrderResponse;
}

/** Normalises an Indian phone number to +91XXXXXXXXXX */
export function normalisePhone(input: string) {
  const digits = input.replace(/\D/g, "");
  const last10 = digits.slice(-10);
  return `+91${last10}`;
}
