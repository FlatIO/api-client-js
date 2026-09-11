
# ScoreTrack

An audio track for a score

## Properties

Name | Type
------------ | -------------
`id` | string
`title` | string
`score` | string
`creator` | string
`creationDate` | Date
`modificationDate` | Date
`_default` | boolean
`state` | [ScoreTrackState](ScoreTrackState.md)
`type` | [ScoreTrackType](ScoreTrackType.md)
`purpose` | [ScoreTrackPurpose](ScoreTrackPurpose.md)
`url` | string
`mediaId` | string
`synchronizationPoints` | [Array&lt;ScoreTrackPoint&gt;](ScoreTrackPoint.md)

## Example

```typescript
import type { ScoreTrack } from 'flat-api'

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "title": null,
  "score": null,
  "creator": null,
  "creationDate": null,
  "modificationDate": null,
  "_default": null,
  "state": null,
  "type": null,
  "purpose": null,
  "url": null,
  "mediaId": null,
  "synchronizationPoints": null,
} satisfies ScoreTrack

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as ScoreTrack
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


