# User Management API Testing

User lifecycle coverage emphasizes identity integrity, correct state changes, and authorization boundaries.

## 1. Create a valid user

**API Name:** User Management API  
**Endpoint:** `/users/add`  
**HTTP Method:** `POST`  
**Purpose:** Validate successful creation contract and server-generated identifier.  
**Preconditions:** API is reachable; unique email generated for the test run.  
**Headers:** `Content-Type: application/json`, `Accept: application/json`  
**Request Body:**

```json
{
  "firstName": "Ava",
  "lastName": "Khan",
  "email": "qa.api.<timestamp>@example.com",
  "age": 31
}
```
**Test Data:** Unique synthetic email; valid name; positive age.  
**Expected Response:** `201 Created`; positive `id`; request fields returned with correct types.  
**Actual Response:** Sample execution contract: `201 Created`; generated ID and submitted values returned.  
**Validation Points:** Status, JSON media type, ID > 0, exact echoed values, schema, response time.  
**Possible Bugs:** Duplicate identity created unexpectedly; missing ID; wrong field mapping; 200 instead of 201; sensitive defaults returned.  
**Priority:** High  
**Severity:** Major

## 2. Update an existing user

**API Name:** User Management API  
**Endpoint:** `/users/2`  
**HTTP Method:** `PUT`  
**Purpose:** Verify authorized update behavior and field integrity.  
**Preconditions:** User ID 2 exists.  
**Headers:** `Content-Type: application/json`, `Accept: application/json`  
**Request Body:**

```json
{
  "lastName": "AutomationQA",
  "age": 32
}
```
**Test Data:** Existing user ID; valid changed values.  
**Expected Response:** `200 OK`; ID unchanged; supplied fields updated; unrelated fields not corrupted.  
**Actual Response:** Sample execution contract: `200 OK`; requested modified fields returned.  
**Validation Points:** Resource identity, updated values, types, no accidental nulling, timing.  
**Possible Bugs:** Wrong user updated; omitted fields erased; invalid value accepted; audit metadata missing.  
**Priority:** High  
**Severity:** Major

## 3. Delete a user

**API Name:** User Management API  
**Endpoint:** `/users/2`  
**HTTP Method:** `DELETE`  
**Purpose:** Validate delete contract and resource identity.  
**Preconditions:** User ID 2 exists and caller is authorized.  
**Headers:** `Accept: application/json`  
**Request Body:**

```json
{}
```
**Test Data:** Existing user ID.  
**Expected Response:** Successful delete response containing target ID and deletion indicator according to contract.  
**Actual Response:** Sample execution contract: `200 OK`, `isDeleted=true`, deletion timestamp returned.  
**Validation Points:** Target ID, delete flag, timestamp format, no sensitive leakage.  
**Possible Bugs:** Wrong resource deleted; operation returns success without deletion marker; repeated delete creates inconsistent state.  
**Priority:** High  
**Severity:** Critical if wrong resource is affected; otherwise Major

## 4. Search users

**API Name:** User Management API  
**Endpoint:** `/users/search?q=John`  
**HTTP Method:** `GET`  
**Purpose:** Validate search filtering and result metadata.  
**Preconditions:** Public user dataset available.  
**Headers:** `Accept: application/json`  
**Request Body:**

```json
{}
```
**Test Data:** Search term `John`; also test empty, Unicode, long, and no-match values.  
**Expected Response:** `200 OK`; `users` array and pagination metadata; results relevant to query according to search contract.  
**Actual Response:** Sample execution contract: `200 OK` with `users`, `total`, `skip`, and `limit`.  
**Validation Points:** Array type, pagination values, result relevance, case behavior, encoding, response time.  
**Possible Bugs:** Unrelated results; crashes on encoded input; injection-like input changes query semantics; incorrect total.  
**Priority:** Medium  
**Severity:** Major

## 5. Reject duplicate user identity

**API Name:** User Management API  
**Endpoint:** `/v1/users`  
**HTTP Method:** `POST`  
**Purpose:** Verify business-level duplicate prevention for a production user service.  
**Preconditions:** A user already exists with `qa.duplicate@example.com`.  
**Headers:** `Authorization: Bearer <valid token>`, `Content-Type: application/json`  
**Request Body:**

```json
{
  "firstName": "Ava",
  "lastName": "Khan",
  "email": "qa.duplicate@example.com"
}
```
**Test Data:** Email matching an existing normalized identity, including case variant.  
**Expected Response:** `409 Conflict` (or agreed validation status); deterministic error code such as `USER_ALREADY_EXISTS`; no second account created.  
**Actual Response:** Portfolio contract example: duplicate request returns `409 Conflict`; existing account count remains unchanged.  
**Validation Points:** Status, error code, message quality, normalization, no duplicate side effect, race-condition protection.  
**Possible Bugs:** Duplicate accounts allowed; 500 error; email case bypass; duplicate inserted despite error response.  
**Priority:** High  
**Severity:** Critical for identity/security-sensitive systems
