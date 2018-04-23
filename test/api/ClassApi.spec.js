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
    instance = new FlatApi.ClassApi();
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

  describe('ClassApi', function() {
    describe('activateClass', function() {
      it('should call activateClass successfully', function(done) {
        //uncomment below and update the code to test activateClass
        //instance.activateClass(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('addClassUser', function() {
      it('should call addClassUser successfully', function(done) {
        //uncomment below and update the code to test addClassUser
        //instance.addClassUser(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('archiveClass', function() {
      it('should call archiveClass successfully', function(done) {
        //uncomment below and update the code to test archiveClass
        //instance.archiveClass(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('copyAssignment', function() {
      it('should call copyAssignment successfully', function(done) {
        //uncomment below and update the code to test copyAssignment
        //instance.copyAssignment(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('createAssignment', function() {
      it('should call createAssignment successfully', function(done) {
        //uncomment below and update the code to test createAssignment
        //instance.createAssignment(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('createClass', function() {
      it('should call createClass successfully', function(done) {
        //uncomment below and update the code to test createClass
        //instance.createClass(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('createSubmission', function() {
      it('should call createSubmission successfully', function(done) {
        //uncomment below and update the code to test createSubmission
        //instance.createSubmission(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('deleteClassUser', function() {
      it('should call deleteClassUser successfully', function(done) {
        //uncomment below and update the code to test deleteClassUser
        //instance.deleteClassUser(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('editSubmission', function() {
      it('should call editSubmission successfully', function(done) {
        //uncomment below and update the code to test editSubmission
        //instance.editSubmission(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('enrollClass', function() {
      it('should call enrollClass successfully', function(done) {
        //uncomment below and update the code to test enrollClass
        //instance.enrollClass(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('getClass', function() {
      it('should call getClass successfully', function(done) {
        //uncomment below and update the code to test getClass
        //instance.getClass(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('getScoreSubmissions', function() {
      it('should call getScoreSubmissions successfully', function(done) {
        //uncomment below and update the code to test getScoreSubmissions
        //instance.getScoreSubmissions(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('getSubmission', function() {
      it('should call getSubmission successfully', function(done) {
        //uncomment below and update the code to test getSubmission
        //instance.getSubmission(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('getSubmissions', function() {
      it('should call getSubmissions successfully', function(done) {
        //uncomment below and update the code to test getSubmissions
        //instance.getSubmissions(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('listAssignments', function() {
      it('should call listAssignments successfully', function(done) {
        //uncomment below and update the code to test listAssignments
        //instance.listAssignments(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('listClassStudentSubmissions', function() {
      it('should call listClassStudentSubmissions successfully', function(done) {
        //uncomment below and update the code to test listClassStudentSubmissions
        //instance.listClassStudentSubmissions(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('listClasses', function() {
      it('should call listClasses successfully', function(done) {
        //uncomment below and update the code to test listClasses
        //instance.listClasses(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('unarchiveClass', function() {
      it('should call unarchiveClass successfully', function(done) {
        //uncomment below and update the code to test unarchiveClass
        //instance.unarchiveClass(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('updateClass', function() {
      it('should call updateClass successfully', function(done) {
        //uncomment below and update the code to test updateClass
        //instance.updateClass(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
  });

}));
