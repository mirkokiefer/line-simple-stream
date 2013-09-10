#line-simple-stream
[![Build Status](https://travis-ci.org/mirkokiefer/line-simple-stream.png?branch=master)](https://travis-ci.org/mirkokiefer/line-simple-stream)

[![NPM](https://nodei.co/npm/line-simple-stream.png)](https://nodei.co/npm/line-simple-stream/)

Transform a string [simple-stream](https://github.com/creationix/js-git/blob/master/specs/simple-stream.md) into a line stream.

``` js
var createLineStream = require('line-simple-stream')
var streamUtils = require('simple-stream')

var fsStream = fs.createReadStream('your_file.txt', {encoding: 'utf8'})

// wrap the file stream in a simple-stream
var fileSimpleStream = streamUtils.fromReadableStream(fileStream)

// transform the file stream into a line stream
var lineIterator = createLineIterator(fileIterator)

// print the file
streamUtils.forEach(lineIterator, console.log)(function() {
  console.log('done')
})
```

##Contributors

- Mirko Kiefer ([@mirkokiefer](https://github.com/mirkokiefer))
- Michael Still ([@Mitb](https://github.com/Mitb))