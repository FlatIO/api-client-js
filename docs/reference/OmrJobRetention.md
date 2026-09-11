
# OmrJobRetention

Data-retention state of the job.  Present only on jobs whose `output` is `musicxml`. Jobs imported into the Flat library are part of your library content, are not covered by this policy, and omit this object entirely.  Erasure is performed by a periodic cleanup pass, so the files are removed shortly after `expiryDate` rather than exactly on it. Plan for the deadline, not the instant. 

## Properties

Name | Type
------------ | -------------
`expiryDate` | Date
`expiredDate` | Date

## Example

```typescript
import type { OmrJobRetention } from 'flat-api'

// TODO: Update the object below with actual values
const example = {
  "expiryDate": null,
  "expiredDate": null,
} satisfies OmrJobRetention

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as OmrJobRetention
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


