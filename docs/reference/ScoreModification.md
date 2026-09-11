
# ScoreModification

Edit the score metadata

## Properties

Name | Type
------------ | -------------
`title` | string
`subtitle` | string
`composer` | string
`lyricist` | string
`arranger` | string
`privacy` | [ScorePrivacy](ScorePrivacy.md)
`sharingKey` | string
`description` | string
`tags` | Array&lt;string&gt;
`creationType` | [ScoreCreationType](ScoreCreationType.md)
`license` | [ScoreLicense](ScoreLicense.md)
`licenseText` | string

## Example

```typescript
import type { ScoreModification } from 'flat-api'

// TODO: Update the object below with actual values
const example = {
  "title": null,
  "subtitle": null,
  "composer": null,
  "lyricist": null,
  "arranger": null,
  "privacy": null,
  "sharingKey": null,
  "description": null,
  "tags": null,
  "creationType": null,
  "license": null,
  "licenseText": null,
} satisfies ScoreModification

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as ScoreModification
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


