# FlatApi.GroupApi

All URIs are relative to *https://api.flat.io/v2*

Method | HTTP request | Description
------------- | ------------- | -------------
[**getGroupDetails**](GroupApi.md#getGroupDetails) | **GET** /groups/{group} | Get group information
[**getGroupScores**](GroupApi.md#getGroupScores) | **GET** /groups/{group}/scores | List group&#39;s scores
[**listGroupUsers**](GroupApi.md#listGroupUsers) | **GET** /groups/{group}/users | List group&#39;s users



## getGroupDetails

> GroupDetails getGroupDetails(group)

Get group information

### Example

```javascript
import FlatApi from 'flat-api';
let defaultClient = FlatApi.ApiClient.instance;
// Configure OAuth2 access token for authorization: OAuth2
let OAuth2 = defaultClient.authentications['OAuth2'];
OAuth2.accessToken = 'YOUR ACCESS TOKEN';

let apiInstance = new FlatApi.GroupApi();
let group = "group_example"; // String | Unique identifier of a Flat group 
apiInstance.getGroupDetails(group, (error, data, response) => {
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

### Return type

[**GroupDetails**](GroupDetails.md)

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

let apiInstance = new FlatApi.GroupApi();
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


## listGroupUsers

> [UserPublic] listGroupUsers(group)

List group&#39;s users

### Example

```javascript
import FlatApi from 'flat-api';
let defaultClient = FlatApi.ApiClient.instance;
// Configure OAuth2 access token for authorization: OAuth2
let OAuth2 = defaultClient.authentications['OAuth2'];
OAuth2.accessToken = 'YOUR ACCESS TOKEN';

let apiInstance = new FlatApi.GroupApi();
let group = "group_example"; // String | Unique identifier of a Flat group 
apiInstance.listGroupUsers(group, (error, data, response) => {
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

### Return type

[**[UserPublic]**](UserPublic.md)

### Authorization

[OAuth2](../README.md#OAuth2)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

