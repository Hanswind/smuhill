var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');
var sanitizeHtml = require('sanitize-html');
var template = require('../lib/template.js');
var shortid = require('shortid');

router.get('/create', function (request, response) {
  var title = '할일 생성';
  var list = template.list(request.list);
  var html = template.HTML(title, list, `
      <form action="/topic/create_process" method="post">
        <p><input type="text" name="title" placeholder="할일 제목"></p>
        <p>
          <textarea name="description" placeholder="할일 내용"></textarea>
        </p>
        <p>
          <input type="submit">
        </p>
      </form>
    `, '', '');
  response.send(html);
});

// router.post('/create_process', function (request, response) {
//   var post = request.body;
//   var title = post.title;
//   var description = post.description;
//   var id = shortid.generate();
//   db.get('topics').push({
//     id: id,
//     title: title,
//     description: description,
//   }).write();
//   response.redirect(`/`);
// });
// '/text_create'
router.post('/text_create', function (request, response) {
  var post = request.body;
  var title = post.title;
  var description = post.description;
  var id = shortid.generate();
  db.get('topics').push({
    id: id,
    title: title,
    description: description,
  }).write();
  response.redirect(`/`);
});

router.get('/update/:pageId', function (request, response) {

  var topic = db.get('topics').find({id:request.params.pageId}).value();

  var title = topic.title;
  var description = topic.description;
  var list = template.list(request.list);
  var html = template.HTML(title, list,
    `
        <form action="/topic/update_process" method="post">
          <input type="hidden" name="id" value="${topic.id}"> 
          <p><input type="text" name="title" placeholder="title" value="${title}"></p>
          <p>
            <textarea name="description" placeholder="description">${description}</textarea>
          </p>
          <p>
            <input type="submit">
          </p>
        </form>
        `,
    `<a href="/topic/create">create</a> <a href="/topic/update/${topic.id}">update</a>`,
  
  );
  response.send(html);
});

router.post('/update_process', function (request, response) {
  var post = request.body;
  var id = post.id;
  var title = post.title;
  var description = post.description;
  var topic = db.get('topics').find({id:id}).value();
 
  db.get('topics').find({id:id}).assign({
    title:title, description:description
  }).write();
  response.redirect(`/topic/${topic.id}`);
});

router.post('/delete_process', function (request, response) {

  var post = request.body;
  var id = post.id;
  var topic = db.get('topics').find({id:id}).value();
 
  db.get('topics').remove({id:id}).write();
  response.redirect('/');
});

//목록읽기
router.get('/list', function (request, response) {
  var title = '할일 목록';
  var list = template.list(request.list);
  var html = template.HTML(title, list,'','',
  );
  response.send(html);
});




router.get('/:pageId', function (request, response, next) {
  var topic = db.get('topics').find({
    id: request.params.pageId
  }).value();
  var sanitizedTitle = sanitizeHtml(topic.title);
  var sanitizedDescription = sanitizeHtml(topic.description, {
    allowedTags: ['h1']
  });
  var list = template.list(request.list);
  var html = template.HTML(sanitizedTitle, list,
    `
    <h2>${sanitizedTitle}</h2>
    ${sanitizedDescription}
    `,
    ` <a href="/topic/create">create</a>
            <a href="/topic/update/${topic.id}">update</a>
            <form action="/topic/delete_process" method="post">
              <input type="hidden" name="id" value="${topic.id}">
              <input type="submit" value="delete">
            </form>`,
  );
  response.send(html);
});
module.exports = router;