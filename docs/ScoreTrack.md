# FlatApi.ScoreTrack

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **String** | The unique identifier of the score track | [optional] 
**title** | **String** | Title of the track | [optional] 
**score** | **String** | The unique identifier of the score | [optional] 
**creator** | **String** | The unique identifier of the track creator | [optional] 
**creationDate** | **Date** | The creation date of the track | [optional] 
**modificationDate** | **Date** | The modification date of the track | [optional] 
**_default** | **Boolean** | True if the track should be used as default audio source | [optional] 
**state** | [**ScoreTrackState**](ScoreTrackState.md) |  | [optional] 
**type** | [**ScoreTrackType**](ScoreTrackType.md) |  | [optional] 
**url** | **String** | The URL of the track | [optional] 
**mediaId** | **String** | The unique identifier of the track when hosted on an external service. For example, if the url is &#x60;https://www.youtube.com/watch?v&#x3D;dQw4w9WgXcQ&#x60;, &#x60;mediaId&#x60; will be &#x60;dQw4w9WgXcQ&#x60;  | [optional] 
**synchronizationPoints** | [**[ScoreTrackPoint]**](ScoreTrackPoint.md) |  | [optional] 


