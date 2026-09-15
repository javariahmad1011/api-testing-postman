# Registration API Testing

Registration tests combine data validation, identity uniqueness, secret handling, and side-effect validation.

## 1. Register valid user

**API Name:** Registration API  
**Endpoint:** `/v1/register`  
**HTTP Method:** `POST`  
**Purpose:** Create a new account with normalized unique identity.  
**Preconditions:** Email is not registered.  
**Headers:** `Content-Type: application/json`, `Accept: application/json`  
**Request Body:**

```json
{
  "firstName": "Ava",
  "lastName": "Khan",
  "email": "ava.qa@example.com",
  "password": "Str0ng-Test-Password!"
}
```
**Test Data:** Valid synthetic identity and policy-compliant password.  
**Expected Response:** `201 Created`; user ID returned; password never echoed; account enters agreed verification state.  
**Actual Response:** Portfolio contract example: account created once and password excluded from response.  
**Validation Points:** Normalization, generated ID, verification status, no secret leakage, notification side effect exactly once.  
**Possible Bugs:** Password returned; duplicate account; verification bypass; email case creates duplicate identity.  
**Priority:** Critical  
**Severity:** Critical

## 2. Reject weak password

**API Name:** Registration API  
**Endpoint:** `/v1/register`  
**HTTP Method:** `POST`  
**Purpose:** Enforce server-side password policy.  
**Preconditions:** Email is unique.  
**Headers:** `Content-Type: application/json`  
**Request Body:**

```json
{
  "firstName": "Ava",
  "lastName": "Khan",
  "email": "ava.weak@example.com",
  "password": "12345"
}
```
**Test Data:** Password below configured security policy.  
**Expected Response:** `400`/`422`; field-specific password error; no account created.  
**Actual Response:** Portfolio negative expectation: weak password rejected before account creation.  
**Validation Points:** Server-side policy, safe error, no partial user, no verification email sent.  
**Possible Bugs:** Client-only validation; weak password accepted; account partially created.  
**Priority:** Critical  
**Severity:** Critical

## 3. Duplicate registration

**API Name:** Registration API  
**Endpoint:** `/v1/register`  
**HTTP Method:** `POST`  
**Purpose:** Prevent duplicate identities without leaking excessive account information.  
**Preconditions:** Normalized email already exists.  
**Headers:** `Content-Type: application/json`  
**Request Body:**

```json
{
  "firstName": "Ava",
  "lastName": "Khan",
  "email": "AVA.QA@example.com",
  "password": "Str0ng-Test-Password!"
}
```
**Test Data:** Case variant of existing email.  
**Expected Response:** Agreed duplicate behavior; no second account; message avoids unnecessary account-state disclosure.  
**Actual Response:** Portfolio expectation: duplicate blocked after normalization.  
**Validation Points:** Uniqueness, normalization, race condition, error consistency.  
**Possible Bugs:** Case bypass, two accounts, email enumeration leak, unhandled DB error.  
**Priority:** High  
**Severity:** Critical
