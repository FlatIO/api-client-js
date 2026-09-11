
# LtiConfiguration1p3BaseSupportedServices

LTI services support information

## Properties

Name | Type
------------ | -------------
`ags` | [LtiConfiguration1p3BaseSupportedServicesAgs](LtiConfiguration1p3BaseSupportedServicesAgs.md)
`nrps` | [LtiConfiguration1p3BaseSupportedServicesNrps](LtiConfiguration1p3BaseSupportedServicesNrps.md)
`deepLinking` | [LtiConfiguration1p3BaseSupportedServicesDeepLinking](LtiConfiguration1p3BaseSupportedServicesDeepLinking.md)

## Example

```typescript
import type { LtiConfiguration1p3BaseSupportedServices } from 'flat-api'

// TODO: Update the object below with actual values
const example = {
  "ags": null,
  "nrps": null,
  "deepLinking": null,
} satisfies LtiConfiguration1p3BaseSupportedServices

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as LtiConfiguration1p3BaseSupportedServices
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


