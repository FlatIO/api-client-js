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
    define(['ApiClient', 'model/ClassRoles', 'model/OrganizationRoles', 'model/UserPublicSummary'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./ClassRoles'), require('./OrganizationRoles'), require('./UserPublicSummary'));
  } else {
    // Browser globals (root is window)
    if (!root.FlatApi) {
      root.FlatApi = {};
    }
    root.FlatApi.UserPublic = factory(root.FlatApi.ApiClient, root.FlatApi.ClassRoles, root.FlatApi.OrganizationRoles, root.FlatApi.UserPublicSummary);
  }
}(this, function(ApiClient, ClassRoles, OrganizationRoles, UserPublicSummary) {
  'use strict';




  /**
   * The UserPublic model module.
   * @module model/UserPublic
   * @version 2.2.0
   */

  /**
   * Constructs a new <code>UserPublic</code>.
   * Public User details
   * @alias module:model/UserPublic
   * @class
   * @extends module:model/UserPublicSummary
   */
  var exports = function() {
    var _this = this;
    UserPublicSummary.call(_this);






  };

  /**
   * Constructs a <code>UserPublic</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/UserPublic} obj Optional instance to populate.
   * @return {module:model/UserPublic} The populated <code>UserPublic</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();
      UserPublicSummary.constructFromObject(data, obj);
      if (data.hasOwnProperty('bio')) {
        obj['bio'] = ApiClient.convertToType(data['bio'], 'String');
      }
      if (data.hasOwnProperty('registrationDate')) {
        obj['registrationDate'] = ApiClient.convertToType(data['registrationDate'], 'Date');
      }
      if (data.hasOwnProperty('likedScoresCount')) {
        obj['likedScoresCount'] = ApiClient.convertToType(data['likedScoresCount'], 'Number');
      }
      if (data.hasOwnProperty('followersCount')) {
        obj['followersCount'] = ApiClient.convertToType(data['followersCount'], 'Number');
      }
      if (data.hasOwnProperty('followingCount')) {
        obj['followingCount'] = ApiClient.convertToType(data['followingCount'], 'Number');
      }
      if (data.hasOwnProperty('ownedPublicScoresCount')) {
        obj['ownedPublicScoresCount'] = ApiClient.convertToType(data['ownedPublicScoresCount'], 'Number');
      }
    }
    return obj;
  }

  exports.prototype = Object.create(UserPublicSummary.prototype);
  exports.prototype.constructor = exports;

  /**
   * User's biography
   * @member {String} bio
   */
  exports.prototype['bio'] = undefined;
  /**
   * Date the user signed up
   * @member {Date} registrationDate
   */
  exports.prototype['registrationDate'] = undefined;
  /**
   * Number of the scores liked by the user
   * @member {Number} likedScoresCount
   */
  exports.prototype['likedScoresCount'] = undefined;
  /**
   * Number of followers the user have
   * @member {Number} followersCount
   */
  exports.prototype['followersCount'] = undefined;
  /**
   * Number of people the user follow
   * @member {Number} followingCount
   */
  exports.prototype['followingCount'] = undefined;
  /**
   * Number of public score the user have
   * @member {Number} ownedPublicScoresCount
   */
  exports.prototype['ownedPublicScoresCount'] = undefined;



  return exports;
}));


