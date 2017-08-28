# FlatApi.OrganizationApi

All URIs are relative to *https://api.flat.io/v2*

Method | HTTP request | Description
------------- | ------------- | -------------
[**createLtiCredentials**](OrganizationApi.md#createLtiCredentials) | **POST** /organizations/lti/credentials | Create a new couple of LTI 1.x credentials
[**createOrganizationInvitation**](OrganizationApi.md#createOrganizationInvitation) | **POST** /organizations/invitations | Create a new invitation to join the organization
[**createOrganizationUser**](OrganizationApi.md#createOrganizationUser) | **POST** /organizations/users | Create a new user account
[**listLtiCredentials**](OrganizationApi.md#listLtiCredentials) | **GET** /organizations/lti/credentials | List LTI 1.x credentials
[**listOrganizationInvitations**](OrganizationApi.md#listOrganizationInvitations) | **GET** /organizations/invitations | List the organization invitations
[**listOrganizationUsers**](OrganizationApi.md#listOrganizationUsers) | **GET** /organizations/users | List the organization users
[**removeOrganizationInvitation**](OrganizationApi.md#removeOrganizationInvitation) | **DELETE** /organizations/invitations/{invitation} | Remove an organization invitation
[**removeOrganizationUser**](OrganizationApi.md#removeOrganizationUser) | **DELETE** /organizations/users/{user} | Remove an account from Flat
[**revokeLtiCredentials**](OrganizationApi.md#revokeLtiCredentials) | **DELETE** /organizations/lti/credentials/{credentials} | Revoke LTI 1.x credentials
[**updateOrganizationUser**](OrganizationApi.md#updateOrganizationUser) | **PUT** /organizations/users/{user} | Update account information


<a name="createLtiCredentials"></a>
# **createLtiCredentials**
> LtiCredentials createLtiCredentials(body)

Create a new couple of LTI 1.x credentials

Flat for Education is a Certified LTI Provider. You can use these API methods to automate the creation of LTI credentials. You can read more about our LTI implementation, supported components and LTI Endpoints in our [Developer Documentation](https://flat.io/developers/docs/lti/). 

### Example
```javascript
var FlatApi = require('flat-api');
var defaultClient = FlatApi.ApiClient.instance;

// Configure OAuth2 access token for authorization: OAuth2
var OAuth2 = defaultClient.authentications['OAuth2'];
OAuth2.accessToken = 'YOUR ACCESS TOKEN';

var apiInstance = new FlatApi.OrganizationApi();

var body = new FlatApi.LtiCredentialsCreation(); // LtiCredentialsCreation | 


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.createLtiCredentials(body, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **body** | [**LtiCredentialsCreation**](LtiCredentialsCreation.md)|  | 

### Return type

[**LtiCredentials**](LtiCredentials.md)

### Authorization

[OAuth2](../README.md#OAuth2)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="createOrganizationInvitation"></a>
# **createOrganizationInvitation**
> OrganizationInvitation createOrganizationInvitation(opts)

Create a new invitation to join the organization

This method creates and sends invitation for teachers and admins.  Invitations can only be used by new Flat users or users who are not part of the organization yet.  If the email of the user is already associated to a user of your organization, the API will simply update the role of the existing user and won&#39;t send an invitation. In this case, the property &#x60;usedBy&#x60; will be directly filled with the uniquer identifier of the corresponding user. 

### Example
```javascript
var FlatApi = require('flat-api');
var defaultClient = FlatApi.ApiClient.instance;

// Configure OAuth2 access token for authorization: OAuth2
var OAuth2 = defaultClient.authentications['OAuth2'];
OAuth2.accessToken = 'YOUR ACCESS TOKEN';

var apiInstance = new FlatApi.OrganizationApi();

var opts = { 
  'body': new FlatApi.OrganizationInvitationCreation() // OrganizationInvitationCreation | 
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.createOrganizationInvitation(opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **body** | [**OrganizationInvitationCreation**](OrganizationInvitationCreation.md)|  | [optional] 

### Return type

[**OrganizationInvitation**](OrganizationInvitation.md)

### Authorization

[OAuth2](../README.md#OAuth2)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="createOrganizationUser"></a>
# **createOrganizationUser**
> UserDetailsAdmin createOrganizationUser(opts)

Create a new user account

### Example
```javascript
var FlatApi = require('flat-api');
var defaultClient = FlatApi.ApiClient.instance;

// Configure OAuth2 access token for authorization: OAuth2
var OAuth2 = defaultClient.authentications['OAuth2'];
OAuth2.accessToken = 'YOUR ACCESS TOKEN';

var apiInstance = new FlatApi.OrganizationApi();

var opts = { 
  'body': new FlatApi.UserCreation() // UserCreation | 
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.createOrganizationUser(opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **body** | [**UserCreation**](UserCreation.md)|  | [optional] 

### Return type

[**UserDetailsAdmin**](UserDetailsAdmin.md)

### Authorization

[OAuth2](../README.md#OAuth2)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="listLtiCredentials"></a>
# **listLtiCredentials**
> [LtiCredentials] listLtiCredentials()

List LTI 1.x credentials

### Example
```javascript
var FlatApi = require('flat-api');
var defaultClient = FlatApi.ApiClient.instance;

// Configure OAuth2 access token for authorization: OAuth2
var OAuth2 = defaultClient.authentications['OAuth2'];
OAuth2.accessToken = 'YOUR ACCESS TOKEN';

var apiInstance = new FlatApi.OrganizationApi();

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.listLtiCredentials(callback);
```

### Parameters
This endpoint does not need any parameter.

### Return type

[**[LtiCredentials]**](LtiCredentials.md)

### Authorization

[OAuth2](../README.md#OAuth2)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="listOrganizationInvitations"></a>
# **listOrganizationInvitations**
> [OrganizationInvitation] listOrganizationInvitations(opts)

List the organization invitations

### Example
```javascript
var FlatApi = require('flat-api');
var defaultClient = FlatApi.ApiClient.instance;

// Configure OAuth2 access token for authorization: OAuth2
var OAuth2 = defaultClient.authentications['OAuth2'];
OAuth2.accessToken = 'YOUR ACCESS TOKEN';

var apiInstance = new FlatApi.OrganizationApi();

var opts = { 
  'role': "role_example", // String | Filter users by role
  'limit': 50, // Number | This is the maximum number of objects that may be returned
  'next': "next_example", // String | An opaque string cursor to fetch the next page of data. The paginated API URLs are returned in the `Link` header when requesting the API. These URLs will contain a `next` and `previous` cursor based on the available data. 
  'previous': "previous_example" // String | An opaque string cursor to fetch the previous page of data. The paginated API URLs are returned in the `Link` header when requesting the API. These URLs will contain a `next` and `previous` cursor based on the available data. 
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.listOrganizationInvitations(opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **role** | **String**| Filter users by role | [optional] 
 **limit** | **Number**| This is the maximum number of objects that may be returned | [optional] [default to 50]
 **next** | **String**| An opaque string cursor to fetch the next page of data. The paginated API URLs are returned in the &#x60;Link&#x60; header when requesting the API. These URLs will contain a &#x60;next&#x60; and &#x60;previous&#x60; cursor based on the available data.  | [optional] 
 **previous** | **String**| An opaque string cursor to fetch the previous page of data. The paginated API URLs are returned in the &#x60;Link&#x60; header when requesting the API. These URLs will contain a &#x60;next&#x60; and &#x60;previous&#x60; cursor based on the available data.  | [optional] 

### Return type

[**[OrganizationInvitation]**](OrganizationInvitation.md)

### Authorization

[OAuth2](../README.md#OAuth2)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="listOrganizationUsers"></a>
# **listOrganizationUsers**
> [UserDetailsAdmin] listOrganizationUsers(opts)

List the organization users

### Example
```javascript
var FlatApi = require('flat-api');
var defaultClient = FlatApi.ApiClient.instance;

// Configure OAuth2 access token for authorization: OAuth2
var OAuth2 = defaultClient.authentications['OAuth2'];
OAuth2.accessToken = 'YOUR ACCESS TOKEN';

var apiInstance = new FlatApi.OrganizationApi();

var opts = { 
  'role': "role_example", // String | Filter users by role
  'limit': 50, // Number | This is the maximum number of objects that may be returned
  'next': "next_example", // String | An opaque string cursor to fetch the next page of data. The paginated API URLs are returned in the `Link` header when requesting the API. These URLs will contain a `next` and `previous` cursor based on the available data. 
  'previous': "previous_example" // String | An opaque string cursor to fetch the previous page of data. The paginated API URLs are returned in the `Link` header when requesting the API. These URLs will contain a `next` and `previous` cursor based on the available data. 
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.listOrganizationUsers(opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **role** | **String**| Filter users by role | [optional] 
 **limit** | **Number**| This is the maximum number of objects that may be returned | [optional] [default to 50]
 **next** | **String**| An opaque string cursor to fetch the next page of data. The paginated API URLs are returned in the &#x60;Link&#x60; header when requesting the API. These URLs will contain a &#x60;next&#x60; and &#x60;previous&#x60; cursor based on the available data.  | [optional] 
 **previous** | **String**| An opaque string cursor to fetch the previous page of data. The paginated API URLs are returned in the &#x60;Link&#x60; header when requesting the API. These URLs will contain a &#x60;next&#x60; and &#x60;previous&#x60; cursor based on the available data.  | [optional] 

### Return type

[**[UserDetailsAdmin]**](UserDetailsAdmin.md)

### Authorization

[OAuth2](../README.md#OAuth2)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="removeOrganizationInvitation"></a>
# **removeOrganizationInvitation**
> removeOrganizationInvitation(invitation)

Remove an organization invitation

### Example
```javascript
var FlatApi = require('flat-api');
var defaultClient = FlatApi.ApiClient.instance;

// Configure OAuth2 access token for authorization: OAuth2
var OAuth2 = defaultClient.authentications['OAuth2'];
OAuth2.accessToken = 'YOUR ACCESS TOKEN';

var apiInstance = new FlatApi.OrganizationApi();

var invitation = "invitation_example"; // String | Unique identifier of the invitation


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
};
apiInstance.removeOrganizationInvitation(invitation, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **invitation** | **String**| Unique identifier of the invitation | 

### Return type

null (empty response body)

### Authorization

[OAuth2](../README.md#OAuth2)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="removeOrganizationUser"></a>
# **removeOrganizationUser**
> removeOrganizationUser(user, opts)

Remove an account from Flat

This operation removes an account from Flat and its data, including: * The music scores created by this user (documents, history, comments, collaboration information) * Education related data (assignments and classroom information) 

### Example
```javascript
var FlatApi = require('flat-api');
var defaultClient = FlatApi.ApiClient.instance;

// Configure OAuth2 access token for authorization: OAuth2
var OAuth2 = defaultClient.authentications['OAuth2'];
OAuth2.accessToken = 'YOUR ACCESS TOKEN';

var apiInstance = new FlatApi.OrganizationApi();

var user = "user_example"; // String | Unique identifier of the Flat account 

var opts = { 
  'convertToIndividual': true // Boolean | If `true`, the account will be only removed from the organization and converted into an individual account on our public website, https://flat.io. This operation will remove the education-related data from the account. Before realizing this operation, you need to be sure that the user is at least 13 years old and that this one has read and agreed to the Individual Terms of Services of Flat available on https://flat.io/legal. 
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
};
apiInstance.removeOrganizationUser(user, opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **user** | **String**| Unique identifier of the Flat account  | 
 **convertToIndividual** | **Boolean**| If &#x60;true&#x60;, the account will be only removed from the organization and converted into an individual account on our public website, https://flat.io. This operation will remove the education-related data from the account. Before realizing this operation, you need to be sure that the user is at least 13 years old and that this one has read and agreed to the Individual Terms of Services of Flat available on https://flat.io/legal.  | [optional] 

### Return type

null (empty response body)

### Authorization

[OAuth2](../README.md#OAuth2)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="revokeLtiCredentials"></a>
# **revokeLtiCredentials**
> revokeLtiCredentials(credentials)

Revoke LTI 1.x credentials

### Example
```javascript
var FlatApi = require('flat-api');
var defaultClient = FlatApi.ApiClient.instance;

// Configure OAuth2 access token for authorization: OAuth2
var OAuth2 = defaultClient.authentications['OAuth2'];
OAuth2.accessToken = 'YOUR ACCESS TOKEN';

var apiInstance = new FlatApi.OrganizationApi();

var credentials = "credentials_example"; // String | Credentials unique identifier 


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
};
apiInstance.revokeLtiCredentials(credentials, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **credentials** | **String**| Credentials unique identifier  | 

### Return type

null (empty response body)

### Authorization

[OAuth2](../README.md#OAuth2)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="updateOrganizationUser"></a>
# **updateOrganizationUser**
> UserDetailsAdmin updateOrganizationUser(userbody)

Update account information

### Example
```javascript
var FlatApi = require('flat-api');
var defaultClient = FlatApi.ApiClient.instance;

// Configure OAuth2 access token for authorization: OAuth2
var OAuth2 = defaultClient.authentications['OAuth2'];
OAuth2.accessToken = 'YOUR ACCESS TOKEN';

var apiInstance = new FlatApi.OrganizationApi();

var user = "user_example"; // String | Unique identifier of the Flat account 

var body = new FlatApi.UserAdminUpdate(); // UserAdminUpdate | 


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.updateOrganizationUser(userbody, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **user** | **String**| Unique identifier of the Flat account  | 
 **body** | [**UserAdminUpdate**](UserAdminUpdate.md)|  | 

### Return type

[**UserDetailsAdmin**](UserDetailsAdmin.md)

### Authorization

[OAuth2](../README.md#OAuth2)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

