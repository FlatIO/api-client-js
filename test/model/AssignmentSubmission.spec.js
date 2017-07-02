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
    // AMD.
    define(['expect.js', '../../src/index'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    factory(require('expect.js'), require('../../src/index'));
  } else {
    // Browser globals (root is window)
    factory(root.expect, root.FlatApi);
  }
}(this, function(expect, FlatApi) {
  'use strict';

  var instance;

  beforeEach(function() {
    instance = new FlatApi.AssignmentSubmission();
  });

  var getProperty = function(object, getter, property) {
    // Use getter method if present; otherwise, get the property directly.
    if (typeof object[getter] === 'function')
      return object[getter]();
    else
      return object[property];
  }

  var setProperty = function(object, setter, property, value) {
    // Use setter method if present; otherwise, set the property directly.
    if (typeof object[setter] === 'function')
      object[setter](value);
    else
      object[property] = value;
  }

  describe('AssignmentSubmission', function() {
    it('should create an instance of AssignmentSubmission', function() {
      // uncomment below and update the code to test AssignmentSubmission
      //var instane = new FlatApi.AssignmentSubmission();
      //expect(instance).to.be.a(FlatApi.AssignmentSubmission);
    });

    it('should have the property id (base name: "id")', function() {
      // uncomment below and update the code to test the property id
      //var instane = new FlatApi.AssignmentSubmission();
      //expect(instance).to.be();
    });

    it('should have the property classroom (base name: "classroom")', function() {
      // uncomment below and update the code to test the property classroom
      //var instane = new FlatApi.AssignmentSubmission();
      //expect(instance).to.be();
    });

    it('should have the property assignment (base name: "assignment")', function() {
      // uncomment below and update the code to test the property assignment
      //var instane = new FlatApi.AssignmentSubmission();
      //expect(instance).to.be();
    });

    it('should have the property creator (base name: "creator")', function() {
      // uncomment below and update the code to test the property creator
      //var instane = new FlatApi.AssignmentSubmission();
      //expect(instance).to.be();
    });

    it('should have the property creationDate (base name: "creationDate")', function() {
      // uncomment below and update the code to test the property creationDate
      //var instane = new FlatApi.AssignmentSubmission();
      //expect(instance).to.be();
    });

    it('should have the property attachments (base name: "attachments")', function() {
      // uncomment below and update the code to test the property attachments
      //var instane = new FlatApi.AssignmentSubmission();
      //expect(instance).to.be();
    });

    it('should have the property submissionDate (base name: "submissionDate")', function() {
      // uncomment below and update the code to test the property submissionDate
      //var instane = new FlatApi.AssignmentSubmission();
      //expect(instance).to.be();
    });

    it('should have the property studentComment (base name: "studentComment")', function() {
      // uncomment below and update the code to test the property studentComment
      //var instane = new FlatApi.AssignmentSubmission();
      //expect(instance).to.be();
    });

    it('should have the property returnDate (base name: "returnDate")', function() {
      // uncomment below and update the code to test the property returnDate
      //var instane = new FlatApi.AssignmentSubmission();
      //expect(instance).to.be();
    });

    it('should have the property returnFeedback (base name: "returnFeedback")', function() {
      // uncomment below and update the code to test the property returnFeedback
      //var instane = new FlatApi.AssignmentSubmission();
      //expect(instance).to.be();
    });

    it('should have the property returnCreator (base name: "returnCreator")', function() {
      // uncomment below and update the code to test the property returnCreator
      //var instane = new FlatApi.AssignmentSubmission();
      //expect(instance).to.be();
    });

    it('should have the property googleClassroom (base name: "googleClassroom")', function() {
      // uncomment below and update the code to test the property googleClassroom
      //var instane = new FlatApi.AssignmentSubmission();
      //expect(instance).to.be();
    });

  });

}));
