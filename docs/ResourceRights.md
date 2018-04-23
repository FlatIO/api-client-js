# FlatApi.ResourceRights

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**aclRead** | **Boolean** | &#x60;True&#x60; if the current user can read the current document  | [optional] [default to false]
**aclWrite** | **Boolean** | &#x60;True&#x60; if the current user can modify the current document.  If this is a right of a Collection, the capabilities of the associated user can be lower than this permission, check out the &#x60;capabilities&#x60; property as the end-user to have the complete possibilities with the collection.  | [optional] [default to false]
**aclAdmin** | **Boolean** | &#x60;True&#x60; if the current user can manage the current document (i.e. share, delete)  If this is a right of a Collection, the capabilities of the associated user can be lower than this permission, check out the &#x60;capabilities&#x60; property as the end-user to have the complete possibilities with the collection.  | [optional] [default to false]


