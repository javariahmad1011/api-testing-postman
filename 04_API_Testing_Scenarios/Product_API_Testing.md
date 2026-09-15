# Product API Testing

Catalog testing covers pagination, search quality, numeric integrity, and write-contract behavior.

## 1. Product listing

**API Name:** Product API  
**Endpoint:** `/products?limit=10&skip=0`  
**HTTP Method:** `GET`  
**Purpose:** Validate product pagination and core catalog contract.  
**Preconditions:** Product catalog is available.  
**Headers:** `Accept: application/json`  
**Request Body:**

```json
{}
```
**Test Data:** `limit=10`, `skip=0`.  
**Expected Response:** `200 OK`; products array; `total`, `limit`, `skip` numeric metadata.  
**Actual Response:** Sample execution contract: paginated product collection returned.  
**Validation Points:** Array length <= limit, unique IDs within page, price >= 0, required title/category, pagination math.  
**Possible Bugs:** Duplicate IDs; negative prices; missing metadata; limit ignored.  
**Priority:** High  
**Severity:** Major

## 2. Product search

**API Name:** Product API  
**Endpoint:** `/products/search?q=phone`  
**HTTP Method:** `GET`  
**Purpose:** Validate search behavior and result contract.  
**Preconditions:** Catalog contains searchable data.  
**Headers:** `Accept: application/json`  
**Request Body:**

```json
{}
```
**Test Data:** Search `phone`; include case, Unicode, no-match, whitespace, and encoded characters.  
**Expected Response:** `200 OK`; product collection with stable metadata and relevant results.  
**Actual Response:** Sample execution contract: matching product collection returned.  
**Validation Points:** Result relevance, no malformed objects, deterministic totals, encoding handling, timing.  
**Possible Bugs:** Search ignores query; 500 on special characters; total incorrect; hidden/unpublished items leaked.  
**Priority:** High  
**Severity:** Major

## 3. Add product

**API Name:** Product API  
**Endpoint:** `/products/add`  
**HTTP Method:** `POST`  
**Purpose:** Validate product creation contract including numeric values.  
**Preconditions:** Caller has create permission in a real system.  
**Headers:** `Content-Type: application/json`  
**Request Body:**

```json
{
  "title": "QA Mechanical Keyboard",
  "price": 79.99,
  "category": "electronics",
  "stock": 25
}
```
**Test Data:** Valid product values plus boundary variants for price/stock.  
**Expected Response:** `201 Created`; generated ID; submitted fields returned.  
**Actual Response:** Sample execution contract: simulated created product returned with generated ID.  
**Validation Points:** ID, decimal precision, field types, accepted category, no silent truncation.  
**Possible Bugs:** Negative stock accepted; price rounded incorrectly; ID missing; unknown category silently corrupted.  
**Priority:** High  
**Severity:** Major
