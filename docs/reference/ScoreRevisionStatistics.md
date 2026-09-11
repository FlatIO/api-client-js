
# ScoreRevisionStatistics

The statistics related to the score revision (additions and deletions) 

## Properties

Name | Type
------------ | -------------
`additions` | number
`deletions` | number
`startDate` | Date
`endDate` | Date

## Example

```typescript
import type { ScoreRevisionStatistics } from 'flat-api'

// TODO: Update the object below with actual values
const example = {
  "additions": null,
  "deletions": null,
  "startDate": null,
  "endDate": null,
} satisfies ScoreRevisionStatistics

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as ScoreRevisionStatistics
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


