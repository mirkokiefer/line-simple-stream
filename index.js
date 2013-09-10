
var EventEmitter = require('events').EventEmitter

var createLineStream = function(stringStream) {
  var currentBuffer = ''
  var buffers = []
  var hasEnded = false
  var lineEvents = new EventEmitter()
  return {read: read, abort: stringStream.abort}

  function read(cb) {
    if (buffers.length) {
      cb(null, buffers.shift())
    } else if (hasEnded) {
      cb(null, undefined)
    } else {
      lineEvents.once('line_finished', function() {
        read(cb)
      })
      readNext()
    }
  }

  function appendToBuffer(data) {
    var newLineIndex = data.indexOf('\n')
    var line = newLineIndex > -1 ? data.slice(0, newLineIndex) : data
    currentBuffer += line
    if (newLineIndex > -1) {
      var rest = data.slice(newLineIndex + 1)
      buffers.push(currentBuffer)
      currentBuffer = ''
      appendToBuffer(rest)
      return false
    } else {
      return true
    }
  }

  function readNext() {
    stringStream.read(function(err, data) {
      if (data === undefined) {
        appendToBuffer('\n')
        hasEnded = true
        lineEvents.emit('line_finished')
      } else {
        if (appendToBuffer(data)) {
          readNext()
        } else {
          lineEvents.emit('line_finished')
        }
      }
    })
  }
}

module.exports = createLineStream
