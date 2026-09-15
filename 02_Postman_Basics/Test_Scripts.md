# Test Scripts

```javascript
pm.test("Status code is successful", () => {
    pm.expect(pm.response.code).to.be.oneOf([200, 201]);
});

pm.test("Response is JSON", () => {
    pm.expect(pm.response.headers.get("Content-Type")).to.include("application/json");
});

pm.test("Response time is under 1500 ms", () => {
    pm.expect(pm.response.responseTime).to.be.below(1500);
});

const body = pm.response.json();

pm.test("Required identifier is present", () => {
    pm.expect(body).to.have.property("id");
    pm.expect(body.id).to.satisfy(v => Number(v) > 0);
});

pm.test("Email matches request data", () => {
    const expected = pm.collectionVariables.get("uniqueEmail");
    if (expected && body.email) pm.expect(body.email).to.eql(expected);
});
```

Assertions should fail on meaningful contract violations, not on irrelevant cosmetic details that make collections brittle.
