var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');
var fs = require('fs');
var sanitizeHtml = require('sanitize-html');
var template = require('../lib/template.js');
var smuhill= require('../lib/smuhill.js');
var db = require('../lib/db');
var shortid = require('shortid');
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json());

var num=0;


router.get('/', function (req, res) {
 
    fs.readFile('./main.html', function(error, data){
        if(error){
            console.log(error);
        }else{
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(data);
        }
    });
});


router.post('/ajax_text', function(req, res){
    var id = 1;

    var tes1= db.get('test').find({id:0}).value();
    console.log(tes1.nodes);
    var nodes = req.body.nodes;
    db.get('test').remove({ id: 0 }).write();
    id--;
    db.get('test').push({
        id: id,
        nodes: nodes
      }).write();
      id++;
    });

//    var test= db.get('smuhill').find({blockId:nodes[7].blockId}).value();
//    if(test>1) console.log("test")
//    else console.log("에러");
//    //console.log(test.blockId);
//     // var layout=" ";
//         for(var i=0; i<nodes.length; i++){
//             layout=db.get('smuhill').find({blockId:nodes[i].blockId}).value();
//             if(layout==" ") countiue;
//             else{

//             }
//     }
    // db.get('topics').find({id:id}).assign({
    //     title:title, description:description
    //   }).write();
    // var id = req.body.nodes

    //    var topic = db.get('smuhill').find({blockId:}).value();

   // var topic = db.get('topics').find({blockId:blockId}).value();
  
       
//     var blockId = nodes[num].blockId;
//     var positionX = nodes[num].positionX;
//     var positionY = nodes[num].positionY;
//     var values = nodes[num].values;
//     var selection = nodes[num].selection;

//     db.get('smuhill').push({
//         blockId: blockId,
//         positionX: positionX,
//         positionY: positionY,
//         values: values,
//         selection, selection,
//       }).write();
// num++;

   //res.redirect('/');

// router.put('/ajax_text', function(req, res){
//     var user_id = req.body.user_id,
//     password = req.body.password;

// console.log(user_id);
// console.log(password);
// console.log('안녕');
//    // res.redirect('/');
// });

router.get('/list', function (req, res) {
    var node= db.get('test').find({id:0}).value();
    var text= smuhill.text(node.nodes);
   var html = smuhill.HTML(text);

   res.send(html);
});


router.post('/text_create', function (req, res, next) {
    var post = req.body;
    var title = post.title;
    var description = post.description;
    var id = shortid.generate();
    db.get('topics').push({
      id: id,
      title: title,
      description: description,
    }).write();
    console.log(title+" 저장완료");
    res.redirect('/');
  });


module.exports = router;