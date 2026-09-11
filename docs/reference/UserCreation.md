
# UserCreation

User creation

## Properties

Name | Type
------------ | -------------
`username` | string
`firstname` | string
`lastname` | string
`email` | string
`password` | string
`locale` | string
`role` | string

## Example

```typescript
import type { UserCreation } from 'flat-api'

// TODO: Update the object below with actual values
const example = {
  "username": null,
  "firstname": null,
  "lastname": null,
  "email": null,
  "password": null,
  "locale": null,
  "role": null,
} satisfies UserCreation

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as UserCreation
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


