# Order API Testing

Order tests focus on monetary integrity, idempotency, ownership, and state transitions.

## 1. Create order from validated cart

**API Name:** Order API  
**Endpoint:** `/v1/orders`  
**HTTP Method:** `POST`  
**Purpose:** Create an order from a server-side cart and verify immutable pricing snapshot.  
**Preconditions:** Authenticated customer; cart has in-stock products; shipping address is valid.  
**Headers:** `Authorization: Bearer <token>`, `Content-Type: application/json`, `Idempotency-Key: qa-order-001`  
**Request Body:**

```json
{
  "cartId": "cart-8421",
  "shippingAddressId": "addr-17",
  "paymentMethodId": "pm-test-visa"
}
```
**Test Data:** Cart total 129.98; two products; one shipping address.  
**Expected Response:** `201 Created`; unique order ID; server-calculated totals; status such as `PENDING_PAYMENT`; no trust in client-supplied totals.  
**Actual Response:** Portfolio contract example: order created once; totals sourced from server cart snapshot.  
**Validation Points:** Idempotency, unique order number, currency, line quantities, totals, tax/shipping, inventory reservation.  
**Possible Bugs:** Duplicate order on retry; client can manipulate total; out-of-stock item ordered; wrong customer cart accepted.  
**Priority:** Critical  
**Severity:** Critical

## 2. Retry order creation with same idempotency key

**API Name:** Order API  
**Endpoint:** `/v1/orders`  
**HTTP Method:** `POST`  
**Purpose:** Prevent duplicate orders caused by network retries.  
**Preconditions:** First request with the same idempotency key already succeeded.  
**Headers:** Same valid auth and `Idempotency-Key: qa-order-001`.  
**Request Body:**

```json
{
  "cartId": "cart-8421",
  "shippingAddressId": "addr-17",
  "paymentMethodId": "pm-test-visa"
}
```
**Test Data:** Exact replay of initial request.  
**Expected Response:** Original order/result returned or agreed replay response; no second order or second inventory reservation.  
**Actual Response:** Portfolio contract example: retry maps to original order ID.  
**Validation Points:** Order count unchanged, same business result, no duplicate charge/reservation, traceability.  
**Possible Bugs:** Two orders created; second charge initiated; 500 from duplicate key race.  
**Priority:** Critical  
**Severity:** Critical

## 3. Reject checkout with insufficient inventory

**API Name:** Checkout API  
**Endpoint:** `/v1/checkout`  
**HTTP Method:** `POST`  
**Purpose:** Ensure stock is revalidated at checkout rather than trusted from an older cart state.  
**Preconditions:** Cart item quantity now exceeds available inventory.  
**Headers:** `Authorization: Bearer <token>`, `Content-Type: application/json`  
**Request Body:**

```json
{
  "cartId": "cart-low-stock"
}
```
**Test Data:** Requested quantity 5; current stock 2.  
**Expected Response:** `409 Conflict` or agreed business error; unavailable line identified; no order/payment initiated.  
**Actual Response:** Portfolio contract example: checkout blocked before payment.  
**Validation Points:** No payment call, no order, accurate available quantity, atomic inventory behavior.  
**Possible Bugs:** Overselling; payment captured before stock failure; stale inventory accepted.  
**Priority:** Critical  
**Severity:** Critical
