
# GroupType

The type of the group: * `generic`: A group created by a Flat user * `classTeachers`: A group created automatically by Flat that contains   the teachers of a class * `classStudents`: A group created automatically by Flat that contains   the students of a class * `classStudentsSubGroup`: Manually created sub-group of students of a class.  * `assignmentStudentsSubGroup`: Manually created Sub-group of students of a class, in relation to a specific assignment. 

## Properties

Name | Type
------------ | -------------

## Example

```typescript
import type { GroupType } from 'flat-api'

// TODO: Update the object below with actual values
const example = {
} satisfies GroupType

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as GroupType
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


