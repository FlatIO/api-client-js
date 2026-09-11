
# MediaAttachment

Media attachment. The API will automatically resolve the details, oEmbed, and media available if possible and return them in this object 

## Properties

Name | Type
------------ | -------------
`type` | string
`score` | string
`revision` | string
`worksheet` | string
`dedicated` | boolean
`track` | string
`partUuid` | string
`sharingMode` | [MediaScoreSharingMode](MediaScoreSharingMode.md)
`lockScoreTemplate` | boolean
`title` | string
`description` | string
`html` | string
`htmlWidth` | number
`htmlHeight` | number
`url` | string
`thumbnailUrl` | string
`thumbnailWidth` | number
`thumbnailHeight` | number
`authorName` | string
`authorUrl` | string
`iconUrl` | string
`mimeType` | string
`googleDriveFileId` | string
`teacherOnly` | boolean

## Example

```typescript
import type { MediaAttachment } from 'flat-api'

// TODO: Update the object below with actual values
const example = {
  "type": null,
  "score": null,
  "revision": null,
  "worksheet": null,
  "dedicated": null,
  "track": null,
  "partUuid": null,
  "sharingMode": null,
  "lockScoreTemplate": null,
  "title": null,
  "description": null,
  "html": null,
  "htmlWidth": null,
  "htmlHeight": null,
  "url": null,
  "thumbnailUrl": null,
  "thumbnailWidth": null,
  "thumbnailHeight": null,
  "authorName": null,
  "authorUrl": null,
  "iconUrl": null,
  "mimeType": null,
  "googleDriveFileId": null,
  "teacherOnly": null,
} satisfies MediaAttachment

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as MediaAttachment
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


