pm.test("Response time is under 1500 ms", function () {
    pm.expect(pm.response.responseTime).to.be.below(1500);
});

pm.test("Response time is recorded for trend analysis", function () {
    const ms = pm.response.responseTime;
    pm.collectionVariables.set("lastResponseTimeMs", String(ms));
    pm.expect(ms).to.be.a("number");
});
