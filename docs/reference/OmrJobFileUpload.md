
# OmrJobFileUpload

One image or PDF added to a draft job.

## Properties

Name | Type
------------ | -------------
`file` | string
`filename` | string

## Example

```typescript
import type { OmrJobFileUpload } from 'flat-api'

// TODO: Update the object below with actual values
const example = {
  "file": null,
  "filename": null,
} satisfies OmrJobFileUpload

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as OmrJobFileUpload
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


