/**
 * Flat API
 * # Introduction The Flat API allows you to easily extend the abilities of the [Flat Platform](https://flat.io), with a wide range of use cases including the following:     - Creating and importing new music scores using MusicXML or MIDI files    - Browsing, updating, copying, exporting the user's scores (for example in MP3, WAV or MIDI)    - Managing educational resources with Flat for Education: creating & updating the organization accounts, the classes, rosters and assignments.  The Flat API is built on HTTP. Our API is RESTful It has predictable resource URLs. It returns HTTP response codes to indicate errors. It also accepts and returns JSON in the HTTP body. The [schema](/swagger.yaml) of this API follows the [OpenAPI Initiative (OAI) specification](https://www.openapis.org/), you can use and work with [compatible Swagger tools](http://swagger.io/open-source-integrations/).  You can use your favorite HTTP/REST library for your programming language to use Flat's API. This specification and reference is [available on Github](https://github.com/FlatIO/api-reference).  # Beta Please note that this public API is currently in beta and subject to change.  Our whole platform and apps are based on this API, however not all the endpoints are available publicly yet. Feel free to [contact us](mailto:developers@flat.io) if you have any questions, feedback or features requests.  We don't offer any guarantees during this beta period. By using this API, you agree to update your app in a timely fashion in response to any beta-period changes that are rolled out.  By using this API, and especially on the behalf of a user account, you must accept, respect and enforce our [Terms of Service and Privacy Policy](https://flat.io/legal).  # SDKs  Our team maintain the following SDKs:   - [https://github.com/FlatIO/api-client-python](Python)  # Authentication The Flat API supports OAuth2, you can request API credentials [on our website](https://flat.io/developers). We provide two types of credentials:    - **Account Access Tokens**: Simple access tokens that allow to try and use this API **with your own account**. This is a great solution to create private apps.   - **OAuth2 Credentials**: If you plan to use the Flat API **on the behalf of mutliple users** or make this app public, request OAuth2 Credentials.  <!-- ReDoc-Inject: <security-definitions> -->  ### OAuth2 Authorization page  The Authorization page (`https://flat.io/auth/oauth`) supports all the standard parameters from the **Authorization Code** flow ([RFC6749/4.1.1](https://tools.ietf.org/html/rfc6749#section-4.1.1)) and the **Implicit** flow ([RFC6749/4.2.1](https://tools.ietf.org/html/rfc6749#section-4.2.1)). Here is a summary of the parameters available, including non-standard and optional parameters. All of them can be passed as query string when redirecting the end-user to the authorization page.  Property name  | Required | Values and Description ---------------|----------|----------------------- `client_id`    | Required | The client id (aka key) from the couple key/secret provided by Flat `response_type`| Required | We support `code` (**Authorization Code** flow, [RFC6749/4.1.1](https://tools.ietf.org/html/rfc6749#section-4.1.1)) and `token`, [RFC6749/4.2.1](https://tools.ietf.org/html/rfc6749#section-4.2.1)). It is strongly advised to use the Authorization Code flow for any server-side usage and the Implicit flow for any client-side (e.g. JavaScript) usage. `scope`        | Required | You must provide a list of scopes listed above and granted for your app, separated with a space. `redirect_uri` | Required | Determines where the response is sent. The value of this parameter must exactly match the value specified in your App Credentials settings. `state`        | Optional | An opaque string that is round-tripped in the protocol; that is to say, it is returned as a URI parameter in the Basic flow, and in the URI #fragment in the Implicit flow. `access_type`  | Optional, only available for the Authorization Code flow | The acceptable values are `online` and `offline`. When specifying `offline`, the API will return a refresh token during the access token exchange.  ### OAuth2 tokens revocation  This OAuth2 API supports token revocation ([RFC 7009](http://tools.ietf.org/html/rfc7009)) at the following endpoint: `https://api.flat.io/oauth/invalidate_token`.  # CORS This API features Cross-Origin Resource Sharing (CORS) implemented in compliance with [W3C spec](https://www.w3.org/TR/cors/). And that allows cross-domain communication from the browser. All responses have a wildcard same-origin which makes them completely public and accessible to everyone, including any code on any site.  # Rate Limiting For authenticated requests, you can make up to 5,000 requests per hour. For unauthenticated requests, the rate limit allows you to make up to 500 requests per hour. Unauthenticated requests are associated with your IP address, and not the user or app making requests. You can contact us if you need [extra quota](https://flat.io/developers). To protect our quality of service, additional rate limits may apply to some API calls or actions.  You can check the returned HTTP headers of any API request to see your current rate limit status: ```bash curl -i https://api.flat.io/v2/me HTTP/1.1 200 OK Date: Sat, 25 Mar 2017 17:06:20 GMT X-RateLimit-Limit: 5000 X-RateLimit-Remaining: 4999 X-RateLimit-Reset: 1490465178 ```  The headers tell you everything you need to know about your current rate limit status:  Header name | Description ------------|------------ `X-RateLimit-Limit` | The maximum number of requests that the consumer is permitted to make per hour. `X-RateLimit-Remaining` | The number of requests remaining in the current rate limit window. This value can be negative if you try to go over the allowed quota. `X-RateLimit-Reset` | The time at which the current rate limit window resets in [UTC epoch seconds](http://en.wikipedia.org/wiki/Unix_time).  If you need the time in a different format, any modern programming language can get the job done. For example, if you open up the console on your web browser, you can easily get the reset time as a JavaScript Date object.  ```javascript new Date(1490465178 * 1000).toString() 'Sat Mar 25 2017 19:06:18 GMT+0100 (CET)' ```  Once you go over the rate limit you will receive an error response: ```bash curl -i https://api.flat.io/v2/me HTTP/1.1 403 Forbidden X-RateLimit-Limit: 5000 X-RateLimit-Remaining: 0 X-RateLimit-Reset: 1490465829  {   \"message\": \"API rate limit exceeded for xx.xxx.xxx.xx\",   \"code\": \"API_RATE_LIMIT_EXCEEDED\" } ``` 
 *
 * OpenAPI spec version: 2.0.0
 * Contact: developers@flat.io
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 *
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/FlatErrorResponse', 'model/ScoreCollaborator', 'model/ScoreCollaboratorCreation', 'model/ScoreComment', 'model/ScoreCommentCreation', 'model/ScoreCommentUpdate', 'model/ScoreCreation', 'model/ScoreDetails', 'model/ScoreFork', 'model/ScoreModification', 'model/ScoreRevision', 'model/ScoreRevisionCreation'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('../model/FlatErrorResponse'), require('../model/ScoreCollaborator'), require('../model/ScoreCollaboratorCreation'), require('../model/ScoreComment'), require('../model/ScoreCommentCreation'), require('../model/ScoreCommentUpdate'), require('../model/ScoreCreation'), require('../model/ScoreDetails'), require('../model/ScoreFork'), require('../model/ScoreModification'), require('../model/ScoreRevision'), require('../model/ScoreRevisionCreation'));
  } else {
    // Browser globals (root is window)
    if (!root.FlatApi) {
      root.FlatApi = {};
    }
    root.FlatApi.ScoreApi = factory(root.FlatApi.ApiClient, root.FlatApi.FlatErrorResponse, root.FlatApi.ScoreCollaborator, root.FlatApi.ScoreCollaboratorCreation, root.FlatApi.ScoreComment, root.FlatApi.ScoreCommentCreation, root.FlatApi.ScoreCommentUpdate, root.FlatApi.ScoreCreation, root.FlatApi.ScoreDetails, root.FlatApi.ScoreFork, root.FlatApi.ScoreModification, root.FlatApi.ScoreRevision, root.FlatApi.ScoreRevisionCreation);
  }
}(this, function(ApiClient, FlatErrorResponse, ScoreCollaborator, ScoreCollaboratorCreation, ScoreComment, ScoreCommentCreation, ScoreCommentUpdate, ScoreCreation, ScoreDetails, ScoreFork, ScoreModification, ScoreRevision, ScoreRevisionCreation) {
  'use strict';

  /**
   * Score service.
   * @module api/ScoreApi
   * @version 2.0.0
   */

  /**
   * Constructs a new ScoreApi. 
   * @alias module:api/ScoreApi
   * @class
   * @param {module:ApiClient} apiClient Optional API client implementation to use,
   * default to {@link module:ApiClient#instance} if unspecified.
   */
  var exports = function(apiClient) {
    this.apiClient = apiClient || ApiClient.instance;


    /**
     * Callback function to receive the result of the addScoreCollaborator operation.
     * @callback module:api/ScoreApi~addScoreCollaboratorCallback
     * @param {String} error Error message, if any.
     * @param {module:model/ScoreCollaborator} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Add a new collaborator
     * Share a score with a single user or a group. This API call allows to add, invite and update the collaborators of a document. - To add an existing Flat user to the document, specify its unique identifier in the &#x60;user&#x60; property. - To invite an external user to the document, specify its email in the &#x60;userEmail&#x60; property. - To add a Flat group to the document, specify its unique identifier in the &#x60;group&#x60; property. - To update an existing collaborator, process the same request with different rights. 
     * @param {String} score Unique identifier of the score document. This can be a Flat Score unique identifier (i.e. &#x60;ScoreDetails.id&#x60;) or, if the score is also a Google Drive file, the Drive file unique identifier prefixed with &#x60;drive-&#x60; (e.g. &#x60;drive-0B000000000&#x60;). 
     * @param {module:model/ScoreCollaboratorCreation} body 
     * @param {module:api/ScoreApi~addScoreCollaboratorCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/ScoreCollaborator}
     */
    this.addScoreCollaborator = function(score, body, callback) {
      var postBody = body;

      // verify the required parameter 'score' is set
      if (score == undefined || score == null) {
        throw new Error("Missing the required parameter 'score' when calling addScoreCollaborator");
      }

      // verify the required parameter 'body' is set
      if (body == undefined || body == null) {
        throw new Error("Missing the required parameter 'body' when calling addScoreCollaborator");
      }


      var pathParams = {
        'score': score
      };
      var queryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['OAuth2'];
      var contentTypes = ['application/json'];
      var accepts = ['application/json'];
      var returnType = ScoreCollaborator;

      return this.apiClient.callApi(
        '/scores/{score}/collaborators', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the createScore operation.
     * @callback module:api/ScoreApi~createScoreCallback
     * @param {String} error Error message, if any.
     * @param {module:model/ScoreDetails} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Create a new score
     * Use this API method to **create a new music score in the current User account**. You will need a MusicXML 3 (&#x60;vnd.recordare.musicxml&#x60; or &#x60;vnd.recordare.musicxml+xml&#x60;) or a MIDI (&#x60;audio/midi&#x60;) file to create the new Flat document.  This API call will automatically create the first revision of the document, the score can be modified by the using our web application or by uploading a new revision of this file (&#x60;POST /v2/scores/{score}/revisions/{revision}&#x60;).  The currently authenticated user will be granted owner of the file and will be able to add other collaborators (users and groups). 
     * @param {module:model/ScoreCreation} body 
     * @param {module:api/ScoreApi~createScoreCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/ScoreDetails}
     */
    this.createScore = function(body, callback) {
      var postBody = body;

      // verify the required parameter 'body' is set
      if (body == undefined || body == null) {
        throw new Error("Missing the required parameter 'body' when calling createScore");
      }


      var pathParams = {
      };
      var queryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['OAuth2'];
      var contentTypes = ['application/json'];
      var accepts = ['application/json'];
      var returnType = ScoreDetails;

      return this.apiClient.callApi(
        '/scores', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the createScoreRevision operation.
     * @callback module:api/ScoreApi~createScoreRevisionCallback
     * @param {String} error Error message, if any.
     * @param {module:model/ScoreRevision} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Create a new revision
     * Update a score by uploading a new revision for this one. 
     * @param {String} score Unique identifier of the score document. This can be a Flat Score unique identifier (i.e. &#x60;ScoreDetails.id&#x60;) or, if the score is also a Google Drive file, the Drive file unique identifier prefixed with &#x60;drive-&#x60; (e.g. &#x60;drive-0B000000000&#x60;). 
     * @param {module:model/ScoreRevisionCreation} body 
     * @param {module:api/ScoreApi~createScoreRevisionCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/ScoreRevision}
     */
    this.createScoreRevision = function(score, body, callback) {
      var postBody = body;

      // verify the required parameter 'score' is set
      if (score == undefined || score == null) {
        throw new Error("Missing the required parameter 'score' when calling createScoreRevision");
      }

      // verify the required parameter 'body' is set
      if (body == undefined || body == null) {
        throw new Error("Missing the required parameter 'body' when calling createScoreRevision");
      }


      var pathParams = {
        'score': score
      };
      var queryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['OAuth2'];
      var contentTypes = ['application/json'];
      var accepts = ['application/json'];
      var returnType = ScoreRevision;

      return this.apiClient.callApi(
        '/scores/{score}/revisions', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the deleteScore operation.
     * @callback module:api/ScoreApi~deleteScoreCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Delete a score
     * This API call will schedule the deletion of the score, its revisions, and whole history. The user calling this API method must have the &#x60;aclAdmin&#x60; rights on this document to process this action. The score won&#39;t be accessible anymore after calling this method and the user&#39;s quota will directly be updated. 
     * @param {String} score Unique identifier of the score document. This can be a Flat Score unique identifier (i.e. &#x60;ScoreDetails.id&#x60;) or, if the score is also a Google Drive file, the Drive file unique identifier prefixed with &#x60;drive-&#x60; (e.g. &#x60;drive-0B000000000&#x60;). 
     * @param {module:api/ScoreApi~deleteScoreCallback} callback The callback function, accepting three arguments: error, data, response
     */
    this.deleteScore = function(score, callback) {
      var postBody = null;

      // verify the required parameter 'score' is set
      if (score == undefined || score == null) {
        throw new Error("Missing the required parameter 'score' when calling deleteScore");
      }


      var pathParams = {
        'score': score
      };
      var queryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['OAuth2'];
      var contentTypes = ['application/json'];
      var accepts = ['application/json'];
      var returnType = null;

      return this.apiClient.callApi(
        '/scores/{score}', 'DELETE',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the deleteScoreComment operation.
     * @callback module:api/ScoreApi~deleteScoreCommentCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Delete a comment
     * @param {String} score Unique identifier of the score document. This can be a Flat Score unique identifier (i.e. &#x60;ScoreDetails.id&#x60;) or, if the score is also a Google Drive file, the Drive file unique identifier prefixed with &#x60;drive-&#x60; (e.g. &#x60;drive-0B000000000&#x60;). 
     * @param {String} comment Unique identifier of a sheet music comment 
     * @param {module:api/ScoreApi~deleteScoreCommentCallback} callback The callback function, accepting three arguments: error, data, response
     */
    this.deleteScoreComment = function(score, comment, callback) {
      var postBody = null;

      // verify the required parameter 'score' is set
      if (score == undefined || score == null) {
        throw new Error("Missing the required parameter 'score' when calling deleteScoreComment");
      }

      // verify the required parameter 'comment' is set
      if (comment == undefined || comment == null) {
        throw new Error("Missing the required parameter 'comment' when calling deleteScoreComment");
      }


      var pathParams = {
        'score': score,
        'comment': comment
      };
      var queryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['OAuth2'];
      var contentTypes = ['application/json'];
      var accepts = ['application/json'];
      var returnType = null;

      return this.apiClient.callApi(
        '/scores/{score}/comments/{comment}', 'DELETE',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the editScore operation.
     * @callback module:api/ScoreApi~editScoreCallback
     * @param {String} error Error message, if any.
     * @param {module:model/ScoreDetails} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Edit a score&#39;s metadata
     * This API method allows you to change the metadata of a score document (e.g. its &#x60;title&#x60; or &#x60;privacy&#x60;), all the properties are optional.  To edit the file itself, create a new revision using the appropriate method (&#x60;POST /v2/scores/{score}/revisions/{revision}&#x60;). 
     * @param {String} score Unique identifier of the score document. This can be a Flat Score unique identifier (i.e. &#x60;ScoreDetails.id&#x60;) or, if the score is also a Google Drive file, the Drive file unique identifier prefixed with &#x60;drive-&#x60; (e.g. &#x60;drive-0B000000000&#x60;). 
     * @param {Object} opts Optional parameters
     * @param {module:model/ScoreModification} opts.body 
     * @param {module:api/ScoreApi~editScoreCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/ScoreDetails}
     */
    this.editScore = function(score, opts, callback) {
      opts = opts || {};
      var postBody = opts['body'];

      // verify the required parameter 'score' is set
      if (score == undefined || score == null) {
        throw new Error("Missing the required parameter 'score' when calling editScore");
      }


      var pathParams = {
        'score': score
      };
      var queryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['OAuth2'];
      var contentTypes = ['application/json'];
      var accepts = ['application/json'];
      var returnType = ScoreDetails;

      return this.apiClient.callApi(
        '/scores/{score}', 'PUT',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the forkScore operation.
     * @callback module:api/ScoreApi~forkScoreCallback
     * @param {String} error Error message, if any.
     * @param {module:model/ScoreDetails} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Fork a score
     * This API call will make a copy of the last revision of the specified score and create a new score. The copy of the score will have a privacy set to &#x60;private&#x60;.  When using a [Flat for Education](https://flat.io/edu) account, the inline and contextualized comments will be accessible in the child document. 
     * @param {String} score Unique identifier of the score document. This can be a Flat Score unique identifier (i.e. &#x60;ScoreDetails.id&#x60;) or, if the score is also a Google Drive file, the Drive file unique identifier prefixed with &#x60;drive-&#x60; (e.g. &#x60;drive-0B000000000&#x60;). 
     * @param {module:model/ScoreFork} body 
     * @param {module:api/ScoreApi~forkScoreCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/ScoreDetails}
     */
    this.forkScore = function(score, body, callback) {
      var postBody = body;

      // verify the required parameter 'score' is set
      if (score == undefined || score == null) {
        throw new Error("Missing the required parameter 'score' when calling forkScore");
      }

      // verify the required parameter 'body' is set
      if (body == undefined || body == null) {
        throw new Error("Missing the required parameter 'body' when calling forkScore");
      }


      var pathParams = {
        'score': score
      };
      var queryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['OAuth2'];
      var contentTypes = ['application/json'];
      var accepts = ['application/json'];
      var returnType = ScoreDetails;

      return this.apiClient.callApi(
        '/scores/{score}/fork', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the gerUserLikes operation.
     * @callback module:api/ScoreApi~gerUserLikesCallback
     * @param {String} error Error message, if any.
     * @param {Array.<module:model/ScoreDetails>} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * List liked scores
     * @param {String} user Unique identifier of a Flat user. If you authenticated, you can use &#x60;me&#x60; to refer to the current user. 
     * @param {Object} opts Optional parameters
     * @param {Boolean} opts.ids Return only the identifiers of the scores
     * @param {module:api/ScoreApi~gerUserLikesCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link Array.<module:model/ScoreDetails>}
     */
    this.gerUserLikes = function(user, opts, callback) {
      opts = opts || {};
      var postBody = null;

      // verify the required parameter 'user' is set
      if (user == undefined || user == null) {
        throw new Error("Missing the required parameter 'user' when calling gerUserLikes");
      }


      var pathParams = {
        'user': user
      };
      var queryParams = {
        'ids': opts['ids']
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['OAuth2'];
      var contentTypes = ['application/json'];
      var accepts = ['application/json'];
      var returnType = [ScoreDetails];

      return this.apiClient.callApi(
        '/users/{user}/likes', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the getGroupScores operation.
     * @callback module:api/ScoreApi~getGroupScoresCallback
     * @param {String} error Error message, if any.
     * @param {Array.<module:model/ScoreDetails>} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * List group&#39;s scores
     * Get the list of scores shared with a group. 
     * @param {String} group Unique identifier of the group
     * @param {Object} opts Optional parameters
     * @param {String} opts.parent Filter the score forked from the score id &#x60;parent&#x60;
     * @param {module:api/ScoreApi~getGroupScoresCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link Array.<module:model/ScoreDetails>}
     */
    this.getGroupScores = function(group, opts, callback) {
      opts = opts || {};
      var postBody = null;

      // verify the required parameter 'group' is set
      if (group == undefined || group == null) {
        throw new Error("Missing the required parameter 'group' when calling getGroupScores");
      }


      var pathParams = {
        'group': group
      };
      var queryParams = {
        'parent': opts['parent']
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = [];
      var contentTypes = ['application/json'];
      var accepts = ['application/json'];
      var returnType = [ScoreDetails];

      return this.apiClient.callApi(
        '/groups/{group}/scores', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the getScore operation.
     * @callback module:api/ScoreApi~getScoreCallback
     * @param {String} error Error message, if any.
     * @param {module:model/ScoreDetails} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Get a score&#39;s metadata
     * Get the details of a score identified by the &#x60;score&#x60; parameter in the URL. The currently authenticated user must have at least a read access to the document to use this API call. 
     * @param {String} score Unique identifier of the score document. This can be a Flat Score unique identifier (i.e. &#x60;ScoreDetails.id&#x60;) or, if the score is also a Google Drive file, the Drive file unique identifier prefixed with &#x60;drive-&#x60; (e.g. &#x60;drive-0B000000000&#x60;). 
     * @param {module:api/ScoreApi~getScoreCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/ScoreDetails}
     */
    this.getScore = function(score, callback) {
      var postBody = null;

      // verify the required parameter 'score' is set
      if (score == undefined || score == null) {
        throw new Error("Missing the required parameter 'score' when calling getScore");
      }


      var pathParams = {
        'score': score
      };
      var queryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['OAuth2'];
      var contentTypes = ['application/json'];
      var accepts = ['application/json'];
      var returnType = ScoreDetails;

      return this.apiClient.callApi(
        '/scores/{score}', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the getScoreCollaborator operation.
     * @callback module:api/ScoreApi~getScoreCollaboratorCallback
     * @param {String} error Error message, if any.
     * @param {module:model/ScoreCollaborator} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Get a collaborator
     * Get the information about a collaborator (User or Group). 
     * @param {String} score Unique identifier of the score document. This can be a Flat Score unique identifier (i.e. &#x60;ScoreDetails.id&#x60;) or, if the score is also a Google Drive file, the Drive file unique identifier prefixed with &#x60;drive-&#x60; (e.g. &#x60;drive-0B000000000&#x60;). 
     * @param {String} collaborator Unique identifier of a **collaborator permission**, or unique identifier of a **User**, or unique identifier of a **Group** 
     * @param {module:api/ScoreApi~getScoreCollaboratorCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/ScoreCollaborator}
     */
    this.getScoreCollaborator = function(score, collaborator, callback) {
      var postBody = null;

      // verify the required parameter 'score' is set
      if (score == undefined || score == null) {
        throw new Error("Missing the required parameter 'score' when calling getScoreCollaborator");
      }

      // verify the required parameter 'collaborator' is set
      if (collaborator == undefined || collaborator == null) {
        throw new Error("Missing the required parameter 'collaborator' when calling getScoreCollaborator");
      }


      var pathParams = {
        'score': score,
        'collaborator': collaborator
      };
      var queryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['OAuth2'];
      var contentTypes = ['application/json'];
      var accepts = ['application/json'];
      var returnType = ScoreCollaborator;

      return this.apiClient.callApi(
        '/scores/{score}/collaborators/{collaborator}', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the getScoreCollaborators operation.
     * @callback module:api/ScoreApi~getScoreCollaboratorsCallback
     * @param {String} error Error message, if any.
     * @param {Array.<module:model/ScoreCollaborator>} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * List the collaborators
     * This API call will list the different collaborators of a score and their rights on the document. The returned list will at least contain the owner of the document.  Collaborators can be a single user (the object &#x60;user&#x60; will be populated) or a group (the object &#x60;group&#x60; will be populated). 
     * @param {String} score Unique identifier of the score document. This can be a Flat Score unique identifier (i.e. &#x60;ScoreDetails.id&#x60;) or, if the score is also a Google Drive file, the Drive file unique identifier prefixed with &#x60;drive-&#x60; (e.g. &#x60;drive-0B000000000&#x60;). 
     * @param {module:api/ScoreApi~getScoreCollaboratorsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link Array.<module:model/ScoreCollaborator>}
     */
    this.getScoreCollaborators = function(score, callback) {
      var postBody = null;

      // verify the required parameter 'score' is set
      if (score == undefined || score == null) {
        throw new Error("Missing the required parameter 'score' when calling getScoreCollaborators");
      }


      var pathParams = {
        'score': score
      };
      var queryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['OAuth2'];
      var contentTypes = ['application/json'];
      var accepts = ['application/json'];
      var returnType = [ScoreCollaborator];

      return this.apiClient.callApi(
        '/scores/{score}/collaborators', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the getScoreComments operation.
     * @callback module:api/ScoreApi~getScoreCommentsCallback
     * @param {String} error Error message, if any.
     * @param {Array.<module:model/ScoreComment>} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * List comments
     * This method lists the different comments added on a music score (documents and inline) sorted by their post dates.
     * @param {String} score Unique identifier of the score document. This can be a Flat Score unique identifier (i.e. &#x60;ScoreDetails.id&#x60;) or, if the score is also a Google Drive file, the Drive file unique identifier prefixed with &#x60;drive-&#x60; (e.g. &#x60;drive-0B000000000&#x60;). 
     * @param {module:api/ScoreApi~getScoreCommentsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link Array.<module:model/ScoreComment>}
     */
    this.getScoreComments = function(score, callback) {
      var postBody = null;

      // verify the required parameter 'score' is set
      if (score == undefined || score == null) {
        throw new Error("Missing the required parameter 'score' when calling getScoreComments");
      }


      var pathParams = {
        'score': score
      };
      var queryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['OAuth2'];
      var contentTypes = ['application/json'];
      var accepts = ['application/json'];
      var returnType = [ScoreComment];

      return this.apiClient.callApi(
        '/scores/{score}/comments', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the getScoreRevision operation.
     * @callback module:api/ScoreApi~getScoreRevisionCallback
     * @param {String} error Error message, if any.
     * @param {module:model/ScoreRevision} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Get a score revision
     * When creating a score or saving a new version of a score, a revision is created in our storage. This method allows you to get a specific revision metadata. 
     * @param {String} score Unique identifier of the score document. This can be a Flat Score unique identifier (i.e. &#x60;ScoreDetails.id&#x60;) or, if the score is also a Google Drive file, the Drive file unique identifier prefixed with &#x60;drive-&#x60; (e.g. &#x60;drive-0B000000000&#x60;). 
     * @param {String} revision Unique identifier of a score revision. You can use &#x60;last&#x60; to fetch the information related to the last version created. 
     * @param {module:api/ScoreApi~getScoreRevisionCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/ScoreRevision}
     */
    this.getScoreRevision = function(score, revision, callback) {
      var postBody = null;

      // verify the required parameter 'score' is set
      if (score == undefined || score == null) {
        throw new Error("Missing the required parameter 'score' when calling getScoreRevision");
      }

      // verify the required parameter 'revision' is set
      if (revision == undefined || revision == null) {
        throw new Error("Missing the required parameter 'revision' when calling getScoreRevision");
      }


      var pathParams = {
        'score': score,
        'revision': revision
      };
      var queryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = [];
      var contentTypes = ['application/json'];
      var accepts = ['application/json'];
      var returnType = ScoreRevision;

      return this.apiClient.callApi(
        '/scores/{score}/revisions/{revision}', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the getScoreRevisionData operation.
     * @callback module:api/ScoreApi~getScoreRevisionDataCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Get a score revision data
     * Retrieve the file corresponding to a score revision (the following formats are available: Flat JSON/Adagio JSON &#x60;json&#x60;, MusicXML &#x60;mxl&#x60;/&#x60;xml&#x60;, MP3 &#x60;mp3&#x60;, WAV &#x60;wav&#x60;, MIDI &#x60;midi&#x60;, or a tumbnail of the first page &#x60;thumbnail.png&#x60;). 
     * @param {String} score Unique identifier of the score document. This can be a Flat Score unique identifier (i.e. &#x60;ScoreDetails.id&#x60;) or, if the score is also a Google Drive file, the Drive file unique identifier prefixed with &#x60;drive-&#x60; (e.g. &#x60;drive-0B000000000&#x60;). 
     * @param {String} revision Unique identifier of a score revision. You can use &#x60;last&#x60; to fetch the information related to the last version created. 
     * @param {module:model/String} format The format of the file you will retrieve
     * @param {Object} opts Optional parameters
     * @param {Boolean} opts.onlyCached Only return files already generated and cached in Flat&#39;s production cache. If the file is not availabe, a 404 will be returned 
     * @param {String} opts.parts An optional a set of parts to be exported. This parameter must be specified with a list of integers. For example \&quot;1,2,5\&quot;. 
     * @param {module:api/ScoreApi~getScoreRevisionDataCallback} callback The callback function, accepting three arguments: error, data, response
     */
    this.getScoreRevisionData = function(score, revision, format, opts, callback) {
      opts = opts || {};
      var postBody = null;

      // verify the required parameter 'score' is set
      if (score == undefined || score == null) {
        throw new Error("Missing the required parameter 'score' when calling getScoreRevisionData");
      }

      // verify the required parameter 'revision' is set
      if (revision == undefined || revision == null) {
        throw new Error("Missing the required parameter 'revision' when calling getScoreRevisionData");
      }

      // verify the required parameter 'format' is set
      if (format == undefined || format == null) {
        throw new Error("Missing the required parameter 'format' when calling getScoreRevisionData");
      }


      var pathParams = {
        'score': score,
        'revision': revision,
        'format': format
      };
      var queryParams = {
        'onlyCached': opts['onlyCached'],
        'parts': opts['parts']
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = [];
      var contentTypes = ['application/json'];
      var accepts = ['application/json', 'application/vnd.recordare.musicxml+xml', 'application/vnd.recordare.musicxml', 'audio/mp3', 'audio/wav', 'audio/midi', 'image/png'];
      var returnType = null;

      return this.apiClient.callApi(
        '/scores/{score}/revisions/{revision}/{format}', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the getScoreRevisions operation.
     * @callback module:api/ScoreApi~getScoreRevisionsCallback
     * @param {String} error Error message, if any.
     * @param {Array.<module:model/ScoreRevision>} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * List the revisions
     * When creating a score or saving a new version of a score, a revision is created in our storage. This method allows you to list all of them, sorted by last modification.  Depending the plan of the account, this list can be trunked to the few last revisions. 
     * @param {String} score Unique identifier of the score document. This can be a Flat Score unique identifier (i.e. &#x60;ScoreDetails.id&#x60;) or, if the score is also a Google Drive file, the Drive file unique identifier prefixed with &#x60;drive-&#x60; (e.g. &#x60;drive-0B000000000&#x60;). 
     * @param {module:api/ScoreApi~getScoreRevisionsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link Array.<module:model/ScoreRevision>}
     */
    this.getScoreRevisions = function(score, callback) {
      var postBody = null;

      // verify the required parameter 'score' is set
      if (score == undefined || score == null) {
        throw new Error("Missing the required parameter 'score' when calling getScoreRevisions");
      }


      var pathParams = {
        'score': score
      };
      var queryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['OAuth2'];
      var contentTypes = ['application/json'];
      var accepts = ['application/json'];
      var returnType = [ScoreRevision];

      return this.apiClient.callApi(
        '/scores/{score}/revisions', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the getUserScores operation.
     * @callback module:api/ScoreApi~getUserScoresCallback
     * @param {String} error Error message, if any.
     * @param {Array.<module:model/ScoreDetails>} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * List user&#39;s scores
     * Get the list of scores owned by the User 
     * @param {String} user Unique identifier of a Flat user. If you authenticated, you can use &#x60;me&#x60; to refer to the current user. 
     * @param {Object} opts Optional parameters
     * @param {String} opts.parent Filter the score forked from the score id &#x60;parent&#x60;
     * @param {module:api/ScoreApi~getUserScoresCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link Array.<module:model/ScoreDetails>}
     */
    this.getUserScores = function(user, opts, callback) {
      opts = opts || {};
      var postBody = null;

      // verify the required parameter 'user' is set
      if (user == undefined || user == null) {
        throw new Error("Missing the required parameter 'user' when calling getUserScores");
      }


      var pathParams = {
        'user': user
      };
      var queryParams = {
        'parent': opts['parent']
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['OAuth2'];
      var contentTypes = ['application/json'];
      var accepts = ['application/json'];
      var returnType = [ScoreDetails];

      return this.apiClient.callApi(
        '/users/{user}/scores', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the markScoreCommentResolved operation.
     * @callback module:api/ScoreApi~markScoreCommentResolvedCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Mark the comment as resolved
     * @param {String} score Unique identifier of the score document. This can be a Flat Score unique identifier (i.e. &#x60;ScoreDetails.id&#x60;) or, if the score is also a Google Drive file, the Drive file unique identifier prefixed with &#x60;drive-&#x60; (e.g. &#x60;drive-0B000000000&#x60;). 
     * @param {String} comment Unique identifier of a sheet music comment 
     * @param {module:api/ScoreApi~markScoreCommentResolvedCallback} callback The callback function, accepting three arguments: error, data, response
     */
    this.markScoreCommentResolved = function(score, comment, callback) {
      var postBody = null;

      // verify the required parameter 'score' is set
      if (score == undefined || score == null) {
        throw new Error("Missing the required parameter 'score' when calling markScoreCommentResolved");
      }

      // verify the required parameter 'comment' is set
      if (comment == undefined || comment == null) {
        throw new Error("Missing the required parameter 'comment' when calling markScoreCommentResolved");
      }


      var pathParams = {
        'score': score,
        'comment': comment
      };
      var queryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['OAuth2'];
      var contentTypes = ['application/json'];
      var accepts = ['application/json'];
      var returnType = null;

      return this.apiClient.callApi(
        '/scores/{score}/comments/{comment}/resolved', 'PUT',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the markScoreCommentUnresolved operation.
     * @callback module:api/ScoreApi~markScoreCommentUnresolvedCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Mark the comment as unresolved
     * @param {String} score Unique identifier of the score document. This can be a Flat Score unique identifier (i.e. &#x60;ScoreDetails.id&#x60;) or, if the score is also a Google Drive file, the Drive file unique identifier prefixed with &#x60;drive-&#x60; (e.g. &#x60;drive-0B000000000&#x60;). 
     * @param {String} comment Unique identifier of a sheet music comment 
     * @param {module:api/ScoreApi~markScoreCommentUnresolvedCallback} callback The callback function, accepting three arguments: error, data, response
     */
    this.markScoreCommentUnresolved = function(score, comment, callback) {
      var postBody = null;

      // verify the required parameter 'score' is set
      if (score == undefined || score == null) {
        throw new Error("Missing the required parameter 'score' when calling markScoreCommentUnresolved");
      }

      // verify the required parameter 'comment' is set
      if (comment == undefined || comment == null) {
        throw new Error("Missing the required parameter 'comment' when calling markScoreCommentUnresolved");
      }


      var pathParams = {
        'score': score,
        'comment': comment
      };
      var queryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['OAuth2'];
      var contentTypes = ['application/json'];
      var accepts = ['application/json'];
      var returnType = null;

      return this.apiClient.callApi(
        '/scores/{score}/comments/{comment}/resolved', 'DELETE',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the postScoreComment operation.
     * @callback module:api/ScoreApi~postScoreCommentCallback
     * @param {String} error Error message, if any.
     * @param {module:model/ScoreComment} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Post a new comment
     * Post a document or a contextualized comment on a document.  Please note that this method includes an anti-spam system for public scores. We don&#39;t guarantee that your comments will be accepted and displayed to end-user. Comments are be blocked by returning a &#x60;403&#x60; HTTP error and hidden from other users when the &#x60;spam&#x60; property is &#x60;true&#x60;. 
     * @param {String} score Unique identifier of the score document. This can be a Flat Score unique identifier (i.e. &#x60;ScoreDetails.id&#x60;) or, if the score is also a Google Drive file, the Drive file unique identifier prefixed with &#x60;drive-&#x60; (e.g. &#x60;drive-0B000000000&#x60;). 
     * @param {module:model/ScoreCommentCreation} body 
     * @param {module:api/ScoreApi~postScoreCommentCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/ScoreComment}
     */
    this.postScoreComment = function(score, body, callback) {
      var postBody = body;

      // verify the required parameter 'score' is set
      if (score == undefined || score == null) {
        throw new Error("Missing the required parameter 'score' when calling postScoreComment");
      }

      // verify the required parameter 'body' is set
      if (body == undefined || body == null) {
        throw new Error("Missing the required parameter 'body' when calling postScoreComment");
      }


      var pathParams = {
        'score': score
      };
      var queryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['OAuth2'];
      var contentTypes = ['application/json'];
      var accepts = ['application/json'];
      var returnType = ScoreComment;

      return this.apiClient.callApi(
        '/scores/{score}/comments', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the removeScoreCollaborator operation.
     * @callback module:api/ScoreApi~removeScoreCollaboratorCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Delete a collaborator
     * Remove the specified collaborator from the score 
     * @param {String} score Unique identifier of the score document. This can be a Flat Score unique identifier (i.e. &#x60;ScoreDetails.id&#x60;) or, if the score is also a Google Drive file, the Drive file unique identifier prefixed with &#x60;drive-&#x60; (e.g. &#x60;drive-0B000000000&#x60;). 
     * @param {String} collaborator Unique identifier of a **collaborator permission**, or unique identifier of a **User**, or unique identifier of a **Group** 
     * @param {module:api/ScoreApi~removeScoreCollaboratorCallback} callback The callback function, accepting three arguments: error, data, response
     */
    this.removeScoreCollaborator = function(score, collaborator, callback) {
      var postBody = null;

      // verify the required parameter 'score' is set
      if (score == undefined || score == null) {
        throw new Error("Missing the required parameter 'score' when calling removeScoreCollaborator");
      }

      // verify the required parameter 'collaborator' is set
      if (collaborator == undefined || collaborator == null) {
        throw new Error("Missing the required parameter 'collaborator' when calling removeScoreCollaborator");
      }


      var pathParams = {
        'score': score,
        'collaborator': collaborator
      };
      var queryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['OAuth2'];
      var contentTypes = ['application/json'];
      var accepts = ['application/json'];
      var returnType = null;

      return this.apiClient.callApi(
        '/scores/{score}/collaborators/{collaborator}', 'DELETE',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the updateScoreComment operation.
     * @callback module:api/ScoreApi~updateScoreCommentCallback
     * @param {String} error Error message, if any.
     * @param {module:model/ScoreComment} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Update an existing comment
     * @param {String} score Unique identifier of the score document. This can be a Flat Score unique identifier (i.e. &#x60;ScoreDetails.id&#x60;) or, if the score is also a Google Drive file, the Drive file unique identifier prefixed with &#x60;drive-&#x60; (e.g. &#x60;drive-0B000000000&#x60;). 
     * @param {String} comment Unique identifier of a sheet music comment 
     * @param {module:model/ScoreCommentUpdate} body 
     * @param {module:api/ScoreApi~updateScoreCommentCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/ScoreComment}
     */
    this.updateScoreComment = function(score, comment, body, callback) {
      var postBody = body;

      // verify the required parameter 'score' is set
      if (score == undefined || score == null) {
        throw new Error("Missing the required parameter 'score' when calling updateScoreComment");
      }

      // verify the required parameter 'comment' is set
      if (comment == undefined || comment == null) {
        throw new Error("Missing the required parameter 'comment' when calling updateScoreComment");
      }

      // verify the required parameter 'body' is set
      if (body == undefined || body == null) {
        throw new Error("Missing the required parameter 'body' when calling updateScoreComment");
      }


      var pathParams = {
        'score': score,
        'comment': comment
      };
      var queryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['OAuth2'];
      var contentTypes = ['application/json'];
      var accepts = ['application/json'];
      var returnType = ScoreComment;

      return this.apiClient.callApi(
        '/scores/{score}/comments/{comment}', 'PUT',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
  };

  return exports;
}));
