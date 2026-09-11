
# EduResourceUpdate

Update of an education resource

## Properties

Name | Type
------------ | -------------
`title` | string
`sharingDescription` | string
`sharingDescriptionHtml` | string
`privacy` | [EduResourcePrivacy](EduResourcePrivacy.md)
`subjects` | [Array&lt;TeachingTheme&gt;](TeachingTheme.md)
`grades` | [Array&lt;Grade&gt;](Grade.md)

## Example

```typescript
import type { EduResourceUpdate } from 'flat-api'

// TODO: Update the object below with actual values
const example = {
  "title": null,
  "sharingDescription": null,
  "sharingDescriptionHtml": null,
  "privacy": null,
  "subjects": null,
  "grades": null,
} satisfies EduResourceUpdate

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as EduResourceUpdate
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


