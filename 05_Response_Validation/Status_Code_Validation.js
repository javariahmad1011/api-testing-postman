pm.test("Status code should be 200", function () {
    pm.response.to.have.status(200);
});

pm.test("Status is a successful read response", function () {
    pm.expect(pm.response.code).to.be.oneOf([200, 206]);
});

pm.test("Content-Type is JSON", function () {
    pm.expect(pm.response.headers.get("Content-Type")).to.include("application/json");
});
