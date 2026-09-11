
# LtiConfiguration

LTI configuration details (unified 1.1 and 1.3)

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
`tool` | [LtiConfiguration1p3BaseTool](LtiConfiguration1p3BaseTool.md)
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
`publicKeysetUrl` | string
`initiateLoginUrl` | string
`redirectUris` | Array&lt;string&gt;
`enableEmailMatching` | boolean
`parentId` | string
`deploymentKey` | string
`deploymentBreakdownBy` | string
`deploymentBreakdownId` | string
`registrationToken` | string
`registrationUrl` | string
`registrationTokenUsed` | boolean
`registrationCompletionDate` | Date

## Example

```typescript
import type { LtiConfiguration } from 'flat-api'

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
  "publicKeysetUrl": null,
  "initiateLoginUrl": null,
  "redirectUris": null,
  "enableEmailMatching": null,
  "parentId": null,
  "deploymentKey": null,
  "deploymentBreakdownBy": null,
  "deploymentBreakdownId": null,
  "registrationToken": null,
  "registrationUrl": null,
  "registrationTokenUsed": null,
  "registrationCompletionDate": null,
} satisfies LtiConfiguration

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as LtiConfiguration
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


