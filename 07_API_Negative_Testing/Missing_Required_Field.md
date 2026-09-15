# Missing Required Field Testing

Negative test design with explicit state-safety validation.

## 1. Missing Required Field

**API Name:** Missing Required Field  
**Endpoint:** `/v1/users`  
**HTTP Method:** `POST`  
**Purpose:** Verify the API rejects the invalid condition safely and consistently.  
**Preconditions:** Target API and deterministic test data are available.  
**Headers:** `Content-Type: application/json`  
**Request Body:**

```json
{
  "firstName": "Ava",
  "lastName": "Khan"
}
```
**Test Data:** Use one invalid dimension at a time, then combine only where business risk justifies it.  
**Expected Response:** Validation error identifies missing `email`; no user created.  
**Actual Response:** Portfolio negative-test expectation: request is rejected and no unintended side effect occurs.  
**Validation Points:** Status/error code, field-level message, absence of sensitive data, unchanged state, consistent JSON error schema.  
**Possible Bugs:** Missing mandatory field accepted; null stored; misleading success; error points to wrong field.  
**Priority:** High  
**Severity:** Major
