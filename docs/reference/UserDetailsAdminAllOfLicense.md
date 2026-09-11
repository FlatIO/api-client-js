
# UserDetailsAdminAllOfLicense

Current active license of the user

## Properties

Name | Type
------------ | -------------
`id` | string
`expirationDate` | Date
`source` | [LicenseSources](LicenseSources.md)
`mode` | [LicenseMode](LicenseMode.md)
`active` | boolean

## Example

```typescript
import type { UserDetailsAdminAllOfLicense } from 'flat-api'

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "expirationDate": null,
  "source": null,
  "mode": null,
  "active": null,
} satisfies UserDetailsAdminAllOfLicense

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as UserDetailsAdminAllOfLicense
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


