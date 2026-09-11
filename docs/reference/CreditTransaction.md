
# CreditTransaction

A single credit ledger entry

## Properties

Name | Type
------------ | -------------
`id` | string
`type` | string
`feature` | string
`amount` | number
`source` | string
`state` | string
`job` | string
`creationDate` | Date
`modificationDate` | Date

## Example

```typescript
import type { CreditTransaction } from 'flat-api'

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "type": null,
  "feature": null,
  "amount": null,
  "source": null,
  "state": null,
  "job": null,
  "creationDate": null,
  "modificationDate": null,
} satisfies CreditTransaction

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as CreditTransaction
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


