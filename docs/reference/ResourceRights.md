
# ResourceRights

The rights of the current user on a score or collection

## Properties

Name | Type
------------ | -------------
`aclRead` | boolean
`aclWrite` | boolean
`aclAdmin` | boolean
`isCollaborator` | boolean
`collaboratorType` | string

## Example

```typescript
import type { ResourceRights } from 'flat-api'

// TODO: Update the object below with actual values
const example = {
  "aclRead": null,
  "aclWrite": null,
  "aclAdmin": null,
  "isCollaborator": null,
  "collaboratorType": null,
} satisfies ResourceRights

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as ResourceRights
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


