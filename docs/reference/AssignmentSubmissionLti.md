
# AssignmentSubmissionLti

If set, this submission has a linked LTI 1.3 AGS or LTI 1.1 Outcomes

## Properties

Name | Type
------------ | -------------
`gradeService` | string
`sourcedid` | string

## Example

```typescript
import type { AssignmentSubmissionLti } from 'flat-api'

// TODO: Update the object below with actual values
const example = {
  "gradeService": null,
  "sourcedid": null,
} satisfies AssignmentSubmissionLti

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as AssignmentSubmissionLti
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


