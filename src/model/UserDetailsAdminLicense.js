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
    define(['ApiClient', 'model/LicenseMode', 'model/LicenseSources'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./LicenseMode'), require('./LicenseSources'));
  } else {
    // Browser globals (root is window)
    if (!root.FlatApi) {
      root.FlatApi = {};
    }
    root.FlatApi.UserDetailsAdminLicense = factory(root.FlatApi.ApiClient, root.FlatApi.LicenseMode, root.FlatApi.LicenseSources);
  }
}(this, function(ApiClient, LicenseMode, LicenseSources) {
  'use strict';




  /**
   * The UserDetailsAdminLicense model module.
   * @module model/UserDetailsAdminLicense
   * @version 2.6.0
   */

  /**
   * Constructs a new <code>UserDetailsAdminLicense</code>.
   * Current active license of the user
   * @alias module:model/UserDetailsAdminLicense
   * @class
   */
  var exports = function() {
    var _this = this;






  };

  /**
   * Constructs a <code>UserDetailsAdminLicense</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/UserDetailsAdminLicense} obj Optional instance to populate.
   * @return {module:model/UserDetailsAdminLicense} The populated <code>UserDetailsAdminLicense</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('id')) {
        obj['id'] = ApiClient.convertToType(data['id'], 'String');
      }
      if (data.hasOwnProperty('expirationDate')) {
        obj['expirationDate'] = ApiClient.convertToType(data['expirationDate'], 'Date');
      }
      if (data.hasOwnProperty('source')) {
        obj['source'] = LicenseSources.constructFromObject(data['source']);
      }
      if (data.hasOwnProperty('mode')) {
        obj['mode'] = LicenseMode.constructFromObject(data['mode']);
      }
      if (data.hasOwnProperty('active')) {
        obj['active'] = ApiClient.convertToType(data['active'], 'Boolean');
      }
    }
    return obj;
  }

  /**
   * ID of the current license
   * @member {String} id
   */
  exports.prototype['id'] = undefined;
  /**
   * Date when the license expires
   * @member {Date} expirationDate
   */
  exports.prototype['expirationDate'] = undefined;
  /**
   * @member {module:model/LicenseSources} source
   */
  exports.prototype['source'] = undefined;
  /**
   * @member {module:model/LicenseMode} mode
   */
  exports.prototype['mode'] = undefined;
  /**
   * ID of the current license
   * @member {Boolean} active
   */
  exports.prototype['active'] = undefined;



  return exports;
}));


