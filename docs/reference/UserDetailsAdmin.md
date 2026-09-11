
# UserDetailsAdmin

User details (view for organization teacher / admin)

## Properties

Name | Type
------------ | -------------
`id` | string
`type` | string
`product` | [TutteoProduct](TutteoProduct.md)
`username` | string
`printableName` | string
`firstname` | string
`lastname` | string
`name` | string
`picture` | string
`badges` | Array&lt;string&gt;
`organization` | string
`organizationRole` | [OrganizationRoles](OrganizationRoles.md)
`classRole` | [ClassRoles](ClassRoles.md)
`htmlUrl` | string
`email` | string
`lastActivityDate` | Date
`license` | [UserDetailsAdminAllOfLicense](UserDetailsAdminAllOfLicense.md)
`groups` | Array&lt;string&gt;
`isEduTestingStudent` | boolean

## Example

```typescript
import type { UserDetailsAdmin } from 'flat-api'

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "type": null,
  "product": null,
  "username": null,
  "printableName": null,
  "firstname": null,
  "lastname": null,
  "name": null,
  "picture": null,
  "badges": null,
  "organization": null,
  "organizationRole": null,
  "classRole": null,
  "htmlUrl": null,
  "email": null,
  "lastActivityDate": null,
  "license": null,
  "groups": null,
  "isEduTestingStudent": null,
} satisfies UserDetailsAdmin

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as UserDetailsAdmin
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


