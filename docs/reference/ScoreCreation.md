
# ScoreCreation


## Properties

Name | Type
------------ | -------------
`title` | string
`privacy` | [ScorePrivacy](ScorePrivacy.md)
`collection` | string
`googleDriveFolder` | string
`builderData` | [ScoreCreationBuilderDataAllOfBuilderData](ScoreCreationBuilderDataAllOfBuilderData.md)
`filename` | string
`data` | string
`dataEncoding` | string
`supportsTasks` | boolean
`source` | [ScoreSource](ScoreSource.md)

## Example

```typescript
import type { ScoreCreation } from 'flat-api'

// TODO: Update the object below with actual values
const example = {
  "title": null,
  "privacy": null,
  "collection": null,
  "googleDriveFolder": null,
  "builderData": null,
  "filename": null,
  "data": null,
  "dataEncoding": null,
  "supportsTasks": null,
  "source": null,
} satisfies ScoreCreation

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as ScoreCreation
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


