
# ScoreCommentModeration

Information about the comment being moderated

## Properties

Name | Type
------------ | -------------
`hidden` | boolean
`reason` | string

## Example

```typescript
import type { ScoreCommentModeration } from 'flat-api'

// TODO: Update the object below with actual values
const example = {
  "hidden": null,
  "reason": null,
} satisfies ScoreCommentModeration

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as ScoreCommentModeration
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


