
# ScoreCommentCreation

Creation of a comment

## Properties

Name | Type
------------ | -------------
`revision` | string
`comment` | string
`rawComment` | string
`mentions` | Array&lt;string&gt;
`replyTo` | string
`context` | [ScoreCommentContext](ScoreCommentContext.md)

## Example

```typescript
import type { ScoreCommentCreation } from 'flat-api'

// TODO: Update the object below with actual values
const example = {
  "revision": null,
  "comment": null,
  "rawComment": null,
  "mentions": null,
  "replyTo": null,
  "context": null,
} satisfies ScoreCommentCreation

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as ScoreCommentCreation
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


