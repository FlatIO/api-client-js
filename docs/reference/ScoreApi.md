# ScoreApi

All URIs are relative to *https://api.flat.io/v2*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**addScoreCollaborator**](ScoreApi.md#addscorecollaborator) | **POST** /scores/{score}/collaborators | Add a new collaborator |
| [**addScoreTrack**](ScoreApi.md#addscoretrack) | **POST** /scores/{score}/tracks | Add a new video or audio track to the score |
| [**createExportTask**](ScoreApi.md#createexporttask) | **POST** /scores/{score}/revisions/{revision}/{format}/task | Create a new score export task |
| [**createScore**](ScoreApi.md#createscore) | **POST** /scores | Create a new score |
| [**createScoreRevision**](ScoreApi.md#createscorerevision) | **POST** /scores/{score}/revisions | Create a new revision |
| [**deleteScore**](ScoreApi.md#deletescore) | **DELETE** /scores/{score} | Delete a score |
| [**deleteScoreComment**](ScoreApi.md#deletescorecomment) | **DELETE** /scores/{score}/comments/{comment} | Delete a comment |
| [**deleteScoreTrack**](ScoreApi.md#deletescoretrack) | **DELETE** /scores/{score}/tracks/{track} | Remove an audio or video track linked to the score |
| [**editScore**](ScoreApi.md#editscore) | **PUT** /scores/{score} | Edit a score\&#39;s metadata |
| [**forkScore**](ScoreApi.md#forkscore) | **POST** /scores/{score}/fork | Fork a score |
| [**getGroupScores**](ScoreApi.md#getgroupscores) | **GET** /groups/{group}/scores | List group\&#39;s scores |
| [**getScore**](ScoreApi.md#getscore) | **GET** /scores/{score} | Get a score\&#39;s metadata |
| [**getScoreCollaborator**](ScoreApi.md#getscorecollaborator) | **GET** /scores/{score}/collaborators/{collaborator} | Get a collaborator |
| [**getScoreCollaborators**](ScoreApi.md#getscorecollaborators) | **GET** /scores/{score}/collaborators | List the collaborators |
| [**getScoreComments**](ScoreApi.md#getscorecomments) | **GET** /scores/{score}/comments | List comments |
| [**getScoreRevision**](ScoreApi.md#getscorerevision) | **GET** /scores/{score}/revisions/{revision} | Get a score revision |
| [**getScoreRevisionData**](ScoreApi.md#getscorerevisiondata) | **GET** /scores/{score}/revisions/{revision}/{format} | Get a score revision data |
| [**getScoreRevisions**](ScoreApi.md#getscorerevisions) | **GET** /scores/{score}/revisions | List the revisions |
| [**getScoreSubmissions**](ScoreApi.md#getscoresubmissions) | **GET** /scores/{score}/submissions | List submissions related to the score |
| [**getScoreTrack**](ScoreApi.md#getscoretrack) | **GET** /scores/{score}/tracks/{track} | Retrieve the details of an audio or video track linked to a score |
| [**getUserLikes**](ScoreApi.md#getuserlikes) | **GET** /users/{user}/likes | List liked scores |
| [**getUserScores**](ScoreApi.md#getuserscores) | **GET** /users/{user}/scores | List user\&#39;s scores |
| [**listScoreTracks**](ScoreApi.md#listscoretracks) | **GET** /scores/{score}/tracks | List the audio or video tracks linked to a score |
| [**markScoreCommentResolved**](ScoreApi.md#markscorecommentresolved) | **PUT** /scores/{score}/comments/{comment}/resolved | Mark the comment as resolved |
| [**markScoreCommentUnresolved**](ScoreApi.md#markscorecommentunresolved) | **DELETE** /scores/{score}/comments/{comment}/resolved | Mark the comment as unresolved |
| [**postScoreComment**](ScoreApi.md#postscorecomment) | **POST** /scores/{score}/comments | Post a new comment |
| [**removeScoreCollaborator**](ScoreApi.md#removescorecollaborator) | **DELETE** /scores/{score}/collaborators/{collaborator} | Delete a collaborator |
| [**untrashScore**](ScoreApi.md#untrashscore) | **POST** /scores/{score}/untrash | Untrash a score |
| [**updateScoreComment**](ScoreApi.md#updatescorecomment) | **PUT** /scores/{score}/comments/{comment} | Update an existing comment |
| [**updateScoreTrack**](ScoreApi.md#updatescoretrack) | **PUT** /scores/{score}/tracks/{track} | Update an audio or video track linked to a score |



## addScoreCollaborator

> ResourceCollaborator addScoreCollaborator(score, body)

Add a new collaborator

Share a score with a single user or a group. This API call allows to add, invite and update the collaborators of a resource. - To add an existing Flat user to the resource, specify its unique identifier in the &#x60;user&#x60; property. - To invite an external user to the resource, specify its email in the &#x60;userEmail&#x60; property. - To add a Flat group to the resource, specify its unique identifier in the &#x60;group&#x60; property. - To update an existing collaborator, process the same request with different rights. 

### Example

```ts
import {
  Configuration,
  ScoreApi,
} from 'flat-api';
import type { AddScoreCollaboratorRequest } from 'flat-api';

async function example() {
  console.log("🚀 Testing flat-api SDK...");
  const config = new Configuration({ 
    // To configure OAuth2 access token for authorization: OAuth2 accessCode
    accessToken: "YOUR ACCESS TOKEN",
  });
  const api = new ScoreApi(config);

  const body = {
    // string | Unique identifier of the score document. This can be a Flat Score unique identifier (i.e. `ScoreDetails.id`) or, if the score is also a Google Drive file, the Drive file unique identifier prefixed with `drive-` (e.g. `drive-0B000000000`). 
    score: score_example,
    // ResourceCollaboratorCreation
    body: ...,
  } satisfies AddScoreCollaboratorRequest;

  try {
    const data = await api.addScoreCollaborator(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **score** | `string` | Unique identifier of the score document. This can be a Flat Score unique identifier (i.e. &#x60;ScoreDetails.id&#x60;) or, if the score is also a Google Drive file, the Drive file unique identifier prefixed with &#x60;drive-&#x60; (e.g. &#x60;drive-0B000000000&#x60;).  | [Defaults to `undefined`] |
| **body** | [ResourceCollaboratorCreation](ResourceCollaboratorCreation.md) |  | |

### Return type

[**ResourceCollaborator**](ResourceCollaborator.md)

### Authorization

[OAuth2 accessCode](../README.md#OAuth2-accessCode)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | The newly added collaborator metadata |  -  |
| **402** | Account overquota |  -  |
| **403** | Not granted to manage this score |  -  |
| **404** | Score not found |  -  |
| **0** | Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## addScoreTrack

> ScoreTrackCreationResponse addScoreTrack(score, body)

Add a new video or audio track to the score

Use this method to add new track to the score. This track can then be played on flat.io or in an embedded score. This API method support medias hosted on SoundCloud, YouTube and Vimeo. 

### Example

```ts
import {
  Configuration,
  ScoreApi,
} from 'flat-api';
import type { AddScoreTrackRequest } from 'flat-api';

async function example() {
  console.log("🚀 Testing flat-api SDK...");
  const config = new Configuration({ 
    // To configure OAuth2 access token for authorization: OAuth2 accessCode
    accessToken: "YOUR ACCESS TOKEN",
  });
  const api = new ScoreApi(config);

  const body = {
    // string | Unique identifier of the score document. This can be a Flat Score unique identifier (i.e. `ScoreDetails.id`) or, if the score is also a Google Drive file, the Drive file unique identifier prefixed with `drive-` (e.g. `drive-0B000000000`). 
    score: score_example,
    // ScoreTrackCreation
    body: ...,
  } satisfies AddScoreTrackRequest;

  try {
    const data = await api.addScoreTrack(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **score** | `string` | Unique identifier of the score document. This can be a Flat Score unique identifier (i.e. &#x60;ScoreDetails.id&#x60;) or, if the score is also a Google Drive file, the Drive file unique identifier prefixed with &#x60;drive-&#x60; (e.g. &#x60;drive-0B000000000&#x60;).  | [Defaults to `undefined`] |
| **body** | [ScoreTrackCreation](ScoreTrackCreation.md) |  | |

### Return type

[**ScoreTrackCreationResponse**](ScoreTrackCreationResponse.md)

### Authorization

[OAuth2 accessCode](../README.md#OAuth2-accessCode)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Created track |  -  |
| **403** | Not granted to access to this score |  -  |
| **404** | Score not found |  -  |
| **0** | Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## createExportTask

> Task createExportTask(score, revision, format, sharingKey, body)

Create a new score export task

Some of the exports of a score takes are longer to process than a simple API requests. Use this endpoint to launch a new export of one score hosted on Flat. 

### Example

```ts
import {
  Configuration,
  ScoreApi,
} from 'flat-api';
import type { CreateExportTaskRequest } from 'flat-api';

async function example() {
  console.log("🚀 Testing flat-api SDK...");
  const config = new Configuration({ 
    // To configure OAuth2 access token for authorization: OAuth2 accessCode
    accessToken: "YOUR ACCESS TOKEN",
  });
  const api = new ScoreApi(config);

  const body = {
    // string | Unique identifier of the score document. This can be a Flat Score unique identifier (i.e. `ScoreDetails.id`) or, if the score is also a Google Drive file, the Drive file unique identifier prefixed with `drive-` (e.g. `drive-0B000000000`). 
    score: score_example,
    // string | Unique identifier of a score revision. You can use `last` to fetch the information related to the last version created. 
    revision: revision_example,
    // 'mp3' | 'wav' | 'practicefirst' | The format of the file that will be generated or the target service name where the file will be exported
    format: format_example,
    // string | This sharing key must be specified to access to a score or collection with a `privacy` mode set to `privateLink` and the current user is not a collaborator of the document.  (optional)
    sharingKey: sharingKey_example,
    // TaskExportOptions (optional)
    body: ...,
  } satisfies CreateExportTaskRequest;

  try {
    const data = await api.createExportTask(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **score** | `string` | Unique identifier of the score document. This can be a Flat Score unique identifier (i.e. &#x60;ScoreDetails.id&#x60;) or, if the score is also a Google Drive file, the Drive file unique identifier prefixed with &#x60;drive-&#x60; (e.g. &#x60;drive-0B000000000&#x60;).  | [Defaults to `undefined`] |
| **revision** | `string` | Unique identifier of a score revision. You can use &#x60;last&#x60; to fetch the information related to the last version created.  | [Defaults to `undefined`] |
| **format** | `mp3`, `wav`, `practicefirst` | The format of the file that will be generated or the target service name where the file will be exported | [Defaults to `undefined`] [Enum: mp3, wav, practicefirst] |
| **sharingKey** | `string` | This sharing key must be specified to access to a score or collection with a &#x60;privacy&#x60; mode set to &#x60;privateLink&#x60; and the current user is not a collaborator of the document.  | [Optional] [Defaults to `undefined`] |
| **body** | [TaskExportOptions](TaskExportOptions.md) |  | [Optional] |

### Return type

[**Task**](Task.md)

### Authorization

[OAuth2 accessCode](../README.md#OAuth2-accessCode)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Task associated to the generation of the file |  -  |
| **402** | Account overquota |  -  |
| **403** | Not granted to access to this score |  -  |
| **404** | Score or associated file not found |  -  |
| **0** | Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## createScore

> ScoreDetails createScore(body)

Create a new score

Use this API method to **create a new music score in the current User account**. This API endpoints provides 3 ways to create scores:  * &#x60;ScoreCreationBuilderData&#x60; : Create a blank score by providing the list of instruments to use. You can optionally customize the initial key signature, time signature, enable TABs, Chord grids, as well as the page layout. * &#x60;ScoreCreationFileImport&#x60;: Import a file to create the new Flat document.    **Preferred formats**:   * **MusicXML**: &#x60;.xml&#x60;, &#x60;.musicxml&#x60;, &#x60;.mxl&#x60; (compressed) — MIME: &#x60;vnd.recordare.musicxml+xml&#x60;, &#x60;vnd.recordare.musicxml&#x60;. This is the only format that preserves all notation data (articulations, dynamics, layout, etc.) with full round-trip support.   * **MIDI**: &#x60;.mid&#x60;, &#x60;.midi&#x60; — MIME: &#x60;audio/midi&#x60;. Only preserves pitch, timing, and instrument data; notation details are lost.    **Also supported** (converted to MusicXML on import, some notation details may be lost):   * **Guitar Pro**: &#x60;.gp&#x60;, &#x60;.gp3&#x60;, &#x60;.gp4&#x60;, &#x60;.gp5&#x60;, &#x60;.gpx&#x60;, &#x60;.gtp&#x60;   * **MuseScore**: &#x60;.mscz&#x60;, &#x60;.mscx&#x60;   * **Finale**: &#x60;.musx&#x60;   * **ABC notation**: &#x60;.abc&#x60; — MIME: &#x60;text/vnd.abc&#x60;   * **PowerTab**: &#x60;.ptb&#x60;   * **Capella**: &#x60;.cap&#x60;, &#x60;.capx&#x60;   * **MEI**: &#x60;.mei&#x60;   * **Overture**: &#x60;.ove&#x60;   * **TablEdit**: &#x60;.tef&#x60;   * **Band-in-a-Box**: &#x60;.mgu&#x60;, &#x60;.sgu&#x60;   * **Karaoke MIDI**: &#x60;.kar&#x60;   * **MuseData**: &#x60;.md&#x60;   * **Score Writer**: &#x60;.scw&#x60;   * **Bagpipe Music Writer**: &#x60;.bmw&#x60;, &#x60;.bww&#x60;   * **Encore**: &#x60;.enc&#x60;    **Scanned music** (requires &#x60;supportsTasks&#x60;, runs our music recognition and spends   credits):   * **PDF**: &#x60;.pdf&#x60;   * **Images**: &#x60;.jpg&#x60;, &#x60;.png&#x60;, &#x60;.webp&#x60;, &#x60;.tiff&#x60;, &#x60;.gif&#x60;, &#x60;.avif&#x60;, &#x60;.heic&#x60;, &#x60;.heif&#x60;    The file is identified by its own content, so its extension and any declared type do   not have to match. **One file per request**: a multi-page PDF or a multi-frame TIFF is   fine, but several separate images of the same score (a page photographed at a time)   need &#x60;createOmrJob&#x60;, which takes many inputs in one job and bills them as a single   document. Its live limits are served by &#x60;getOmrCapabilities&#x60;. * &#x60;ScoreCreationGoogleDriveImport&#x60;: Import an existing Google Drive file from the connected Google Drive account.  This API call will automatically create the first revision of the document, the score can be modified by the using our web application or by uploading a new revision of this file (&#x60;POST /v2/scores/{score}/revisions/{revision}&#x60;).  The currently authenticated user will be granted owner of the file and will be able to add other collaborators (users and groups).  If no &#x60;collection&#x60; is specified, the API will create the score in the most appropriate collection. When using an OAuth2 access token or a personal token, the score will be automatically added to your dedicated app collection in the account (&#x60;/v2/collections/app&#x60;).  If a &#x60;collection&#x60; is specified and this one has more public privacy settings than the score (e.g. &#x60;public&#x60; vs &#x60;private&#x60; for the score), the privacy settings of the created score will be adjusted to the collection ones.  You can check the adjusted privacy settings in the returned score &#x60;privacy&#x60;, and optionally adjust these settings if needed using &#x60;PUT /scores/{score}&#x60;. 

### Example

```ts
import {
  Configuration,
  ScoreApi,
} from 'flat-api';
import type { CreateScoreRequest } from 'flat-api';

async function example() {
  console.log("🚀 Testing flat-api SDK...");
  const config = new Configuration({ 
    // To configure OAuth2 access token for authorization: OAuth2 accessCode
    accessToken: "YOUR ACCESS TOKEN",
  });
  const api = new ScoreApi(config);

  const body = {
    // ScoreCreation
    body: ...,
  } satisfies CreateScoreRequest;

  try {
    const data = await api.createScore(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **body** | [ScoreCreation](ScoreCreation.md) |  | |

### Return type

[**ScoreDetails**](ScoreDetails.md)

### Authorization

[OAuth2 accessCode](../README.md#OAuth2-accessCode)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Score created |  * x-flat-score-revision -  <br>  * x-flat-score-revision-date -  <br>  |
| **202** | Score will be imported using an asynchronous task (the API client has set &#x60;supportsTasks&#x60; to true) |  -  |
| **400** | Bad score creation request |  -  |
| **402** | Account overquota or feature not included in plan |  -  |
| **0** | Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## createScoreRevision

> ScoreRevision createScoreRevision(score, body)

Create a new revision

Update a score by uploading a new revision for this one. 

### Example

```ts
import {
  Configuration,
  ScoreApi,
} from 'flat-api';
import type { CreateScoreRevisionRequest } from 'flat-api';

async function example() {
  console.log("🚀 Testing flat-api SDK...");
  const config = new Configuration({ 
    // To configure OAuth2 access token for authorization: OAuth2 accessCode
    accessToken: "YOUR ACCESS TOKEN",
  });
  const api = new ScoreApi(config);

  const body = {
    // string | Unique identifier of the score document. This can be a Flat Score unique identifier (i.e. `ScoreDetails.id`) or, if the score is also a Google Drive file, the Drive file unique identifier prefixed with `drive-` (e.g. `drive-0B000000000`). 
    score: score_example,
    // ScoreRevisionCreation
    body: ...,
  } satisfies CreateScoreRevisionRequest;

  try {
    const data = await api.createScoreRevision(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **score** | `string` | Unique identifier of the score document. This can be a Flat Score unique identifier (i.e. &#x60;ScoreDetails.id&#x60;) or, if the score is also a Google Drive file, the Drive file unique identifier prefixed with &#x60;drive-&#x60; (e.g. &#x60;drive-0B000000000&#x60;).  | [Defaults to `undefined`] |
| **body** | [ScoreRevisionCreation](ScoreRevisionCreation.md) |  | |

### Return type

[**ScoreRevision**](ScoreRevision.md)

### Authorization

[OAuth2 accessCode](../README.md#OAuth2-accessCode)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | The new created revision metadata |  -  |
| **402** | Account overquota |  -  |
| **403** | Not granted to modify this score |  -  |
| **404** | Score not found |  -  |
| **0** | Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## deleteScore

> deleteScore(score, now)

Delete a score

This method can be used by anyone that has at least read access to the document:  - When called by an owner/admin, it will schedule the deletion of the score, its revisions, and complete history. The score won\&#39;t be accessible anymore after calling this method and the user\&#39;s quota will directly be updated. - When called by a collaborator, the score will be unshared (i.e. removed from the account &amp; own collections). - When called by another user that has the score in its collections, the score will be removed from all the user collections. 

### Example

```ts
import {
  Configuration,
  ScoreApi,
} from 'flat-api';
import type { DeleteScoreRequest } from 'flat-api';

async function example() {
  console.log("🚀 Testing flat-api SDK...");
  const config = new Configuration({ 
    // To configure OAuth2 access token for authorization: OAuth2 accessCode
    accessToken: "YOUR ACCESS TOKEN",
  });
  const api = new ScoreApi(config);

  const body = {
    // string | Unique identifier of the score document. This can be a Flat Score unique identifier (i.e. `ScoreDetails.id`) or, if the score is also a Google Drive file, the Drive file unique identifier prefixed with `drive-` (e.g. `drive-0B000000000`). 
    score: score_example,
    // boolean | If `true`, the score deletion will be scheduled to be done ASAP (optional)
    now: true,
  } satisfies DeleteScoreRequest;

  try {
    const data = await api.deleteScore(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **score** | `string` | Unique identifier of the score document. This can be a Flat Score unique identifier (i.e. &#x60;ScoreDetails.id&#x60;) or, if the score is also a Google Drive file, the Drive file unique identifier prefixed with &#x60;drive-&#x60; (e.g. &#x60;drive-0B000000000&#x60;).  | [Defaults to `undefined`] |
| **now** | `boolean` | If &#x60;true&#x60;, the score deletion will be scheduled to be done ASAP | [Optional] [Defaults to `false`] |

### Return type

`void` (Empty response body)

### Authorization

[OAuth2 accessCode](../README.md#OAuth2-accessCode)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **204** | The score has been removed |  -  |
| **403** | Not granted to manage this score |  -  |
| **404** | Score not found |  -  |
| **0** | Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## deleteScoreComment

> deleteScoreComment(score, comment, eventProperties, sharingKey)

Delete a comment

### Example

```ts
import {
  Configuration,
  ScoreApi,
} from 'flat-api';
import type { DeleteScoreCommentRequest } from 'flat-api';

async function example() {
  console.log("🚀 Testing flat-api SDK...");
  const config = new Configuration({ 
    // To configure OAuth2 access token for authorization: OAuth2 accessCode
    accessToken: "YOUR ACCESS TOKEN",
  });
  const api = new ScoreApi(config);

  const body = {
    // string | Unique identifier of the score document. This can be a Flat Score unique identifier (i.e. `ScoreDetails.id`) or, if the score is also a Google Drive file, the Drive file unique identifier prefixed with `drive-` (e.g. `drive-0B000000000`). 
    score: score_example,
    // string | Unique identifier of a sheet music comment 
    comment: comment_example,
    // string | Optional analytics properties merged into XP tracking for this request.  JSON-encoded string representing event properties. Example:  - `?eventProperties={\"context\":\"discover\",\"screenLevel0\":\"home\"}`  (optional)
    eventProperties: {"context":"discover","screenLevel0":"home","screenRoute":"/discover"},
    // string | This sharing key must be specified to access to a score or collection with a `privacy` mode set to `privateLink` and the current user is not a collaborator of the document.  (optional)
    sharingKey: sharingKey_example,
  } satisfies DeleteScoreCommentRequest;

  try {
    const data = await api.deleteScoreComment(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **score** | `string` | Unique identifier of the score document. This can be a Flat Score unique identifier (i.e. &#x60;ScoreDetails.id&#x60;) or, if the score is also a Google Drive file, the Drive file unique identifier prefixed with &#x60;drive-&#x60; (e.g. &#x60;drive-0B000000000&#x60;).  | [Defaults to `undefined`] |
| **comment** | `string` | Unique identifier of a sheet music comment  | [Defaults to `undefined`] |
| **eventProperties** | `string` | Optional analytics properties merged into XP tracking for this request.  JSON-encoded string representing event properties. Example:  - &#x60;?eventProperties&#x3D;{\&quot;context\&quot;:\&quot;discover\&quot;,\&quot;screenLevel0\&quot;:\&quot;home\&quot;}&#x60;  | [Optional] [Defaults to `undefined`] |
| **sharingKey** | `string` | This sharing key must be specified to access to a score or collection with a &#x60;privacy&#x60; mode set to &#x60;privateLink&#x60; and the current user is not a collaborator of the document.  | [Optional] [Defaults to `undefined`] |

### Return type

`void` (Empty response body)

### Authorization

[OAuth2 accessCode](../README.md#OAuth2-accessCode)

### HTTP request headers

- **Content-Type**: `application/x-www-form-urlencoded`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **204** | The comment has been deleted |  -  |
| **403** | Not granted to access to this score or not the original comment creator |  -  |
| **404** | Score or comment not found |  -  |
| **0** | Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## deleteScoreTrack

> deleteScoreTrack(score, track)

Remove an audio or video track linked to the score

### Example

```ts
import {
  Configuration,
  ScoreApi,
} from 'flat-api';
import type { DeleteScoreTrackRequest } from 'flat-api';

async function example() {
  console.log("🚀 Testing flat-api SDK...");
  const config = new Configuration({ 
    // To configure OAuth2 access token for authorization: OAuth2 accessCode
    accessToken: "YOUR ACCESS TOKEN",
  });
  const api = new ScoreApi(config);

  const body = {
    // string | Unique identifier of the score document. This can be a Flat Score unique identifier (i.e. `ScoreDetails.id`) or, if the score is also a Google Drive file, the Drive file unique identifier prefixed with `drive-` (e.g. `drive-0B000000000`). 
    score: score_example,
    // string | Unique identifier of a score audio track 
    track: track_example,
  } satisfies DeleteScoreTrackRequest;

  try {
    const data = await api.deleteScoreTrack(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **score** | `string` | Unique identifier of the score document. This can be a Flat Score unique identifier (i.e. &#x60;ScoreDetails.id&#x60;) or, if the score is also a Google Drive file, the Drive file unique identifier prefixed with &#x60;drive-&#x60; (e.g. &#x60;drive-0B000000000&#x60;).  | [Defaults to `undefined`] |
| **track** | `string` | Unique identifier of a score audio track  | [Defaults to `undefined`] |

### Return type

`void` (Empty response body)

### Authorization

[OAuth2 accessCode](../README.md#OAuth2-accessCode)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **204** | Track removed |  -  |
| **403** | Not granted to access to this score |  -  |
| **404** | Score or Track not found |  -  |
| **0** | Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## editScore

> ScoreDetails editScore(score, body)

Edit a score\&#39;s metadata

This API method allows you to change the metadata of a score document (e.g. its &#x60;title&#x60; or &#x60;privacy&#x60;), all the properties are optional.  To edit the file itself, create a new revision using the appropriate method (&#x60;POST /v2/scores/{score}/revisions/{revision}&#x60;).  When editing the &#x60;title&#x60;, &#x60;subtitle&#x60;, &#x60;composer&#x60;, &#x60;lyricist&#x60;, &#x60;arranger&#x60; or &#x60;licenseText&#x60;, the metadatas will be instantly be updated, and a real-time action will be pushed to update the document lazily. This pending document modification will be automatically be saved as a new version by either a connected client or our internal versioning service. 

### Example

```ts
import {
  Configuration,
  ScoreApi,
} from 'flat-api';
import type { EditScoreRequest } from 'flat-api';

async function example() {
  console.log("🚀 Testing flat-api SDK...");
  const config = new Configuration({ 
    // To configure OAuth2 access token for authorization: OAuth2 accessCode
    accessToken: "YOUR ACCESS TOKEN",
  });
  const api = new ScoreApi(config);

  const body = {
    // string | Unique identifier of the score document. This can be a Flat Score unique identifier (i.e. `ScoreDetails.id`) or, if the score is also a Google Drive file, the Drive file unique identifier prefixed with `drive-` (e.g. `drive-0B000000000`). 
    score: score_example,
    // ScoreModification
    body: ...,
  } satisfies EditScoreRequest;

  try {
    const data = await api.editScore(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **score** | `string` | Unique identifier of the score document. This can be a Flat Score unique identifier (i.e. &#x60;ScoreDetails.id&#x60;) or, if the score is also a Google Drive file, the Drive file unique identifier prefixed with &#x60;drive-&#x60; (e.g. &#x60;drive-0B000000000&#x60;).  | [Defaults to `undefined`] |
| **body** | [ScoreModification](ScoreModification.md) |  | |

### Return type

[**ScoreDetails**](ScoreDetails.md)

### Authorization

[OAuth2 accessCode](../README.md#OAuth2-accessCode)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Score details |  -  |
| **402** | Account overquota |  -  |
| **403** | Not granted to access to this score |  -  |
| **404** | Score not found |  -  |
| **0** | Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## forkScore

> ScoreDetails forkScore(score, body, sharingKey)

Fork a score

This API call will make a copy of the last revision of the specified score and create a new score. The copy of the score will have a privacy set to &#x60;private&#x60;.  When using a [Flat for Education](https://flat.io/edu) account, the inline and contextualized comments will be accessible in the child document. 

### Example

```ts
import {
  Configuration,
  ScoreApi,
} from 'flat-api';
import type { ForkScoreRequest } from 'flat-api';

async function example() {
  console.log("🚀 Testing flat-api SDK...");
  const config = new Configuration({ 
    // To configure OAuth2 access token for authorization: OAuth2 accessCode
    accessToken: "YOUR ACCESS TOKEN",
  });
  const api = new ScoreApi(config);

  const body = {
    // string | Unique identifier of the score document. This can be a Flat Score unique identifier (i.e. `ScoreDetails.id`) or, if the score is also a Google Drive file, the Drive file unique identifier prefixed with `drive-` (e.g. `drive-0B000000000`). 
    score: score_example,
    // ScoreFork
    body: ...,
    // string | This sharing key must be specified to access to a score or collection with a `privacy` mode set to `privateLink` and the current user is not a collaborator of the document.  (optional)
    sharingKey: sharingKey_example,
  } satisfies ForkScoreRequest;

  try {
    const data = await api.forkScore(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **score** | `string` | Unique identifier of the score document. This can be a Flat Score unique identifier (i.e. &#x60;ScoreDetails.id&#x60;) or, if the score is also a Google Drive file, the Drive file unique identifier prefixed with &#x60;drive-&#x60; (e.g. &#x60;drive-0B000000000&#x60;).  | [Defaults to `undefined`] |
| **body** | [ScoreFork](ScoreFork.md) |  | |
| **sharingKey** | `string` | This sharing key must be specified to access to a score or collection with a &#x60;privacy&#x60; mode set to &#x60;privateLink&#x60; and the current user is not a collaborator of the document.  | [Optional] [Defaults to `undefined`] |

### Return type

[**ScoreDetails**](ScoreDetails.md)

### Authorization

[OAuth2 accessCode](../README.md#OAuth2-accessCode)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Score details |  -  |
| **402** | Account overquota |  -  |
| **403** | Not granted to access to this score |  -  |
| **404** | Score not found |  -  |
| **0** | Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## getGroupScores

> Array&lt;ScoreDetails&gt; getGroupScores(group, parent)

List group\&#39;s scores

Get the list of scores shared with a group. 

### Example

```ts
import {
  Configuration,
  ScoreApi,
} from 'flat-api';
import type { GetGroupScoresRequest } from 'flat-api';

async function example() {
  console.log("🚀 Testing flat-api SDK...");
  const config = new Configuration({ 
    // To configure OAuth2 access token for authorization: OAuth2 accessCode
    accessToken: "YOUR ACCESS TOKEN",
  });
  const api = new ScoreApi(config);

  const body = {
    // string | Unique identifier of a Flat group 
    group: group_example,
    // string | Filter the score forked from the score id `parent` (optional)
    parent: parent_example,
  } satisfies GetGroupScoresRequest;

  try {
    const data = await api.getGroupScores(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **group** | `string` | Unique identifier of a Flat group  | [Defaults to `undefined`] |
| **parent** | `string` | Filter the score forked from the score id &#x60;parent&#x60; | [Optional] [Defaults to `undefined`] |

### Return type

[**Array&lt;ScoreDetails&gt;**](ScoreDetails.md)

### Authorization

[OAuth2 accessCode](../README.md#OAuth2-accessCode)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | The group\&#39;s scores |  -  |
| **404** | Not Found - Group not found or user not member of group |  -  |
| **0** | Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## getScore

> ScoreDetails getScore(score, sharingKey)

Get a score\&#39;s metadata

Get the details of a score identified by the &#x60;score&#x60; parameter in the URL. The currently authenticated user must have at least a read access to the document to use this API call. 

### Example

```ts
import {
  Configuration,
  ScoreApi,
} from 'flat-api';
import type { GetScoreRequest } from 'flat-api';

async function example() {
  console.log("🚀 Testing flat-api SDK...");
  const config = new Configuration({ 
    // To configure OAuth2 access token for authorization: OAuth2 accessCode
    accessToken: "YOUR ACCESS TOKEN",
  });
  const api = new ScoreApi(config);

  const body = {
    // string | Unique identifier of the score document. This can be a Flat Score unique identifier (i.e. `ScoreDetails.id`) or, if the score is also a Google Drive file, the Drive file unique identifier prefixed with `drive-` (e.g. `drive-0B000000000`). 
    score: score_example,
    // string | This sharing key must be specified to access to a score or collection with a `privacy` mode set to `privateLink` and the current user is not a collaborator of the document.  (optional)
    sharingKey: sharingKey_example,
  } satisfies GetScoreRequest;

  try {
    const data = await api.getScore(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **score** | `string` | Unique identifier of the score document. This can be a Flat Score unique identifier (i.e. &#x60;ScoreDetails.id&#x60;) or, if the score is also a Google Drive file, the Drive file unique identifier prefixed with &#x60;drive-&#x60; (e.g. &#x60;drive-0B000000000&#x60;).  | [Defaults to `undefined`] |
| **sharingKey** | `string` | This sharing key must be specified to access to a score or collection with a &#x60;privacy&#x60; mode set to &#x60;privateLink&#x60; and the current user is not a collaborator of the document.  | [Optional] [Defaults to `undefined`] |

### Return type

[**ScoreDetails**](ScoreDetails.md)

### Authorization

[OAuth2 accessCode](../README.md#OAuth2-accessCode)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Score details |  -  |
| **402** | Account overquota and this document is out of the granted quota |  -  |
| **403** | Not granted to access to this score |  -  |
| **404** | Score not found |  -  |
| **0** | Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## getScoreCollaborator

> ResourceCollaborator getScoreCollaborator(score, collaborator, sharingKey)

Get a collaborator

Get the information about a collaborator (User or Group). 

### Example

```ts
import {
  Configuration,
  ScoreApi,
} from 'flat-api';
import type { GetScoreCollaboratorRequest } from 'flat-api';

async function example() {
  console.log("🚀 Testing flat-api SDK...");
  const config = new Configuration({ 
    // To configure OAuth2 access token for authorization: OAuth2 accessCode
    accessToken: "YOUR ACCESS TOKEN",
  });
  const api = new ScoreApi(config);

  const body = {
    // string | Unique identifier of the score document. This can be a Flat Score unique identifier (i.e. `ScoreDetails.id`) or, if the score is also a Google Drive file, the Drive file unique identifier prefixed with `drive-` (e.g. `drive-0B000000000`). 
    score: score_example,
    // string | Unique identifier of a **collaborator permission**, or unique identifier of a **User**, or unique identifier of a **Group** 
    collaborator: collaborator_example,
    // string | This sharing key must be specified to access to a score or collection with a `privacy` mode set to `privateLink` and the current user is not a collaborator of the document.  (optional)
    sharingKey: sharingKey_example,
  } satisfies GetScoreCollaboratorRequest;

  try {
    const data = await api.getScoreCollaborator(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **score** | `string` | Unique identifier of the score document. This can be a Flat Score unique identifier (i.e. &#x60;ScoreDetails.id&#x60;) or, if the score is also a Google Drive file, the Drive file unique identifier prefixed with &#x60;drive-&#x60; (e.g. &#x60;drive-0B000000000&#x60;).  | [Defaults to `undefined`] |
| **collaborator** | `string` | Unique identifier of a **collaborator permission**, or unique identifier of a **User**, or unique identifier of a **Group**  | [Defaults to `undefined`] |
| **sharingKey** | `string` | This sharing key must be specified to access to a score or collection with a &#x60;privacy&#x60; mode set to &#x60;privateLink&#x60; and the current user is not a collaborator of the document.  | [Optional] [Defaults to `undefined`] |

### Return type

[**ResourceCollaborator**](ResourceCollaborator.md)

### Authorization

[OAuth2 accessCode](../README.md#OAuth2-accessCode)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Collaborator information |  -  |
| **402** | Account overquota |  -  |
| **403** | Not granted to access to this score |  -  |
| **404** | Score or collaborator not found |  -  |
| **0** | Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## getScoreCollaborators

> Array&lt;ResourceCollaborator&gt; getScoreCollaborators(score, sharingKey)

List the collaborators

This API call will list the different collaborators of a score and their rights on the document. The returned list will at least contain the owner of the document.  Collaborators can be a single user (the object &#x60;user&#x60; will be populated) or a group (the object &#x60;group&#x60; will be populated). 

### Example

```ts
import {
  Configuration,
  ScoreApi,
} from 'flat-api';
import type { GetScoreCollaboratorsRequest } from 'flat-api';

async function example() {
  console.log("🚀 Testing flat-api SDK...");
  const config = new Configuration({ 
    // To configure OAuth2 access token for authorization: OAuth2 accessCode
    accessToken: "YOUR ACCESS TOKEN",
  });
  const api = new ScoreApi(config);

  const body = {
    // string | Unique identifier of the score document. This can be a Flat Score unique identifier (i.e. `ScoreDetails.id`) or, if the score is also a Google Drive file, the Drive file unique identifier prefixed with `drive-` (e.g. `drive-0B000000000`). 
    score: score_example,
    // string | This sharing key must be specified to access to a score or collection with a `privacy` mode set to `privateLink` and the current user is not a collaborator of the document.  (optional)
    sharingKey: sharingKey_example,
  } satisfies GetScoreCollaboratorsRequest;

  try {
    const data = await api.getScoreCollaborators(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **score** | `string` | Unique identifier of the score document. This can be a Flat Score unique identifier (i.e. &#x60;ScoreDetails.id&#x60;) or, if the score is also a Google Drive file, the Drive file unique identifier prefixed with &#x60;drive-&#x60; (e.g. &#x60;drive-0B000000000&#x60;).  | [Defaults to `undefined`] |
| **sharingKey** | `string` | This sharing key must be specified to access to a score or collection with a &#x60;privacy&#x60; mode set to &#x60;privateLink&#x60; and the current user is not a collaborator of the document.  | [Optional] [Defaults to `undefined`] |

### Return type

[**Array&lt;ResourceCollaborator&gt;**](ResourceCollaborator.md)

### Authorization

[OAuth2 accessCode](../README.md#OAuth2-accessCode)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | List of collaborators |  -  |
| **402** | Account overquota |  -  |
| **403** | Not granted to access to this score |  -  |
| **404** | Score not found |  -  |
| **0** | Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## getScoreComments

> Array&lt;ScoreComment&gt; getScoreComments(score, type, sort, direction, sharingKey)

List comments

This method lists the different comments added on a music score (documents and inline) sorted by their post dates.

### Example

```ts
import {
  Configuration,
  ScoreApi,
} from 'flat-api';
import type { GetScoreCommentsRequest } from 'flat-api';

async function example() {
  console.log("🚀 Testing flat-api SDK...");
  const config = new Configuration({ 
    // To configure OAuth2 access token for authorization: OAuth2 accessCode
    accessToken: "YOUR ACCESS TOKEN",
  });
  const api = new ScoreApi(config);

  const body = {
    // string | Unique identifier of the score document. This can be a Flat Score unique identifier (i.e. `ScoreDetails.id`) or, if the score is also a Google Drive file, the Drive file unique identifier prefixed with `drive-` (e.g. `drive-0B000000000`). 
    score: score_example,
    // 'document' | 'inline' | Filter the comments by type (optional)
    type: type_example,
    // 'date' | Sort (optional)
    sort: sort_example,
    // 'asc' | 'desc' | Sort direction (optional)
    direction: direction_example,
    // string | This sharing key must be specified to access to a score or collection with a `privacy` mode set to `privateLink` and the current user is not a collaborator of the document.  (optional)
    sharingKey: sharingKey_example,
  } satisfies GetScoreCommentsRequest;

  try {
    const data = await api.getScoreComments(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **score** | `string` | Unique identifier of the score document. This can be a Flat Score unique identifier (i.e. &#x60;ScoreDetails.id&#x60;) or, if the score is also a Google Drive file, the Drive file unique identifier prefixed with &#x60;drive-&#x60; (e.g. &#x60;drive-0B000000000&#x60;).  | [Defaults to `undefined`] |
| **type** | `document`, `inline` | Filter the comments by type | [Optional] [Defaults to `undefined`] [Enum: document, inline] |
| **sort** | `date` | Sort | [Optional] [Defaults to `undefined`] [Enum: date] |
| **direction** | `asc`, `desc` | Sort direction | [Optional] [Defaults to `undefined`] [Enum: asc, desc] |
| **sharingKey** | `string` | This sharing key must be specified to access to a score or collection with a &#x60;privacy&#x60; mode set to &#x60;privateLink&#x60; and the current user is not a collaborator of the document.  | [Optional] [Defaults to `undefined`] |

### Return type

[**Array&lt;ScoreComment&gt;**](ScoreComment.md)

### Authorization

[OAuth2 accessCode](../README.md#OAuth2-accessCode)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | The comments of the score |  -  |
| **402** | Account overquota |  -  |
| **403** | Not granted to access to this score |  -  |
| **404** | Score not found |  -  |
| **0** | Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## getScoreRevision

> ScoreRevision getScoreRevision(score, revision, sharingKey)

Get a score revision

When creating a score or saving a new version of a score, a revision is created in our storage. This method allows you to get a specific revision metadata. 

### Example

```ts
import {
  Configuration,
  ScoreApi,
} from 'flat-api';
import type { GetScoreRevisionRequest } from 'flat-api';

async function example() {
  console.log("🚀 Testing flat-api SDK...");
  const config = new Configuration({ 
    // To configure OAuth2 access token for authorization: OAuth2 accessCode
    accessToken: "YOUR ACCESS TOKEN",
  });
  const api = new ScoreApi(config);

  const body = {
    // string | Unique identifier of the score document. This can be a Flat Score unique identifier (i.e. `ScoreDetails.id`) or, if the score is also a Google Drive file, the Drive file unique identifier prefixed with `drive-` (e.g. `drive-0B000000000`). 
    score: score_example,
    // string | Unique identifier of a score revision. You can use `last` to fetch the information related to the last version created. 
    revision: revision_example,
    // string | This sharing key must be specified to access to a score or collection with a `privacy` mode set to `privateLink` and the current user is not a collaborator of the document.  (optional)
    sharingKey: sharingKey_example,
  } satisfies GetScoreRevisionRequest;

  try {
    const data = await api.getScoreRevision(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **score** | `string` | Unique identifier of the score document. This can be a Flat Score unique identifier (i.e. &#x60;ScoreDetails.id&#x60;) or, if the score is also a Google Drive file, the Drive file unique identifier prefixed with &#x60;drive-&#x60; (e.g. &#x60;drive-0B000000000&#x60;).  | [Defaults to `undefined`] |
| **revision** | `string` | Unique identifier of a score revision. You can use &#x60;last&#x60; to fetch the information related to the last version created.  | [Defaults to `undefined`] |
| **sharingKey** | `string` | This sharing key must be specified to access to a score or collection with a &#x60;privacy&#x60; mode set to &#x60;privateLink&#x60; and the current user is not a collaborator of the document.  | [Optional] [Defaults to `undefined`] |

### Return type

[**ScoreRevision**](ScoreRevision.md)

### Authorization

[OAuth2 accessCode](../README.md#OAuth2-accessCode)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Revision metadata |  -  |
| **402** | Account overquota |  -  |
| **403** | Not granted to access to this score |  -  |
| **404** | Score not found |  -  |
| **0** | Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## getScoreRevisionData

> Blob getScoreRevisionData(score, revision, format, sharingKey, parts, defaultTrack, url)

Get a score revision data

Retrieve the file corresponding to a score revision (the following formats are available): Flat JSON/Adagio JSON &#x60;json&#x60;, MusicXML &#x60;mxl&#x60;/&#x60;xml&#x60;, ABC notation &#x60;abc&#x60;, MP3 &#x60;mp3&#x60;, WAV &#x60;wav&#x60;, MIDI &#x60;midi&#x60;, Flat &#x60;flat&#x60;, a tumbnail of the first page &#x60;thumbnail.png&#x60; or auto sync points &#x60;synchronizationPoints&#x60;.  ABC notation is a text format that cannot express everything a score contains. Like MIDI, the export is lossy: notation ABC has no equivalent for is approximated or dropped rather than failing the request. 

### Example

```ts
import {
  Configuration,
  ScoreApi,
} from 'flat-api';
import type { GetScoreRevisionDataRequest } from 'flat-api';

async function example() {
  console.log("🚀 Testing flat-api SDK...");
  const config = new Configuration({ 
    // To configure OAuth2 access token for authorization: OAuth2 accessCode
    accessToken: "YOUR ACCESS TOKEN",
  });
  const api = new ScoreApi(config);

  const body = {
    // string | Unique identifier of the score document. This can be a Flat Score unique identifier (i.e. `ScoreDetails.id`) or, if the score is also a Google Drive file, the Drive file unique identifier prefixed with `drive-` (e.g. `drive-0B000000000`). 
    score: score_example,
    // string | Unique identifier of a score revision. You can use `last` to fetch the information related to the last version created. 
    revision: revision_example,
    // 'json' | 'mxl' | 'xml' | 'abc' | 'mp3' | 'wav' | 'midi' | 'flat' | 'thumbnail.png' | 'synchronizationPoints' | The format of the file you will retrieve
    format: format_example,
    // string | This sharing key must be specified to access to a score or collection with a `privacy` mode set to `privateLink` and the current user is not a collaborator of the document.  (optional)
    sharingKey: sharingKey_example,
    // string | An optional a set of parts uuid to be exported. This parameter must be composed of parts uuids separated by commas. For example \"59df645f-bb1c-f1b4-b573-d2afc4491f94,34ef645f-1aef-f3bc-1564-34cca4492b87\".  (optional)
    parts: parts_example,
    // boolean | When `format` is `mp3`, this property is set to true and the score has a default `ScoreTrack` (mp3), this one will be returned instead of the playback file.  (optional)
    defaultTrack: true,
    // boolean | Returns a json with the `url` in it instead of redirecting  (optional)
    url: true,
  } satisfies GetScoreRevisionDataRequest;

  try {
    const data = await api.getScoreRevisionData(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **score** | `string` | Unique identifier of the score document. This can be a Flat Score unique identifier (i.e. &#x60;ScoreDetails.id&#x60;) or, if the score is also a Google Drive file, the Drive file unique identifier prefixed with &#x60;drive-&#x60; (e.g. &#x60;drive-0B000000000&#x60;).  | [Defaults to `undefined`] |
| **revision** | `string` | Unique identifier of a score revision. You can use &#x60;last&#x60; to fetch the information related to the last version created.  | [Defaults to `undefined`] |
| **format** | `json`, `mxl`, `xml`, `abc`, `mp3`, `wav`, `midi`, `flat`, `thumbnail.png`, `synchronizationPoints` | The format of the file you will retrieve | [Defaults to `undefined`] [Enum: json, mxl, xml, abc, mp3, wav, midi, flat, thumbnail.png, synchronizationPoints] |
| **sharingKey** | `string` | This sharing key must be specified to access to a score or collection with a &#x60;privacy&#x60; mode set to &#x60;privateLink&#x60; and the current user is not a collaborator of the document.  | [Optional] [Defaults to `undefined`] |
| **parts** | `string` | An optional a set of parts uuid to be exported. This parameter must be composed of parts uuids separated by commas. For example \&quot;59df645f-bb1c-f1b4-b573-d2afc4491f94,34ef645f-1aef-f3bc-1564-34cca4492b87\&quot;.  | [Optional] [Defaults to `undefined`] |
| **defaultTrack** | `boolean` | When &#x60;format&#x60; is &#x60;mp3&#x60;, this property is set to true and the score has a default &#x60;ScoreTrack&#x60; (mp3), this one will be returned instead of the playback file.  | [Optional] [Defaults to `undefined`] |
| **url** | `boolean` | Returns a json with the &#x60;url&#x60; in it instead of redirecting  | [Optional] [Defaults to `undefined`] |

### Return type

**Blob**

### Authorization

[OAuth2 accessCode](../README.md#OAuth2-accessCode)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`, `application/vnd.recordare.musicxml+xml`, `application/vnd.recordare.musicxml`, `audio/mp3`, `audio/wav`, `audio/midi`, `image/png`, `application/octet-stream`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Revision data |  * x-flat-score-revision -  <br>  * x-flat-score-revision-date -  <br>  |
| **402** | Account overquota |  -  |
| **403** | Not granted to access to this score |  -  |
| **404** | Score or associated file not found |  -  |
| **0** | Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## getScoreRevisions

> Array&lt;ScoreRevision&gt; getScoreRevisions(score, sharingKey)

List the revisions

When creating a score or saving a new version of a score, a revision is created in our storage. This method allows you to list all of them, sorted by last modification.  Depending the plan of the account, this list can be trunked to the few last revisions. 

### Example

```ts
import {
  Configuration,
  ScoreApi,
} from 'flat-api';
import type { GetScoreRevisionsRequest } from 'flat-api';

async function example() {
  console.log("🚀 Testing flat-api SDK...");
  const config = new Configuration({ 
    // To configure OAuth2 access token for authorization: OAuth2 accessCode
    accessToken: "YOUR ACCESS TOKEN",
  });
  const api = new ScoreApi(config);

  const body = {
    // string | Unique identifier of the score document. This can be a Flat Score unique identifier (i.e. `ScoreDetails.id`) or, if the score is also a Google Drive file, the Drive file unique identifier prefixed with `drive-` (e.g. `drive-0B000000000`). 
    score: score_example,
    // string | This sharing key must be specified to access to a score or collection with a `privacy` mode set to `privateLink` and the current user is not a collaborator of the document.  (optional)
    sharingKey: sharingKey_example,
  } satisfies GetScoreRevisionsRequest;

  try {
    const data = await api.getScoreRevisions(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **score** | `string` | Unique identifier of the score document. This can be a Flat Score unique identifier (i.e. &#x60;ScoreDetails.id&#x60;) or, if the score is also a Google Drive file, the Drive file unique identifier prefixed with &#x60;drive-&#x60; (e.g. &#x60;drive-0B000000000&#x60;).  | [Defaults to `undefined`] |
| **sharingKey** | `string` | This sharing key must be specified to access to a score or collection with a &#x60;privacy&#x60; mode set to &#x60;privateLink&#x60; and the current user is not a collaborator of the document.  | [Optional] [Defaults to `undefined`] |

### Return type

[**Array&lt;ScoreRevision&gt;**](ScoreRevision.md)

### Authorization

[OAuth2 accessCode](../README.md#OAuth2-accessCode)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | List of revisions |  -  |
| **402** | Account overquota |  -  |
| **403** | Not granted to access to this score |  -  |
| **404** | Score not found |  -  |
| **0** | Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## getScoreSubmissions

> Array&lt;AssignmentSubmission&gt; getScoreSubmissions(score)

List submissions related to the score

This API call will list the different assignments submissions where the score is attached. This method can be used by anyone that are part of the organization and have at least read access to the document. 

### Example

```ts
import {
  Configuration,
  ScoreApi,
} from 'flat-api';
import type { GetScoreSubmissionsRequest } from 'flat-api';

async function example() {
  console.log("🚀 Testing flat-api SDK...");
  const config = new Configuration({ 
    // To configure OAuth2 access token for authorization: OAuth2 accessCode
    accessToken: "YOUR ACCESS TOKEN",
  });
  const api = new ScoreApi(config);

  const body = {
    // string | Unique identifier of the score document. This can be a Flat Score unique identifier (i.e. `ScoreDetails.id`) or, if the score is also a Google Drive file, the Drive file unique identifier prefixed with `drive-` (e.g. `drive-0B000000000`). 
    score: score_example,
  } satisfies GetScoreSubmissionsRequest;

  try {
    const data = await api.getScoreSubmissions(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **score** | `string` | Unique identifier of the score document. This can be a Flat Score unique identifier (i.e. &#x60;ScoreDetails.id&#x60;) or, if the score is also a Google Drive file, the Drive file unique identifier prefixed with &#x60;drive-&#x60; (e.g. &#x60;drive-0B000000000&#x60;).  | [Defaults to `undefined`] |

### Return type

[**Array&lt;AssignmentSubmission&gt;**](AssignmentSubmission.md)

### Authorization

[OAuth2 accessCode](../README.md#OAuth2-accessCode)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | List of submissions |  -  |
| **0** | Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## getScoreTrack

> ScoreTrack getScoreTrack(score, track, sharingKey)

Retrieve the details of an audio or video track linked to a score

### Example

```ts
import {
  Configuration,
  ScoreApi,
} from 'flat-api';
import type { GetScoreTrackRequest } from 'flat-api';

async function example() {
  console.log("🚀 Testing flat-api SDK...");
  const config = new Configuration({ 
    // To configure OAuth2 access token for authorization: OAuth2 accessCode
    accessToken: "YOUR ACCESS TOKEN",
  });
  const api = new ScoreApi(config);

  const body = {
    // string | Unique identifier of the score document. This can be a Flat Score unique identifier (i.e. `ScoreDetails.id`) or, if the score is also a Google Drive file, the Drive file unique identifier prefixed with `drive-` (e.g. `drive-0B000000000`). 
    score: score_example,
    // string | Unique identifier of a score audio track 
    track: track_example,
    // string | This sharing key must be specified to access to a score or collection with a `privacy` mode set to `privateLink` and the current user is not a collaborator of the document.  (optional)
    sharingKey: sharingKey_example,
  } satisfies GetScoreTrackRequest;

  try {
    const data = await api.getScoreTrack(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **score** | `string` | Unique identifier of the score document. This can be a Flat Score unique identifier (i.e. &#x60;ScoreDetails.id&#x60;) or, if the score is also a Google Drive file, the Drive file unique identifier prefixed with &#x60;drive-&#x60; (e.g. &#x60;drive-0B000000000&#x60;).  | [Defaults to `undefined`] |
| **track** | `string` | Unique identifier of a score audio track  | [Defaults to `undefined`] |
| **sharingKey** | `string` | This sharing key must be specified to access to a score or collection with a &#x60;privacy&#x60; mode set to &#x60;privateLink&#x60; and the current user is not a collaborator of the document.  | [Optional] [Defaults to `undefined`] |

### Return type

[**ScoreTrack**](ScoreTrack.md)

### Authorization

[OAuth2 accessCode](../README.md#OAuth2-accessCode)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Track details |  -  |
| **403** | Not granted to access to this score |  -  |
| **404** | Score or Track not found |  -  |
| **0** | Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## getUserLikes

> Array&lt;ScoreDetails&gt; getUserLikes(user, next, previous, limit, ids)

List liked scores

### Example

```ts
import {
  Configuration,
  ScoreApi,
} from 'flat-api';
import type { GetUserLikesRequest } from 'flat-api';

async function example() {
  console.log("🚀 Testing flat-api SDK...");
  const config = new Configuration({ 
    // To configure OAuth2 access token for authorization: OAuth2 accessCode
    accessToken: "YOUR ACCESS TOKEN",
  });
  const api = new ScoreApi(config);

  const body = {
    // string | Unique identifier of a Flat user. If you authenticated, you can use `me` to refer to the current user. 
    user: user_example,
    // string | An opaque string cursor to fetch the next page of data. The paginated API URLs are returned in the `Link` header when requesting the API. These URLs will contain a `next` and `previous` cursor based on the available data.  (optional)
    next: next_example,
    // string | An opaque string cursor to fetch the previous page of data. The paginated API URLs are returned in the `Link` header when requesting the API. These URLs will contain a `next` and `previous` cursor based on the available data.  (optional)
    previous: previous_example,
    // number | This is the maximum number of objects that may be returned (optional)
    limit: 56,
    // boolean | Return only the identifiers of the scores (optional)
    ids: true,
  } satisfies GetUserLikesRequest;

  try {
    const data = await api.getUserLikes(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **user** | `string` | Unique identifier of a Flat user. If you authenticated, you can use &#x60;me&#x60; to refer to the current user.  | [Defaults to `undefined`] |
| **next** | `string` | An opaque string cursor to fetch the next page of data. The paginated API URLs are returned in the &#x60;Link&#x60; header when requesting the API. These URLs will contain a &#x60;next&#x60; and &#x60;previous&#x60; cursor based on the available data.  | [Optional] [Defaults to `undefined`] |
| **previous** | `string` | An opaque string cursor to fetch the previous page of data. The paginated API URLs are returned in the &#x60;Link&#x60; header when requesting the API. These URLs will contain a &#x60;next&#x60; and &#x60;previous&#x60; cursor based on the available data.  | [Optional] [Defaults to `undefined`] |
| **limit** | `number` | This is the maximum number of objects that may be returned | [Optional] [Defaults to `25`] |
| **ids** | `boolean` | Return only the identifiers of the scores | [Optional] [Defaults to `undefined`] |

### Return type

[**Array&lt;ScoreDetails&gt;**](ScoreDetails.md)

### Authorization

[OAuth2 accessCode](../README.md#OAuth2-accessCode)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | List of liked scores |  -  |
| **0** | Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## getUserScores

> Array&lt;ScoreDetails&gt; getUserScores(user, paginate, sort, direction, limit, next, previous)

List user\&#39;s scores

Get the list of public scores owned by a User. If you want to access to private scores, please use the [Collections API](#tag/Collection). For example &#x60;GET /v2/collections/allScores/scores&#x60; to list all recently updated scores. 

### Example

```ts
import {
  Configuration,
  ScoreApi,
} from 'flat-api';
import type { GetUserScoresRequest } from 'flat-api';

async function example() {
  console.log("🚀 Testing flat-api SDK...");
  const config = new Configuration({ 
    // To configure OAuth2 access token for authorization: OAuth2 accessCode
    accessToken: "YOUR ACCESS TOKEN",
  });
  const api = new ScoreApi(config);

  const body = {
    // string | Unique identifier of a Flat user. If you authenticated, you can use `me` to refer to the current user. 
    user: user_example,
    // boolean | When set to `true`, the API will return a paginated result. When set to `false` or unset, the API will return all the scores. If this parameter is unset or false, then limit/sort/direction/next/previous will be ignored.  (optional)
    paginate: true,
    // 'creationDate' | 'modificationDate' | 'title' | Sort (optional)
    sort: sort_example,
    // 'asc' | 'desc' | Sort direction (optional)
    direction: direction_example,
    // number | This is the maximum number of objects that may be returned (optional)
    limit: 56,
    // string | An opaque string cursor to fetch the next page of data. The paginated API URLs are returned in the `Link` header when requesting the API. These URLs will contain a `next` and `previous` cursor based on the available data.  (optional)
    next: next_example,
    // string | An opaque string cursor to fetch the previous page of data. The paginated API URLs are returned in the `Link` header when requesting the API. These URLs will contain a `next` and `previous` cursor based on the available data.  (optional)
    previous: previous_example,
  } satisfies GetUserScoresRequest;

  try {
    const data = await api.getUserScores(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **user** | `string` | Unique identifier of a Flat user. If you authenticated, you can use &#x60;me&#x60; to refer to the current user.  | [Defaults to `undefined`] |
| **paginate** | `boolean` | When set to &#x60;true&#x60;, the API will return a paginated result. When set to &#x60;false&#x60; or unset, the API will return all the scores. If this parameter is unset or false, then limit/sort/direction/next/previous will be ignored.  | [Optional] [Defaults to `false`] |
| **sort** | `creationDate`, `modificationDate`, `title` | Sort | [Optional] [Defaults to `undefined`] [Enum: creationDate, modificationDate, title] |
| **direction** | `asc`, `desc` | Sort direction | [Optional] [Defaults to `undefined`] [Enum: asc, desc] |
| **limit** | `number` | This is the maximum number of objects that may be returned | [Optional] [Defaults to `25`] |
| **next** | `string` | An opaque string cursor to fetch the next page of data. The paginated API URLs are returned in the &#x60;Link&#x60; header when requesting the API. These URLs will contain a &#x60;next&#x60; and &#x60;previous&#x60; cursor based on the available data.  | [Optional] [Defaults to `undefined`] |
| **previous** | `string` | An opaque string cursor to fetch the previous page of data. The paginated API URLs are returned in the &#x60;Link&#x60; header when requesting the API. These URLs will contain a &#x60;next&#x60; and &#x60;previous&#x60; cursor based on the available data.  | [Optional] [Defaults to `undefined`] |

### Return type

[**Array&lt;ScoreDetails&gt;**](ScoreDetails.md)

### Authorization

[OAuth2 accessCode](../README.md#OAuth2-accessCode)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | The user scores |  -  |
| **0** | Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## listScoreTracks

> Array&lt;ScoreTrack&gt; listScoreTracks(score, sharingKey, assignment, listAutoTrack)

List the audio or video tracks linked to a score

List all audio or video tracks linked to a score.  **Access Control for Performance Submission Tracks:**  Tracks with &#x60;purpose: \&#39;performanceSubmission\&#39;&#x60; are filtered based on user role:  * **Students**: Can only see their own performance submission tracks, plus all non-performance tracks * **Teachers and score admins**: Can see all tracks from all students  The &#x60;assignment&#x60; query parameter can be used to filter tracks for a specific assignment, but the access control rules above still apply. 

### Example

```ts
import {
  Configuration,
  ScoreApi,
} from 'flat-api';
import type { ListScoreTracksRequest } from 'flat-api';

async function example() {
  console.log("🚀 Testing flat-api SDK...");
  const config = new Configuration({ 
    // To configure OAuth2 access token for authorization: OAuth2 accessCode
    accessToken: "YOUR ACCESS TOKEN",
  });
  const api = new ScoreApi(config);

  const body = {
    // string | Unique identifier of the score document. This can be a Flat Score unique identifier (i.e. `ScoreDetails.id`) or, if the score is also a Google Drive file, the Drive file unique identifier prefixed with `drive-` (e.g. `drive-0B000000000`). 
    score: score_example,
    // string | This sharing key must be specified to access to a score or collection with a `privacy` mode set to `privateLink` and the current user is not a collaborator of the document.  (optional)
    sharingKey: sharingKey_example,
    // string | An assignment id with which all the tracks returned will be related to  (optional)
    assignment: assignment_example,
    // boolean | If true, and if available, return last automatically synchronized Flat\'s mp3 export as an additional track  (optional)
    listAutoTrack: true,
  } satisfies ListScoreTracksRequest;

  try {
    const data = await api.listScoreTracks(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **score** | `string` | Unique identifier of the score document. This can be a Flat Score unique identifier (i.e. &#x60;ScoreDetails.id&#x60;) or, if the score is also a Google Drive file, the Drive file unique identifier prefixed with &#x60;drive-&#x60; (e.g. &#x60;drive-0B000000000&#x60;).  | [Defaults to `undefined`] |
| **sharingKey** | `string` | This sharing key must be specified to access to a score or collection with a &#x60;privacy&#x60; mode set to &#x60;privateLink&#x60; and the current user is not a collaborator of the document.  | [Optional] [Defaults to `undefined`] |
| **assignment** | `string` | An assignment id with which all the tracks returned will be related to  | [Optional] [Defaults to `undefined`] |
| **listAutoTrack** | `boolean` | If true, and if available, return last automatically synchronized Flat\&#39;s mp3 export as an additional track  | [Optional] [Defaults to `undefined`] |

### Return type

[**Array&lt;ScoreTrack&gt;**](ScoreTrack.md)

### Authorization

[OAuth2 accessCode](../README.md#OAuth2-accessCode)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | List of tracks |  -  |
| **403** | Not granted to access to this score |  -  |
| **404** | Score not found |  -  |
| **0** | Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## markScoreCommentResolved

> markScoreCommentResolved(score, comment, sharingKey)

Mark the comment as resolved

### Example

```ts
import {
  Configuration,
  ScoreApi,
} from 'flat-api';
import type { MarkScoreCommentResolvedRequest } from 'flat-api';

async function example() {
  console.log("🚀 Testing flat-api SDK...");
  const config = new Configuration({ 
    // To configure OAuth2 access token for authorization: OAuth2 accessCode
    accessToken: "YOUR ACCESS TOKEN",
  });
  const api = new ScoreApi(config);

  const body = {
    // string | Unique identifier of the score document. This can be a Flat Score unique identifier (i.e. `ScoreDetails.id`) or, if the score is also a Google Drive file, the Drive file unique identifier prefixed with `drive-` (e.g. `drive-0B000000000`). 
    score: score_example,
    // string | Unique identifier of a sheet music comment 
    comment: comment_example,
    // string | This sharing key must be specified to access to a score or collection with a `privacy` mode set to `privateLink` and the current user is not a collaborator of the document.  (optional)
    sharingKey: sharingKey_example,
  } satisfies MarkScoreCommentResolvedRequest;

  try {
    const data = await api.markScoreCommentResolved(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **score** | `string` | Unique identifier of the score document. This can be a Flat Score unique identifier (i.e. &#x60;ScoreDetails.id&#x60;) or, if the score is also a Google Drive file, the Drive file unique identifier prefixed with &#x60;drive-&#x60; (e.g. &#x60;drive-0B000000000&#x60;).  | [Defaults to `undefined`] |
| **comment** | `string` | Unique identifier of a sheet music comment  | [Defaults to `undefined`] |
| **sharingKey** | `string` | This sharing key must be specified to access to a score or collection with a &#x60;privacy&#x60; mode set to &#x60;privateLink&#x60; and the current user is not a collaborator of the document.  | [Optional] [Defaults to `undefined`] |

### Return type

`void` (Empty response body)

### Authorization

[OAuth2 accessCode](../README.md#OAuth2-accessCode)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **204** | The comment has been marked as resolved |  -  |
| **403** | Not granted to mark this comment as resolved |  -  |
| **404** | Score or comment not found |  -  |
| **0** | Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## markScoreCommentUnresolved

> markScoreCommentUnresolved(score, comment, sharingKey)

Mark the comment as unresolved

### Example

```ts
import {
  Configuration,
  ScoreApi,
} from 'flat-api';
import type { MarkScoreCommentUnresolvedRequest } from 'flat-api';

async function example() {
  console.log("🚀 Testing flat-api SDK...");
  const config = new Configuration({ 
    // To configure OAuth2 access token for authorization: OAuth2 accessCode
    accessToken: "YOUR ACCESS TOKEN",
  });
  const api = new ScoreApi(config);

  const body = {
    // string | Unique identifier of the score document. This can be a Flat Score unique identifier (i.e. `ScoreDetails.id`) or, if the score is also a Google Drive file, the Drive file unique identifier prefixed with `drive-` (e.g. `drive-0B000000000`). 
    score: score_example,
    // string | Unique identifier of a sheet music comment 
    comment: comment_example,
    // string | This sharing key must be specified to access to a score or collection with a `privacy` mode set to `privateLink` and the current user is not a collaborator of the document.  (optional)
    sharingKey: sharingKey_example,
  } satisfies MarkScoreCommentUnresolvedRequest;

  try {
    const data = await api.markScoreCommentUnresolved(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **score** | `string` | Unique identifier of the score document. This can be a Flat Score unique identifier (i.e. &#x60;ScoreDetails.id&#x60;) or, if the score is also a Google Drive file, the Drive file unique identifier prefixed with &#x60;drive-&#x60; (e.g. &#x60;drive-0B000000000&#x60;).  | [Defaults to `undefined`] |
| **comment** | `string` | Unique identifier of a sheet music comment  | [Defaults to `undefined`] |
| **sharingKey** | `string` | This sharing key must be specified to access to a score or collection with a &#x60;privacy&#x60; mode set to &#x60;privateLink&#x60; and the current user is not a collaborator of the document.  | [Optional] [Defaults to `undefined`] |

### Return type

`void` (Empty response body)

### Authorization

[OAuth2 accessCode](../README.md#OAuth2-accessCode)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **204** | The comment has been unmarked as resolved |  -  |
| **403** | Not granted to unmark this comment as resolved |  -  |
| **404** | Score or comment not found |  -  |
| **0** | Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## postScoreComment

> ScoreComment postScoreComment(score, body, sharingKey)

Post a new comment

Post a document or a contextualized comment on a document.  Please note that this method includes an anti-spam system for public scores. We don\&#39;t guarantee that your comments will be accepted and displayed to end-user. Comments are be blocked by returning a &#x60;403&#x60; HTTP error and hidden from other users when the &#x60;spam&#x60; property is &#x60;true&#x60;. 

### Example

```ts
import {
  Configuration,
  ScoreApi,
} from 'flat-api';
import type { PostScoreCommentRequest } from 'flat-api';

async function example() {
  console.log("🚀 Testing flat-api SDK...");
  const config = new Configuration({ 
    // To configure OAuth2 access token for authorization: OAuth2 accessCode
    accessToken: "YOUR ACCESS TOKEN",
  });
  const api = new ScoreApi(config);

  const body = {
    // string | Unique identifier of the score document. This can be a Flat Score unique identifier (i.e. `ScoreDetails.id`) or, if the score is also a Google Drive file, the Drive file unique identifier prefixed with `drive-` (e.g. `drive-0B000000000`). 
    score: score_example,
    // ScoreCommentCreation
    body: ...,
    // string | This sharing key must be specified to access to a score or collection with a `privacy` mode set to `privateLink` and the current user is not a collaborator of the document.  (optional)
    sharingKey: sharingKey_example,
  } satisfies PostScoreCommentRequest;

  try {
    const data = await api.postScoreComment(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **score** | `string` | Unique identifier of the score document. This can be a Flat Score unique identifier (i.e. &#x60;ScoreDetails.id&#x60;) or, if the score is also a Google Drive file, the Drive file unique identifier prefixed with &#x60;drive-&#x60; (e.g. &#x60;drive-0B000000000&#x60;).  | [Defaults to `undefined`] |
| **body** | [ScoreCommentCreation](ScoreCommentCreation.md) |  | |
| **sharingKey** | `string` | This sharing key must be specified to access to a score or collection with a &#x60;privacy&#x60; mode set to &#x60;privateLink&#x60; and the current user is not a collaborator of the document.  | [Optional] [Defaults to `undefined`] |

### Return type

[**ScoreComment**](ScoreComment.md)

### Authorization

[OAuth2 accessCode](../README.md#OAuth2-accessCode)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | The new comment |  -  |
| **402** | Account overquota |  -  |
| **403** | Not granted to access to this score, to post a comment, or your API call triggered our spam filter. |  -  |
| **404** | Score not found |  -  |
| **0** | Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## removeScoreCollaborator

> removeScoreCollaborator(score, collaborator, eventProperties)

Delete a collaborator

Remove the specified collaborator from the score 

### Example

```ts
import {
  Configuration,
  ScoreApi,
} from 'flat-api';
import type { RemoveScoreCollaboratorRequest } from 'flat-api';

async function example() {
  console.log("🚀 Testing flat-api SDK...");
  const config = new Configuration({ 
    // To configure OAuth2 access token for authorization: OAuth2 accessCode
    accessToken: "YOUR ACCESS TOKEN",
  });
  const api = new ScoreApi(config);

  const body = {
    // string | Unique identifier of the score document. This can be a Flat Score unique identifier (i.e. `ScoreDetails.id`) or, if the score is also a Google Drive file, the Drive file unique identifier prefixed with `drive-` (e.g. `drive-0B000000000`). 
    score: score_example,
    // string | Unique identifier of a **collaborator permission**, or unique identifier of a **User**, or unique identifier of a **Group** 
    collaborator: collaborator_example,
    // string | Optional analytics properties merged into XP tracking for this request.  JSON-encoded string representing event properties. Example:  - `?eventProperties={\"context\":\"discover\",\"screenLevel0\":\"home\"}`  (optional)
    eventProperties: {"context":"discover","screenLevel0":"home","screenRoute":"/discover"},
  } satisfies RemoveScoreCollaboratorRequest;

  try {
    const data = await api.removeScoreCollaborator(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **score** | `string` | Unique identifier of the score document. This can be a Flat Score unique identifier (i.e. &#x60;ScoreDetails.id&#x60;) or, if the score is also a Google Drive file, the Drive file unique identifier prefixed with &#x60;drive-&#x60; (e.g. &#x60;drive-0B000000000&#x60;).  | [Defaults to `undefined`] |
| **collaborator** | `string` | Unique identifier of a **collaborator permission**, or unique identifier of a **User**, or unique identifier of a **Group**  | [Defaults to `undefined`] |
| **eventProperties** | `string` | Optional analytics properties merged into XP tracking for this request.  JSON-encoded string representing event properties. Example:  - &#x60;?eventProperties&#x3D;{\&quot;context\&quot;:\&quot;discover\&quot;,\&quot;screenLevel0\&quot;:\&quot;home\&quot;}&#x60;  | [Optional] [Defaults to `undefined`] |

### Return type

`void` (Empty response body)

### Authorization

[OAuth2 accessCode](../README.md#OAuth2-accessCode)

### HTTP request headers

- **Content-Type**: `application/x-www-form-urlencoded`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **204** | The collaborator has been removed |  -  |
| **403** | Not granted to manage this score |  -  |
| **404** | Score or collaborator not found |  -  |
| **0** | Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## untrashScore

> untrashScore(score)

Untrash a score

This method will remove the score from the &#x60;trash&#x60; collection and from the deletion queue, and add it back to the original collections. 

### Example

```ts
import {
  Configuration,
  ScoreApi,
} from 'flat-api';
import type { UntrashScoreRequest } from 'flat-api';

async function example() {
  console.log("🚀 Testing flat-api SDK...");
  const config = new Configuration({ 
    // To configure OAuth2 access token for authorization: OAuth2 accessCode
    accessToken: "YOUR ACCESS TOKEN",
  });
  const api = new ScoreApi(config);

  const body = {
    // string | Unique identifier of the score document. This can be a Flat Score unique identifier (i.e. `ScoreDetails.id`) or, if the score is also a Google Drive file, the Drive file unique identifier prefixed with `drive-` (e.g. `drive-0B000000000`). 
    score: score_example,
  } satisfies UntrashScoreRequest;

  try {
    const data = await api.untrashScore(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **score** | `string` | Unique identifier of the score document. This can be a Flat Score unique identifier (i.e. &#x60;ScoreDetails.id&#x60;) or, if the score is also a Google Drive file, the Drive file unique identifier prefixed with &#x60;drive-&#x60; (e.g. &#x60;drive-0B000000000&#x60;).  | [Defaults to `undefined`] |

### Return type

`void` (Empty response body)

### Authorization

[OAuth2 accessCode](../README.md#OAuth2-accessCode)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **204** | The score has been untrashed |  -  |
| **403** | Not granted to manage this score |  -  |
| **404** | Score not found |  -  |
| **0** | Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## updateScoreComment

> ScoreComment updateScoreComment(score, comment, body, sharingKey)

Update an existing comment

### Example

```ts
import {
  Configuration,
  ScoreApi,
} from 'flat-api';
import type { UpdateScoreCommentRequest } from 'flat-api';

async function example() {
  console.log("🚀 Testing flat-api SDK...");
  const config = new Configuration({ 
    // To configure OAuth2 access token for authorization: OAuth2 accessCode
    accessToken: "YOUR ACCESS TOKEN",
  });
  const api = new ScoreApi(config);

  const body = {
    // string | Unique identifier of the score document. This can be a Flat Score unique identifier (i.e. `ScoreDetails.id`) or, if the score is also a Google Drive file, the Drive file unique identifier prefixed with `drive-` (e.g. `drive-0B000000000`). 
    score: score_example,
    // string | Unique identifier of a sheet music comment 
    comment: comment_example,
    // ScoreCommentUpdate
    body: ...,
    // string | This sharing key must be specified to access to a score or collection with a `privacy` mode set to `privateLink` and the current user is not a collaborator of the document.  (optional)
    sharingKey: sharingKey_example,
  } satisfies UpdateScoreCommentRequest;

  try {
    const data = await api.updateScoreComment(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **score** | `string` | Unique identifier of the score document. This can be a Flat Score unique identifier (i.e. &#x60;ScoreDetails.id&#x60;) or, if the score is also a Google Drive file, the Drive file unique identifier prefixed with &#x60;drive-&#x60; (e.g. &#x60;drive-0B000000000&#x60;).  | [Defaults to `undefined`] |
| **comment** | `string` | Unique identifier of a sheet music comment  | [Defaults to `undefined`] |
| **body** | [ScoreCommentUpdate](ScoreCommentUpdate.md) |  | |
| **sharingKey** | `string` | This sharing key must be specified to access to a score or collection with a &#x60;privacy&#x60; mode set to &#x60;privateLink&#x60; and the current user is not a collaborator of the document.  | [Optional] [Defaults to `undefined`] |

### Return type

[**ScoreComment**](ScoreComment.md)

### Authorization

[OAuth2 accessCode](../README.md#OAuth2-accessCode)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | The edited comment |  -  |
| **402** | Account overquota |  -  |
| **403** | Not granted to access to this score or not the original comment creator |  -  |
| **404** | Score not found |  -  |
| **0** | Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## updateScoreTrack

> ScoreTrack updateScoreTrack(score, track, body)

Update an audio or video track linked to a score

### Example

```ts
import {
  Configuration,
  ScoreApi,
} from 'flat-api';
import type { UpdateScoreTrackRequest } from 'flat-api';

async function example() {
  console.log("🚀 Testing flat-api SDK...");
  const config = new Configuration({ 
    // To configure OAuth2 access token for authorization: OAuth2 accessCode
    accessToken: "YOUR ACCESS TOKEN",
  });
  const api = new ScoreApi(config);

  const body = {
    // string | Unique identifier of the score document. This can be a Flat Score unique identifier (i.e. `ScoreDetails.id`) or, if the score is also a Google Drive file, the Drive file unique identifier prefixed with `drive-` (e.g. `drive-0B000000000`). 
    score: score_example,
    // string | Unique identifier of a score audio track 
    track: track_example,
    // ScoreTrackUpdate
    body: ...,
  } satisfies UpdateScoreTrackRequest;

  try {
    const data = await api.updateScoreTrack(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **score** | `string` | Unique identifier of the score document. This can be a Flat Score unique identifier (i.e. &#x60;ScoreDetails.id&#x60;) or, if the score is also a Google Drive file, the Drive file unique identifier prefixed with &#x60;drive-&#x60; (e.g. &#x60;drive-0B000000000&#x60;).  | [Defaults to `undefined`] |
| **track** | `string` | Unique identifier of a score audio track  | [Defaults to `undefined`] |
| **body** | [ScoreTrackUpdate](ScoreTrackUpdate.md) |  | |

### Return type

[**ScoreTrack**](ScoreTrack.md)

### Authorization

[OAuth2 accessCode](../README.md#OAuth2-accessCode)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Updated track |  -  |
| **403** | Not granted to access to this score |  -  |
| **404** | Score or Track not found |  -  |
| **0** | Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

