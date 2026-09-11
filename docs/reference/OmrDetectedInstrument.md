
# OmrDetectedInstrument

One detected part.

## Properties

Name | Type
------------ | -------------
`index` | number
`partName` | string
`instrumentId` | string
`instrumentName` | string
`midiProgram` | number
`transposeKey` | string
`resolvedConfidence` | string

## Example

```typescript
import type { OmrDetectedInstrument } from 'flat-api'

// TODO: Update the object below with actual values
const example = {
  "index": null,
  "partName": null,
  "instrumentId": null,
  "instrumentName": null,
  "midiProgram": null,
  "transposeKey": null,
  "resolvedConfidence": null,
} satisfies OmrDetectedInstrument

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as OmrDetectedInstrument
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


