
# OrganizationInvitation

Details of an invitation to join an organization

## Properties

Name | Type
------------ | -------------
`id` | string
`creationDate` | Date
`organization` | string
`organizationRole` | [OrganizationRoles](OrganizationRoles.md)
`customCode` | string
`email` | string
`invitedBy` | string
`htmlUrl` | string
`allowMultipleUse` | boolean
`usedBy` | Array&lt;string&gt;

## Example

```typescript
import type { OrganizationInvitation } from 'flat-api'

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "creationDate": null,
  "organization": null,
  "organizationRole": null,
  "customCode": null,
  "email": null,
  "invitedBy": null,
  "htmlUrl": null,
  "allowMultipleUse": null,
  "usedBy": null,
} satisfies OrganizationInvitation

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as OrganizationInvitation
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


