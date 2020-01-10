# FlatApi.ClassAttachmentCreation

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**type** | **String** | The type of the attachment posted | [optional] 
**score** | **String** | A unique Flat score identifier. The user creating the assignment must at least have read access to the document. If the user has admin rights, new group permissions will be automatically added for the teachers and students of the class.  | [optional] 
**sharingMode** | [**MediaScoreSharingMode**](MediaScoreSharingMode.md) |  | [optional] 
**url** | **String** | The URL of the attachment. | [optional] 
**googleDriveFileId** | **String** | The ID of the Google Drive File | [optional] 



## Enum: TypeEnum


* `flat` (value: `"flat"`)

* `link` (value: `"link"`)

* `googleDrive` (value: `"googleDrive"`)

* `exercise` (value: `"exercise"`)




