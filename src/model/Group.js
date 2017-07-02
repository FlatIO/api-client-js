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
    define(['ApiClient'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'));
  } else {
    // Browser globals (root is window)
    if (!root.FlatApi) {
      root.FlatApi = {};
    }
    root.FlatApi.Group = factory(root.FlatApi.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';




  /**
   * The Group model module.
   * @module model/Group
   * @version 2.2.0
   */

  /**
   * Constructs a new <code>Group</code>.
   * A group of users
   * @alias module:model/Group
   * @class
   */
  var exports = function() {
    var _this = this;








  };

  /**
   * Constructs a <code>Group</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/Group} obj Optional instance to populate.
   * @return {module:model/Group} The populated <code>Group</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('id')) {
        obj['id'] = ApiClient.convertToType(data['id'], 'String');
      }
      if (data.hasOwnProperty('name')) {
        obj['name'] = ApiClient.convertToType(data['name'], 'String');
      }
      if (data.hasOwnProperty('type')) {
        obj['type'] = ApiClient.convertToType(data['type'], 'String');
      }
      if (data.hasOwnProperty('usersCount')) {
        obj['usersCount'] = ApiClient.convertToType(data['usersCount'], 'Number');
      }
      if (data.hasOwnProperty('readOnly')) {
        obj['readOnly'] = ApiClient.convertToType(data['readOnly'], 'Boolean');
      }
      if (data.hasOwnProperty('organization')) {
        obj['organization'] = ApiClient.convertToType(data['organization'], 'String');
      }
      if (data.hasOwnProperty('creationDate')) {
        obj['creationDate'] = ApiClient.convertToType(data['creationDate'], 'Date');
      }
    }
    return obj;
  }

  /**
   * The unique identifier of the group
   * @member {String} id
   */
  exports.prototype['id'] = undefined;
  /**
   * The display name of the group
   * @member {String} name
   */
  exports.prototype['name'] = undefined;
  /**
   * The type of the group: * `generic`: A group created by a Flat user * `classTeachers`: A group created automaticaly by Flat that contains   the teachers of a class * `classStudents`: A group created automaticaly by Flat that contains   the studnets of a class 
   * @member {module:model/Group.TypeEnum} type
   */
  exports.prototype['type'] = undefined;
  /**
   * The number of users in this group
   * @member {Number} usersCount
   */
  exports.prototype['usersCount'] = undefined;
  /**
   * `True` if the group is set in read-only 
   * @member {Boolean} readOnly
   */
  exports.prototype['readOnly'] = undefined;
  /**
   * If the group is related to an organization, this field will contain the unique identifier of the organization 
   * @member {String} organization
   */
  exports.prototype['organization'] = undefined;
  /**
   * The creation date of the group
   * @member {Date} creationDate
   */
  exports.prototype['creationDate'] = undefined;


  /**
   * Allowed values for the <code>type</code> property.
   * @enum {String}
   * @readonly
   */
  exports.TypeEnum = {
    /**
     * value: "generic"
     * @const
     */
    "generic": "generic",
    /**
     * value: "classTeachers"
     * @const
     */
    "classTeachers": "classTeachers",
    /**
     * value: "classStudents"
     * @const
     */
    "classStudents": "classStudents"  };


  return exports;
}));


