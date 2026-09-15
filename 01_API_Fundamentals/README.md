# API Fundamentals for QA Engineers

This section documents the HTTP knowledge applied when designing API tests. The emphasis is not memorizing definitions; it is knowing what to validate when a service behaves incorrectly.

A QA Engineer should distinguish transport success from business success. For example, `200 OK` with an error object can be a contract defect, while `409 Conflict` may be the correct result for a duplicate resource. Tests therefore validate status, headers, body, schema, authorization, state change, and downstream side effects together.

Use the files in this folder as the decision framework behind the executable Postman requests in the rest of the repository.
