# API Request and Response Validation

## Request components

A production API request can contain a method, scheme/host, path, query string, headers, cookies, authentication material, and body. Test design should vary these independently so defects are diagnosable.

Example:

```http
POST /users/add HTTP/1.1
Host: dummyjson.com
Content-Type: application/json
Accept: application/json

{
  "firstName": "Ava",
  "lastName": "Khan",
  "email": "ava.qa.1700000000000@example.com"
}
```

## Response checks

A strong assertion set validates:

1. HTTP status is contractually correct.
2. `Content-Type` is correct and parseable.
3. Response body follows the expected schema.
4. Required values are present and have valid types/ranges.
5. Sensitive values are not leaked.
6. Created/updated values reflect the request.
7. Server-generated values such as IDs and timestamps are valid.
8. Error responses are deterministic and actionable.
9. Response time remains within the agreed threshold.
10. State changes and downstream side effects are correct.
