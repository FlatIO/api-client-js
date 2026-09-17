# ClassApi

All URIs are relative to *https://api.flat.io/v2*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**activateClass**](ClassApi.md#activateclass) | **POST** /classes/{class}/activate | Activate the class |
| [**addClassUser**](ClassApi.md#addclassuser) | **PUT** /classes/{class}/users/{user} | Add a user to the class |
| [**archiveAssignment**](ClassApi.md#archiveassignment) | **POST** /classes/{class}/assignments/{assignment}/archive | Archive the assignment |
| [**archiveClass**](ClassApi.md#archiveclass) | **POST** /classes/{class}/archive | Archive the class |
| [**copyAssignment**](ClassApi.md#copyassignment) | **POST** /classes/{class}/assignments/{assignment}/copy | Copy an assignment |
| [**createClass**](ClassApi.md#createclass) | **POST** /classes | Create a new class |
| [**createClassAssignment**](ClassApi.md#createclassassignment) | **POST** /classes/{class}/assignments | Assignment creation |
| [**createSubmission**](ClassApi.md#createsubmission) | **PUT** /classes/{class}/assignments/{assignment}/submissions | Create or edit a submission |
| [**createTestStudentAccount**](ClassApi.md#createteststudentaccount) | **POST** /classes/{class}/testStudent | Create a test student account |
| [**deleteAssignment**](ClassApi.md#deleteassignment) | **DELETE** /classes/{class}/assignments/{assignment} | Delete an assignment |
| [**deleteClassUser**](ClassApi.md#deleteclassuser) | **DELETE** /classes/{class}/users/{user} | Remove a user from the class |
| [**deleteSubmission**](ClassApi.md#deletesubmission) | **DELETE** /classes/{class}/assignments/{assignment}/submissions/{submission} | Reset a submission |
| [**deleteSubmissionComment**](ClassApi.md#deletesubmissioncomment) | **DELETE** /classes/{class}/assignments/{assignment}/submissions/{submission}/comments/{comment} | Delete a feedback comment to a submission |
| [**editSubmission**](ClassApi.md#editsubmission) | **PUT** /classes/{class}/assignments/{assignment}/submissions/{submission} | Edit a submission |
| [**enrollClass**](ClassApi.md#enrollclass) | **POST** /classes/enroll/{enrollmentCode} | Join a class |
| [**exportSubmissionsReviewsAsCsv**](ClassApi.md#exportsubmissionsreviewsascsv) | **GET** /classes/{class}/assignments/{assignment}/submissions/csv | CSV Grades exports |
| [**exportSubmissionsReviewsAsExcel**](ClassApi.md#exportsubmissionsreviewsasexcel) | **GET** /classes/{class}/assignments/{assignment}/submissions/excel | Excel Grades exports |
| [**getAssignment**](ClassApi.md#getassignment) | **GET** /classes/{class}/assignments/{assignment} | Get an assignment |
| [**getClass**](ClassApi.md#getclass) | **GET** /classes/{class} | Get the details of a single class |
| [**getScoreSubmissions**](ClassApi.md#getscoresubmissions) | **GET** /scores/{score}/submissions | List submissions related to the score |
| [**getSubmission**](ClassApi.md#getsubmission) | **GET** /classes/{class}/assignments/{assignment}/submissions/{submission} | Get a student submission |
| [**getSubmissionComments**](ClassApi.md#getsubmissioncomments) | **GET** /classes/{class}/assignments/{assignment}/submissions/{submission}/comments | List the feedback comments of a submission |
| [**getSubmissionHistory**](ClassApi.md#getsubmissionhistory) | **GET** /classes/{class}/assignments/{assignment}/submissions/{submission}/history | Get the history of the submission |
| [**getSubmissions**](ClassApi.md#getsubmissions) | **GET** /classes/{class}/assignments/{assignment}/submissions | List the students\&#39; submissions |
| [**listAssignments**](ClassApi.md#listassignments) | **GET** /classes/{class}/assignments | Assignments listing |
| [**listClassStudentSubmissions**](ClassApi.md#listclassstudentsubmissions) | **GET** /classes/{class}/students/{user}/submissions | List the submissions for a student |
| [**listClasses**](ClassApi.md#listclasses) | **GET** /classes | List the classes available for the current user |
| [**postSubmissionComment**](ClassApi.md#postsubmissioncomment) | **POST** /classes/{class}/assignments/{assignment}/submissions/{submission}/comments | Add a feedback comment to a submission |
| [**unarchiveAssignment**](ClassApi.md#unarchiveassignment) | **DELETE** /classes/{class}/assignments/{assignment}/archive | Unarchive the assignment. |
| [**unarchiveClass**](ClassApi.md#unarchiveclass) | **DELETE** /classes/{class}/archive | Unarchive the class |
| [**updateClass**](ClassApi.md#updateclass) | **PUT** /classes/{class} | Update the class |
| [**updateClassAssignment**](ClassApi.md#updateclassassignment) | **PUT** /classes/{class}/assignments/{assignment} | Update an assignment |
| [**updateSubmissionComment**](ClassApi.md#updatesubmissioncomment) | **PUT** /classes/{class}/assignments/{assignment}/submissions/{submission}/comments/{comment} | Update a feedback comment to a submission |



## activateClass

> ClassDetails activateClass(_class)

Activate the class

Mark the class as &#x60;active&#x60;. This is mainly used for classes synchronized from Clever that are initially with an &#x60;inactive&#x60; state and hidden in the UI. 

### Example

```ts
import {
  Configuration,
  ClassApi,
} from 'flat-api';
import type { ActivateClassRequest } from 'flat-api';

async function example() {
  console.log("🚀 Testing flat-api SDK...");
  const config = new Configuration({ 
    // To configure OAuth2 access token for authorization: OAuth2 accessCode
    accessToken: "YOUR ACCESS TOKEN",
  });
  const api = new ClassApi(config);

  const body = {
    // string | Unique identifier of the class
    _class: _class_example,
  } satisfies ActivateClassRequest;

  try {
    const data = await api.activateClass(body);
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
| **_class** | `string` | Unique identifier of the class | [Defaults to `undefined`] |

### Return type

[**ClassDetails**](ClassDetails.md)

### Authorization

[OAuth2 accessCode](../README.md#OAuth2-accessCode)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | The class details |  -  |
| **0** | Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## addClassUser

> addClassUser(_class, user)

Add a user to the class

This method can be used by a teacher of the class to enroll another Flat user into the class.  Only users that are part of your Organization can be enrolled in a class of this same Organization.  When enrolling a user in the class, Flat will automatically add this user to the corresponding Class group, based on their role in the Organization. 

### Example

```ts
import {
  Configuration,
  ClassApi,
} from 'flat-api';
import type { AddClassUserRequest } from 'flat-api';

async function example() {
  console.log("🚀 Testing flat-api SDK...");
  const config = new Configuration({ 
    // To configure OAuth2 access token for authorization: OAuth2 accessCode
    accessToken: "YOUR ACCESS TOKEN",
  });
  const api = new ClassApi(config);

  const body = {
    // string | Unique identifier of the class
    _class: _class_example,
    // string | Unique identifier of the user
    user: user_example,
  } satisfies AddClassUserRequest;

  try {
    const data = await api.addClassUser(body);
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
| **_class** | `string` | Unique identifier of the class | [Defaults to `undefined`] |
| **user** | `string` | Unique identifier of the user | [Defaults to `undefined`] |

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
| **204** | The user has been added to the class |  -  |
| **0** | Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## archiveAssignment

> Assignment archiveAssignment(_class, assignment)

Archive the assignment

Archive the assignment 

### Example

```ts
import {
  Configuration,
  ClassApi,
} from 'flat-api';
import type { ArchiveAssignmentRequest } from 'flat-api';

async function example() {
  console.log("🚀 Testing flat-api SDK...");
  const config = new Configuration({ 
    // To configure OAuth2 access token for authorization: OAuth2 accessCode
    accessToken: "YOUR ACCESS TOKEN",
  });
  const api = new ClassApi(config);

  const body = {
    // string | Unique identifier of the class
    _class: _class_example,
    // string | Unique identifier of the assignment
    assignment: assignment_example,
  } satisfies ArchiveAssignmentRequest;

  try {
    const data = await api.archiveAssignment(body);
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
| **_class** | `string` | Unique identifier of the class | [Defaults to `undefined`] |
| **assignment** | `string` | Unique identifier of the assignment | [Defaults to `undefined`] |

### Return type

[**Assignment**](Assignment.md)

### Authorization

[OAuth2 accessCode](../README.md#OAuth2-accessCode)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | The assignment details |  -  |
| **0** | Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## archiveClass

> ClassDetails archiveClass(_class)

Archive the class

Mark the class as &#x60;archived&#x60;. When this course is synchronized with another app, like Google Classroom, this state will automatically be updated. 

### Example

```ts
import {
  Configuration,
  ClassApi,
} from 'flat-api';
import type { ArchiveClassRequest } from 'flat-api';

async function example() {
  console.log("🚀 Testing flat-api SDK...");
  const config = new Configuration({ 
    // To configure OAuth2 access token for authorization: OAuth2 accessCode
    accessToken: "YOUR ACCESS TOKEN",
  });
  const api = new ClassApi(config);

  const body = {
    // string | Unique identifier of the class
    _class: _class_example,
  } satisfies ArchiveClassRequest;

  try {
    const data = await api.archiveClass(body);
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
| **_class** | `string` | Unique identifier of the class | [Defaults to `undefined`] |

### Return type

[**ClassDetails**](ClassDetails.md)

### Authorization

[OAuth2 accessCode](../README.md#OAuth2-accessCode)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | The class details |  -  |
| **0** | Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## copyAssignment

> AssignmentCopyResponse copyAssignment(_class, assignment, body)

Copy an assignment

Copy an assignment to a specified class or the resource library  For class assignments: - If the original assignment has a due date in the past, this new assignment will be created without a due date. - If the class is synchronized with an external app (e.g. Google Classroom), the copied assignment will also be posted on the external app. 

### Example

```ts
import {
  Configuration,
  ClassApi,
} from 'flat-api';
import type { CopyAssignmentRequest } from 'flat-api';

async function example() {
  console.log("🚀 Testing flat-api SDK...");
  const config = new Configuration({ 
    // To configure OAuth2 access token for authorization: OAuth2 accessCode
    accessToken: "YOUR ACCESS TOKEN",
  });
  const api = new ClassApi(config);

  const body = {
    // string | Unique identifier of the class
    _class: _class_example,
    // string | Unique identifier of the assignment
    assignment: assignment_example,
    // AssignmentCopy
    body: ...,
  } satisfies CopyAssignmentRequest;

  try {
    const data = await api.copyAssignment(body);
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
| **_class** | `string` | Unique identifier of the class | [Defaults to `undefined`] |
| **assignment** | `string` | Unique identifier of the assignment | [Defaults to `undefined`] |
| **body** | [AssignmentCopy](AssignmentCopy.md) |  | |

### Return type

[**AssignmentCopyResponse**](AssignmentCopyResponse.md)

### Authorization

[OAuth2 accessCode](../README.md#OAuth2-accessCode)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | The new created assignment |  -  |
| **0** | Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## createClass

> ClassDetails createClass(body)

Create a new class

Classrooms on Flat allow you to create activities with assignments and post content to a specific group.  When creating a class, Flat automatically creates two groups: one for the teachers of the course, one for the students. The creator of this class is automatically added to the teachers group.  If the classroom is synchronized with another application like Google Classroom, some of the meta information will automatically be updated.  You can add users to this class using &#x60;PUT /classes/{class}/users/{user}&#x60;, they will automatically be added to the group based on their role on Flat. Users can also enroll themselves to this class using &#x60;POST /classes/enroll/{enrollmentCode}&#x60; and the &#x60;enrollmentCode&#x60; returned in the &#x60;ClassDetails&#x60; response. 

### Example

```ts
import {
  Configuration,
  ClassApi,
} from 'flat-api';
import type { CreateClassRequest } from 'flat-api';

async function example() {
  console.log("🚀 Testing flat-api SDK...");
  const config = new Configuration({ 
    // To configure OAuth2 access token for authorization: OAuth2 accessCode
    accessToken: "YOUR ACCESS TOKEN",
  });
  const api = new ClassApi(config);

  const body = {
    // ClassCreation
    body: ...,
  } satisfies CreateClassRequest;

  try {
    const data = await api.createClass(body);
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
| **body** | [ClassCreation](ClassCreation.md) |  | |

### Return type

[**ClassDetails**](ClassDetails.md)

### Authorization

[OAuth2 accessCode](../README.md#OAuth2-accessCode)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | The new class details |  -  |
| **402** | Account overquota |  -  |
| **0** | Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## createClassAssignment

> Assignment createClassAssignment(_class, body)

Assignment creation

Use this method as a teacher to create and post a new assignment to a class.  If the class is synchronized with Google Classroom, the assignment will be automatically posted to your Classroom course. 

### Example

```ts
import {
  Configuration,
  ClassApi,
} from 'flat-api';
import type { CreateClassAssignmentRequest } from 'flat-api';

async function example() {
  console.log("🚀 Testing flat-api SDK...");
  const config = new Configuration({ 
    // To configure OAuth2 access token for authorization: OAuth2 accessCode
    accessToken: "YOUR ACCESS TOKEN",
  });
  const api = new ClassApi(config);

  const body = {
    // string | Unique identifier of the class
    _class: _class_example,
    // ClassAssignmentUpdate
    body: ...,
  } satisfies CreateClassAssignmentRequest;

  try {
    const data = await api.createClassAssignment(body);
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
| **_class** | `string` | Unique identifier of the class | [Defaults to `undefined`] |
| **body** | [ClassAssignmentUpdate](ClassAssignmentUpdate.md) |  | |

### Return type

[**Assignment**](Assignment.md)

### Authorization

[OAuth2 accessCode](../README.md#OAuth2-accessCode)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | The assignment has been created |  -  |
| **0** | Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## createSubmission

> AssignmentSubmission createSubmission(_class, assignment, body)

Create or edit a submission

Use this method as a student to create, update and submit a submission related to an assignment. Students can only set &#x60;attachments&#x60;, &#x60;playback&#x60;, &#x60;exercisesIds&#x60; and &#x60;submit&#x60;. Teachers can use &#x60;PUT /classes/{class}/assignments/{assignment}/submissions/{submission}&#x60; to update a submission by id. 

### Example

```ts
import {
  Configuration,
  ClassApi,
} from 'flat-api';
import type { CreateSubmissionRequest } from 'flat-api';

async function example() {
  console.log("🚀 Testing flat-api SDK...");
  const config = new Configuration({ 
    // To configure OAuth2 access token for authorization: OAuth2 accessCode
    accessToken: "YOUR ACCESS TOKEN",
  });
  const api = new ClassApi(config);

  const body = {
    // string | Unique identifier of the class
    _class: _class_example,
    // string | Unique identifier of the assignment
    assignment: assignment_example,
    // AssignmentSubmissionUpdate
    body: ...,
  } satisfies CreateSubmissionRequest;

  try {
    const data = await api.createSubmission(body);
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
| **_class** | `string` | Unique identifier of the class | [Defaults to `undefined`] |
| **assignment** | `string` | Unique identifier of the assignment | [Defaults to `undefined`] |
| **body** | [AssignmentSubmissionUpdate](AssignmentSubmissionUpdate.md) |  | |

### Return type

[**AssignmentSubmission**](AssignmentSubmission.md)

### Authorization

[OAuth2 accessCode](../README.md#OAuth2-accessCode)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | The submission |  -  |
| **0** | Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## createTestStudentAccount

> UserDetails createTestStudentAccount(_class, reset)

Create a test student account

Test student accounts can be created by teachers and admins to try out the assignments.  - They are automatically added to the class. - They can be reset using this API endpoint (a new account will be created and the previous one scheduled for deletion). - These accounts don\&#39;t use a user license. 

### Example

```ts
import {
  Configuration,
  ClassApi,
} from 'flat-api';
import type { CreateTestStudentAccountRequest } from 'flat-api';

async function example() {
  console.log("🚀 Testing flat-api SDK...");
  const config = new Configuration({ 
    // To configure OAuth2 access token for authorization: OAuth2 accessCode
    accessToken: "YOUR ACCESS TOKEN",
  });
  const api = new ClassApi(config);

  const body = {
    // string | Unique identifier of the class
    _class: _class_example,
    // boolean | If true, the testing account will be re-created.  (optional)
    reset: true,
  } satisfies CreateTestStudentAccountRequest;

  try {
    const data = await api.createTestStudentAccount(body);
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
| **_class** | `string` | Unique identifier of the class | [Defaults to `undefined`] |
| **reset** | `boolean` | If true, the testing account will be re-created.  | [Optional] [Defaults to `undefined`] |

### Return type

[**UserDetails**](UserDetails.md)

### Authorization

[OAuth2 accessCode](../README.md#OAuth2-accessCode)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Test account created |  -  |
| **0** | Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## deleteAssignment

> deleteAssignment(_class, assignment)

Delete an assignment

Delete an assignment. This cannot be undone, and it removes a good deal more than the assignment itself: every submission made against it, the students\&#39; dedicated copies of the attached scores, the related class stream posts and notifications, and the editor toolset.  When the class is synchronized with Google Classroom or Microsoft Teams, the assignment is deleted there too.  Requires the teacher role on the class, and the class must not be archived.  &#x60;archiveAssignment&#x60; is almost always what you want instead: it takes the assignment out of the class stream and keeps the submissions and their grades. 

### Example

```ts
import {
  Configuration,
  ClassApi,
} from 'flat-api';
import type { DeleteAssignmentRequest } from 'flat-api';

async function example() {
  console.log("🚀 Testing flat-api SDK...");
  const config = new Configuration({ 
    // To configure OAuth2 access token for authorization: OAuth2 accessCode
    accessToken: "YOUR ACCESS TOKEN",
  });
  const api = new ClassApi(config);

  const body = {
    // string | Unique identifier of the class
    _class: _class_example,
    // string | Unique identifier of the assignment
    assignment: assignment_example,
  } satisfies DeleteAssignmentRequest;

  try {
    const data = await api.deleteAssignment(body);
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
| **_class** | `string` | Unique identifier of the class | [Defaults to `undefined`] |
| **assignment** | `string` | Unique identifier of the assignment | [Defaults to `undefined`] |

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
| **204** | The assignment has been deleted |  -  |
| **0** | Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## deleteClassUser

> deleteClassUser(_class, user)

Remove a user from the class

This method can be used by a teacher of the class to remove another user from it. Removing your own account is not allowed.  Warning: Removing a user from the class will remove the associated resources, including the submissions and feedback related to these submissions. 

### Example

```ts
import {
  Configuration,
  ClassApi,
} from 'flat-api';
import type { DeleteClassUserRequest } from 'flat-api';

async function example() {
  console.log("🚀 Testing flat-api SDK...");
  const config = new Configuration({ 
    // To configure OAuth2 access token for authorization: OAuth2 accessCode
    accessToken: "YOUR ACCESS TOKEN",
  });
  const api = new ClassApi(config);

  const body = {
    // string | Unique identifier of the class
    _class: _class_example,
    // string | Unique identifier of the user
    user: user_example,
  } satisfies DeleteClassUserRequest;

  try {
    const data = await api.deleteClassUser(body);
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
| **_class** | `string` | Unique identifier of the class | [Defaults to `undefined`] |
| **user** | `string` | Unique identifier of the user | [Defaults to `undefined`] |

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
| **204** | The user has been removed from the class |  -  |
| **0** | Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## deleteSubmission

> AssignmentSubmission deleteSubmission(_class, assignment, submission)

Reset a submission

Use this method as a teacher to reset a submission and allow the student to start the assignment over 

### Example

```ts
import {
  Configuration,
  ClassApi,
} from 'flat-api';
import type { DeleteSubmissionRequest } from 'flat-api';

async function example() {
  console.log("🚀 Testing flat-api SDK...");
  const config = new Configuration({ 
    // To configure OAuth2 access token for authorization: OAuth2 accessCode
    accessToken: "YOUR ACCESS TOKEN",
  });
  const api = new ClassApi(config);

  const body = {
    // string | Unique identifier of the class
    _class: _class_example,
    // string | Unique identifier of the assignment
    assignment: assignment_example,
    // string | Unique identifier of the submission
    submission: submission_example,
  } satisfies DeleteSubmissionRequest;

  try {
    const data = await api.deleteSubmission(body);
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
| **_class** | `string` | Unique identifier of the class | [Defaults to `undefined`] |
| **assignment** | `string` | Unique identifier of the assignment | [Defaults to `undefined`] |
| **submission** | `string` | Unique identifier of the submission | [Defaults to `undefined`] |

### Return type

[**AssignmentSubmission**](AssignmentSubmission.md)

### Authorization

[OAuth2 accessCode](../README.md#OAuth2-accessCode)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | The submission object once reset |  -  |
| **0** | Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## deleteSubmissionComment

> deleteSubmissionComment(_class, assignment, submission, comment)

Delete a feedback comment to a submission

### Example

```ts
import {
  Configuration,
  ClassApi,
} from 'flat-api';
import type { DeleteSubmissionCommentRequest } from 'flat-api';

async function example() {
  console.log("🚀 Testing flat-api SDK...");
  const config = new Configuration({ 
    // To configure OAuth2 access token for authorization: OAuth2 accessCode
    accessToken: "YOUR ACCESS TOKEN",
  });
  const api = new ClassApi(config);

  const body = {
    // string | Unique identifier of the class
    _class: _class_example,
    // string | Unique identifier of the assignment
    assignment: assignment_example,
    // string | Unique identifier of the submission
    submission: submission_example,
    // string | Unique identifier of the comment
    comment: comment_example,
  } satisfies DeleteSubmissionCommentRequest;

  try {
    const data = await api.deleteSubmissionComment(body);
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
| **_class** | `string` | Unique identifier of the class | [Defaults to `undefined`] |
| **assignment** | `string` | Unique identifier of the assignment | [Defaults to `undefined`] |
| **submission** | `string` | Unique identifier of the submission | [Defaults to `undefined`] |
| **comment** | `string` | Unique identifier of the comment | [Defaults to `undefined`] |

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
| **204** | The comment has been deleted |  -  |
| **0** | Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## editSubmission

> AssignmentSubmission editSubmission(_class, assignment, submission, body)

Edit a submission

Use this method as a teacher to update a submission and give feedback. Teachers can only set &#x60;return&#x60;, &#x60;draftGrade&#x60; and &#x60;grade&#x60;. 

### Example

```ts
import {
  Configuration,
  ClassApi,
} from 'flat-api';
import type { EditSubmissionRequest } from 'flat-api';

async function example() {
  console.log("🚀 Testing flat-api SDK...");
  const config = new Configuration({ 
    // To configure OAuth2 access token for authorization: OAuth2 accessCode
    accessToken: "YOUR ACCESS TOKEN",
  });
  const api = new ClassApi(config);

  const body = {
    // string | Unique identifier of the class
    _class: _class_example,
    // string | Unique identifier of the assignment
    assignment: assignment_example,
    // string | Unique identifier of the submission
    submission: submission_example,
    // AssignmentSubmissionUpdate
    body: ...,
  } satisfies EditSubmissionRequest;

  try {
    const data = await api.editSubmission(body);
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
| **_class** | `string` | Unique identifier of the class | [Defaults to `undefined`] |
| **assignment** | `string` | Unique identifier of the assignment | [Defaults to `undefined`] |
| **submission** | `string` | Unique identifier of the submission | [Defaults to `undefined`] |
| **body** | [AssignmentSubmissionUpdate](AssignmentSubmissionUpdate.md) |  | |

### Return type

[**AssignmentSubmission**](AssignmentSubmission.md)

### Authorization

[OAuth2 accessCode](../README.md#OAuth2-accessCode)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | The submission |  -  |
| **0** | Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## enrollClass

> ClassDetails enrollClass(enrollmentCode)

Join a class

Use this method to join a class using an enrollment code given by one of the teachers of this class. This code is also available in the &#x60;ClassDetails&#x60; returned to the teachers when creating the class or listing / fetching a specific class.  Flat will automatically add the user to the corresponding class group based on their role in the organization. 

### Example

```ts
import {
  Configuration,
  ClassApi,
} from 'flat-api';
import type { EnrollClassRequest } from 'flat-api';

async function example() {
  console.log("🚀 Testing flat-api SDK...");
  const config = new Configuration({ 
    // To configure OAuth2 access token for authorization: OAuth2 accessCode
    accessToken: "YOUR ACCESS TOKEN",
  });
  const api = new ClassApi(config);

  const body = {
    // string | The enrollment code, available to the teacher in `ClassDetails` 
    enrollmentCode: enrollmentCode_example,
  } satisfies EnrollClassRequest;

  try {
    const data = await api.enrollClass(body);
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
| **enrollmentCode** | `string` | The enrollment code, available to the teacher in &#x60;ClassDetails&#x60;  | [Defaults to `undefined`] |

### Return type

[**ClassDetails**](ClassDetails.md)

### Authorization

[OAuth2 accessCode](../README.md#OAuth2-accessCode)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | The new class details |  -  |
| **0** | Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## exportSubmissionsReviewsAsCsv

> Blob exportSubmissionsReviewsAsCsv(_class, assignment)

CSV Grades exports

Export list of submissions grades to a CSV file

### Example

```ts
import {
  Configuration,
  ClassApi,
} from 'flat-api';
import type { ExportSubmissionsReviewsAsCsvRequest } from 'flat-api';

async function example() {
  console.log("🚀 Testing flat-api SDK...");
  const config = new Configuration({ 
    // To configure OAuth2 access token for authorization: OAuth2 accessCode
    accessToken: "YOUR ACCESS TOKEN",
  });
  const api = new ClassApi(config);

  const body = {
    // string | Unique identifier of the class
    _class: _class_example,
    // string | Unique identifier of the assignment
    assignment: assignment_example,
  } satisfies ExportSubmissionsReviewsAsCsvRequest;

  try {
    const data = await api.exportSubmissionsReviewsAsCsv(body);
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
| **_class** | `string` | Unique identifier of the class | [Defaults to `undefined`] |
| **assignment** | `string` | Unique identifier of the assignment | [Defaults to `undefined`] |

### Return type

**Blob**

### Authorization

[OAuth2 accessCode](../README.md#OAuth2-accessCode)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `text/csv`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | List of submissions |  -  |
| **0** | Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## exportSubmissionsReviewsAsExcel

> Blob exportSubmissionsReviewsAsExcel(_class, assignment)

Excel Grades exports

Export list of submissions grades to an Excel file

### Example

```ts
import {
  Configuration,
  ClassApi,
} from 'flat-api';
import type { ExportSubmissionsReviewsAsExcelRequest } from 'flat-api';

async function example() {
  console.log("🚀 Testing flat-api SDK...");
  const config = new Configuration({ 
    // To configure OAuth2 access token for authorization: OAuth2 accessCode
    accessToken: "YOUR ACCESS TOKEN",
  });
  const api = new ClassApi(config);

  const body = {
    // string | Unique identifier of the class
    _class: _class_example,
    // string | Unique identifier of the assignment
    assignment: assignment_example,
  } satisfies ExportSubmissionsReviewsAsExcelRequest;

  try {
    const data = await api.exportSubmissionsReviewsAsExcel(body);
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
| **_class** | `string` | Unique identifier of the class | [Defaults to `undefined`] |
| **assignment** | `string` | Unique identifier of the assignment | [Defaults to `undefined`] |

### Return type

**Blob**

### Authorization

[OAuth2 accessCode](../README.md#OAuth2-accessCode)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/vnd.openxmlformats-officedocument.spreadsheetml.sheet`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | List of submissions |  -  |
| **0** | Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## getAssignment

> Assignment getAssignment(_class, assignment)

Get an assignment

Retrieve a single assignment, including its attachments, its toolset and its grading settings. Use &#x60;listAssignments&#x60; to enumerate the assignments of a class.  A teacher of the class sees the assignment as authored. A student sees the same document with the teacher-only fields omitted, &#x60;teacherInstructions&#x60; among them. 

### Example

```ts
import {
  Configuration,
  ClassApi,
} from 'flat-api';
import type { GetAssignmentRequest } from 'flat-api';

async function example() {
  console.log("🚀 Testing flat-api SDK...");
  const config = new Configuration({ 
    // To configure OAuth2 access token for authorization: OAuth2 accessCode
    accessToken: "YOUR ACCESS TOKEN",
  });
  const api = new ClassApi(config);

  const body = {
    // string | Unique identifier of the class
    _class: _class_example,
    // string | Unique identifier of the assignment
    assignment: assignment_example,
  } satisfies GetAssignmentRequest;

  try {
    const data = await api.getAssignment(body);
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
| **_class** | `string` | Unique identifier of the class | [Defaults to `undefined`] |
| **assignment** | `string` | Unique identifier of the assignment | [Defaults to `undefined`] |

### Return type

[**Assignment**](Assignment.md)

### Authorization

[OAuth2 accessCode](../README.md#OAuth2-accessCode)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | The assignment has been retrieved |  -  |
| **0** | Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## getClass

> ClassDetails getClass(_class)

Get the details of a single class

### Example

```ts
import {
  Configuration,
  ClassApi,
} from 'flat-api';
import type { GetClassRequest } from 'flat-api';

async function example() {
  console.log("🚀 Testing flat-api SDK...");
  const config = new Configuration({ 
    // To configure OAuth2 access token for authorization: OAuth2 accessCode
    accessToken: "YOUR ACCESS TOKEN",
  });
  const api = new ClassApi(config);

  const body = {
    // string | Unique identifier of the class
    _class: _class_example,
  } satisfies GetClassRequest;

  try {
    const data = await api.getClass(body);
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
| **_class** | `string` | Unique identifier of the class | [Defaults to `undefined`] |

### Return type

[**ClassDetails**](ClassDetails.md)

### Authorization

[OAuth2 accessCode](../README.md#OAuth2-accessCode)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | The new class details |  -  |
| **0** | Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## getScoreSubmissions

> Array&lt;AssignmentSubmission&gt; getScoreSubmissions(score)

List submissions related to the score

This API call will list the different assignments submissions where the score is attached. This method can be used by anyone who is part of the organization and has at least read access to the document. 

### Example

```ts
import {
  Configuration,
  ClassApi,
} from 'flat-api';
import type { GetScoreSubmissionsRequest } from 'flat-api';

async function example() {
  console.log("🚀 Testing flat-api SDK...");
  const config = new Configuration({ 
    // To configure OAuth2 access token for authorization: OAuth2 accessCode
    accessToken: "YOUR ACCESS TOKEN",
  });
  const api = new ClassApi(config);

  const body = {
    // string | Unique identifier of the score document. This can be a Flat Score unique identifier (i.e. `ScoreDetails.id`) or, if the score is also a Google Drive file, the Drive file unique identifier prefixed with `drive-` (e.g. `drive-0B000000000`). 
    score: score_example,
  } satisfies GetScoreSubmissionsRequest;

  try {
    const data = await api.getScoreSubmissions(body);
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
| **score** | `string` | Unique identifier of the score document. This can be a Flat Score unique identifier (i.e. &#x60;ScoreDetails.id&#x60;) or, if the score is also a Google Drive file, the Drive file unique identifier prefixed with &#x60;drive-&#x60; (e.g. &#x60;drive-0B000000000&#x60;).  | [Defaults to `undefined`] |

### Return type

[**Array&lt;AssignmentSubmission&gt;**](AssignmentSubmission.md)

### Authorization

[OAuth2 accessCode](../README.md#OAuth2-accessCode)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | List of submissions |  -  |
| **0** | Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## getSubmission

> AssignmentSubmission getSubmission(_class, assignment, submission)

Get a student submission

### Example

```ts
import {
  Configuration,
  ClassApi,
} from 'flat-api';
import type { GetSubmissionRequest } from 'flat-api';

async function example() {
  console.log("🚀 Testing flat-api SDK...");
  const config = new Configuration({ 
    // To configure OAuth2 access token for authorization: OAuth2 accessCode
    accessToken: "YOUR ACCESS TOKEN",
  });
  const api = new ClassApi(config);

  const body = {
    // string | Unique identifier of the class
    _class: _class_example,
    // string | Unique identifier of the assignment
    assignment: assignment_example,
    // string | Unique identifier of the submission
    submission: submission_example,
  } satisfies GetSubmissionRequest;

  try {
    const data = await api.getSubmission(body);
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
| **_class** | `string` | Unique identifier of the class | [Defaults to `undefined`] |
| **assignment** | `string` | Unique identifier of the assignment | [Defaults to `undefined`] |
| **submission** | `string` | Unique identifier of the submission | [Defaults to `undefined`] |

### Return type

[**AssignmentSubmission**](AssignmentSubmission.md)

### Authorization

[OAuth2 accessCode](../README.md#OAuth2-accessCode)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | A submission |  -  |
| **0** | Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## getSubmissionComments

> Array&lt;AssignmentSubmissionComment&gt; getSubmissionComments(_class, assignment, submission)

List the feedback comments of a submission

### Example

```ts
import {
  Configuration,
  ClassApi,
} from 'flat-api';
import type { GetSubmissionCommentsRequest } from 'flat-api';

async function example() {
  console.log("🚀 Testing flat-api SDK...");
  const config = new Configuration({ 
    // To configure OAuth2 access token for authorization: OAuth2 accessCode
    accessToken: "YOUR ACCESS TOKEN",
  });
  const api = new ClassApi(config);

  const body = {
    // string | Unique identifier of the class
    _class: _class_example,
    // string | Unique identifier of the assignment
    assignment: assignment_example,
    // string | Unique identifier of the submission
    submission: submission_example,
  } satisfies GetSubmissionCommentsRequest;

  try {
    const data = await api.getSubmissionComments(body);
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
| **_class** | `string` | Unique identifier of the class | [Defaults to `undefined`] |
| **assignment** | `string` | Unique identifier of the assignment | [Defaults to `undefined`] |
| **submission** | `string` | Unique identifier of the submission | [Defaults to `undefined`] |

### Return type

[**Array&lt;AssignmentSubmissionComment&gt;**](AssignmentSubmissionComment.md)

### Authorization

[OAuth2 accessCode](../README.md#OAuth2-accessCode)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | The comments of the submission |  -  |
| **403** | Not granted to access to this submission |  -  |
| **404** | Submission not found |  -  |
| **0** | Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## getSubmissionHistory

> Array&lt;AssignmentSubmissionHistory&gt; getSubmissionHistory(_class, assignment, submission)

Get the history of the submission

For teachers only. Returns a detailed history of the submission. This currently includes state and grade histories. 

### Example

```ts
import {
  Configuration,
  ClassApi,
} from 'flat-api';
import type { GetSubmissionHistoryRequest } from 'flat-api';

async function example() {
  console.log("🚀 Testing flat-api SDK...");
  const config = new Configuration({ 
    // To configure OAuth2 access token for authorization: OAuth2 accessCode
    accessToken: "YOUR ACCESS TOKEN",
  });
  const api = new ClassApi(config);

  const body = {
    // string | Unique identifier of the class
    _class: _class_example,
    // string | Unique identifier of the assignment
    assignment: assignment_example,
    // string | Unique identifier of the submission
    submission: submission_example,
  } satisfies GetSubmissionHistoryRequest;

  try {
    const data = await api.getSubmissionHistory(body);
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
| **_class** | `string` | Unique identifier of the class | [Defaults to `undefined`] |
| **assignment** | `string` | Unique identifier of the assignment | [Defaults to `undefined`] |
| **submission** | `string` | Unique identifier of the submission | [Defaults to `undefined`] |

### Return type

[**Array&lt;AssignmentSubmissionHistory&gt;**](AssignmentSubmissionHistory.md)

### Authorization

[OAuth2 accessCode](../README.md#OAuth2-accessCode)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | The history of the submission |  -  |
| **403** | Not granted to access to this submission |  -  |
| **404** | Submission not found |  -  |
| **0** | Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## getSubmissions

> Array&lt;AssignmentSubmission&gt; getSubmissions(_class, assignment)

List the students\&#39; submissions

### Example

```ts
import {
  Configuration,
  ClassApi,
} from 'flat-api';
import type { GetSubmissionsRequest } from 'flat-api';

async function example() {
  console.log("🚀 Testing flat-api SDK...");
  const config = new Configuration({ 
    // To configure OAuth2 access token for authorization: OAuth2 accessCode
    accessToken: "YOUR ACCESS TOKEN",
  });
  const api = new ClassApi(config);

  const body = {
    // string | Unique identifier of the class
    _class: _class_example,
    // string | Unique identifier of the assignment
    assignment: assignment_example,
  } satisfies GetSubmissionsRequest;

  try {
    const data = await api.getSubmissions(body);
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
| **_class** | `string` | Unique identifier of the class | [Defaults to `undefined`] |
| **assignment** | `string` | Unique identifier of the assignment | [Defaults to `undefined`] |

### Return type

[**Array&lt;AssignmentSubmission&gt;**](AssignmentSubmission.md)

### Authorization

[OAuth2 accessCode](../README.md#OAuth2-accessCode)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | The submissions |  -  |
| **0** | Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## listAssignments

> Array&lt;ClassAssignment&gt; listAssignments(_class)

Assignments listing

### Example

```ts
import {
  Configuration,
  ClassApi,
} from 'flat-api';
import type { ListAssignmentsRequest } from 'flat-api';

async function example() {
  console.log("🚀 Testing flat-api SDK...");
  const config = new Configuration({ 
    // To configure OAuth2 access token for authorization: OAuth2 accessCode
    accessToken: "YOUR ACCESS TOKEN",
  });
  const api = new ClassApi(config);

  const body = {
    // string | Unique identifier of the class
    _class: _class_example,
  } satisfies ListAssignmentsRequest;

  try {
    const data = await api.listAssignments(body);
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
| **_class** | `string` | Unique identifier of the class | [Defaults to `undefined`] |

### Return type

[**Array&lt;ClassAssignment&gt;**](ClassAssignment.md)

### Authorization

[OAuth2 accessCode](../README.md#OAuth2-accessCode)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | List of assignments for the class |  -  |
| **0** | Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## listClassStudentSubmissions

> Array&lt;AssignmentSubmission&gt; listClassStudentSubmissions(_class, user)

List the submissions for a student

Use this method as a teacher to list all the assignment submissions sent by a student of the class 

### Example

```ts
import {
  Configuration,
  ClassApi,
} from 'flat-api';
import type { ListClassStudentSubmissionsRequest } from 'flat-api';

async function example() {
  console.log("🚀 Testing flat-api SDK...");
  const config = new Configuration({ 
    // To configure OAuth2 access token for authorization: OAuth2 accessCode
    accessToken: "YOUR ACCESS TOKEN",
  });
  const api = new ClassApi(config);

  const body = {
    // string | Unique identifier of the class
    _class: _class_example,
    // string | Unique identifier of the user
    user: user_example,
  } satisfies ListClassStudentSubmissionsRequest;

  try {
    const data = await api.listClassStudentSubmissions(body);
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
| **_class** | `string` | Unique identifier of the class | [Defaults to `undefined`] |
| **user** | `string` | Unique identifier of the user | [Defaults to `undefined`] |

### Return type

[**Array&lt;AssignmentSubmission&gt;**](AssignmentSubmission.md)

### Authorization

[OAuth2 accessCode](../README.md#OAuth2-accessCode)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | The list of submissions |  -  |
| **0** | Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## listClasses

> Array&lt;ClassDetails&gt; listClasses(state)

List the classes available for the current user

### Example

```ts
import {
  Configuration,
  ClassApi,
} from 'flat-api';
import type { ListClassesRequest } from 'flat-api';

async function example() {
  console.log("🚀 Testing flat-api SDK...");
  const config = new Configuration({ 
    // To configure OAuth2 access token for authorization: OAuth2 accessCode
    accessToken: "YOUR ACCESS TOKEN",
  });
  const api = new ClassApi(config);

  const body = {
    // 'active' | 'inactive' | 'archived' | Filter the classes by state (optional)
    state: state_example,
  } satisfies ListClassesRequest;

  try {
    const data = await api.listClasses(body);
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
| **state** | `active`, `inactive`, `archived` | Filter the classes by state | [Optional] [Defaults to `&#39;active&#39;`] [Enum: active, inactive, archived] |

### Return type

[**Array&lt;ClassDetails&gt;**](ClassDetails.md)

### Authorization

[OAuth2 accessCode](../README.md#OAuth2-accessCode)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | The list of classes |  -  |
| **0** | Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## postSubmissionComment

> AssignmentSubmissionComment postSubmissionComment(_class, assignment, submission, assignmentSubmissionCommentCreation)

Add a feedback comment to a submission

### Example

```ts
import {
  Configuration,
  ClassApi,
} from 'flat-api';
import type { PostSubmissionCommentRequest } from 'flat-api';

async function example() {
  console.log("🚀 Testing flat-api SDK...");
  const config = new Configuration({ 
    // To configure OAuth2 access token for authorization: OAuth2 accessCode
    accessToken: "YOUR ACCESS TOKEN",
  });
  const api = new ClassApi(config);

  const body = {
    // string | Unique identifier of the class
    _class: _class_example,
    // string | Unique identifier of the assignment
    assignment: assignment_example,
    // string | Unique identifier of the submission
    submission: submission_example,
    // AssignmentSubmissionCommentCreation
    assignmentSubmissionCommentCreation: ...,
  } satisfies PostSubmissionCommentRequest;

  try {
    const data = await api.postSubmissionComment(body);
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
| **_class** | `string` | Unique identifier of the class | [Defaults to `undefined`] |
| **assignment** | `string` | Unique identifier of the assignment | [Defaults to `undefined`] |
| **submission** | `string` | Unique identifier of the submission | [Defaults to `undefined`] |
| **assignmentSubmissionCommentCreation** | [AssignmentSubmissionCommentCreation](AssignmentSubmissionCommentCreation.md) |  | |

### Return type

[**AssignmentSubmissionComment**](AssignmentSubmissionComment.md)

### Authorization

[OAuth2 accessCode](../README.md#OAuth2-accessCode)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | The comment |  -  |
| **403** | Not granted to access to this submission |  -  |
| **404** | Submission not found |  -  |
| **0** | Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## unarchiveAssignment

> Assignment unarchiveAssignment(_class, assignment)

Unarchive the assignment.

Mark the assignment as &#x60;active&#x60;. 

### Example

```ts
import {
  Configuration,
  ClassApi,
} from 'flat-api';
import type { UnarchiveAssignmentRequest } from 'flat-api';

async function example() {
  console.log("🚀 Testing flat-api SDK...");
  const config = new Configuration({ 
    // To configure OAuth2 access token for authorization: OAuth2 accessCode
    accessToken: "YOUR ACCESS TOKEN",
  });
  const api = new ClassApi(config);

  const body = {
    // string | Unique identifier of the class
    _class: _class_example,
    // string | Unique identifier of the assignment
    assignment: assignment_example,
  } satisfies UnarchiveAssignmentRequest;

  try {
    const data = await api.unarchiveAssignment(body);
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
| **_class** | `string` | Unique identifier of the class | [Defaults to `undefined`] |
| **assignment** | `string` | Unique identifier of the assignment | [Defaults to `undefined`] |

### Return type

[**Assignment**](Assignment.md)

### Authorization

[OAuth2 accessCode](../README.md#OAuth2-accessCode)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | The assignment details |  -  |
| **0** | Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## unarchiveClass

> ClassDetails unarchiveClass(_class)

Unarchive the class

Mark the class as &#x60;active&#x60;. When this course is synchronized with another app, like Google Classroom, this state will automatically be updated. 

### Example

```ts
import {
  Configuration,
  ClassApi,
} from 'flat-api';
import type { UnarchiveClassRequest } from 'flat-api';

async function example() {
  console.log("🚀 Testing flat-api SDK...");
  const config = new Configuration({ 
    // To configure OAuth2 access token for authorization: OAuth2 accessCode
    accessToken: "YOUR ACCESS TOKEN",
  });
  const api = new ClassApi(config);

  const body = {
    // string | Unique identifier of the class
    _class: _class_example,
  } satisfies UnarchiveClassRequest;

  try {
    const data = await api.unarchiveClass(body);
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
| **_class** | `string` | Unique identifier of the class | [Defaults to `undefined`] |

### Return type

[**ClassDetails**](ClassDetails.md)

### Authorization

[OAuth2 accessCode](../README.md#OAuth2-accessCode)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | The class details |  -  |
| **0** | Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## updateClass

> ClassDetails updateClass(_class, body)

Update the class

Update the meta information of the class 

### Example

```ts
import {
  Configuration,
  ClassApi,
} from 'flat-api';
import type { UpdateClassRequest } from 'flat-api';

async function example() {
  console.log("🚀 Testing flat-api SDK...");
  const config = new Configuration({ 
    // To configure OAuth2 access token for authorization: OAuth2 accessCode
    accessToken: "YOUR ACCESS TOKEN",
  });
  const api = new ClassApi(config);

  const body = {
    // string | Unique identifier of the class
    _class: _class_example,
    // ClassUpdate | Details of the Class
    body: ...,
  } satisfies UpdateClassRequest;

  try {
    const data = await api.updateClass(body);
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
| **_class** | `string` | Unique identifier of the class | [Defaults to `undefined`] |
| **body** | [ClassUpdate](ClassUpdate.md) | Details of the Class | |

### Return type

[**ClassDetails**](ClassDetails.md)

### Authorization

[OAuth2 accessCode](../README.md#OAuth2-accessCode)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | The new class details |  -  |
| **0** | Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## updateClassAssignment

> Assignment updateClassAssignment(_class, assignment, body)

Update an assignment

Update an assignment. Only the properties present in the request body are modified, so a partial body leaves everything else as it was. &#x60;attachments&#x60; is the exception: when present it replaces the whole list.  Requires the teacher role on the class. The class must not be archived, and an assignment that is already &#x60;active&#x60; cannot be moved back to &#x60;draft&#x60;.  Editing an assignment that students have already started does not reset their submissions. To take an assignment out of circulation while keeping the work, use &#x60;archiveAssignment&#x60;. 

### Example

```ts
import {
  Configuration,
  ClassApi,
} from 'flat-api';
import type { UpdateClassAssignmentRequest } from 'flat-api';

async function example() {
  console.log("🚀 Testing flat-api SDK...");
  const config = new Configuration({ 
    // To configure OAuth2 access token for authorization: OAuth2 accessCode
    accessToken: "YOUR ACCESS TOKEN",
  });
  const api = new ClassApi(config);

  const body = {
    // string | Unique identifier of the class
    _class: _class_example,
    // string | Unique identifier of the assignment
    assignment: assignment_example,
    // ClassAssignmentUpdate
    body: ...,
  } satisfies UpdateClassAssignmentRequest;

  try {
    const data = await api.updateClassAssignment(body);
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
| **_class** | `string` | Unique identifier of the class | [Defaults to `undefined`] |
| **assignment** | `string` | Unique identifier of the assignment | [Defaults to `undefined`] |
| **body** | [ClassAssignmentUpdate](ClassAssignmentUpdate.md) |  | |

### Return type

[**Assignment**](Assignment.md)

### Authorization

[OAuth2 accessCode](../README.md#OAuth2-accessCode)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | The assignment has been updated |  -  |
| **0** | Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## updateSubmissionComment

> AssignmentSubmissionComment updateSubmissionComment(_class, assignment, submission, comment, assignmentSubmissionCommentCreation)

Update a feedback comment to a submission

### Example

```ts
import {
  Configuration,
  ClassApi,
} from 'flat-api';
import type { UpdateSubmissionCommentRequest } from 'flat-api';

async function example() {
  console.log("🚀 Testing flat-api SDK...");
  const config = new Configuration({ 
    // To configure OAuth2 access token for authorization: OAuth2 accessCode
    accessToken: "YOUR ACCESS TOKEN",
  });
  const api = new ClassApi(config);

  const body = {
    // string | Unique identifier of the class
    _class: _class_example,
    // string | Unique identifier of the assignment
    assignment: assignment_example,
    // string | Unique identifier of the submission
    submission: submission_example,
    // string | Unique identifier of the comment
    comment: comment_example,
    // AssignmentSubmissionCommentCreation
    assignmentSubmissionCommentCreation: ...,
  } satisfies UpdateSubmissionCommentRequest;

  try {
    const data = await api.updateSubmissionComment(body);
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
| **_class** | `string` | Unique identifier of the class | [Defaults to `undefined`] |
| **assignment** | `string` | Unique identifier of the assignment | [Defaults to `undefined`] |
| **submission** | `string` | Unique identifier of the submission | [Defaults to `undefined`] |
| **comment** | `string` | Unique identifier of the comment | [Defaults to `undefined`] |
| **assignmentSubmissionCommentCreation** | [AssignmentSubmissionCommentCreation](AssignmentSubmissionCommentCreation.md) |  | |

### Return type

[**AssignmentSubmissionComment**](AssignmentSubmissionComment.md)

### Authorization

[OAuth2 accessCode](../README.md#OAuth2-accessCode)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | The comment |  -  |
| **403** | Not granted to access to this submission |  -  |
| **404** | Submission not found |  -  |
| **0** | Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

