var fs = require("fs")
var util = require("util")
var stream = require("stream")
var es = require("elasticsearch")
var LogRotationStream = require('log-rotation-stream')
var JSONStream = require("JSONStream")
var Tee = require("tee")
var createLogStream = require('log-rotate-stream')
var esIndex = require('./es-logsink')

function EsLogStream () {
    stream.Transform.call(this, {readableObjectMode: true, writableObjectMode:true});
}

util.inherits(EsLogStream, stream.Transform)

EsLogStream.prototype._transform = function(chunk, encoding, done) {
    esIndex(chunk)
    this.push(chunk)
    done()
}

process.stdin
    .pipe(new Tee(
        createLogStream("data.log", {
            count: 10
        }))
    )
    .pipe(JSONStream.parse())
    .pipe(new EsLogStream())
