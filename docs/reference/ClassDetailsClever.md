
# ClassDetailsClever

Clever.com section-related information

## Properties

Name | Type
------------ | -------------
`id` | string
`creationDate` | Date
`modificationDate` | Date
`subject` | string
`termName` | string
`termStartDate` | Date
`termEndDate` | Date

## Example

```typescript
import type { ClassDetailsClever } from 'flat-api'

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "creationDate": null,
  "modificationDate": null,
  "subject": null,
  "termName": null,
  "termStartDate": null,
  "termEndDate": null,
} satisfies ClassDetailsClever

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as ClassDetailsClever
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


