
# ClassDetailsGoogleDrive

Google Drive course-related information provided by Google Classroom

## Properties

Name | Type
------------ | -------------
`teacherFolderId` | string
`teacherFolderAlternateLink` | string

## Example

```typescript
import type { ClassDetailsGoogleDrive } from 'flat-api'

// TODO: Update the object below with actual values
const example = {
  "teacherFolderId": null,
  "teacherFolderAlternateLink": null,
} satisfies ClassDetailsGoogleDrive

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as ClassDetailsGoogleDrive
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


