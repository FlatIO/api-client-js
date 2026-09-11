
# OmrJobResult

The outcome of a finished job. Present when `status` is `done`.

## Properties

Name | Type
------------ | -------------
`score` | string
`exports` | Array&lt;string&gt;

## Example

```typescript
import type { OmrJobResult } from 'flat-api'

// TODO: Update the object below with actual values
const example = {
  "score": null,
  "exports": null,
} satisfies OmrJobResult

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as OmrJobResult
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


