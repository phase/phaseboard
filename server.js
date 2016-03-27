var express = require('express')
  , logger = require('morgan')
  , app = express()
  , outline = require('jade').compileFile(__dirname + '/src/templates/outline.jade')
  , d = require('jade').compileFile(__dirname + '/src/templates/default.jade')

app.use(logger('dev'))
app.use(express.static(__dirname + '/static'))

app.get('/', function (req, res, next) {
  try {
    var html = outline({
        //todo: put in options.json
        title: 'Home',
        theme: 'yule',
        meta: {
            description: "This is some meta text",
            keywords: "such board much wow"
        },
        infobox: {
            title: "This is a title",
            text: "todo: markdown parse this"
        },
        
        //should be retrieve from somewhere
        user: {
            name: "phase",
            id: 0,
            rank: "Owner"
        },
        crumbs: 'Home >> Something',
        page_contents: d({}),
    })
    res.send(html)
  } catch (e) {
    next(e)
  }
})

app.listen(process.env.PORT || 80, function () {
  console.log('Listening on http://localhost:' + (process.env.PORT || 80))
})