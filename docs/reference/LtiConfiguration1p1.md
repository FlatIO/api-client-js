
# LtiConfiguration1p1


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
`consumerKey` | string
`consumerSecret` | string
`lms` | string
`name` | string
`tool` | [LtiConfiguration1p1AllOfTool](LtiConfiguration1p1AllOfTool.md)

## Example

```typescript
import type { LtiConfiguration1p1 } from 'flat-api'

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
  "consumerKey": null,
  "consumerSecret": null,
  "lms": null,
  "name": null,
  "tool": null,
} satisfies LtiConfiguration1p1

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as LtiConfiguration1p1
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


