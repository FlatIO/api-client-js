# OMRApi

All URIs are relative to *https://api.flat.io/v2*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**addOmrJobFile**](OMRApi.md#addomrjobfile) | **POST** /omr/jobs/{job}/files | Add a file to an OMR job |
| [**cancelOmrJob**](OMRApi.md#cancelomrjob) | **POST** /omr/jobs/{job}/cancel | Cancel an OMR job |
| [**createOmrJob**](OMRApi.md#createomrjob) | **POST** /omr/jobs | Create an OMR job |
| [**deleteOmrJob**](OMRApi.md#deleteomrjob) | **DELETE** /omr/jobs/{job} | Delete an OMR job\&#39;s data |
| [**getOmrCapabilities**](OMRApi.md#getomrcapabilities) | **GET** /omr/capabilities | OMR capabilities and limits |
| [**getOmrJob**](OMRApi.md#getomrjob) | **GET** /omr/jobs/{job} | Get an OMR job |
| [**getOmrJobExport**](OMRApi.md#getomrjobexport) | **GET** /omr/jobs/{job}/exports/{format} | Download the finalized result |
| [**getOmrJobFile**](OMRApi.md#getomrjobfile) | **GET** /omr/jobs/{job}/files/{index} | Get an input page image |
| [**listBillingCreditsHistory**](OMRApi.md#listbillingcreditshistory) | **GET** /billing/credits/history | List credit history |
| [**listOmrJobs**](OMRApi.md#listomrjobs) | **GET** /omr/jobs | List OMR jobs |
| [**startOmrJob**](OMRApi.md#startomrjob) | **POST** /omr/jobs/{job}/start | Start an OMR job |
| [**submitOmrJobStep**](OMRApi.md#submitomrjobstep) | **POST** /omr/jobs/{job}/steps/{step} | Submit an interactive step |



## addOmrJobFile

> OmrJobFileUploadResult addOmrJobFile(job, omrJobFileUpload, xFlatLocale)

Add a file to an OMR job

Add one image or PDF to a draft job. Call once per file; files keep their upload order.

### Example

```ts
import {
  Configuration,
  OMRApi,
} from 'flat-api';
import type { AddOmrJobFileRequest } from 'flat-api';

async function example() {
  console.log("🚀 Testing flat-api SDK...");
  const config = new Configuration({ 
    // To configure OAuth2 access token for authorization: OAuth2 accessCode
    accessToken: "YOUR ACCESS TOKEN",
  });
  const api = new OMRApi(config);

  const body = {
    // string | Unique identifier of the OMR job
    job: job_example,
    // OmrJobFileUpload
    omrJobFileUpload: ...,
    // string | Preferred locale for localized content in the response (translated error messages, emails, etc.).  Accepts any IETF language tag. The API best-matches the value to a supported locale and never rejects an unknown one (it falls back to the closest match, then to `en`).  Supported normalized locales: `da`, `de`, `en`, `en-GB`, `es`, `fi`, `fil`, `fr`, `fr-CA`, `hi`, `id`, `it`, `ja`, `ko`, `ms`, `nl`, `nb`, `pl`, `pt`, `pt-BR`, `ro`, `ru`, `sv`, `tr`, `zh-Hans`, `zh-HK`, `zh-TW`.  Precedence (highest first): this `X-Flat-Locale` header, the authenticated user\'s account locale, the `Accept-Language` header, then `en`.  (optional)
    xFlatLocale: fr,
  } satisfies AddOmrJobFileRequest;

  try {
    const data = await api.addOmrJobFile(body);
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
| **job** | `string` | Unique identifier of the OMR job | [Defaults to `undefined`] |
| **omrJobFileUpload** | [OmrJobFileUpload](OmrJobFileUpload.md) |  | |
| **xFlatLocale** | `string` | Preferred locale for localized content in the response (translated error messages, emails, etc.).  Accepts any IETF language tag. The API best-matches the value to a supported locale and never rejects an unknown one (it falls back to the closest match, then to &#x60;en&#x60;).  Supported normalized locales: &#x60;da&#x60;, &#x60;de&#x60;, &#x60;en&#x60;, &#x60;en-GB&#x60;, &#x60;es&#x60;, &#x60;fi&#x60;, &#x60;fil&#x60;, &#x60;fr&#x60;, &#x60;fr-CA&#x60;, &#x60;hi&#x60;, &#x60;id&#x60;, &#x60;it&#x60;, &#x60;ja&#x60;, &#x60;ko&#x60;, &#x60;ms&#x60;, &#x60;nl&#x60;, &#x60;nb&#x60;, &#x60;pl&#x60;, &#x60;pt&#x60;, &#x60;pt-BR&#x60;, &#x60;ro&#x60;, &#x60;ru&#x60;, &#x60;sv&#x60;, &#x60;tr&#x60;, &#x60;zh-Hans&#x60;, &#x60;zh-HK&#x60;, &#x60;zh-TW&#x60;.  Precedence (highest first): this &#x60;X-Flat-Locale&#x60; header, the authenticated user\&#39;s account locale, the &#x60;Accept-Language&#x60; header, then &#x60;en&#x60;.  | [Optional] [Defaults to `undefined`] |

### Return type

[**OmrJobFileUploadResult**](OmrJobFileUploadResult.md)

### Authorization

[OAuth2 accessCode](../README.md#OAuth2-accessCode)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | File added |  -  |
| **409** | Job is not in draft state |  -  |
| **0** | Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## cancelOmrJob

> OmrJob cancelOmrJob(job, xFlatLocale)

Cancel an OMR job

Cancel a draft or in-flight job. Any charged credits are reversed.

### Example

```ts
import {
  Configuration,
  OMRApi,
} from 'flat-api';
import type { CancelOmrJobRequest } from 'flat-api';

async function example() {
  console.log("🚀 Testing flat-api SDK...");
  const config = new Configuration({ 
    // To configure OAuth2 access token for authorization: OAuth2 accessCode
    accessToken: "YOUR ACCESS TOKEN",
  });
  const api = new OMRApi(config);

  const body = {
    // string | Unique identifier of the OMR job
    job: job_example,
    // string | Preferred locale for localized content in the response (translated error messages, emails, etc.).  Accepts any IETF language tag. The API best-matches the value to a supported locale and never rejects an unknown one (it falls back to the closest match, then to `en`).  Supported normalized locales: `da`, `de`, `en`, `en-GB`, `es`, `fi`, `fil`, `fr`, `fr-CA`, `hi`, `id`, `it`, `ja`, `ko`, `ms`, `nl`, `nb`, `pl`, `pt`, `pt-BR`, `ro`, `ru`, `sv`, `tr`, `zh-Hans`, `zh-HK`, `zh-TW`.  Precedence (highest first): this `X-Flat-Locale` header, the authenticated user\'s account locale, the `Accept-Language` header, then `en`.  (optional)
    xFlatLocale: fr,
  } satisfies CancelOmrJobRequest;

  try {
    const data = await api.cancelOmrJob(body);
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
| **job** | `string` | Unique identifier of the OMR job | [Defaults to `undefined`] |
| **xFlatLocale** | `string` | Preferred locale for localized content in the response (translated error messages, emails, etc.).  Accepts any IETF language tag. The API best-matches the value to a supported locale and never rejects an unknown one (it falls back to the closest match, then to &#x60;en&#x60;).  Supported normalized locales: &#x60;da&#x60;, &#x60;de&#x60;, &#x60;en&#x60;, &#x60;en-GB&#x60;, &#x60;es&#x60;, &#x60;fi&#x60;, &#x60;fil&#x60;, &#x60;fr&#x60;, &#x60;fr-CA&#x60;, &#x60;hi&#x60;, &#x60;id&#x60;, &#x60;it&#x60;, &#x60;ja&#x60;, &#x60;ko&#x60;, &#x60;ms&#x60;, &#x60;nl&#x60;, &#x60;nb&#x60;, &#x60;pl&#x60;, &#x60;pt&#x60;, &#x60;pt-BR&#x60;, &#x60;ro&#x60;, &#x60;ru&#x60;, &#x60;sv&#x60;, &#x60;tr&#x60;, &#x60;zh-Hans&#x60;, &#x60;zh-HK&#x60;, &#x60;zh-TW&#x60;.  Precedence (highest first): this &#x60;X-Flat-Locale&#x60; header, the authenticated user\&#39;s account locale, the &#x60;Accept-Language&#x60; header, then &#x60;en&#x60;.  | [Optional] [Defaults to `undefined`] |

### Return type

[**OmrJob**](OmrJob.md)

### Authorization

[OAuth2 accessCode](../README.md#OAuth2-accessCode)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Canceled |  -  |
| **0** | Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## createOmrJob

> OmrJob createOmrJob(omrJobCreation, xFlatLocale)

Create an OMR job

Create an Optical Music Recognition job. There are two ways to call this endpoint:  * **Draft:** send the parameters without &#x60;files&#x60; to create an empty job, then add   files with &#x60;addOmrJobFile&#x60;, then run it with &#x60;startOmrJob&#x60;. Best for multiple   images or incremental mobile capture. * **One-shot:** include &#x60;files&#x60; and &#x60;autoStart: true&#x60; to import in a single request.   Best for a single PDF or a third-party integration.  Declare the interactive steps your client supports in &#x60;interactiveSteps&#x60;: the pipeline runs fully automatically and only pauses at the steps you list. Steps you do not list, including ones added in the future, are auto-resolved with server defaults, so older clients never break.  Pages are recognized in the orientation they are uploaded in. If your client does not let the user rotate pages before upload, set &#x60;autoRotate: true&#x60; and the server corrects pages uploaded sideways or upside down. 

### Example

```ts
import {
  Configuration,
  OMRApi,
} from 'flat-api';
import type { CreateOmrJobRequest } from 'flat-api';

async function example() {
  console.log("🚀 Testing flat-api SDK...");
  const config = new Configuration({ 
    // To configure OAuth2 access token for authorization: OAuth2 accessCode
    accessToken: "YOUR ACCESS TOKEN",
  });
  const api = new OMRApi(config);

  const body = {
    // OmrJobCreation
    omrJobCreation: ...,
    // string | Preferred locale for localized content in the response (translated error messages, emails, etc.).  Accepts any IETF language tag. The API best-matches the value to a supported locale and never rejects an unknown one (it falls back to the closest match, then to `en`).  Supported normalized locales: `da`, `de`, `en`, `en-GB`, `es`, `fi`, `fil`, `fr`, `fr-CA`, `hi`, `id`, `it`, `ja`, `ko`, `ms`, `nl`, `nb`, `pl`, `pt`, `pt-BR`, `ro`, `ru`, `sv`, `tr`, `zh-Hans`, `zh-HK`, `zh-TW`.  Precedence (highest first): this `X-Flat-Locale` header, the authenticated user\'s account locale, the `Accept-Language` header, then `en`.  (optional)
    xFlatLocale: fr,
  } satisfies CreateOmrJobRequest;

  try {
    const data = await api.createOmrJob(body);
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
| **omrJobCreation** | [OmrJobCreation](OmrJobCreation.md) |  | |
| **xFlatLocale** | `string` | Preferred locale for localized content in the response (translated error messages, emails, etc.).  Accepts any IETF language tag. The API best-matches the value to a supported locale and never rejects an unknown one (it falls back to the closest match, then to &#x60;en&#x60;).  Supported normalized locales: &#x60;da&#x60;, &#x60;de&#x60;, &#x60;en&#x60;, &#x60;en-GB&#x60;, &#x60;es&#x60;, &#x60;fi&#x60;, &#x60;fil&#x60;, &#x60;fr&#x60;, &#x60;fr-CA&#x60;, &#x60;hi&#x60;, &#x60;id&#x60;, &#x60;it&#x60;, &#x60;ja&#x60;, &#x60;ko&#x60;, &#x60;ms&#x60;, &#x60;nl&#x60;, &#x60;nb&#x60;, &#x60;pl&#x60;, &#x60;pt&#x60;, &#x60;pt-BR&#x60;, &#x60;ro&#x60;, &#x60;ru&#x60;, &#x60;sv&#x60;, &#x60;tr&#x60;, &#x60;zh-Hans&#x60;, &#x60;zh-HK&#x60;, &#x60;zh-TW&#x60;.  Precedence (highest first): this &#x60;X-Flat-Locale&#x60; header, the authenticated user\&#39;s account locale, the &#x60;Accept-Language&#x60; header, then &#x60;en&#x60;.  | [Optional] [Defaults to `undefined`] |

### Return type

[**OmrJob**](OmrJob.md)

### Authorization

[OAuth2 accessCode](../README.md#OAuth2-accessCode)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **201** | Draft created |  -  |
| **202** | One-shot job started (files provided with autoStart) |  -  |
| **402** | Account overquota or feature not included |  -  |
| **0** | Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## deleteOmrJob

> OmrJob deleteOmrJob(job, xFlatLocale)

Delete an OMR job\&#39;s data

Erase a job\&#39;s uploaded files and recognition results now, instead of waiting for its retention deadline. Use this to serve a deletion request from your own end user.  Reaches the same end state as retention expiry: the files are gone, the job keeps the &#x60;status&#x60; it finished with, stays listable, and reports &#x60;retention.expiredDate&#x60;. Downloads then fail with &#x60;OMR_JOB_EXPIRED&#x60;.  Only available for jobs whose &#x60;output&#x60; is &#x60;musicxml&#x60;. Library imports are not covered by the retention policy and are rejected with &#x60;OMR_JOB_NOT_EXPIRABLE&#x60;; delete the resulting score instead.  The job must have finished (&#x60;done&#x60;, &#x60;error&#x60; or &#x60;canceled&#x60;). A draft or in-flight job is rejected with &#x60;OMR_JOB_IN_PROGRESS&#x60;: cancel it first, then delete. Deleting never cancels on your behalf, because cancellation reverses charged credits and that must not happen as a side effect of erasing data.  Calling this again on an already-erased job succeeds and changes nothing. 

### Example

```ts
import {
  Configuration,
  OMRApi,
} from 'flat-api';
import type { DeleteOmrJobRequest } from 'flat-api';

async function example() {
  console.log("🚀 Testing flat-api SDK...");
  const config = new Configuration({ 
    // To configure OAuth2 access token for authorization: OAuth2 accessCode
    accessToken: "YOUR ACCESS TOKEN",
  });
  const api = new OMRApi(config);

  const body = {
    // string | Unique identifier of the OMR job
    job: job_example,
    // string | Preferred locale for localized content in the response (translated error messages, emails, etc.).  Accepts any IETF language tag. The API best-matches the value to a supported locale and never rejects an unknown one (it falls back to the closest match, then to `en`).  Supported normalized locales: `da`, `de`, `en`, `en-GB`, `es`, `fi`, `fil`, `fr`, `fr-CA`, `hi`, `id`, `it`, `ja`, `ko`, `ms`, `nl`, `nb`, `pl`, `pt`, `pt-BR`, `ro`, `ru`, `sv`, `tr`, `zh-Hans`, `zh-HK`, `zh-TW`.  Precedence (highest first): this `X-Flat-Locale` header, the authenticated user\'s account locale, the `Accept-Language` header, then `en`.  (optional)
    xFlatLocale: fr,
  } satisfies DeleteOmrJobRequest;

  try {
    const data = await api.deleteOmrJob(body);
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
| **job** | `string` | Unique identifier of the OMR job | [Defaults to `undefined`] |
| **xFlatLocale** | `string` | Preferred locale for localized content in the response (translated error messages, emails, etc.).  Accepts any IETF language tag. The API best-matches the value to a supported locale and never rejects an unknown one (it falls back to the closest match, then to &#x60;en&#x60;).  Supported normalized locales: &#x60;da&#x60;, &#x60;de&#x60;, &#x60;en&#x60;, &#x60;en-GB&#x60;, &#x60;es&#x60;, &#x60;fi&#x60;, &#x60;fil&#x60;, &#x60;fr&#x60;, &#x60;fr-CA&#x60;, &#x60;hi&#x60;, &#x60;id&#x60;, &#x60;it&#x60;, &#x60;ja&#x60;, &#x60;ko&#x60;, &#x60;ms&#x60;, &#x60;nl&#x60;, &#x60;nb&#x60;, &#x60;pl&#x60;, &#x60;pt&#x60;, &#x60;pt-BR&#x60;, &#x60;ro&#x60;, &#x60;ru&#x60;, &#x60;sv&#x60;, &#x60;tr&#x60;, &#x60;zh-Hans&#x60;, &#x60;zh-HK&#x60;, &#x60;zh-TW&#x60;.  Precedence (highest first): this &#x60;X-Flat-Locale&#x60; header, the authenticated user\&#39;s account locale, the &#x60;Accept-Language&#x60; header, then &#x60;en&#x60;.  | [Optional] [Defaults to `undefined`] |

### Return type

[**OmrJob**](OmrJob.md)

### Authorization

[OAuth2 accessCode](../README.md#OAuth2-accessCode)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Job data erased |  -  |
| **403** | Not the owner of this job |  -  |
| **404** | Job not found |  -  |
| **409** | Job is not covered by the retention policy, or has not finished yet |  -  |
| **0** | Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## getOmrCapabilities

> OmrCapabilities getOmrCapabilities(xFlatLocale)

OMR capabilities and limits

Advertises the supported steps, export formats, limits, cost-per-page, remaining credits and locales, so clients can feature-detect instead of hardcoding behavior.  Authentication is optional: called without an account, the limits are those of the free plan and &#x60;remainingCredits&#x60; is omitted. 

### Example

```ts
import {
  Configuration,
  OMRApi,
} from 'flat-api';
import type { GetOmrCapabilitiesRequest } from 'flat-api';

async function example() {
  console.log("🚀 Testing flat-api SDK...");
  const config = new Configuration({ 
    // To configure OAuth2 access token for authorization: OAuth2 accessCode
    accessToken: "YOUR ACCESS TOKEN",
  });
  const api = new OMRApi(config);

  const body = {
    // string | Preferred locale for localized content in the response (translated error messages, emails, etc.).  Accepts any IETF language tag. The API best-matches the value to a supported locale and never rejects an unknown one (it falls back to the closest match, then to `en`).  Supported normalized locales: `da`, `de`, `en`, `en-GB`, `es`, `fi`, `fil`, `fr`, `fr-CA`, `hi`, `id`, `it`, `ja`, `ko`, `ms`, `nl`, `nb`, `pl`, `pt`, `pt-BR`, `ro`, `ru`, `sv`, `tr`, `zh-Hans`, `zh-HK`, `zh-TW`.  Precedence (highest first): this `X-Flat-Locale` header, the authenticated user\'s account locale, the `Accept-Language` header, then `en`.  (optional)
    xFlatLocale: fr,
  } satisfies GetOmrCapabilitiesRequest;

  try {
    const data = await api.getOmrCapabilities(body);
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
| **xFlatLocale** | `string` | Preferred locale for localized content in the response (translated error messages, emails, etc.).  Accepts any IETF language tag. The API best-matches the value to a supported locale and never rejects an unknown one (it falls back to the closest match, then to &#x60;en&#x60;).  Supported normalized locales: &#x60;da&#x60;, &#x60;de&#x60;, &#x60;en&#x60;, &#x60;en-GB&#x60;, &#x60;es&#x60;, &#x60;fi&#x60;, &#x60;fil&#x60;, &#x60;fr&#x60;, &#x60;fr-CA&#x60;, &#x60;hi&#x60;, &#x60;id&#x60;, &#x60;it&#x60;, &#x60;ja&#x60;, &#x60;ko&#x60;, &#x60;ms&#x60;, &#x60;nl&#x60;, &#x60;nb&#x60;, &#x60;pl&#x60;, &#x60;pt&#x60;, &#x60;pt-BR&#x60;, &#x60;ro&#x60;, &#x60;ru&#x60;, &#x60;sv&#x60;, &#x60;tr&#x60;, &#x60;zh-Hans&#x60;, &#x60;zh-HK&#x60;, &#x60;zh-TW&#x60;.  Precedence (highest first): this &#x60;X-Flat-Locale&#x60; header, the authenticated user\&#39;s account locale, the &#x60;Accept-Language&#x60; header, then &#x60;en&#x60;.  | [Optional] [Defaults to `undefined`] |

### Return type

[**OmrCapabilities**](OmrCapabilities.md)

### Authorization

[OAuth2 accessCode](../README.md#OAuth2-accessCode)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Capabilities |  -  |
| **0** | Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## getOmrJob

> OmrJob getOmrJob(job, wait, xFlatLocale)

Get an OMR job

Get the current state of an OMR job. This is the primary polling endpoint. Pass &#x60;wait&#x60; to long-poll until the state changes. 

### Example

```ts
import {
  Configuration,
  OMRApi,
} from 'flat-api';
import type { GetOmrJobRequest } from 'flat-api';

async function example() {
  console.log("🚀 Testing flat-api SDK...");
  const config = new Configuration({ 
    // To configure OAuth2 access token for authorization: OAuth2 accessCode
    accessToken: "YOUR ACCESS TOKEN",
  });
  const api = new OMRApi(config);

  const body = {
    // string | Unique identifier of the OMR job
    job: job_example,
    // number | Long-poll up to this many seconds for a state change before returning. (optional)
    wait: 56,
    // string | Preferred locale for localized content in the response (translated error messages, emails, etc.).  Accepts any IETF language tag. The API best-matches the value to a supported locale and never rejects an unknown one (it falls back to the closest match, then to `en`).  Supported normalized locales: `da`, `de`, `en`, `en-GB`, `es`, `fi`, `fil`, `fr`, `fr-CA`, `hi`, `id`, `it`, `ja`, `ko`, `ms`, `nl`, `nb`, `pl`, `pt`, `pt-BR`, `ro`, `ru`, `sv`, `tr`, `zh-Hans`, `zh-HK`, `zh-TW`.  Precedence (highest first): this `X-Flat-Locale` header, the authenticated user\'s account locale, the `Accept-Language` header, then `en`.  (optional)
    xFlatLocale: fr,
  } satisfies GetOmrJobRequest;

  try {
    const data = await api.getOmrJob(body);
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
| **job** | `string` | Unique identifier of the OMR job | [Defaults to `undefined`] |
| **wait** | `number` | Long-poll up to this many seconds for a state change before returning. | [Optional] [Defaults to `undefined`] |
| **xFlatLocale** | `string` | Preferred locale for localized content in the response (translated error messages, emails, etc.).  Accepts any IETF language tag. The API best-matches the value to a supported locale and never rejects an unknown one (it falls back to the closest match, then to &#x60;en&#x60;).  Supported normalized locales: &#x60;da&#x60;, &#x60;de&#x60;, &#x60;en&#x60;, &#x60;en-GB&#x60;, &#x60;es&#x60;, &#x60;fi&#x60;, &#x60;fil&#x60;, &#x60;fr&#x60;, &#x60;fr-CA&#x60;, &#x60;hi&#x60;, &#x60;id&#x60;, &#x60;it&#x60;, &#x60;ja&#x60;, &#x60;ko&#x60;, &#x60;ms&#x60;, &#x60;nl&#x60;, &#x60;nb&#x60;, &#x60;pl&#x60;, &#x60;pt&#x60;, &#x60;pt-BR&#x60;, &#x60;ro&#x60;, &#x60;ru&#x60;, &#x60;sv&#x60;, &#x60;tr&#x60;, &#x60;zh-Hans&#x60;, &#x60;zh-HK&#x60;, &#x60;zh-TW&#x60;.  Precedence (highest first): this &#x60;X-Flat-Locale&#x60; header, the authenticated user\&#39;s account locale, the &#x60;Accept-Language&#x60; header, then &#x60;en&#x60;.  | [Optional] [Defaults to `undefined`] |

### Return type

[**OmrJob**](OmrJob.md)

### Authorization

[OAuth2 accessCode](../README.md#OAuth2-accessCode)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Job state |  -  |
| **404** | Job not found |  -  |
| **0** | Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## getOmrJobExport

> Blob getOmrJobExport(job, format, xFlatLocale)

Download the finalized result

Stream the finalized result in the requested format. Available once the job is &#x60;done&#x60;. For &#x60;output: musicxml&#x60; jobs this is the primary way to retrieve the result; no library score is created. 

### Example

```ts
import {
  Configuration,
  OMRApi,
} from 'flat-api';
import type { GetOmrJobExportRequest } from 'flat-api';

async function example() {
  console.log("🚀 Testing flat-api SDK...");
  const config = new Configuration({ 
    // To configure OAuth2 access token for authorization: OAuth2 accessCode
    accessToken: "YOUR ACCESS TOKEN",
  });
  const api = new OMRApi(config);

  const body = {
    // string | Unique identifier of the OMR job
    job: job_example,
    // 'musicxml' | 'mxl' | 'midi' | 'thumbnail.png' | Export format. New formats may be added over time; request what your client supports.  * `musicxml`: Uncompressed MusicXML (plain text `.xml`, `application/vnd.recordare.musicxml+xml`). * `mxl`: Compressed MusicXML (zip archive `.mxl`, `application/vnd.recordare.musicxml`), the same notation as `musicxml` but smaller to download. * `midi`: Standard MIDI file (`.mid`, `audio/midi`). * `thumbnail.png`: PNG preview of the first page (`image/png`). 
    format: format_example,
    // string | Preferred locale for localized content in the response (translated error messages, emails, etc.).  Accepts any IETF language tag. The API best-matches the value to a supported locale and never rejects an unknown one (it falls back to the closest match, then to `en`).  Supported normalized locales: `da`, `de`, `en`, `en-GB`, `es`, `fi`, `fil`, `fr`, `fr-CA`, `hi`, `id`, `it`, `ja`, `ko`, `ms`, `nl`, `nb`, `pl`, `pt`, `pt-BR`, `ro`, `ru`, `sv`, `tr`, `zh-Hans`, `zh-HK`, `zh-TW`.  Precedence (highest first): this `X-Flat-Locale` header, the authenticated user\'s account locale, the `Accept-Language` header, then `en`.  (optional)
    xFlatLocale: fr,
  } satisfies GetOmrJobExportRequest;

  try {
    const data = await api.getOmrJobExport(body);
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
| **job** | `string` | Unique identifier of the OMR job | [Defaults to `undefined`] |
| **format** | `musicxml`, `mxl`, `midi`, `thumbnail.png` | Export format. New formats may be added over time; request what your client supports.  * &#x60;musicxml&#x60;: Uncompressed MusicXML (plain text &#x60;.xml&#x60;, &#x60;application/vnd.recordare.musicxml+xml&#x60;). * &#x60;mxl&#x60;: Compressed MusicXML (zip archive &#x60;.mxl&#x60;, &#x60;application/vnd.recordare.musicxml&#x60;), the same notation as &#x60;musicxml&#x60; but smaller to download. * &#x60;midi&#x60;: Standard MIDI file (&#x60;.mid&#x60;, &#x60;audio/midi&#x60;). * &#x60;thumbnail.png&#x60;: PNG preview of the first page (&#x60;image/png&#x60;).  | [Defaults to `undefined`] [Enum: musicxml, mxl, midi, thumbnail.png] |
| **xFlatLocale** | `string` | Preferred locale for localized content in the response (translated error messages, emails, etc.).  Accepts any IETF language tag. The API best-matches the value to a supported locale and never rejects an unknown one (it falls back to the closest match, then to &#x60;en&#x60;).  Supported normalized locales: &#x60;da&#x60;, &#x60;de&#x60;, &#x60;en&#x60;, &#x60;en-GB&#x60;, &#x60;es&#x60;, &#x60;fi&#x60;, &#x60;fil&#x60;, &#x60;fr&#x60;, &#x60;fr-CA&#x60;, &#x60;hi&#x60;, &#x60;id&#x60;, &#x60;it&#x60;, &#x60;ja&#x60;, &#x60;ko&#x60;, &#x60;ms&#x60;, &#x60;nl&#x60;, &#x60;nb&#x60;, &#x60;pl&#x60;, &#x60;pt&#x60;, &#x60;pt-BR&#x60;, &#x60;ro&#x60;, &#x60;ru&#x60;, &#x60;sv&#x60;, &#x60;tr&#x60;, &#x60;zh-Hans&#x60;, &#x60;zh-HK&#x60;, &#x60;zh-TW&#x60;.  Precedence (highest first): this &#x60;X-Flat-Locale&#x60; header, the authenticated user\&#39;s account locale, the &#x60;Accept-Language&#x60; header, then &#x60;en&#x60;.  | [Optional] [Defaults to `undefined`] |

### Return type

**Blob**

### Authorization

[OAuth2 accessCode](../README.md#OAuth2-accessCode)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/octet-stream`, `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Exported file (content type depends on the requested format) |  * Content-Disposition - Attachment disposition carrying the recommended filename, derived from the score\&#39;s resolved work title (RFC 5987 encoded for non-ASCII titles). Clients should use this filename when saving the download. <br>  |
| **404** | Format not available for this job |  -  |
| **409** | Job is not finished yet (&#x60;OMR_JOB_NOT_DONE&#x60;), or its files have been erased by the data retention policy (&#x60;OMR_JOB_EXPIRED&#x60;).  |  -  |
| **0** | Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## getOmrJobFile

> Blob getOmrJobFile(job, index, xFlatLocale)

Get an input page image

Fetch one of the job\&#39;s input files (a page image or PDF) by index, for the review UI.  Once data retention has erased the job, this returns 409 &#x60;OMR_JOB_EXPIRED&#x60;. Read &#x60;retention.expiredDate&#x60; on the job to tell that case apart before requesting a file. 

### Example

```ts
import {
  Configuration,
  OMRApi,
} from 'flat-api';
import type { GetOmrJobFileRequest } from 'flat-api';

async function example() {
  console.log("🚀 Testing flat-api SDK...");
  const config = new Configuration({ 
    // To configure OAuth2 access token for authorization: OAuth2 accessCode
    accessToken: "YOUR ACCESS TOKEN",
  });
  const api = new OMRApi(config);

  const body = {
    // string | Unique identifier of the OMR job
    job: job_example,
    // number | 0-based index of the input file (page) to fetch.
    index: 56,
    // string | Preferred locale for localized content in the response (translated error messages, emails, etc.).  Accepts any IETF language tag. The API best-matches the value to a supported locale and never rejects an unknown one (it falls back to the closest match, then to `en`).  Supported normalized locales: `da`, `de`, `en`, `en-GB`, `es`, `fi`, `fil`, `fr`, `fr-CA`, `hi`, `id`, `it`, `ja`, `ko`, `ms`, `nl`, `nb`, `pl`, `pt`, `pt-BR`, `ro`, `ru`, `sv`, `tr`, `zh-Hans`, `zh-HK`, `zh-TW`.  Precedence (highest first): this `X-Flat-Locale` header, the authenticated user\'s account locale, the `Accept-Language` header, then `en`.  (optional)
    xFlatLocale: fr,
  } satisfies GetOmrJobFileRequest;

  try {
    const data = await api.getOmrJobFile(body);
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
| **job** | `string` | Unique identifier of the OMR job | [Defaults to `undefined`] |
| **index** | `number` | 0-based index of the input file (page) to fetch. | [Defaults to `undefined`] |
| **xFlatLocale** | `string` | Preferred locale for localized content in the response (translated error messages, emails, etc.).  Accepts any IETF language tag. The API best-matches the value to a supported locale and never rejects an unknown one (it falls back to the closest match, then to &#x60;en&#x60;).  Supported normalized locales: &#x60;da&#x60;, &#x60;de&#x60;, &#x60;en&#x60;, &#x60;en-GB&#x60;, &#x60;es&#x60;, &#x60;fi&#x60;, &#x60;fil&#x60;, &#x60;fr&#x60;, &#x60;fr-CA&#x60;, &#x60;hi&#x60;, &#x60;id&#x60;, &#x60;it&#x60;, &#x60;ja&#x60;, &#x60;ko&#x60;, &#x60;ms&#x60;, &#x60;nl&#x60;, &#x60;nb&#x60;, &#x60;pl&#x60;, &#x60;pt&#x60;, &#x60;pt-BR&#x60;, &#x60;ro&#x60;, &#x60;ru&#x60;, &#x60;sv&#x60;, &#x60;tr&#x60;, &#x60;zh-Hans&#x60;, &#x60;zh-HK&#x60;, &#x60;zh-TW&#x60;.  Precedence (highest first): this &#x60;X-Flat-Locale&#x60; header, the authenticated user\&#39;s account locale, the &#x60;Accept-Language&#x60; header, then &#x60;en&#x60;.  | [Optional] [Defaults to `undefined`] |

### Return type

**Blob**

### Authorization

[OAuth2 accessCode](../README.md#OAuth2-accessCode)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `image/jpeg`, `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Page image |  -  |
| **404** | Not found |  -  |
| **409** | The job\&#39;s files have been erased by the data retention policy |  -  |
| **0** | Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## listBillingCreditsHistory

> Array&lt;CreditTransaction&gt; listBillingCreditsHistory(limit, next, previous)

List credit history

The credit ledger of the authenticated account, sorted by creation date descending (most recent entry first).  Every entry that moved the balance is listed: the deductions taken when an import runs, and the top-ups added by a credit pack.  Reversing a deduction does not add an entry, it flips the original one\&#39;s &#x60;state&#x60; to &#x60;canceled&#x60;. Canceled entries stay in the list, so an import that was charged and then failed still shows its deduction rather than disappearing. Read &#x60;state&#x60; to tell the two apart, and sum only &#x60;active&#x60; entries. A refund can additionally add a positive entry when cancelling alone could not restore the full cost, for instance because the plan\&#39;s allowance has since reset.  The current balance is not computed from this list: read it from &#x60;getOmrCapabilities&#x60;. 

### Example

```ts
import {
  Configuration,
  OMRApi,
} from 'flat-api';
import type { ListBillingCreditsHistoryRequest } from 'flat-api';

async function example() {
  console.log("🚀 Testing flat-api SDK...");
  const config = new Configuration({ 
    // To configure OAuth2 access token for authorization: OAuth2 accessCode
    accessToken: "YOUR ACCESS TOKEN",
  });
  const api = new OMRApi(config);

  const body = {
    // number | This is the maximum number of objects that may be returned (optional)
    limit: 56,
    // string | An opaque string cursor to fetch the next page of data. The paginated API URLs are returned in the `Link` header when requesting the API. These URLs will contain a `next` and `previous` cursor based on the available data.  (optional)
    next: next_example,
    // string | An opaque string cursor to fetch the previous page of data. The paginated API URLs are returned in the `Link` header when requesting the API. These URLs will contain a `next` and `previous` cursor based on the available data.  (optional)
    previous: previous_example,
  } satisfies ListBillingCreditsHistoryRequest;

  try {
    const data = await api.listBillingCreditsHistory(body);
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
| **limit** | `number` | This is the maximum number of objects that may be returned | [Optional] [Defaults to `50`] |
| **next** | `string` | An opaque string cursor to fetch the next page of data. The paginated API URLs are returned in the &#x60;Link&#x60; header when requesting the API. These URLs will contain a &#x60;next&#x60; and &#x60;previous&#x60; cursor based on the available data.  | [Optional] [Defaults to `undefined`] |
| **previous** | `string` | An opaque string cursor to fetch the previous page of data. The paginated API URLs are returned in the &#x60;Link&#x60; header when requesting the API. These URLs will contain a &#x60;next&#x60; and &#x60;previous&#x60; cursor based on the available data.  | [Optional] [Defaults to `undefined`] |

### Return type

[**Array&lt;CreditTransaction&gt;**](CreditTransaction.md)

### Authorization

[OAuth2 accessCode](../README.md#OAuth2-accessCode)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | List of credit transactions |  * Link - Pagination links (next, previous) <br>  |
| **0** | Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## listOmrJobs

> Array&lt;OmrJob&gt; listOmrJobs(status, expired, limit, next, previous, xFlatLocale)

List OMR jobs

List the caller\&#39;s OMR jobs, for resuming work or cleaning up abandoned drafts.

### Example

```ts
import {
  Configuration,
  OMRApi,
} from 'flat-api';
import type { ListOmrJobsRequest } from 'flat-api';

async function example() {
  console.log("🚀 Testing flat-api SDK...");
  const config = new Configuration({ 
    // To configure OAuth2 access token for authorization: OAuth2 accessCode
    accessToken: "YOUR ACCESS TOKEN",
  });
  const api = new OMRApi(config);

  const body = {
    // OmrJobStatus | Filter jobs by status (optional)
    status: ...,
    // boolean | Filter by data-retention state, independently of `status`.  * `true`: only jobs whose files have been erased. * `false`: only jobs that still hold their files.  Omit to get both. A job keeps the `status` it finished with after erasure, so this is the only way to tell the two apart.  (optional)
    expired: true,
    // number | This is the maximum number of objects that may be returned (optional)
    limit: 56,
    // string | An opaque string cursor to fetch the next page of data. The paginated API URLs are returned in the `Link` header when requesting the API. These URLs will contain a `next` and `previous` cursor based on the available data.  (optional)
    next: next_example,
    // string | An opaque string cursor to fetch the previous page of data. The paginated API URLs are returned in the `Link` header when requesting the API. These URLs will contain a `next` and `previous` cursor based on the available data.  (optional)
    previous: previous_example,
    // string | Preferred locale for localized content in the response (translated error messages, emails, etc.).  Accepts any IETF language tag. The API best-matches the value to a supported locale and never rejects an unknown one (it falls back to the closest match, then to `en`).  Supported normalized locales: `da`, `de`, `en`, `en-GB`, `es`, `fi`, `fil`, `fr`, `fr-CA`, `hi`, `id`, `it`, `ja`, `ko`, `ms`, `nl`, `nb`, `pl`, `pt`, `pt-BR`, `ro`, `ru`, `sv`, `tr`, `zh-Hans`, `zh-HK`, `zh-TW`.  Precedence (highest first): this `X-Flat-Locale` header, the authenticated user\'s account locale, the `Accept-Language` header, then `en`.  (optional)
    xFlatLocale: fr,
  } satisfies ListOmrJobsRequest;

  try {
    const data = await api.listOmrJobs(body);
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
| **status** | `OmrJobStatus` | Filter jobs by status | [Optional] [Defaults to `undefined`] [Enum: draft, processing, awaitingInput, done, error, canceled] |
| **expired** | `boolean` | Filter by data-retention state, independently of &#x60;status&#x60;.  * &#x60;true&#x60;: only jobs whose files have been erased. * &#x60;false&#x60;: only jobs that still hold their files.  Omit to get both. A job keeps the &#x60;status&#x60; it finished with after erasure, so this is the only way to tell the two apart.  | [Optional] [Defaults to `undefined`] |
| **limit** | `number` | This is the maximum number of objects that may be returned | [Optional] [Defaults to `50`] |
| **next** | `string` | An opaque string cursor to fetch the next page of data. The paginated API URLs are returned in the &#x60;Link&#x60; header when requesting the API. These URLs will contain a &#x60;next&#x60; and &#x60;previous&#x60; cursor based on the available data.  | [Optional] [Defaults to `undefined`] |
| **previous** | `string` | An opaque string cursor to fetch the previous page of data. The paginated API URLs are returned in the &#x60;Link&#x60; header when requesting the API. These URLs will contain a &#x60;next&#x60; and &#x60;previous&#x60; cursor based on the available data.  | [Optional] [Defaults to `undefined`] |
| **xFlatLocale** | `string` | Preferred locale for localized content in the response (translated error messages, emails, etc.).  Accepts any IETF language tag. The API best-matches the value to a supported locale and never rejects an unknown one (it falls back to the closest match, then to &#x60;en&#x60;).  Supported normalized locales: &#x60;da&#x60;, &#x60;de&#x60;, &#x60;en&#x60;, &#x60;en-GB&#x60;, &#x60;es&#x60;, &#x60;fi&#x60;, &#x60;fil&#x60;, &#x60;fr&#x60;, &#x60;fr-CA&#x60;, &#x60;hi&#x60;, &#x60;id&#x60;, &#x60;it&#x60;, &#x60;ja&#x60;, &#x60;ko&#x60;, &#x60;ms&#x60;, &#x60;nl&#x60;, &#x60;nb&#x60;, &#x60;pl&#x60;, &#x60;pt&#x60;, &#x60;pt-BR&#x60;, &#x60;ro&#x60;, &#x60;ru&#x60;, &#x60;sv&#x60;, &#x60;tr&#x60;, &#x60;zh-Hans&#x60;, &#x60;zh-HK&#x60;, &#x60;zh-TW&#x60;.  Precedence (highest first): this &#x60;X-Flat-Locale&#x60; header, the authenticated user\&#39;s account locale, the &#x60;Accept-Language&#x60; header, then &#x60;en&#x60;.  | [Optional] [Defaults to `undefined`] |

### Return type

[**Array&lt;OmrJob&gt;**](OmrJob.md)

### Authorization

[OAuth2 accessCode](../README.md#OAuth2-accessCode)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | List of OMR jobs |  * Link - Pagination links (next, previous) <br>  |
| **0** | Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## startOmrJob

> OmrJob startOmrJob(job, xFlatLocale)

Start an OMR job

Validate the attached files, run the permission, quota and credit checks, then queue the job for processing.

### Example

```ts
import {
  Configuration,
  OMRApi,
} from 'flat-api';
import type { StartOmrJobRequest } from 'flat-api';

async function example() {
  console.log("🚀 Testing flat-api SDK...");
  const config = new Configuration({ 
    // To configure OAuth2 access token for authorization: OAuth2 accessCode
    accessToken: "YOUR ACCESS TOKEN",
  });
  const api = new OMRApi(config);

  const body = {
    // string | Unique identifier of the OMR job
    job: job_example,
    // string | Preferred locale for localized content in the response (translated error messages, emails, etc.).  Accepts any IETF language tag. The API best-matches the value to a supported locale and never rejects an unknown one (it falls back to the closest match, then to `en`).  Supported normalized locales: `da`, `de`, `en`, `en-GB`, `es`, `fi`, `fil`, `fr`, `fr-CA`, `hi`, `id`, `it`, `ja`, `ko`, `ms`, `nl`, `nb`, `pl`, `pt`, `pt-BR`, `ro`, `ru`, `sv`, `tr`, `zh-Hans`, `zh-HK`, `zh-TW`.  Precedence (highest first): this `X-Flat-Locale` header, the authenticated user\'s account locale, the `Accept-Language` header, then `en`.  (optional)
    xFlatLocale: fr,
  } satisfies StartOmrJobRequest;

  try {
    const data = await api.startOmrJob(body);
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
| **job** | `string` | Unique identifier of the OMR job | [Defaults to `undefined`] |
| **xFlatLocale** | `string` | Preferred locale for localized content in the response (translated error messages, emails, etc.).  Accepts any IETF language tag. The API best-matches the value to a supported locale and never rejects an unknown one (it falls back to the closest match, then to &#x60;en&#x60;).  Supported normalized locales: &#x60;da&#x60;, &#x60;de&#x60;, &#x60;en&#x60;, &#x60;en-GB&#x60;, &#x60;es&#x60;, &#x60;fi&#x60;, &#x60;fil&#x60;, &#x60;fr&#x60;, &#x60;fr-CA&#x60;, &#x60;hi&#x60;, &#x60;id&#x60;, &#x60;it&#x60;, &#x60;ja&#x60;, &#x60;ko&#x60;, &#x60;ms&#x60;, &#x60;nl&#x60;, &#x60;nb&#x60;, &#x60;pl&#x60;, &#x60;pt&#x60;, &#x60;pt-BR&#x60;, &#x60;ro&#x60;, &#x60;ru&#x60;, &#x60;sv&#x60;, &#x60;tr&#x60;, &#x60;zh-Hans&#x60;, &#x60;zh-HK&#x60;, &#x60;zh-TW&#x60;.  Precedence (highest first): this &#x60;X-Flat-Locale&#x60; header, the authenticated user\&#39;s account locale, the &#x60;Accept-Language&#x60; header, then &#x60;en&#x60;.  | [Optional] [Defaults to `undefined`] |

### Return type

[**OmrJob**](OmrJob.md)

### Authorization

[OAuth2 accessCode](../README.md#OAuth2-accessCode)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **202** | Processing started |  -  |
| **400** | No files attached |  -  |
| **402** | Insufficient credits or quota |  -  |
| **0** | Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## submitOmrJobStep

> OmrJob submitOmrJobStep(job, step, body, xFlatLocale)

Submit an interactive step

Resolve the step the job is currently awaiting and resume the pipeline. The request body shape depends on &#x60;step&#x60; (a &#x60;oneOf&#x60; discriminated by the step name). 

### Example

```ts
import {
  Configuration,
  OMRApi,
} from 'flat-api';
import type { SubmitOmrJobStepRequest } from 'flat-api';

async function example() {
  console.log("🚀 Testing flat-api SDK...");
  const config = new Configuration({ 
    // To configure OAuth2 access token for authorization: OAuth2 accessCode
    accessToken: "YOUR ACCESS TOKEN",
  });
  const api = new OMRApi(config);

  const body = {
    // string | Unique identifier of the OMR job
    job: job_example,
    // OmrStepName | The pending step being submitted
    step: ...,
    // OmrDetailsSubmission
    body: ...,
    // string | Preferred locale for localized content in the response (translated error messages, emails, etc.).  Accepts any IETF language tag. The API best-matches the value to a supported locale and never rejects an unknown one (it falls back to the closest match, then to `en`).  Supported normalized locales: `da`, `de`, `en`, `en-GB`, `es`, `fi`, `fil`, `fr`, `fr-CA`, `hi`, `id`, `it`, `ja`, `ko`, `ms`, `nl`, `nb`, `pl`, `pt`, `pt-BR`, `ro`, `ru`, `sv`, `tr`, `zh-Hans`, `zh-HK`, `zh-TW`.  Precedence (highest first): this `X-Flat-Locale` header, the authenticated user\'s account locale, the `Accept-Language` header, then `en`.  (optional)
    xFlatLocale: fr,
  } satisfies SubmitOmrJobStepRequest;

  try {
    const data = await api.submitOmrJobStep(body);
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
| **job** | `string` | Unique identifier of the OMR job | [Defaults to `undefined`] |
| **step** | `OmrStepName` | The pending step being submitted | [Defaults to `undefined`] [Enum: details] |
| **body** | `OmrDetailsSubmission` |  | |
| **xFlatLocale** | `string` | Preferred locale for localized content in the response (translated error messages, emails, etc.).  Accepts any IETF language tag. The API best-matches the value to a supported locale and never rejects an unknown one (it falls back to the closest match, then to &#x60;en&#x60;).  Supported normalized locales: &#x60;da&#x60;, &#x60;de&#x60;, &#x60;en&#x60;, &#x60;en-GB&#x60;, &#x60;es&#x60;, &#x60;fi&#x60;, &#x60;fil&#x60;, &#x60;fr&#x60;, &#x60;fr-CA&#x60;, &#x60;hi&#x60;, &#x60;id&#x60;, &#x60;it&#x60;, &#x60;ja&#x60;, &#x60;ko&#x60;, &#x60;ms&#x60;, &#x60;nl&#x60;, &#x60;nb&#x60;, &#x60;pl&#x60;, &#x60;pt&#x60;, &#x60;pt-BR&#x60;, &#x60;ro&#x60;, &#x60;ru&#x60;, &#x60;sv&#x60;, &#x60;tr&#x60;, &#x60;zh-Hans&#x60;, &#x60;zh-HK&#x60;, &#x60;zh-TW&#x60;.  Precedence (highest first): this &#x60;X-Flat-Locale&#x60; header, the authenticated user\&#39;s account locale, the &#x60;Accept-Language&#x60; header, then &#x60;en&#x60;.  | [Optional] [Defaults to `undefined`] |

### Return type

[**OmrJob**](OmrJob.md)

### Authorization

[OAuth2 accessCode](../README.md#OAuth2-accessCode)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **202** | Step accepted, processing resumed |  -  |
| **409** | Job is not awaiting this step |  -  |
| **0** | Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

