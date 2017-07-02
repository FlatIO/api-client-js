# FlatApi.ClassDetails

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **String** | The unique identifier of the class | [optional] 
**state** | [**ClassState**](ClassState.md) |  | [optional] 
**name** | **String** | The name of the class | [optional] 
**section** | **String** | The section of the class | [optional] 
**description** | **String** | An optionnal description for this class | [optional] 
**organization** | **String** | The unique identifier of the Organization owning this class | [optional] 
**owner** | **String** | The unique identifier of the User owning this class | [optional] 
**creationDate** | **Date** | The date when the class was create | [optional] 
**enrollmentCode** | **String** | [Teachers only] The enrollment code that can be used by the students to join the class  | [optional] 
**theme** | **String** | The theme identifier using in Flat User Interface | [optional] 
**assignmentsCount** | **Number** | The number of assignments created in the class | [optional] 
**studentsGroup** | [**GroupDetails**](GroupDetails.md) |  | [optional] 
**teachersGroup** | [**GroupDetails**](GroupDetails.md) |  | [optional] 
**googleClassroom** | [**ClassDetailsGoogleClassroom**](ClassDetailsGoogleClassroom.md) |  | [optional] 
**googleDrive** | [**ClassDetailsGoogleDrive**](ClassDetailsGoogleDrive.md) |  | [optional] 
**lti** | [**ClassDetailsLti**](ClassDetailsLti.md) |  | [optional] 
**canvas** | [**ClassDetailsCanvas**](ClassDetailsCanvas.md) |  | [optional] 


