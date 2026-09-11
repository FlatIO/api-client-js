
# FlatErrorResponse

An API Error response

## Properties

Name | Type
------------ | -------------
`code` | string
`message` | string
`id` | string
`param` | string
`providerMessage` | string

## Example

```typescript
import type { FlatErrorResponse } from 'flat-api'

// TODO: Update the object below with actual values
const example = {
  "code": null,
  "message": null,
  "id": null,
  "param": null,
  "providerMessage": null,
} satisfies FlatErrorResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as FlatErrorResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


