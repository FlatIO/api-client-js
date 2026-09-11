
# OrganizationUserAccessTokenCreation

Creation of a delegated API access token for an organization user

## Properties

Name | Type
------------ | -------------
`scopes` | [Array&lt;AppScopes&gt;](AppScopes.md)

## Example

```typescript
import type { OrganizationUserAccessTokenCreation } from 'flat-api'

// TODO: Update the object below with actual values
const example = {
  "scopes": null,
} satisfies OrganizationUserAccessTokenCreation

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as OrganizationUserAccessTokenCreation
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


