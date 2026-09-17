
# ClassAttachmentCreation

Attachment creation for an assignment or stream post. This attachment must contain a `score` or a `url`; its details are resolved and returned as a `MediaAttachment` once the assignment or stream post is created. 

## Properties

Name | Type
------------ | -------------
`type` | string
`score` | string
`worksheet` | string
`revision` | string
`partUuid` | string
`sharingMode` | [MediaScoreSharingMode](MediaScoreSharingMode.md)
`lockScoreTemplate` | boolean
`url` | string
`googleDriveFileId` | string
`teacherOnly` | boolean

## Example

```typescript
import type { ClassAttachmentCreation } from 'flat-api'

// TODO: Update the object below with actual values
const example = {
  "type": null,
  "score": null,
  "worksheet": null,
  "revision": null,
  "partUuid": null,
  "sharingMode": null,
  "lockScoreTemplate": null,
  "url": null,
  "googleDriveFileId": null,
  "teacherOnly": null,
} satisfies ClassAttachmentCreation

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as ClassAttachmentCreation
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


