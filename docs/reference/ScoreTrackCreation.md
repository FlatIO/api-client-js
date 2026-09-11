
# ScoreTrackCreation

Creation of a new track. This one must contain the URL of the track or the corresponding file 

## Properties

Name | Type
------------ | -------------
`title` | string
`_default` | boolean
`state` | [ScoreTrackState](ScoreTrackState.md)
`purpose` | [ScoreTrackPurpose](ScoreTrackPurpose.md)
`url` | string
`synchronizationPoints` | [Array&lt;ScoreTrackPoint&gt;](ScoreTrackPoint.md)

## Example

```typescript
import type { ScoreTrackCreation } from 'flat-api'

// TODO: Update the object below with actual values
const example = {
  "title": null,
  "_default": null,
  "state": null,
  "purpose": null,
  "url": null,
  "synchronizationPoints": null,
} satisfies ScoreTrackCreation

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as ScoreTrackCreation
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


