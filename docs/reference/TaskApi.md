# TaskApi

All URIs are relative to *https://api.flat.io/v2*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**getTask**](TaskApi.md#gettask) | **GET** /tasks/{task} | Get a task details |



## getTask

> Task getTask(task)

Get a task details

This method can be used to follow a task progression, for example while a score is being exported. 

### Example

```ts
import {
  Configuration,
  TaskApi,
} from 'flat-api';
import type { GetTaskRequest } from 'flat-api';

async function example() {
  console.log("🚀 Testing flat-api SDK...");
  const config = new Configuration({ 
    // To configure OAuth2 access token for authorization: OAuth2 accessCode
    accessToken: "YOUR ACCESS TOKEN",
  });
  const api = new TaskApi(config);

  const body = {
    // string | Unique identifier for the task
    task: task_example,
  } satisfies GetTaskRequest;

  try {
    const data = await api.getTask(body);
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
| **task** | `string` | Unique identifier for the task | [Defaults to `undefined`] |

### Return type

[**Task**](Task.md)

### Authorization

[OAuth2 accessCode](../README.md#OAuth2-accessCode)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Task details |  -  |
| **0** | Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

