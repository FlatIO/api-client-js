# FlatApi.ClassApi

All URIs are relative to *https://api.flat.io/v2*

Method | HTTP request | Description
------------- | ------------- | -------------
[**activateClass**](ClassApi.md#activateClass) | **POST** /classes/{class}/activate | Activate the class
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



## activateClass

> ClassDetails activateClass(_class)

Activate the class

Mark the class as &#x60;active&#x60;. This is mainly used for classes synchronized from Clever that are initially with an &#x60;inactive&#x60; state and hidden in the UI. 

### Example

```javascript
import FlatApi from 'flat-api';
let defaultClient = FlatApi.ApiClient.instance;
// Configure OAuth2 access token for authorization: OAuth2
let OAuth2 = defaultClient.authentications['OAuth2'];
OAuth2.accessToken = 'YOUR ACCESS TOKEN';

let apiInstance = new FlatApi.ClassApi();
let _class = "_class_example"; // String | Unique identifier of the class
apiInstance.activateClass(_class, (error, data, response) => {
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
 **_class** | **String**| Unique identifier of the class | 

### Return type

[**ClassDetails**](ClassDetails.md)

### Authorization

[OAuth2](../README.md#OAuth2)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## addClassUser

> addClassUser(_class, user)

Add a user to the class

This method can be used by a teacher of the class to enroll another Flat user into the class.  Only users that are part of your Organization can be enrolled in a class of this same Organization.  When enrolling a user in the class, Flat will automatically add this user to the corresponding Class group, based on this role in the Organization. 

### Example

```javascript
import FlatApi from 'flat-api';
let defaultClient = FlatApi.ApiClient.instance;
// Configure OAuth2 access token for authorization: OAuth2
let OAuth2 = defaultClient.authentications['OAuth2'];
OAuth2.accessToken = 'YOUR ACCESS TOKEN';

let apiInstance = new FlatApi.ClassApi();
let _class = "_class_example"; // String | Unique identifier of the class
let user = "user_example"; // String | Unique identifier of the user
apiInstance.addClassUser(_class, user, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
});
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

- **Content-Type**: Not defined
- **Accept**: application/json


## archiveClass

> ClassDetails archiveClass(_class)

Archive the class

Mark the class as &#x60;archived&#x60;. When this course is synchronized with another app, like Google Classroom, this state will be automatically be updated. 

### Example

```javascript
import FlatApi from 'flat-api';
let defaultClient = FlatApi.ApiClient.instance;
// Configure OAuth2 access token for authorization: OAuth2
let OAuth2 = defaultClient.authentications['OAuth2'];
OAuth2.accessToken = 'YOUR ACCESS TOKEN';

let apiInstance = new FlatApi.ClassApi();
let _class = "_class_example"; // String | Unique identifier of the class
apiInstance.archiveClass(_class, (error, data, response) => {
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
 **_class** | **String**| Unique identifier of the class | 

### Return type

[**ClassDetails**](ClassDetails.md)

### Authorization

[OAuth2](../README.md#OAuth2)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## copyAssignment

> Assignment copyAssignment(_class, assignment, body)

Copy an assignment

Copy an assignment to a specified class.  If the original assignment has a due date in the past, this new assingment will be created without a due date.  If the new class is synchronized with an external app (e.g. Google Classroom), the copied assignment will also be posted on the external app. 

### Example

```javascript
import FlatApi from 'flat-api';
let defaultClient = FlatApi.ApiClient.instance;
// Configure OAuth2 access token for authorization: OAuth2
let OAuth2 = defaultClient.authentications['OAuth2'];
OAuth2.accessToken = 'YOUR ACCESS TOKEN';

