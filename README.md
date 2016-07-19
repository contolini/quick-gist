# quick-gist [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url]
> Quickly create anonymous GitHub gists.

## Installation

```sh
$ npm install --save quick-gist
```

## Usage

Using GitHub Enterprise? Set your gist endpoint with `QUICK_GIST_ENDPOINT` (e.g. `https://github.yourcompany.com/api/v3/gists`).

GitHub's public API at `https://api.github.com/gists` is used by default. Uses [language-classifier](https://github.com/tj/node-language-classifier) to guess file languages.

```js
var quickGist = require('quick-gist');

quickGist({
  content: 'gists are fun',
  description: 'This gist is the best', // Optional
  public: false, // Whether the gist should be public or unlisted. Defaults to false (unlisted).
  enterpriseOnly: false. // Prohibit posting to GitHub.com. Defaults to false. Useful if you're posting company secrets.
  fileExtension: 'md' // Optionally force a file extension if you don't want to rely on language-classifier.
}, function(err, resp, data) {
  console.log(data);
});
```

Returns a whole lot of useful info:

```
{
  url: 'https://api.github.com/gists/40cd13c18a50ca98c7eebd4cb79c8f95',
  forks_url: 'https://api.github.com/gists/40cd13c18a50ca98c7eebd4cb79c8f95/forks',
  commits_url: 'https://api.github.com/gists/40cd13c18a50ca98c7eebd4cb79c8f95/commits',
  id: '40cd13c18a50ca98c7eebd4cb79c8f95',
  git_pull_url: 'https://gist.github.com/40cd13c18a50ca98c7eebd4cb79c8f95.git',
  git_push_url: 'https://gist.github.com/40cd13c18a50ca98c7eebd4cb79c8f95.git',
  html_url: 'https://gist.github.com/40cd13c18a50ca98c7eebd4cb79c8f95',
  files: {
    'gist1.sh': {
      filename: 'gist1.sh',
      type: 'application/x-sh',
      language: 'Shell',
      raw_url: 'https://gist.githubusercontent.com/anonymous/40cd13c18a50ca98c7eebd4cb79c8f95/raw/2184df76232990bbc11109133d8a2b05715eb683/gist1.sh',
      size: 13,
      truncated: false,
      content: 'gists are fun'
    }
  },
  public: false,
  created_at: '2016-04-19T23:43:35Z',
  updated_at: '2016-04-19T23:43:35Z',
  description: null,
  comments: 0,
  user: null,
  comments_url: 'https://api.github.com/gists/40cd13c18a50ca98c7eebd4cb79c8f95/comments',
  forks: [],
  history: [{
    user: [Object],
    version: 'f5cd7f898c247772ece0fd4529fb80d2f4e2ee1e',
    committed_at: '2016-04-19T23:43:34Z',
    change_status: [Object],
    url: 'https://api.github.com/gists/40cd13c18a50ca98c7eebd4cb79c8f95/f5cd7f898c247772ece0fd4529fb80d2f4e2ee1e'
  }],
  truncated: false
}
```

Create multiple files by passing an array of content.

```js
quickGist({
  content: [
    'this is the content of the first file in the gist',
    'this is the content of the second file',
    'oh look another file'
  ]
}, function(err, resp, data) {
  console.log(data);
});
```

## License

MIT © [Chris Contolini](https://contolini.com)


[npm-image]: https://badge.fury.io/js/quick-gist.svg
[npm-url]: https://npmjs.org/package/quick-gist
[travis-image]: https://travis-ci.org/contolini/quick-gist.svg?branch=master
[travis-url]: https://travis-ci.org/contolini/quick-gist
[daviddm-image]: https://david-dm.org/contolini/quick-gist.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/contolini/quick-gist
