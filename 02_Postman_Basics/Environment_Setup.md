# Environment Setup

This repository is runnable without creating a separate Postman environment because the importable collections contain safe collection variables. In a real project, the same names can be promoted to environment scope for DEV/QA/UAT separation.

## Recommended variables

| Variable | Example value | Scope |
|---|---|---|
| `baseUrl` | `https://dummyjson.com` | environment/collection |
| `username` | `emilys` | environment |
| `password` | `emilyspass` | environment secret in real systems |
| `accessToken` | set by login test | environment/collection |
| `userId` | `2` | collection |
| `searchTerm` | `phone` | collection |
| `uniqueEmail` | generated at runtime | local/collection |

## Real-project rule

Store secrets in a secure secret manager or protected CI variable. Postman environments exported to Git must contain only non-sensitive values.
