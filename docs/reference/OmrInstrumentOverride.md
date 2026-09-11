
# OmrInstrumentOverride

Override for a single detected part, matched by `index`. Omitted fields keep the detected value.  To set the instrument you may use **either** `instrumentId` (Flat\'s instrument id) **or** `midiProgram` (a standard General MIDI program) — whichever your integration prefers; you do not need both. If both are sent, `instrumentId` wins; otherwise `midiProgram` is resolved to the matching instrument; otherwise the detected instrument is kept. `transposeKey` and `partName` apply independently on top. 

## Properties

Name | Type
------------ | -------------
`index` | number
`instrumentId` | string
`partName` | string
`transposeKey` | string
`midiProgram` | number

## Example

```typescript
import type { OmrInstrumentOverride } from 'flat-api'

// TODO: Update the object below with actual values
const example = {
  "index": null,
  "instrumentId": null,
  "partName": null,
  "transposeKey": null,
  "midiProgram": null,
} satisfies OmrInstrumentOverride

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as OmrInstrumentOverride
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


