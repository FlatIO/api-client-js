
# OmrCapabilities

What the account or app can do, for client feature-detection.

## Properties

Name | Type
------------ | -------------
`steps` | [Array&lt;OmrStepName&gt;](OmrStepName.md)
`formats` | Array&lt;string&gt;
`outputs` | [Array&lt;OmrJobOutput&gt;](OmrJobOutput.md)
`maxFiles` | number
`maxPages` | number
`maxParallelJobs` | number
`maxFileSize` | number
`acceptedMimeTypes` | Array&lt;string&gt;
`acceptedExtensions` | Array&lt;string&gt;
`costPerPage` | number
`remainingCredits` | number
`retentionDays` | number
`locales` | Array&lt;string&gt;
`localesDetails` | [Array&lt;OmrLocaleDetails&gt;](OmrLocaleDetails.md)

## Example

```typescript
import type { OmrCapabilities } from 'flat-api'

// TODO: Update the object below with actual values
const example = {
  "steps": null,
  "formats": null,
  "outputs": null,
  "maxFiles": null,
  "maxPages": null,
  "maxParallelJobs": null,
  "maxFileSize": null,
  "acceptedMimeTypes": null,
  "acceptedExtensions": null,
  "costPerPage": null,
  "remainingCredits": null,
  "retentionDays": null,
  "locales": null,
  "localesDetails": null,
} satisfies OmrCapabilities

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as OmrCapabilities
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


