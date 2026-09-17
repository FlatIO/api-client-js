# OrganizationApi

All URIs are relative to *https://api.flat.io/v2*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**countOrgaUsers**](OrganizationApi.md#countorgausers) | **GET** /organizations/users/count | Count the organization users using the provided filters |
| [**createLtiConfiguration**](OrganizationApi.md#createlticonfiguration) | **POST** /organizations/lti/configurations | Create a new LTI configuration (1.1 or 1.3) |
| [**createLtiCredentials**](OrganizationApi.md#createlticredentials) | **POST** /organizations/lti/credentials | Create a new pair of LTI 1.1 credentials |
| [**createOrganizationInvitation**](OrganizationApi.md#createorganizationinvitation) | **POST** /organizations/invitations | Create a new invitation to join the organization |
| [**createOrganizationUser**](OrganizationApi.md#createorganizationuser) | **POST** /organizations/users | Create a new user account |
| [**createOrganizationUserAccessToken**](OrganizationApi.md#createorganizationuseraccesstoken) | **POST** /organizations/users/{user}/accessToken | Create a delegated API access token for an organization user |
| [**createOrganizationUserSigninLink**](OrganizationApi.md#createorganizationusersigninlink) | **POST** /organizations/users/{user}/signinLink | Create a sign in link for an organization user |
| [**deleteLtiConfiguration**](OrganizationApi.md#deletelticonfiguration) | **DELETE** /organizations/lti/configurations/{configuration} | Delete an LTI configuration |
| [**listLtiConfigurations**](OrganizationApi.md#listlticonfigurations) | **GET** /organizations/lti/configurations | List LTI configurations (1.1 and 1.3) |
| [**listLtiCredentials**](OrganizationApi.md#listlticredentials) | **GET** /organizations/lti/credentials | List LTI 1.x credentials |
| [**listOrganizationInvitations**](OrganizationApi.md#listorganizationinvitations) | **GET** /organizations/invitations | List the organization invitations |
| [**listOrganizationUsers**](OrganizationApi.md#listorganizationusers) | **GET** /organizations/users | List the organization users |
| [**removeOrganizationInvitation**](OrganizationApi.md#removeorganizationinvitation) | **DELETE** /organizations/invitations/{invitation} | Remove an organization invitation |
| [**removeOrganizationUser**](OrganizationApi.md#removeorganizationuser) | **DELETE** /organizations/users/{user} | Remove an account from Flat |
| [**revokeLtiCredentials**](OrganizationApi.md#revokelticredentials) | **DELETE** /organizations/lti/credentials/{credentials} | Revoke LTI 1.x credentials |
| [**updateLtiConfiguration**](OrganizationApi.md#updatelticonfiguration) | **PUT** /organizations/lti/configurations/{configuration} | Update an existing LTI configuration (edit 1.3; 1.1 not editable) |
| [**updateOrganizationUser**](OrganizationApi.md#updateorganizationuser) | **PUT** /organizations/users/{user} | Update account information |



## countOrgaUsers

> number countOrgaUsers(role, q, group, noActiveLicense, testAccounts)

Count the organization users using the provided filters

### Example

```ts
import {
  Configuration,
  OrganizationApi,
} from 'flat-api';
import type { CountOrgaUsersRequest } from 'flat-api';

async function example() {
  console.log("🚀 Testing flat-api SDK...");
  const config = new Configuration({ 
    // To configure OAuth2 access token for authorization: OAuth2 accessCode
    accessToken: "YOUR ACCESS TOKEN",
  });
  const api = new OrganizationApi(config);

  const body = {
    // Array<'user' | 'teacher' | 'admin' | 'accountAdmin'> | Filter users by role (optional)
    role: ...,
    // string | The query to search (optional)
    q: q_example,
    // Array<string> | Filter users by group (optional)
    group: ...,
    // boolean | Filter users who don\'t have an active license (optional)
    noActiveLicense: true,
    // 'exclude' | 'only' | Filter users based on test account status. Test accounts are student accounts created for testing purposes by teachers.  * `exclude`: Hide test accounts from results. * `only`: Show only test accounts.  When omitted, all users are returned.  (optional)
    testAccounts: testAccounts_example,
  } satisfies CountOrgaUsersRequest;

  try {
    const data = await api.countOrgaUsers(body);
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
| **role** | `user`, `teacher`, `admin`, `accountAdmin` | Filter users by role | [Optional] [Enum: user, teacher, admin, accountAdmin] |
| **q** | `string` | The query to search | [Optional] [Defaults to `undefined`] |
| **group** | `Array<string>` | Filter users by group | [Optional] |
| **noActiveLicense** | `boolean` | Filter users who don\&#39;t have an active license | [Optional] [Defaults to `undefined`] |
| **testAccounts** | `exclude`, `only` | Filter users based on test account status. Test accounts are student accounts created for testing purposes by teachers.  * &#x60;exclude&#x60;: Hide test accounts from results. * &#x60;only&#x60;: Show only test accounts.  When omitted, all users are returned.  | [Optional] [Defaults to `undefined`] [Enum: exclude, only] |

### Return type

**number**

### Authorization

[OAuth2 accessCode](../README.md#OAuth2-accessCode)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Number of users |  -  |
| **0** | Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## createLtiConfiguration

> LtiConfiguration createLtiConfiguration(ltiConfigurationCreate)

Create a new LTI configuration (1.1 or 1.3)

### Example

```ts
import {
  Configuration,
  OrganizationApi,
} from 'flat-api';
import type { CreateLtiConfigurationRequest } from 'flat-api';

async function example() {
  console.log("🚀 Testing flat-api SDK...");
  const config = new Configuration({ 
    // To configure OAuth2 access token for authorization: OAuth2 accessCode
    accessToken: "YOUR ACCESS TOKEN",
  });
  const api = new OrganizationApi(config);

  const body = {
    // LtiConfigurationCreate
    ltiConfigurationCreate: ...,
  } satisfies CreateLtiConfigurationRequest;

  try {
    const data = await api.createLtiConfiguration(body);
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
| **ltiConfigurationCreate** | [LtiConfigurationCreate](LtiConfigurationCreate.md) |  | |

### Return type

[**LtiConfiguration**](LtiConfiguration.md)

### Authorization

[OAuth2 accessCode](../README.md#OAuth2-accessCode)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | The created LTI configuration |  -  |
| **0** | Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## createLtiCredentials

> LtiCredentials createLtiCredentials(body)

Create a new pair of LTI 1.1 credentials

DEPRECATED. Use the unified endpoints under &#x60;/organizations/lti/configurations&#x60;. Note: Teachers may be restricted by the organization privacy setting &#x60;lti1p1AllowTeachersCredentials&#x60;.  Flat for Education is a Certified LTI Provider. You can use these API methods to automate the creation of LTI credentials. You can read more about our LTI implementation, supported components and LTI Endpoints in our [Developer Documentation](https://flat.io/developers/docs/lti/). 

### Example

```ts
import {
  Configuration,
  OrganizationApi,
} from 'flat-api';
import type { CreateLtiCredentialsRequest } from 'flat-api';

async function example() {
  console.log("🚀 Testing flat-api SDK...");
  const config = new Configuration({ 
    // To configure OAuth2 access token for authorization: OAuth2 accessCode
    accessToken: "YOUR ACCESS TOKEN",
  });
  const api = new OrganizationApi(config);

  const body = {
    // LtiCredentialsCreation
    body: ...,
  } satisfies CreateLtiCredentialsRequest;

  try {
    const data = await api.createLtiCredentials(body);
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
| **body** | [LtiCredentialsCreation](LtiCredentialsCreation.md) |  | |

### Return type

[**LtiCredentials**](LtiCredentials.md)

### Authorization

[OAuth2 accessCode](../README.md#OAuth2-accessCode)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | The LTI Credentials |  -  |
| **403** | Not admin of an organization |  -  |
| **0** | Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## createOrganizationInvitation

> OrganizationInvitation createOrganizationInvitation(body)

Create a new invitation to join the organization

This method creates and sends an invitation for teachers and admins.  Invitations can only be used by new Flat users or users who are not part of the organization yet.  If the email of the user is already associated to a user of your organization, the API will simply update the role of the existing user and won\&#39;t send an invitation. In this case, the property &#x60;usedBy&#x60; will be directly filled with the unique identifier of the corresponding user. 

### Example

```ts
import {
  Configuration,
  OrganizationApi,
} from 'flat-api';
import type { CreateOrganizationInvitationRequest } from 'flat-api';

async function example() {
  console.log("🚀 Testing flat-api SDK...");
  const config = new Configuration({ 
    // To configure OAuth2 access token for authorization: OAuth2 accessCode
    accessToken: "YOUR ACCESS TOKEN",
  });
  const api = new OrganizationApi(config);

  const body = {
    // OrganizationInvitationCreation
    body: ...,
  } satisfies CreateOrganizationInvitationRequest;

  try {
    const data = await api.createOrganizationInvitation(body);
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
| **body** | [OrganizationInvitationCreation](OrganizationInvitationCreation.md) |  | |

### Return type

[**OrganizationInvitation**](OrganizationInvitation.md)

### Authorization

[OAuth2 accessCode](../README.md#OAuth2-accessCode)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | New invitation created |  -  |
| **0** | Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## createOrganizationUser

> UserDetailsAdmin createOrganizationUser(body)

Create a new user account

### Example

```ts
import {
  Configuration,
  OrganizationApi,
} from 'flat-api';
import type { CreateOrganizationUserRequest } from 'flat-api';

async function example() {
  console.log("🚀 Testing flat-api SDK...");
  const config = new Configuration({ 
    // To configure OAuth2 access token for authorization: OAuth2 accessCode
    accessToken: "YOUR ACCESS TOKEN",
  });
  const api = new OrganizationApi(config);

  const body = {
    // UserCreation
    body: ...,
  } satisfies CreateOrganizationUserRequest;

  try {
    const data = await api.createOrganizationUser(body);
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
| **body** | [UserCreation](UserCreation.md) |  | |

### Return type

[**UserDetailsAdmin**](UserDetailsAdmin.md)

### Authorization

[OAuth2 accessCode](../README.md#OAuth2-accessCode)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | New user created |  -  |
| **0** | Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## createOrganizationUserAccessToken

> ApiAccessToken createOrganizationUserAccessToken(user, organizationUserAccessTokenCreation)

Create a delegated API access token for an organization user

This operation will create an API access token for a chosen organization user. This token will be valid for a limited time and can be used to access the API as the organization user. 

### Example

```ts
import {
  Configuration,
  OrganizationApi,
} from 'flat-api';
import type { CreateOrganizationUserAccessTokenRequest } from 'flat-api';

async function example() {
  console.log("🚀 Testing flat-api SDK...");
  const config = new Configuration({ 
    // To configure OAuth2 access token for authorization: OAuth2 accessCode
    accessToken: "YOUR ACCESS TOKEN",
  });
  const api = new OrganizationApi(config);

  const body = {
    // string | Unique identifier of the Flat account 
    user: user_example,
    // OrganizationUserAccessTokenCreation
    organizationUserAccessTokenCreation: ...,
  } satisfies CreateOrganizationUserAccessTokenRequest;

  try {
    const data = await api.createOrganizationUserAccessToken(body);
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
| **user** | `string` | Unique identifier of the Flat account  | [Defaults to `undefined`] |
| **organizationUserAccessTokenCreation** | [OrganizationUserAccessTokenCreation](OrganizationUserAccessTokenCreation.md) |  | |

### Return type

[**ApiAccessToken**](ApiAccessToken.md)

### Authorization

[OAuth2 accessCode](../README.md#OAuth2-accessCode)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Created API access token |  -  |
| **0** | Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## createOrganizationUserSigninLink

> UserSigninLink createOrganizationUserSigninLink(user, userSigninLinkCreation)

Create a sign in link for an organization user

### Example

```ts
import {
  Configuration,
  OrganizationApi,
} from 'flat-api';
import type { CreateOrganizationUserSigninLinkRequest } from 'flat-api';

async function example() {
  console.log("🚀 Testing flat-api SDK...");
  const config = new Configuration({ 
    // To configure OAuth2 access token for authorization: OAuth2 accessCode
    accessToken: "YOUR ACCESS TOKEN",
  });
  const api = new OrganizationApi(config);

  const body = {
    // string | Unique identifier of the Flat account 
    user: user_example,
    // UserSigninLinkCreation
    userSigninLinkCreation: ...,
  } satisfies CreateOrganizationUserSigninLinkRequest;

  try {
    const data = await api.createOrganizationUserSigninLink(body);
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
| **user** | `string` | Unique identifier of the Flat account  | [Defaults to `undefined`] |
| **userSigninLinkCreation** | [UserSigninLinkCreation](UserSigninLinkCreation.md) |  | |

### Return type

[**UserSigninLink**](UserSigninLink.md)

### Authorization

[OAuth2 accessCode](../README.md#OAuth2-accessCode)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Sign in link |  -  |
| **0** | Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## deleteLtiConfiguration

> deleteLtiConfiguration(_configuration)

Delete an LTI configuration

### Example

```ts
import {
  Configuration,
  OrganizationApi,
} from 'flat-api';
import type { DeleteLtiConfigurationRequest } from 'flat-api';

async function example() {
  console.log("🚀 Testing flat-api SDK...");
  const config = new Configuration({ 
    // To configure OAuth2 access token for authorization: OAuth2 accessCode
    accessToken: "YOUR ACCESS TOKEN",
  });
  const api = new OrganizationApi(config);

  const body = {
    // string | Configuration unique identifier
    _configuration: _configuration_example,
  } satisfies DeleteLtiConfigurationRequest;

  try {
    const data = await api.deleteLtiConfiguration(body);
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
| **_configuration** | `string` | Configuration unique identifier | [Defaults to `undefined`] |

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
| **204** | Configuration deleted |  -  |
| **0** | Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## listLtiConfigurations

> Array&lt;LtiConfiguration&gt; listLtiConfigurations()

List LTI configurations (1.1 and 1.3)

### Example

```ts
import {
  Configuration,
  OrganizationApi,
} from 'flat-api';
import type { ListLtiConfigurationsRequest } from 'flat-api';

async function example() {
  console.log("🚀 Testing flat-api SDK...");
  const config = new Configuration({ 
    // To configure OAuth2 access token for authorization: OAuth2 accessCode
    accessToken: "YOUR ACCESS TOKEN",
  });
  const api = new OrganizationApi(config);

  try {
    const data = await api.listLtiConfigurations();
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

[**Array&lt;LtiConfiguration&gt;**](LtiConfiguration.md)

### Authorization

[OAuth2 accessCode](../README.md#OAuth2-accessCode)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | The list of LTI configurations for the caller\&#39;s organization |  -  |
| **0** | Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## listLtiCredentials

> Array&lt;LtiCredentials&gt; listLtiCredentials()

List LTI 1.x credentials

DEPRECATED. Use the unified endpoints under &#x60;/organizations/lti/configurations&#x60;. Note: Teachers may be restricted by the organization privacy setting &#x60;lti1p1AllowTeachersCredentials&#x60;. 

### Example

```ts
import {
  Configuration,
  OrganizationApi,
} from 'flat-api';
import type { ListLtiCredentialsRequest } from 'flat-api';

async function example() {
  console.log("🚀 Testing flat-api SDK...");
  const config = new Configuration({ 
    // To configure OAuth2 access token for authorization: OAuth2 accessCode
    accessToken: "YOUR ACCESS TOKEN",
  });
  const api = new OrganizationApi(config);

  try {
    const data = await api.listLtiCredentials();
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

[**Array&lt;LtiCredentials&gt;**](LtiCredentials.md)

### Authorization

[OAuth2 accessCode](../README.md#OAuth2-accessCode)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | The list of LTI Credentials |  -  |
| **403** | Not admin of an organization |  -  |
| **0** | Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## listOrganizationInvitations

> Array&lt;OrganizationInvitation&gt; listOrganizationInvitations(role, limit, next, previous)

List the organization invitations

### Example

```ts
import {
  Configuration,
  OrganizationApi,
} from 'flat-api';
import type { ListOrganizationInvitationsRequest } from 'flat-api';

async function example() {
  console.log("🚀 Testing flat-api SDK...");
  const config = new Configuration({ 
    // To configure OAuth2 access token for authorization: OAuth2 accessCode
    accessToken: "YOUR ACCESS TOKEN",
  });
  const api = new OrganizationApi(config);

  const body = {
    // 'user' | 'teacher' | 'admin' | Filter users by role (optional)
    role: role_example,
    // number | This is the maximum number of objects that may be returned (optional)
    limit: 56,
    // string | An opaque string cursor to fetch the next page of data. The paginated API URLs are returned in the `Link` header when requesting the API. These URLs will contain a `next` and `previous` cursor based on the available data.  (optional)
    next: next_example,
    // string | An opaque string cursor to fetch the previous page of data. The paginated API URLs are returned in the `Link` header when requesting the API. These URLs will contain a `next` and `previous` cursor based on the available data.  (optional)
    previous: previous_example,
  } satisfies ListOrganizationInvitationsRequest;

  try {
    const data = await api.listOrganizationInvitations(body);
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
| **role** | `user`, `teacher`, `admin` | Filter users by role | [Optional] [Defaults to `undefined`] [Enum: user, teacher, admin] |
| **limit** | `number` | This is the maximum number of objects that may be returned | [Optional] [Defaults to `50`] |
| **next** | `string` | An opaque string cursor to fetch the next page of data. The paginated API URLs are returned in the &#x60;Link&#x60; header when requesting the API. These URLs will contain a &#x60;next&#x60; and &#x60;previous&#x60; cursor based on the available data.  | [Optional] [Defaults to `undefined`] |
| **previous** | `string` | An opaque string cursor to fetch the previous page of data. The paginated API URLs are returned in the &#x60;Link&#x60; header when requesting the API. These URLs will contain a &#x60;next&#x60; and &#x60;previous&#x60; cursor based on the available data.  | [Optional] [Defaults to `undefined`] |

### Return type

[**Array&lt;OrganizationInvitation&gt;**](OrganizationInvitation.md)

### Authorization

[OAuth2 accessCode](../README.md#OAuth2-accessCode)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | List of invitations |  -  |
| **0** | Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## listOrganizationUsers

> Array&lt;UserDetailsAdmin&gt; listOrganizationUsers(sort, direction, next, previous, role, q, group, noActiveLicense, testAccounts, licenseExpirationDate, onlyIds, limit)

List the organization users

### Example

```ts
import {
  Configuration,
  OrganizationApi,
} from 'flat-api';
import type { ListOrganizationUsersRequest } from 'flat-api';

async function example() {
  console.log("🚀 Testing flat-api SDK...");
  const config = new Configuration({ 
    // To configure OAuth2 access token for authorization: OAuth2 accessCode
    accessToken: "YOUR ACCESS TOKEN",
  });
  const api = new OrganizationApi(config);

  const body = {
    // 'creationDate' | 'firstname' | 'lastname' | 'username' | 'lastActivityDate' | 'licenseExpirationDate' | The order to sort the user list.  * `creationDate`: Order by account creation. * `firstname`, `lastname`, `username`: Order by the user identity. * `lastActivityDate`: Order by the last recorded activity. * `licenseExpirationDate`: Order by the expiration of the active license.  (optional)
    sort: sort_example,
    // 'asc' | 'desc' | Sort direction (optional)
    direction: direction_example,
    // string | An opaque string cursor to fetch the next page of data. The paginated API URLs are returned in the `Link` header when requesting the API. These URLs will contain a `next` and `previous` cursor based on the available data.  (optional)
    next: next_example,
    // string | An opaque string cursor to fetch the previous page of data. The paginated API URLs are returned in the `Link` header when requesting the API. These URLs will contain a `next` and `previous` cursor based on the available data.  (optional)
    previous: previous_example,
    // Array<'user' | 'teacher' | 'admin' | 'accountAdmin'> | Filter users by role (optional)
    role: ...,
    // string | The query to search (optional)
    q: q_example,
    // Array<string> | Filter users by group (optional)
    group: ...,
    // boolean | Filter users who don\'t have an active license (optional)
    noActiveLicense: true,
    // 'exclude' | 'only' | Filter users based on test account status. Test accounts are student accounts created for testing purposes by teachers.  * `exclude`: Hide test accounts from results. * `only`: Show only test accounts.  When omitted, all users are returned.  (optional)
    testAccounts: testAccounts_example,
    // Array<string> | Filter users by license expiration date or `active` / `notActive` (optional)
    licenseExpirationDate: ...,
    // boolean | Return only user ids (optional)
    onlyIds: true,
    // number | This is the maximum number of objects that may be returned (optional)
    limit: 56,
  } satisfies ListOrganizationUsersRequest;

  try {
    const data = await api.listOrganizationUsers(body);
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
| **sort** | `creationDate`, `firstname`, `lastname`, `username`, `lastActivityDate`, `licenseExpirationDate` | The order to sort the user list.  * &#x60;creationDate&#x60;: Order by account creation. * &#x60;firstname&#x60;, &#x60;lastname&#x60;, &#x60;username&#x60;: Order by the user identity. * &#x60;lastActivityDate&#x60;: Order by the last recorded activity. * &#x60;licenseExpirationDate&#x60;: Order by the expiration of the active license.  | [Optional] [Defaults to `undefined`] [Enum: creationDate, firstname, lastname, username, lastActivityDate, licenseExpirationDate] |
| **direction** | `asc`, `desc` | Sort direction | [Optional] [Defaults to `undefined`] [Enum: asc, desc] |
| **next** | `string` | An opaque string cursor to fetch the next page of data. The paginated API URLs are returned in the &#x60;Link&#x60; header when requesting the API. These URLs will contain a &#x60;next&#x60; and &#x60;previous&#x60; cursor based on the available data.  | [Optional] [Defaults to `undefined`] |
| **previous** | `string` | An opaque string cursor to fetch the previous page of data. The paginated API URLs are returned in the &#x60;Link&#x60; header when requesting the API. These URLs will contain a &#x60;next&#x60; and &#x60;previous&#x60; cursor based on the available data.  | [Optional] [Defaults to `undefined`] |
| **role** | `user`, `teacher`, `admin`, `accountAdmin` | Filter users by role | [Optional] [Enum: user, teacher, admin, accountAdmin] |
| **q** | `string` | The query to search | [Optional] [Defaults to `undefined`] |
| **group** | `Array<string>` | Filter users by group | [Optional] |
| **noActiveLicense** | `boolean` | Filter users who don\&#39;t have an active license | [Optional] [Defaults to `undefined`] |
| **testAccounts** | `exclude`, `only` | Filter users based on test account status. Test accounts are student accounts created for testing purposes by teachers.  * &#x60;exclude&#x60;: Hide test accounts from results. * &#x60;only&#x60;: Show only test accounts.  When omitted, all users are returned.  | [Optional] [Defaults to `undefined`] [Enum: exclude, only] |
| **licenseExpirationDate** | `Array<string>` | Filter users by license expiration date or &#x60;active&#x60; / &#x60;notActive&#x60; | [Optional] |
| **onlyIds** | `boolean` | Return only user ids | [Optional] [Defaults to `undefined`] |
| **limit** | `number` | This is the maximum number of objects that may be returned | [Optional] [Defaults to `25`] |

### Return type

[**Array&lt;UserDetailsAdmin&gt;**](UserDetailsAdmin.md)

### Authorization

[OAuth2 accessCode](../README.md#OAuth2-accessCode)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | List of users |  -  |
| **0** | Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## removeOrganizationInvitation

> removeOrganizationInvitation(invitation)

Remove an organization invitation

### Example

```ts
import {
  Configuration,
  OrganizationApi,
} from 'flat-api';
import type { RemoveOrganizationInvitationRequest } from 'flat-api';

async function example() {
  console.log("🚀 Testing flat-api SDK...");
  const config = new Configuration({ 
    // To configure OAuth2 access token for authorization: OAuth2 accessCode
    accessToken: "YOUR ACCESS TOKEN",
  });
  const api = new OrganizationApi(config);

  const body = {
    // string | Unique identifier of the invitation
    invitation: invitation_example,
  } satisfies RemoveOrganizationInvitationRequest;

  try {
    const data = await api.removeOrganizationInvitation(body);
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
| **invitation** | `string` | Unique identifier of the invitation | [Defaults to `undefined`] |

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
| **204** | The invitation has been removed |  -  |
| **0** | Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## removeOrganizationUser

> removeOrganizationUser(user, convertToIndividual)

Remove an account from Flat

This operation removes an account from Flat and its data, including: * The music scores created by this user (documents, history, comments, collaboration information) * Education related data (assignments and classroom information) 

### Example

```ts
import {
  Configuration,
  OrganizationApi,
} from 'flat-api';
import type { RemoveOrganizationUserRequest } from 'flat-api';

async function example() {
  console.log("🚀 Testing flat-api SDK...");
  const config = new Configuration({ 
    // To configure OAuth2 access token for authorization: OAuth2 accessCode
    accessToken: "YOUR ACCESS TOKEN",
  });
  const api = new OrganizationApi(config);

  const body = {
    // string | Unique identifier of the Flat account 
    user: user_example,
    // boolean | If `true`, the account will be only removed from the organization and converted into an individual account on our public website, https://flat.io. This operation will remove the education-related data from the account. Before performing this operation, you need to be sure that the user is at least 13 years old and has read and agreed to the Individual Terms of Service of Flat available on https://flat.io/legal.  (optional)
    convertToIndividual: true,
  } satisfies RemoveOrganizationUserRequest;

  try {
    const data = await api.removeOrganizationUser(body);
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
| **user** | `string` | Unique identifier of the Flat account  | [Defaults to `undefined`] |
| **convertToIndividual** | `boolean` | If &#x60;true&#x60;, the account will be only removed from the organization and converted into an individual account on our public website, https://flat.io. This operation will remove the education-related data from the account. Before performing this operation, you need to be sure that the user is at least 13 years old and has read and agreed to the Individual Terms of Service of Flat available on https://flat.io/legal.  | [Optional] [Defaults to `undefined`] |

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
| **204** | User deleted |  -  |
| **0** | Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## revokeLtiCredentials

> revokeLtiCredentials(credentials)

Revoke LTI 1.x credentials

DEPRECATED. Use the unified endpoints under &#x60;/organizations/lti/configurations&#x60;. Note: Teachers may be restricted by the organization privacy setting &#x60;lti1p1AllowTeachersCredentials&#x60;. 

### Example

```ts
import {
  Configuration,
  OrganizationApi,
} from 'flat-api';
import type { RevokeLtiCredentialsRequest } from 'flat-api';

async function example() {
  console.log("🚀 Testing flat-api SDK...");
  const config = new Configuration({ 
    // To configure OAuth2 access token for authorization: OAuth2 accessCode
    accessToken: "YOUR ACCESS TOKEN",
  });
  const api = new OrganizationApi(config);

  const body = {
    // string | Credentials unique identifier 
    credentials: credentials_example,
  } satisfies RevokeLtiCredentialsRequest;

  try {
    const data = await api.revokeLtiCredentials(body);
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
| **credentials** | `string` | Credentials unique identifier  | [Defaults to `undefined`] |

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
| **204** | Credentials revoked |  -  |
| **403** | Not admin of an organization |  -  |
| **404** | Credentials not found |  -  |
| **0** | Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## updateLtiConfiguration

> LtiConfiguration updateLtiConfiguration(_configuration, ltiConfigurationUpdate)

Update an existing LTI configuration (edit 1.3; 1.1 not editable)

### Example

```ts
import {
  Configuration,
  OrganizationApi,
} from 'flat-api';
import type { UpdateLtiConfigurationRequest } from 'flat-api';

async function example() {
  console.log("🚀 Testing flat-api SDK...");
  const config = new Configuration({ 
    // To configure OAuth2 access token for authorization: OAuth2 accessCode
    accessToken: "YOUR ACCESS TOKEN",
  });
  const api = new OrganizationApi(config);

  const body = {
    // string | Configuration unique identifier
    _configuration: _configuration_example,
    // LtiConfigurationUpdate
    ltiConfigurationUpdate: ...,
  } satisfies UpdateLtiConfigurationRequest;

  try {
    const data = await api.updateLtiConfiguration(body);
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
| **_configuration** | `string` | Configuration unique identifier | [Defaults to `undefined`] |
| **ltiConfigurationUpdate** | [LtiConfigurationUpdate](LtiConfigurationUpdate.md) |  | |

### Return type

[**LtiConfiguration**](LtiConfiguration.md)

### Authorization

[OAuth2 accessCode](../README.md#OAuth2-accessCode)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | The updated configuration |  -  |
| **0** | Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## updateOrganizationUser

> UserDetailsAdmin updateOrganizationUser(user, body)

Update account information

### Example

```ts
import {
  Configuration,
  OrganizationApi,
} from 'flat-api';
import type { UpdateOrganizationUserRequest } from 'flat-api';

async function example() {
  console.log("🚀 Testing flat-api SDK...");
  const config = new Configuration({ 
    // To configure OAuth2 access token for authorization: OAuth2 accessCode
    accessToken: "YOUR ACCESS TOKEN",
  });
  const api = new OrganizationApi(config);

  const body = {
    // string | Unique identifier of the Flat account 
    user: user_example,
    // UserAdminUpdate
    body: ...,
  } satisfies UpdateOrganizationUserRequest;

  try {
    const data = await api.updateOrganizationUser(body);
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
| **user** | `string` | Unique identifier of the Flat account  | [Defaults to `undefined`] |
| **body** | [UserAdminUpdate](UserAdminUpdate.md) |  | |

### Return type

[**UserDetailsAdmin**](UserDetailsAdmin.md)

### Authorization

[OAuth2 accessCode](../README.md#OAuth2-accessCode)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | User updated |  -  |
| **0** | Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

