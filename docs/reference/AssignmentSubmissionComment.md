
# AssignmentSubmissionComment

Feedback comment added to an assignment submission

## Properties

Name | Type
------------ | -------------
`id` | string
`user` | string
`submission` | string
`date` | Date
`modificationDate` | Date
`comment` | string
`unread` | boolean

## Example

```typescript
import type { AssignmentSubmissionComment } from 'flat-api'

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "user": null,
  "submission": null,
  "date": null,
  "modificationDate": null,
  "comment": null,
  "unread": null,
} satisfies AssignmentSubmissionComment

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as AssignmentSubmissionComment
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


