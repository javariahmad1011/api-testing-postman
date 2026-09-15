# Postman Variables

## Read variables

```javascript
const baseUrl = pm.collectionVariables.get("baseUrl");
const token = pm.environment.get("accessToken") || pm.collectionVariables.get("accessToken");
```

## Write chained values

```javascript
const json = pm.response.json();
pm.collectionVariables.set("createdUserId", String(json.id));
```

## Dynamic test data

```javascript
const suffix = `${Date.now()}-${pm.variables.replaceIn('{{$randomInt}}')}`;
pm.collectionVariables.set("uniqueEmail", `qa.${suffix}@example.com`);
pm.collectionVariables.set("dynamicFirstName", `QA${pm.variables.replaceIn('{{$randomFirstName}}')}`);
```

## Scope guidance

Use local variables for temporary calculations, data variables for runner datasets, environment variables for deployment-specific configuration, and collection variables for values shared within one portable collection.
