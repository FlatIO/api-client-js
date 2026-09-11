
# EduResourceCreation

Creation of an education resource

## Properties

Name | Type
------------ | -------------
`type` | [EduResourceType](EduResourceType.md)
`title` | string
`parent` | string
`sharingDescription` | string
`sharingDescriptionHtml` | string
`resource` | [EduResourceAssignmentCreation](EduResourceAssignmentCreation.md)

## Example

```typescript
import type { EduResourceCreation } from 'flat-api'

// TODO: Update the object below with actual values
const example = {
  "type": null,
  "title": null,
  "parent": null,
  "sharingDescription": null,
  "sharingDescriptionHtml": null,
  "resource": null,
} satisfies EduResourceCreation

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as EduResourceCreation
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


