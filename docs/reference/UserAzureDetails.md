
# UserAzureDetails


## Properties

Name | Type
------------ | -------------
`oid` | string
`hd` | string
`preferredUsername` | string

## Example

```typescript
import type { UserAzureDetails } from 'flat-api'

// TODO: Update the object below with actual values
const example = {
  "oid": null,
  "hd": null,
  "preferredUsername": null,
} satisfies UserAzureDetails

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as UserAzureDetails
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


