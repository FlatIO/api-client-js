
# CollectionCapabilities

Capabilities the current user has on this collection. Each capability corresponds to a fine-grained action that a user may take.

## Properties

Name | Type
------------ | -------------
`canEdit` | boolean
`canShare` | boolean
`canDelete` | boolean
`canAddScores` | boolean
`canDeleteScores` | boolean

## Example

```typescript
import type { CollectionCapabilities } from 'flat-api'

// TODO: Update the object below with actual values
const example = {
  "canEdit": null,
  "canShare": null,
  "canDelete": null,
  "canAddScores": null,
  "canDeleteScores": null,
} satisfies CollectionCapabilities

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as CollectionCapabilities
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


