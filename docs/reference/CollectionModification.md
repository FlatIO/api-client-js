
# CollectionModification

Edit the collection metadata

## Properties

Name | Type
------------ | -------------
`title` | string
`privacy` | [CollectionPrivacy](CollectionPrivacy.md)

## Example

```typescript
import type { CollectionModification } from 'flat-api'

// TODO: Update the object below with actual values
const example = {
  "title": null,
  "privacy": null,
} satisfies CollectionModification

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as CollectionModification
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


