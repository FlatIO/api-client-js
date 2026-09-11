
# LtiConfigurationCreate

Request to create a new LTI configuration (unified 1.1 and 1.3)

## Properties

Name | Type
------------ | -------------
`mode` | string
`name` | string
`lms` | string
`platformInfo` | [LtiConfigurationCreate1p3DynamicPlatformInfo](LtiConfigurationCreate1p3DynamicPlatformInfo.md)
`locale` | string
`deploymentType` | string
`deploymentId` | string
`clientId` | string
`deploymentBreakdownId` | string
`platformIss` | string
`platformName` | string
`accessTokenUrl` | string
`authorizationUrl` | string
`jwksUrl` | string
`enableEmailMatching` | boolean

## Example

```typescript
import type { LtiConfigurationCreate } from 'flat-api'

// TODO: Update the object below with actual values
const example = {
  "mode": null,
  "name": null,
  "lms": null,
  "platformInfo": null,
  "locale": null,
  "deploymentType": null,
  "deploymentId": null,
  "clientId": null,
  "deploymentBreakdownId": null,
  "platformIss": null,
  "platformName": null,
  "accessTokenUrl": null,
  "authorizationUrl": null,
  "jwksUrl": null,
  "enableEmailMatching": null,
} satisfies LtiConfigurationCreate

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as LtiConfigurationCreate
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


