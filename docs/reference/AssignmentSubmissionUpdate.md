
# AssignmentSubmissionUpdate

Assignment Submission creation

## Properties

Name | Type
------------ | -------------
`attachments` | [Array&lt;ClassAttachmentCreation&gt;](ClassAttachmentCreation.md)
`playback` | [Array&lt;AssignmentSubmissionPlayback&gt;](AssignmentSubmissionPlayback.md)
`submit` | boolean
`draftGrade` | number
`grade` | number
`exercisesIds` | Array&lt;string&gt;
`_return` | boolean

## Example

```typescript
import type { AssignmentSubmissionUpdate } from 'flat-api'

// TODO: Update the object below with actual values
const example = {
  "attachments": null,
  "playback": null,
  "submit": null,
  "draftGrade": null,
  "grade": null,
  "exercisesIds": null,
  "_return": null,
} satisfies AssignmentSubmissionUpdate

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as AssignmentSubmissionUpdate
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


