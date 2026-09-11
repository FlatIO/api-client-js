
# LtiConfiguration1p3Manual


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
`mode` | string
`platformIss` | string
`platformName` | string
`clientId` | string
`deploymentId` | string
`accessTokenUrl` | string
`authorizationUrl` | string
`jwksUrl` | string
`deploymentMode` | string
`supportedServices` | [LtiConfiguration1p3BaseSupportedServices](LtiConfiguration1p3BaseSupportedServices.md)
`tool` | [LtiConfiguration1p3BaseTool](LtiConfiguration1p3BaseTool.md)
`publicKeysetUrl` | string
`initiateLoginUrl` | string
`redirectUris` | Array&lt;string&gt;
`enableEmailMatching` | boolean

## Example

```typescript
import type { LtiConfiguration1p3Manual } from 'flat-api'

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
  "mode": null,
  "platformIss": null,
  "platformName": null,
  "clientId": null,
  "deploymentId": null,
  "accessTokenUrl": null,
  "authorizationUrl": null,
  "jwksUrl": null,
  "deploymentMode": null,
  "supportedServices": null,
  "tool": null,
  "publicKeysetUrl": null,
  "initiateLoginUrl": null,
  "redirectUris": null,
  "enableEmailMatching": null,
} satisfies LtiConfiguration1p3Manual

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as LtiConfiguration1p3Manual
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


