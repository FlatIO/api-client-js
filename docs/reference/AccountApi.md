# AccountApi

All URIs are relative to *https://api.flat.io/v2*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**getAuthenticatedUser**](AccountApi.md#getauthenticateduser) | **GET** /me | Get current user account |



## getAuthenticatedUser

> UserDetails getAuthenticatedUser(onlyId)

Get current user account

Get details about the current authenticated User. 

### Example

```ts
import {
  Configuration,
  AccountApi,
} from 'flat-api';
import type { GetAuthenticatedUserRequest } from 'flat-api';

async function example() {
  console.log("🚀 Testing flat-api SDK...");
  const config = new Configuration({ 
    // To configure OAuth2 access token for authorization: OAuth2 accessCode
    accessToken: "YOUR ACCESS TOKEN",
  });
  const api = new AccountApi(config);

  const body = {
    // boolean | Only return the user id (optional)
    onlyId: true,
  } satisfies GetAuthenticatedUserRequest;

  try {
    const data = await api.getAuthenticatedUser(body);
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
| **onlyId** | `boolean` | Only return the user id | [Optional] [Defaults to `false`] |

### Return type

[**UserDetails**](UserDetails.md)

### Authorization

[OAuth2 accessCode](../README.md#OAuth2-accessCode)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Current user details |  -  |
| **0** | Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

