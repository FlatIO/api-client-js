# FlatApi.ResourceCollaborator

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**aclRead** | **Boolean** | &#x60;True&#x60; if the current user can read the current document  | [optional] [default to false]
**aclWrite** | **Boolean** | &#x60;True&#x60; if the current user can modify the current document.  If this is a right of a Collection, the capabilities of the associated user can be lower than this permission, check out the &#x60;capabilities&#x60; property as the end-user to have the complete possibilities with the collection.  | [optional] [default to false]
**aclAdmin** | **Boolean** | &#x60;True&#x60; if the current user can manage the current document (i.e. share, delete)  If this is a right of a Collection, the capabilities of the associated user can be lower than this permission, check out the &#x60;capabilities&#x60; property as the end-user to have the complete possibilities with the collection.  | [optional] [default to false]
**isCollaborator** | **Boolean** | &#x60;True&#x60; if the current user is a collaborator of the current document (direct or via group).  | [optional] [default to false]
**id** | **String** | The unique identifier of the permission | [optional] 
**score** | **String** | If this object is a permission of a score, this property will contain the unique identifier of the score | [optional] 
**collection** | **String** | If this object is a permission of a collection, this property will contain the unique identifier of the collection | [optional] 
**user** | [**UserPublic**](UserPublic.md) |  | [optional] 
**group** | [**Group**](Group.md) |  | [optional] 
**userEmail** | **String** | If the collaborator is not a user of Flat yet, this field will contain his email.  | [optional] 


