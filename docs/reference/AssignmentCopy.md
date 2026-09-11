
# AssignmentCopy


## Properties

Name | Type
------------ | -------------
`classroom` | string
`assignment` | string
`scheduledDate` | Date
`libraryParent` | string
`verifyIfNotAlreadyInResourceLibrary` | boolean

## Example

```typescript
import type { AssignmentCopy } from 'flat-api'

// TODO: Update the object below with actual values
const example = {
  "classroom": null,
  "assignment": null,
  "scheduledDate": null,
  "libraryParent": null,
  "verifyIfNotAlreadyInResourceLibrary": null,
} satisfies AssignmentCopy

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as AssignmentCopy
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


