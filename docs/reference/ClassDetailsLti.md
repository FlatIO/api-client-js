
# ClassDetailsLti

Info about LTI context (1.1 and 1.3)

## Properties

Name | Type
------------ | -------------
`contextId` | string
`contextTitle` | string
`contextLabel` | string
`hasNrpsService` | boolean

## Example

```typescript
import type { ClassDetailsLti } from 'flat-api'

// TODO: Update the object below with actual values
const example = {
  "contextId": null,
  "contextTitle": null,
  "contextLabel": null,
  "hasNrpsService": null,
} satisfies ClassDetailsLti

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as ClassDetailsLti
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


