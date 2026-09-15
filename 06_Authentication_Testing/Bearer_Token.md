# Bearer Token Testing

Example request:

```http
GET /auth/me
Authorization: Bearer <access-token>
```

## Tests

- valid token → protected resource succeeds
- missing token → `401`
- invalid signature/token → `401`
- expired token → `401`
- valid token without permission → `403`
- token from another tenant/audience → rejected
- token in query string → reject/avoid unless explicitly designed
- response does not leak token values

## Postman token extraction

```javascript
const body = pm.response.json();
pm.test("Access token returned", () => {
    pm.expect(body.accessToken).to.be.a("string").and.not.empty;
});
pm.collectionVariables.set("accessToken", body.accessToken);
```
