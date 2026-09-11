
# CollectionType

Type of the collection. The type will influence the capabilitied available on the collections and how this collection is/can be populated.  - `root`: **Deprecated.** Previously the root collection of the user. The `allScores` virtual collection should be used instead. - `regular`: A regular collection created by the user. This collection can be deleted and modified by the user. - `app`: An automatically created collection containing the scores created by an app (e.g. Music Snippet) - `trash`: An automatically created collection containing the trashed scores.  Virtual collections:  - `allScores`: All the scores contained in the user account - `collaborations`: All shared scores by the user or someone else - `likes`: Liked scores 

## Properties

Name | Type
------------ | -------------

## Example

```typescript
import type { CollectionType } from 'flat-api'

// TODO: Update the object below with actual values
const example = {
} satisfies CollectionType

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as CollectionType
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


