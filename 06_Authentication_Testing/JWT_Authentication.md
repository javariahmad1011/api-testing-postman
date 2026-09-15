# JWT Authentication Testing

A JWT is a signed token, not automatically a secure authorization design. QA validation should include server-side checks for signature, expiry, issuer, audience, scope/role, and any tenant/user binding.

## High-value JWT tests

- expired `exp`
- future/invalid `nbf`
- wrong `iss` or `aud`
- token issued for another environment
- modified payload with unchanged signature
- unexpected algorithm/header values
- removed/insufficient role or scope
- user disabled after token issue
- refresh token used as access token

Do not place real JWTs in Git repositories. Use runtime-generated or test-environment tokens.
