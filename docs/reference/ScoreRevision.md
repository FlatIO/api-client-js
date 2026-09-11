
# ScoreRevision

A score revision metadata

## Properties

Name | Type
------------ | -------------
`id` | string
`user` | string
`score` | string
`collaborators` | Array&lt;string&gt;
`date` | Date
`event` | string
`description` | string
`autosave` | boolean
`statistics` | [ScoreRevisionStatistics](ScoreRevisionStatistics.md)

## Example

```typescript
import type { ScoreRevision } from 'flat-api'

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "user": null,
  "score": null,
  "collaborators": null,
  "date": null,
  "event": null,
  "description": null,
  "autosave": null,
  "statistics": null,
} satisfies ScoreRevision

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as ScoreRevision
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


