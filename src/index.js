/**
 * Flat API
 * # Introduction The Flat API allows you to easily extend the abilities of the [Flat Platform](https://flat.io), with a wide range of use cases including the following:     - Creating and importing new music scores using MusicXML or MIDI files    - Browsing, updating, copying, exporting the user's scores (for example in MP3, WAV or MIDI)    - Managing educational resources with Flat for Education: creating & updating the organization accounts, the classes, rosters and assignments.  The Flat API is built on HTTP. Our API is RESTful It has predictable resource URLs. It returns HTTP response codes to indicate errors. It also accepts and returns JSON in the HTTP body. The [schema](/swagger.yaml) of this API follows the [OpenAPI Initiative (OAI) specification](https://www.openapis.org/), you can use and work with [compatible Swagger tools](http://swagger.io/open-source-integrations/).  You can use your favorite HTTP/REST library for your programming language to use Flat's API. This specification and reference is [available on Github](https://github.com/FlatIO/api-reference).  # Beta Please note that this public API is currently in beta and subject to change.  Our whole platform and apps are based on this API, however not all the endpoints are available publicly yet. Feel free to [contact us](mailto:developers@flat.io) if you have any questions, feedback or features requests.  We don't offer any guarantees during this beta period. By using this API, you agree to update your app in a timely fashion in response to any beta-period changes that are rolled out.  By using this API, and especially on the behalf of a user account, you must accept, respect and enforce our [Terms of Service and Privacy Policy](https://flat.io/legal).  # SDKs  Our team maintain the following SDKs:   - [https://github.com/FlatIO/api-client-python](Python)  # Authentication The Flat API supports OAuth2, you can request API credentials [on our website](https://flat.io/developers). We provide two types of credentials:    - **Account Access Tokens**: Simple access tokens that allow to try and use this API **with your own account**. This is a great solution to create private apps.   - **OAuth2 Credentials**: If you plan to use the Flat API **on the behalf of mutliple users** or make this app public, request OAuth2 Credentials.  <!-- ReDoc-Inject: <security-definitions> -->  ### OAuth2 Authorization page  The Authorization page (`https://flat.io/auth/oauth`) supports all the standard parameters from the **Authorization Code** flow ([RFC6749/4.1.1](https://tools.ietf.org/html/rfc6749#section-4.1.1)) and the **Implicit** flow ([RFC6749/4.2.1](https://tools.ietf.org/html/rfc6749#section-4.2.1)). Here is a summary of the parameters available, including non-standard and optional parameters. All of them can be passed as query string when redirecting the end-user to the authorization page.  Property name  | Required | Values and Description ---------------|----------|----------------------- `client_id`    | Required | The client id (aka key) from the couple key/secret provided by Flat `response_type`| Required | We support `code` (**Authorization Code** flow, [RFC6749/4.1.1](https://tools.ietf.org/html/rfc6749#section-4.1.1)) and `token`, [RFC6749/4.2.1](https://tools.ietf.org/html/rfc6749#section-4.2.1)). It is strongly advised to use the Authorization Code flow for any server-side usage and the Implicit flow for any client-side (e.g. JavaScript) usage. `scope`        | Required | You must provide a list of scopes listed above and granted for your app, separated with a space. `redirect_uri` | Required | Determines where the response is sent. The value of this parameter must exactly match the value specified in your App Credentials settings. `state`        | Optional | An opaque string that is round-tripped in the protocol; that is to say, it is returned as a URI parameter in the Basic flow, and in the URI #fragment in the Implicit flow. `access_type`  | Optional, only available for the Authorization Code flow | The acceptable values are `online` and `offline`. When specifying `offline`, the API will return a refresh token during the access token exchange.  ### OAuth2 tokens revocation  This OAuth2 API supports token revocation ([RFC 7009](http://tools.ietf.org/html/rfc7009)) at the following endpoint: `https://api.flat.io/oauth/invalidate_token`.  # CORS This API features Cross-Origin Resource Sharing (CORS) implemented in compliance with [W3C spec](https://www.w3.org/TR/cors/). And that allows cross-domain communication from the browser. All responses have a wildcard same-origin which makes them completely public and accessible to everyone, including any code on any site.  # Rate Limiting For authenticated requests, you can make up to 5,000 requests per hour. For unauthenticated requests, the rate limit allows you to make up to 500 requests per hour. Unauthenticated requests are associated with your IP address, and not the user or app making requests. You can contact us if you need [extra quota](https://flat.io/developers). To protect our quality of service, additional rate limits may apply to some API calls or actions.  You can check the returned HTTP headers of any API request to see your current rate limit status: ```bash curl -i https://api.flat.io/v2/me HTTP/1.1 200 OK Date: Sat, 25 Mar 2017 17:06:20 GMT X-RateLimit-Limit: 5000 X-RateLimit-Remaining: 4999 X-RateLimit-Reset: 1490465178 ```  The headers tell you everything you need to know about your current rate limit status:  Header name | Description ------------|------------ `X-RateLimit-Limit` | The maximum number of requests that the consumer is permitted to make per hour. `X-RateLimit-Remaining` | The number of requests remaining in the current rate limit window. This value can be negative if you try to go over the allowed quota. `X-RateLimit-Reset` | The time at which the current rate limit window resets in [UTC epoch seconds](http://en.wikipedia.org/wiki/Unix_time).  If you need the time in a different format, any modern programming language can get the job done. For example, if you open up the console on your web browser, you can easily get the reset time as a JavaScript Date object.  ```javascript new Date(1490465178 * 1000).toString() 'Sat Mar 25 2017 19:06:18 GMT+0100 (CET)' ```  Once you go over the rate limit you will receive an error response: ```bash curl -i https://api.flat.io/v2/me HTTP/1.1 403 Forbidden X-RateLimit-Limit: 5000 X-RateLimit-Remaining: 0 X-RateLimit-Reset: 1490465829  {   \"message\": \"API rate limit exceeded for xx.xxx.xxx.xx\",   \"code\": \"API_RATE_LIMIT_EXCEEDED\" } ``` 
 *
 * OpenAPI spec version: 2.0.0
 * Contact: developers@flat.io
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 *
 */

