
# ScoreTrackPoint

A track synchronization point

## Properties

Name | Type
------------ | -------------
`type` | string
`measureUuid` | string
`time` | number

## Example

```typescript
import type { ScoreTrackPoint } from 'flat-api'

// TODO: Update the object below with actual values
const example = {
  "type": null,
  "measureUuid": null,
  "time": null,
} satisfies ScoreTrackPoint

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as ScoreTrackPoint
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


