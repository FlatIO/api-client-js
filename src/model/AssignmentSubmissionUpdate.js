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
    define(['ApiClient', 'model/ClassAttachmentCreation'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./ClassAttachmentCreation'));
  } else {
    // Browser globals (root is window)
    if (!root.FlatApi) {
      root.FlatApi = {};
    }
    root.FlatApi.AssignmentSubmissionUpdate = factory(root.FlatApi.ApiClient, root.FlatApi.ClassAttachmentCreation);
  }
}(this, function(ApiClient, ClassAttachmentCreation) {
  'use strict';




  /**
   * The AssignmentSubmissionUpdate model module.
   * @module model/AssignmentSubmissionUpdate
   * @version 2.2.0
   */

  /**
   * Constructs a new <code>AssignmentSubmissionUpdate</code>.
   * Assignment Submission creation
   * @alias module:model/AssignmentSubmissionUpdate
   * @class
   */
  var exports = function() {
    var _this = this;





  };

  /**
   * Constructs a <code>AssignmentSubmissionUpdate</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/AssignmentSubmissionUpdate} obj Optional instance to populate.
   * @return {module:model/AssignmentSubmissionUpdate} The populated <code>AssignmentSubmissionUpdate</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('attachments')) {
        obj['attachments'] = ApiClient.convertToType(data['attachments'], [ClassAttachmentCreation]);
      }
      if (data.hasOwnProperty('studentComment')) {
        obj['studentComment'] = ApiClient.convertToType(data['studentComment'], 'String');
      }
      if (data.hasOwnProperty('submit')) {
        obj['submit'] = ApiClient.convertToType(data['submit'], 'Boolean');
      }
      if (data.hasOwnProperty('returnFeedback')) {
        obj['returnFeedback'] = ApiClient.convertToType(data['returnFeedback'], 'String');
      }
    }
    return obj;
  }

  /**
   * @member {Array.<module:model/ClassAttachmentCreation>} attachments
   */
  exports.prototype['attachments'] = undefined;
  /**
   * An optionnal comment sent by the student when submitting his work 
   * @member {String} studentComment
   */
  exports.prototype['studentComment'] = undefined;
  /**
   * If `true`, the submission will be marked as done
   * @member {Boolean} submit
   */
  exports.prototype['submit'] = undefined;
  /**
   * The feedback associated with the return
   * @member {String} returnFeedback
   */
  exports.prototype['returnFeedback'] = undefined;



  return exports;
}));


