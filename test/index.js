'use strict';

var assert = require('assert');
var quickGist = require('../lib');
var fs = require('fs');
var path = require('path');

describe('quick-gist', function() {
  this.timeout(10000);
  it('should create a private gist', function(done) {
    quickGist({
      content: 'for link in links:'
    }, function(err, resp, data) {
      assert.equal(data.files['gist1.py'].filename, 'gist1.py');
      done();
    });
  });
  it('should create a public gist', function(done) {
    quickGist({
      content: 'for link in links:',
      public: true
    }, function(err, resp, data) {
      assert.ok(data.public);
      done();
    });
  });
  it('should throw without options', function() {
    assert.throws(function() {
      quickGist();
    });
  });
  it('should throw without content', function() {
    assert.throws(function() {
      quickGist({foo: 'bar'});
    });
  });
  it('should throw if enterpriseOnly is true and no endpoint is set', function() {
    delete process.env.QUICK_GIST_ENDPOINT
    assert.throws(function() {
      quickGist({content: 'bar', enterpriseOnly: true});
    });
  });
  it('should throw if the endpoint is set to the public api', function() {
    process.env.QUICK_GIST_ENDPOINT = 'https://api.github.com/gists'
    assert.throws(function() {
      quickGist({content: 'bar', enterpriseOnly: true});
    });
  });
  it('should handle large gists', function(done) {
    var file = fs.readFileSync(path.join(__dirname, '../', 'lib', 'index.js'), 'utf8');
    quickGist({
      content: file
    }, function(err, resp, data) {
      assert.ok(!data.public);
      done();
    });
  });
  it('should handle multiple files', function(done) {
    quickGist({
      content: [
        'for link in links:',
        'for link in links:'
      ]
    }, function(err, resp, data) {
      assert.equal(data.files['gist1.py'].filename, 'gist1.py');
      assert.equal(data.files['gist2.py'].filename, 'gist2.py');
      done();
    })
  });
});
