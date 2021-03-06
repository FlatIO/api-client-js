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
    define(['ApiClient', 'model/FlatErrorResponse', 'model/LtiCredentials', 'model/LtiCredentialsCreation', 'model/OrganizationInvitation', 'model/OrganizationInvitationCreation', 'model/UserAdminUpdate', 'model/UserCreation', 'model/UserDetailsAdmin'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('../model/FlatErrorResponse'), require('../model/LtiCredentials'), require('../model/LtiCredentialsCreation'), require('../model/OrganizationInvitation'), require('../model/OrganizationInvitationCreation'), require('../model/UserAdminUpdate'), require('../model/UserCreation'), require('../model/UserDetailsAdmin'));
  } else {
    // Browser globals (root is window)
    if (!root.FlatApi) {
      root.FlatApi = {};
    }
    root.FlatApi.OrganizationApi = factory(root.FlatApi.ApiClient, root.FlatApi.FlatErrorResponse, root.FlatApi.LtiCredentials, root.FlatApi.LtiCredentialsCreation, root.FlatApi.OrganizationInvitation, root.FlatApi.OrganizationInvitationCreation, root.FlatApi.UserAdminUpdate, root.FlatApi.UserCreation, root.FlatApi.UserDetailsAdmin);
  }
}(this, function(ApiClient, FlatErrorResponse, LtiCredentials, LtiCredentialsCreation, OrganizationInvitation, OrganizationInvitationCreation, UserAdminUpdate, UserCreation, UserDetailsAdmin) {
  'use strict';

  /**
   * Organization service.
   * @module api/OrganizationApi
   * @version 2.6.0
   */

  /**
   * Constructs a new OrganizationApi. 
   * @alias module:api/OrganizationApi
   * @class
   * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
   * default to {@link module:ApiClient#instance} if unspecified.
   */
  var exports = function(apiClient) {
    this.apiClient = apiClient || ApiClient.instance;


    /**
     * Callback function to receive the result of the createLtiCredentials operation.
     * @callback module:api/OrganizationApi~createLtiCredentialsCallback
     * @param {String} error Error message, if any.
     * @param {module:model/LtiCredentials} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Create a new couple of LTI 1.x credentials
     * Flat for Education is a Certified LTI Provider. You can use these API methods to automate the creation of LTI credentials. You can read more about our LTI implementation, supported components and LTI Endpoints in our [Developer Documentation](https://flat.io/developers/docs/lti/). 
     * @param {module:model/LtiCredentialsCreation} body 
     * @param {module:api/OrganizationApi~createLtiCredentialsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/LtiCredentials}
     */
    this.createLtiCredentials = function(body, callback) {
      var postBody = body;

      // verify the required parameter 'body' is set
      if (body === undefined || body === null) {
        throw new Error("Missing the required parameter 'body' when calling createLtiCredentials");
      }


      var pathParams = {
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
      var returnType = LtiCredentials;

      return this.apiClient.callApi(
        '/organizations/lti/credentials', 'POST',
        pathParams, queryParams, collectionQueryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the createOrganizationInvitation operation.
     * @callback module:api/OrganizationApi~createOrganizationInvitationCallback
     * @param {String} error Error message, if any.
     * @param {module:model/OrganizationInvitation} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Create a new invitation to join the organization
     * This method creates and sends invitation for teachers and admins.  Invitations can only be used by new Flat users or users who are not part of the organization yet.  If the email of the user is already associated to a user of your organization, the API will simply update the role of the existing user and won&#39;t send an invitation. In this case, the property &#x60;usedBy&#x60; will be directly filled with the uniquer identifier of the corresponding user. 
     * @param {Object} opts Optional parameters
     * @param {module:model/OrganizationInvitationCreation} opts.body 
     * @param {module:api/OrganizationApi~createOrganizationInvitationCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/OrganizationInvitation}
     */
    this.createOrganizationInvitation = function(opts, callback) {
      opts = opts || {};
      var postBody = opts['body'];


      var pathParams = {
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
      var returnType = OrganizationInvitation;

      return this.apiClient.callApi(
        '/organizations/invitations', 'POST',
        pathParams, queryParams, collectionQueryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the createOrganizationUser operation.
     * @callback module:api/OrganizationApi~createOrganizationUserCallback
     * @param {String} error Error message, if any.
     * @param {module:model/UserDetailsAdmin} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Create a new user account
     * @param {Object} opts Optional parameters
     * @param {module:model/UserCreation} opts.body 
     * @param {module:api/OrganizationApi~createOrganizationUserCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/UserDetailsAdmin}
     */
    this.createOrganizationUser = function(opts, callback) {
      opts = opts || {};
      var postBody = opts['body'];


      var pathParams = {
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
      var returnType = UserDetailsAdmin;

      return this.apiClient.callApi(
        '/organizations/users', 'POST',
        pathParams, queryParams, collectionQueryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the listLtiCredentials operation.
     * @callback module:api/OrganizationApi~listLtiCredentialsCallback
     * @param {String} error Error message, if any.
     * @param {Array.<module:model/LtiCredentials>} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * List LTI 1.x credentials
     * @param {module:api/OrganizationApi~listLtiCredentialsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link Array.<module:model/LtiCredentials>}
     */
    this.listLtiCredentials = function(callback) {
      var postBody = null;


      var pathParams = {
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
      var returnType = [LtiCredentials];

      return this.apiClient.callApi(
        '/organizations/lti/credentials', 'GET',
        pathParams, queryParams, collectionQueryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the listOrganizationInvitations operation.
     * @callback module:api/OrganizationApi~listOrganizationInvitationsCallback
     * @param {String} error Error message, if any.
     * @param {Array.<module:model/OrganizationInvitation>} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * List the organization invitations
     * @param {Object} opts Optional parameters
     * @param {module:model/String} opts.role Filter users by role
     * @param {Number} opts.limit This is the maximum number of objects that may be returned (default to 50)
     * @param {String} opts.next An opaque string cursor to fetch the next page of data. The paginated API URLs are returned in the &#x60;Link&#x60; header when requesting the API. These URLs will contain a &#x60;next&#x60; and &#x60;previous&#x60; cursor based on the available data. 
     * @param {String} opts.previous An opaque string cursor to fetch the previous page of data. The paginated API URLs are returned in the &#x60;Link&#x60; header when requesting the API. These URLs will contain a &#x60;next&#x60; and &#x60;previous&#x60; cursor based on the available data. 
     * @param {module:api/OrganizationApi~listOrganizationInvitationsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link Array.<module:model/OrganizationInvitation>}
     */
    this.listOrganizationInvitations = function(opts, callback) {
      opts = opts || {};
      var postBody = null;


      var pathParams = {
      };
      var queryParams = {
        'role': opts['role'],
        'limit': opts['limit'],
        'next': opts['next'],
        'previous': opts['previous'],
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
      var returnType = [OrganizationInvitation];

      return this.apiClient.callApi(
        '/organizations/invitations', 'GET',
        pathParams, queryParams, collectionQueryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the listOrganizationUsers operation.
     * @callback module:api/OrganizationApi~listOrganizationUsersCallback
     * @param {String} error Error message, if any.
     * @param {Array.<module:model/UserDetailsAdmin>} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * List the organization users
     * @param {Object} opts Optional parameters
     * @param {module:model/String} opts.role Filter users by role
     * @param {Number} opts.limit This is the maximum number of objects that may be returned (default to 50)
     * @param {String} opts.next An opaque string cursor to fetch the next page of data. The paginated API URLs are returned in the &#x60;Link&#x60; header when requesting the API. These URLs will contain a &#x60;next&#x60; and &#x60;previous&#x60; cursor based on the available data. 
     * @param {String} opts.previous An opaque string cursor to fetch the previous page of data. The paginated API URLs are returned in the &#x60;Link&#x60; header when requesting the API. These URLs will contain a &#x60;next&#x60; and &#x60;previous&#x60; cursor based on the available data. 
     * @param {module:api/OrganizationApi~listOrganizationUsersCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link Array.<module:model/UserDetailsAdmin>}
     */
    this.listOrganizationUsers = function(opts, callback) {
      opts = opts || {};
      var postBody = null;


      var pathParams = {
      };
      var queryParams = {
        'role': opts['role'],
        'limit': opts['limit'],
        'next': opts['next'],
        'previous': opts['previous'],
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
      var returnType = [UserDetailsAdmin];

      return this.apiClient.callApi(
        '/organizations/users', 'GET',
        pathParams, queryParams, collectionQueryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the removeOrganizationInvitation operation.
     * @callback module:api/OrganizationApi~removeOrganizationInvitationCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Remove an organization invitation
     * @param {String} invitation Unique identifier of the invitation
     * @param {module:api/OrganizationApi~removeOrganizationInvitationCallback} callback The callback function, accepting three arguments: error, data, response
     */
    this.removeOrganizationInvitation = function(invitation, callback) {
      var postBody = null;

      // verify the required parameter 'invitation' is set
      if (invitation === undefined || invitation === null) {
        throw new Error("Missing the required parameter 'invitation' when calling removeOrganizationInvitation");
      }


      var pathParams = {
        'invitation': invitation
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
      var returnType = null;

      return this.apiClient.callApi(
        '/organizations/invitations/{invitation}', 'DELETE',
        pathParams, queryParams, collectionQueryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the removeOrganizationUser operation.
     * @callback module:api/OrganizationApi~removeOrganizationUserCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Remove an account from Flat
     * This operation removes an account from Flat and its data, including: * The music scores created by this user (documents, history, comments, collaboration information) * Education related data (assignments and classroom information) 
     * @param {String} user Unique identifier of the Flat account 
     * @param {Object} opts Optional parameters
     * @param {Boolean} opts.convertToIndividual If &#x60;true&#x60;, the account will be only removed from the organization and converted into an individual account on our public website, https://flat.io. This operation will remove the education-related data from the account. Before realizing this operation, you need to be sure that the user is at least 13 years old and that this one has read and agreed to the Individual Terms of Services of Flat available on https://flat.io/legal. 
     * @param {module:api/OrganizationApi~removeOrganizationUserCallback} callback The callback function, accepting three arguments: error, data, response
     */
    this.removeOrganizationUser = function(user, opts, callback) {
      opts = opts || {};
      var postBody = null;

      // verify the required parameter 'user' is set
      if (user === undefined || user === null) {
        throw new Error("Missing the required parameter 'user' when calling removeOrganizationUser");
      }


      var pathParams = {
        'user': user
      };
      var queryParams = {
        'convertToIndividual': opts['convertToIndividual'],
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
      var returnType = null;

      return this.apiClient.callApi(
        '/organizations/users/{user}', 'DELETE',
        pathParams, queryParams, collectionQueryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the revokeLtiCredentials operation.
     * @callback module:api/OrganizationApi~revokeLtiCredentialsCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Revoke LTI 1.x credentials
     * @param {String} credentials Credentials unique identifier 
     * @param {module:api/OrganizationApi~revokeLtiCredentialsCallback} callback The callback function, accepting three arguments: error, data, response
     */
    this.revokeLtiCredentials = function(credentials, callback) {
      var postBody = null;

      // verify the required parameter 'credentials' is set
      if (credentials === undefined || credentials === null) {
        throw new Error("Missing the required parameter 'credentials' when calling revokeLtiCredentials");
      }


      var pathParams = {
        'credentials': credentials
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
      var returnType = null;

      return this.apiClient.callApi(
        '/organizations/lti/credentials/{credentials}', 'DELETE',
        pathParams, queryParams, collectionQueryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the updateOrganizationUser operation.
     * @callback module:api/OrganizationApi~updateOrganizationUserCallback
     * @param {String} error Error message, if any.
     * @param {module:model/UserDetailsAdmin} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Update account information
     * @param {String} user Unique identifier of the Flat account 
     * @param {module:model/UserAdminUpdate} body 
     * @param {module:api/OrganizationApi~updateOrganizationUserCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/UserDetailsAdmin}
     */
    this.updateOrganizationUser = function(user, body, callback) {
      var postBody = body;

      // verify the required parameter 'user' is set
      if (user === undefined || user === null) {
        throw new Error("Missing the required parameter 'user' when calling updateOrganizationUser");
      }

      // verify the required parameter 'body' is set
      if (body === undefined || body === null) {
        throw new Error("Missing the required parameter 'body' when calling updateOrganizationUser");
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
      var returnType = UserDetailsAdmin;

      return this.apiClient.callApi(
        '/organizations/users/{user}', 'PUT',
        pathParams, queryParams, collectionQueryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
  };

  return exports;
}));
