
# LtiConfigurationCreate1p3Manual

LTI 1.3 manual configuration creation

## Properties

Name | Type
------------ | -------------
`mode` | string
`platformIss` | string
`platformName` | string
`clientId` | string
`deploymentId` | string
`accessTokenUrl` | string
`authorizationUrl` | string
`jwksUrl` | string
`enableEmailMatching` | boolean

## Example

```typescript
import type { LtiConfigurationCreate1p3Manual } from 'flat-api'

// TODO: Update the object below with actual values
const example = {
  "mode": null,
  "platformIss": null,
  "platformName": null,
  "clientId": null,
  "deploymentId": null,
  "accessTokenUrl": null,
  "authorizationUrl": null,
  "jwksUrl": null,
  "enableEmailMatching": null,
} satisfies LtiConfigurationCreate1p3Manual

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as LtiConfigurationCreate1p3Manual
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


