
# LtiCredentialsCreation

Creation of a couple of LTI 1.x OAuth credentials

## Properties

Name | Type
------------ | -------------
`name` | string
`lms` | [LmsName](LmsName.md)

## Example

```typescript
import type { LtiCredentialsCreation } from 'flat-api'

// TODO: Update the object below with actual values
const example = {
  "name": null,
  "lms": null,
} satisfies LtiCredentialsCreation

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as LtiCredentialsCreation
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


