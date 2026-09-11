
# Task

An asynchronous task

## Properties

Name | Type
------------ | -------------
`id` | string
`type` | string
`state` | string
`format` | string
`score` | string
`revision` | string
`progress` | [TaskProgress](TaskProgress.md)
`creationDate` | Date
`modificationDate` | Date
`doneDate` | Date
`result` | [TaskResult](TaskResult.md)
`errorHistory` | Array&lt;string&gt;
`isCancellable` | boolean
`children` | [Array&lt;Task&gt;](Task.md)

## Example

```typescript
import type { Task } from 'flat-api'

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "type": null,
  "state": null,
  "format": null,
  "score": null,
  "revision": null,
  "progress": null,
  "creationDate": null,
  "modificationDate": null,
  "doneDate": null,
  "result": null,
  "errorHistory": null,
  "isCancellable": null,
  "children": null,
} satisfies Task

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as Task
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


