# FlatApi.GroupApi

All URIs are relative to *https://api.flat.io/v2*

Method | HTTP request | Description
------------- | ------------- | -------------
[**getGroupScores**](GroupApi.md#getGroupScores) | **GET** /groups/{group}/scores | List group&#39;s scores


<a name="getGroupScores"></a>
# **getGroupScores**
> [ScoreDetails] getGroupScores(group, opts)

List group&#39;s scores

Get the list of scores shared with a group. 

### Example
```javascript
var FlatApi = require('flat-api');

var apiInstance = new FlatApi.GroupApi();

var group = "group_example"; // String | Unique identifier of the group

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
 **group** | **String**| Unique identifier of the group | 
 **parent** | **String**| Filter the score forked from the score id &#x60;parent&#x60; | [optional] 

### Return type

[**[ScoreDetails]**](ScoreDetails.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

