# Authentication and Authorization Testing

Authentication proves identity; authorization controls what that identity can do. API security testing must cover both. A valid token should still fail when its role, scope, tenant, ownership, issuer, audience, or lifetime is not acceptable.

Key checks include login failure behavior, token expiry, missing/malformed credentials, refresh lifecycle, scope/role boundaries, logout/revocation where supported, replay resistance, and prevention of sensitive data leakage.
