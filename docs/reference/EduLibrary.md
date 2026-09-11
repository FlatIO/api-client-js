
# EduLibrary

A Flat for Education Library

## Properties

Name | Type
------------ | -------------
`id` | string
`name` | string
`type` | string
`visibility` | string

## Example

```typescript
import type { EduLibrary } from 'flat-api'

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "name": null,
  "type": null,
  "visibility": null,
} satisfies EduLibrary

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as EduLibrary
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


