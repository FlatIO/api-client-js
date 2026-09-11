
# AssignmentCapabilities

Capabilities the current user has on this assignment. Each capability corresponds to a fine-grained action that a user may take.

## Properties

Name | Type
------------ | -------------
`canEdit` | boolean
`canPublishInClass` | boolean
`canPublishInClassError` | [AssignmentCapabilitiesCanPublishInClassError](AssignmentCapabilitiesCanPublishInClassError.md)
`canArchive` | boolean
`canUnarchive` | boolean

## Example

```typescript
import type { AssignmentCapabilities } from 'flat-api'

// TODO: Update the object below with actual values
const example = {
  "canEdit": null,
  "canPublishInClass": null,
  "canPublishInClassError": null,
  "canArchive": null,
  "canUnarchive": null,
} satisfies AssignmentCapabilities

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as AssignmentCapabilities
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


