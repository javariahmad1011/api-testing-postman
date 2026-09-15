# Unauthorized Access Testing

Negative test design with explicit state-safety validation.

## 1. Unauthorized Access

**API Name:** Unauthorized Access  
**Endpoint:** `/v1/admin/users`  
**HTTP Method:** `GET`  
**Purpose:** Verify the API rejects the invalid condition safely and consistently.  
**Preconditions:** Target API and deterministic test data are available.  
**Headers:** `Authorization: Bearer <valid-standard-user-token>`  
**Request Body:**

```json
{}
```
**Test Data:** Use one invalid dimension at a time, then combine only where business risk justifies it.  
**Expected Response:** `403 Forbidden` for authenticated non-admin; no admin records returned.  
**Actual Response:** Portfolio negative-test expectation: request is rejected and no unintended side effect occurs.  
**Validation Points:** Status/error code, field-level message, absence of sensitive data, unchanged state, consistent JSON error schema.  
**Possible Bugs:** Vertical privilege escalation; partial data leak; role accepted from client header/body.  
**Priority:** Critical  
**Severity:** Critical
