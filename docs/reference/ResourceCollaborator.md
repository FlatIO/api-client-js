
# ResourceCollaborator

A collaborator of a score. The `userEmail` and `group` are only available if the requesting user is a collaborator of the related score (otherwise these permissions are not listed or exposed publicly). 

## Properties

Name | Type
------------ | -------------
`aclRead` | boolean
`aclWrite` | boolean
`aclAdmin` | boolean
`isCollaborator` | boolean
`collaboratorType` | string
`id` | string
`date` | Date
`score` | string
`collection` | string
`user` | [UserPublic](UserPublic.md)
`group` | [Group](Group.md)
`userEmail` | string
`invited` | boolean

## Example

```typescript
import type { ResourceCollaborator } from 'flat-api'

// TODO: Update the object below with actual values
const example = {
  "aclRead": null,
  "aclWrite": null,
  "aclAdmin": null,
  "isCollaborator": null,
  "collaboratorType": null,
  "id": null,
  "date": null,
  "score": null,
  "collection": null,
  "user": null,
  "group": null,
  "userEmail": null,
  "invited": null,
} satisfies ResourceCollaborator

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as ResourceCollaborator
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


