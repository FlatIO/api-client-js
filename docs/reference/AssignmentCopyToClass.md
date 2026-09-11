
# AssignmentCopyToClass

Copy the assignment to a class

## Properties

Name | Type
------------ | -------------
`classroom` | string
`assignment` | string
`scheduledDate` | Date

## Example

```typescript
import type { AssignmentCopyToClass } from 'flat-api'

// TODO: Update the object below with actual values
const example = {
  "classroom": null,
  "assignment": null,
  "scheduledDate": null,
} satisfies AssignmentCopyToClass

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as AssignmentCopyToClass
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


