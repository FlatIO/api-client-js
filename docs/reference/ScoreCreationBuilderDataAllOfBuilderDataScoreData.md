
# ScoreCreationBuilderDataAllOfBuilderDataScoreData


## Properties

Name | Type
------------ | -------------
`useTabStaff` | boolean
`useChordGrid` | boolean
`fifths` | number
`nbBeats` | number
`beatType` | number
`instruments` | [Array&lt;ScoreCreationBuilderDataAllOfBuilderDataScoreDataInstruments&gt;](ScoreCreationBuilderDataAllOfBuilderDataScoreDataInstruments.md)

## Example

```typescript
import type { ScoreCreationBuilderDataAllOfBuilderDataScoreData } from 'flat-api'

// TODO: Update the object below with actual values
const example = {
  "useTabStaff": null,
  "useChordGrid": null,
  "fifths": null,
  "nbBeats": null,
  "beatType": null,
  "instruments": null,
} satisfies ScoreCreationBuilderDataAllOfBuilderDataScoreData

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as ScoreCreationBuilderDataAllOfBuilderDataScoreData
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


