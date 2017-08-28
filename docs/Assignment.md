# FlatApi.Assignment

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**state** | **String** | State of the assignment | [optional] 
**title** | **String** | Title of the assignment | [optional] 
**classroom** | **String** | The unique identifier of the class where this assignment was posted | [optional] 
**description** | **String** | Description and content of the assignment | [optional] 
**attachments** | [**[MediaAttachment]**](MediaAttachment.md) |  | [optional] 
**submissions** | [**[AssignmentSubmission]**](AssignmentSubmission.md) |  | [optional] 
**creator** | **String** | The User unique identifier of the creator of this assignment  | [optional] 
**creationDate** | **Date** | The creation date of this assignment | [optional] 
**scheduledDate** | **Date** | The publication (scheduled) date of the assignment. If this one is specified, the assignment will only be listed to the teachers of the class.  | [optional] 
**dueDate** | **Date** | The due date of this assignment, late submissions will be marked as paste due.  | [optional] 
**googleClassroom** | [**GoogleClassroomCoursework**](GoogleClassroomCoursework.md) |  | [optional] 


<a name="StateEnum"></a>
## Enum: StateEnum


* `draft` (value: `"draft"`)

* `active` (value: `"active"`)

* `archived` (value: `"archived"`)




