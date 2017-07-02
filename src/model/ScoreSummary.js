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
    define(['ApiClient', 'model/ScorePrivacy', 'model/UserPublicSummary'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./ScorePrivacy'), require('./UserPublicSummary'));
  } else {
    // Browser globals (root is window)
    if (!root.FlatApi) {
      root.FlatApi = {};
    }
    root.FlatApi.ScoreSummary = factory(root.FlatApi.ApiClient, root.FlatApi.ScorePrivacy, root.FlatApi.UserPublicSummary);
  }
}(this, function(ApiClient, ScorePrivacy, UserPublicSummary) {
  'use strict';




  /**
   * The ScoreSummary model module.
   * @module model/ScoreSummary
   * @version 2.2.0
   */

  /**
   * Constructs a new <code>ScoreSummary</code>.
   * A summary of the score details
   * @alias module:model/ScoreSummary
   * @class
   */
  var exports = function() {
    var _this = this;







  };

  /**
   * Constructs a <code>ScoreSummary</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/ScoreSummary} obj Optional instance to populate.
   * @return {module:model/ScoreSummary} The populated <code>ScoreSummary</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('id')) {
        obj['id'] = ApiClient.convertToType(data['id'], 'String');
      }
      if (data.hasOwnProperty('sharingKey')) {
        obj['sharingKey'] = ApiClient.convertToType(data['sharingKey'], 'String');
      }
      if (data.hasOwnProperty('title')) {
        obj['title'] = ApiClient.convertToType(data['title'], 'String');
      }
      if (data.hasOwnProperty('privacy')) {
        obj['privacy'] = ScorePrivacy.constructFromObject(data['privacy']);
      }
      if (data.hasOwnProperty('user')) {
        obj['user'] = UserPublicSummary.constructFromObject(data['user']);
      }
      if (data.hasOwnProperty('htmlUrl')) {
        obj['htmlUrl'] = ApiClient.convertToType(data['htmlUrl'], 'String');
      }
    }
    return obj;
  }

  /**
   * The unique identifier of the score
   * @member {String} id
   */
  exports.prototype['id'] = undefined;
  /**
   * The private sharing key of the score (available when the `privacy` mode is set to `privateLink`)
   * @member {String} sharingKey
   */
  exports.prototype['sharingKey'] = undefined;
  /**
   * The title of the score
   * @member {String} title
   */
  exports.prototype['title'] = undefined;
  /**
   * @member {module:model/ScorePrivacy} privacy
   */
  exports.prototype['privacy'] = undefined;
  /**
   * @member {module:model/UserPublicSummary} user
   */
  exports.prototype['user'] = undefined;
  /**
   * The url where the score can be viewed in a web browser
   * @member {String} htmlUrl
   */
  exports.prototype['htmlUrl'] = undefined;



  return exports;
}));


