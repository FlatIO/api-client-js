# JavaScript (Browser & Node.js) Client for the Flat REST API

[![Build Status](https://img.shields.io/travis/FlatIO/api-client-js.svg?style=flat)](https://travis-ci.org/FlatIO/api-client-js)
[![Greenkeeper badge](https://badges.greenkeeper.io/FlatIO/api-client-js.svg)](https://greenkeeper.io/)
[![NPM Version](https://img.shields.io/npm/v/flat-api.svg?style=flat)](https://www.npmjs.org/package/flat-api)
![Bower Version](https://img.shields.io/bower/v/flat-api.svg?style=flat)

The Flat API allows you to easily extend the abilities of the [Flat Platform](https://flat.io), with a wide range of use cases including the following:
- Creating and importing new music scores using MusicXML or MIDI files
- Browsing, updating, copying, exporting the user's scores (for example in MP3, WAV or MIDI)
- Managing educational resources with Flat for Education: creating & updating the organization accounts, the classes, rosters and assignments.

You can find the API reference including code samples and our OpenAPI Specification at the following url: [https://flat.io/developers/api/reference](https://flat.io/developers/api/reference).

To request some API credentials, please visit [https://flat.io/developers](https://flat.io/developers).

This JavaScript package is automatically generated by the [Swagger Codegen](https://github.com/swagger-api/swagger-codegen) project.

## Installation

### For [Node.js](https://nodejs.org/)

#### npm

```shell
$ npm install flat-api --save
```

#### git

```shell
$ npm install git://github.com/FlatIO/api-client-js --save
```

### For browser

### bower

```shell
$ bower install flat-api
```

### git / github

The library also works in the browser environment via npm and [browserify](http://browserify.org/).
A build is available in the `build` directory, you can also rebuild the library:

```shell
$ npm install -d && npm run build
$ ls -1 build
flat-api.js
flat-api.js.map
flat-api.min.js
```

Then include *bundle.js* in the HTML pages.

## Getting Started

Please follow the [installation](#installation) instruction and execute the following JS code:

```javascript
var FlatApi = require('flat-api');

// Configure OAuth2 access token for authorization
FlatApi.ApiClient.instance.authentications.OAuth2.accessToken = 'YOUR_ACCES_TOKEN';

var flatAccountApi = new FlatApi.AccountApi();
flatAccountApi.getAuthenticatedUser(function(error, data, response) {
  if (error) {
    console.error(error);
  }
  else {
    console.log('Successfully retrieved user profile: ', data);
  }
});
```

## Documentation for API Endpoints

All URIs are relative to *https://api.flat.io/v2*

Class | Method | HTTP request | Description
------------ | ------------- | ------------- | -------------
*FlatApi.AccountApi* | [**getAuthenticatedUser**](docs/AccountApi.md#getAuthenticatedUser) | **GET** /me | Get current user profile
*FlatApi.GroupApi* | [**getGroupScores**](docs/GroupApi.md#getGroupScores) | **GET** /groups/{group}/scores | List group&#39;s scores
*FlatApi.ScoreApi* | [**addScoreCollaborator**](docs/ScoreApi.md#addScoreCollaborator) | **POST** /scores/{score}/collaborators | Add a new collaborator
*FlatApi.ScoreApi* | [**createScore**](docs/ScoreApi.md#createScore) | **POST** /scores | Create a new score
*FlatApi.ScoreApi* | [**createScoreRevision**](docs/ScoreApi.md#createScoreRevision) | **POST** /scores/{score}/revisions | Create a new revision
*FlatApi.ScoreApi* | [**deleteScore**](docs/ScoreApi.md#deleteScore) | **DELETE** /scores/{score} | Delete a score
*FlatApi.ScoreApi* | [**deleteScoreComment**](docs/ScoreApi.md#deleteScoreComment) | **DELETE** /scores/{score}/comments/{comment} | Delete a comment
*FlatApi.ScoreApi* | [**editScore**](docs/ScoreApi.md#editScore) | **PUT** /scores/{score} | Edit a score&#39;s metadata
*FlatApi.ScoreApi* | [**forkScore**](docs/ScoreApi.md#forkScore) | **POST** /scores/{score}/fork | Fork a score
*FlatApi.ScoreApi* | [**gerUserLikes**](docs/ScoreApi.md#gerUserLikes) | **GET** /users/{user}/likes | List liked scores
*FlatApi.ScoreApi* | [**getGroupScores**](docs/ScoreApi.md#getGroupScores) | **GET** /groups/{group}/scores | List group&#39;s scores
*FlatApi.ScoreApi* | [**getScore**](docs/ScoreApi.md#getScore) | **GET** /scores/{score} | Get a score&#39;s metadata
*FlatApi.ScoreApi* | [**getScoreCollaborator**](docs/ScoreApi.md#getScoreCollaborator) | **GET** /scores/{score}/collaborators/{collaborator} | Get a collaborator
*FlatApi.ScoreApi* | [**getScoreCollaborators**](docs/ScoreApi.md#getScoreCollaborators) | **GET** /scores/{score}/collaborators | List the collaborators
*FlatApi.ScoreApi* | [**getScoreComments**](docs/ScoreApi.md#getScoreComments) | **GET** /scores/{score}/comments | List comments
*FlatApi.ScoreApi* | [**getScoreRevision**](docs/ScoreApi.md#getScoreRevision) | **GET** /scores/{score}/revisions/{revision} | Get a score revision
*FlatApi.ScoreApi* | [**getScoreRevisionData**](docs/ScoreApi.md#getScoreRevisionData) | **GET** /scores/{score}/revisions/{revision}/{format} | Get a score revision data
*FlatApi.ScoreApi* | [**getScoreRevisions**](docs/ScoreApi.md#getScoreRevisions) | **GET** /scores/{score}/revisions | List the revisions
*FlatApi.ScoreApi* | [**getUserScores**](docs/ScoreApi.md#getUserScores) | **GET** /users/{user}/scores | List user&#39;s scores
*FlatApi.ScoreApi* | [**markScoreCommentResolved**](docs/ScoreApi.md#markScoreCommentResolved) | **PUT** /scores/{score}/comments/{comment}/resolved | Mark the comment as resolved
*FlatApi.ScoreApi* | [**markScoreCommentUnresolved**](docs/ScoreApi.md#markScoreCommentUnresolved) | **DELETE** /scores/{score}/comments/{comment}/resolved | Mark the comment as unresolved
*FlatApi.ScoreApi* | [**postScoreComment**](docs/ScoreApi.md#postScoreComment) | **POST** /scores/{score}/comments | Post a new comment
*FlatApi.ScoreApi* | [**removeScoreCollaborator**](docs/ScoreApi.md#removeScoreCollaborator) | **DELETE** /scores/{score}/collaborators/{collaborator} | Delete a collaborator
*FlatApi.ScoreApi* | [**updateScoreComment**](docs/ScoreApi.md#updateScoreComment) | **PUT** /scores/{score}/comments/{comment} | Update an existing comment
*FlatApi.UserApi* | [**gerUserLikes**](docs/UserApi.md#gerUserLikes) | **GET** /users/{user}/likes | List liked scores
*FlatApi.UserApi* | [**getUser**](docs/UserApi.md#getUser) | **GET** /users/{user} | Get a public user profile
*FlatApi.UserApi* | [**getUserScores**](docs/UserApi.md#getUserScores) | **GET** /users/{user}/scores | List user&#39;s scores


## Documentation for Models

 - [FlatApi.ClassRoles](docs/ClassRoles.md)
 - [FlatApi.FlatErrorResponse](docs/FlatErrorResponse.md)
 - [FlatApi.FlatLocales](docs/FlatLocales.md)
 - [FlatApi.Group](docs/Group.md)
 - [FlatApi.OrganizationRoles](docs/OrganizationRoles.md)
 - [FlatApi.ScoreCollaborator](docs/ScoreCollaborator.md)
 - [FlatApi.ScoreCollaboratorCreation](docs/ScoreCollaboratorCreation.md)
 - [FlatApi.ScoreComment](docs/ScoreComment.md)
 - [FlatApi.ScoreCommentContext](docs/ScoreCommentContext.md)
 - [FlatApi.ScoreCommentCreation](docs/ScoreCommentCreation.md)
 - [FlatApi.ScoreCommentUpdate](docs/ScoreCommentUpdate.md)
 - [FlatApi.ScoreCommentsCounts](docs/ScoreCommentsCounts.md)
 - [FlatApi.ScoreCreation](docs/ScoreCreation.md)
 - [FlatApi.ScoreData](docs/ScoreData.md)
 - [FlatApi.ScoreDataEncoding](docs/ScoreDataEncoding.md)
 - [FlatApi.ScoreDetails](docs/ScoreDetails.md)
 - [FlatApi.ScoreFork](docs/ScoreFork.md)
 - [FlatApi.ScoreLikesCounts](docs/ScoreLikesCounts.md)
 - [FlatApi.ScoreModification](docs/ScoreModification.md)
 - [FlatApi.ScorePrivacy](docs/ScorePrivacy.md)
 - [FlatApi.ScoreRevision](docs/ScoreRevision.md)
 - [FlatApi.ScoreRevisionCreation](docs/ScoreRevisionCreation.md)
 - [FlatApi.ScoreRevisionStatistics](docs/ScoreRevisionStatistics.md)
 - [FlatApi.ScoreRights](docs/ScoreRights.md)
 - [FlatApi.ScoreSource](docs/ScoreSource.md)
 - [FlatApi.ScoreSummary](docs/ScoreSummary.md)
 - [FlatApi.ScoreViewsCounts](docs/ScoreViewsCounts.md)
 - [FlatApi.UserBasics](docs/UserBasics.md)
 - [FlatApi.UserDetails](docs/UserDetails.md)
 - [FlatApi.UserPublic](docs/UserPublic.md)
 - [FlatApi.UserPublicSummary](docs/UserPublicSummary.md)

### OAuth2

- **Type**: OAuth
- **Flow**: accessCode
- **Authorization URL**: https://flat.io/auth/oauth
- **Scopes**:
  - account.public_profile: Provides access to the basic person&#39;s public profile. Education profiles may be anonymized with this scope, you can request the scope &#x60;education_profile&#x60; to access to the a basic education account profile.
  - account.education_profile: Provides access to the basic person&#39;s education profile and public organization information.
  - scores.readonly: Allows read-only access to all a user&#39;s scores. You won&#39;t need this scope to read public scores.
  - scores.social: Allow to post comments and like scores
  - scores: Full, permissive scope to access all of a user&#39;s scores.

## Author

Flat - developers@flat.io
