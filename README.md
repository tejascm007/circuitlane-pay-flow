# CircuitLane

A laptop e-commerce storefront with a real, working Razorpay checkout integration — browse, cart, checkout, and a secure Razorpay Standard Checkout payment, backed by the AI Revenue Recovery Engine's own API for order creation.

## Stack

React 19, TanStack Start/Router, Tailwind CSS v4, shadcn/ui, Vite.

## Pages

- **Home** — hero, category tiles, featured laptops
- **All laptops** (`/products`) — category and price-range filters
- **Product detail** (`/products/$productId`) — image gallery, full specs, quantity, add to cart / buy now
- **Cart** (`/cart`) — line items, quantity controls, order summary
- **Checkout** (`/checkout`) — contact info, shipping address, real Razorpay payment
- **Order confirmation** (`/order-confirmation`) — payment/order ID confirmation

## Checkout integration

The "Pay Now" button on `/checkout`:

1. `POST {VITE_BACKEND_URL}/api/checkout/orders` with the cart total (in paise) and contact details — returns a real Razorpay `order_id`.
2. Loads `https://checkout.razorpay.com/v1/checkout.js` and opens Razorpay's Standard Checkout with that `order_id`.
3. On success, navigates to the order confirmation page with the real payment/order IDs. On the customer closing the payment popup, shows a graceful message rather than an error — that's an expected outcome the backend's own recovery flow is designed to follow up on, not a failure.

See `src/lib/razorpay.ts` and `src/routes/checkout.tsx` for the full implementation.

Guest checkout only right now — no login, no account. A returning customer isn't recognized as the same person across visits yet (the backend's own `/api/customers/identify` endpoint supports this via phone number, it's just not wired into this checkout flow).

## Development

```sh
npm install
npm run dev
```

Runs on `http://localhost:8080`.

### Environment variables

Copy `.env.example` to `.env`:

```
VITE_BACKEND_URL=http://localhost:8000
VITE_RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxxx
```

- `VITE_BACKEND_URL` — the AI Revenue Recovery Engine backend's URL (defaults to `http://localhost:8000` for local development; the backend has CORS enabled for cross-origin requests)
- `VITE_RAZORPAY_KEY_ID` — the Razorpay **publishable** key_id (safe to expose client-side — never the key_secret)

### Other scripts

```sh
npm run build      # production build
npm run preview    # preview the production build
npm run lint        # eslint
npm run format      # prettier
```
