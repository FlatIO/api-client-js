
# GroupDetails

The details of a group

## Properties

Name | Type
------------ | -------------
`id` | string
`name` | string
`type` | [GroupType](GroupType.md)
`organization` | string
`classroom` | string
`assignment` | string
`parent` | string
`creationDate` | Date
`usersCount` | number
`readOnly` | boolean
`tags` | Array&lt;string&gt;

## Example

```typescript
import type { GroupDetails } from 'flat-api'

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "name": null,
  "type": null,
  "organization": null,
  "classroom": null,
  "assignment": null,
  "parent": null,
  "creationDate": null,
  "usersCount": null,
  "readOnly": null,
  "tags": null,
} satisfies GroupDetails

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as GroupDetails
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


