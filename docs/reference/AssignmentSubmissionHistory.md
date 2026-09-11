
# AssignmentSubmissionHistory

History item of the submission

## Properties

Name | Type
------------ | -------------
`date` | Date
`classroom` | string
`assignment` | string
`submission` | string
`users` | Array&lt;string&gt;
`source` | string
`state` | [AssignmentSubmissionHistoryState](AssignmentSubmissionHistoryState.md)
`draftGrade` | number
`grade` | number
`maxPoints` | number
`comment` | string
`dueDate` | Date
`attachment` | [AssignmentSubmissionHistoryAttachment](AssignmentSubmissionHistoryAttachment.md)

## Example

```typescript
import type { AssignmentSubmissionHistory } from 'flat-api'

// TODO: Update the object below with actual values
const example = {
  "date": null,
  "classroom": null,
  "assignment": null,
  "submission": null,
  "users": null,
  "source": null,
  "state": null,
  "draftGrade": null,
  "grade": null,
  "maxPoints": null,
  "comment": null,
  "dueDate": null,
  "attachment": null,
} satisfies AssignmentSubmissionHistory

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as AssignmentSubmissionHistory
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


