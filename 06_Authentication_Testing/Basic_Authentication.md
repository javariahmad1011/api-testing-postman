# Basic Authentication

Basic Auth sends a Base64-encoded `username:password` value and therefore must only be used over TLS.

## QA coverage

- valid credential pair succeeds only over HTTPS
- wrong password receives `401`
- missing header receives `401`
- malformed Base64 is rejected safely
- empty username/password behavior follows contract
- account lockout/rate limiting is applied where required
- credentials are not returned in response bodies or logs
- server sends an appropriate `WWW-Authenticate` challenge when designed to do so

Postman can configure this under **Authorization → Basic Auth**; secrets should be stored outside source-controlled collections in real projects.
