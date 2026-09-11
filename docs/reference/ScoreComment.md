
# ScoreComment

Comment added on a sheet music

## Properties

Name | Type
------------ | -------------
`id` | string
`type` | string
`user` | string
`score` | string
`revision` | string
`replyTo` | string
`date` | Date
`modificationDate` | Date
`comment` | string
`rawComment` | string
`context` | [ScoreCommentContext](ScoreCommentContext.md)
`mentions` | Array&lt;string&gt;
`resolved` | boolean
`resolvedBy` | string
`moderation` | [ScoreCommentModeration](ScoreCommentModeration.md)
`spam` | boolean

## Example

```typescript
import type { ScoreComment } from 'flat-api'

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "type": null,
  "user": null,
  "score": null,
  "revision": null,
  "replyTo": null,
  "date": null,
  "modificationDate": null,
  "comment": null,
  "rawComment": null,
  "context": null,
  "mentions": null,
  "resolved": null,
  "resolvedBy": null,
  "moderation": null,
  "spam": null,
} satisfies ScoreComment

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as ScoreComment
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


