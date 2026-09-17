# CollectionApi

All URIs are relative to *https://api.flat.io/v2*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**addScoreToCollection**](CollectionApi.md#addscoretocollection) | **PUT** /collections/{collection}/scores/{score} | Add a score to the collection |
| [**createCollection**](CollectionApi.md#createcollection) | **POST** /collections | Create a new collection |
| [**deleteCollection**](CollectionApi.md#deletecollection) | **DELETE** /collections/{collection} | Delete the collection |
| [**deleteScoreFromCollection**](CollectionApi.md#deletescorefromcollection) | **DELETE** /collections/{collection}/scores/{score} | Delete a score from the collection |
| [**editCollection**](CollectionApi.md#editcollection) | **PUT** /collections/{collection} | Update a collection\&#39;s metadata |
| [**getCollection**](CollectionApi.md#getcollection) | **GET** /collections/{collection} | Get collection details |
| [**listCollectionScores**](CollectionApi.md#listcollectionscores) | **GET** /collections/{collection}/scores | List the scores contained in a collection |
| [**listCollections**](CollectionApi.md#listcollections) | **GET** /collections | List the collections |
| [**untrashCollection**](CollectionApi.md#untrashcollection) | **POST** /collections/{collection}/untrash | Untrash a collection |



## addScoreToCollection

> ScoreDetails addScoreToCollection(collection, score, sharingKey)

Add a score to the collection

This operation will add a score to a collection. The default behavior will make the score available across multiple collections. You must have the capability &#x60;canAddScores&#x60; on the provided &#x60;collection&#x60; to perform the action. 

### Example

```ts
import {
  Configuration,
  CollectionApi,
} from 'flat-api';
import type { AddScoreToCollectionRequest } from 'flat-api';

async function example() {
  console.log("🚀 Testing flat-api SDK...");
  const config = new Configuration({ 
    // To configure OAuth2 access token for authorization: OAuth2 accessCode
    accessToken: "YOUR ACCESS TOKEN",
  });
  const api = new CollectionApi(config);

  const body = {
    // string | Unique identifier of the collection.  The following collection aliases are supported: - `root`: **Deprecated.** The root collection of the account - `app`: Alias for the current app collection - `trash`: Automatically contains resources that have been deleted 
    collection: collection_example,
    // string | Unique identifier of the score document. This can be a Flat Score unique identifier (i.e. `ScoreDetails.id`) or, if the score is also a Google Drive file, the Drive file unique identifier prefixed with `drive-` (e.g. `drive-0B000000000`). 
    score: score_example,
    // string | This sharing key must be specified to access to a score or collection with a `privacy` mode set to `privateLink` and the current user is not a collaborator of the document.  (optional)
    sharingKey: sharingKey_example,
  } satisfies AddScoreToCollectionRequest;

  try {
    const data = await api.addScoreToCollection(body);
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
| **collection** | `string` | Unique identifier of the collection.  The following collection aliases are supported: - &#x60;root&#x60;: **Deprecated.** The root collection of the account - &#x60;app&#x60;: Alias for the current app collection - &#x60;trash&#x60;: Automatically contains resources that have been deleted  | [Defaults to `undefined`] |
| **score** | `string` | Unique identifier of the score document. This can be a Flat Score unique identifier (i.e. &#x60;ScoreDetails.id&#x60;) or, if the score is also a Google Drive file, the Drive file unique identifier prefixed with &#x60;drive-&#x60; (e.g. &#x60;drive-0B000000000&#x60;).  | [Defaults to `undefined`] |
| **sharingKey** | `string` | This sharing key must be specified to access to a score or collection with a &#x60;privacy&#x60; mode set to &#x60;privateLink&#x60; and the current user is not a collaborator of the document.  | [Optional] [Defaults to `undefined`] |

### Return type

[**ScoreDetails**](ScoreDetails.md)

### Authorization

[OAuth2 accessCode](../README.md#OAuth2-accessCode)

### HTTP request headers

- **Content-Type**: `application/x-www-form-urlencoded`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Score details |  -  |
| **403** | Not granted to access to this collection or score |  -  |
| **404** | Collection or score not found |  -  |
| **0** | Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## createCollection

> Collection createCollection(body)

Create a new collection

This method will create a new collection in your account. 

### Example

```ts
import {
  Configuration,
  CollectionApi,
} from 'flat-api';
import type { CreateCollectionRequest } from 'flat-api';

async function example() {
  console.log("🚀 Testing flat-api SDK...");
  const config = new Configuration({ 
    // To configure OAuth2 access token for authorization: OAuth2 accessCode
    accessToken: "YOUR ACCESS TOKEN",
  });
  const api = new CollectionApi(config);

  const body = {
    // CollectionCreation
    body: ...,
  } satisfies CreateCollectionRequest;

  try {
    const data = await api.createCollection(body);
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
| **body** | [CollectionCreation](CollectionCreation.md) |  | |

### Return type

[**Collection**](Collection.md)

### Authorization

[OAuth2 accessCode](../README.md#OAuth2-accessCode)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Collection created |  -  |
| **400** | Bad collection creation request |  -  |
| **0** | Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## deleteCollection

> deleteCollection(collection)

Delete the collection

This method will schedule the deletion of the collection. Until deleted, the collection will be available in the &#x60;trash&#x60;. 

### Example

```ts
import {
  Configuration,
  CollectionApi,
} from 'flat-api';
import type { DeleteCollectionRequest } from 'flat-api';

async function example() {
  console.log("🚀 Testing flat-api SDK...");
  const config = new Configuration({ 
    // To configure OAuth2 access token for authorization: OAuth2 accessCode
    accessToken: "YOUR ACCESS TOKEN",
  });
  const api = new CollectionApi(config);

  const body = {
    // string | Unique identifier of the collection.  The following collection aliases are supported: - `root`: **Deprecated.** The root collection of the account - `app`: Alias for the current app collection - `trash`: Automatically contains resources that have been deleted  The following virtual collections are supported: - `allScores`: All the scores contained in the user account - `collaborations`: All shared scores by the user or someone else - `likes`: Liked scores 
    collection: collection_example,
  } satisfies DeleteCollectionRequest;

  try {
    const data = await api.deleteCollection(body);
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
| **collection** | `string` | Unique identifier of the collection.  The following collection aliases are supported: - &#x60;root&#x60;: **Deprecated.** The root collection of the account - &#x60;app&#x60;: Alias for the current app collection - &#x60;trash&#x60;: Automatically contains resources that have been deleted  The following virtual collections are supported: - &#x60;allScores&#x60;: All the scores contained in the user account - &#x60;collaborations&#x60;: All shared scores by the user or someone else - &#x60;likes&#x60;: Liked scores  | [Defaults to `undefined`] |

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
| **204** | Collection deleted |  -  |
| **403** | Not granted to access to this collection |  -  |
| **404** | Collection not found |  -  |
| **0** | Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## deleteScoreFromCollection

> deleteScoreFromCollection(collection, score, eventProperties, sharingKey)

Delete a score from the collection

This method will delete a score from the collection. Unlike [&#x60;DELETE /scores/{score}&#x60;](#operation/deleteScore), this will not remove the score from your account, but only from the collection. This can be used to *move* a score from one collection to another, or simply remove a score from one collection when this one is contained in multiple collections. 

### Example

```ts
import {
  Configuration,
  CollectionApi,
} from 'flat-api';
import type { DeleteScoreFromCollectionRequest } from 'flat-api';

async function example() {
  console.log("🚀 Testing flat-api SDK...");
  const config = new Configuration({ 
    // To configure OAuth2 access token for authorization: OAuth2 accessCode
    accessToken: "YOUR ACCESS TOKEN",
  });
  const api = new CollectionApi(config);

  const body = {
    // string | Unique identifier of the collection.  The following collection aliases are supported: - `root`: **Deprecated.** The root collection of the account - `app`: Alias for the current app collection - `trash`: Automatically contains resources that have been deleted 
    collection: collection_example,
    // string | Unique identifier of the score document. This can be a Flat Score unique identifier (i.e. `ScoreDetails.id`) or, if the score is also a Google Drive file, the Drive file unique identifier prefixed with `drive-` (e.g. `drive-0B000000000`). 
    score: score_example,
    // string | Optional analytics properties merged into the analytics events recorded for this request.  JSON-encoded string representing event properties. Example:  - `?eventProperties={\"context\":\"discover\",\"screenLevel0\":\"home\"}`  (optional)
    eventProperties: {"context":"discover","screenLevel0":"home","screenRoute":"/discover"},
    // string | This sharing key must be specified to access to a score or collection with a `privacy` mode set to `privateLink` and the current user is not a collaborator of the document.  (optional)
    sharingKey: sharingKey_example,
  } satisfies DeleteScoreFromCollectionRequest;

  try {
    const data = await api.deleteScoreFromCollection(body);
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
| **collection** | `string` | Unique identifier of the collection.  The following collection aliases are supported: - &#x60;root&#x60;: **Deprecated.** The root collection of the account - &#x60;app&#x60;: Alias for the current app collection - &#x60;trash&#x60;: Automatically contains resources that have been deleted  | [Defaults to `undefined`] |
| **score** | `string` | Unique identifier of the score document. This can be a Flat Score unique identifier (i.e. &#x60;ScoreDetails.id&#x60;) or, if the score is also a Google Drive file, the Drive file unique identifier prefixed with &#x60;drive-&#x60; (e.g. &#x60;drive-0B000000000&#x60;).  | [Defaults to `undefined`] |
| **eventProperties** | `string` | Optional analytics properties merged into the analytics events recorded for this request.  JSON-encoded string representing event properties. Example:  - &#x60;?eventProperties&#x3D;{\&quot;context\&quot;:\&quot;discover\&quot;,\&quot;screenLevel0\&quot;:\&quot;home\&quot;}&#x60;  | [Optional] [Defaults to `undefined`] |
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
| **204** | Score removed from the collection |  -  |
| **403** | Not granted to access to this collection |  -  |
| **404** | Collection not found |  -  |
| **0** | Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## editCollection

> Collection editCollection(collection, body)

Update a collection\&#39;s metadata

### Example

```ts
import {
  Configuration,
  CollectionApi,
} from 'flat-api';
import type { EditCollectionRequest } from 'flat-api';

async function example() {
  console.log("🚀 Testing flat-api SDK...");
  const config = new Configuration({ 
    // To configure OAuth2 access token for authorization: OAuth2 accessCode
    accessToken: "YOUR ACCESS TOKEN",
  });
  const api = new CollectionApi(config);

  const body = {
    // string | Unique identifier of the collection.  The following collection aliases are supported: - `root`: **Deprecated.** The root collection of the account - `app`: Alias for the current app collection - `trash`: Automatically contains resources that have been deleted  The following virtual collections are supported: - `allScores`: All the scores contained in the user account - `collaborations`: All shared scores by the user or someone else - `likes`: Liked scores 
    collection: collection_example,
    // CollectionModification
    body: ...,
  } satisfies EditCollectionRequest;

  try {
    const data = await api.editCollection(body);
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
| **collection** | `string` | Unique identifier of the collection.  The following collection aliases are supported: - &#x60;root&#x60;: **Deprecated.** The root collection of the account - &#x60;app&#x60;: Alias for the current app collection - &#x60;trash&#x60;: Automatically contains resources that have been deleted  The following virtual collections are supported: - &#x60;allScores&#x60;: All the scores contained in the user account - &#x60;collaborations&#x60;: All shared scores by the user or someone else - &#x60;likes&#x60;: Liked scores  | [Defaults to `undefined`] |
| **body** | [CollectionModification](CollectionModification.md) |  | |

### Return type

[**Collection**](Collection.md)

### Authorization

[OAuth2 accessCode](../README.md#OAuth2-accessCode)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Collection details |  -  |
| **403** | Not granted to access to this collection |  -  |
| **404** | Collection not found |  -  |
| **0** | Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## getCollection

> Collection getCollection(collection, sharingKey)

Get collection details

### Example

```ts
import {
  Configuration,
  CollectionApi,
} from 'flat-api';
import type { GetCollectionRequest } from 'flat-api';

async function example() {
  console.log("🚀 Testing flat-api SDK...");
  const config = new Configuration({ 
    // To configure OAuth2 access token for authorization: OAuth2 accessCode
    accessToken: "YOUR ACCESS TOKEN",
  });
  const api = new CollectionApi(config);

  const body = {
    // string | Unique identifier of the collection.  The following collection aliases are supported: - `root`: **Deprecated.** The root collection of the account - `app`: Alias for the current app collection - `trash`: Automatically contains resources that have been deleted  The following virtual collections are supported: - `allScores`: All the scores contained in the user account - `collaborations`: All shared scores by the user or someone else - `likes`: Liked scores 
    collection: collection_example,
    // string | This sharing key must be specified to access to a score or collection with a `privacy` mode set to `privateLink` and the current user is not a collaborator of the document.  (optional)
    sharingKey: sharingKey_example,
  } satisfies GetCollectionRequest;

  try {
    const data = await api.getCollection(body);
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
| **collection** | `string` | Unique identifier of the collection.  The following collection aliases are supported: - &#x60;root&#x60;: **Deprecated.** The root collection of the account - &#x60;app&#x60;: Alias for the current app collection - &#x60;trash&#x60;: Automatically contains resources that have been deleted  The following virtual collections are supported: - &#x60;allScores&#x60;: All the scores contained in the user account - &#x60;collaborations&#x60;: All shared scores by the user or someone else - &#x60;likes&#x60;: Liked scores  | [Defaults to `undefined`] |
| **sharingKey** | `string` | This sharing key must be specified to access to a score or collection with a &#x60;privacy&#x60; mode set to &#x60;privateLink&#x60; and the current user is not a collaborator of the document.  | [Optional] [Defaults to `undefined`] |

### Return type

[**Collection**](Collection.md)

### Authorization

[OAuth2 accessCode](../README.md#OAuth2-accessCode)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Collection details |  -  |
| **403** | Not granted to access to this collection |  -  |
| **404** | Collection not found |  -  |
| **0** | Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## listCollectionScores

> Array&lt;ScoreDetails&gt; listCollectionScores(collection, sort, direction, limit, next, previous, sharingKey)

List the scores contained in a collection

Use this method to list the scores contained in a collection. If no sort option is provided, the scores are sorted by &#x60;modificationDate&#x60; &#x60;desc&#x60;.  For example, to list the scores contained in your app collection, you can use &#x60;GET /v2/collections/app/scores&#x60;. 

### Example

```ts
import {
  Configuration,
  CollectionApi,
} from 'flat-api';
import type { ListCollectionScoresRequest } from 'flat-api';

async function example() {
  console.log("🚀 Testing flat-api SDK...");
  const config = new Configuration({ 
    // To configure OAuth2 access token for authorization: OAuth2 accessCode
    accessToken: "YOUR ACCESS TOKEN",
  });
  const api = new CollectionApi(config);

  const body = {
    // string | Unique identifier of the collection.  The following collection aliases are supported: - `root`: **Deprecated.** The root collection of the account - `app`: Alias for the current app collection - `trash`: Automatically contains resources that have been deleted  The following virtual collections are supported: - `allScores`: All the scores contained in the user account - `collaborations`: All shared scores by the user or someone else - `likes`: Liked scores 
    collection: collection_example,
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
    // string | This sharing key must be specified to access to a score or collection with a `privacy` mode set to `privateLink` and the current user is not a collaborator of the document.  (optional)
    sharingKey: sharingKey_example,
  } satisfies ListCollectionScoresRequest;

  try {
    const data = await api.listCollectionScores(body);
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
| **collection** | `string` | Unique identifier of the collection.  The following collection aliases are supported: - &#x60;root&#x60;: **Deprecated.** The root collection of the account - &#x60;app&#x60;: Alias for the current app collection - &#x60;trash&#x60;: Automatically contains resources that have been deleted  The following virtual collections are supported: - &#x60;allScores&#x60;: All the scores contained in the user account - &#x60;collaborations&#x60;: All shared scores by the user or someone else - &#x60;likes&#x60;: Liked scores  | [Defaults to `undefined`] |
| **sort** | `creationDate`, `modificationDate`, `title` | Sort | [Optional] [Defaults to `undefined`] [Enum: creationDate, modificationDate, title] |
| **direction** | `asc`, `desc` | Sort direction | [Optional] [Defaults to `undefined`] [Enum: asc, desc] |
| **limit** | `number` | This is the maximum number of objects that may be returned | [Optional] [Defaults to `25`] |
| **next** | `string` | An opaque string cursor to fetch the next page of data. The paginated API URLs are returned in the &#x60;Link&#x60; header when requesting the API. These URLs will contain a &#x60;next&#x60; and &#x60;previous&#x60; cursor based on the available data.  | [Optional] [Defaults to `undefined`] |
| **previous** | `string` | An opaque string cursor to fetch the previous page of data. The paginated API URLs are returned in the &#x60;Link&#x60; header when requesting the API. These URLs will contain a &#x60;next&#x60; and &#x60;previous&#x60; cursor based on the available data.  | [Optional] [Defaults to `undefined`] |
| **sharingKey** | `string` | This sharing key must be specified to access to a score or collection with a &#x60;privacy&#x60; mode set to &#x60;privateLink&#x60; and the current user is not a collaborator of the document.  | [Optional] [Defaults to `undefined`] |

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
| **200** | List of scores |  -  |
| **0** | Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## listCollections

> Array&lt;Collection&gt; listCollections(parent, sort, direction, limit, next, previous)

List the collections

Use this method to list the user\&#39;s collections. If no sort option is provided, the collections are sorted by &#x60;creationDate&#x60; &#x60;desc&#x60;.  By default (&#x60;parent&#x3D;user&#x60;), this returns all user account collections with virtual collections on the first page.  To fetch your app collection details, you can use &#x60;GET /v2/collections/app&#x60;. 

### Example

```ts
import {
  Configuration,
  CollectionApi,
} from 'flat-api';
import type { ListCollectionsRequest } from 'flat-api';

async function example() {
  console.log("🚀 Testing flat-api SDK...");
  const config = new Configuration({ 
    // To configure OAuth2 access token for authorization: OAuth2 accessCode
    accessToken: "YOUR ACCESS TOKEN",
  });
  const api = new CollectionApi(config);

  const body = {
    // string | List the collections contained in this `parent` collection.  When set to `user` (default), returns the user\'s own collections as well as collections shared with the user.  Using `root` or `sharedWithMe` is **deprecated** and will be treated as `user`.  (optional)
    parent: parent_example,
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
  } satisfies ListCollectionsRequest;

  try {
    const data = await api.listCollections(body);
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
| **parent** | `string` | List the collections contained in this &#x60;parent&#x60; collection.  When set to &#x60;user&#x60; (default), returns the user\&#39;s own collections as well as collections shared with the user.  Using &#x60;root&#x60; or &#x60;sharedWithMe&#x60; is **deprecated** and will be treated as &#x60;user&#x60;.  | [Optional] [Defaults to `&#39;user&#39;`] |
| **sort** | `creationDate`, `modificationDate`, `title` | Sort | [Optional] [Defaults to `undefined`] [Enum: creationDate, modificationDate, title] |
| **direction** | `asc`, `desc` | Sort direction | [Optional] [Defaults to `undefined`] [Enum: asc, desc] |
| **limit** | `number` | This is the maximum number of objects that may be returned | [Optional] [Defaults to `25`] |
| **next** | `string` | An opaque string cursor to fetch the next page of data. The paginated API URLs are returned in the &#x60;Link&#x60; header when requesting the API. These URLs will contain a &#x60;next&#x60; and &#x60;previous&#x60; cursor based on the available data.  | [Optional] [Defaults to `undefined`] |
| **previous** | `string` | An opaque string cursor to fetch the previous page of data. The paginated API URLs are returned in the &#x60;Link&#x60; header when requesting the API. These URLs will contain a &#x60;next&#x60; and &#x60;previous&#x60; cursor based on the available data.  | [Optional] [Defaults to `undefined`] |

### Return type

[**Array&lt;Collection&gt;**](Collection.md)

### Authorization

[OAuth2 accessCode](../README.md#OAuth2-accessCode)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | List of collections |  -  |
| **0** | Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## untrashCollection

> FlatErrorResponse untrashCollection(collection)

Untrash a collection

**DEPRECATED** This method will restore the collection by removing it from the &#x60;trash&#x60; and add it back to the &#x60;root&#x60; collection. 

### Example

```ts
import {
  Configuration,
  CollectionApi,
} from 'flat-api';
import type { UntrashCollectionRequest } from 'flat-api';

async function example() {
  console.log("🚀 Testing flat-api SDK...");
  const config = new Configuration({ 
    // To configure OAuth2 access token for authorization: OAuth2 accessCode
    accessToken: "YOUR ACCESS TOKEN",
  });
  const api = new CollectionApi(config);

  const body = {
    // string | Unique identifier of the collection.
    collection: collection_example,
  } satisfies UntrashCollectionRequest;

  try {
    const data = await api.untrashCollection(body);
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
| **collection** | `string` | Unique identifier of the collection. | [Defaults to `undefined`] |

### Return type

[**FlatErrorResponse**](FlatErrorResponse.md)

### Authorization

[OAuth2 accessCode](../README.md#OAuth2-accessCode)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **400** | Bad request - Operation no longer supported |  -  |
| **0** | Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

