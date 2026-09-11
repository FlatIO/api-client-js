
# Assignment

Assignment details

## Properties

Name | Type
------------ | -------------
`id` | string
`type` | [AssignmentType](AssignmentType.md)
`capabilities` | [AssignmentCapabilities](AssignmentCapabilities.md)
`title` | string
`description` | string
`descriptionHtml` | string
`teacherInstructions` | string
`teacherInstructionsHtml` | string
`cover` | string
`coverFile` | string
`attachments` | [Array&lt;MediaAttachment&gt;](MediaAttachment.md)
`useDedicatedAttachments` | boolean
`maxPoints` | number
`releaseGrades` | string
`shuffleExercises` | boolean
`toolset` | string
`nbPlaybackAuthorized` | number
`restrictPlayNote` | boolean
`restrictToAudioTracks` | boolean
`submissionStudentsMode` | [AssignmentSubmissionStudentsMode](AssignmentSubmissionStudentsMode.md)
`recordingType` | string
`allowMetronome` | boolean
`allowBackingTrack` | boolean
`allowSpeedChange` | boolean
`freeRecord` | boolean

## Example

```typescript
import type { Assignment } from 'flat-api'

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "type": null,
  "capabilities": null,
  "title": null,
  "description": null,
  "descriptionHtml": null,
  "teacherInstructions": null,
  "teacherInstructionsHtml": null,
  "cover": null,
  "coverFile": null,
  "attachments": null,
  "useDedicatedAttachments": null,
  "maxPoints": null,
  "releaseGrades": null,
  "shuffleExercises": null,
  "toolset": null,
  "nbPlaybackAuthorized": null,
  "restrictPlayNote": null,
  "restrictToAudioTracks": null,
  "submissionStudentsMode": null,
  "recordingType": null,
  "allowMetronome": null,
  "allowBackingTrack": null,
  "allowSpeedChange": null,
  "freeRecord": null,
} satisfies Assignment

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as Assignment
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