let apiInstance = new FlatApi.ClassApi();
let _class = "_class_example"; // String | Unique identifier of the class
let assignment = "assignment_example"; // String | Unique identifier of the assignment
let body = new FlatApi.AssignmentCopy(); // AssignmentCopy | 
apiInstance.copyAssignment(_class, assignment, body, (error, data, response) => {
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


## createAssignment

> Assignment createAssignment(_class, opts)

Assignment creation

Use this method as a teacher to create and post a new assignment to a class.  If the class is synchronized with Google Classroom, the assignment will be automatically posted to your Classroom course. 

### Example

```javascript
import FlatApi from 'flat-api';
let defaultClient = FlatApi.ApiClient.instance;
// Configure OAuth2 access token for authorization: OAuth2
let OAuth2 = defaultClient.authentications['OAuth2'];
OAuth2.accessToken = 'YOUR ACCESS TOKEN';

let apiInstance = new FlatApi.ClassApi();
let _class = "_class_example"; // String | Unique identifier of the class
let opts = {
  'body': new FlatApi.AssignmentCreation() // AssignmentCreation | 
};
apiInstance.createAssignment(_class, opts, (error, data, response) => {
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
 **_class** | **String**| Unique identifier of the class | 
 **body** | [**AssignmentCreation**](AssignmentCreation.md)|  | [optional] 

### Return type

[**Assignment**](Assignment.md)

### Authorization

[OAuth2](../README.md#OAuth2)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## createClass

> ClassDetails createClass(body)

Create a new class

Classrooms on Flat allow you to create activities with assignments and post content to a specific group.  When creating a class, Flat automatically creates two groups: one for the teachers of the course, one for the students. The creator of this class is automatically added to the teachers group.  If the classsroom is synchronized with another application like Google Classroom, some of the meta information will automatically be updated.  You can add users to this class using &#x60;POST /classes/{class}/users/{user}&#x60;, they will automatically added to the group based on their role on Flat. Users can also enroll themselves to this class using &#x60;POST /classes/enroll/{enrollmentCode}&#x60; and the &#x60;enrollmentCode&#x60; returned in the &#x60;ClassDetails&#x60; response. 

### Example

```javascript
import FlatApi from 'flat-api';
let defaultClient = FlatApi.ApiClient.instance;
// Configure OAuth2 access token for authorization: OAuth2
let OAuth2 = defaultClient.authentications['OAuth2'];
OAuth2.accessToken = 'YOUR ACCESS TOKEN';

let apiInstance = new FlatApi.ClassApi();
let body = new FlatApi.ClassCreation(); // ClassCreation | 
apiInstance.createClass(body, (error, data, response) => {
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
 **body** | [**ClassCreation**](ClassCreation.md)|  | 

### Return type

[**ClassDetails**](ClassDetails.md)

### Authorization

[OAuth2](../README.md#OAuth2)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## createSubmission

> AssignmentSubmission createSubmission(_class, assignment, body)

Create or edit a submission

Use this method as a student to create, update and submit a submission related to an assignment. Students can only set &#x60;attachments&#x60;, &#x60;studentComment&#x60; and &#x60;submit&#x60;.  Teachers can use &#x60;PUT /classes/{class}/assignments/{assignment}/submissions/{submission}&#x60; to update a submission by id. 

### Example

```javascript
import FlatApi from 'flat-api';
let defaultClient = FlatApi.ApiClient.instance;
// Configure OAuth2 access token for authorization: OAuth2
let OAuth2 = defaultClient.authentications['OAuth2'];
OAuth2.accessToken = 'YOUR ACCESS TOKEN';

let apiInstance = new FlatApi.ClassApi();
let _class = "_class_example"; // String | Unique identifier of the class
let assignment = "assignment_example"; // String | Unique identifier of the assignment
let body = new FlatApi.AssignmentSubmissionUpdate(); // AssignmentSubmissionUpdate | 
apiInstance.createSubmission(_class, assignment, body, (error, data, response) => {
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


## deleteClassUser

> deleteClassUser(_class, user)

Remove a user from the class

This method can be used by a teacher to remove a user from the class, or by a student to leave the classroom.  Warning: Removing a user from the class will remove the associated resources, including the submissions and feedback related to these submissions. 

### Example

```javascript
import FlatApi from 'flat-api';
let defaultClient = FlatApi.ApiClient.instance;
// Configure OAuth2 access token for authorization: OAuth2
let OAuth2 = defaultClient.authentications['OAuth2'];
OAuth2.accessToken = 'YOUR ACCESS TOKEN';

let apiInstance = new FlatApi.ClassApi();
let _class = "_class_example"; // String | Unique identifier of the class
let user = "user_example"; // String | Unique identifier of the user
apiInstance.deleteClassUser(_class, user, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
});
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

- **Content-Type**: Not defined
- **Accept**: application/json


## editSubmission

> AssignmentSubmission editSubmission(_class, assignment, submission, body)

Edit a submission

Use this method as a teacher to update the different submission and give feedback. Teachers can only set &#x60;returnFeedback&#x60; 

### Example

```javascript
import FlatApi from 'flat-api';
let defaultClient = FlatApi.ApiClient.instance;
// Configure OAuth2 access token for authorization: OAuth2
let OAuth2 = defaultClient.authentications['OAuth2'];
OAuth2.accessToken = 'YOUR ACCESS TOKEN';

let apiInstance = new FlatApi.ClassApi();
let _class = "_class_example"; // String | Unique identifier of the class
let assignment = "assignment_example"; // String | Unique identifier of the assignment
let submission = "submission_example"; // String | Unique identifier of the submission
let body = new FlatApi.AssignmentSubmissionUpdate(); // AssignmentSubmissionUpdate | 
apiInstance.editSubmission(_class, assignment, submission, body, (error, data, response) => {
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


## enrollClass

> ClassDetails enrollClass(enrollmentCode)

Join a class

Use this method to join a class using an enrollment code given one of the teacher of this class. This code is also available in the &#x60;ClassDetails&#x60; returned to the teachers when creating the class or listing / fetching a specific class.  Flat will automatically add the user to the corresponding class group based on this role in the organization. 

### Example

```javascript
import FlatApi from 'flat-api';
let defaultClient = FlatApi.ApiClient.instance;
// Configure OAuth2 access token for authorization: OAuth2
let OAuth2 = defaultClient.authentications['OAuth2'];
OAuth2.accessToken = 'YOUR ACCESS TOKEN';

let apiInstance = new FlatApi.ClassApi();
let enrollmentCode = "enrollmentCode_example"; // String | The enrollment code, available to the teacher in `ClassDetails` 
apiInstance.enrollClass(enrollmentCode, (error, data, response) => {
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
 **enrollmentCode** | **String**| The enrollment code, available to the teacher in &#x60;ClassDetails&#x60;  | 

### Return type

[**ClassDetails**](ClassDetails.md)

### Authorization

[OAuth2](../README.md#OAuth2)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getClass

> ClassDetails getClass(_class)

Get the details of a single class

### Example

```javascript
import FlatApi from 'flat-api';
let defaultClient = FlatApi.ApiClient.instance;
// Configure OAuth2 access token for authorization: OAuth2
let OAuth2 = defaultClient.authentications['OAuth2'];
OAuth2.accessToken = 'YOUR ACCESS TOKEN';

let apiInstance = new FlatApi.ClassApi();
let _class = "_class_example"; // String | Unique identifier of the class
apiInstance.getClass(_class, (error, data, response) => {
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
 **_class** | **String**| Unique identifier of the class | 

### Return type

[**ClassDetails**](ClassDetails.md)

### Authorization

[OAuth2](../README.md#OAuth2)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getScoreSubmissions

> [AssignmentSubmission] getScoreSubmissions(score)

List submissions related to the score

This API call will list the different assignments submissions where the score is attached. This method can be used by anyone that are part of the organization and have at least read access to the document. 

### Example

```javascript
import FlatApi from 'flat-api';
let defaultClient = FlatApi.ApiClient.instance;
// Configure OAuth2 access token for authorization: OAuth2
let OAuth2 = defaultClient.authentications['OAuth2'];
OAuth2.accessToken = 'YOUR ACCESS TOKEN';

let apiInstance = new FlatApi.ClassApi();
let score = "score_example"; // String | Unique identifier of the score document. This can be a Flat Score unique identifier (i.e. `ScoreDetails.id`) or, if the score is also a Google Drive file, the Drive file unique identifier prefixed with `drive-` (e.g. `drive-0B000000000`). 
apiInstance.getScoreSubmissions(score, (error, data, response) => {
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
 **score** | **String**| Unique identifier of the score document. This can be a Flat Score unique identifier (i.e. &#x60;ScoreDetails.id&#x60;) or, if the score is also a Google Drive file, the Drive file unique identifier prefixed with &#x60;drive-&#x60; (e.g. &#x60;drive-0B000000000&#x60;).  | 

### Return type

[**[AssignmentSubmission]**](AssignmentSubmission.md)

### Authorization

[OAuth2](../README.md#OAuth2)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getSubmission

> AssignmentSubmission getSubmission(_class, assignment, submission)

Get a student submission

### Example

```javascript
import FlatApi from 'flat-api';
let defaultClient = FlatApi.ApiClient.instance;
// Configure OAuth2 access token for authorization: OAuth2
let OAuth2 = defaultClient.authentications['OAuth2'];
OAuth2.accessToken = 'YOUR ACCESS TOKEN';

let apiInstance = new FlatApi.ClassApi();
let _class = "_class_example"; // String | Unique identifier of the class
let assignment = "assignment_example"; // String | Unique identifier of the assignment
let submission = "submission_example"; // String | Unique identifier of the submission
apiInstance.getSubmission(_class, assignment, submission, (error, data, response) => {
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
 **_class** | **String**| Unique identifier of the class | 
 **assignment** | **String**| Unique identifier of the assignment | 
 **submission** | **String**| Unique identifier of the submission | 

### Return type

[**AssignmentSubmission**](AssignmentSubmission.md)

### Authorization

[OAuth2](../README.md#OAuth2)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getSubmissions

> [AssignmentSubmission] getSubmissions(_class, assignment)

List the students&#39; submissions

### Example

```javascript
import FlatApi from 'flat-api';
let defaultClient = FlatApi.ApiClient.instance;
// Configure OAuth2 access token for authorization: OAuth2
let OAuth2 = defaultClient.authentications['OAuth2'];
OAuth2.accessToken = 'YOUR ACCESS TOKEN';

let apiInstance = new FlatApi.ClassApi();
let _class = "_class_example"; // String | Unique identifier of the class
let assignment = "assignment_example"; // String | Unique identifier of the assignment
apiInstance.getSubmissions(_class, assignment, (error, data, response) => {
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
 **_class** | **String**| Unique identifier of the class | 
 **assignment** | **String**| Unique identifier of the assignment | 

### Return type

[**[AssignmentSubmission]**](AssignmentSubmission.md)

### Authorization

[OAuth2](../README.md#OAuth2)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## listAssignments

> [Assignment] listAssignments(_class)

Assignments listing

### Example

```javascript
import FlatApi from 'flat-api';
let defaultClient = FlatApi.ApiClient.instance;
// Configure OAuth2 access token for authorization: OAuth2
let OAuth2 = defaultClient.authentications['OAuth2'];
OAuth2.accessToken = 'YOUR ACCESS TOKEN';

let apiInstance = new FlatApi.ClassApi();
let _class = "_class_example"; // String | Unique identifier of the class
apiInstance.listAssignments(_class, (error, data, response) => {
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
 **_class** | **String**| Unique identifier of the class | 

### Return type

[**[Assignment]**](Assignment.md)

### Authorization

[OAuth2](../README.md#OAuth2)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## listClassStudentSubmissions

> [AssignmentSubmission] listClassStudentSubmissions(_class, user)

List the submissions for a student

Use this method as a teacher to list all the assignment submissions sent by a student of the class 

### Example

```javascript
import FlatApi from 'flat-api';
let defaultClient = FlatApi.ApiClient.instance;
// Configure OAuth2 access token for authorization: OAuth2
let OAuth2 = defaultClient.authentications['OAuth2'];
OAuth2.accessToken = 'YOUR ACCESS TOKEN';

let apiInstance = new FlatApi.ClassApi();
let _class = "_class_example"; // String | Unique identifier of the class
let user = "user_example"; // String | Unique identifier of the user
apiInstance.listClassStudentSubmissions(_class, user, (error, data, response) => {
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
 **_class** | **String**| Unique identifier of the class | 
 **user** | **String**| Unique identifier of the user | 

### Return type

[**[AssignmentSubmission]**](AssignmentSubmission.md)

### Authorization

[OAuth2](../README.md#OAuth2)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## listClasses

> [ClassDetails] listClasses(opts)

List the classes available for the current user

### Example

```javascript
import FlatApi from 'flat-api';
let defaultClient = FlatApi.ApiClient.instance;
// Configure OAuth2 access token for authorization: OAuth2
let OAuth2 = defaultClient.authentications['OAuth2'];
OAuth2.accessToken = 'YOUR ACCESS TOKEN';

let apiInstance = new FlatApi.ClassApi();
let opts = {
  'state': "'active'" // String | Filter the classes by state
};
apiInstance.listClasses(opts, (error, data, response) => {
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
 **state** | **String**| Filter the classes by state | [optional] [default to &#39;active&#39;]

### Return type

[**[ClassDetails]**](ClassDetails.md)

### Authorization

[OAuth2](../README.md#OAuth2)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## unarchiveClass

> ClassDetails unarchiveClass(_class)

Unarchive the class

Mark the class as &#x60;active&#x60;. When this course is synchronized with another app, like Google Classroom, this state will be automatically be updated. 

### Example

```javascript
import FlatApi from 'flat-api';
let defaultClient = FlatApi.ApiClient.instance;
// Configure OAuth2 access token for authorization: OAuth2
let OAuth2 = defaultClient.authentications['OAuth2'];
OAuth2.accessToken = 'YOUR ACCESS TOKEN';

let apiInstance = new FlatApi.ClassApi();
let _class = "_class_example"; // String | Unique identifier of the class
apiInstance.unarchiveClass(_class, (error, data, response) => {
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
 **_class** | **String**| Unique identifier of the class | 

### Return type

[**ClassDetails**](ClassDetails.md)

### Authorization

[OAuth2](../README.md#OAuth2)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## updateClass

> ClassDetails updateClass(_class, opts)

Update the class

Update the meta information of the class 

### Example

```javascript
import FlatApi from 'flat-api';
let defaultClient = FlatApi.ApiClient.instance;
// Configure OAuth2 access token for authorization: OAuth2
let OAuth2 = defaultClient.authentications['OAuth2'];
OAuth2.accessToken = 'YOUR ACCESS TOKEN';

let apiInstance = new FlatApi.ClassApi();
let _class = "_class_example"; // String | Unique identifier of the class
let opts = {
  'body': new FlatApi.ClassUpdate() // ClassUpdate | Details of the Class
};
apiInstance.updateClass(_class, opts, (error, data, response) => {
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
 **_class** | **String**| Unique identifier of the class | 
 **body** | [**ClassUpdate**](ClassUpdate.md)| Details of the Class | [optional] 

### Return type

[**ClassDetails**](ClassDetails.md)

### Authorization

[OAuth2](../README.md#OAuth2)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

