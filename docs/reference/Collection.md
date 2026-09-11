
# Collection

Collection of scores

## Properties

Name | Type
------------ | -------------
`id` | string
`title` | string
`htmlUrl` | string
`type` | [CollectionType](CollectionType.md)
`labelKey` | string
`privacy` | [CollectionPrivacy](CollectionPrivacy.md)
`sharingKey` | string
`app` | [CollectionApp](CollectionApp.md)
`creationDate` | Date
`modificationDate` | Date
`user` | [UserPublicSummary](UserPublicSummary.md)
`organization` | string
`rights` | [ResourceRights](ResourceRights.md)
`collaborators` | [Array&lt;ResourceCollaborator&gt;](ResourceCollaborator.md)
`isPinned` | boolean
`contents` | [CollectionContents](CollectionContents.md)
`capabilities` | [CollectionCapabilities](CollectionCapabilities.md)
`collections` | Array&lt;string&gt;

## Example

```typescript
import type { Collection } from 'flat-api'

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "title": null,
  "htmlUrl": null,
  "type": null,
  "labelKey": null,
  "privacy": null,
  "sharingKey": null,
  "app": null,
  "creationDate": null,
  "modificationDate": null,
  "user": null,
  "organization": null,
  "rights": null,
  "collaborators": null,
  "isPinned": null,
  "contents": null,
  "capabilities": null,
  "collections": null,
} satisfies Collection

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as Collection
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


