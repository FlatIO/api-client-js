
# OmrJobFileMetadata

Metadata about the uploaded input.

## Properties

Name | Type
------------ | -------------
`numberOfPages` | number
`fileCount` | number
`filename` | string
`fileSize` | number
`mimeType` | string
`fileExtension` | string

## Example

```typescript
import type { OmrJobFileMetadata } from 'flat-api'

// TODO: Update the object below with actual values
const example = {
  "numberOfPages": null,
  "fileCount": null,
  "filename": null,
  "fileSize": null,
  "mimeType": null,
  "fileExtension": null,
} satisfies OmrJobFileMetadata

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as OmrJobFileMetadata
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


