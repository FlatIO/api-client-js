
# MicrosoftGraphAssignment

A Microsoft Teams assignment

## Properties

Name | Type
------------ | -------------
`id` | string
`state` | string
`alternateLink` | string
`assignDateTime` | Date
`categories` | Array&lt;string&gt;
`assignToType` | string
`assignedStudentsMsIds` | Array&lt;string&gt;

## Example

```typescript
import type { MicrosoftGraphAssignment } from 'flat-api'

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "state": null,
  "alternateLink": null,
  "assignDateTime": null,
  "categories": null,
  "assignToType": null,
  "assignedStudentsMsIds": null,
} satisfies MicrosoftGraphAssignment

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as MicrosoftGraphAssignment
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


