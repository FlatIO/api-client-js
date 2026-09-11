
# ClassAssignment


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
`creator` | string
`state` | string
`classroom` | string
`creationDate` | Date
`scheduledDate` | Date
`dueDate` | Date
`assigneeMode` | string
`assignedStudents` | Array&lt;string&gt;
`assignedGroups` | [Array&lt;AssignmentGroup&gt;](AssignmentGroup.md)
`submissions` | [Array&lt;AssignmentSubmission&gt;](AssignmentSubmission.md)
`googleClassroom` | [GoogleClassroomCoursework](GoogleClassroomCoursework.md)
`microsoftGraph` | [MicrosoftGraphAssignment](MicrosoftGraphAssignment.md)
`mfc` | [ClassAssignmentAllOfMfc](ClassAssignmentAllOfMfc.md)
`canvas` | [ClassAssignmentAllOfCanvas](ClassAssignmentAllOfCanvas.md)
`lti` | [ClassAssignmentAllOfLti](ClassAssignmentAllOfLti.md)
`issue` | string

## Example

```typescript
import type { ClassAssignment } from 'flat-api'

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
  "creator": null,
  "state": null,
  "classroom": null,
  "creationDate": null,
  "scheduledDate": null,
  "dueDate": null,
  "assigneeMode": null,
  "assignedStudents": null,
  "assignedGroups": null,
  "submissions": null,
  "googleClassroom": null,
  "microsoftGraph": null,
  "mfc": null,
  "canvas": null,
  "lti": null,
  "issue": null,
} satisfies ClassAssignment

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as ClassAssignment
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


