
# LtiConfigurationCreate1p3Dynamic

LTI 1.3 dynamic registration configuration creation

## Properties

Name | Type
------------ | -------------
`mode` | string
`platformInfo` | [LtiConfigurationCreate1p3DynamicPlatformInfo](LtiConfigurationCreate1p3DynamicPlatformInfo.md)
`locale` | string

## Example

```typescript
import type { LtiConfigurationCreate1p3Dynamic } from 'flat-api'

// TODO: Update the object below with actual values
const example = {
  "mode": null,
  "platformInfo": null,
  "locale": null,
} satisfies LtiConfigurationCreate1p3Dynamic

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as LtiConfigurationCreate1p3Dynamic
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


