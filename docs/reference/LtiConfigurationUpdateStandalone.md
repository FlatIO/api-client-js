
# LtiConfigurationUpdateStandalone

Update fields allowed for standalone (manual/dynamic) configurations

## Properties

Name | Type
------------ | -------------
`deploymentId` | string
`platformIss` | string
`platformName` | string
`clientId` | string
`accessTokenUrl` | string
`authorizationUrl` | string
`jwksUrl` | string
`enableEmailMatching` | boolean

## Example

```typescript
import type { LtiConfigurationUpdateStandalone } from 'flat-api'

// TODO: Update the object below with actual values
const example = {
  "deploymentId": null,
  "platformIss": null,
  "platformName": null,
  "clientId": null,
  "accessTokenUrl": null,
  "authorizationUrl": null,
  "jwksUrl": null,
  "enableEmailMatching": null,
} satisfies LtiConfigurationUpdateStandalone

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as LtiConfigurationUpdateStandalone
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


