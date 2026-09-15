# Invalid Token Testing

Negative test design with explicit state-safety validation.

## 1. Invalid Token

**API Name:** Invalid Token  
**Endpoint:** `/auth/me`  
**HTTP Method:** `GET`  
**Purpose:** Verify the API rejects the invalid condition safely and consistently.  
**Preconditions:** Target API and deterministic test data are available.  
**Headers:** `Authorization: Bearer definitely-not-a-valid-token`  
**Request Body:**

```json
{}
```
**Test Data:** Use one invalid dimension at a time, then combine only where business risk justifies it.  
**Expected Response:** `401 Unauthorized`; protected resource body not returned.  
**Actual Response:** Portfolio negative-test expectation: request is rejected and no unintended side effect occurs.  
**Validation Points:** Status/error code, field-level message, absence of sensitive data, unchanged state, consistent JSON error schema.  
**Possible Bugs:** Malformed/forged token accepted; 500 stack trace; user profile returned from cache.  
**Priority:** Critical  
**Severity:** Critical
