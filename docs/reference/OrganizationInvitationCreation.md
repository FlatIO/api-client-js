
# OrganizationInvitationCreation

The parameters to create an organization invitation

## Properties

Name | Type
------------ | -------------
`email` | string
`organizationRole` | string

## Example

```typescript
import type { OrganizationInvitationCreation } from 'flat-api'

// TODO: Update the object below with actual values
const example = {
  "email": null,
  "organizationRole": null,
} satisfies OrganizationInvitationCreation

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as OrganizationInvitationCreation
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


