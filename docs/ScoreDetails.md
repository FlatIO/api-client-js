# FlatApi.ScoreDetails

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**rights** | [**ScoreRights**](ScoreRights.md) |  | [optional] 
**collaborators** | [**[ScoreCollaborator]**](ScoreCollaborator.md) | The list of the collaborators of the score | [optional] 
**creationDate** | **Date** | The date when the score was created | [optional] 
**modificationDate** | **Date** | The date of the last revision of the score | [optional] 
**organization** | **String** | If the score has been created in an organization, the identifier of this organization. This property is especially used with the score privacy &#x60;organizationPublic&#x60;.  | [optional] 
**parentScore** | **String** | If the score has been forked, the unique identifier of the parent score.  | [optional] 
**instruments** | **[String]** | An array of the instrument identifiers used in the last version of the score. This is mainly used to display a list of the instruments in the Flat&#39;s UI or instruments icons. The format of the strings is &#x60;{instrument-group}.{instrument-id}&#x60;.  | [optional] 
**googleDriveFileId** | **String** | If the user uses Google Drive and the score exists on Google Drive, this field will contain the unique identifier of the Flat score on Google Drive. You can access the document using the url: &#x60;https://drive.google.com/open?id&#x3D;{googleDriveFileId}&#x60;  | [optional] 
**likes** | [**ScoreLikesCounts**](ScoreLikesCounts.md) |  | [optional] 
**comments** | [**ScoreCommentsCounts**](ScoreCommentsCounts.md) |  | [optional] 
**views** | [**ScoreViewsCounts**](ScoreViewsCounts.md) |  | [optional] 


