
# OmrJobCreation

Parameters to create an OMR job. Send without `files` to create a draft (then add files with `addOmrJobFile` and run `startOmrJob`), or include `files` and `autoStart: true` to import in a single request. 

## Properties

Name | Type
------------ | -------------
`output` | [OmrJobOutput](OmrJobOutput.md)
`interactiveSteps` | [Array&lt;OmrStepName&gt;](OmrStepName.md)
`autoRotate` | boolean
`locales` | Array&lt;string&gt;
`collection` | string
`idempotencyKey` | string
`files` | [Array&lt;OmrJobInputFile&gt;](OmrJobInputFile.md)
`autoStart` | boolean

## Example

```typescript
import type { OmrJobCreation } from 'flat-api'

// TODO: Update the object below with actual values
const example = {
  "output": null,
  "interactiveSteps": null,
  "autoRotate": null,
  "locales": null,
  "collection": null,
  "idempotencyKey": null,
  "files": null,
  "autoStart": null,
} satisfies OmrJobCreation

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as OmrJobCreation
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


