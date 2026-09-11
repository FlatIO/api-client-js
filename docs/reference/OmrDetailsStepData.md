
# OmrDetailsStepData

Detected score details for review (the \"Check your score details\" screen). The worker produces `title` and `instruments` from assembly; the language is not detected and is not part of this payload (the client reads the job\'s `locales`, set at creation). 

## Properties

Name | Type
------------ | -------------
`step` | string
`title` | string
`instruments` | [Array&lt;OmrDetectedInstrument&gt;](OmrDetectedInstrument.md)

## Example

```typescript
import type { OmrDetailsStepData } from 'flat-api'

// TODO: Update the object below with actual values
const example = {
  "step": null,
  "title": null,
  "instruments": null,
} satisfies OmrDetailsStepData

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as OmrDetailsStepData
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


