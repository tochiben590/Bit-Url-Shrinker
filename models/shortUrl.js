var mongoose = require("mongoose")
var shortId = require("shortid")

var shortUrlSchema = new mongoose.Schema({
    full: {
        type: String,
        required: true
    },
    short:{
        type: String,
        required: true,
        default: shortId.generate
    },
    clicks: {
        type: String,
        required: true,
        default:0
    }
  })
  
  var ShortUrl = mongoose.model('ShortUrl', shortUrlSchema)

  module.exports = ShortUrl