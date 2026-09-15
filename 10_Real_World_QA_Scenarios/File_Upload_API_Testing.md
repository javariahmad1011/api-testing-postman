# File Upload API Testing

File upload testing treats file content as untrusted input and validates type, size, storage, access control, and cleanup.

## 1. Upload valid file

**API Name:** File Upload API  
**Endpoint:** `/v1/files`  
**HTTP Method:** `POST`  
**Purpose:** Store an allowed file and return immutable metadata.  
**Preconditions:** Authenticated user has upload permission; storage service available.  
**Headers:** `Authorization: Bearer <token>`, `Content-Type: multipart/form-data`  
**Request Body:**

```json
{
  "multipart": {
    "file": "qa-evidence.pdf",
    "category": "test-evidence"
  }
}
```
**Test Data:** Small PDF with valid signature/content and safe filename.  
**Expected Response:** `201 Created`; file ID, original/sanitized name, size, MIME type, checksum; downloadable only with authorization.  
**Actual Response:** Portfolio contract example: one file metadata record and one stored object created.  
**Validation Points:** Content signature vs MIME, filename sanitization, checksum, access control, malware-scan state, no path leakage.  
**Possible Bugs:** Executable accepted as PDF; path traversal filename; public URL leaks private file; duplicate object on retry.  
**Priority:** High  
**Severity:** Critical for security defects

## 2. Reject invalid file type

**API Name:** File Upload API  
**Endpoint:** `/v1/files`  
**HTTP Method:** `POST`  
**Purpose:** Reject disallowed executable content even if extension/MIME is spoofed.  
**Preconditions:** Authenticated user.  
**Headers:** `Authorization: Bearer <token>`, `Content-Type: multipart/form-data`  
**Request Body:**

```json
{
  "multipart": {
    "file": "invoice.pdf"
  }
}
```
**Test Data:** Executable/script content renamed to `.pdf` and sent with `application/pdf`.  
**Expected Response:** `400`/`415`; upload rejected after content inspection; no accessible stored object.  
**Actual Response:** Portfolio security expectation: spoofed file rejected.  
**Validation Points:** Magic bytes/content scan, object cleanup, safe error, no download URL.  
**Possible Bugs:** Extension-only validation; stored active content; partial orphan file remains.  
**Priority:** Critical  
**Severity:** Critical

## 3. Reject oversized file

**API Name:** File Upload API  
**Endpoint:** `/v1/files`  
**HTTP Method:** `POST`  
**Purpose:** Enforce configured maximum upload size without resource exhaustion.  
**Preconditions:** Configured maximum is 10 MB.  
**Headers:** Valid auth; multipart request.  
**Request Body:**

```json
{
  "multipart": {
    "file": "large-test-file.pdf"
  }
}
```
**Test Data:** 10 MB boundary, 10 MB + 1 byte, very large declared length, streamed oversized body.  
**Expected Response:** Boundary file accepted per policy; oversized file receives `413 Payload Too Large`; no residual object.  
**Actual Response:** Portfolio boundary expectation: limit enforced consistently.  
**Validation Points:** Exact boundary, early rejection, storage cleanup, service remains healthy, clear max-size error.  
**Possible Bugs:** Off-by-one limit; 500/OOM; partial file stored; gateway and app limits conflict.  
**Priority:** High  
**Severity:** Major/Critical if denial-of-service risk
