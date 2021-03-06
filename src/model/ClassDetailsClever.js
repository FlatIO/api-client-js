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
    root.FlatApi.ClassDetailsClever = factory(root.FlatApi.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';




  /**
   * The ClassDetailsClever model module.
   * @module model/ClassDetailsClever
   * @version 2.6.0
   */

  /**
   * Constructs a new <code>ClassDetailsClever</code>.
   * Clever.com section-related information
   * @alias module:model/ClassDetailsClever
   * @class
   */
  var exports = function() {
    var _this = this;








  };

  /**
   * Constructs a <code>ClassDetailsClever</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/ClassDetailsClever} obj Optional instance to populate.
   * @return {module:model/ClassDetailsClever} The populated <code>ClassDetailsClever</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('id')) {
        obj['id'] = ApiClient.convertToType(data['id'], 'String');
      }
      if (data.hasOwnProperty('creationDate')) {
        obj['creationDate'] = ApiClient.convertToType(data['creationDate'], 'Date');
      }
      if (data.hasOwnProperty('modificationDate')) {
        obj['modificationDate'] = ApiClient.convertToType(data['modificationDate'], 'Date');
      }
      if (data.hasOwnProperty('subject')) {
        obj['subject'] = ApiClient.convertToType(data['subject'], 'String');
      }
      if (data.hasOwnProperty('termName')) {
        obj['termName'] = ApiClient.convertToType(data['termName'], 'String');
      }
      if (data.hasOwnProperty('termStartDate')) {
        obj['termStartDate'] = ApiClient.convertToType(data['termStartDate'], 'Date');
      }
      if (data.hasOwnProperty('termEndDate')) {
        obj['termEndDate'] = ApiClient.convertToType(data['termEndDate'], 'Date');
      }
    }
    return obj;
  }

  /**
   * Clever section unique identifier
   * @member {String} id
   */
  exports.prototype['id'] = undefined;
  /**
   * The creation date of the section on clever
   * @member {Date} creationDate
   */
  exports.prototype['creationDate'] = undefined;
  /**
   * The last modification date of the section on clever
   * @member {Date} modificationDate
   */
  exports.prototype['modificationDate'] = undefined;
  /**
   * Normalized subject of the course
   * @member {module:model/ClassDetailsClever.SubjectEnum} subject
   */
  exports.prototype['subject'] = undefined;
  /**
   * Name of the term when this course happens
   * @member {String} termName
   */
  exports.prototype['termName'] = undefined;
  /**
   * Beginning date of the term
   * @member {Date} termStartDate
   */
  exports.prototype['termStartDate'] = undefined;
  /**
   * End date of the term
   * @member {Date} termEndDate
   */
  exports.prototype['termEndDate'] = undefined;


  /**
   * Allowed values for the <code>subject</code> property.
   * @enum {String}
   * @readonly
   */
  exports.SubjectEnum = {
    /**
     * value: "english/language arts"
     * @const
     */
    "english/language arts": "english/language arts",
    /**
     * value: "math"
     * @const
     */
    "math": "math",
    /**
     * value: "science"
     * @const
     */
    "science": "science",
    /**
     * value: "social studies"
     * @const
     */
    "social studies": "social studies",
    /**
     * value: "language"
     * @const
     */
    "language": "language",
    /**
     * value: "homeroom/advisory"
     * @const
     */
    "homeroom/advisory": "homeroom/advisory",
    /**
     * value: "interventions/online learning"
     * @const
     */
    "interventions/online learning": "interventions/online learning",
    /**
     * value: "technology and engineering"
     * @const
     */
    "technology and engineering": "technology and engineering",
    /**
     * value: "PE and health"
     * @const
     */
    "PE and health": "PE and health",
    /**
     * value: "arts and music"
     * @const
     */
    "arts and music": "arts and music",
    /**
     * value: "other"
     * @const
     */
    "other": "other"  };


  return exports;
}));


