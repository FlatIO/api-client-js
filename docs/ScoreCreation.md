# FlatApi.ScoreCreation

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**title** | **String** | The title of the new score.  If this title is not specified, the API will try to (in this order):   - Use the name of the file for files from a specified &#x60;source&#x60; (e.g. Google Drive)   - Use the title contained in the file (e.g. [&#x60;movement-title&#x60;](https://usermanuals.musicxml.com/MusicXML/Content/EL-MusicXML-movement-title.htm) or [&#x60;credit-words&#x60;](https://usermanuals.musicxml.com/MusicXML/Content/EL-MusicXML-credit-words.htm) for [MusicXML](http://www.musicxml.com/) files).   - Set a default title (e.g. \&quot;New Music Score\&quot;)  If the title is already used, the API will append the creation date after the title. If the title is too long, the API may trim this one.  | [optional] 
**privacy** | [**ScorePrivacy**](ScorePrivacy.md) |  | 
**data** | [**ScoreData**](ScoreData.md) |  | [optional] 
**dataEncoding** | [**ScoreDataEncoding**](ScoreDataEncoding.md) |  | [optional] 
**source** | [**ScoreSource**](ScoreSource.md) |  | [optional] 
**googleDriveFolder** | **String** | If the user uses Google Drive and this properties is specified, the file will be created in this directory. The currently user creating the file must be granted to write in this directory.  | [optional] 


