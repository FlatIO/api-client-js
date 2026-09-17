# UserApi

All URIs are relative to *https://api.flat.io/v2*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**getUser**](UserApi.md#getuser) | **GET** /users/{user} | Get a public user profile |
| [**getUserLikes**](UserApi.md#getuserlikes) | **GET** /users/{user}/likes | List liked scores |
| [**getUserScores**](UserApi.md#getuserscores) | **GET** /users/{user}/scores | List user\&#39;s scores |



## getUser

> UserPublic getUser(user)

Get a public user profile

Get a profile of a Flat or Flat for Education User. 

### Example

```ts
import {
  Configuration,
  UserApi,
} from 'flat-api';
import type { GetUserRequest } from 'flat-api';

async function example() {
  console.log("🚀 Testing flat-api SDK...");
  const config = new Configuration({ 
    // To configure OAuth2 access token for authorization: OAuth2 accessCode
    accessToken: "YOUR ACCESS TOKEN",
  });
  const api = new UserApi(config);

  const body = {
    // string | This route parameter is the unique identifier of the user. You can specify an email instead of a unique identifier. If you are executing this request authenticated, you can use `me` as a value instead of the current User unique identifier to work on the current authenticated user. 
    user: user_example,
  } satisfies GetUserRequest;

  try {
    const data = await api.getUser(body);
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
| **user** | `string` | This route parameter is the unique identifier of the user. You can specify an email instead of a unique identifier. If you are executing this request authenticated, you can use &#x60;me&#x60; as a value instead of the current User unique identifier to work on the current authenticated user.  | [Defaults to `undefined`] |

### Return type

[**UserPublic**](UserPublic.md)

### Authorization

[OAuth2 accessCode](../README.md#OAuth2-accessCode)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | The user public details |  -  |
| **0** | Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## getUserLikes

> Array&lt;ScoreDetails&gt; getUserLikes(user, next, previous, limit, ids)

List liked scores

### Example

```ts
import {
  Configuration,
  UserApi,
} from 'flat-api';
import type { GetUserLikesRequest } from 'flat-api';

async function example() {
  console.log("🚀 Testing flat-api SDK...");
  const config = new Configuration({ 
    // To configure OAuth2 access token for authorization: OAuth2 accessCode
    accessToken: "YOUR ACCESS TOKEN",
  });
  const api = new UserApi(config);

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

Get the list of public scores owned by a User. If you want to access private scores, please use the [Collections API](#tag/Collection). For example &#x60;GET /v2/collections/allScores/scores&#x60; to list all recently updated scores. 

### Example

```ts
import {
  Configuration,
  UserApi,
} from 'flat-api';
import type { GetUserScoresRequest } from 'flat-api';

async function example() {
  console.log("🚀 Testing flat-api SDK...");
  const config = new Configuration({ 
    // To configure OAuth2 access token for authorization: OAuth2 accessCode
    accessToken: "YOUR ACCESS TOKEN",
  });
  const api = new UserApi(config);

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

