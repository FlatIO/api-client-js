
# AssignmentGroup

A group assigned to an assignment for shared writing assignments

## Properties

Name | Type
------------ | -------------
`id` | string
`name` | string
`parent` | string
`members` | Array&lt;string&gt;

## Example

```typescript
import type { AssignmentGroup } from 'flat-api'

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "name": null,
  "parent": null,
  "members": null,
} satisfies AssignmentGroup

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as AssignmentGroup
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


