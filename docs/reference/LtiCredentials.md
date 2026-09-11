
# LtiCredentials

A couple of LTI 1.x OAuth credentials

## Properties

Name | Type
------------ | -------------
`id` | string
`name` | string
`lms` | [LmsName](LmsName.md)
`organization` | string
`creator` | string
`creationDate` | Date
`lastUsage` | Date
`consumerKey` | string
`consumerSecret` | string
`enableEmailMatching` | boolean

## Example

```typescript
import type { LtiCredentials } from 'flat-api'

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "name": null,
  "lms": null,
  "organization": null,
  "creator": null,
  "creationDate": null,
  "lastUsage": null,
  "consumerKey": null,
  "consumerSecret": null,
  "enableEmailMatching": null,
} satisfies LtiCredentials

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as LtiCredentials
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


