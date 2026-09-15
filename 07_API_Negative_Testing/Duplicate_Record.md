# Duplicate Record Testing

Negative test design with explicit state-safety validation.

## 1. Duplicate Record

**API Name:** Duplicate Record  
**Endpoint:** `/v1/users`  
**HTTP Method:** `POST`  
**Purpose:** Verify the API rejects the invalid condition safely and consistently.  
**Preconditions:** Target API and deterministic test data are available.  
**Headers:** `Content-Type: application/json`  
**Request Body:**

```json
{
  "firstName": "Ava",
  "lastName": "Khan",
  "email": "qa.duplicate@example.com"
}
```
**Test Data:** Use one invalid dimension at a time, then combine only where business risk justifies it.  
**Expected Response:** `409 Conflict` (or agreed validation code); canonical existing identity remains unique.  
**Actual Response:** Portfolio negative-test expectation: request is rejected and no unintended side effect occurs.  
**Validation Points:** Status/error code, field-level message, absence of sensitive data, unchanged state, consistent JSON error schema.  
**Possible Bugs:** Duplicate inserted; case/whitespace bypass; 500 due to unhandled DB uniqueness error; race allows two records.  
**Priority:** High  
**Severity:** Critical
