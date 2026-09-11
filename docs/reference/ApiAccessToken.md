
# ApiAccessToken

An API access token

## Properties

Name | Type
------------ | -------------
`id` | string
`name` | string
`token` | string
`issuedDate` | Date
`expirationDate` | Date
`scopes` | [Array&lt;AppScopes&gt;](AppScopes.md)

## Example

```typescript
import type { ApiAccessToken } from 'flat-api'

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "name": null,
  "token": null,
  "issuedDate": null,
  "expirationDate": null,
  "scopes": null,
} satisfies ApiAccessToken

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as ApiAccessToken
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


