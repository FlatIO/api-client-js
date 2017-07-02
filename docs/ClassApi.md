# FlatApi.ClassApi

All URIs are relative to *https://api.flat.io/v2*

Method | HTTP request | Description
------------- | ------------- | -------------
[**addClassUser**](ClassApi.md#addClassUser) | **PUT** /classes/{class}/users/{user} | Add a user to the class
[**archiveClass**](ClassApi.md#archiveClass) | **POST** /classes/{class}/archive | Archive the class
[**copyAssignment**](ClassApi.md#copyAssignment) | **POST** /classes/{class}/assignments/{assignment}/copy | Copy an assignment
[**createAssignment**](ClassApi.md#createAssignment) | **POST** /classes/{class}/assignments | Assignment creation
[**createClass**](ClassApi.md#createClass) | **POST** /classes | Create a new class
[**createSubmission**](ClassApi.md#createSubmission) | **PUT** /classes/{class}/assignments/{assignment}/submissions | Create or edit a submission
[**deleteClassUser**](ClassApi.md#deleteClassUser) | **DELETE** /classes/{class}/users/{user} | Remove a user from the class
[**editSubmission**](ClassApi.md#editSubmission) | **PUT** /classes/{class}/assignments/{assignment}/submissions/{submission} | Edit a submission
[**enrollClass**](ClassApi.md#enrollClass) | **POST** /classes/enroll/{enrollmentCode} | Join a class
[**getClass**](ClassApi.md#getClass) | **GET** /classes/{class} | Get the details of a single class
[**getScoreSubmissions**](ClassApi.md#getScoreSubmissions) | **GET** /scores/{score}/submissions | List submissions related to the score
[**getSubmission**](ClassApi.md#getSubmission) | **GET** /classes/{class}/assignments/{assignment}/submissions/{submission} | Get a student submission
[**getSubmissions**](ClassApi.md#getSubmissions) | **GET** /classes/{class}/assignments/{assignment}/submissions | List the students&#39; submissions
[**listAssignments**](ClassApi.md#listAssignments) | **GET** /classes/{class}/assignments | Assignments listing
[**listClassStudentSubmissions**](ClassApi.md#listClassStudentSubmissions) | **GET** /classes/{class}/students/{user}/submissions | List the submissions for a student
[**listClasses**](ClassApi.md#listClasses) | **GET** /classes | List the classes available for the current user
[**unarchiveClass**](ClassApi.md#unarchiveClass) | **DELETE** /classes/{class}/archive | Unarchive the class
[**updateClass**](ClassApi.md#updateClass) | **PUT** /classes/{class} | Update the class


<a name="addClassUser"></a>
# **addClassUser**
> addClassUser(_class, user)

Add a user to the class

This method can be used by a teacher of the class to enroll another Flat user into the class.  Only users that are part of your Organization can be enrolled in a class of this same Organization.  When enrolling a user in the class, Flat will automatically add this user to the corresponding Class group, based on this role in the Organization. 

### Example
```javascript
var FlatApi = require('flat-api');
var defaultClient = FlatApi.ApiClient.instance;

// Configure OAuth2 access token for authorization: OAuth2
var OAuth2 = defaultClient.authentications['OAuth2'];
OAuth2.accessToken = 'YOUR ACCESS TOKEN';

var apiInstance = new FlatApi.ClassApi();

var _class = "_class_example"; // String | Unique identifier of the class

var user = "user_example"; // String | Unique identifier of the user


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
};
apiInstance.addClassUser(_class, user, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **_class** | **String**| Unique identifier of the class | 
 **user** | **String**| Unique identifier of the user | 

### Return type

null (empty response body)

### Authorization

[OAuth2](../README.md#OAuth2)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="archiveClass"></a>
# **archiveClass**
> ClassDetails archiveClass(_class)

Archive the class

Mark the class as &#x60;archived&#x60;. When this course is synchronized with another app, like Google Classroom, this state will be automatically be updated. 

### Example
```javascript
var FlatApi = require('flat-api');
var defaultClient = FlatApi.ApiClient.instance;

// Configure OAuth2 access token for authorization: OAuth2
var OAuth2 = defaultClient.authentications['OAuth2'];
OAuth2.accessToken = 'YOUR ACCESS TOKEN';

var apiInstance = new FlatApi.ClassApi();

var _class = "_class_example"; // String | Unique identifier of the class


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.archiveClass(_class, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **_class** | **String**| Unique identifier of the class | 

### Return type

[**ClassDetails**](ClassDetails.md)

### Authorization

[OAuth2](../README.md#OAuth2)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="copyAssignment"></a>
# **copyAssignment**
> Assignment copyAssignment(_class, assignment, body)

Copy an assignment

Copy an assignment to a specified class.  If the original assignment has a due date in the past, this new assingment will be created without a due date.  If the new class is synchronized with an external app (e.g. Google Classroom), the copied assignment will also be posted on the external app. 

### Example
```javascript
var FlatApi = require('flat-api');
var defaultClient = FlatApi.ApiClient.instance;

// Configure OAuth2 access token for authorization: OAuth2
var OAuth2 = defaultClient.authentications['OAuth2'];
OAuth2.accessToken = 'YOUR ACCESS TOKEN';

var apiInstance = new FlatApi.ClassApi();

var _class = "_class_example"; // String | Unique identifier of the class

var assignment = "assignment_example"; // String | Unique identifier of the assignment

var body = new FlatApi.AssignmentCopy(); // AssignmentCopy | 


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.copyAssignment(_class, assignment, body, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **_class** | **String**| Unique identifier of the class | 
 **assignment** | **String**| Unique identifier of the assignment | 
 **body** | [**AssignmentCopy**](AssignmentCopy.md)|  | 

### Return type

[**Assignment**](Assignment.md)

### Authorization

[OAuth2](../README.md#OAuth2)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="createAssignment"></a>
# **createAssignment**
> Assignment createAssignment(_class, opts)

Assignment creation

Use this method as a teacher to create and post a new assignment to a class.  If the class is synchronized with Google Classroom, the assignment will be automatically posted to your Classroom course. 

### Example
```javascript
var FlatApi = require('flat-api');
var defaultClient = FlatApi.ApiClient.instance;

// Configure OAuth2 access token for authorization: OAuth2
var OAuth2 = defaultClient.authentications['OAuth2'];
OAuth2.accessToken = 'YOUR ACCESS TOKEN';

var apiInstance = new FlatApi.ClassApi();

var _class = "_class_example"; // String | Unique identifier of the class

var opts = { 
  'body': new FlatApi.AssignmentCreation() // AssignmentCreation | 
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.createAssignment(_class, opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **_class** | **String**| Unique identifier of the class | 
 **body** | [**AssignmentCreation**](AssignmentCreation.md)|  | [optional] 

### Return type

[**Assignment**](Assignment.md)

### Authorization

[OAuth2](../README.md#OAuth2)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="createClass"></a>
# **createClass**
> ClassDetails createClass(body)

Create a new class

Classrooms on Flat allow you to create activities with assignments and post content to a specific group.  When creating a class, Flat automatically creates two groups: one for the teachers of the course, one for the students. The creator of this class is automatically added to the teachers group.  If the classsroom is synchronized with another application like Google Classroom, some of the meta information will automatically be updated.  You can add users to this class using &#x60;POST /classes/{class}/users/{user}&#x60;, they will automatically added to the group based on their role on Flat. Users can also enroll themselves to this class using &#x60;POST /classes/enroll/{enrollmentCode}&#x60; and the &#x60;enrollmentCode&#x60; returned in the &#x60;ClassDetails&#x60; response. 

### Example
```javascript
var FlatApi = require('flat-api');
var defaultClient = FlatApi.ApiClient.instance;

// Configure OAuth2 access token for authorization: OAuth2
var OAuth2 = defaultClient.authentications['OAuth2'];
OAuth2.accessToken = 'YOUR ACCESS TOKEN';

var apiInstance = new FlatApi.ClassApi();

var body = new FlatApi.ClassCreation(); // ClassCreation | 


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.createClass(body, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **body** | [**ClassCreation**](ClassCreation.md)|  | 

### Return type

[**ClassDetails**](ClassDetails.md)

### Authorization

[OAuth2](../README.md#OAuth2)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="createSubmission"></a>
# **createSubmission**
> AssignmentSubmission createSubmission(_class, assignment, body)

Create or edit a submission

Use this method as a student to create, update and submit a submission related to an assignment. Students can only set &#x60;attachments&#x60;, &#x60;studentComment&#x60; and &#x60;submit&#x60;.  Teachers can use &#x60;PUT /classes/{class}/assignments/{assignment}/submissions/{submission}&#x60; to update a submission by id. 

### Example
```javascript
var FlatApi = require('flat-api');
var defaultClient = FlatApi.ApiClient.instance;

// Configure OAuth2 access token for authorization: OAuth2
var OAuth2 = defaultClient.authentications['OAuth2'];
OAuth2.accessToken = 'YOUR ACCESS TOKEN';

var apiInstance = new FlatApi.ClassApi();

var _class = "_class_example"; // String | Unique identifier of the class

var assignment = "assignment_example"; // String | Unique identifier of the assignment

var body = new FlatApi.AssignmentSubmissionUpdate(); // AssignmentSubmissionUpdate | 


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.createSubmission(_class, assignment, body, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **_class** | **String**| Unique identifier of the class | 
 **assignment** | **String**| Unique identifier of the assignment | 
 **body** | [**AssignmentSubmissionUpdate**](AssignmentSubmissionUpdate.md)|  | 

### Return type

[**AssignmentSubmission**](AssignmentSubmission.md)

### Authorization

[OAuth2](../README.md#OAuth2)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="deleteClassUser"></a>
# **deleteClassUser**
> deleteClassUser(_class, user)

Remove a user from the class

This method can be used by a teacher to remove a user from the class, or by a student to leave the classroom.  Warning: Removing a user from the class will remove the associated resources, including the submissions and feedback related to these submissions. 

### Example
```javascript
var FlatApi = require('flat-api');
var defaultClient = FlatApi.ApiClient.instance;

// Configure OAuth2 access token for authorization: OAuth2
var OAuth2 = defaultClient.authentications['OAuth2'];
OAuth2.accessToken = 'YOUR ACCESS TOKEN';

var apiInstance = new FlatApi.ClassApi();

var _class = "_class_example"; // String | Unique identifier of the class

var user = "user_example"; // String | Unique identifier of the user


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
};
apiInstance.deleteClassUser(_class, user, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **_class** | **String**| Unique identifier of the class | 
 **user** | **String**| Unique identifier of the user | 

### Return type

null (empty response body)

### Authorization

[OAuth2](../README.md#OAuth2)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="editSubmission"></a>
# **editSubmission**
> AssignmentSubmission editSubmission(_class, assignment, submission, body)

Edit a submission

Use this method as a teacher to update the different submission and give feedback. Teachers can only set &#x60;returnFeedback&#x60; 

### Example
```javascript
var FlatApi = require('flat-api');
var defaultClient = FlatApi.ApiClient.instance;

// Configure OAuth2 access token for authorization: OAuth2
var OAuth2 = defaultClient.authentications['OAuth2'];
OAuth2.accessToken = 'YOUR ACCESS TOKEN';

var apiInstance = new FlatApi.ClassApi();

var _class = "_class_example"; // String | Unique identifier of the class

var assignment = "assignment_example"; // String | Unique identifier of the assignment

var submission = "submission_example"; // String | Unique identifier of the submission

var body = new FlatApi.AssignmentSubmissionUpdate(); // AssignmentSubmissionUpdate | 


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.editSubmission(_class, assignment, submission, body, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **_class** | **String**| Unique identifier of the class | 
 **assignment** | **String**| Unique identifier of the assignment | 
 **submission** | **String**| Unique identifier of the submission | 
 **body** | [**AssignmentSubmissionUpdate**](AssignmentSubmissionUpdate.md)|  | 

### Return type

[**AssignmentSubmission**](AssignmentSubmission.md)

### Authorization

[OAuth2](../README.md#OAuth2)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="enrollClass"></a>
# **enrollClass**
> ClassDetails enrollClass(enrollmentCode)

Join a class

Use this method to join a class using an enrollment code given one of the teacher of this class. This code is also available in the &#x60;ClassDetails&#x60; returned to the teachers when creating the class or listing / fetching a specific class.  Flat will automatically add the user to the corresponding class group based on this role in the organization. 

### Example
```javascript
var FlatApi = require('flat-api');
var defaultClient = FlatApi.ApiClient.instance;

// Configure OAuth2 access token for authorization: OAuth2
var OAuth2 = defaultClient.authentications['OAuth2'];
OAuth2.accessToken = 'YOUR ACCESS TOKEN';

var apiInstance = new FlatApi.ClassApi();

var enrollmentCode = "enrollmentCode_example"; // String | The enrollment code, available to the teacher in `ClassDetails` 


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.enrollClass(enrollmentCode, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **enrollmentCode** | **String**| The enrollment code, available to the teacher in &#x60;ClassDetails&#x60;  | 

### Return type

[**ClassDetails**](ClassDetails.md)

### Authorization

[OAuth2](../README.md#OAuth2)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="getClass"></a>
# **getClass**
> ClassDetails getClass(_class)

Get the details of a single class

### Example
```javascript
var FlatApi = require('flat-api');
var defaultClient = FlatApi.ApiClient.instance;

// Configure OAuth2 access token for authorization: OAuth2
var OAuth2 = defaultClient.authentications['OAuth2'];
OAuth2.accessToken = 'YOUR ACCESS TOKEN';

var apiInstance = new FlatApi.ClassApi();

var _class = "_class_example"; // String | Unique identifier of the class


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.getClass(_class, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **_class** | **String**| Unique identifier of the class | 

### Return type

[**ClassDetails**](ClassDetails.md)

### Authorization

[OAuth2](../README.md#OAuth2)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="getScoreSubmissions"></a>
# **getScoreSubmissions**
> [AssignmentSubmission] getScoreSubmissions(score, )

List submissions related to the score

This API call will list the different assignments submissions where the score is attached. This method can be used by anyone that are part of the organization and have at least read access to the document. 

### Example
```javascript
var FlatApi = require('flat-api');
var defaultClient = FlatApi.ApiClient.instance;

// Configure OAuth2 access token for authorization: OAuth2
var OAuth2 = defaultClient.authentications['OAuth2'];
OAuth2.accessToken = 'YOUR ACCESS TOKEN';

var apiInstance = new FlatApi.ClassApi();

var score = "score_example"; // String | Unique identifier of the score document. This can be a Flat Score unique identifier (i.e. `ScoreDetails.id`) or, if the score is also a Google Drive file, the Drive file unique identifier prefixed with `drive-` (e.g. `drive-0B000000000`). 


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.getScoreSubmissions(score, , callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **score** | **String**| Unique identifier of the score document. This can be a Flat Score unique identifier (i.e. &#x60;ScoreDetails.id&#x60;) or, if the score is also a Google Drive file, the Drive file unique identifier prefixed with &#x60;drive-&#x60; (e.g. &#x60;drive-0B000000000&#x60;).  | 

### Return type

[**[AssignmentSubmission]**](AssignmentSubmission.md)

### Authorization

[OAuth2](../README.md#OAuth2)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="getSubmission"></a>
# **getSubmission**
> AssignmentSubmission getSubmission(_class, assignment, submission)

Get a student submission

### Example
```javascript
var FlatApi = require('flat-api');
var defaultClient = FlatApi.ApiClient.instance;

// Configure OAuth2 access token for authorization: OAuth2
var OAuth2 = defaultClient.authentications['OAuth2'];
OAuth2.accessToken = 'YOUR ACCESS TOKEN';

var apiInstance = new FlatApi.ClassApi();

var _class = "_class_example"; // String | Unique identifier of the class

var assignment = "assignment_example"; // String | Unique identifier of the assignment

var submission = "submission_example"; // String | Unique identifier of the submission


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.getSubmission(_class, assignment, submission, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **_class** | **String**| Unique identifier of the class | 
 **assignment** | **String**| Unique identifier of the assignment | 
 **submission** | **String**| Unique identifier of the submission | 

### Return type

[**AssignmentSubmission**](AssignmentSubmission.md)

### Authorization

[OAuth2](../README.md#OAuth2)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="getSubmissions"></a>
# **getSubmissions**
> [AssignmentSubmission] getSubmissions(_class, assignment)

List the students&#39; submissions

### Example
```javascript
var FlatApi = require('flat-api');
var defaultClient = FlatApi.ApiClient.instance;

// Configure OAuth2 access token for authorization: OAuth2
var OAuth2 = defaultClient.authentications['OAuth2'];
OAuth2.accessToken = 'YOUR ACCESS TOKEN';

var apiInstance = new FlatApi.ClassApi();

var _class = "_class_example"; // String | Unique identifier of the class

var assignment = "assignment_example"; // String | Unique identifier of the assignment


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.getSubmissions(_class, assignment, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **_class** | **String**| Unique identifier of the class | 
 **assignment** | **String**| Unique identifier of the assignment | 

### Return type

[**[AssignmentSubmission]**](AssignmentSubmission.md)

### Authorization

[OAuth2](../README.md#OAuth2)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="listAssignments"></a>
# **listAssignments**
> [Assignment] listAssignments(_class)

Assignments listing

### Example
```javascript
var FlatApi = require('flat-api');
var defaultClient = FlatApi.ApiClient.instance;

// Configure OAuth2 access token for authorization: OAuth2
var OAuth2 = defaultClient.authentications['OAuth2'];
OAuth2.accessToken = 'YOUR ACCESS TOKEN';

var apiInstance = new FlatApi.ClassApi();

var _class = "_class_example"; // String | Unique identifier of the class


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.listAssignments(_class, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **_class** | **String**| Unique identifier of the class | 

### Return type

[**[Assignment]**](Assignment.md)

### Authorization

[OAuth2](../README.md#OAuth2)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="listClassStudentSubmissions"></a>
# **listClassStudentSubmissions**
> [AssignmentSubmission] listClassStudentSubmissions(_class, user)

List the submissions for a student

Use this method as a teacher to list all the assignment submissions sent by a student of the class 

### Example
```javascript
var FlatApi = require('flat-api');
var defaultClient = FlatApi.ApiClient.instance;

// Configure OAuth2 access token for authorization: OAuth2
var OAuth2 = defaultClient.authentications['OAuth2'];
OAuth2.accessToken = 'YOUR ACCESS TOKEN';

var apiInstance = new FlatApi.ClassApi();

var _class = "_class_example"; // String | Unique identifier of the class

var user = "user_example"; // String | Unique identifier of the user


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.listClassStudentSubmissions(_class, user, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **_class** | **String**| Unique identifier of the class | 
 **user** | **String**| Unique identifier of the user | 

### Return type

[**[AssignmentSubmission]**](AssignmentSubmission.md)

### Authorization

[OAuth2](../README.md#OAuth2)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="listClasses"></a>
# **listClasses**
> [ClassDetails] listClasses(opts)

List the classes available for the current user

### Example
```javascript
var FlatApi = require('flat-api');
var defaultClient = FlatApi.ApiClient.instance;

// Configure OAuth2 access token for authorization: OAuth2
var OAuth2 = defaultClient.authentications['OAuth2'];
OAuth2.accessToken = 'YOUR ACCESS TOKEN';

var apiInstance = new FlatApi.ClassApi();

var opts = { 
  'state': "active" // String | Filter the classes by state
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.listClasses(opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **state** | **String**| Filter the classes by state | [optional] [default to active]

### Return type

[**[ClassDetails]**](ClassDetails.md)

### Authorization

[OAuth2](../README.md#OAuth2)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="unarchiveClass"></a>
# **unarchiveClass**
> ClassDetails unarchiveClass(_class)

Unarchive the class

Mark the class as &#x60;active&#x60;. When this course is synchronized with another app, like Google Classroom, this state will be automatically be updated. 

### Example
```javascript
var FlatApi = require('flat-api');
var defaultClient = FlatApi.ApiClient.instance;

// Configure OAuth2 access token for authorization: OAuth2
var OAuth2 = defaultClient.authentications['OAuth2'];
OAuth2.accessToken = 'YOUR ACCESS TOKEN';

var apiInstance = new FlatApi.ClassApi();

var _class = "_class_example"; // String | Unique identifier of the class


var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.unarchiveClass(_class, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **_class** | **String**| Unique identifier of the class | 

### Return type

[**ClassDetails**](ClassDetails.md)

### Authorization

[OAuth2](../README.md#OAuth2)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="updateClass"></a>
# **updateClass**
> ClassDetails updateClass(_class, opts)

Update the class

Update the meta information of the class 

### Example
```javascript
var FlatApi = require('flat-api');
var defaultClient = FlatApi.ApiClient.instance;

// Configure OAuth2 access token for authorization: OAuth2
var OAuth2 = defaultClient.authentications['OAuth2'];
OAuth2.accessToken = 'YOUR ACCESS TOKEN';

var apiInstance = new FlatApi.ClassApi();

var _class = "_class_example"; // String | Unique identifier of the class

var opts = { 
  'body': new FlatApi.ClassUpdate() // ClassUpdate | Details of the Class
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
apiInstance.updateClass(_class, opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **_class** | **String**| Unique identifier of the class | 
 **body** | [**ClassUpdate**](ClassUpdate.md)| Details of the Class | [optional] 

### Return type

[**ClassDetails**](ClassDetails.md)

### Authorization

[OAuth2](../README.md#OAuth2)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

