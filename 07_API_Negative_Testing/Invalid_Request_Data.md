# Invalid Request Data Testing

Negative test design with explicit state-safety validation.

## 1. Invalid Request Data

**API Name:** Invalid Request Data  
**Endpoint:** `/v1/users`  
**HTTP Method:** `POST`  
**Purpose:** Verify the API rejects the invalid condition safely and consistently.  
**Preconditions:** Target API and deterministic test data are available.  
**Headers:** `Content-Type: application/json`  
**Request Body:**

```json
{
  "firstName": 12345,
  "email": "not-an-email",
  "age": -1
}
```
**Test Data:** Use one invalid dimension at a time, then combine only where business risk justifies it.  
**Expected Response:** `400`/`422` by contract with field-specific validation details; no user created.  
**Actual Response:** Portfolio negative-test expectation: request is rejected and no unintended side effect occurs.  
**Validation Points:** Status/error code, field-level message, absence of sensitive data, unchanged state, consistent JSON error schema.  
**Possible Bugs:** Invalid types accepted; malformed values normalized silently; generic 500; partial record created.  
**Priority:** High  
**Severity:** Major
