
# TaskResult

Optional result information about this task

## Properties

Name | Type
------------ | -------------
`url` | string
`error` | string

## Example

```typescript
import type { TaskResult } from 'flat-api'

// TODO: Update the object below with actual values
const example = {
  "url": null,
  "error": null,
} satisfies TaskResult

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as TaskResult
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


