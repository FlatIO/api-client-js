/**
 * Flat API
 * # Introduction The Flat API allows you to easily extend the abilities of the [Flat Platform](https://flat.io), with a wide range of use cases including the following:     - Creating and importing new music scores using MusicXML or MIDI files    - Browsing, updating, copying, exporting the user's scores (for example in MP3, WAV or MIDI)    - Managing educational resources with Flat for Education: creating & updating the organization accounts, the classes, rosters and assignments.  The Flat API is built on HTTP. Our API is RESTful It has predictable resource URLs. It returns HTTP response codes to indicate errors. It also accepts and returns JSON in the HTTP body. The [schema](/swagger.yaml) of this API follows the [OpenAPI Initiative (OAI) specification](https://www.openapis.org/), you can use and work with [compatible Swagger tools](http://swagger.io/open-source-integrations/).  You can use your favorite HTTP/REST library for your programming language to use Flat's API. This specification and reference is [available on Github](https://github.com/FlatIO/api-reference).  # Beta Please note that this public API is currently in beta and subject to change.  Our whole platform and apps are based on this API, however not all the endpoints are available publicly yet. Feel free to [contact us](mailto:developers@flat.io) if you have any questions, feedback or features requests.  We don't offer any guarantees during this beta period. By using this API, you agree to update your app in a timely fashion in response to any beta-period changes that are rolled out.  By using this API, and especially on the behalf of a user account, you must accept, respect and enforce our [Terms of Service and Privacy Policy](https://flat.io/legal).  # SDKs  Our team maintains the following SDKs:   - [Python](https://github.com/FlatIO/api-client-python)   - [JavaScript (Node.js and Browser)](https://github.com/FlatIO/api-client-js)   - [PHP](https://github.com/FlatIO/api-client-php)  # Authentication The Flat API supports OAuth2, you can request API credentials [on our website](https://flat.io/developers). We provide two types of credentials:    - **Account Access Tokens**: Simple access tokens that allow to try and use this API **with your own account**. This is a great solution to create private apps.   - **OAuth2 Credentials**: If you plan to use the Flat API **on the behalf of mutliple users** or make this app public, request OAuth2 Credentials.  <!-- ReDoc-Inject: <security-definitions> -->  ### OAuth2 Authorization page  The Authorization page (`https://flat.io/auth/oauth`) supports all the standard parameters from the **Authorization Code** flow ([RFC6749/4.1.1](https://tools.ietf.org/html/rfc6749#section-4.1.1)) and the **Implicit** flow ([RFC6749/4.2.1](https://tools.ietf.org/html/rfc6749#section-4.2.1)). Here is a summary of the parameters available, including non-standard and optional parameters. All of them can be passed as query string when redirecting the end-user to the authorization page.  Property name  | Required | Values and Description ---------------|----------|----------------------- `client_id`    | Required | The client id (aka key) from the couple key/secret provided by Flat `response_type`| Required | We support `code` (**Authorization Code** flow, [RFC6749/4.1.1](https://tools.ietf.org/html/rfc6749#section-4.1.1)) and `token`, [RFC6749/4.2.1](https://tools.ietf.org/html/rfc6749#section-4.2.1)). It is strongly advised to use the Authorization Code flow for any server-side usage and the Implicit flow for any client-side (e.g. JavaScript) usage. `scope`        | Required | You must provide a list of scopes listed above and granted for your app, separated with a space. `redirect_uri` | Required | Determines where the response is sent. The value of this parameter must exactly match the value specified in your App Credentials settings. `state`        | Optional | An opaque string that is round-tripped in the protocol; that is to say, it is returned as a URI parameter in the Basic flow, and in the URI #fragment in the Implicit flow. `access_type`  | Optional, only available for the Authorization Code flow | The acceptable values are `online` and `offline`. When specifying `offline`, the API will return a refresh token during the access token exchange.  ### OAuth2 tokens revocation  This OAuth2 API supports token revocation ([RFC 7009](http://tools.ietf.org/html/rfc7009)) at the following endpoint: `https://api.flat.io/oauth/invalidate_token`.  # CORS This API features Cross-Origin Resource Sharing (CORS) implemented in compliance with [W3C spec](https://www.w3.org/TR/cors/). And that allows cross-domain communication from the browser. All responses have a wildcard same-origin which makes them completely public and accessible to everyone, including any code on any site.  # Rate Limiting For authenticated requests, you can make up to 5,000 requests per hour. For unauthenticated requests, the rate limit allows you to make up to 500 requests per hour. Unauthenticated requests are associated with your IP address, and not the user or app making requests. You can contact us if you need [extra quota](https://flat.io/developers). To protect our quality of service, additional rate limits may apply to some API calls or actions.  You can check the returned HTTP headers of any API request to see your current rate limit status: ```bash curl -i https://api.flat.io/v2/me HTTP/1.1 200 OK Date: Sat, 25 Mar 2017 17:06:20 GMT X-RateLimit-Limit: 5000 X-RateLimit-Remaining: 4999 X-RateLimit-Reset: 1490465178 ```  The headers tell you everything you need to know about your current rate limit status:  Header name | Description ------------|------------ `X-RateLimit-Limit` | The maximum number of requests that the consumer is permitted to make per hour. `X-RateLimit-Remaining` | The number of requests remaining in the current rate limit window. This value can be negative if you try to go over the allowed quota. `X-RateLimit-Reset` | The time at which the current rate limit window resets in [UTC epoch seconds](http://en.wikipedia.org/wiki/Unix_time).  If you need the time in a different format, any modern programming language can get the job done. For example, if you open up the console on your web browser, you can easily get the reset time as a JavaScript Date object.  ```javascript new Date(1490465178 * 1000).toString() 'Sat Mar 25 2017 19:06:18 GMT+0100 (CET)' ```  Once you go over the rate limit you will receive an error response: ```bash curl -i https://api.flat.io/v2/me HTTP/1.1 403 Forbidden X-RateLimit-Limit: 5000 X-RateLimit-Remaining: 0 X-RateLimit-Reset: 1490465829  {   \"message\": \"API rate limit exceeded for xx.xxx.xxx.xx\",   \"code\": \"API_RATE_LIMIT_EXCEEDED\" } ``` 
 *
 * OpenAPI spec version: 2.0.0
 * Contact: developers@flat.io
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 *
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/ScoreCollaborator', 'model/ScoreCommentsCounts', 'model/ScoreLikesCounts', 'model/ScorePrivacy', 'model/ScoreRights', 'model/ScoreSummary', 'model/ScoreViewsCounts', 'model/UserPublicSummary'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./ScoreCollaborator'), require('./ScoreCommentsCounts'), require('./ScoreLikesCounts'), require('./ScorePrivacy'), require('./ScoreRights'), require('./ScoreSummary'), require('./ScoreViewsCounts'), require('./UserPublicSummary'));
  } else {
    // Browser globals (root is window)
    if (!root.FlatApi) {
      root.FlatApi = {};
    }
    root.FlatApi.ScoreDetails = factory(root.FlatApi.ApiClient, root.FlatApi.ScoreCollaborator, root.FlatApi.ScoreCommentsCounts, root.FlatApi.ScoreLikesCounts, root.FlatApi.ScorePrivacy, root.FlatApi.ScoreRights, root.FlatApi.ScoreSummary, root.FlatApi.ScoreViewsCounts, root.FlatApi.UserPublicSummary);
  }
}(this, function(ApiClient, ScoreCollaborator, ScoreCommentsCounts, ScoreLikesCounts, ScorePrivacy, ScoreRights, ScoreSummary, ScoreViewsCounts, UserPublicSummary) {
  'use strict';




  /**
   * The ScoreDetails model module.
   * @module model/ScoreDetails
   * @version 2.0.0
   */

  /**
   * Constructs a new <code>ScoreDetails</code>.
   * The score and all its details
   * @alias module:model/ScoreDetails
   * @class
   * @implements module:model/ScoreSummary
   */
  var exports = function() {
    var _this = this;

    ScoreSummary.call(_this);











  };

  /**
   * Constructs a <code>ScoreDetails</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/ScoreDetails} obj Optional instance to populate.
   * @return {module:model/ScoreDetails} The populated <code>ScoreDetails</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      ScoreSummary.constructFromObject(data, obj);
      if (data.hasOwnProperty('rights')) {
        obj['rights'] = ScoreRights.constructFromObject(data['rights']);
      }
      if (data.hasOwnProperty('collaborators')) {
        obj['collaborators'] = ApiClient.convertToType(data['collaborators'], [ScoreCollaborator]);
      }
      if (data.hasOwnProperty('creationDate')) {
        obj['creationDate'] = ApiClient.convertToType(data['creationDate'], 'Date');
      }
      if (data.hasOwnProperty('modificationDate')) {
        obj['modificationDate'] = ApiClient.convertToType(data['modificationDate'], 'Date');
      }
      if (data.hasOwnProperty('organization')) {
        obj['organization'] = ApiClient.convertToType(data['organization'], 'String');
      }
      if (data.hasOwnProperty('parentScore')) {
        obj['parentScore'] = ApiClient.convertToType(data['parentScore'], 'String');
      }
      if (data.hasOwnProperty('instruments')) {
        obj['instruments'] = ApiClient.convertToType(data['instruments'], ['String']);
      }
      if (data.hasOwnProperty('googleDriveFileId')) {
        obj['googleDriveFileId'] = ApiClient.convertToType(data['googleDriveFileId'], 'String');
      }
      if (data.hasOwnProperty('likes')) {
        obj['likes'] = ScoreLikesCounts.constructFromObject(data['likes']);
      }
      if (data.hasOwnProperty('comments')) {
        obj['comments'] = ScoreCommentsCounts.constructFromObject(data['comments']);
      }
      if (data.hasOwnProperty('views')) {
        obj['views'] = ScoreViewsCounts.constructFromObject(data['views']);
      }
    }
    return obj;
  }

  /**
   * @member {module:model/ScoreRights} rights
   */
  exports.prototype['rights'] = undefined;
  /**
   * The list of the collaborators of the score
   * @member {Array.<module:model/ScoreCollaborator>} collaborators
   */
  exports.prototype['collaborators'] = undefined;
  /**
   * The date when the score was created
   * @member {Date} creationDate
   */
  exports.prototype['creationDate'] = undefined;
  /**
   * The date of the last revision of the score
   * @member {Date} modificationDate
   */
  exports.prototype['modificationDate'] = undefined;
  /**
   * If the score has been created in an organization, the identifier of this organization. This property is especially used with the score privacy `organizationPublic`. 
   * @member {String} organization
   */
  exports.prototype['organization'] = undefined;
  /**
   * If the score has been forked, the unique identifier of the parent score. 
   * @member {String} parentScore
   */
  exports.prototype['parentScore'] = undefined;
  /**
   * An array of the instrument identifiers used in the last version of the score. This is mainly used to display a list of the instruments in the Flat's UI or instruments icons. The format of the strings is `{instrument-group}.{instrument-id}`. 
   * @member {Array.<String>} instruments
   */
  exports.prototype['instruments'] = undefined;
  /**
   * If the user uses Google Drive and the score exists on Google Drive, this field will contain the unique identifier of the Flat score on Google Drive. You can access the document using the url: `https://drive.google.com/open?id={googleDriveFileId}` 
   * @member {String} googleDriveFileId
   */
  exports.prototype['googleDriveFileId'] = undefined;
  /**
   * @member {module:model/ScoreLikesCounts} likes
   */
  exports.prototype['likes'] = undefined;
  /**
   * @member {module:model/ScoreCommentsCounts} comments
   */
  exports.prototype['comments'] = undefined;
  /**
   * @member {module:model/ScoreViewsCounts} views
   */
  exports.prototype['views'] = undefined;

  // Implement ScoreSummary interface:
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


