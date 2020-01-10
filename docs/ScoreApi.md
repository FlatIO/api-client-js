# FlatApi.ScoreApi

All URIs are relative to *https://api.flat.io/v2*

Method | HTTP request | Description
------------- | ------------- | -------------
[**addScoreCollaborator**](ScoreApi.md#addScoreCollaborator) | **POST** /scores/{score}/collaborators | Add a new collaborator
[**addScoreTrack**](ScoreApi.md#addScoreTrack) | **POST** /scores/{score}/tracks | Add a new video or audio track to the score
[**createScore**](ScoreApi.md#createScore) | **POST** /scores | Create a new score
[**createScoreRevision**](ScoreApi.md#createScoreRevision) | **POST** /scores/{score}/revisions | Create a new revision
[**deleteScore**](ScoreApi.md#deleteScore) | **DELETE** /scores/{score} | Delete a score
[**deleteScoreComment**](ScoreApi.md#deleteScoreComment) | **DELETE** /scores/{score}/comments/{comment} | Delete a comment
[**deleteScoreTrack**](ScoreApi.md#deleteScoreTrack) | **DELETE** /scores/{score}/tracks/{track} | Remove an audio or video track linked to the score
[**editScore**](ScoreApi.md#editScore) | **PUT** /scores/{score} | Edit a score&#39;s metadata
[**forkScore**](ScoreApi.md#forkScore) | **POST** /scores/{score}/fork | Fork a score
[**gerUserLikes**](ScoreApi.md#gerUserLikes) | **GET** /users/{user}/likes | List liked scores
[**getGroupScores**](ScoreApi.md#getGroupScores) | **GET** /groups/{group}/scores | List group&#39;s scores
[**getScore**](ScoreApi.md#getScore) | **GET** /scores/{score} | Get a score&#39;s metadata
[**getScoreCollaborator**](ScoreApi.md#getScoreCollaborator) | **GET** /scores/{score}/collaborators/{collaborator} | Get a collaborator
[**getScoreCollaborators**](ScoreApi.md#getScoreCollaborators) | **GET** /scores/{score}/collaborators | List the collaborators
[**getScoreComments**](ScoreApi.md#getScoreComments) | **GET** /scores/{score}/comments | List comments
[**getScoreRevision**](ScoreApi.md#getScoreRevision) | **GET** /scores/{score}/revisions/{revision} | Get a score revision
[**getScoreRevisionData**](ScoreApi.md#getScoreRevisionData) | **GET** /scores/{score}/revisions/{revision}/{format} | Get a score revision data
[**getScoreRevisions**](ScoreApi.md#getScoreRevisions) | **GET** /scores/{score}/revisions | List the revisions
[**getScoreSubmissions**](ScoreApi.md#getScoreSubmissions) | **GET** /scores/{score}/submissions | List submissions related to the score
[**getScoreTrack**](ScoreApi.md#getScoreTrack) | **GET** /scores/{score}/tracks/{track} | Retrieve the details of an audio or video track linked to a score
[**getUserScores**](ScoreApi.md#getUserScores) | **GET** /users/{user}/scores | List user&#39;s scores
[**listScoreTracks**](ScoreApi.md#listScoreTracks) | **GET** /scores/{score}/tracks | List the audio or video tracks linked to a score
[**markScoreCommentResolved**](ScoreApi.md#markScoreCommentResolved) | **PUT** /scores/{score}/comments/{comment}/resolved | Mark the comment as resolved
[**markScoreCommentUnresolved**](ScoreApi.md#markScoreCommentUnresolved) | **DELETE** /scores/{score}/comments/{comment}/resolved | Mark the comment as unresolved
[**postScoreComment**](ScoreApi.md#postScoreComment) | **POST** /scores/{score}/comments | Post a new comment
[**removeScoreCollaborator**](ScoreApi.md#removeScoreCollaborator) | **DELETE** /scores/{score}/collaborators/{collaborator} | Delete a collaborator
[**untrashScore**](ScoreApi.md#untrashScore) | **POST** /scores/{score}/untrash | Untrash a score
[**updateScoreComment**](ScoreApi.md#updateScoreComment) | **PUT** /scores/{score}/comments/{comment} | Update an existing comment
[**updateScoreTrack**](ScoreApi.md#updateScoreTrack) | **PUT** /scores/{score}/tracks/{track} | Update an audio or video track linked to a score



## addScoreCollaborator

> ResourceCollaborator addScoreCollaborator(score, body)

Add a new collaborator

Share a score with a single user or a group. This API call allows to add, invite and update the collaborators of a resource. - To add an existing Flat user to the resource, specify its unique identifier in the &#x60;user&#x60; property. - To invite an external user to the resource, specify its email in the &#x60;userEmail&#x60; property. - To add a Flat group to the resource, specify its unique identifier in the &#x60;group&#x60; property. - To update an existing collaborator, process the same request with different rights. 

### Example

```javascript
import FlatApi from 'flat-api';
let defaultClient = FlatApi.ApiClient.instance;
// Configure OAuth2 access token for authorization: OAuth2
let OAuth2 = defaultClient.authentications['OAuth2'];
OAuth2.accessToken = 'YOUR ACCESS TOKEN';

let apiInstance = new FlatApi.ScoreApi();
let score = "score_example"; // String | Unique identifier of the score document. This can be a Flat Score unique identifier (i.e. `ScoreDetails.id`) or, if the score is also a Google Drive file, the Drive file unique identifier prefixed with `drive-` (e.g. `drive-0B000000000`). 
let body = new FlatApi.ResourceCollaboratorCreation(); // ResourceCollaboratorCreation | 
apiInstance.addScoreCollaborator(score, body, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **score** | **String**| Unique identifier of the score document. This can be a Flat Score unique identifier (i.e. &#x60;ScoreDetails.id&#x60;) or, if the score is also a Google Drive file, the Drive file unique identifier prefixed with &#x60;drive-&#x60; (e.g. &#x60;drive-0B000000000&#x60;).  | 
 **body** | [**ResourceCollaboratorCreation**](ResourceCollaboratorCreation.md)|  | 

### Return type

[**ResourceCollaborator**](ResourceCollaborator.md)

### Authorization

[OAuth2](../README.md#OAuth2)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## addScoreTrack

> ScoreTrack addScoreTrack(score, body)

Add a new video or audio track to the score

Use this method to add new track to the score. This track can then be played on flat.io or in an embedded score. This API method support medias hosted on SoundCloud, YouTube and Vimeo. 

### Example

```javascript
import FlatApi from 'flat-api';
let defaultClient = FlatApi.ApiClient.instance;
// Configure OAuth2 access token for authorization: OAuth2
let OAuth2 = defaultClient.authentications['OAuth2'];
OAuth2.accessToken = 'YOUR ACCESS TOKEN';

let apiInstance = new FlatApi.ScoreApi();
let score = "score_example"; // String | Unique identifier of the score document. This can be a Flat Score unique identifier (i.e. `ScoreDetails.id`) or, if the score is also a Google Drive file, the Drive file unique identifier prefixed with `drive-` (e.g. `drive-0B000000000`). 
let body = new FlatApi.ScoreTrackCreation(); // ScoreTrackCreation | 
apiInstance.addScoreTrack(score, body, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **score** | **String**| Unique identifier of the score document. This can be a Flat Score unique identifier (i.e. &#x60;ScoreDetails.id&#x60;) or, if the score is also a Google Drive file, the Drive file unique identifier prefixed with &#x60;drive-&#x60; (e.g. &#x60;drive-0B000000000&#x60;).  | 
 **body** | [**ScoreTrackCreation**](ScoreTrackCreation.md)|  | 

### Return type

[**ScoreTrack**](ScoreTrack.md)

### Authorization

[OAuth2](../README.md#OAuth2)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## createScore

> ScoreDetails createScore(body)

Create a new score

Use this API method to **create a new music score in the current User account**. You will need a MusicXML 3 (&#x60;vnd.recordare.musicxml&#x60; or &#x60;vnd.recordare.musicxml+xml&#x60;), a MIDI (&#x60;audio/midi&#x60;), Guitar Pro (GP3, GP4, GP5, GPX, GP), PowerTab, TuxGuitar, or MuseScore file to create the new Flat document.  This API call will automatically create the first revision of the document, the score can be modified by the using our web application or by uploading a new revision of this file (&#x60;POST /v2/scores/{score}/revisions/{revision}&#x60;).  The currently authenticated user will be granted owner of the file and will be able to add other collaborators (users and groups).  If no &#x60;collection&#x60; is specified, the API will create the score in the most appropriate collection. This can be the &#x60;root&#x60; collection or a different collection based on the user&#39;s settings or API authentication method. If a &#x60;collection&#x60; is specified and this one has more public privacy settings than the score (e.g. &#x60;public&#x60; vs &#x60;private&#x60; for the score), the privacy settings of the created score will be adjusted to the collection ones. You can check the adjusted privacy settings in the returned score &#x60;privacy&#x60;, and optionally adjust these settings if needed using &#x60;PUT /scores/{score}&#x60;. 

### Example

```javascript
import FlatApi from 'flat-api';
let defaultClient = FlatApi.ApiClient.instance;
// Configure OAuth2 access token for authorization: OAuth2
let OAuth2 = defaultClient.authentications['OAuth2'];
OAuth2.accessToken = 'YOUR ACCESS TOKEN';

let apiInstance = new FlatApi.ScoreApi();
let body = new FlatApi.ScoreCreation(); // ScoreCreation | 
apiInstance.createScore(body, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **body** | [**ScoreCreation**](ScoreCreation.md)|  | 

### Return type

[**ScoreDetails**](ScoreDetails.md)

### Authorization

[OAuth2](../README.md#OAuth2)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## createScoreRevision

> ScoreRevision createScoreRevision(score, body)

Create a new revision

Update a score by uploading a new revision for this one. 

### Example

```javascript
import FlatApi from 'flat-api';
let defaultClient = FlatApi.ApiClient.instance;
// Configure OAuth2 access token for authorization: OAuth2
let OAuth2 = defaultClient.authentications['OAuth2'];
OAuth2.accessToken = 'YOUR ACCESS TOKEN';

let apiInstance = new FlatApi.ScoreApi();
let score = "score_example"; // String | Unique identifier of the score document. This can be a Flat Score unique identifier (i.e. `ScoreDetails.id`) or, if the score is also a Google Drive file, the Drive file unique identifier prefixed with `drive-` (e.g. `drive-0B000000000`). 
let body = new FlatApi.ScoreRevisionCreation(); // ScoreRevisionCreation | 
apiInstance.createScoreRevision(score, body, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **score** | **String**| Unique identifier of the score document. This can be a Flat Score unique identifier (i.e. &#x60;ScoreDetails.id&#x60;) or, if the score is also a Google Drive file, the Drive file unique identifier prefixed with &#x60;drive-&#x60; (e.g. &#x60;drive-0B000000000&#x60;).  | 
 **body** | [**ScoreRevisionCreation**](ScoreRevisionCreation.md)|  | 

### Return type

[**ScoreRevision**](ScoreRevision.md)

### Authorization

[OAuth2](../README.md#OAuth2)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## deleteScore

> deleteScore(score, opts)

Delete a score

This method can be used by the owner/admin (&#x60;aclAdmin&#x60; rights) of a score as well as regular collaborators.  When called by an owner/admin, it will schedule the deletion of the score, its revisions, and complete history. The score won&#39;t be accessible anymore after calling this method and the user&#39;s quota will directly be updated.  When called by a regular collaborator (&#x60;aclRead&#x60; / &#x60;aclWrite&#x60;), the score will be unshared (i.e. removed from the account &amp; own collections). 

### Example

```javascript
import FlatApi from 'flat-api';
let defaultClient = FlatApi.ApiClient.instance;
// Configure OAuth2 access token for authorization: OAuth2
let OAuth2 = defaultClient.authentications['OAuth2'];
OAuth2.accessToken = 'YOUR ACCESS TOKEN';

let apiInstance = new FlatApi.ScoreApi();
let score = "score_example"; // String | Unique identifier of the score document. This can be a Flat Score unique identifier (i.e. `ScoreDetails.id`) or, if the score is also a Google Drive file, the Drive file unique identifier prefixed with `drive-` (e.g. `drive-0B000000000`). 
let opts = {
  'now': false // Boolean | If `true`, the score deletion will be scheduled to be done ASAP
};
apiInstance.deleteScore(score, opts, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **score** | **String**| Unique identifier of the score document. This can be a Flat Score unique identifier (i.e. &#x60;ScoreDetails.id&#x60;) or, if the score is also a Google Drive file, the Drive file unique identifier prefixed with &#x60;drive-&#x60; (e.g. &#x60;drive-0B000000000&#x60;).  | 
 **now** | **Boolean**| If &#x60;true&#x60;, the score deletion will be scheduled to be done ASAP | [optional] [default to false]

### Return type

null (empty response body)

### Authorization

[OAuth2](../README.md#OAuth2)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## deleteScoreComment

> deleteScoreComment(score, comment, opts)

Delete a comment

### Example

```javascript
import FlatApi from 'flat-api';
let defaultClient = FlatApi.ApiClient.instance;
// Configure OAuth2 access token for authorization: OAuth2
let OAuth2 = defaultClient.authentications['OAuth2'];
OAuth2.accessToken = 'YOUR ACCESS TOKEN';

let apiInstance = new FlatApi.ScoreApi();
let score = "score_example"; // String | Unique identifier of the score document. This can be a Flat Score unique identifier (i.e. `ScoreDetails.id`) or, if the score is also a Google Drive file, the Drive file unique identifier prefixed with `drive-` (e.g. `drive-0B000000000`). 
let comment = "comment_example"; // String | Unique identifier of a sheet music comment 
let opts = {
  'sharingKey': "sharingKey_example" // String | This sharing key must be specified to access to a score or collection with a `privacy` mode set to `privateLink` and the current user is not a collaborator of the document. 
};
apiInstance.deleteScoreComment(score, comment, opts, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **score** | **String**| Unique identifier of the score document. This can be a Flat Score unique identifier (i.e. &#x60;ScoreDetails.id&#x60;) or, if the score is also a Google Drive file, the Drive file unique identifier prefixed with &#x60;drive-&#x60; (e.g. &#x60;drive-0B000000000&#x60;).  | 
 **comment** | **String**| Unique identifier of a sheet music comment  | 
 **sharingKey** | **String**| This sharing key must be specified to access to a score or collection with a &#x60;privacy&#x60; mode set to &#x60;privateLink&#x60; and the current user is not a collaborator of the document.  | [optional] 

### Return type

null (empty response body)

### Authorization

[OAuth2](../README.md#OAuth2)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## deleteScoreTrack

> deleteScoreTrack(score, track)

Remove an audio or video track linked to the score

### Example

```javascript
import FlatApi from 'flat-api';
let defaultClient = FlatApi.ApiClient.instance;
// Configure OAuth2 access token for authorization: OAuth2
let OAuth2 = defaultClient.authentications['OAuth2'];
OAuth2.accessToken = 'YOUR ACCESS TOKEN';

let apiInstance = new FlatApi.ScoreApi();
let score = "score_example"; // String | Unique identifier of the score document. This can be a Flat Score unique identifier (i.e. `ScoreDetails.id`) or, if the score is also a Google Drive file, the Drive file unique identifier prefixed with `drive-` (e.g. `drive-0B000000000`). 
let track = "track_example"; // String | Unique identifier of a score audio track 
apiInstance.deleteScoreTrack(score, track, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **score** | **String**| Unique identifier of the score document. This can be a Flat Score unique identifier (i.e. &#x60;ScoreDetails.id&#x60;) or, if the score is also a Google Drive file, the Drive file unique identifier prefixed with &#x60;drive-&#x60; (e.g. &#x60;drive-0B000000000&#x60;).  | 
 **track** | **String**| Unique identifier of a score audio track  | 

### Return type

null (empty response body)

### Authorization

[OAuth2](../README.md#OAuth2)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## editScore

> ScoreDetails editScore(score, opts)

Edit a score&#39;s metadata

This API method allows you to change the metadata of a score document (e.g. its &#x60;title&#x60; or &#x60;privacy&#x60;), all the properties are optional.  To edit the file itself, create a new revision using the appropriate method (&#x60;POST /v2/scores/{score}/revisions/{revision}&#x60;).  When editing the &#x60;title&#x60;, &#x60;subtitle&#x60;, &#x60;composer&#x60;, &#x60;lyricist&#x60;, &#x60;arranger&#x60; or &#x60;licenseText&#x60;, the metadatas will be instantly be updated, and a real-time action will be pushed to update the document lazily. This pending document modification will be automatically be saved as a new version by either a connected client or our internal versioning service. 

### Example

```javascript
import FlatApi from 'flat-api';
let defaultClient = FlatApi.ApiClient.instance;
// Configure OAuth2 access token for authorization: OAuth2
let OAuth2 = defaultClient.authentications['OAuth2'];
OAuth2.accessToken = 'YOUR ACCESS TOKEN';

let apiInstance = new FlatApi.ScoreApi();
let score = "score_example"; // String | Unique identifier of the score document. This can be a Flat Score unique identifier (i.e. `ScoreDetails.id`) or, if the score is also a Google Drive file, the Drive file unique identifier prefixed with `drive-` (e.g. `drive-0B000000000`). 
let opts = {
  'body': new FlatApi.ScoreModification() // ScoreModification | 
};
apiInstance.editScore(score, opts, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **score** | **String**| Unique identifier of the score document. This can be a Flat Score unique identifier (i.e. &#x60;ScoreDetails.id&#x60;) or, if the score is also a Google Drive file, the Drive file unique identifier prefixed with &#x60;drive-&#x60; (e.g. &#x60;drive-0B000000000&#x60;).  | 
 **body** | [**ScoreModification**](ScoreModification.md)|  | [optional] 

### Return type

[**ScoreDetails**](ScoreDetails.md)

### Authorization

[OAuth2](../README.md#OAuth2)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## forkScore

> ScoreDetails forkScore(score, body, opts)

Fork a score

This API call will make a copy of the last revision of the specified score and create a new score. The copy of the score will have a privacy set to &#x60;private&#x60;.  When using a [Flat for Education](https://flat.io/edu) account, the inline and contextualized comments will be accessible in the child document. 

### Example

```javascript
import FlatApi from 'flat-api';
let defaultClient = FlatApi.ApiClient.instance;
// Configure OAuth2 access token for authorization: OAuth2
let OAuth2 = defaultClient.authentications['OAuth2'];
OAuth2.accessToken = 'YOUR ACCESS TOKEN';

let apiInstance = new FlatApi.ScoreApi();
let score = "score_example"; // String | Unique identifier of the score document. This can be a Flat Score unique identifier (i.e. `ScoreDetails.id`) or, if the score is also a Google Drive file, the Drive file unique identifier prefixed with `drive-` (e.g. `drive-0B000000000`). 
let body = new FlatApi.ScoreFork(); // ScoreFork | 
let opts = {
  'sharingKey': "sharingKey_example" // String | This sharing key must be specified to access to a score or collection with a `privacy` mode set to `privateLink` and the current user is not a collaborator of the document. 
};
apiInstance.forkScore(score, body, opts, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **score** | **String**| Unique identifier of the score document. This can be a Flat Score unique identifier (i.e. &#x60;ScoreDetails.id&#x60;) or, if the score is also a Google Drive file, the Drive file unique identifier prefixed with &#x60;drive-&#x60; (e.g. &#x60;drive-0B000000000&#x60;).  | 
 **body** | [**ScoreFork**](ScoreFork.md)|  | 
 **sharingKey** | **String**| This sharing key must be specified to access to a score or collection with a &#x60;privacy&#x60; mode set to &#x60;privateLink&#x60; and the current user is not a collaborator of the document.  | [optional] 

### Return type

[**ScoreDetails**](ScoreDetails.md)

### Authorization

[OAuth2](../README.md#OAuth2)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## gerUserLikes

> [ScoreDetails] gerUserLikes(user, opts)

List liked scores

### Example

```javascript
import FlatApi from 'flat-api';
let defaultClient = FlatApi.ApiClient.instance;
// Configure OAuth2 access token for authorization: OAuth2
let OAuth2 = defaultClient.authentications['OAuth2'];
OAuth2.accessToken = 'YOUR ACCESS TOKEN';

let apiInstance = new FlatApi.ScoreApi();
let user = "user_example"; // String | Unique identifier of a Flat user. If you authenticated, you can use `me` to refer to the current user. 
let opts = {
  'ids': true // Boolean | Return only the identifiers of the scores
};
apiInstance.gerUserLikes(user, opts, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **user** | **String**| Unique identifier of a Flat user. If you authenticated, you can use &#x60;me&#x60; to refer to the current user.  | 
 **ids** | **Boolean**| Return only the identifiers of the scores | [optional] 

### Return type

[**[ScoreDetails]**](ScoreDetails.md)

### Authorization

[OAuth2](../README.md#OAuth2)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getGroupScores

> [ScoreDetails] getGroupScores(group, opts)

List group&#39;s scores

Get the list of scores shared with a group. 

### Example

```javascript
import FlatApi from 'flat-api';
let defaultClient = FlatApi.ApiClient.instance;
// Configure OAuth2 access token for authorization: OAuth2
let OAuth2 = defaultClient.authentications['OAuth2'];
OAuth2.accessToken = 'YOUR ACCESS TOKEN';

let apiInstance = new FlatApi.ScoreApi();
let group = "group_example"; // String | Unique identifier of a Flat group 
let opts = {
  'parent': "parent_example" // String | Filter the score forked from the score id `parent`
};
apiInstance.getGroupScores(group, opts, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **group** | **String**| Unique identifier of a Flat group  | 
 **parent** | **String**| Filter the score forked from the score id &#x60;parent&#x60; | [optional] 

### Return type

[**[ScoreDetails]**](ScoreDetails.md)

### Authorization

[OAuth2](../README.md#OAuth2)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getScore

> ScoreDetails getScore(score, opts)

Get a score&#39;s metadata

Get the details of a score identified by the &#x60;score&#x60; parameter in the URL. The currently authenticated user must have at least a read access to the document to use this API call. 

### Example

```javascript
import FlatApi from 'flat-api';
let defaultClient = FlatApi.ApiClient.instance;
// Configure OAuth2 access token for authorization: OAuth2
let OAuth2 = defaultClient.authentications['OAuth2'];
OAuth2.accessToken = 'YOUR ACCESS TOKEN';

let apiInstance = new FlatApi.ScoreApi();
let score = "score_example"; // String | Unique identifier of the score document. This can be a Flat Score unique identifier (i.e. `ScoreDetails.id`) or, if the score is also a Google Drive file, the Drive file unique identifier prefixed with `drive-` (e.g. `drive-0B000000000`). 
let opts = {
  'sharingKey': "sharingKey_example" // String | This sharing key must be specified to access to a score or collection with a `privacy` mode set to `privateLink` and the current user is not a collaborator of the document. 
};
apiInstance.getScore(score, opts, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **score** | **String**| Unique identifier of the score document. This can be a Flat Score unique identifier (i.e. &#x60;ScoreDetails.id&#x60;) or, if the score is also a Google Drive file, the Drive file unique identifier prefixed with &#x60;drive-&#x60; (e.g. &#x60;drive-0B000000000&#x60;).  | 
 **sharingKey** | **String**| This sharing key must be specified to access to a score or collection with a &#x60;privacy&#x60; mode set to &#x60;privateLink&#x60; and the current user is not a collaborator of the document.  | [optional] 

### Return type

[**ScoreDetails**](ScoreDetails.md)

### Authorization

[OAuth2](../README.md#OAuth2)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getScoreCollaborator

> ResourceCollaborator getScoreCollaborator(score, collaborator, opts)

Get a collaborator

Get the information about a collaborator (User or Group). 

### Example

```javascript
import FlatApi from 'flat-api';
let defaultClient = FlatApi.ApiClient.instance;
// Configure OAuth2 access token for authorization: OAuth2
let OAuth2 = defaultClient.authentications['OAuth2'];
OAuth2.accessToken = 'YOUR ACCESS TOKEN';

let apiInstance = new FlatApi.ScoreApi();
let score = "score_example"; // String | Unique identifier of the score document. This can be a Flat Score unique identifier (i.e. `ScoreDetails.id`) or, if the score is also a Google Drive file, the Drive file unique identifier prefixed with `drive-` (e.g. `drive-0B000000000`). 
let collaborator = "collaborator_example"; // String | Unique identifier of a **collaborator permission**, or unique identifier of a **User**, or unique identifier of a **Group** 
let opts = {
  'sharingKey': "sharingKey_example" // String | This sharing key must be specified to access to a score or collection with a `privacy` mode set to `privateLink` and the current user is not a collaborator of the document. 
};
apiInstance.getScoreCollaborator(score, collaborator, opts, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **score** | **String**| Unique identifier of the score document. This can be a Flat Score unique identifier (i.e. &#x60;ScoreDetails.id&#x60;) or, if the score is also a Google Drive file, the Drive file unique identifier prefixed with &#x60;drive-&#x60; (e.g. &#x60;drive-0B000000000&#x60;).  | 
 **collaborator** | **String**| Unique identifier of a **collaborator permission**, or unique identifier of a **User**, or unique identifier of a **Group**  | 
 **sharingKey** | **String**| This sharing key must be specified to access to a score or collection with a &#x60;privacy&#x60; mode set to &#x60;privateLink&#x60; and the current user is not a collaborator of the document.  | [optional] 

### Return type

[**ResourceCollaborator**](ResourceCollaborator.md)

### Authorization

[OAuth2](../README.md#OAuth2)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getScoreCollaborators

> [ResourceCollaborator] getScoreCollaborators(score, opts)

List the collaborators

This API call will list the different collaborators of a score and their rights on the document. The returned list will at least contain the owner of the document.  Collaborators can be a single user (the object &#x60;user&#x60; will be populated) or a group (the object &#x60;group&#x60; will be populated). 

### Example

```javascript
import FlatApi from 'flat-api';
let defaultClient = FlatApi.ApiClient.instance;
// Configure OAuth2 access token for authorization: OAuth2
let OAuth2 = defaultClient.authentications['OAuth2'];
OAuth2.accessToken = 'YOUR ACCESS TOKEN';

let apiInstance = new FlatApi.ScoreApi();
let score = "score_example"; // String | Unique identifier of the score document. This can be a Flat Score unique identifier (i.e. `ScoreDetails.id`) or, if the score is also a Google Drive file, the Drive file unique identifier prefixed with `drive-` (e.g. `drive-0B000000000`). 
let opts = {
  'sharingKey': "sharingKey_example" // String | This sharing key must be specified to access to a score or collection with a `privacy` mode set to `privateLink` and the current user is not a collaborator of the document. 
};
apiInstance.getScoreCollaborators(score, opts, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **score** | **String**| Unique identifier of the score document. This can be a Flat Score unique identifier (i.e. &#x60;ScoreDetails.id&#x60;) or, if the score is also a Google Drive file, the Drive file unique identifier prefixed with &#x60;drive-&#x60; (e.g. &#x60;drive-0B000000000&#x60;).  | 
 **sharingKey** | **String**| This sharing key must be specified to access to a score or collection with a &#x60;privacy&#x60; mode set to &#x60;privateLink&#x60; and the current user is not a collaborator of the document.  | [optional] 

### Return type

[**[ResourceCollaborator]**](ResourceCollaborator.md)

### Authorization

[OAuth2](../README.md#OAuth2)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getScoreComments

> [ScoreComment] getScoreComments(score, opts)

List comments

This method lists the different comments added on a music score (documents and inline) sorted by their post dates.

### Example

```javascript
import FlatApi from 'flat-api';
let defaultClient = FlatApi.ApiClient.instance;
// Configure OAuth2 access token for authorization: OAuth2
let OAuth2 = defaultClient.authentications['OAuth2'];
OAuth2.accessToken = 'YOUR ACCESS TOKEN';

let apiInstance = new FlatApi.ScoreApi();
let score = "score_example"; // String | Unique identifier of the score document. This can be a Flat Score unique identifier (i.e. `ScoreDetails.id`) or, if the score is also a Google Drive file, the Drive file unique identifier prefixed with `drive-` (e.g. `drive-0B000000000`). 
let opts = {
  'sharingKey': "sharingKey_example", // String | This sharing key must be specified to access to a score or collection with a `privacy` mode set to `privateLink` and the current user is not a collaborator of the document. 
  'type': "type_example", // String | Filter the comments by type
  'sort': "sort_example", // String | Sort
  'direction': "direction_example" // String | Sort direction
};
apiInstance.getScoreComments(score, opts, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **score** | **String**| Unique identifier of the score document. This can be a Flat Score unique identifier (i.e. &#x60;ScoreDetails.id&#x60;) or, if the score is also a Google Drive file, the Drive file unique identifier prefixed with &#x60;drive-&#x60; (e.g. &#x60;drive-0B000000000&#x60;).  | 
 **sharingKey** | **String**| This sharing key must be specified to access to a score or collection with a &#x60;privacy&#x60; mode set to &#x60;privateLink&#x60; and the current user is not a collaborator of the document.  | [optional] 
 **type** | **String**| Filter the comments by type | [optional] 
 **sort** | **String**| Sort | [optional] 
 **direction** | **String**| Sort direction | [optional] 

### Return type

[**[ScoreComment]**](ScoreComment.md)

### Authorization

[OAuth2](../README.md#OAuth2)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getScoreRevision

> ScoreRevision getScoreRevision(score, revision, opts)

Get a score revision

When creating a score or saving a new version of a score, a revision is created in our storage. This method allows you to get a specific revision metadata. 

### Example

```javascript
import FlatApi from 'flat-api';
let defaultClient = FlatApi.ApiClient.instance;
// Configure OAuth2 access token for authorization: OAuth2
let OAuth2 = defaultClient.authentications['OAuth2'];
OAuth2.accessToken = 'YOUR ACCESS TOKEN';

let apiInstance = new FlatApi.ScoreApi();
let score = "score_example"; // String | Unique identifier of the score document. This can be a Flat Score unique identifier (i.e. `ScoreDetails.id`) or, if the score is also a Google Drive file, the Drive file unique identifier prefixed with `drive-` (e.g. `drive-0B000000000`). 
let revision = "revision_example"; // String | Unique identifier of a score revision. You can use `last` to fetch the information related to the last version created. 
let opts = {
  'sharingKey': "sharingKey_example" // String | This sharing key must be specified to access to a score or collection with a `privacy` mode set to `privateLink` and the current user is not a collaborator of the document. 
};
apiInstance.getScoreRevision(score, revision, opts, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **score** | **String**| Unique identifier of the score document. This can be a Flat Score unique identifier (i.e. &#x60;ScoreDetails.id&#x60;) or, if the score is also a Google Drive file, the Drive file unique identifier prefixed with &#x60;drive-&#x60; (e.g. &#x60;drive-0B000000000&#x60;).  | 
 **revision** | **String**| Unique identifier of a score revision. You can use &#x60;last&#x60; to fetch the information related to the last version created.  | 
 **sharingKey** | **String**| This sharing key must be specified to access to a score or collection with a &#x60;privacy&#x60; mode set to &#x60;privateLink&#x60; and the current user is not a collaborator of the document.  | [optional] 

### Return type

[**ScoreRevision**](ScoreRevision.md)

### Authorization

[OAuth2](../README.md#OAuth2)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getScoreRevisionData

> File getScoreRevisionData(score, revision, format, opts)

Get a score revision data

Retrieve the file corresponding to a score revision (the following formats are available: Flat JSON/Adagio JSON &#x60;json&#x60;, MusicXML &#x60;mxl&#x60;/&#x60;xml&#x60;, MP3 &#x60;mp3&#x60;, WAV &#x60;wav&#x60;, MIDI &#x60;midi&#x60;, or a tumbnail of the first page &#x60;thumbnail.png&#x60;). 

### Example

```javascript
import FlatApi from 'flat-api';
let defaultClient = FlatApi.ApiClient.instance;
// Configure OAuth2 access token for authorization: OAuth2
let OAuth2 = defaultClient.authentications['OAuth2'];
OAuth2.accessToken = 'YOUR ACCESS TOKEN';

let apiInstance = new FlatApi.ScoreApi();
let score = "score_example"; // String | Unique identifier of the score document. This can be a Flat Score unique identifier (i.e. `ScoreDetails.id`) or, if the score is also a Google Drive file, the Drive file unique identifier prefixed with `drive-` (e.g. `drive-0B000000000`). 
let revision = "revision_example"; // String | Unique identifier of a score revision. You can use `last` to fetch the information related to the last version created. 
let format = "format_example"; // String | The format of the file you will retrieve
let opts = {
  'sharingKey': "sharingKey_example", // String | This sharing key must be specified to access to a score or collection with a `privacy` mode set to `privateLink` and the current user is not a collaborator of the document. 
  'parts': "parts_example", // String | An optional a set of parts to be exported. This parameter must be specified with a list of integers. For example \"1,2,5\". 
  'onlyCached': true // Boolean | Only return files already generated and cached in Flat's production cache. If the file is not availabe, a 404 will be returned 
};
apiInstance.getScoreRevisionData(score, revision, format, opts, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **score** | **String**| Unique identifier of the score document. This can be a Flat Score unique identifier (i.e. &#x60;ScoreDetails.id&#x60;) or, if the score is also a Google Drive file, the Drive file unique identifier prefixed with &#x60;drive-&#x60; (e.g. &#x60;drive-0B000000000&#x60;).  | 
 **revision** | **String**| Unique identifier of a score revision. You can use &#x60;last&#x60; to fetch the information related to the last version created.  | 
 **format** | **String**| The format of the file you will retrieve | 
 **sharingKey** | **String**| This sharing key must be specified to access to a score or collection with a &#x60;privacy&#x60; mode set to &#x60;privateLink&#x60; and the current user is not a collaborator of the document.  | [optional] 
 **parts** | **String**| An optional a set of parts to be exported. This parameter must be specified with a list of integers. For example \&quot;1,2,5\&quot;.  | [optional] 
 **onlyCached** | **Boolean**| Only return files already generated and cached in Flat&#39;s production cache. If the file is not availabe, a 404 will be returned  | [optional] 

### Return type

**File**

### Authorization

[OAuth2](../README.md#OAuth2)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json, application/vnd.recordare.musicxml+xml, application/vnd.recordare.musicxml, audio/mp3, audio/wav, audio/midi, image/png


## getScoreRevisions

> [ScoreRevision] getScoreRevisions(score, opts)

List the revisions

When creating a score or saving a new version of a score, a revision is created in our storage. This method allows you to list all of them, sorted by last modification.  Depending the plan of the account, this list can be trunked to the few last revisions. 

### Example

```javascript
import FlatApi from 'flat-api';
let defaultClient = FlatApi.ApiClient.instance;
// Configure OAuth2 access token for authorization: OAuth2
let OAuth2 = defaultClient.authentications['OAuth2'];
OAuth2.accessToken = 'YOUR ACCESS TOKEN';

let apiInstance = new FlatApi.ScoreApi();
let score = "score_example"; // String | Unique identifier of the score document. This can be a Flat Score unique identifier (i.e. `ScoreDetails.id`) or, if the score is also a Google Drive file, the Drive file unique identifier prefixed with `drive-` (e.g. `drive-0B000000000`). 
let opts = {
  'sharingKey': "sharingKey_example" // String | This sharing key must be specified to access to a score or collection with a `privacy` mode set to `privateLink` and the current user is not a collaborator of the document. 
};
apiInstance.getScoreRevisions(score, opts, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **score** | **String**| Unique identifier of the score document. This can be a Flat Score unique identifier (i.e. &#x60;ScoreDetails.id&#x60;) or, if the score is also a Google Drive file, the Drive file unique identifier prefixed with &#x60;drive-&#x60; (e.g. &#x60;drive-0B000000000&#x60;).  | 
 **sharingKey** | **String**| This sharing key must be specified to access to a score or collection with a &#x60;privacy&#x60; mode set to &#x60;privateLink&#x60; and the current user is not a collaborator of the document.  | [optional] 

### Return type

[**[ScoreRevision]**](ScoreRevision.md)

### Authorization

[OAuth2](../README.md#OAuth2)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getScoreSubmissions

> [AssignmentSubmission] getScoreSubmissions(score)

List submissions related to the score

This API call will list the different assignments submissions where the score is attached. This method can be used by anyone that are part of the organization and have at least read access to the document. 

### Example

```javascript
import FlatApi from 'flat-api';
let defaultClient = FlatApi.ApiClient.instance;
// Configure OAuth2 access token for authorization: OAuth2
let OAuth2 = defaultClient.authentications['OAuth2'];
OAuth2.accessToken = 'YOUR ACCESS TOKEN';

let apiInstance = new FlatApi.ScoreApi();
let score = "score_example"; // String | Unique identifier of the score document. This can be a Flat Score unique identifier (i.e. `ScoreDetails.id`) or, if the score is also a Google Drive file, the Drive file unique identifier prefixed with `drive-` (e.g. `drive-0B000000000`). 
apiInstance.getScoreSubmissions(score, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **score** | **String**| Unique identifier of the score document. This can be a Flat Score unique identifier (i.e. &#x60;ScoreDetails.id&#x60;) or, if the score is also a Google Drive file, the Drive file unique identifier prefixed with &#x60;drive-&#x60; (e.g. &#x60;drive-0B000000000&#x60;).  | 

### Return type

[**[AssignmentSubmission]**](AssignmentSubmission.md)

### Authorization

[OAuth2](../README.md#OAuth2)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getScoreTrack

> ScoreTrack getScoreTrack(score, track, opts)

Retrieve the details of an audio or video track linked to a score

### Example

```javascript
import FlatApi from 'flat-api';
let defaultClient = FlatApi.ApiClient.instance;
// Configure OAuth2 access token for authorization: OAuth2
let OAuth2 = defaultClient.authentications['OAuth2'];
OAuth2.accessToken = 'YOUR ACCESS TOKEN';

let apiInstance = new FlatApi.ScoreApi();
let score = "score_example"; // String | Unique identifier of the score document. This can be a Flat Score unique identifier (i.e. `ScoreDetails.id`) or, if the score is also a Google Drive file, the Drive file unique identifier prefixed with `drive-` (e.g. `drive-0B000000000`). 
let track = "track_example"; // String | Unique identifier of a score audio track 
let opts = {
  'sharingKey': "sharingKey_example" // String | This sharing key must be specified to access to a score or collection with a `privacy` mode set to `privateLink` and the current user is not a collaborator of the document. 
};
apiInstance.getScoreTrack(score, track, opts, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **score** | **String**| Unique identifier of the score document. This can be a Flat Score unique identifier (i.e. &#x60;ScoreDetails.id&#x60;) or, if the score is also a Google Drive file, the Drive file unique identifier prefixed with &#x60;drive-&#x60; (e.g. &#x60;drive-0B000000000&#x60;).  | 
 **track** | **String**| Unique identifier of a score audio track  | 
 **sharingKey** | **String**| This sharing key must be specified to access to a score or collection with a &#x60;privacy&#x60; mode set to &#x60;privateLink&#x60; and the current user is not a collaborator of the document.  | [optional] 

### Return type

[**ScoreTrack**](ScoreTrack.md)

### Authorization

[OAuth2](../README.md#OAuth2)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getUserScores

> [ScoreDetails] getUserScores(user, opts)

List user&#39;s scores

Get the list of public scores owned by a User.  **DEPRECATED**: Please note that the current behavior will be deprecrated on **2019-01-01**. This method will no longer list private and shared scores, but only public scores of a Flat account. If you want to access to private scores, please use the [Collections API](#tag/Collection) instead. 

### Example

```javascript
import FlatApi from 'flat-api';
let defaultClient = FlatApi.ApiClient.instance;
// Configure OAuth2 access token for authorization: OAuth2
let OAuth2 = defaultClient.authentications['OAuth2'];
OAuth2.accessToken = 'YOUR ACCESS TOKEN';

let apiInstance = new FlatApi.ScoreApi();
let user = "user_example"; // String | Unique identifier of a Flat user. If you authenticated, you can use `me` to refer to the current user. 
let opts = {
  'parent': "parent_example" // String | Filter the score forked from the score id `parent`
};
apiInstance.getUserScores(user, opts, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **user** | **String**| Unique identifier of a Flat user. If you authenticated, you can use &#x60;me&#x60; to refer to the current user.  | 
 **parent** | **String**| Filter the score forked from the score id &#x60;parent&#x60; | [optional] 

### Return type

[**[ScoreDetails]**](ScoreDetails.md)

### Authorization

[OAuth2](../README.md#OAuth2)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## listScoreTracks

> [ScoreTrack] listScoreTracks(score, opts)

List the audio or video tracks linked to a score

### Example

```javascript
import FlatApi from 'flat-api';
let defaultClient = FlatApi.ApiClient.instance;
// Configure OAuth2 access token for authorization: OAuth2
let OAuth2 = defaultClient.authentications['OAuth2'];
OAuth2.accessToken = 'YOUR ACCESS TOKEN';

let apiInstance = new FlatApi.ScoreApi();
let score = "score_example"; // String | Unique identifier of the score document. This can be a Flat Score unique identifier (i.e. `ScoreDetails.id`) or, if the score is also a Google Drive file, the Drive file unique identifier prefixed with `drive-` (e.g. `drive-0B000000000`). 
let opts = {
  'sharingKey': "sharingKey_example" // String | This sharing key must be specified to access to a score or collection with a `privacy` mode set to `privateLink` and the current user is not a collaborator of the document. 
};
apiInstance.listScoreTracks(score, opts, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **score** | **String**| Unique identifier of the score document. This can be a Flat Score unique identifier (i.e. &#x60;ScoreDetails.id&#x60;) or, if the score is also a Google Drive file, the Drive file unique identifier prefixed with &#x60;drive-&#x60; (e.g. &#x60;drive-0B000000000&#x60;).  | 
 **sharingKey** | **String**| This sharing key must be specified to access to a score or collection with a &#x60;privacy&#x60; mode set to &#x60;privateLink&#x60; and the current user is not a collaborator of the document.  | [optional] 

### Return type

[**[ScoreTrack]**](ScoreTrack.md)

### Authorization

[OAuth2](../README.md#OAuth2)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## markScoreCommentResolved

> markScoreCommentResolved(score, comment, opts)

Mark the comment as resolved

### Example

```javascript
import FlatApi from 'flat-api';
let defaultClient = FlatApi.ApiClient.instance;
// Configure OAuth2 access token for authorization: OAuth2
let OAuth2 = defaultClient.authentications['OAuth2'];
OAuth2.accessToken = 'YOUR ACCESS TOKEN';

let apiInstance = new FlatApi.ScoreApi();
let score = "score_example"; // String | Unique identifier of the score document. This can be a Flat Score unique identifier (i.e. `ScoreDetails.id`) or, if the score is also a Google Drive file, the Drive file unique identifier prefixed with `drive-` (e.g. `drive-0B000000000`). 
let comment = "comment_example"; // String | Unique identifier of a sheet music comment 
let opts = {
  'sharingKey': "sharingKey_example" // String | This sharing key must be specified to access to a score or collection with a `privacy` mode set to `privateLink` and the current user is not a collaborator of the document. 
};
apiInstance.markScoreCommentResolved(score, comment, opts, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **score** | **String**| Unique identifier of the score document. This can be a Flat Score unique identifier (i.e. &#x60;ScoreDetails.id&#x60;) or, if the score is also a Google Drive file, the Drive file unique identifier prefixed with &#x60;drive-&#x60; (e.g. &#x60;drive-0B000000000&#x60;).  | 
 **comment** | **String**| Unique identifier of a sheet music comment  | 
 **sharingKey** | **String**| This sharing key must be specified to access to a score or collection with a &#x60;privacy&#x60; mode set to &#x60;privateLink&#x60; and the current user is not a collaborator of the document.  | [optional] 

### Return type

null (empty response body)

### Authorization

[OAuth2](../README.md#OAuth2)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## markScoreCommentUnresolved

> markScoreCommentUnresolved(score, comment, opts)

Mark the comment as unresolved

### Example

```javascript
import FlatApi from 'flat-api';
let defaultClient = FlatApi.ApiClient.instance;
// Configure OAuth2 access token for authorization: OAuth2
let OAuth2 = defaultClient.authentications['OAuth2'];
OAuth2.accessToken = 'YOUR ACCESS TOKEN';

let apiInstance = new FlatApi.ScoreApi();
let score = "score_example"; // String | Unique identifier of the score document. This can be a Flat Score unique identifier (i.e. `ScoreDetails.id`) or, if the score is also a Google Drive file, the Drive file unique identifier prefixed with `drive-` (e.g. `drive-0B000000000`). 
let comment = "comment_example"; // String | Unique identifier of a sheet music comment 
let opts = {
  'sharingKey': "sharingKey_example" // String | This sharing key must be specified to access to a score or collection with a `privacy` mode set to `privateLink` and the current user is not a collaborator of the document. 
};
apiInstance.markScoreCommentUnresolved(score, comment, opts, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **score** | **String**| Unique identifier of the score document. This can be a Flat Score unique identifier (i.e. &#x60;ScoreDetails.id&#x60;) or, if the score is also a Google Drive file, the Drive file unique identifier prefixed with &#x60;drive-&#x60; (e.g. &#x60;drive-0B000000000&#x60;).  | 
 **comment** | **String**| Unique identifier of a sheet music comment  | 
 **sharingKey** | **String**| This sharing key must be specified to access to a score or collection with a &#x60;privacy&#x60; mode set to &#x60;privateLink&#x60; and the current user is not a collaborator of the document.  | [optional] 

### Return type

null (empty response body)

### Authorization

[OAuth2](../README.md#OAuth2)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## postScoreComment

> ScoreComment postScoreComment(score, body, opts)

Post a new comment

Post a document or a contextualized comment on a document.  Please note that this method includes an anti-spam system for public scores. We don&#39;t guarantee that your comments will be accepted and displayed to end-user. Comments are be blocked by returning a &#x60;403&#x60; HTTP error and hidden from other users when the &#x60;spam&#x60; property is &#x60;true&#x60;. 

### Example

```javascript
import FlatApi from 'flat-api';
let defaultClient = FlatApi.ApiClient.instance;
// Configure OAuth2 access token for authorization: OAuth2
let OAuth2 = defaultClient.authentications['OAuth2'];
OAuth2.accessToken = 'YOUR ACCESS TOKEN';

let apiInstance = new FlatApi.ScoreApi();
let score = "score_example"; // String | Unique identifier of the score document. This can be a Flat Score unique identifier (i.e. `ScoreDetails.id`) or, if the score is also a Google Drive file, the Drive file unique identifier prefixed with `drive-` (e.g. `drive-0B000000000`). 
let body = new FlatApi.ScoreCommentCreation(); // ScoreCommentCreation | 
let opts = {
  'sharingKey': "sharingKey_example" // String | This sharing key must be specified to access to a score or collection with a `privacy` mode set to `privateLink` and the current user is not a collaborator of the document. 
};
apiInstance.postScoreComment(score, body, opts, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **score** | **String**| Unique identifier of the score document. This can be a Flat Score unique identifier (i.e. &#x60;ScoreDetails.id&#x60;) or, if the score is also a Google Drive file, the Drive file unique identifier prefixed with &#x60;drive-&#x60; (e.g. &#x60;drive-0B000000000&#x60;).  | 
 **body** | [**ScoreCommentCreation**](ScoreCommentCreation.md)|  | 
 **sharingKey** | **String**| This sharing key must be specified to access to a score or collection with a &#x60;privacy&#x60; mode set to &#x60;privateLink&#x60; and the current user is not a collaborator of the document.  | [optional] 

### Return type

[**ScoreComment**](ScoreComment.md)

### Authorization

[OAuth2](../README.md#OAuth2)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## removeScoreCollaborator

> removeScoreCollaborator(score, collaborator)

Delete a collaborator

Remove the specified collaborator from the score 

### Example

```javascript
import FlatApi from 'flat-api';
let defaultClient = FlatApi.ApiClient.instance;
// Configure OAuth2 access token for authorization: OAuth2
let OAuth2 = defaultClient.authentications['OAuth2'];
OAuth2.accessToken = 'YOUR ACCESS TOKEN';

let apiInstance = new FlatApi.ScoreApi();
let score = "score_example"; // String | Unique identifier of the score document. This can be a Flat Score unique identifier (i.e. `ScoreDetails.id`) or, if the score is also a Google Drive file, the Drive file unique identifier prefixed with `drive-` (e.g. `drive-0B000000000`). 
let collaborator = "collaborator_example"; // String | Unique identifier of a **collaborator permission**, or unique identifier of a **User**, or unique identifier of a **Group** 
apiInstance.removeScoreCollaborator(score, collaborator, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **score** | **String**| Unique identifier of the score document. This can be a Flat Score unique identifier (i.e. &#x60;ScoreDetails.id&#x60;) or, if the score is also a Google Drive file, the Drive file unique identifier prefixed with &#x60;drive-&#x60; (e.g. &#x60;drive-0B000000000&#x60;).  | 
 **collaborator** | **String**| Unique identifier of a **collaborator permission**, or unique identifier of a **User**, or unique identifier of a **Group**  | 

### Return type

null (empty response body)

### Authorization

[OAuth2](../README.md#OAuth2)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## untrashScore

> untrashScore(score)

Untrash a score

This method will remove the score from the &#x60;trash&#x60; collection and from the deletion queue, and add it back to the original collections. 

### Example

```javascript
import FlatApi from 'flat-api';
let defaultClient = FlatApi.ApiClient.instance;
// Configure OAuth2 access token for authorization: OAuth2
let OAuth2 = defaultClient.authentications['OAuth2'];
OAuth2.accessToken = 'YOUR ACCESS TOKEN';

let apiInstance = new FlatApi.ScoreApi();
let score = "score_example"; // String | Unique identifier of the score document. This can be a Flat Score unique identifier (i.e. `ScoreDetails.id`) or, if the score is also a Google Drive file, the Drive file unique identifier prefixed with `drive-` (e.g. `drive-0B000000000`). 
apiInstance.untrashScore(score, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **score** | **String**| Unique identifier of the score document. This can be a Flat Score unique identifier (i.e. &#x60;ScoreDetails.id&#x60;) or, if the score is also a Google Drive file, the Drive file unique identifier prefixed with &#x60;drive-&#x60; (e.g. &#x60;drive-0B000000000&#x60;).  | 

### Return type

null (empty response body)

### Authorization

[OAuth2](../README.md#OAuth2)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## updateScoreComment

> ScoreComment updateScoreComment(score, comment, body, opts)

Update an existing comment

### Example

```javascript
import FlatApi from 'flat-api';
let defaultClient = FlatApi.ApiClient.instance;
// Configure OAuth2 access token for authorization: OAuth2
let OAuth2 = defaultClient.authentications['OAuth2'];
OAuth2.accessToken = 'YOUR ACCESS TOKEN';

let apiInstance = new FlatApi.ScoreApi();
let score = "score_example"; // String | Unique identifier of the score document. This can be a Flat Score unique identifier (i.e. `ScoreDetails.id`) or, if the score is also a Google Drive file, the Drive file unique identifier prefixed with `drive-` (e.g. `drive-0B000000000`). 
let comment = "comment_example"; // String | Unique identifier of a sheet music comment 
let body = new FlatApi.ScoreCommentUpdate(); // ScoreCommentUpdate | 
let opts = {
  'sharingKey': "sharingKey_example" // String | This sharing key must be specified to access to a score or collection with a `privacy` mode set to `privateLink` and the current user is not a collaborator of the document. 
};
apiInstance.updateScoreComment(score, comment, body, opts, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **score** | **String**| Unique identifier of the score document. This can be a Flat Score unique identifier (i.e. &#x60;ScoreDetails.id&#x60;) or, if the score is also a Google Drive file, the Drive file unique identifier prefixed with &#x60;drive-&#x60; (e.g. &#x60;drive-0B000000000&#x60;).  | 
 **comment** | **String**| Unique identifier of a sheet music comment  | 
 **body** | [**ScoreCommentUpdate**](ScoreCommentUpdate.md)|  | 
 **sharingKey** | **String**| This sharing key must be specified to access to a score or collection with a &#x60;privacy&#x60; mode set to &#x60;privateLink&#x60; and the current user is not a collaborator of the document.  | [optional] 

### Return type

[**ScoreComment**](ScoreComment.md)

### Authorization

[OAuth2](../README.md#OAuth2)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## updateScoreTrack

> ScoreTrack updateScoreTrack(score, track, body)

Update an audio or video track linked to a score

### Example

```javascript
import FlatApi from 'flat-api';
let defaultClient = FlatApi.ApiClient.instance;
// Configure OAuth2 access token for authorization: OAuth2
let OAuth2 = defaultClient.authentications['OAuth2'];
OAuth2.accessToken = 'YOUR ACCESS TOKEN';

let apiInstance = new FlatApi.ScoreApi();
let score = "score_example"; // String | Unique identifier of the score document. This can be a Flat Score unique identifier (i.e. `ScoreDetails.id`) or, if the score is also a Google Drive file, the Drive file unique identifier prefixed with `drive-` (e.g. `drive-0B000000000`). 
let track = "track_example"; // String | Unique identifier of a score audio track 
let body = new FlatApi.ScoreTrackUpdate(); // ScoreTrackUpdate | 
apiInstance.updateScoreTrack(score, track, body, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **score** | **String**| Unique identifier of the score document. This can be a Flat Score unique identifier (i.e. &#x60;ScoreDetails.id&#x60;) or, if the score is also a Google Drive file, the Drive file unique identifier prefixed with &#x60;drive-&#x60; (e.g. &#x60;drive-0B000000000&#x60;).  | 
 **track** | **String**| Unique identifier of a score audio track  | 
 **body** | [**ScoreTrackUpdate**](ScoreTrackUpdate.md)|  | 

### Return type

[**ScoreTrack**](ScoreTrack.md)

### Authorization

[OAuth2](../README.md#OAuth2)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

