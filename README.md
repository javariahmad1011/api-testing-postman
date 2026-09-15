# API Testing with Postman — QA Engineer Portfolio

![Postman](https://img.shields.io/badge/Postman-API%20Testing-FF6C37?logo=postman&logoColor=white) ![REST API](https://img.shields.io/badge/REST-API%20Testing-0A66C2) ![JavaScript](https://img.shields.io/badge/JavaScript-Postman%20Scripts-F7DF1E?logo=javascript&logoColor=000) ![QA](https://img.shields.io/badge/QA-Portfolio-2E8B57) ![Collection](https://img.shields.io/badge/Postman-Collection%20v2.1-orange)

## Repository Overview

`api-testing-postman` is a professional API testing portfolio focused on how a QA Engineer validates REST services beyond happy-path checks. It demonstrates request design, CRUD coverage, authentication and authorization testing, contract validation, negative testing, test data strategy, Postman automation, defect reporting, and risk-based real-world scenarios.

The runnable collections use the public **DummyJSON** REST API for users, authentication, products, and carts. Scenario documents additionally model production-style user, order, payment, search, and file-upload contracts to demonstrate QA analysis that is not limited by a public demo API.

## API Testing Skills Demonstrated

- REST API functional, integration, negative, boundary, and security-oriented testing
- HTTP methods, status codes, headers, path/query parameters, and JSON payload validation
- CRUD lifecycle coverage with data integrity checks
- Authentication testing with bearer/JWT tokens and authorization checks
- Contract and JSON Schema validation
- Dynamic test data, token chaining, collection variables, and environment-style configuration
- Response-time checks and lightweight service-level assertions
- Idempotency, duplicate prevention, pagination, filtering, search, and concurrency considerations
- E-commerce workflows including products, carts, checkout, order creation, and payment risk scenarios
- Defect documentation with reproducible evidence, severity, priority, impact, and expected behavior

## Tools Used

| Tool | Purpose |
|---|---|
| Postman | Request design, collections, variables, pre-request scripts, assertions |
| JavaScript | Automated validations using the Postman sandbox API |
| JSON Schema | Response contract validation |
| DummyJSON | Runnable public REST API for portfolio executions |
| Git / GitHub | Version control and portfolio presentation |

## Postman Features Covered

Collections, collection variables, request chaining, `pm.test`, Chai assertions, `pm.expect`, pre-request scripts, dynamic data, token extraction, schema validation, query parameters, bearer authentication, negative tests, and collection-level reusable logic.

## Folder Explanation

| Folder | Purpose |
|---|---|
| `01_API_Fundamentals` | Practical HTTP and API concepts used during test design |
| `02_Postman_Basics` | Professional Postman setup, variables, scripts, and collection practices |
| `03_CRUD_API_Testing` | Importable single-request Postman examples for user CRUD |
| `04_API_Testing_Scenarios` | Detailed user, auth, product, order, and payment test scenarios |
| `05_Response_Validation` | Reusable JavaScript assertion patterns |
| `06_Authentication_Testing` | Basic, bearer, JWT, and OAuth 2.0 testing guidance |
| `07_API_Negative_Testing` | Invalid, missing, unauthorized, and duplicate-data cases |
| `08_API_Test_Report` | Execution, defect, and test-summary artifacts |
| `09_Collections` | Importable Postman Collection v2.1 files |
| `10_Real_World_QA_Scenarios` | Interview-ready production-style API scenarios |
| `Resources` | Checklist, common API defects, and interview questions |

## API Testing Workflow

```text
Review API contract / business rule
          ↓
Identify resources, auth model and dependencies
          ↓
Design positive + negative + boundary scenarios
          ↓
Prepare deterministic and dynamic test data
          ↓
Execute requests and chain dependent values
          ↓
Validate status + headers + body + schema + timing
          ↓
Check data integrity, authorization and side effects
          ↓
Record defects with evidence and retest
          ↓
Run regression collection and publish summary
```

## Testing Approach

The repository follows a **risk-based layered approach**. A successful status code is never treated as sufficient evidence. Each request is evaluated across transport correctness, HTTP semantics, contract shape, field-level business rules, authorization boundaries, data persistence/side effects, error quality, and performance signals. High-risk flows such as login, checkout, payment, file upload, and destructive operations receive additional negative, replay, idempotency, and privilege checks.

For public demo endpoints that simulate write operations, tests explicitly validate the returned contract rather than claiming durable persistence. This distinction is important in real QA work because the test oracle must reflect the actual system behavior.

## Quick Start

1. Import any collection from `09_Collections/` into Postman.
2. Run **Authentication Collection** first to see token extraction and authenticated request chaining.
3. Run **User API Collection** for CRUD, search, dynamic test data, and validation examples.
4. Run **ECommerce API Collection** for product/search/cart flows.
5. Review `08_API_Test_Report/` for portfolio-ready reporting examples.

The collections already contain working base URLs, public demo credentials where required, variables, request bodies, and scripts. No repository placeholders need to be replaced before import.

## Sample Screenshots / Execution Evidence

The repository is intentionally self-contained and does not depend on image files that can become stale. Equivalent interview evidence is preserved as reproducible collection assertions and sample response snapshots in the scenario/report files. A typical successful Postman run demonstrates:

```text
POST /auth/login                 200  ✓ token captured
GET  /auth/me                    200  ✓ authenticated user validated
POST /users/add                  201  ✓ dynamic user contract validated
GET  /products/search?q=phone    200  ✓ search collection validated
POST /carts/add                  201  ✓ totals and product counts validated
```

## Future Improvements

- Add Newman CLI execution and HTML/JUnit reporting in CI
- Add GitHub Actions collection regression runs
- Add OpenAPI contract-diff testing
- Add data-driven CSV/JSON test runs for boundary matrices
- Add API performance baselines with k6 or JMeter
- Add service virtualization for payment-provider failure modes

## Author

**QA Engineer Portfolio — API Testing / Postman**  
Focus: API quality, automation, negative testing, risk analysis, and production-ready defect reporting.

## Public Test API Reference

Runnable examples are built against `https://dummyjson.com` and intentionally avoid production systems or sensitive data.
