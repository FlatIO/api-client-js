
# AssignmentSubmission

Assignment Submission

## Properties

Name | Type
------------ | -------------
`id` | string
`state` | [AssignmentSubmissionState](AssignmentSubmissionState.md)
`classroom` | string
`assignment` | string
`creator` | string
`creationDate` | string
`attachments` | [Array&lt;MediaAttachment&gt;](MediaAttachment.md)
`submissionDate` | string
`returnDate` | string
`returnCreator` | string
`grade` | number
`draftGrade` | number
`maxPoints` | number
`exercisesIds` | Array&lt;string&gt;
`playback` | [Array&lt;AssignmentSubmissionPlayback&gt;](AssignmentSubmissionPlayback.md)
`comments` | [AssignmentSubmissionComments](AssignmentSubmissionComments.md)
`googleClassroom` | [GoogleClassroomSubmission](GoogleClassroomSubmission.md)
`microsoftGraph` | [MicrosoftGraphSubmission](MicrosoftGraphSubmission.md)
`lti` | [AssignmentSubmissionLti](AssignmentSubmissionLti.md)

## Example

```typescript
import type { AssignmentSubmission } from 'flat-api'

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "state": null,
  "classroom": null,
  "assignment": null,
  "creator": null,
  "creationDate": null,
  "attachments": null,
  "submissionDate": null,
  "returnDate": null,
  "returnCreator": null,
  "grade": null,
  "draftGrade": null,
  "maxPoints": null,
  "exercisesIds": null,
  "playback": null,
  "comments": null,
  "googleClassroom": null,
  "microsoftGraph": null,
  "lti": null,
} satisfies AssignmentSubmission

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as AssignmentSubmission
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


