
# ScoreCommentsCounts

A computed version of the total, unique, weekly, monthly and yearly number of comments added on the documents (this doesn\'t include inline comments). 

## Properties

Name | Type
------------ | -------------
`total` | number
`unique` | number
`weekly` | number
`monthly` | number
`yearly` | number

## Example

```typescript
import type { ScoreCommentsCounts } from 'flat-api'

// TODO: Update the object below with actual values
const example = {
  "total": null,
  "unique": null,
  "weekly": null,
  "monthly": null,
  "yearly": null,
} satisfies ScoreCommentsCounts

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as ScoreCommentsCounts
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


