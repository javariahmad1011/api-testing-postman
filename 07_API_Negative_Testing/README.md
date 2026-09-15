# API Negative Testing

Negative tests verify that the API refuses unsafe or invalid behavior **without corrupting state**. A good negative test asserts the status/error contract and then checks that no unintended record, payment, token, or privilege was created.

Common dimensions: missing required fields, invalid formats/types, boundary values, malformed JSON, unsupported media type, invalid/expired auth, forbidden access, duplicates, stale versions, race conditions, and dependency failures.
