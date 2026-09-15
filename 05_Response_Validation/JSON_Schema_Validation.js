const schema = {
    type: "object",
    required: ["users", "total", "skip", "limit"],
    properties: {
        users: {
            type: "array",
            items: {
                type: "object",
                required: ["id", "firstName", "lastName", "email"],
                properties: {
                    id: { type: "number" },
                    firstName: { type: "string" },
                    lastName: { type: "string" },
                    email: { type: "string" }
                }
            }
        },
        total: { type: "number", minimum: 0 },
        skip: { type: "number", minimum: 0 },
        limit: { type: "number", minimum: 0 }
    }
};

pm.test("Response matches JSON Schema", function () {
    pm.response.to.have.jsonSchema(schema);
});
