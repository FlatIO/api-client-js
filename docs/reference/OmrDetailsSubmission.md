
# OmrDetailsSubmission

Overrides for the `details` step. Omitted fields keep the server\'s detected values.

## Properties

Name | Type
------------ | -------------
`step` | string
`title` | string
`mainLanguage` | string
`instruments` | [Array&lt;OmrInstrumentOverride&gt;](OmrInstrumentOverride.md)

## Example

```typescript
import type { OmrDetailsSubmission } from 'flat-api'

// TODO: Update the object below with actual values
const example = {
  "step": null,
  "title": null,
  "mainLanguage": null,
  "instruments": null,
} satisfies OmrDetailsSubmission

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as OmrDetailsSubmission
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


