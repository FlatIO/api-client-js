/**
 * Flat API
 * The Flat API allows you to easily extend the abilities of the [Flat Platform](https://flat.io), with a wide range of use cases including the following:  * Creating and importing new music scores using MusicXML or MIDI files * Browsing, updating, copying, exporting the user's scores (for example in MP3, WAV or MIDI) * Managing educational resources with Flat for Education: creating & updating the organization accounts, the classes, rosters and assignments.  The Flat API is built on HTTP. Our API is RESTful It has predictable resource URLs. It returns HTTP response codes to indicate errors. It also accepts and returns JSON in the HTTP body. The [schema](/swagger.yaml) of this API follows the [OpenAPI Initiative (OAI) specification](https://www.openapis.org/), you can use and work with [compatible Swagger tools](http://swagger.io/open-source-integrations/). This API features Cross-Origin Resource Sharing (CORS) implemented in compliance with [W3C spec](https://www.w3.org/TR/cors/).  You can use your favorite HTTP/REST library for your programming language to use Flat's API. This specification and reference is [available on Github](https://github.com/FlatIO/api-reference).  Getting Started and learn more:  * [API Overview and interoduction](https://flat.io/developers/docs/api/) * [Authentication (Personal Access Tokens or OAuth2)](https://flat.io/developers/docs/api/authentication.html) * [SDKs](https://flat.io/developers/docs/api/sdks.html) * [Rate Limits](https://flat.io/developers/docs/api/rate-limits.html) * [Changelog](https://flat.io/developers/docs/api/changelog.html) 
 *
 * OpenAPI spec version: 2.6.0
 * Contact: developers@flat.io
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 2.4.0-SNAPSHOT
 *
 * Do not edit the class manually.
 *
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/FlatErrorResponse', 'model/ScoreDetails', 'model/UserPublic'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('../model/FlatErrorResponse'), require('../model/ScoreDetails'), require('../model/UserPublic'));
  } else {
    // Browser globals (root is window)
    if (!root.FlatApi) {
      root.FlatApi = {};
    }
    root.FlatApi.UserApi = factory(root.FlatApi.ApiClient, root.FlatApi.FlatErrorResponse, root.FlatApi.ScoreDetails, root.FlatApi.UserPublic);
  }
}(this, function(ApiClient, FlatErrorResponse, ScoreDetails, UserPublic) {
  'use strict';

  /**
   * User service.
   * @module api/UserApi
   * @version 2.6.0
   */

  /**
   * Constructs a new UserApi. 
   * @alias module:api/UserApi
   * @class
   * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
   * default to {@link module:ApiClient#instance} if unspecified.
   */
  var exports = function(apiClient) {
    this.apiClient = apiClient || ApiClient.instance;


    /**
     * Callback function to receive the result of the gerUserLikes operation.
     * @callback module:api/UserApi~gerUserLikesCallback
     * @param {String} error Error message, if any.
     * @param {Array.<module:model/ScoreDetails>} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * List liked scores
     * @param {String} user Unique identifier of a Flat user. If you authenticated, you can use &#x60;me&#x60; to refer to the current user. 
     * @param {Object} opts Optional parameters
     * @param {Boolean} opts.ids Return only the identifiers of the scores
     * @param {module:api/UserApi~gerUserLikesCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link Array.<module:model/ScoreDetails>}
     */
    this.gerUserLikes = function(user, opts, callback) {
      opts = opts || {};
      var postBody = null;

      // verify the required parameter 'user' is set
      if (user === undefined || user === null) {
        throw new Error("Missing the required parameter 'user' when calling gerUserLikes");
      }


      var pathParams = {
        'user': user
      };
      var queryParams = {
        'ids': opts['ids'],
      };
      var collectionQueryParams = {
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
        pathParams, queryParams, collectionQueryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the getUser operation.
     * @callback module:api/UserApi~getUserCallback
     * @param {String} error Error message, if any.
     * @param {module:model/UserPublic} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Get a public user profile
     * Get a public profile of a Flat User. 
     * @param {String} user This route parameter is the unique identifier of the user. You can specify an email instead of an unique identifier. If you are executing this request authenticated, you can use &#x60;me&#x60; as a value instead of the current User unique identifier to work on the current authenticated user. 
     * @param {module:api/UserApi~getUserCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/UserPublic}
     */
    this.getUser = function(user, callback) {
      var postBody = null;

      // verify the required parameter 'user' is set
      if (user === undefined || user === null) {
        throw new Error("Missing the required parameter 'user' when calling getUser");
      }


      var pathParams = {
        'user': user
      };
      var queryParams = {
      };
      var collectionQueryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['OAuth2'];
      var contentTypes = ['application/json'];
      var accepts = ['application/json'];
      var returnType = UserPublic;

      return this.apiClient.callApi(
        '/users/{user}', 'GET',
        pathParams, queryParams, collectionQueryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the getUserScores operation.
     * @callback module:api/UserApi~getUserScoresCallback
     * @param {String} error Error message, if any.
     * @param {Array.<module:model/ScoreDetails>} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * List user&#39;s scores
     * Get the list of public scores owned by a User.  **DEPRECATED**: Please note that the current behavior will be deprecrated on **2019-01-01**. This method will no longer list private and shared scores, but only public scores of a Flat account. If you want to access to private scores, please use the [Collections API](#tag/Collection) instead. 
     * @param {String} user Unique identifier of a Flat user. If you authenticated, you can use &#x60;me&#x60; to refer to the current user. 
     * @param {Object} opts Optional parameters
     * @param {String} opts.parent Filter the score forked from the score id &#x60;parent&#x60;
     * @param {module:api/UserApi~getUserScoresCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link Array.<module:model/ScoreDetails>}
     */
    this.getUserScores = function(user, opts, callback) {
      opts = opts || {};
      var postBody = null;

      // verify the required parameter 'user' is set
      if (user === undefined || user === null) {
        throw new Error("Missing the required parameter 'user' when calling getUserScores");
      }


      var pathParams = {
        'user': user
      };
      var queryParams = {
        'parent': opts['parent'],
      };
      var collectionQueryParams = {
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
        pathParams, queryParams, collectionQueryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
  };

  return exports;
}));