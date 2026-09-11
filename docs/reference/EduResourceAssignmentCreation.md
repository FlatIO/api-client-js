
# EduResourceAssignmentCreation

Assignment-specific creation options. Only applicable when creating a resource with `type: assignment`. If `type` is not provided, defaults to `none`. 

## Properties

Name | Type
------------ | -------------
`type` | [AssignmentType](AssignmentType.md)

## Example

```typescript
import type { EduResourceAssignmentCreation } from 'flat-api'

// TODO: Update the object below with actual values
const example = {
  "type": null,
} satisfies EduResourceAssignmentCreation

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as EduResourceAssignmentCreation
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


