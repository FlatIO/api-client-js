
# LtiConfigurationUpdateDeployment

Update fields allowed for deployment-based configurations

## Properties

Name | Type
------------ | -------------
`deploymentId` | string
`deploymentBreakdownId` | string
`enableEmailMatching` | boolean

## Example

```typescript
import type { LtiConfigurationUpdateDeployment } from 'flat-api'

// TODO: Update the object below with actual values
const example = {
  "deploymentId": null,
  "deploymentBreakdownId": null,
  "enableEmailMatching": null,
} satisfies LtiConfigurationUpdateDeployment

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as LtiConfigurationUpdateDeployment
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


