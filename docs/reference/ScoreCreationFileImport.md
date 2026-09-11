
# ScoreCreationFileImport


## Properties

Name | Type
------------ | -------------
`title` | string
`privacy` | [ScorePrivacy](ScorePrivacy.md)
`collection` | string
`googleDriveFolder` | string
`filename` | string
`data` | string
`dataEncoding` | string
`supportsTasks` | boolean

## Example

```typescript
import type { ScoreCreationFileImport } from 'flat-api'

// TODO: Update the object below with actual values
const example = {
  "title": null,
  "privacy": null,
  "collection": null,
  "googleDriveFolder": null,
  "filename": null,
  "data": null,
  "dataEncoding": null,
  "supportsTasks": null,
} satisfies ScoreCreationFileImport

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as ScoreCreationFileImport
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


