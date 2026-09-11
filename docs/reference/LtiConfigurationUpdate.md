
# LtiConfigurationUpdate

Update an existing LTI 1.3 configuration (deployment clone or standalone)

## Properties

Name | Type
------------ | -------------
`deploymentId` | string
`deploymentBreakdownId` | string
`enableEmailMatching` | boolean
`platformIss` | string
`platformName` | string
`clientId` | string
`accessTokenUrl` | string
`authorizationUrl` | string
`jwksUrl` | string

## Example

```typescript
import type { LtiConfigurationUpdate } from 'flat-api'

// TODO: Update the object below with actual values
const example = {
  "deploymentId": null,
  "deploymentBreakdownId": null,
  "enableEmailMatching": null,
  "platformIss": null,
  "platformName": null,
  "clientId": null,
  "accessTokenUrl": null,
  "authorizationUrl": null,
  "jwksUrl": null,
} satisfies LtiConfigurationUpdate

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as LtiConfigurationUpdate
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


