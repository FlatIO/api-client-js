
# UserDetails

User details

## Properties

Name | Type
------------ | -------------
`id` | string
`type` | string
`product` | [TutteoProduct](TutteoProduct.md)
`username` | string
`printableName` | string
`firstname` | string
`lastname` | string
`name` | string
`picture` | string
`badges` | Array&lt;string&gt;
`organization` | string
`organizationRole` | [OrganizationRoles](OrganizationRoles.md)
`classRole` | [ClassRoles](ClassRoles.md)
`htmlUrl` | string
`bio` | string
`registrationDate` | Date
`likedScoresCount` | number
`followersCount` | number
`followingCount` | number
`ownedPublicScoresCount` | number
`allPublicScoresCount` | number
`likesCount` | number
`playsCount` | number
`coverPicture` | string
`profileTheme` | string
`links` | [UserCommunityProfileLinks](UserCommunityProfileLinks.md)
`isEmailVerified` | boolean
`azureDetails` | [UserAzureDetails](UserAzureDetails.md)
`privateProfile` | boolean
`locale` | string
`groups` | Array&lt;string&gt;
`pictureFile` | string
`coverPictureFile` | string

## Example

```typescript
import type { UserDetails } from 'flat-api'

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "type": null,
  "product": null,
  "username": null,
  "printableName": null,
  "firstname": null,
  "lastname": null,
  "name": null,
  "picture": null,
  "badges": null,
  "organization": null,
  "organizationRole": null,
  "classRole": null,
  "htmlUrl": null,
  "bio": null,
  "registrationDate": null,
  "likedScoresCount": null,
  "followersCount": null,
  "followingCount": null,
  "ownedPublicScoresCount": null,
  "allPublicScoresCount": null,
  "likesCount": null,
  "playsCount": null,
  "coverPicture": null,
  "profileTheme": null,
  "links": null,
  "isEmailVerified": null,
  "azureDetails": null,
  "privateProfile": null,
  "locale": null,
  "groups": null,
  "pictureFile": null,
  "coverPictureFile": null,
} satisfies UserDetails

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as UserDetails
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


