# Profile Update API Testing

Profile APIs are tested for ownership and mass-assignment weaknesses in addition to normal field validation.

## 1. Update own profile

**API Name:** Profile API  
**Endpoint:** `/v1/users/me`  
**HTTP Method:** `PATCH`  
**Purpose:** Allow an authenticated user to update permitted profile fields only.  
**Preconditions:** User is authenticated.  
**Headers:** `Authorization: Bearer <token>`, `Content-Type: application/json`  
**Request Body:**

```json
{
  "displayName": "Ava QA",
  "phone": "+447700900123"
}
```
**Test Data:** Valid permitted fields.  
**Expected Response:** `200 OK`; fields updated; immutable identity/security fields unchanged.  
**Actual Response:** Portfolio contract example: allowed fields updated without modifying role or user ID.  
**Validation Points:** Ownership, field whitelist, normalization, audit metadata, no unintended nulling.  
**Possible Bugs:** Mass-assignment lets user change `role`; another user can be targeted; omitted fields cleared.  
**Priority:** Critical  
**Severity:** Critical

## 2. Attempt mass-assignment privilege change

**API Name:** Profile API  
**Endpoint:** `/v1/users/me`  
**HTTP Method:** `PATCH`  
**Purpose:** Ensure privileged fields cannot be modified through general profile update.  
**Preconditions:** Standard user authenticated.  
**Headers:** `Authorization: Bearer <standard-user token>`, `Content-Type: application/json`  
**Request Body:**

```json
{
  "displayName": "Ava QA",
  "role": "admin"
}
```
**Test Data:** Valid normal field plus forbidden privileged field.  
**Expected Response:** Request rejected or `role` ignored according to contract; stored role remains unchanged.  
**Actual Response:** Portfolio security expectation: user remains standard role.  
**Validation Points:** Stored role, response role, audit log, no downstream permission change.  
**Possible Bugs:** Mass assignment / privilege escalation.  
**Priority:** Critical  
**Severity:** Critical
