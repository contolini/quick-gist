'use strict';

var request = require('request'),
    pkg = require('../package.json'),
    lang = require('language-classifier');

var exts = {};
exts['ruby'] = 'rb';
exts['python'] = 'py';
exts['javascript'] = 'js';
exts['objective-c'] = 'm';
exts['html'] = 'html';
exts['css'] = 'css';
exts['shell'] = 'sh';
exts['c++'] = 'cpp';
exts['c'] = 'c';
exts['text'] = 'txt';

var gist = function(opts, cb) {

  var files = {};
  var endpoint = process.env.QUICK_GIST_ENDPOINT || 'https://api.github.com/gists';

  if (typeof opts !== 'object') cb(new Error('Please provide text to save to the gist.'));
  if (!opts.content) cb(new Error('Please provide gist contents with a `content` property.'));

  opts.content = opts.content instanceof Array ? opts.content : [opts.content];

  opts.content.forEach(function(content, i) {
    var language = lang(content) || 'text',
        filename = 'gist' + (i + 1) + '.' + exts[language];
    files[filename] = {
      content: content
    };
  });

  request.post({
    url: 'https://api.github.com/gists',
    headers: {'User-Agent': 'nodejs/' + pkg.version + ' (node) quick gist command line tool v' + pkg.version},
    json: {
      description: opts.description,
      public: opts.public,
      files: files
    }
  }, cb);
}

module.exports = gist;
