var express = require('express')
  , logger = require('morgan')
  , merge = require('merge')
  , config = require('./config.json')
  , app = express()
  , outline = require('jade').compileFile(__dirname + '/src/templates/outline.jade')
  , test = require('jade').compileFile(__dirname + '/src/templates/default.jade')

app.use(logger('dev'))
app.use(express.static(__dirname + '/static'))

app.get('/', function (req, res, next) {
  try {
    var html = outline(merge(config, {
        //should be retrieve from somewhere
        user: {
            name: "phase",
            id: 0,
            rank: "Owner",
            notifCount: 0
        },
        crumbs: 'Home >> Something',
        page_contents: test({}),
    }))
    res.send(html)
  } catch (e) {
    next(e)
  }
})

app.listen(process.env.PORT || 80, function () {
  console.log('Listening on http://localhost:' + (process.env.PORT || 80))
})