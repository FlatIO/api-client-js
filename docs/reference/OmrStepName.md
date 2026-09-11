
# OmrStepName

Interactive pipeline step. Forward-compatible: new values may be added over time. Only steps a client lists in `interactiveSteps` can pause that client\'s job; any step a client does not list (including future ones) is auto-resolved by the server.  * `details`: confirm or adjust the detected title, main language and instruments   before assembly. Pauses after note recognition, so resuming re-runs only the   cheap assembly and finalize stages. 

## Properties

Name | Type
------------ | -------------

## Example

```typescript
import type { OmrStepName } from 'flat-api'

// TODO: Update the object below with actual values
const example = {
} satisfies OmrStepName

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as OmrStepName
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


