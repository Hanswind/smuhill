var express = require('express');
var app = express();
var fs = require('fs');
var db = require('./lib/db');
var sanitizeHtml = require('sanitize-html');
app.use(express.static('public'));
var bodyParser = require('body-parser');
 
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());



//텔레그램 봇 코드
//const TeleBot = require('telebot');
//const bot = new TeleBot('821604164:AAExhkSPWgRv5aDVSh29zSaOJpmyIWHWcK8');
//

//bot.start();
//bot.on(['/start', '/hello'], (msg) => msg.reply.text('Welcome!'));


var topicRouter = require('./routes/topic');
var indexRouter = require('./routes/index');
app.use('/', indexRouter);
app.use('/topic', topicRouter);

app.use(express.static('public'));

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});

app.use(function (req, res, next) {
  res.status(404).send('Sorry cant find that!');
});

app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something broke!')
});
