# HTTP Methods — Test Perspective

| Method | Typical intent | QA checks |
|---|---|---|
| GET | Read resource(s) | no unintended mutation, filtering, pagination, cache headers, authorization |
| POST | Create/action | required fields, duplicate handling, generated ID, `201`, replay behavior |
| PUT | Full replacement/update | idempotency, omitted-field behavior, validation, version conflicts |
| PATCH | Partial update | untouched fields remain stable, null semantics, field-level authorization |
| DELETE | Remove resource | authorization, idempotency policy, dependent records, audit behavior |

## High-value method tests

- Send a valid payload using an unsupported method and expect `405 Method Not Allowed` where applicable.
- Repeat idempotent requests and verify the second request does not create additional side effects.
- Verify POST replay behavior for business-critical operations such as payment and order creation.
- Check whether DELETE returns `204`, a deleted representation, or an agreed business status; validate against the API contract rather than assuming one universal pattern.
- Verify safe methods such as GET do not modify timestamps, balances, inventory, or audit fields unexpectedly.
