
# ClassDetails

A classroom

## Properties

Name | Type
------------ | -------------
`id` | string
`state` | [ClassState](ClassState.md)
`name` | string
`section` | string
`description` | string
`organization` | string
`owner` | string
`creationDate` | Date
`modificationDate` | Date
`enrollmentCode` | string
`theme` | string
`assignmentsCount` | number
`studentsGroup` | [GroupDetails](GroupDetails.md)
`teachersGroup` | [GroupDetails](GroupDetails.md)
`issues` | [ClassDetailsIssues](ClassDetailsIssues.md)
`googleClassroom` | [ClassDetailsGoogleClassroom](ClassDetailsGoogleClassroom.md)
`googleDrive` | [ClassDetailsGoogleDrive](ClassDetailsGoogleDrive.md)
`microsoftGraph` | [ClassDetailsMicrosoftGraph](ClassDetailsMicrosoftGraph.md)
`lti` | [ClassDetailsLti](ClassDetailsLti.md)
`canvas` | [ClassDetailsCanvas](ClassDetailsCanvas.md)
`mfc` | [ClassDetailsMfc](ClassDetailsMfc.md)
`clever` | [ClassDetailsClever](ClassDetailsClever.md)
`level` | [ClassGradeLevel](ClassGradeLevel.md)
`skillsFocused` | Array&lt;string&gt;
`size` | number

## Example

```typescript
import type { ClassDetails } from 'flat-api'

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "state": null,
  "name": null,
  "section": null,
  "description": null,
  "organization": null,
  "owner": null,
  "creationDate": null,
  "modificationDate": null,
  "enrollmentCode": null,
  "theme": null,
  "assignmentsCount": null,
  "studentsGroup": null,
  "teachersGroup": null,
  "issues": null,
  "googleClassroom": null,
  "googleDrive": null,
  "microsoftGraph": null,
  "lti": null,
  "canvas": null,
  "mfc": null,
  "clever": null,
  "level": null,
  "skillsFocused": null,
  "size": null,
} satisfies ClassDetails

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as ClassDetails
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


