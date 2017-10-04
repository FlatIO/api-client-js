/**
 * Flat API
 * The Flat API allows you to easily extend the abilities of the [Flat Platform](https://flat.io), with a wide range of use cases including the following:  * Creating and importing new music scores using MusicXML or MIDI files * Browsing, updating, copying, exporting the user's scores (for example in MP3, WAV or MIDI) * Managing educational resources with Flat for Education: creating & updating the organization accounts, the classes, rosters and assignments.  The Flat API is built on HTTP. Our API is RESTful It has predictable resource URLs. It returns HTTP response codes to indicate errors. It also accepts and returns JSON in the HTTP body. The [schema](/swagger.yaml) of this API follows the [OpenAPI Initiative (OAI) specification](https://www.openapis.org/), you can use and work with [compatible Swagger tools](http://swagger.io/open-source-integrations/). This API features Cross-Origin Resource Sharing (CORS) implemented in compliance with [W3C spec](https://www.w3.org/TR/cors/).  You can use your favorite HTTP/REST library for your programming language to use Flat's API. This specification and reference is [available on Github](https://github.com/FlatIO/api-reference).  Getting Started and learn more:  * [API Overview and interoduction](https://flat.io/developers/docs/api/) * [Authentication (Personal Access Tokens or OAuth2)](https://flat.io/developers/docs/api/authentication.html) * [SDKs](https://flat.io/developers/docs/api/sdks.html) * [Rate Limits](https://flat.io/developers/docs/api/rate-limits.html) * [Changelog](https://flat.io/developers/docs/api/changelog.html) 
 *
 * OpenAPI spec version: 2.4.0
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
    define(['ApiClient', 'model/ScoreData', 'model/ScoreDataEncoding'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./ScoreData'), require('./ScoreDataEncoding'));
  } else {
    // Browser globals (root is window)
    if (!root.FlatApi) {
      root.FlatApi = {};
    }
    root.FlatApi.ScoreRevisionCreation = factory(root.FlatApi.ApiClient, root.FlatApi.ScoreData, root.FlatApi.ScoreDataEncoding);
  }
}(this, function(ApiClient, ScoreData, ScoreDataEncoding) {
  'use strict';




  /**
   * The ScoreRevisionCreation model module.
   * @module model/ScoreRevisionCreation
   * @version 2.4.0
   */

  /**
   * Constructs a new <code>ScoreRevisionCreation</code>.
   * A new created revision
   * @alias module:model/ScoreRevisionCreation
   * @class
   * @param data {module:model/ScoreData} 
   */
  var exports = function(data) {
    var _this = this;

    _this['data'] = data;



  };

  /**
   * Constructs a <code>ScoreRevisionCreation</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/ScoreRevisionCreation} obj Optional instance to populate.
   * @return {module:model/ScoreRevisionCreation} The populated <code>ScoreRevisionCreation</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('data')) {
        obj['data'] = ScoreData.constructFromObject(data['data']);
      }
      if (data.hasOwnProperty('dataEncoding')) {
        obj['dataEncoding'] = ScoreDataEncoding.constructFromObject(data['dataEncoding']);
      }
      if (data.hasOwnProperty('autosave')) {
        obj['autosave'] = ApiClient.convertToType(data['autosave'], 'Boolean');
      }
      if (data.hasOwnProperty('description')) {
        obj['description'] = ApiClient.convertToType(data['description'], 'String');
      }
    }
    return obj;
  }

  /**
   * @member {module:model/ScoreData} data
   */
  exports.prototype['data'] = undefined;
  /**
   * @member {module:model/ScoreDataEncoding} dataEncoding
   */
  exports.prototype['dataEncoding'] = undefined;
  /**
   * Must be set to `true` if the revision was created automatically. 
   * @member {Boolean} autosave
   */
  exports.prototype['autosave'] = undefined;
  /**
   * A description associated to the revision
   * @member {String} description
   */
  exports.prototype['description'] = undefined;



  return exports;
}));


