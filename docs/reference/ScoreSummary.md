
# ScoreSummary

A summary of the score details

## Properties

Name | Type
------------ | -------------
`id` | string
`sharingKey` | string
`title` | string
`privacy` | [ScorePrivacy](ScorePrivacy.md)
`user` | [UserPublic](UserPublic.md)
`htmlUrl` | string

## Example

```typescript
import type { ScoreSummary } from 'flat-api'

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "sharingKey": null,
  "title": null,
  "privacy": null,
  "user": null,
  "htmlUrl": null,
} satisfies ScoreSummary

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as ScoreSummary
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


