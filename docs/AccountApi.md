# FlatApi.AccountApi

All URIs are relative to *https://api.flat.io/v2*

Method | HTTP request | Description
------------- | ------------- | -------------
[**getAuthenticatedUser**](AccountApi.md#getAuthenticatedUser) | **GET** /me | Get current user profile


<a name="getAuthenticatedUser"></a>
# **getAuthenticatedUser**
> UserDetails getAuthenticatedUser()

Get current user profile

Get details about the current authenticated User. 

### Example
```javascript
var FlatApi = require('flat-api');
var defaultClient = FlatApi.ApiClient.default;

// Configure OAuth2 access token for authorization: OAuth2
var OAuth2 = defaultClient.authentications['OAuth2'];
OAuth2.accessToken = 'YOUR ACCESS TOKEN';

var apiInstance = new FlatApi.AccountApi();

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.getAuthenticatedUser(callback);
```

### Parameters
This endpoint does not need any parameter.

### Return type

[**UserDetails**](UserDetails.md)

### Authorization

[OAuth2](../README.md#OAuth2)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

