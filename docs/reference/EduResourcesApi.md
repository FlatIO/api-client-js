# EduResourcesApi

All URIs are relative to *https://api.flat.io/v2*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**copyEduResource**](EduResourcesApi.md#copyeduresource) | **POST** /eduResources/{resource}/copy | Copy an education resource to a Resource Library |
| [**copyEduResourceToDemoClass**](EduResourcesApi.md#copyeduresourcetodemoclass) | **POST** /eduResources/{resource}/copyToDemoClass | Copy an education assignment to a teacher demo class |
| [**createEduResource**](EduResourcesApi.md#createeduresource) | **POST** /eduResources | Create a new education resource |
| [**createEduResourceLtiLink**](EduResourcesApi.md#createeduresourceltilink) | **POST** /eduResources/{resource}/createLtiLink | Create an LTI link for an education resource |
| [**deleteEduResource**](EduResourcesApi.md#deleteeduresource) | **DELETE** /eduResources/{resource} | Delete an education resource |
| [**getEduResource**](EduResourcesApi.md#geteduresource) | **GET** /eduResources/{resource} | Get an education resource |
| [**listEduLibraries**](EduResourcesApi.md#listedulibraries) | **GET** /eduResources/libraries | List the education libraries |
| [**listEduResources**](EduResourcesApi.md#listeduresources) | **GET** /eduResources | List education resources in a library or folder |
| [**moveEduResource**](EduResourcesApi.md#moveeduresource) | **POST** /eduResources/{resource}/move | Move an education resource |
| [**updateEduResource**](EduResourcesApi.md#updateeduresource) | **PUT** /eduResources/{resource} | Update an education resource metadata |
| [**updateEduResourceAssignment**](EduResourcesApi.md#updateeduresourceassignment) | **PUT** /eduResources/{resource}/assignment | Update an education resource assignment |
| [**useEduResourceInClass**](EduResourcesApi.md#useeduresourceinclass) | **POST** /eduResources/{resource}/useInClass | Use an education resource in a class |



## copyEduResource

> EduResource copyEduResource(resource, eduResourceCopy)

Copy an education resource to a Resource Library

### Example

```ts
import {
  Configuration,
  EduResourcesApi,
} from 'flat-api';
import type { CopyEduResourceRequest } from 'flat-api';

async function example() {
  console.log("🚀 Testing flat-api SDK...");
  const config = new Configuration({ 
    // To configure OAuth2 access token for authorization: OAuth2 accessCode
    accessToken: "YOUR ACCESS TOKEN",
  });
  const api = new EduResourcesApi(config);

  const body = {
    // string | Unique identifier of the resource
    resource: resource_example,
    // EduResourceCopy
    eduResourceCopy: ...,
  } satisfies CopyEduResourceRequest;

  try {
    const data = await api.copyEduResource(body);
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
| **resource** | `string` | Unique identifier of the resource | [Defaults to `undefined`] |
| **eduResourceCopy** | [EduResourceCopy](EduResourceCopy.md) |  | |

### Return type

[**EduResource**](EduResource.md)

### Authorization

[OAuth2 accessCode](../README.md#OAuth2-accessCode)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Fetched resource |  -  |
| **0** | Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## copyEduResourceToDemoClass

> ClassAssignment copyEduResourceToDemoClass(resource)

Copy an education assignment to a teacher demo class

Once a resource library can be published to a class (&#x60;Assignment.capabilities.canPublishInClass &#x3D; true&#x60;), this endpoint can be used for the feature \&quot;View as student\&quot;.  It will ensure the teacher has a demo class, then copy the assignment to the demo class. You can then use &#x60;POST /classes/{class}/testStudent&#x60; to create a testing student account in the demo class. 

### Example

```ts
import {
  Configuration,
  EduResourcesApi,
} from 'flat-api';
import type { CopyEduResourceToDemoClassRequest } from 'flat-api';

async function example() {
  console.log("🚀 Testing flat-api SDK...");
  const config = new Configuration({ 
    // To configure OAuth2 access token for authorization: OAuth2 accessCode
    accessToken: "YOUR ACCESS TOKEN",
  });
  const api = new EduResourcesApi(config);

  const body = {
    // string | Unique identifier of the resource
    resource: resource_example,
  } satisfies CopyEduResourceToDemoClassRequest;

  try {
    const data = await api.copyEduResourceToDemoClass(body);
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
| **resource** | `string` | Unique identifier of the resource | [Defaults to `undefined`] |

### Return type

[**ClassAssignment**](ClassAssignment.md)

### Authorization

[OAuth2 accessCode](../README.md#OAuth2-accessCode)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Assignment copied to the demo class |  -  |
| **0** | Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## createEduResource

> EduResource createEduResource(eduResourceCreation)

Create a new education resource

### Example

```ts
import {
  Configuration,
  EduResourcesApi,
} from 'flat-api';
import type { CreateEduResourceRequest } from 'flat-api';

async function example() {
  console.log("🚀 Testing flat-api SDK...");
  const config = new Configuration({ 
    // To configure OAuth2 access token for authorization: OAuth2 accessCode
    accessToken: "YOUR ACCESS TOKEN",
  });
  const api = new EduResourcesApi(config);

  const body = {
    // EduResourceCreation
    eduResourceCreation: ...,
  } satisfies CreateEduResourceRequest;

  try {
    const data = await api.createEduResource(body);
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
| **eduResourceCreation** | [EduResourceCreation](EduResourceCreation.md) |  | |

### Return type

[**EduResource**](EduResource.md)

### Authorization

[OAuth2 accessCode](../README.md#OAuth2-accessCode)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Fetched resource |  -  |
| **0** | Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## createEduResourceLtiLink

> EduResourceLtiLink createEduResourceLtiLink(resource)

Create an LTI link for an education resource

This endpoint will return an LTI link that can be used to launch Flat for Education. The link, in a context from a class, will ensure the assignment has been copied in the class. 

### Example

```ts
import {
  Configuration,
  EduResourcesApi,
} from 'flat-api';
import type { CreateEduResourceLtiLinkRequest } from 'flat-api';

async function example() {
  console.log("🚀 Testing flat-api SDK...");
  const config = new Configuration({ 
    // To configure OAuth2 access token for authorization: OAuth2 accessCode
    accessToken: "YOUR ACCESS TOKEN",
  });
  const api = new EduResourcesApi(config);

  const body = {
    // string | Unique identifier of the resource
    resource: resource_example,
  } satisfies CreateEduResourceLtiLinkRequest;

  try {
    const data = await api.createEduResourceLtiLink(body);
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
| **resource** | `string` | Unique identifier of the resource | [Defaults to `undefined`] |

### Return type

[**EduResourceLtiLink**](EduResourceLtiLink.md)

### Authorization

[OAuth2 accessCode](../README.md#OAuth2-accessCode)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Created LTI Link |  -  |
| **0** | Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## deleteEduResource

> deleteEduResource(resource)

Delete an education resource

### Example

```ts
import {
  Configuration,
  EduResourcesApi,
} from 'flat-api';
import type { DeleteEduResourceRequest } from 'flat-api';

async function example() {
  console.log("🚀 Testing flat-api SDK...");
  const config = new Configuration({ 
    // To configure OAuth2 access token for authorization: OAuth2 accessCode
    accessToken: "YOUR ACCESS TOKEN",
  });
  const api = new EduResourcesApi(config);

  const body = {
    // string | Unique identifier of the resource
    resource: resource_example,
  } satisfies DeleteEduResourceRequest;

  try {
    const data = await api.deleteEduResource(body);
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
| **resource** | `string` | Unique identifier of the resource | [Defaults to `undefined`] |

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
| **204** | Resource deleted |  -  |
| **0** | Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## getEduResource

> EduResource getEduResource(resource)

Get an education resource

### Example

```ts
import {
  Configuration,
  EduResourcesApi,
} from 'flat-api';
import type { GetEduResourceRequest } from 'flat-api';

async function example() {
  console.log("🚀 Testing flat-api SDK...");
  const config = new Configuration({ 
    // To configure OAuth2 access token for authorization: OAuth2 accessCode
    accessToken: "YOUR ACCESS TOKEN",
  });
  const api = new EduResourcesApi(config);

  const body = {
    // string | Unique identifier of the resource
    resource: resource_example,
  } satisfies GetEduResourceRequest;

  try {
    const data = await api.getEduResource(body);
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
| **resource** | `string` | Unique identifier of the resource | [Defaults to `undefined`] |

### Return type

[**EduResource**](EduResource.md)

### Authorization

[OAuth2 accessCode](../README.md#OAuth2-accessCode)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Fetched resource |  -  |
| **0** | Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## listEduLibraries

> Array&lt;EduLibrary&gt; listEduLibraries()

List the education libraries

### Example

```ts
import {
  Configuration,
  EduResourcesApi,
} from 'flat-api';
import type { ListEduLibrariesRequest } from 'flat-api';

async function example() {
  console.log("🚀 Testing flat-api SDK...");
  const config = new Configuration({ 
    // To configure OAuth2 access token for authorization: OAuth2 accessCode
    accessToken: "YOUR ACCESS TOKEN",
  });
  const api = new EduResourcesApi(config);

  try {
    const data = await api.listEduLibraries();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters

This endpoint does not need any parameter.

### Return type

[**Array&lt;EduLibrary&gt;**](EduLibrary.md)

### Authorization

[OAuth2 accessCode](../README.md#OAuth2-accessCode)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Fetched resource |  -  |
| **0** | Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## listEduResources

> Array&lt;EduResource&gt; listEduResources(parent, withoutSubfoldersResources, type, subjects, assignmentTypes, grades, sort, direction, limit, next, previous)

List education resources in a library or folder

### Example

```ts
import {
  Configuration,
  EduResourcesApi,
} from 'flat-api';
import type { ListEduResourcesRequest } from 'flat-api';

async function example() {
  console.log("🚀 Testing flat-api SDK...");
  const config = new Configuration({ 
    // To configure OAuth2 access token for authorization: OAuth2 accessCode
    accessToken: "YOUR ACCESS TOKEN",
  });
  const api = new EduResourcesApi(config);

  const body = {
    // string | List the resources contained in this `parent` library or folder.  Accepts a folder identifier, or the identifier of one of the libraries returned by [`listEduLibraries`](#tag/EduResources/operation/listEduLibraries). Which libraries are available depends on the account, so use the `id` values that endpoint returns rather than hardcoding this list:  * `root`: the user\'s own resources * `organization`: resources shared with the organization  (optional)
    parent: parent_example,
    // boolean | For the `parent` = `organization`, do not include resources from subfolders. By default in the Resource Library UI, we include resources from subfolders, but for example in a picker like LTI, we don\'t want to include them.  (optional)
    withoutSubfoldersResources: true,
    // 'assignment' | 'folder' | Filter the returned resources by type  (optional)
    type: type_example,
    // Array<TeachingTheme> | Filter the returned resources by subjects  (optional)
    subjects: ...,
    // Array<AssignmentType> | Filter the returned resources by assignment types  (optional)
    assignmentTypes: ...,
    // Array<Grade> | Filter the returned resources by grades  (optional)
    grades: ...,
    // 'creationDate' | 'updateDate' | 'title' | Sort (optional)
    sort: sort_example,
    // 'asc' | 'desc' | Sort direction (optional)
    direction: direction_example,
    // number | This is the maximum number of resources that may be returned (optional)
    limit: 56,
    // string | An opaque string cursor to fetch the next page of data. The paginated API URLs are returned in the `Link` header when requesting the API. These URLs will contain a `next` and `previous` cursor based on the available data.  (optional)
    next: next_example,
    // string | An opaque string cursor to fetch the previous page of data. The paginated API URLs are returned in the `Link` header when requesting the API. These URLs will contain a `next` and `previous` cursor based on the available data.  (optional)
    previous: previous_example,
  } satisfies ListEduResourcesRequest;

  try {
    const data = await api.listEduResources(body);
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
| **parent** | `string` | List the resources contained in this &#x60;parent&#x60; library or folder.  Accepts a folder identifier, or the identifier of one of the libraries returned by [&#x60;listEduLibraries&#x60;](#tag/EduResources/operation/listEduLibraries). Which libraries are available depends on the account, so use the &#x60;id&#x60; values that endpoint returns rather than hardcoding this list:  * &#x60;root&#x60;: the user\&#39;s own resources * &#x60;organization&#x60;: resources shared with the organization  | [Optional] [Defaults to `&#39;root&#39;`] |
| **withoutSubfoldersResources** | `boolean` | For the &#x60;parent&#x60; &#x3D; &#x60;organization&#x60;, do not include resources from subfolders. By default in the Resource Library UI, we include resources from subfolders, but for example in a picker like LTI, we don\&#39;t want to include them.  | [Optional] [Defaults to `undefined`] |
| **type** | `assignment`, `folder` | Filter the returned resources by type  | [Optional] [Defaults to `undefined`] [Enum: assignment, folder] |
| **subjects** | `Array<TeachingTheme>` | Filter the returned resources by subjects  | [Optional] |
| **assignmentTypes** | `Array<AssignmentType>` | Filter the returned resources by assignment types  | [Optional] |
| **grades** | `Array<Grade>` | Filter the returned resources by grades  | [Optional] |
| **sort** | `creationDate`, `updateDate`, `title` | Sort | [Optional] [Defaults to `&#39;creationDate&#39;`] [Enum: creationDate, updateDate, title] |
| **direction** | `asc`, `desc` | Sort direction | [Optional] [Defaults to `undefined`] [Enum: asc, desc] |
| **limit** | `number` | This is the maximum number of resources that may be returned | [Optional] [Defaults to `25`] |
| **next** | `string` | An opaque string cursor to fetch the next page of data. The paginated API URLs are returned in the &#x60;Link&#x60; header when requesting the API. These URLs will contain a &#x60;next&#x60; and &#x60;previous&#x60; cursor based on the available data.  | [Optional] [Defaults to `undefined`] |
| **previous** | `string` | An opaque string cursor to fetch the previous page of data. The paginated API URLs are returned in the &#x60;Link&#x60; header when requesting the API. These URLs will contain a &#x60;next&#x60; and &#x60;previous&#x60; cursor based on the available data.  | [Optional] [Defaults to `undefined`] |

### Return type

[**Array&lt;EduResource&gt;**](EduResource.md)

### Authorization

[OAuth2 accessCode](../README.md#OAuth2-accessCode)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | List of resources |  * X-Total-Assignments-Count - Total number of assignments <br>  * X-Total-Folders-Count - Total number of folders <br>  |
| **0** | Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## moveEduResource

> EduResource moveEduResource(resource, eduResourceMove)

Move an education resource

### Example

```ts
import {
  Configuration,
  EduResourcesApi,
} from 'flat-api';
import type { MoveEduResourceRequest } from 'flat-api';

async function example() {
  console.log("🚀 Testing flat-api SDK...");
  const config = new Configuration({ 
    // To configure OAuth2 access token for authorization: OAuth2 accessCode
    accessToken: "YOUR ACCESS TOKEN",
  });
  const api = new EduResourcesApi(config);

  const body = {
    // string | Unique identifier of the resource
    resource: resource_example,
    // EduResourceMove
    eduResourceMove: ...,
  } satisfies MoveEduResourceRequest;

  try {
    const data = await api.moveEduResource(body);
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
| **resource** | `string` | Unique identifier of the resource | [Defaults to `undefined`] |
| **eduResourceMove** | [EduResourceMove](EduResourceMove.md) |  | |

### Return type

[**EduResource**](EduResource.md)

### Authorization

[OAuth2 accessCode](../README.md#OAuth2-accessCode)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Fetched resource |  -  |
| **0** | Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## updateEduResource

> EduResource updateEduResource(resource, eduResourceUpdate)

Update an education resource metadata

Update any resources metadata (e.g. title).  Use this method to rename education resources folders or assignments. 

### Example

```ts
import {
  Configuration,
  EduResourcesApi,
} from 'flat-api';
import type { UpdateEduResourceRequest } from 'flat-api';

async function example() {
  console.log("🚀 Testing flat-api SDK...");
  const config = new Configuration({ 
    // To configure OAuth2 access token for authorization: OAuth2 accessCode
    accessToken: "YOUR ACCESS TOKEN",
  });
  const api = new EduResourcesApi(config);

  const body = {
    // string | Unique identifier of the resource
    resource: resource_example,
    // EduResourceUpdate
    eduResourceUpdate: ...,
  } satisfies UpdateEduResourceRequest;

  try {
    const data = await api.updateEduResource(body);
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
| **resource** | `string` | Unique identifier of the resource | [Defaults to `undefined`] |
| **eduResourceUpdate** | [EduResourceUpdate](EduResourceUpdate.md) |  | |

### Return type

[**EduResource**](EduResource.md)

### Authorization

[OAuth2 accessCode](../README.md#OAuth2-accessCode)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Fetched resource |  -  |
| **0** | Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## updateEduResourceAssignment

> Assignment updateEduResourceAssignment(resource, assignmentUpdate)

Update an education resource assignment

### Example

```ts
import {
  Configuration,
  EduResourcesApi,
} from 'flat-api';
import type { UpdateEduResourceAssignmentRequest } from 'flat-api';

async function example() {
  console.log("🚀 Testing flat-api SDK...");
  const config = new Configuration({ 
    // To configure OAuth2 access token for authorization: OAuth2 accessCode
    accessToken: "YOUR ACCESS TOKEN",
  });
  const api = new EduResourcesApi(config);

  const body = {
    // string | Unique identifier of the resource
    resource: resource_example,
    // AssignmentUpdate
    assignmentUpdate: ...,
  } satisfies UpdateEduResourceAssignmentRequest;

  try {
    const data = await api.updateEduResourceAssignment(body);
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
| **resource** | `string` | Unique identifier of the resource | [Defaults to `undefined`] |
| **assignmentUpdate** | [AssignmentUpdate](AssignmentUpdate.md) |  | |

### Return type

[**Assignment**](Assignment.md)

### Authorization

[OAuth2 accessCode](../README.md#OAuth2-accessCode)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Fetched resource |  -  |
| **0** | Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## useEduResourceInClass

> ClassAssignment useEduResourceInClass(resource, eduResourceUseInClass)

Use an education resource in a class

This endpoint will copy a resource and the underlying resources. The assignment will be created as a draft that can be completed with other options before publishing (e.g. due date, publication date for scheduling, etc.). 

### Example

```ts
import {
  Configuration,
  EduResourcesApi,
} from 'flat-api';
import type { UseEduResourceInClassRequest } from 'flat-api';

async function example() {
  console.log("🚀 Testing flat-api SDK...");
  const config = new Configuration({ 
    // To configure OAuth2 access token for authorization: OAuth2 accessCode
    accessToken: "YOUR ACCESS TOKEN",
  });
  const api = new EduResourcesApi(config);

  const body = {
    // string | Unique identifier of the resource
    resource: resource_example,
    // EduResourceUseInClass
    eduResourceUseInClass: ...,
  } satisfies UseEduResourceInClassRequest;

  try {
    const data = await api.useEduResourceInClass(body);
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
| **resource** | `string` | Unique identifier of the resource | [Defaults to `undefined`] |
| **eduResourceUseInClass** | [EduResourceUseInClass](EduResourceUseInClass.md) |  | |

### Return type

[**ClassAssignment**](ClassAssignment.md)

### Authorization

[OAuth2 accessCode](../README.md#OAuth2-accessCode)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Assignment copied to the chosen class |  -  |
| **0** | Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

