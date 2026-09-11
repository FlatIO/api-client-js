
# OmrJobProgress

Live progress while the job is processing.

## Properties

Name | Type
------------ | -------------
`percent` | number
`text` | string
`key` | string

## Example

```typescript
import type { OmrJobProgress } from 'flat-api'

// TODO: Update the object below with actual values
const example = {
  "percent": null,
  "text": null,
  "key": null,
} satisfies OmrJobProgress

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as OmrJobProgress
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


