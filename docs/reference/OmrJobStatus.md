
# OmrJobStatus

Public, client-facing status of the job, derived from the internal job and task state.  * `draft`: created, files can still be added; not yet started or charged. * `processing`: the pipeline is running. * `awaitingInput`: paused on the `currentStep`, waiting for the client to submit it. * `done`: finished. See `result`. * `error`: failed. See `errorCode`. * `canceled`: canceled by the client. 

## Properties

Name | Type
------------ | -------------

## Example

```typescript
import type { OmrJobStatus } from 'flat-api'

// TODO: Update the object below with actual values
const example = {
} satisfies OmrJobStatus

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as OmrJobStatus
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


