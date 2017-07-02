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
    define(['ApiClient', 'model/OrganizationRoles'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./OrganizationRoles'));
  } else {
    // Browser globals (root is window)
    if (!root.FlatApi) {
      root.FlatApi = {};
    }
    root.FlatApi.OrganizationInvitation = factory(root.FlatApi.ApiClient, root.FlatApi.OrganizationRoles);
  }
}(this, function(ApiClient, OrganizationRoles) {
  'use strict';




  /**
   * The OrganizationInvitation model module.
   * @module model/OrganizationInvitation
   * @version 2.2.0
   */

  /**
   * Constructs a new <code>OrganizationInvitation</code>.
   * Details of an invitation to join an organization
   * @alias module:model/OrganizationInvitation
   * @class
   */
  var exports = function() {
    var _this = this;








  };

  /**
   * Constructs a <code>OrganizationInvitation</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/OrganizationInvitation} obj Optional instance to populate.
   * @return {module:model/OrganizationInvitation} The populated <code>OrganizationInvitation</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('id')) {
        obj['id'] = ApiClient.convertToType(data['id'], 'String');
      }
      if (data.hasOwnProperty('organization')) {
        obj['organization'] = ApiClient.convertToType(data['organization'], 'String');
      }
      if (data.hasOwnProperty('organizationRole')) {
        obj['organizationRole'] = OrganizationRoles.constructFromObject(data['organizationRole']);
      }
      if (data.hasOwnProperty('customCode')) {
        obj['customCode'] = ApiClient.convertToType(data['customCode'], 'String');
      }
      if (data.hasOwnProperty('email')) {
        obj['email'] = ApiClient.convertToType(data['email'], 'String');
      }
      if (data.hasOwnProperty('invitedBy')) {
        obj['invitedBy'] = ApiClient.convertToType(data['invitedBy'], 'String');
      }
      if (data.hasOwnProperty('usedBy')) {
        obj['usedBy'] = ApiClient.convertToType(data['usedBy'], 'String');
      }
    }
    return obj;
  }

  /**
   * The invitation unique identifier
   * @member {String} id
   */
  exports.prototype['id'] = undefined;
  /**
   * The unique identifier of the Organization owning this class
   * @member {String} organization
   */
  exports.prototype['organization'] = undefined;
  /**
   * @member {module:model/OrganizationRoles} organizationRole
   */
  exports.prototype['organizationRole'] = undefined;
  /**
   * Enrollment code to use when joining this organization
   * @member {String} customCode
   */
  exports.prototype['customCode'] = undefined;
  /**
   * The email address this invitation was sent to
   * @member {String} email
   */
  exports.prototype['email'] = undefined;
  /**
   * The unique identifier of the User who created this invitation
   * @member {String} invitedBy
   */
  exports.prototype['invitedBy'] = undefined;
  /**
   * The unique identifier of the User who used this invitation
   * @member {String} usedBy
   */
  exports.prototype['usedBy'] = undefined;



  return exports;
}));


