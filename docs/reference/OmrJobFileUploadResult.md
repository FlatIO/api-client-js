
# OmrJobFileUploadResult

Result of adding a file to a draft job.

## Properties

Name | Type
------------ | -------------
`fileIndex` | number
`fileCount` | number

## Example

```typescript
import type { OmrJobFileUploadResult } from 'flat-api'

// TODO: Update the object below with actual values
const example = {
  "fileIndex": null,
  "fileCount": null,
} satisfies OmrJobFileUploadResult

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as OmrJobFileUploadResult
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


