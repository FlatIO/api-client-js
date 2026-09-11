
# OmrJobOutput

Where the result of the job goes.  * `library`: import the result into the Flat Library and create a score (default). * `musicxml`: finalize the result only, downloadable via `getOmrJobExport`. No score   is created, for third-party integrations that do not use the Library. 

## Properties

Name | Type
------------ | -------------

## Example

```typescript
import type { OmrJobOutput } from 'flat-api'

// TODO: Update the object below with actual values
const example = {
} satisfies OmrJobOutput

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as OmrJobOutput
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


