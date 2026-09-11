
# ScoreLikesCounts

A computed version of the weekly, monthly, yearly and total number of likes for a score 

## Properties

Name | Type
------------ | -------------
`total` | number
`weekly` | number
`monthly` | number
`yearly` | number

## Example

```typescript
import type { ScoreLikesCounts } from 'flat-api'

// TODO: Update the object below with actual values
const example = {
  "total": null,
  "weekly": null,
  "monthly": null,
  "yearly": null,
} satisfies ScoreLikesCounts

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as ScoreLikesCounts
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


