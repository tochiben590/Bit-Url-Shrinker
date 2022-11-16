require("dotenv").config()
var express = require("express")
var mongoose = require("mongoose")
var ejs = require("ejs")
var ShortUrl = require("./models/shortUrl")
var app = express()

mongoose.connect(process.env.MONGO, {useNewUrlParser : true, useUnifiedTopology: true})

app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: false}))

app.get('/', async (req, res)=>{
  var shortUrls = await ShortUrl.find()
  res.render("app", {shortUrls: shortUrls})
})

app.post('/shortUrls', async (req, res)=> {
  var FullUrl = await ShortUrl.findOne({full : req.body.fullURL})
 if ( FullUrl == null){await ShortUrl.create({ full: req.body.fullURL})
 res.redirect("/")}
else {res.status(400).send("<h1>FullUrl already existed</h1>")}
})

app.get('/:shortUrl', async (req, res)=>{
    var shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl})
    if (shortUrl == null) return res.sendStatus(404)
    
    shortUrl.clicks++
    shortUrl.save()
    
    res.redirect(shortUrl.full)
})

app.listen(process.env.PORT || 5000)