
# AssignmentUpdate

Assignment Resource Editing

## Properties

Name | Type
------------ | -------------
`type` | [AssignmentType](AssignmentType.md)
`title` | string
`description` | string
`descriptionHtml` | string
`teacherInstructions` | string
`teacherInstructionsHtml` | string
`attachments` | [Array&lt;ClassAttachmentCreation&gt;](ClassAttachmentCreation.md)
`nbPlaybackAuthorized` | number
`restrictPlayNote` | boolean
`restrictToAudioTracks` | boolean
`toolset` | string
`coverFile` | string
`cover` | string
`maxPoints` | number
`releaseGrades` | string
`shuffleExercises` | boolean
`submissionStudentsMode` | [AssignmentSubmissionStudentsMode](AssignmentSubmissionStudentsMode.md)
`recordingType` | string
`allowMetronome` | boolean
`allowBackingTrack` | boolean
`allowSpeedChange` | boolean
`freeRecord` | boolean

## Example

```typescript
import type { AssignmentUpdate } from 'flat-api'

// TODO: Update the object below with actual values
const example = {
  "type": null,
  "title": null,
  "description": null,
  "descriptionHtml": null,
  "teacherInstructions": null,
  "teacherInstructionsHtml": null,
  "attachments": null,
  "nbPlaybackAuthorized": null,
  "restrictPlayNote": null,
  "restrictToAudioTracks": null,
  "toolset": null,
  "coverFile": null,
  "cover": null,
  "maxPoints": null,
  "releaseGrades": null,
  "shuffleExercises": null,
  "submissionStudentsMode": null,
  "recordingType": null,
  "allowMetronome": null,
  "allowBackingTrack": null,
  "allowSpeedChange": null,
  "freeRecord": null,
} satisfies AssignmentUpdate

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as AssignmentUpdate
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


