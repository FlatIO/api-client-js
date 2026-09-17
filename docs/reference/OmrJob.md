
# OmrJob


## Properties

Name | Type
------------ | -------------
`id` | string
`status` | [OmrJobStatus](OmrJobStatus.md)
`output` | [OmrJobOutput](OmrJobOutput.md)
`interactiveSteps` | [Array&lt;OmrStepName&gt;](OmrStepName.md)
`autoRotate` | boolean
`locales` | Array&lt;string&gt;
`currentStep` | [OmrStepName](OmrStepName.md)
`pendingStep` | [OmrPendingStep](OmrPendingStep.md)
`estimatedCredits` | number
`progress` | [OmrJobProgress](OmrJobProgress.md)
`originalFileMetadata` | [OmrJobFileMetadata](OmrJobFileMetadata.md)
`importedMetadata` | [OmrImportedMetadata](OmrImportedMetadata.md)
`result` | [OmrJobResult](OmrJobResult.md)
`retention` | [OmrJobRetention](OmrJobRetention.md)
`errorCode` | string
`errorMessage` | string
`creationDate` | Date
`modificationDate` | Date

## Example

```typescript
import type { OmrJob } from 'flat-api'

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "status": null,
  "output": null,
  "interactiveSteps": null,
  "autoRotate": null,
  "locales": null,
  "currentStep": null,
  "pendingStep": null,
  "estimatedCredits": null,
  "progress": null,
  "originalFileMetadata": null,
  "importedMetadata": null,
  "result": null,
  "retention": null,
  "errorCode": null,
  "errorMessage": null,
  "creationDate": null,
  "modificationDate": null,
} satisfies OmrJob

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as OmrJob
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


