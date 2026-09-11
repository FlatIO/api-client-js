
# LtiConfigurationCreate1p1

LTI 1.1 manual configuration creation

## Properties

Name | Type
------------ | -------------
`mode` | string
`name` | string
`lms` | string

## Example

```typescript
import type { LtiConfigurationCreate1p1 } from 'flat-api'

// TODO: Update the object below with actual values
const example = {
  "mode": null,
  "name": null,
  "lms": null,
} satisfies LtiConfigurationCreate1p1

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as LtiConfigurationCreate1p1
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