(function(factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/ClassRoles', 'model/FlatErrorResponse', 'model/FlatLocales', 'model/Group', 'model/OrganizationRoles', 'model/ScoreCollaborator', 'model/ScoreCollaboratorCreation', 'model/ScoreComment', 'model/ScoreCommentContext', 'model/ScoreCommentCreation', 'model/ScoreCommentUpdate', 'model/ScoreCommentsCounts', 'model/ScoreCreation', 'model/ScoreData', 'model/ScoreDataEncoding', 'model/ScoreDetails', 'model/ScoreFork', 'model/ScoreLikesCounts', 'model/ScoreModification', 'model/ScorePrivacy', 'model/ScoreRevision', 'model/ScoreRevisionCreation', 'model/ScoreRevisionStatistics', 'model/ScoreRights', 'model/ScoreSource', 'model/ScoreSummary', 'model/ScoreViewsCounts', 'model/UserBasics', 'model/UserDetails', 'model/UserPublic', 'model/UserPublicSummary', 'api/AccountApi', 'api/GroupApi', 'api/ScoreApi', 'api/UserApi'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('./ApiClient'), require('./model/ClassRoles'), require('./model/FlatErrorResponse'), require('./model/FlatLocales'), require('./model/Group'), require('./model/OrganizationRoles'), require('./model/ScoreCollaborator'), require('./model/ScoreCollaboratorCreation'), require('./model/ScoreComment'), require('./model/ScoreCommentContext'), require('./model/ScoreCommentCreation'), require('./model/ScoreCommentUpdate'), require('./model/ScoreCommentsCounts'), require('./model/ScoreCreation'), require('./model/ScoreData'), require('./model/ScoreDataEncoding'), require('./model/ScoreDetails'), require('./model/ScoreFork'), require('./model/ScoreLikesCounts'), require('./model/ScoreModification'), require('./model/ScorePrivacy'), require('./model/ScoreRevision'), require('./model/ScoreRevisionCreation'), require('./model/ScoreRevisionStatistics'), require('./model/ScoreRights'), require('./model/ScoreSource'), require('./model/ScoreSummary'), require('./model/ScoreViewsCounts'), require('./model/UserBasics'), require('./model/UserDetails'), require('./model/UserPublic'), require('./model/UserPublicSummary'), require('./api/AccountApi'), require('./api/GroupApi'), require('./api/ScoreApi'), require('./api/UserApi'));
  }
}(function(ApiClient, ClassRoles, FlatErrorResponse, FlatLocales, Group, OrganizationRoles, ScoreCollaborator, ScoreCollaboratorCreation, ScoreComment, ScoreCommentContext, ScoreCommentCreation, ScoreCommentUpdate, ScoreCommentsCounts, ScoreCreation, ScoreData, ScoreDataEncoding, ScoreDetails, ScoreFork, ScoreLikesCounts, ScoreModification, ScorePrivacy, ScoreRevision, ScoreRevisionCreation, ScoreRevisionStatistics, ScoreRights, ScoreSource, ScoreSummary, ScoreViewsCounts, UserBasics, UserDetails, UserPublic, UserPublicSummary, AccountApi, GroupApi, ScoreApi, UserApi) {
  'use strict';

  /**
   * JavaScript Client for Flat REST API (https://flat.io).<br>
   * The <code>index</code> module provides access to constructors for all the classes which comprise the public API.
   * <p>
   * An AMD (recommended!) or CommonJS application will generally do something equivalent to the following:
   * <pre>
   * var FlatApi = require('index'); // See note below*.
   * var xxxSvc = new FlatApi.XxxApi(); // Allocate the API class we're going to use.
   * var yyyModel = new FlatApi.Yyy(); // Construct a model instance.
   * yyyModel.someProperty = 'someValue';
   * ...
   * var zzz = xxxSvc.doSomething(yyyModel); // Invoke the service.
   * ...
   * </pre>
   * <em>*NOTE: For a top-level AMD script, use require(['index'], function(){...})
   * and put the application logic within the callback function.</em>
   * </p>
   * <p>
   * A non-AMD browser application (discouraged) might do something like this:
   * <pre>
   * var xxxSvc = new FlatApi.XxxApi(); // Allocate the API class we're going to use.
   * var yyy = new FlatApi.Yyy(); // Construct a model instance.
   * yyyModel.someProperty = 'someValue';
   * ...
   * var zzz = xxxSvc.doSomething(yyyModel); // Invoke the service.
   * ...
   * </pre>
   * </p>
   * @module index
   * @version 2.0.0
   */
  var exports = {
    /**
     * The ApiClient constructor.
     * @property {module:ApiClient}
     */
    ApiClient: ApiClient,
    /**
     * The ClassRoles model constructor.
     * @property {module:model/ClassRoles}
     */
    ClassRoles: ClassRoles,
    /**
     * The FlatErrorResponse model constructor.
     * @property {module:model/FlatErrorResponse}
     */
    FlatErrorResponse: FlatErrorResponse,
    /**
     * The FlatLocales model constructor.
     * @property {module:model/FlatLocales}
     */
    FlatLocales: FlatLocales,
    /**
     * The Group model constructor.
     * @property {module:model/Group}
     */
    Group: Group,
    /**
     * The OrganizationRoles model constructor.
     * @property {module:model/OrganizationRoles}
     */
    OrganizationRoles: OrganizationRoles,
    /**
     * The ScoreCollaborator model constructor.
     * @property {module:model/ScoreCollaborator}
     */
    ScoreCollaborator: ScoreCollaborator,
    /**
     * The ScoreCollaboratorCreation model constructor.
     * @property {module:model/ScoreCollaboratorCreation}
     */
    ScoreCollaboratorCreation: ScoreCollaboratorCreation,
    /**
     * The ScoreComment model constructor.
     * @property {module:model/ScoreComment}
     */
    ScoreComment: ScoreComment,
    /**
     * The ScoreCommentContext model constructor.
     * @property {module:model/ScoreCommentContext}
     */
    ScoreCommentContext: ScoreCommentContext,
    /**
     * The ScoreCommentCreation model constructor.
     * @property {module:model/ScoreCommentCreation}
     */
    ScoreCommentCreation: ScoreCommentCreation,
    /**
     * The ScoreCommentUpdate model constructor.
     * @property {module:model/ScoreCommentUpdate}
     */
    ScoreCommentUpdate: ScoreCommentUpdate,
    /**
     * The ScoreCommentsCounts model constructor.
     * @property {module:model/ScoreCommentsCounts}
     */
    ScoreCommentsCounts: ScoreCommentsCounts,
    /**
     * The ScoreCreation model constructor.
     * @property {module:model/ScoreCreation}
     */
    ScoreCreation: ScoreCreation,
    /**
     * The ScoreData model constructor.
     * @property {module:model/ScoreData}
     */
    ScoreData: ScoreData,
    /**
     * The ScoreDataEncoding model constructor.
     * @property {module:model/ScoreDataEncoding}
     */
    ScoreDataEncoding: ScoreDataEncoding,
    /**
     * The ScoreDetails model constructor.
     * @property {module:model/ScoreDetails}
     */
    ScoreDetails: ScoreDetails,
    /**
     * The ScoreFork model constructor.
     * @property {module:model/ScoreFork}
     */
    ScoreFork: ScoreFork,
    /**
     * The ScoreLikesCounts model constructor.
     * @property {module:model/ScoreLikesCounts}
     */
    ScoreLikesCounts: ScoreLikesCounts,
    /**
     * The ScoreModification model constructor.
     * @property {module:model/ScoreModification}
     */
    ScoreModification: ScoreModification,
    /**
     * The ScorePrivacy model constructor.
     * @property {module:model/ScorePrivacy}
     */
    ScorePrivacy: ScorePrivacy,
    /**
     * The ScoreRevision model constructor.
     * @property {module:model/ScoreRevision}
     */
    ScoreRevision: ScoreRevision,
    /**
     * The ScoreRevisionCreation model constructor.
     * @property {module:model/ScoreRevisionCreation}
     */
    ScoreRevisionCreation: ScoreRevisionCreation,
    /**
     * The ScoreRevisionStatistics model constructor.
     * @property {module:model/ScoreRevisionStatistics}
     */
    ScoreRevisionStatistics: ScoreRevisionStatistics,
    /**
     * The ScoreRights model constructor.
     * @property {module:model/ScoreRights}
     */
    ScoreRights: ScoreRights,
    /**
     * The ScoreSource model constructor.
     * @property {module:model/ScoreSource}
     */
    ScoreSource: ScoreSource,
    /**
     * The ScoreSummary model constructor.
     * @property {module:model/ScoreSummary}
     */
    ScoreSummary: ScoreSummary,
    /**
     * The ScoreViewsCounts model constructor.
     * @property {module:model/ScoreViewsCounts}
     */
    ScoreViewsCounts: ScoreViewsCounts,
    /**
     * The UserBasics model constructor.
     * @property {module:model/UserBasics}
     */
    UserBasics: UserBasics,
    /**
     * The UserDetails model constructor.
     * @property {module:model/UserDetails}
     */
    UserDetails: UserDetails,
    /**
     * The UserPublic model constructor.
     * @property {module:model/UserPublic}
     */
    UserPublic: UserPublic,
    /**
     * The UserPublicSummary model constructor.
     * @property {module:model/UserPublicSummary}
     */
    UserPublicSummary: UserPublicSummary,
    /**
     * The AccountApi service constructor.
     * @property {module:api/AccountApi}
     */
    AccountApi: AccountApi,
    /**
     * The GroupApi service constructor.
     * @property {module:api/GroupApi}
     */
    GroupApi: GroupApi,
    /**
     * The ScoreApi service constructor.
     * @property {module:api/ScoreApi}
     */
    ScoreApi: ScoreApi,
    /**
     * The UserApi service constructor.
     * @property {module:api/UserApi}
     */
    UserApi: UserApi
  };

  return exports;
}));
