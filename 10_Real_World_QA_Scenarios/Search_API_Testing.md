# Search API Testing

Search endpoints require functional, pagination, authorization-filter, encoding, and abuse-oriented validation.

## 1. Search with valid query and pagination

**API Name:** Search API  
**Endpoint:** `/v1/search?q=keyboard&page=1&pageSize=20`  
**HTTP Method:** `GET`  
**Purpose:** Validate relevance, pagination, and stable metadata.  
**Preconditions:** Search index contains matching records.  
**Headers:** `Accept: application/json`  
**Request Body:**

```json
{}
```
**Test Data:** Query `keyboard`, first page, size 20.  
**Expected Response:** `200 OK`; results array; total/page/pageSize; each result belongs to authorized visibility scope.  
**Actual Response:** Portfolio contract example: relevant paginated results returned.  
**Validation Points:** Relevance, pagination math, stable ordering contract, duplicate IDs, authorization filters, timing.  
**Possible Bugs:** Private results leaked; page duplicates; total mismatch; query ignored.  
**Priority:** High  
**Severity:** Critical if access filtering fails; otherwise Major

## 2. Search special characters safely

**API Name:** Search API  
**Endpoint:** `/v1/search?q=%27%20OR%201%3D1--`  
**HTTP Method:** `GET`  
**Purpose:** Verify encoded special characters are treated as search input and do not alter query semantics.  
**Preconditions:** Search endpoint available.  
**Headers:** `Accept: application/json`  
**Request Body:**

```json
{}
```
**Test Data:** Encoded SQL-like string plus Unicode and reserved characters.  
**Expected Response:** Safe `200` no-match or validation response; no 500; no unauthorized data expansion.  
**Actual Response:** Portfolio security expectation: input handled safely with deterministic response.  
**Validation Points:** No data explosion, no SQL/internal error text, response time, logs/correlation.  
**Possible Bugs:** Injection, stack trace, timeout, all-record result caused by malformed query.  
**Priority:** Critical  
**Severity:** Critical
