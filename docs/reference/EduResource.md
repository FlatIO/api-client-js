
# EduResource

A Flat for Education resource contained in a resources library

## Properties

Name | Type
------------ | -------------
`id` | string
`creator` | string
`type` | [EduResourceType](EduResourceType.md)
`privacy` | [EduResourcePrivacy](EduResourcePrivacy.md)
`tags` | Array&lt;string&gt;
`parent` | string
`title` | string
`sharingDescription` | string
`sharingDescriptionHtml` | string
`creationDate` | Date
`updateDate` | Date
`resource` | [EduResourceResource](EduResourceResource.md)
`capabilities` | [EduResourceCapabilities](EduResourceCapabilities.md)
`subjects` | [Array&lt;TeachingTheme&gt;](TeachingTheme.md)
`grades` | [Array&lt;Grade&gt;](Grade.md)

## Example

```typescript
import type { EduResource } from 'flat-api'

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "creator": null,
  "type": null,
  "privacy": null,
  "tags": null,
  "parent": null,
  "title": null,
  "sharingDescription": null,
  "sharingDescriptionHtml": null,
  "creationDate": null,
  "updateDate": null,
  "resource": null,
  "capabilities": null,
  "subjects": null,
  "grades": null,
} satisfies EduResource

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as EduResource
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


