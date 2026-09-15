const body = pm.response.json();

pm.test("Response body is an object", function () {
    pm.expect(body).to.be.an("object");
});

pm.test("Required pagination fields exist", function () {
    pm.expect(body).to.have.property("total").that.is.a("number");
    pm.expect(body).to.have.property("skip").that.is.a("number");
    pm.expect(body).to.have.property("limit").that.is.a("number");
});

pm.test("Users is an array and each item has required fields", function () {
    pm.expect(body.users).to.be.an("array");
    body.users.forEach((user) => {
        pm.expect(user).to.have.property("id");
        pm.expect(user).to.have.property("email").that.is.a("string");
        pm.expect(user).to.have.property("role").that.is.a("string");
    });
});
