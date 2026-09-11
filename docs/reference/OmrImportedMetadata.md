
# OmrImportedMetadata

Metadata extracted from the recognized score.

## Properties

Name | Type
------------ | -------------
`instruments` | Array&lt;string&gt;
`numberMeasures` | number
`mainTempoQpm` | number
`mainKeySignature` | number

## Example

```typescript
import type { OmrImportedMetadata } from 'flat-api'

// TODO: Update the object below with actual values
const example = {
  "instruments": null,
  "numberMeasures": null,
  "mainTempoQpm": null,
  "mainKeySignature": null,
} satisfies OmrImportedMetadata

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as OmrImportedMetadata
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


