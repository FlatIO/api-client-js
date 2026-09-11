
# ScoreDetailsAllOfMe

Information about the authenticated user and this score

## Properties

Name | Type
------------ | -------------
`isLiked` | boolean
`isInLibrary` | boolean

## Example

```typescript
import type { ScoreDetailsAllOfMe } from 'flat-api'

// TODO: Update the object below with actual values
const example = {
  "isLiked": null,
  "isInLibrary": null,
} satisfies ScoreDetailsAllOfMe

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as ScoreDetailsAllOfMe
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


