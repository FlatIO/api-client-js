
# ScoreRevisionCreation

A new created revision

## Properties

Name | Type
------------ | -------------
`data` | string
`dataEncoding` | string
`autosave` | boolean
`description` | string

## Example

```typescript
import type { ScoreRevisionCreation } from 'flat-api'

// TODO: Update the object below with actual values
const example = {
  "data": <score-partwise version="3.0"></score-partwise>,
  "dataEncoding": null,
  "autosave": null,
  "description": null,
} satisfies ScoreRevisionCreation

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as ScoreRevisionCreation
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


