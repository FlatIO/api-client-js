
# GroupCreation


## Properties

Name | Type
------------ | -------------
`type` | string
`classroom` | string
`name` | string
`members` | Array&lt;string&gt;

## Example

```typescript
import type { GroupCreation } from 'flat-api'

// TODO: Update the object below with actual values
const example = {
  "type": null,
  "classroom": null,
  "name": null,
  "members": null,
} satisfies GroupCreation

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as GroupCreation
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


