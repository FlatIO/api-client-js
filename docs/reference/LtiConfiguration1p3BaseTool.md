
# LtiConfiguration1p3BaseTool

Platform/tool product information

## Properties

Name | Type
------------ | -------------
`product` | string
`version` | string
`instanceName` | string
`instanceGuid` | string
`instanceContact` | string
`instanceDomain` | string

## Example

```typescript
import type { LtiConfiguration1p3BaseTool } from 'flat-api'

// TODO: Update the object below with actual values
const example = {
  "product": null,
  "version": null,
  "instanceName": null,
  "instanceGuid": null,
  "instanceContact": null,
  "instanceDomain": null,
} satisfies LtiConfiguration1p3BaseTool

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as LtiConfiguration1p3BaseTool
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


