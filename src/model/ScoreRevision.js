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
    define(['ApiClient', 'model/ScoreRevisionStatistics'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./ScoreRevisionStatistics'));
  } else {
    // Browser globals (root is window)
    if (!root.FlatApi) {
      root.FlatApi = {};
    }
    root.FlatApi.ScoreRevision = factory(root.FlatApi.ApiClient, root.FlatApi.ScoreRevisionStatistics);
  }
}(this, function(ApiClient, ScoreRevisionStatistics) {
  'use strict';




  /**
   * The ScoreRevision model module.
   * @module model/ScoreRevision
   * @version 2.2.0
   */

  /**
   * Constructs a new <code>ScoreRevision</code>.
   * A score revision metadata
   * @alias module:model/ScoreRevision
   * @class
   */
  var exports = function() {
    var _this = this;








  };

  /**
   * Constructs a <code>ScoreRevision</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/ScoreRevision} obj Optional instance to populate.
   * @return {module:model/ScoreRevision} The populated <code>ScoreRevision</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('id')) {
        obj['id'] = ApiClient.convertToType(data['id'], 'String');
      }
      if (data.hasOwnProperty('user')) {
        obj['user'] = ApiClient.convertToType(data['user'], 'String');
      }
      if (data.hasOwnProperty('collaborators')) {
        obj['collaborators'] = ApiClient.convertToType(data['collaborators'], ['String']);
      }
      if (data.hasOwnProperty('creationDate')) {
        obj['creationDate'] = ApiClient.convertToType(data['creationDate'], 'Date');
      }
      if (data.hasOwnProperty('description')) {
        obj['description'] = ApiClient.convertToType(data['description'], 'String');
      }
      if (data.hasOwnProperty('autosave')) {
        obj['autosave'] = ApiClient.convertToType(data['autosave'], 'Boolean');
      }
      if (data.hasOwnProperty('statistics')) {
        obj['statistics'] = ScoreRevisionStatistics.constructFromObject(data['statistics']);
      }
    }
    return obj;
  }

  /**
   * The unique identifier of the revision.
   * @member {String} id
   */
  exports.prototype['id'] = undefined;
  /**
   * The user identifier who created the revision
   * @member {String} user
   */
  exports.prototype['user'] = undefined;
  /**
   * @member {Array.<String>} collaborators
   */
  exports.prototype['collaborators'] = undefined;
  /**
   * The date when this revision was created
   * @member {Date} creationDate
   */
  exports.prototype['creationDate'] = undefined;
  /**
   * A description associated to the revision
   * @member {String} description
   */
  exports.prototype['description'] = undefined;
  /**
   * True if this revision was automatically generated by Flat and not on purpose by the user. 
   * @member {Boolean} autosave
   */
  exports.prototype['autosave'] = undefined;
  /**
   * @member {module:model/ScoreRevisionStatistics} statistics
   */
  exports.prototype['statistics'] = undefined;



  return exports;
}));


