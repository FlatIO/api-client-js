# FlatApi.AssignmentSubmission

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **String** | Unique identifier of the submission | [optional] 
**classroom** | **String** | Unique identifier of the classroom where the assignment was posted  | [optional] 
**assignment** | **String** | Unique identifier of the assignment | [optional] 
**creator** | **String** | The User identifier of the student who created the submission | [optional] 
**creationDate** | **String** | The date when the submission was created | [optional] 
**attachments** | [**[MediaAttachment]**](MediaAttachment.md) |  | [optional] 
**submissionDate** | **String** | The date when the student submitted his work | [optional] 
**studentComment** | **String** | An optionnal comment sent by the student when submitting his work  | [optional] 
**returnDate** | **String** | The date when the teacher returned the work | [optional] 
**returnFeedback** | **String** | The feedback associated with the return | [optional] 
**returnCreator** | **String** | The User unique identifier of the teacher who returned the submission  | [optional] 
**googleClassroom** | [**GoogleClassroomSubmission**](GoogleClassroomSubmission.md) |  | [optional] 


