/**
 * Flat API
 * The Flat API allows you to easily extend the abilities of the [Flat Platform](https://flat.io), with a wide range of use cases including the following:  * Creating and importing new music scores using MusicXML or MIDI files * Browsing, updating, copying, exporting the user's scores (for example in MP3, WAV or MIDI) * Managing educational resources with Flat for Education: creating & updating the organization accounts, the classes, rosters and assignments.  The Flat API is built on HTTP. Our API is RESTful It has predictable resource URLs. It returns HTTP response codes to indicate errors. It also accepts and returns JSON in the HTTP body. The [schema](/swagger.yaml) of this API follows the [OpenAPI Initiative (OAI) specification](https://www.openapis.org/), you can use and work with [compatible Swagger tools](http://swagger.io/open-source-integrations/). This API features Cross-Origin Resource Sharing (CORS) implemented in compliance with [W3C spec](https://www.w3.org/TR/cors/).  You can use your favorite HTTP/REST library for your programming language to use Flat's API. This specification and reference is [available on Github](https://github.com/FlatIO/api-reference).  Getting Started and learn more:  * [API Overview and interoduction](https://flat.io/developers/docs/api/) * [Authentication (Personal Access Tokens or OAuth2)](https://flat.io/developers/docs/api/authentication.html) * [SDKs](https://flat.io/developers/docs/api/sdks.html) * [Rate Limits](https://flat.io/developers/docs/api/rate-limits.html) * [Changelog](https://flat.io/developers/docs/api/changelog.html) 
 *
 * OpenAPI spec version: 2.2.0
 * Contact: developers@flat.io
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 2.2.3-SNAPSHOT
 *
 * Do not edit the class manually.
 *
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/FlatErrorResponse', 'model/GroupDetails', 'model/ScoreDetails', 'model/UserPublic'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('../model/FlatErrorResponse'), require('../model/GroupDetails'), require('../model/ScoreDetails'), require('../model/UserPublic'));
  } else {
    // Browser globals (root is window)
    if (!root.FlatApi) {
      root.FlatApi = {};
    }
    root.FlatApi.GroupApi = factory(root.FlatApi.ApiClient, root.FlatApi.FlatErrorResponse, root.FlatApi.GroupDetails, root.FlatApi.ScoreDetails, root.FlatApi.UserPublic);
  }
}(this, function(ApiClient, FlatErrorResponse, GroupDetails, ScoreDetails, UserPublic) {
  'use strict';

  /**
   * Group service.
   * @module api/GroupApi
   * @version 2.2.0
   */

  /**
   * Constructs a new GroupApi. 
   * @alias module:api/GroupApi
   * @class
   * @param {module:ApiClient} apiClient Optional API client implementation to use,
   * default to {@link module:ApiClient#instance} if unspecified.
   */
  var exports = function(apiClient) {
    this.apiClient = apiClient || ApiClient.instance;


    /**
     * Callback function to receive the result of the getGroupDetails operation.
     * @callback module:api/GroupApi~getGroupDetailsCallback
     * @param {String} error Error message, if any.
     * @param {module:model/GroupDetails} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Get group information
     * @param {String} group Unique identifier of a Flat group 
     * @param {module:api/GroupApi~getGroupDetailsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/GroupDetails}
     */
    this.getGroupDetails = function(group, callback) {
      var postBody = null;

      // verify the required parameter 'group' is set
      if (group === undefined || group === null) {
        throw new Error("Missing the required parameter 'group' when calling getGroupDetails");
      }


      var pathParams = {
        'group': group
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
      var returnType = GroupDetails;

      return this.apiClient.callApi(
        '/groups/{group}', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the getGroupScores operation.
     * @callback module:api/GroupApi~getGroupScoresCallback
     * @param {String} error Error message, if any.
     * @param {Array.<module:model/ScoreDetails>} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * List group&#39;s scores
     * Get the list of scores shared with a group. 
     * @param {String} group Unique identifier of a Flat group 
     * @param {Object} opts Optional parameters
     * @param {String} opts.parent Filter the score forked from the score id &#x60;parent&#x60;
     * @param {module:api/GroupApi~getGroupScoresCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link Array.<module:model/ScoreDetails>}
     */
    this.getGroupScores = function(group, opts, callback) {
      opts = opts || {};
      var postBody = null;

      // verify the required parameter 'group' is set
      if (group === undefined || group === null) {
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

      var authNames = ['OAuth2'];
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
     * Callback function to receive the result of the listGroupUsers operation.
     * @callback module:api/GroupApi~listGroupUsersCallback
     * @param {String} error Error message, if any.
     * @param {Array.<module:model/UserPublic>} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * List group&#39;s users
     * @param {String} group Unique identifier of a Flat group 
     * @param {module:api/GroupApi~listGroupUsersCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link Array.<module:model/UserPublic>}
     */
    this.listGroupUsers = function(group, callback) {
      var postBody = null;

      // verify the required parameter 'group' is set
      if (group === undefined || group === null) {
        throw new Error("Missing the required parameter 'group' when calling listGroupUsers");
      }


      var pathParams = {
        'group': group
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
      var returnType = [UserPublic];

      return this.apiClient.callApi(
        '/groups/{group}/users', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
  };

  return exports;
}));
