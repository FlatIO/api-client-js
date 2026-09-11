
# AssignmentSubmissionPlayback

Playback used by a student for an assignment submission.

## Properties

Name | Type
------------ | -------------
`score` | string
`nbPlayAttempt` | number

## Example

```typescript
import type { AssignmentSubmissionPlayback } from 'flat-api'

// TODO: Update the object below with actual values
const example = {
  "score": null,
  "nbPlayAttempt": null,
} satisfies AssignmentSubmissionPlayback

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as AssignmentSubmissionPlayback
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


