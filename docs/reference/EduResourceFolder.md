
# EduResourceFolder

Education resources folder

## Properties

Name | Type
------------ | -------------
`title` | string
`assignmentsTypes` | [Array&lt;AssignmentType&gt;](AssignmentType.md)
`resourcesCount` | number

## Example

```typescript
import type { EduResourceFolder } from 'flat-api'

// TODO: Update the object below with actual values
const example = {
  "title": null,
  "assignmentsTypes": null,
  "resourcesCount": null,
} satisfies EduResourceFolder

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as EduResourceFolder
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


