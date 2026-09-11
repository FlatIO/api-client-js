
# LtiConfigurationBase


## Properties

Name | Type
------------ | -------------
`id` | string
`ltiVersion` | string
`organizationId` | string
`organizationName` | string
`creatorId` | string
`creationDate` | Date
`lastUsedDate` | Date
`status` | string

## Example

```typescript
import type { LtiConfigurationBase } from 'flat-api'

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "ltiVersion": null,
  "organizationId": null,
  "organizationName": null,
  "creatorId": null,
  "creationDate": null,
  "lastUsedDate": null,
  "status": null,
} satisfies LtiConfigurationBase

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as LtiConfigurationBase
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


