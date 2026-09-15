# API Test Execution Report

**Test Scope:** Authentication, Users, Products, Carts, negative authorization, schema validation  
**Test Type:** Functional + negative + contract regression  
**Environment:** Public demo API / portfolio reference contracts  
**Tooling:** Postman Collection v2.1 + JavaScript assertions  

| ID | Scenario | Result | Evidence / key assertion |
|---|---|---:|---|
| AUTH-001 | Valid login | PASS | 200; token fields captured; no password returned |
| AUTH-002 | Invalid credentials | PASS | non-2xx; no access token |
| AUTH-003 | Authenticated current user | PASS | 200; expected user contract |
| USER-001 | List users | PASS | pagination + required user fields |
| USER-002 | Create user | PASS | 201; generated ID; dynamic data reflected |
| USER-003 | Update user | PASS | target ID stable; changed values reflected |
| USER-004 | Search user | PASS | collection + pagination contract |
| USER-005 | Delete user | PASS | delete flag + timestamp contract |
| PROD-001 | Product list | PASS | product collection and numeric fields |
| PROD-002 | Product search | PASS | query result contract |
| CART-001 | Add to cart | PASS | total product/quantity contract |
| SEC-001 | Missing token | PASS | protected endpoint rejected |
| SEC-002 | Role-based access | DESIGN | documented against production-style reference contract |
| PAY-001 | Idempotent payment replay | DESIGN | documented high-risk scenario |

## Exit assessment

Runnable portfolio collections cover the public API paths without repository placeholders. Production-style authorization, order, and payment scenarios are explicitly separated as contract test designs because a public demo API cannot safely reproduce all enterprise controls.
