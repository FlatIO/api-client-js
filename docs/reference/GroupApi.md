# GroupApi

All URIs are relative to *https://api.flat.io/v2*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**addGroupUser**](GroupApi.md#addgroupuseroperation) | **POST** /groups/{group}/users | Add a student to a group |
| [**createGroup**](GroupApi.md#creategroup) | **POST** /groups | Create a new group |
| [**deleteGroup**](GroupApi.md#deletegroup) | **DELETE** /groups/{group} | Delete a group |
| [**getGroupDetails**](GroupApi.md#getgroupdetails) | **GET** /groups/{group} | Get group information |
| [**getGroupScores**](GroupApi.md#getgroupscores) | **GET** /groups/{group}/scores | List group\&#39;s scores |
| [**listGroupUsers**](GroupApi.md#listgroupusers) | **GET** /groups/{group}/users | List group\&#39;s users |
| [**listGroups**](GroupApi.md#listgroups) | **GET** /groups | List groups |
| [**removeGroupUser**](GroupApi.md#removegroupuser) | **DELETE** /groups/{group}/users/{user} | Remove a student from a class group |
| [**renameGroup**](GroupApi.md#renamegroupoperation) | **PUT** /groups/{group} | Rename a group |



## addGroupUser

> AddGroupUser200Response addGroupUser(group, addGroupUserRequest)

Add a student to a group

Add a student to the specified group (must be in the same class)

### Example

```ts
import {
  Configuration,
  GroupApi,
} from 'flat-api';
import type { AddGroupUserOperationRequest } from 'flat-api';

async function example() {
  console.log("🚀 Testing flat-api SDK...");
  const config = new Configuration({ 
    // To configure OAuth2 access token for authorization: OAuth2 accessCode
    accessToken: "YOUR ACCESS TOKEN",
  });
  const api = new GroupApi(config);

  const body = {
    // string | Unique identifier of a Flat group 
    group: group_example,
    // AddGroupUserRequest
    addGroupUserRequest: ...,
  } satisfies AddGroupUserOperationRequest;

  try {
    const data = await api.addGroupUser(body);
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
| **addGroupUserRequest** | [AddGroupUserRequest](AddGroupUserRequest.md) |  | |

### Return type

[**AddGroupUser200Response**](AddGroupUser200Response.md)

### Authorization

[OAuth2 accessCode](../README.md#OAuth2-accessCode)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Membership created |  -  |
| **400** | Bad Request - Invalid user ID or user not enrolled in class |  -  |
| **403** | Forbidden - Insufficient permissions or invalid group type |  -  |
| **404** | Not Found - Group not found or user not found |  -  |
| **0** | Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## createGroup

> GroupDetails createGroup(groupCreation)

Create a new group

Create a group of the given type, tied to a classroom, optionally with initial members. 

### Example

```ts
import {
  Configuration,
  GroupApi,
} from 'flat-api';
import type { CreateGroupRequest } from 'flat-api';

async function example() {
  console.log("🚀 Testing flat-api SDK...");
  const config = new Configuration({ 
    // To configure OAuth2 access token for authorization: OAuth2 accessCode
    accessToken: "YOUR ACCESS TOKEN",
  });
  const api = new GroupApi(config);

  const body = {
    // GroupCreation
    groupCreation: ...,
  } satisfies CreateGroupRequest;

  try {
    const data = await api.createGroup(body);
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
| **groupCreation** | [GroupCreation](GroupCreation.md) |  | |

### Return type

[**GroupDetails**](GroupDetails.md)

### Authorization

[OAuth2 accessCode](../README.md#OAuth2-accessCode)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | The new group |  -  |
| **400** | Bad Request - Invalid type or missing required parameters |  -  |
| **403** | Forbidden - Insufficient permissions |  -  |
| **409** | Conflict - Group name already exists |  -  |
| **0** | Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## deleteGroup

> deleteGroup(group)

Delete a group

Delete a group. Only available to teachers of the classroom.

### Example

```ts
import {
  Configuration,
  GroupApi,
} from 'flat-api';
import type { DeleteGroupRequest } from 'flat-api';

async function example() {
  console.log("🚀 Testing flat-api SDK...");
  const config = new Configuration({ 
    // To configure OAuth2 access token for authorization: OAuth2 accessCode
    accessToken: "YOUR ACCESS TOKEN",
  });
  const api = new GroupApi(config);

  const body = {
    // string | Unique identifier of a Flat group 
    group: group_example,
  } satisfies DeleteGroupRequest;

  try {
    const data = await api.deleteGroup(body);
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
| **204** | Group deleted |  -  |
| **403** | Forbidden - Insufficient permissions or invalid group type |  -  |
| **404** | Not Found - Group not found |  -  |
| **0** | Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## getGroupDetails

> GroupDetails getGroupDetails(group)

Get group information

### Example

```ts
import {
  Configuration,
  GroupApi,
} from 'flat-api';
import type { GetGroupDetailsRequest } from 'flat-api';

async function example() {
  console.log("🚀 Testing flat-api SDK...");
  const config = new Configuration({ 
    // To configure OAuth2 access token for authorization: OAuth2 accessCode
    accessToken: "YOUR ACCESS TOKEN",
  });
  const api = new GroupApi(config);

  const body = {
    // string | Unique identifier of a Flat group 
    group: group_example,
  } satisfies GetGroupDetailsRequest;

  try {
    const data = await api.getGroupDetails(body);
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

### Return type

[**GroupDetails**](GroupDetails.md)

### Authorization

[OAuth2 accessCode](../README.md#OAuth2-accessCode)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | The group details |  -  |
| **404** | Not Found - Group not found or insufficient permissions |  -  |
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
  GroupApi,
} from 'flat-api';
import type { GetGroupScoresRequest } from 'flat-api';

async function example() {
  console.log("🚀 Testing flat-api SDK...");
  const config = new Configuration({ 
    // To configure OAuth2 access token for authorization: OAuth2 accessCode
    accessToken: "YOUR ACCESS TOKEN",
  });
  const api = new GroupApi(config);

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


## listGroupUsers

> Array&lt;UserPublic&gt; listGroupUsers(group, source)

List group\&#39;s users

### Example

```ts
import {
  Configuration,
  GroupApi,
} from 'flat-api';
import type { ListGroupUsersRequest } from 'flat-api';

async function example() {
  console.log("🚀 Testing flat-api SDK...");
  const config = new Configuration({ 
    // To configure OAuth2 access token for authorization: OAuth2 accessCode
    accessToken: "YOUR ACCESS TOKEN",
  });
  const api = new GroupApi(config);

  const body = {
    // string | Unique identifier of a Flat group 
    group: group_example,
    // 'googleClassroom' | 'microsoftGraph' | 'clever' | Filter the users by their source  (optional)
    source: source_example,
  } satisfies ListGroupUsersRequest;

  try {
    const data = await api.listGroupUsers(body);
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
| **source** | `googleClassroom`, `microsoftGraph`, `clever` | Filter the users by their source  | [Optional] [Defaults to `undefined`] [Enum: googleClassroom, microsoftGraph, clever] |

### Return type

[**Array&lt;UserPublic&gt;**](UserPublic.md)

### Authorization

[OAuth2 accessCode](../README.md#OAuth2-accessCode)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | The list of users member of the group |  -  |
| **404** | Not Found - Group not found or insufficient permissions |  -  |
| **0** | Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## listGroups

> Array&lt;GroupDetails&gt; listGroups(type, classroom, assignment)

List groups

List all groups of a given type, filtered by either a classroom or an assignment. 

### Example

```ts
import {
  Configuration,
  GroupApi,
} from 'flat-api';
import type { ListGroupsRequest } from 'flat-api';

async function example() {
  console.log("🚀 Testing flat-api SDK...");
  const config = new Configuration({ 
    // To configure OAuth2 access token for authorization: OAuth2 accessCode
    accessToken: "YOUR ACCESS TOKEN",
  });
  const api = new GroupApi(config);

  const body = {
    // 'classStudentsSubGroup' | 'assignmentStudentsSubGroup'
    type: type_example,
    // string | Classroom ID to filter by (optional)
    classroom: classroom_example,
    // string | Assignment ID to filter by (optional)
    assignment: assignment_example,
  } satisfies ListGroupsRequest;

  try {
    const data = await api.listGroups(body);
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
| **type** | `classStudentsSubGroup`, `assignmentStudentsSubGroup` |  | [Defaults to `undefined`] [Enum: classStudentsSubGroup, assignmentStudentsSubGroup] |
| **classroom** | `string` | Classroom ID to filter by | [Optional] [Defaults to `undefined`] |
| **assignment** | `string` | Assignment ID to filter by | [Optional] [Defaults to `undefined`] |

### Return type

[**Array&lt;GroupDetails&gt;**](GroupDetails.md)

### Authorization

[OAuth2 accessCode](../README.md#OAuth2-accessCode)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | List of groups |  -  |
| **400** | Bad Request - Invalid type or missing required parameters |  -  |
| **403** | Forbidden - Insufficient permissions |  -  |
| **404** | Not Found - Classroom or assignment not found |  -  |
| **0** | Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## removeGroupUser

> removeGroupUser(group, user)

Remove a student from a class group

Remove a student from a class group

### Example

```ts
import {
  Configuration,
  GroupApi,
} from 'flat-api';
import type { RemoveGroupUserRequest } from 'flat-api';

async function example() {
  console.log("🚀 Testing flat-api SDK...");
  const config = new Configuration({ 
    // To configure OAuth2 access token for authorization: OAuth2 accessCode
    accessToken: "YOUR ACCESS TOKEN",
  });
  const api = new GroupApi(config);

  const body = {
    // string | Unique identifier of a Flat group 
    group: group_example,
    // string | User ID
    user: user_example,
  } satisfies RemoveGroupUserRequest;

  try {
    const data = await api.removeGroupUser(body);
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
| **user** | `string` | User ID | [Defaults to `undefined`] |

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
| **204** | Membership removed |  -  |
| **403** | Forbidden - Insufficient permissions or invalid group type |  -  |
| **404** | Not Found - Group not found or user not found |  -  |
| **0** | Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## renameGroup

> GroupDetails renameGroup(group, renameGroupRequest)

Rename a group

Rename a sub-group. Only available for class student groups.

### Example

```ts
import {
  Configuration,
  GroupApi,
} from 'flat-api';
import type { RenameGroupOperationRequest } from 'flat-api';

async function example() {
  console.log("🚀 Testing flat-api SDK...");
  const config = new Configuration({ 
    // To configure OAuth2 access token for authorization: OAuth2 accessCode
    accessToken: "YOUR ACCESS TOKEN",
  });
  const api = new GroupApi(config);

  const body = {
    // string | Unique identifier of a Flat group 
    group: group_example,
    // RenameGroupRequest
    renameGroupRequest: ...,
  } satisfies RenameGroupOperationRequest;

  try {
    const data = await api.renameGroup(body);
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
| **renameGroupRequest** | [RenameGroupRequest](RenameGroupRequest.md) |  | |

### Return type

[**GroupDetails**](GroupDetails.md)

### Authorization

[OAuth2 accessCode](../README.md#OAuth2-accessCode)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Updated group |  -  |
| **400** | Bad Request - Invalid group ID or missing name |  -  |
| **403** | Forbidden - Insufficient permissions |  -  |
| **404** | Not Found - Group not found |  -  |
| **409** | Conflict - Group name already exists |  -  |
| **0** | Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

