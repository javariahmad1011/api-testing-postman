# CRUD API Testing

These files are individually importable Postman Collection v2.1 JSON examples using the public DummyJSON users resource.

Coverage includes list retrieval, path-parameter retrieval, dynamic user creation, update verification, and delete-contract validation. The public API simulates write operations, so the assertions intentionally verify the returned representation rather than falsely asserting database persistence.

## CRUD risks covered

- incorrect resource identity
- invalid generated IDs
- request values not reflected in the response
- partial/incorrect update behavior
- deletion result not clearly represented
- missing pagination metadata
- slow responses
- contract drift in core user fields
