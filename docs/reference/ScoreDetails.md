
# ScoreDetails

The score and all its details

## Properties

Name | Type
------------ | -------------
`id` | string
`sharingKey` | string
`title` | string
`privacy` | [ScorePrivacy](ScorePrivacy.md)
`user` | [UserPublic](UserPublic.md)
`htmlUrl` | string
`editHtmlUrl` | string
`subtitle` | string
`lyricist` | string
`arranger` | string
`composer` | string
`description` | string
`tags` | Array&lt;string&gt;
`creationType` | [ScoreCreationType](ScoreCreationType.md)
`license` | [ScoreLicense](ScoreLicense.md)
`licenseText` | string
`durationTime` | number
`numberMeasures` | number
`mainTempoQpm` | number
`mainKeySignature` | number
`rights` | [ResourceRights](ResourceRights.md)
`collaborators` | [Array&lt;ResourceCollaborator&gt;](ResourceCollaborator.md)
`creationDate` | Date
`modificationDate` | Date
`publicationDate` | Date
`scheduledDeletionDate` | Date
`highlightedDate` | Date
`organization` | string
`parentScore` | string
`instruments` | Array&lt;string&gt;
`instrumentsNames` | Array&lt;string&gt;
`samples` | Array&lt;string&gt;
`googleDriveFileId` | string
`likes` | [ScoreLikesCounts](ScoreLikesCounts.md)
`comments` | [ScoreCommentsCounts](ScoreCommentsCounts.md)
`views` | [ScoreViewsCounts](ScoreViewsCounts.md)
`plays` | [ScorePlaysCounts](ScorePlaysCounts.md)
`collections` | Array&lt;string&gt;
`me` | [ScoreDetailsAllOfMe](ScoreDetailsAllOfMe.md)

## Example

```typescript
import type { ScoreDetails } from 'flat-api'

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "sharingKey": null,
  "title": null,
  "privacy": null,
  "user": null,
  "htmlUrl": null,
  "editHtmlUrl": null,
  "subtitle": null,
  "lyricist": null,
  "arranger": null,
  "composer": null,
  "description": null,
  "tags": null,
  "creationType": null,
  "license": null,
  "licenseText": null,
  "durationTime": null,
  "numberMeasures": null,
  "mainTempoQpm": null,
  "mainKeySignature": null,
  "rights": null,
  "collaborators": null,
  "creationDate": null,
  "modificationDate": null,
  "publicationDate": null,
  "scheduledDeletionDate": null,
  "highlightedDate": null,
  "organization": null,
  "parentScore": null,
  "instruments": null,
  "instrumentsNames": null,
  "samples": null,
  "googleDriveFileId": null,
  "likes": null,
  "comments": null,
  "views": null,
  "plays": null,
  "collections": null,
  "me": null,
} satisfies ScoreDetails

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as ScoreDetails
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


