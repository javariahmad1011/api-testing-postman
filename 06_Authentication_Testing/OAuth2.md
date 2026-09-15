# OAuth 2.0 Testing

OAuth 2.0 testing depends on the grant and client type. For Authorization Code + PKCE, QA should validate the browser redirect flow as well as token endpoint behavior.

## Coverage

- correct redirect URI is required exactly as configured
- `state` is validated to prevent request forgery
- PKCE verifier/challenge are enforced for public clients
- authorization code is one-time and short-lived
- token endpoint rejects wrong client/redirect/code verifier
- scopes granted do not exceed requested/allowed scopes
- refresh token rotation/reuse policy works as designed
- revoked/disabled accounts cannot continue privileged API access
- tokens are never exposed in URLs/logs unnecessarily

Postman is useful for token acquisition and API calls, but security-sensitive browser redirect behavior may require complementary integration/UI tooling.
