# Pre-request Scripts

Pre-request scripts prepare deterministic state before the HTTP call. They are valuable for timestamps, signatures, randomized-but-traceable data, idempotency keys, and chained variables.

```javascript
const timestamp = Date.now();
const random = pm.variables.replaceIn('{{$randomInt}}');
const email = `qa.api.${timestamp}.${random}@example.com`;

pm.collectionVariables.set("uniqueEmail", email);
pm.collectionVariables.set("idempotencyKey", `qa-${timestamp}-${random}`);

pm.request.headers.upsert({
    key: "X-Test-Run-Id",
    value: `postman-${timestamp}`
});
```

Avoid generating data when the test requires exact reproducibility. For defect reproduction, fixed inputs are usually better than random inputs.
