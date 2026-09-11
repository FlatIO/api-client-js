
# UserAdminUpdate

User update as an organization admin

## Properties

Name | Type
------------ | -------------
`password` | string
`organizationRole` | [OrganizationRoles](OrganizationRoles.md)
`username` | string
`firstname` | string
`lastname` | string
`email` | string

## Example

```typescript
import type { UserAdminUpdate } from 'flat-api'

// TODO: Update the object below with actual values
const example = {
  "password": null,
  "organizationRole": null,
  "username": null,
  "firstname": null,
  "lastname": null,
  "email": null,
} satisfies UserAdminUpdate

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as UserAdminUpdate
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


