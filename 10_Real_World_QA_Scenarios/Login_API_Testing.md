# Login API Testing

Login is a security-critical entry point. Coverage includes correctness, token lifecycle, enumeration resistance, and safe errors.

## 1. Login success

**API Name:** Authentication API  
**Endpoint:** `/auth/login`  
**HTTP Method:** `POST`  
**Purpose:** Authenticate a valid user and obtain access/refresh tokens.  
**Preconditions:** Public demo account exists.  
**Headers:** `Content-Type: application/json`, `Accept: application/json`  
**Request Body:**

```json
{
  "username": "emilys",
  "password": "emilyspass",
  "expiresInMins": 30
}
```
**Test Data:** Valid documented demo credentials.  
**Expected Response:** `200 OK`; profile plus non-empty access and refresh tokens.  
**Actual Response:** Sample execution contract: `200 OK`; token-bearing authenticated-user response.  
**Validation Points:** No password echoed, token strings present, expected username/email, response time, token extraction.  
**Possible Bugs:** Password returned; token missing; invalid lifetime; login succeeds for wrong credentials; refresh token equals malformed value.  
**Priority:** Critical  
**Severity:** Critical

## 2. Invalid credentials

**API Name:** Authentication API  
**Endpoint:** `/auth/login`  
**HTTP Method:** `POST`  
**Purpose:** Verify incorrect credentials cannot create an authenticated session.  
**Preconditions:** None.  
**Headers:** `Content-Type: application/json`  
**Request Body:**

```json
{
  "username": "emilys",
  "password": "wrong-password"
}
```
**Test Data:** Known username + invalid password.  
**Expected Response:** Authentication failure (commonly `400`/`401` per API contract); no token fields.  
**Actual Response:** Sample negative outcome: non-2xx authentication error with no access token.  
**Validation Points:** Status, absence of token, generic error wording, no account enumeration leakage.  
**Possible Bugs:** 200 with token; stack trace; message reveals password/credential internals; inconsistent status.  
**Priority:** Critical  
**Severity:** Critical

## 3. Expired token

**API Name:** Protected Resource API  
**Endpoint:** `/auth/me`  
**HTTP Method:** `GET`  
**Purpose:** Verify an expired JWT cannot access protected user data.  
**Preconditions:** A syntactically valid but expired token is available.  
**Headers:** `Authorization: Bearer <expired JWT>`  
**Request Body:**

```json
{}
```
**Test Data:** Expired access token.  
**Expected Response:** `401 Unauthorized`; no protected profile data; stable token-expired/invalid error.  
**Actual Response:** Portfolio security expectation: expired token is rejected with no user object.  
**Validation Points:** Status, no PII, deterministic error, no session refresh unless explicitly designed.  
**Possible Bugs:** Expired token accepted; profile data leaked in error body; server returns 500.  
**Priority:** Critical  
**Severity:** Critical

## 4. Missing token

**API Name:** Protected Resource API  
**Endpoint:** `/auth/me`  
**HTTP Method:** `GET`  
**Purpose:** Verify authentication is required.  
**Preconditions:** None.  
**Headers:** No `Authorization` header.  
**Request Body:**

```json
{}
```
**Test Data:** Request intentionally omits credentials.  
**Expected Response:** `401 Unauthorized`; protected data absent.  
**Actual Response:** Portfolio security expectation: request is rejected.  
**Validation Points:** 401 semantics, safe error body, no cached protected response.  
**Possible Bugs:** Anonymous access; 200 cached profile; incorrect 403 masking missing authentication.  
**Priority:** Critical  
**Severity:** Critical
