# Payment API Testing

Payment testing is treated as a high-risk area with emphasis on idempotency, amount integrity, provider failures, and access control.

## 1. Successful card authorization

**API Name:** Payment API  
**Endpoint:** `/v1/payments`  
**HTTP Method:** `POST`  
**Purpose:** Authorize a payment exactly once for an existing order.  
**Preconditions:** Authenticated customer owns unpaid order `ord-10045`; test payment method is available.  
**Headers:** `Authorization: Bearer <token>`, `Content-Type: application/json`, `Idempotency-Key: pay-ord-10045`  
**Request Body:**

```json
{
  "orderId": "ord-10045",
  "paymentMethodId": "pm-test-visa"
}
```
**Test Data:** Order total GBP 129.98; tokenized test card reference.  
**Expected Response:** `201 Created`/`200 OK` by contract; payment ID; server-derived amount/currency; authorized/captured state.  
**Actual Response:** Portfolio contract example: one payment record created and linked to the order.  
**Validation Points:** No raw card data, correct order ownership, amount from server, idempotency, state transition, audit correlation.  
**Possible Bugs:** Client-controlled amount; double charge; PAN/CVV logged or returned; payment linked to wrong order.  
**Priority:** Critical  
**Severity:** Critical

## 2. Payment provider timeout

**API Name:** Payment API  
**Endpoint:** `/v1/payments`  
**HTTP Method:** `POST`  
**Purpose:** Validate safe behavior when provider outcome is unknown.  
**Preconditions:** Provider stub simulates timeout after request submission.  
**Headers:** Valid auth, JSON content type, unique idempotency key.  
**Request Body:**

```json
{
  "orderId": "ord-timeout-1",
  "paymentMethodId": "pm-timeout"
}
```
**Test Data:** Provider timeout fault injection.  
**Expected Response:** No blind duplicate retry without idempotency; payment remains reconcilable (`PENDING`/`UNKNOWN`); client receives safe retry guidance.  
**Actual Response:** Portfolio resilience expectation: ambiguous provider result is stored safely for reconciliation.  
**Validation Points:** No duplicate charge, correlation ID, recoverable state, retry policy, no 500 stack trace.  
**Possible Bugs:** Automatic duplicate charges; order marked paid without confirmation; payment lost with no reconciliation key.  
**Priority:** Critical  
**Severity:** Critical

## 3. Reject payment for another user’s order

**API Name:** Payment API  
**Endpoint:** `/v1/payments`  
**HTTP Method:** `POST`  
**Purpose:** Prevent horizontal privilege escalation.  
**Preconditions:** User A is authenticated; order belongs to User B.  
**Headers:** `Authorization: Bearer <user-A token>`, `Content-Type: application/json`  
**Request Body:**

```json
{
  "orderId": "ord-user-b",
  "paymentMethodId": "pm-user-a"
}
```
**Test Data:** Cross-account order reference.  
**Expected Response:** `403 Forbidden` or safe `404` per security design; no payment attempt.  
**Actual Response:** Portfolio authorization expectation: ownership check blocks provider call.  
**Validation Points:** No existence leakage beyond policy, no payment side effect, security audit entry.  
**Possible Bugs:** User can pay/manipulate another account order; order details leaked.  
**Priority:** Critical  
**Severity:** Critical
