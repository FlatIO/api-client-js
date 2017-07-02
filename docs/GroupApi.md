# FlatApi.GroupApi

All URIs are relative to *https://api.flat.io/v2*

Method | HTTP request | Description
------------- | ------------- | -------------
[**getGroupDetails**](GroupApi.md#getGroupDetails) | **GET** /groups/{group} | Get group information
[**getGroupScores**](GroupApi.md#getGroupScores) | **GET** /groups/{group}/scores | List group&#39;s scores
[**listGroupUsers**](GroupApi.md#listGroupUsers) | **GET** /groups/{group}/users | List group&#39;s users


<a name="getGroupDetails"></a>
# **getGroupDetails**
> GroupDetails getGroupDetails(group)

Get group information

### Example
```javascript
var FlatApi = require('flat-api');
var defaultClient = FlatApi.ApiClient.instance;

// Configure OAuth2 access token for authorization: OAuth2
var OAuth2 = defaultClient.authentications['OAuth2'];
OAuth2.accessToken = 'YOUR ACCESS TOKEN';

var apiInstance = new FlatApi.GroupApi();

var group = "group_example"; // String | Unique identifier of a Flat group 


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.getGroupDetails(group, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **group** | **String**| Unique identifier of a Flat group  | 

### Return type

[**GroupDetails**](GroupDetails.md)

### Authorization

[OAuth2](../README.md#OAuth2)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="getGroupScores"></a>
# **getGroupScores**
> [ScoreDetails] getGroupScores(group, opts)

List group&#39;s scores

Get the list of scores shared with a group. 

### Example
```javascript
var FlatApi = require('flat-api');
var defaultClient = FlatApi.ApiClient.instance;

// Configure OAuth2 access token for authorization: OAuth2
var OAuth2 = defaultClient.authentications['OAuth2'];
OAuth2.accessToken = 'YOUR ACCESS TOKEN';

var apiInstance = new FlatApi.GroupApi();

var group = "group_example"; // String | Unique identifier of a Flat group 

var opts = { 
  'parent': "parent_example" // String | Filter the score forked from the score id `parent`
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.getGroupScores(group, opts, callback);
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

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="listGroupUsers"></a>
# **listGroupUsers**
> [UserPublic] listGroupUsers(group)

List group&#39;s users

### Example
```javascript
var FlatApi = require('flat-api');
var defaultClient = FlatApi.ApiClient.instance;

// Configure OAuth2 access token for authorization: OAuth2
var OAuth2 = defaultClient.authentications['OAuth2'];
OAuth2.accessToken = 'YOUR ACCESS TOKEN';

var apiInstance = new FlatApi.GroupApi();

var group = "group_example"; // String | Unique identifier of a Flat group 


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.listGroupUsers(group, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **group** | **String**| Unique identifier of a Flat group  | 

### Return type

[**[UserPublic]**](UserPublic.md)

### Authorization

[OAuth2](../README.md#OAuth2)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

