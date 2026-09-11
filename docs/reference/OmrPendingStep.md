
# OmrPendingStep

The step currently awaiting client input. The `data` shape is keyed by `step`.

## Properties

Name | Type
------------ | -------------
`step` | [OmrStepName](OmrStepName.md)
`data` | [OmrDetailsStepData](OmrDetailsStepData.md)

## Example

```typescript
import type { OmrPendingStep } from 'flat-api'

// TODO: Update the object below with actual values
const example = {
  "step": null,
  "data": null,
} satisfies OmrPendingStep

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as OmrPendingStep
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


