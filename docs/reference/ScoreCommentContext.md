
# ScoreCommentContext

The context of the comment (for inline/contextualized comments). A context will include all the information related to the location of the comment (i.e. score parts, range of measure, time position). 

## Properties

Name | Type
------------ | -------------
`partUuid` | string
`staffIdx` | number
`staffUuid` | string
`measureUuids` | Array&lt;string&gt;
`startTimePos` | number
`stopTimePos` | number
`startDpq` | number
`stopDpq` | number

## Example

```typescript
import type { ScoreCommentContext } from 'flat-api'

// TODO: Update the object below with actual values
const example = {
  "partUuid": null,
  "staffIdx": null,
  "staffUuid": null,
  "measureUuids": null,
  "startTimePos": null,
  "stopTimePos": null,
  "startDpq": null,
  "stopDpq": null,
} satisfies ScoreCommentContext

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as ScoreCommentContext
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


