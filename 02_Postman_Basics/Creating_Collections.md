# Creating Maintainable Postman Collections

A collection should represent a testable business area, not a random list of endpoints. Recommended structure:

```text
Authentication
  01 Login - success
  02 Login - invalid credentials
  03 Current user - valid token
Users
  01 Create user
  02 Get user
  03 Update user
  04 Search user
  05 Delete user
```

## Engineering conventions

- Prefix requests when execution order matters.
- Put common host values at collection/environment scope.
- Keep request-specific test data local unless another request needs it.
- Extract generated identifiers/tokens automatically.
- Assert minimum contract invariants at every request.
- Keep destructive requests in clearly named folders.
- Separate business validation from setup where possible.
- Never commit real tokens, passwords, customer PII, or production endpoints.
