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
    define(['ApiClient'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'));
  } else {
    // Browser globals (root is window)
    if (!root.FlatApi) {
      root.FlatApi = {};
    }
    root.FlatApi.ResourceCollaboratorCreation = factory(root.FlatApi.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';




  /**
   * The ResourceCollaboratorCreation model module.
   * @module model/ResourceCollaboratorCreation
   * @version 2.6.0
   */

  /**
   * Constructs a new <code>ResourceCollaboratorCreation</code>.
   * Add a collaborator to a resource.
   * @alias module:model/ResourceCollaboratorCreation
   * @class
   */
  var exports = function() {
    var _this = this;








  };

  /**
   * Constructs a <code>ResourceCollaboratorCreation</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/ResourceCollaboratorCreation} obj Optional instance to populate.
   * @return {module:model/ResourceCollaboratorCreation} The populated <code>ResourceCollaboratorCreation</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('user')) {
        obj['user'] = ApiClient.convertToType(data['user'], 'String');
      }
      if (data.hasOwnProperty('group')) {
        obj['group'] = ApiClient.convertToType(data['group'], 'String');
      }
      if (data.hasOwnProperty('userEmail')) {
        obj['userEmail'] = ApiClient.convertToType(data['userEmail'], 'String');
      }
      if (data.hasOwnProperty('userToken')) {
        obj['userToken'] = ApiClient.convertToType(data['userToken'], 'String');
      }
      if (data.hasOwnProperty('aclRead')) {
        obj['aclRead'] = ApiClient.convertToType(data['aclRead'], 'Boolean');
      }
      if (data.hasOwnProperty('aclWrite')) {
        obj['aclWrite'] = ApiClient.convertToType(data['aclWrite'], 'Boolean');
      }
      if (data.hasOwnProperty('aclAdmin')) {
        obj['aclAdmin'] = ApiClient.convertToType(data['aclAdmin'], 'Boolean');
      }
    }
    return obj;
  }

  /**
   * The unique identifier of a Flat user
   * @member {String} user
   */
  exports.prototype['user'] = undefined;
  /**
   * The unique identifier of a Flat group
   * @member {String} group
   */
  exports.prototype['group'] = undefined;
  /**
   * Fill this field to invite an individual user by email. 
   * @member {String} userEmail
   */
  exports.prototype['userEmail'] = undefined;
  /**
   * Token received in an invitation to join the score. 
   * @member {String} userToken
   */
  exports.prototype['userToken'] = undefined;
  /**
   * `True` if the related user can read the score. (probably true if the user has a permission on the document). 
   * @member {Boolean} aclRead
   * @default true
   */
  exports.prototype['aclRead'] = true;
  /**
   * `True` if the related user can modify the score. 
   * @member {Boolean} aclWrite
   * @default false
   */
  exports.prototype['aclWrite'] = false;
  /**
   * `True` if the related user can can manage the current document, i.e. changing the document permissions and deleting the document 
   * @member {Boolean} aclAdmin
   * @default false
   */
  exports.prototype['aclAdmin'] = false;



  return exports;
}));


