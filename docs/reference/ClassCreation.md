
# ClassCreation

Creation of a classroom

## Properties

Name | Type
------------ | -------------
`name` | string
`section` | string
`level` | [ClassGradeLevel](ClassGradeLevel.md)
`skillsFocused` | Array&lt;string&gt;
`size` | number

## Example

```typescript
import type { ClassCreation } from 'flat-api'

// TODO: Update the object below with actual values
const example = {
  "name": null,
  "section": null,
  "level": null,
  "skillsFocused": null,
  "size": null,
} satisfies ClassCreation

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as ClassCreation
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


