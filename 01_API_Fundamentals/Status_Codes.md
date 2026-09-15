# HTTP Status Codes — QA Expectations

| Code | QA interpretation |
|---|---|
| 200 | Successful read/update/action with response body |
| 201 | Resource created; validate generated identifier and representation |
| 204 | Successful operation with no response body |
| 400 | Malformed or invalid request; validate field-level error quality |
| 401 | Authentication missing/invalid/expired |
| 403 | Authenticated identity lacks permission |
| 404 | Resource does not exist or is intentionally hidden |
| 409 | Resource/state conflict such as duplicate or version conflict |
| 415 | Unsupported media type |
| 422 | Semantically invalid entity where this convention is used |
| 429 | Rate limit enforced; validate retry metadata |
| 500 | Unexpected server error; should not expose stack traces or secrets |
| 502/503/504 | Dependency or availability failure; validate resilience behavior |

## QA rule

Never validate status in isolation. A `200` response containing `{ "success": false }` may indicate incorrect HTTP semantics. Equally, a `409` may be the expected pass condition for a duplicate-record test.
