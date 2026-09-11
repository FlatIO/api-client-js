
# Group

A group of users

## Properties

Name | Type
------------ | -------------
`id` | string
`name` | string
`type` | [GroupType](GroupType.md)
`usersCount` | number
`readOnly` | boolean
`organization` | string
`creationDate` | Date

## Example

```typescript
import type { Group } from 'flat-api'

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "name": null,
  "type": null,
  "usersCount": null,
  "readOnly": null,
  "organization": null,
  "creationDate": null,
} satisfies Group

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as Group
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


