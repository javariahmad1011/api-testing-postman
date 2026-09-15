# Sample API Defect Report

> Portfolio defect example demonstrating reporting quality. It is not a claim about DummyJSON.

## API-DEF-001 — Duplicate email can create multiple active user identities

**Component:** User Management API  
**Endpoint:** `POST /v1/users`  
**Environment:** QA  
**Severity:** Critical  
**Priority:** High  
**Reproducibility:** 5/5  

### Preconditions

An active user already exists with `qa.duplicate@example.com`.

### Steps

1. Authenticate as a user-management operator.
2. Submit a create-user request with email `QA.Duplicate@example.com`.
3. Repeat using `qa.duplicate@example.com ` with trailing whitespace.
4. Query users by normalized email.

### Actual Result

Both requests return success and produce separate active user IDs.

### Expected Result

The service should normalize the identity field and reject a duplicate with the contractually defined conflict/validation response. Exactly one active identity should remain.

### Impact

Duplicate identities can break login, ownership, notification, audit, and account-recovery behavior. In regulated or payment-enabled systems this may also create security and data-consistency risk.

### Suggested regression coverage

Exact duplicate, case variant, leading/trailing whitespace, concurrent duplicate requests, and retry after timeout.
