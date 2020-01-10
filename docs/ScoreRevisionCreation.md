# FlatApi.ScoreRevisionCreation

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**data** | **String** | The data of the score file. It must be a MusicXML 3 file (&#x60;vnd.recordare.musicxml&#x60; or &#x60;vnd.recordare.musicxml+xml&#x60;), a MIDI file (&#x60;audio/midi&#x60;) or a Flat.json (aka Adagio.json) file. Binary payloads (&#x60;vnd.recordare.musicxml&#x60; and &#x60;audio/midi&#x60;) can be encoded in Base64, in this case the &#x60;dataEncoding&#x60; property must match the encoding used for the API request.  | 
**dataEncoding** | **String** | The optional encoding of the score data. This property must match the encoding used for the &#x60;data&#x60; property. | [optional] 
**autosave** | **Boolean** | Must be set to &#x60;true&#x60; if the revision was created automatically.  | [optional] 
**description** | **String** | A description associated to the revision | [optional] 



## Enum: DataEncodingEnum


* `base64` (value: `"base64"`)




