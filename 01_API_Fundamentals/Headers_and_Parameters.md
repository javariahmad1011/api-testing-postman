# Headers and Parameters

## Headers to test

- `Authorization` — missing, malformed, expired, wrong audience/scope, insufficient role
- `Content-Type` — correct media type, unsupported type, charset behavior
- `Accept` — supported/unsupported representations
- `Idempotency-Key` — replay protection for payments/orders where supported
- Correlation/request IDs — traceability across failures
- Cache headers — private data must not be cached incorrectly
- Security headers — relevant gateway/API protections where applicable

## Parameter classes

**Path:** resource identity, e.g. `/users/2`  
**Query:** filtering/search/pagination, e.g. `?q=phone&limit=10`  
**Header:** transport/auth metadata  
**Body:** structured business data

## Boundary tests

Test absent vs empty vs null, zero/negative/maximum values, Unicode, encoded characters, repeated query keys, very long strings, invalid enum values, case sensitivity, unknown fields, and duplicate parameters. Validate both response behavior and server-side side effects.
